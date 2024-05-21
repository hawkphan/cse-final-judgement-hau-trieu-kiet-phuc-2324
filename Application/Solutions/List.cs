using System.Text.RegularExpressions;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Solutions
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<SolutionResponseDto>>>
        {
            public Guid? UserId { get; set; }
            public Guid? ProblemId { get; set; }
            public Guid? ContestId { get; set; }
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<SolutionResponseDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHubContext<NotificationHub> _hubContext;
            public Handler(DataContext context, IMapper mapper, IHubContext<NotificationHub> hubContext)
            {
                _context = context;
                _mapper = mapper;
                _hubContext = hubContext;
            }

            public async Task<Result<PagedList<SolutionResponseDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();
                Guid? problemId = request.ProblemId;
                Guid? userId = request.UserId;
                Guid? contestId = request.ContestId;
                FileManager _fileManager = new FileManager();

                // var results = _context.Results.Where(r => r.Status == 1 || r.Status == 2).Include(r => r.TestCase).Include(r => r.Solution).ThenInclude(s => s.Problem).ToList();

                var results = _context.Results.Where(r => new List<double>() { 1, 2 }.Contains(r.Status)).Include(r => r.TestCase).Include(r => r.Solution).ThenInclude(s => s.Problem).ToList();

                foreach (var result in results)
                {
                    string initialResult = await judge0.SendGetRequest($"submissions/{result.Token}");
                    ResultDto resultDto = JsonConvert.DeserializeObject<ResultDto>(initialResult);

                    var newResult = _mapper.Map<Result>(resultDto);
                    newResult.Id = result.Id;
                    newResult.TestCaseId = result.TestCaseId;
                    newResult.SolutionId = result.SolutionId;

                    if (resultDto.Stderr != null)
                    {
                        newResult.Error = resultDto.Stderr;
                    }
                    else if (resultDto.CompileOutput != null)
                    {
                        newResult.Error = resultDto.CompileOutput;
                    }
                    else
                    {
                        newResult.Error = "None";
                    }

                    if (resultDto.Stdout != null && resultDto.Stdout.Length > 0)
                    {
                        String ExpectedOutput = _fileManager.getTestCaseContent(result.TestCase.Output);
                        if (!Grade(result.Solution.Problem.GradeMode, ExpectedOutput, resultDto.Stdout, result.Solution.Problem.ApproximateRate))
                        {
                            newResult.Status = 4;
                            newResult.StatusMessage = "Wrong Answer!";
                        }
                        else
                        {
                            newResult.Status = 3;
                            newResult.StatusMessage = "Accepted";
                        }
                    }

                    _mapper.Map(newResult, result);
                    _context.Entry(result).State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                }
                var unGradedSolutions = _context.Solutions.Where(s => s.GradingStatus == 0).Include(s => s.Results).Include(s => s.Problem);
                foreach (Solution solution in unGradedSolutions)
                {
                    if (solution.Score == 0)
                    {
                        Boolean isAllGraded = true;
                        double score = 0;
                        foreach (var res in solution.Results)
                        {
                            if (res.Status < 3)
                            {
                                isAllGraded = false;
                                solution.GradingStatus = 0;
                                score = 0;
                                break;
                            }
                            if (res.Status == 3)
                            {
                                score += 1;
                            }
                        }
                        if (isAllGraded)
                        {
                            var size = _context.TestCases.Count(t => t.ProblemId.Equals(solution.ProblemId));
                            if (size != 0)
                            {
                                solution.Score = score / size;
                            }
                            else
                            {
                                solution.Score = 0;
                            }
                            solution.GradingStatus = 1;
                        }
                        else
                            continue;

                        //Rating Section Here
                        var user = await _context.Users.FindAsync(solution.UserId);
                        Problem problem = await _context.Problems.FindAsync(solution.ProblemId);

                        //update elo here

                        double ExpectedCompletionRate = 1 / (1 + Math.Pow(10, (problem.Difficulty - user.Rating) / 400));

                        user.Rating = Math.Round(user.Rating + 100 * (solution.Score - ExpectedCompletionRate), 0);
                        problem.Difficulty = Math.Round(problem.Difficulty - 100 * (solution.Score - ExpectedCompletionRate), 0);

                        var newNotification = new Notification
                        {
                            ReceiverId = userId,
                            Content = $"Your solution of {problem.Title} has been judged and graded",
                            Status = 0,
                            Timestamp = DateTime.UtcNow
                        };

                        _context.Notifications.Add(newNotification);
                        // await _hubContext.Clients.All.SendAsync("ReceiveNotification", newNotification);
                    }
                }

                var solutions = _context.Solutions
                                        .Include(s => s.Results)
                                        .Include(s => s.Contest)
                                        .AsQueryable();

                foreach (var solution in solutions)
                {
                    double sevStatus = 0;
                    double runTime = 0;
                    long memory = 0;
                    foreach (var result in solution.Results)
                    {
                        if (result.MemoryUsage != null && result.ExecutionTime != null)
                        {
                            memory = long.Max((long)result.MemoryUsage, memory);
                            runTime = double.Max((double)result.ExecutionTime, runTime);
                        }

                        if (result.Status == 1)
                        {
                            sevStatus = 1;
                            break;
                        }

                        if (result.Status == 2)
                        {
                            sevStatus = 2;
                            break;
                        }

                        sevStatus = double.Max(sevStatus, result.Status);
                    }
                    solution.ExecutionTime = runTime;
                    solution.MemoryUsage = memory;
                    solution.Status = sevStatus;
                }

                await _context.SaveChangesAsync();

                solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ContestId == contestId);

                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }

                if (problemId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ProblemId == problemId);
                }

                var queryList = await solutions.ProjectTo<SolutionResponseDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(s => s.CreatedDate)
                .ToListAsync(cancellationToken: cancellationToken);

                FileManager fileManager = new FileManager();

                foreach (var solution in queryList)
                {
                    if (Directory.Exists(Path.Combine(fileManager.SolutionsPath, solution.Id.ToString())))
                    {
                        solution.Source = fileManager.getSolutionContent(solution.Id.ToString());
                    }
                }

                int PageNumber = (request.Params.PageSize == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageSize == -1) ? queryList.Count : request.Params.PageSize;

                return Result<PagedList<SolutionResponseDto>>
                    .Success(PagedList<SolutionResponseDto>.CreateAsyncUsingList(queryList,
                        PageNumber, PageSize));
            }
            public static bool Grade(int mode, string expectedOutput, string submittedOutput, double ApproximateRate)
            {
                switch (mode)
                {
                    //to be working on approximately
                    case 0:
                        return ApproximateComparison(expectedOutput, expectedOutput, ApproximateRate);
                    case 1:
                    //absolute
                        return AbsoluteComparison(expectedOutput, submittedOutput);
                    case 2:
                    //without space
                        return AbsoluteComparisonWithoutSpace(expectedOutput, submittedOutput);
                    default:
                        return AbsoluteComparison(expectedOutput, submittedOutput);

                }
            }
            public static bool AbsoluteComparison(string expectedOutput, string submittedOutput)
            {
                string[] file1 = expectedOutput.Split("\n");
                string[] file2 = submittedOutput.Split("\n");
                if (file1.Length != file2.Length)
                    return false;
                int count = file1.Length;
                for (int i = 0; i < count; i++)
                {
                    if (!file1[i].Equals(file2[i]))
                    {
                        return false;
                    }
                }
                return true;
            }
            public static bool AbsoluteComparisonWithoutSpace(string expectedOutput, string submittedOutput)
            {
                string[] whitespaceChars = new string[] { Environment.NewLine, " ", "\n", "\r", "\t", "\r\n" };
                // using the method 
                String[] file1 = expectedOutput.Split(whitespaceChars, StringSplitOptions.RemoveEmptyEntries);
                String[] file2 = submittedOutput.Split(whitespaceChars, StringSplitOptions.RemoveEmptyEntries);
                if (file1.Length != file2.Length)
                    return false;
                for (int i = 0; i < file1.Length; i++)
                {
                    if (!file1[i].Equals(file2[i]))
                        return false;
                }
                return true;
            }
            public static bool ApproximateComparison(string expectedOutput, string submittedOutput, double check)
            {

                string[] file1 = expectedOutput.Split("\n");
                string[] file2 = submittedOutput.Split("\n");
                if (file1.Length != file2.Length)
                    return false;

                for (int i = 0; i < file1.Length; i++)
                {
                    string[] lineSplit1 = file1[i].Split(' ');
                    string[] lineSplit2 = file2[i].Split(' ');
                    if (lineSplit1.Length != lineSplit2.Length)
                        return false;
                    for (int j = 0; j < lineSplit1.Length; j++)
                    {
                        string s1 = lineSplit1[j];
                        string s2 = lineSplit2[j];

                        if (checkDigit(s1) && checkDigit(s2) && !s1.StartsWith(".") && !s2.StartsWith("."))
                        {

                            if (Math.Abs(Double.Parse(s1) - Double.Parse(s2)) > check)
                            {
                                return false;
                            }
                        }
                        else if (!s1.Equals(s2))
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            private static Boolean checkDigit(String s)
            {
                return (Double.TryParse(s, out double result));
            }


        }
    }
}