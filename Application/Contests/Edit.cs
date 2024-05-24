using Application.Core;
using Application.Solutions;
using AutoMapper;
using Domain;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{
    public class Edit
    {
        public class Command : IRequest<ApiResult<ContestDto>>
        {
            public ContestDto Contest { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResult<ContestDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<ContestDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var contest = await _context.Contests.Include(c => c.Members).Include(c => c.Problems).FirstOrDefaultAsync(c => c.Id.Equals(request.Contest.Id));

                    if (contest == null) return ApiResult<ContestDto>.Failure(new string[] { "Failed to Edit" });

                    var problemsToRemove = _context.ContestProblems
                        .Where(p => p.ContestId == request.Contest.Id)
                        .ToList();

                    var membersToRemove = _context.ContestMembers
                    .Where(p => p.ContestId == request.Contest.Id)
                    .ToList();

                    if (problemsToRemove.Any())
                    {
                        _context.ContestProblems.RemoveRange(problemsToRemove);
                    }

                    if (membersToRemove.Any())
                    {
                        _context.ContestMembers.RemoveRange(membersToRemove);
                    }

                    if (problemsToRemove.Any() || membersToRemove.Any())
                    {
                        await _context.SaveChangesAsync();
                    }

                    foreach (var item in request.Contest.Problems)
                    {
                        ContestProblem newProblem = new ContestProblem
                        {
                            ContestId = request.Contest.Id,
                            ProblemId = item.ProblemId,
                            Order = item.Order,
                            Score = item.Score,
                        };
                        await _context.ContestProblems.AddAsync(newProblem);
                    }

                    await _context.SaveChangesAsync();

                    foreach (var item in request.Contest.Members)
                    {
                        ContestMember newMember = new ContestMember
                        {
                            ContestId = request.Contest.Id,
                            UserId = item.UserId,
                            Role = item.Role,
                        };
                        await _context.ContestMembers.AddAsync(newMember);
                    }

                    await _context.SaveChangesAsync();

                    contest.Name = request.Contest.Name;
                    contest.StartTime = request.Contest.StartTime;
                    contest.EndTime = request.Contest.EndTime;
                    contest.Rule = request.Contest.Rule;
                    contest.Type = request.Contest.Type;
                    contest.Description = request.Contest.Description;

                    await _context.SaveChangesAsync();

                    var newContestDto = _mapper.Map<ContestDto>(request.Contest);

                    return ApiResult<ContestDto>.Success(newContestDto);
                }
                catch (Exception ex)
                {
                    return ApiResult<ContestDto>.Failure(new string[] { ex.Message });
                }
            }
        }
    }
}