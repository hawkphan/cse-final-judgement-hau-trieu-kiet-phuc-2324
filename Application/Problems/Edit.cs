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
        public class Command : IRequest<ApiResult<Unit>>
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

        public class Handler : IRequestHandler<Command, ApiResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var problem = await _context.Problems.FindAsync(request.Problem.Id);

                if (problem == null) return null;
                if (request.Problem.TestCases.Count == 0)
                {
                    request.Problem.TestCases = problem.TestCases;
                }
                else
                {
                    var testCasesToRemove = _context.TestCases
                    .Where(tc => tc.ProblemId == request.Problem.Id)
                    .ToList();

                    // Remove the retrieved test cases
                    _context.TestCases.RemoveRange(testCasesToRemove);

                    // Save changes to the database
                    await _context.SaveChangesAsync();
                }

                _mapper.Map(request.Problem, problem);

                var ApiResult = await _context.SaveChangesAsync() > 0;

                if (!ApiResult)
                {
                    return ApiResult<Unit>.Failure(new string[] { "Failed to Edit" });
                }

                return ApiResult<Unit>.Success(Unit.Value);
            }
        }
    }
}