using Domain;
using MediatR;
using Persistence;

namespace Application.Contest
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var contest = await _context.Contests.FindAsync(request.Id);
                _context.Remove(contest);

                await _context.SaveChangesAsync();
            }
        }


    }
}