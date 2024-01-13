using Domain;
using MediatR;
using Persistence;

namespace Application.Examples
{
    public class Create
    {
        public class Command : IRequest
        {
            public Example Example { get; set; }
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
                _context.Examples.Add(request.Example);

                await _context.SaveChangesAsync();
            }

        }
    }
}