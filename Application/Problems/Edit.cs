using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;

namespace Application.Problems
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var Problem = await _context.Problems.FindAsync(request.Problem.Id);

                _mapper.Map(request.Problem, Problem);

                await _context.SaveChangesAsync();
            }
        }
    }
}
