using Domain;
using MediatR;
using Persistence;

namespace Application.TestCases
{
    public class Create
    {
        public class Command : IRequest
        {
            public TestCase TestCase { get; set; }
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
                _context.TestCases.Add(request.TestCase);

                await _context.SaveChangesAsync();
            }

        }
    }
}