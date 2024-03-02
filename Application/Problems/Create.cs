using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class Create
    {
        public class Command : IRequest<ApiResult<ProblemDto>>
        {
            public Problem Problem { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Problem).SetValidator(new ProblemValidator());
            }
        }
        public class Handler : IRequestHandler<Command, ApiResult<ProblemDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<ApiResult<ProblemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());


                request.Problem.User = user;
                request.Problem.Date = DateTime.UtcNow;
                _context.Problems.Add(request.Problem);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Create" });
                }
                // Instead of creating problemsQuery, you can directly use request.Problem here
                var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                return ApiResult<ProblemDto>.Success(newProblemDto);
            }

        }
    }
}