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

                var results = _context.Results.Where(r => r.Status == 1 || r.Status == 2).ToList();

                foreach (var result in results)
                {
                    // update solution result

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
                    _mapper.Map(newResult, result);
                    await _context.SaveChangesAsync();

                }
                //check if solution is graded
                var UnGradeSolution = _context.Solutions.Where(s => s.GradingStatus == 0).Include(s => s.Results).Include(s => s.Problem);
                foreach (Solution solution in UnGradeSolution)
                {
                    if (solution.Score == 0)
                    {
                        Boolean AllGraded = true;
                        double score = 0;
                        foreach (var res in solution.Results)
                        {
                            if (res.Status < 3)
                            {
                                AllGraded = false;
                                solution.GradingStatus = 0;
                                score = 0;
                                break;
                            }
                            if (res.Status == 3)
                            {
                                score += 1;
                            }
                        }
                        if (AllGraded)
                        {
                            var size = _context.TestCases.Count(t => t.ProblemId.Equals(solution.ProblemId));
                            if (size != 0)
                            {
                                solution.Score = (double)score / size;
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

                        double ExpectCompletionRate = 1 / (1 + Math.Pow(10, (problem.Difficulty - user.Rating) / 400));

                        user.Rating = Math.Round(user.Rating + 100 * (solution.Score - ExpectCompletionRate), 0);
                        problem.Difficulty = Math.Round(problem.Difficulty - 100 * (solution.Score - ExpectCompletionRate), 0);

                        var newNotification = new Notification
                        {
                            ReceiverId = userId,
                            Content = $"Your solution of {problem.Title} has been judged and graded",
                            Status = 0,
                            Timestamp = DateTime.UtcNow
                        };

                        _context.Notifications.Add(newNotification);
                        await _hubContext.Clients.All.SendAsync("ReceiveNotification", newNotification);

                        await _context.SaveChangesAsync();

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
                if (contestId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ContestId == contestId);

                    if (userId != null)
                    {
                        solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                    }
                }
                else
                {
                    if (userId != null)
                    {
                        solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                    }

                    if (problemId != null)
                    {
                        solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ProblemId == problemId && s.ContestId == null);
                    }
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
        }
    }
}