using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{
    public class Create
    {
        public class Command : IRequest<ApiResult<ContestDto>>
        {
            public ContestDto Contest { get; set; }
        }

        public class Handler : IRequestHandler<Command, ApiResult<ContestDto>>
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
            public async Task<ApiResult<ContestDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var problems = request.Contest.Problems;
                var members = request.Contest.Members;
                var startTime = request.Contest.StartTime;
                var endTime = request.Contest.EndTime;

                if (problems == null || members == null || !problems.Any() || !members.Any())
                {
                    return ApiResult<ContestDto>.Failure(new string[] { "Contest must have members and a problem set" });
                }
                
                if(endTime < startTime) {
                    return ApiResult<ContestDto>.Failure(new string[] { "End time must happen after Start time" });
                }

                try
                {
                    var contest = _mapper.Map<Domain.Contest>(request.Contest);
                    _context.Contests.Add(contest);
                    await _context.SaveChangesAsync();
                    return ApiResult<ContestDto>.Success(request.Contest);
                }
                catch (Exception e)
                {
                    return ApiResult<ContestDto>.Failure(new string[] { e.Message });
                }
            }

        }
    }
}