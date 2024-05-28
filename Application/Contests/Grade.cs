using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.Execution;
using Domain;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{

    public class Grade
    {
        public class Command : IRequest<ApiResult<List<RankingMemberDto>>>
        {
            public Guid ContestId { get; set; }
        }

        public class Handler : IRequestHandler<Command, ApiResult<List<RankingMemberDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }
            public async Task<ApiResult<List<RankingMemberDto>>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guid contestId = request.ContestId;
                var contest = _context.Contests.Find(contestId);

                if (Math.Abs(contest.Rule - 0) < 0.0000001)
                {
                    return await GradeContestICPC(contestId);
                }

                return await GradeContestICPC(contestId);
            }
            public async Task<ApiResult<List<RankingMemberDto>>> GradeContestICPC(Guid contestId)
            {
                List<RankingMemberDto> responseList = new List<RankingMemberDto>();

                var contest = await _context.Contests.Include(c => c.Problems).Include(c => c.Members).FirstOrDefaultAsync(c => c.Id == contestId);
                var contestProblems = _context.ContestProblems.Include(p => p.Problem).Where(p => p.ContestId == contestId);
                var contestants = _context.ContestMembers.Include(m => m.User).Where(m => Math.Abs(m.Role - 0) >= 0.0000001 && m.ContestId == contestId).ToList();

                var adminIds = new List<Guid>();
                foreach (var item in contest.Members.Where(m => Math.Abs(m.Role - 0) < 0.0000001))
                {
                    adminIds.Add(item.UserId);
                }

                var solutions = await _context.Solutions.Where(s => s.ContestId == contestId && !adminIds.Contains(s.UserId)).OrderBy(s => s.CreatedDate).ToListAsync();

                var problems = new List<ContestProblemDto>();

                foreach (var item in contestProblems)
                {
                    problems.Add(_mapper.Map<ContestProblemDto>(item));
                }

                Dictionary<Guid, Solution> firstAcceptedSolutionMap = new Dictionary<Guid, Solution>();

                foreach (var item in problems)
                {
                    var solution = solutions.Find(s => s.ProblemId == item.ProblemId);
                    firstAcceptedSolutionMap.Add(item.Id, solution);
                }

                foreach (var item in contestants)
                {
                    RankingMemberDto rankingMember = new RankingMemberDto
                    {
                        UserId = item.UserId,
                        UserName = item.User.DisplayName
                    };

                    foreach (var problemItem in problems)
                    {
                        RankingProblemDto rankingProblem = new RankingProblemDto
                        {
                            ProblemId = problemItem.ProblemId,
                            ProblemName = problemItem.Problem.Code + " - " + problemItem.Problem.Title,
                            Order = problemItem.Order
                        };

                        var submittedSolutions = solutions.Where(s => s.UserId == item.UserId && s.ProblemId == problemItem.ProblemId).OrderBy(s => s.CreatedDate);

                        var triedSolutions = new List<Solution>();

                        foreach (var solution in submittedSolutions)
                        {
                            if ((Math.Abs(solution.Status - 3) >= 0.0000001))
                            {
                                triedSolutions.Add(solution);
                            }
                            else
                            {
                                triedSolutions.Add(solution);
                                break;
                            }
                        }

                        var firstAccepted = firstAcceptedSolutionMap[problemItem.Id];

                        if (firstAccepted != null && firstAccepted.UserId == rankingMember.UserId)
                        {
                            rankingProblem.Status = 0; // First to solve the problem
                            rankingMember.SolvedProblemCount += 1;
                        }
                        else
                        {
                            double minSolutionStatus = double.MaxValue;

                            if (!triedSolutions.Any())
                            {
                                rankingProblem.Status = 3;
                            }

                            foreach (var submittedSolution in triedSolutions)
                            {
                                if (!(Math.Abs(submittedSolution.Status - 1) < 0.0000001 || Math.Abs(submittedSolution.Status - 2) < 0.0000001))
                                {
                                    minSolutionStatus = Math.Min(minSolutionStatus, submittedSolution.Status);
                                }

                                if (Math.Abs(minSolutionStatus - 3) < 0.0000001)
                                {
                                    rankingProblem.Status = 1; // Solved Problem
                                    rankingMember.SolvedProblemCount += 1;
                                }
                                else
                                {
                                    rankingProblem.Status = 2; // Attempted problem
                                }
                            }
                        }

                        rankingProblem.SubmissionCount = triedSolutions.Any() ? triedSolutions.Count : 0;
                        rankingProblem.TimeSpent = triedSolutions.Any() ? (triedSolutions[^1].CreatedDate - contest.StartTime).TotalSeconds : 0;

                        rankingMember.TotalTime += rankingProblem.TimeSpent;

                        var acceptedSolution = triedSolutions.Find(s => s.UserId == rankingMember.UserId && s.ProblemId == rankingProblem.ProblemId && Math.Abs(s.Status - 3) < 0.0000001);

                        if (acceptedSolution != null)
                        {
                            var failedSolutions = triedSolutions.Where(s => s.UserId == rankingMember.UserId
                                                        && s.ProblemId == rankingProblem.ProblemId
                                                        && Math.Abs(s.Status - 3) >= 0.0000001
                                                        && Math.Abs(s.Status - 1) >= 0.0000001
                                                        && Math.Abs(s.Status - 2) >= 0.0000001
                                                        && Math.Abs(s.Status - 6) >= 0.0000001).ToList();
                            double penalty = failedSolutions.Count * 20 * 60;
                            rankingProblem.TimeSpent += penalty;
                        }

                        rankingMember.Problems.Add(rankingProblem);

                    }

                    rankingMember.Problems = rankingMember.Problems.OrderBy(p => p.Order).ToList();
                    responseList.Add(rankingMember);
                }

                responseList = responseList.OrderByDescending(p => p.SolvedProblemCount).ThenBy(p => p.TotalTime).ToList();

                int rank = 1;

                foreach (var item in responseList)
                {
                    item.Rank = rank++;
                }

                return ApiResult<List<RankingMemberDto>>.Success(responseList.OrderBy(r => r.Rank).ToList());
            }

            // public async Task GradeContestOlympic(Guid contestId)
            // {
            //     var contest = _context.Contests.Find(contestId);
            //     var problemsForContest = _context.Contests
            //         .Where(c => c.Id == contestId)
            //         .Include(m => m.Members)
            //         .Include(m => m.Problems)
            //         .ToList();
            //     foreach (ContestMember member in contest.Members)
            //     {
            //         DateTime TempTime = contest.StartTime;
            //         double Score = 0;
            //         foreach (var problem in problemsForContest)
            //         {
            //             List<Solution> memberSolution = _context.Solutions
            //             .Where(x => x.ContestId == contestId && x.UserId == member.UserId && x.ProblemId == problem.Id)
            //             .OrderBy(s => s.CreatedDate).ToList();

            //             DateTime startTime = contest.StartTime < TempTime ? TempTime : contest.StartTime;
            //             TimeSpan timeDifference;
            //             double totalMinutes = 0;

            //             foreach (Solution solution in memberSolution)
            //             {
            //                 DateTime completedTime = solution.CreatedDate;
            //                 if (solution.Status == 3)
            //                 {
            //                     Score += solution.Score * 100;
            //                     timeDifference = completedTime - startTime;
            //                     totalMinutes = timeDifference.TotalMinutes;
            //                     TempTime = completedTime;
            //                     break;
            //                 }
            //             }
            //             // member.Score = Score;
            //             // member.TotalMinutes += totalMinutes;
            //         }

            //     }
            // }
        }


    }
}
