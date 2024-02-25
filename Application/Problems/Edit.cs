using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Problems
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
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

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var problem = await _context.Problems.FindAsync(request.Problem.Id);

                if (problem == null) return null;
                if (request.Problem.TestCases.Count == 0 || request.Problem.TestCases == null)
                {
                    request.Problem.TestCases = problem.TestCases;
                }
                _mapper.Map(request.Problem, problem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure(new string[] { "Failed to Edit" });
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}