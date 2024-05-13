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

                    _mapper.Map(request.Contest, contest);

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