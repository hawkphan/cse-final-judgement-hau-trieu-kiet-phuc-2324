using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.Execution;
using Domain;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{

    public class Grade
    {
        public class Command : IRequest<ApiResult<List<MemberDto>>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ApiResult<List<MemberDto>>>
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
            public async Task<ApiResult<List<MemberDto>>> Handle(Command request, CancellationToken cancellationToken)
            {
                return await GradeContestICPC(request.Id);
            }
            public async Task<ApiResult<List<MemberDto>>> GradeContestICPC(Guid contestId)
            {
                List<MemberDto> results = new List<MemberDto>();
                var contest = _context.Contests.Find(contestId);
                var problemsForContest = _context.Contests
                    .Where(c => c.Id == contestId)
                    .Include(m => m.Members)
                    .Include(m => m.Problems)
                    .ToList();
                foreach (ContestMember member in contest.Members)
                {
                    MemberDto memberDto;
                    memberDto = _mapper.Map<MemberDto>(member);
                    DateTime TempTime = contest.StartTime;
                    double Score = 0;
                    foreach (var problem in problemsForContest)
                    {
                        List<Solution> memberSolution = _context.Solutions
                        .Where(x => x.ContestId == contestId && x.UserId == member.UserId && x.ProblemId == problem.Id)
                        .OrderBy(s => s.CreatedDate).ToList();

                        bool firstSuccess = false;
                        double Rejected = 0;
                        double penaltyTime = 5;
                        DateTime startTime = contest.StartTime < TempTime ? TempTime : contest.StartTime;
                        TimeSpan timeDifference;
                        double totalMinutes = 0;

                        foreach (Solution solution in memberSolution)
                        {
                            if (solution.Status != 3 && firstSuccess == false)
                            {
                                continue;
                            }
                            else
                            {
                                firstSuccess = true;
                            }
                            DateTime completedTime = solution.CreatedDate;
                            if (solution.Status == 3)
                            {
                                Score += solution.Score * 100;
                                timeDifference = completedTime - startTime;
                                totalMinutes = timeDifference.TotalMinutes;
                                // penaltyTime = totalMinutes;
                                TempTime = completedTime;
                                break;
                            }
                            else if (solution.Status == 4 || solution.Status == 5)
                            {
                                Rejected++;
                            }
                        }
                        Score -= Rejected * penaltyTime + totalMinutes;
                        memberDto.Score = Score;
                    }
                    results.Add(memberDto);
                }
                if (results.Count > 0)
                {
                    return ApiResult<List<MemberDto>>.Success(results);
                }
                else return ApiResult<List<MemberDto>>.Failure(new string[] { "Something wrong" });

            }
            public async Task GradeContestOlympic(Guid contestId)
            {
                var contest = _context.Contests.Find(contestId);
                var problemsForContest = _context.Contests
                    .Where(c => c.Id == contestId)
                    .Include(m => m.Members)
                    .Include(m => m.Problems)
                    .ToList();
                foreach (ContestMember member in contest.Members)
                {
                    DateTime TempTime = contest.StartTime;
                    double Score = 0;
                    foreach (var problem in problemsForContest)
                    {
                        List<Solution> memberSolution = _context.Solutions
                        .Where(x => x.ContestId == contestId && x.UserId == member.UserId && x.ProblemId == problem.Id)
                        .OrderBy(s => s.CreatedDate).ToList();

                        DateTime startTime = contest.StartTime < TempTime ? TempTime : contest.StartTime;
                        TimeSpan timeDifference;
                        double totalMinutes = 0;

                        foreach (Solution solution in memberSolution)
                        {
                            DateTime completedTime = solution.CreatedDate;
                            if (solution.Status == 3)
                            {
                                Score += solution.Score * 100;
                                timeDifference = completedTime - startTime;
                                totalMinutes = timeDifference.TotalMinutes;
                                TempTime = completedTime;
                                break;
                            }
                        }
                        // member.Score = Score;
                        // member.TotalMinutes += totalMinutes;
                    }

                }
            }
        }


    }
}
