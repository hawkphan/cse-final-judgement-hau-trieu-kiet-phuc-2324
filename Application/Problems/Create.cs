using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Problems
{
    public class Create
    {
        public class Command : IRequest
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
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                request.Problem.Date =DateTime.UtcNow;
                _context.Problems.Add(request.Problem);

                await _context.SaveChangesAsync();
            }

        }
    }
}