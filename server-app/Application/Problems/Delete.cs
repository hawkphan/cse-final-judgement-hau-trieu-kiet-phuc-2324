using Domain;
using MediatR;
using Persistence;

namespace Application.Problems
{
    public class Delete
    {
        public class Command : IRequest{
            public Guid Id {get;set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;


            public Handler(DataContext context){
                _context =context;
            }


            public async Task Handle(Command request, CancellationToken cancellationToken)
            {

                var problem = await _context.Problems.FindAsync(request.Id);
                _context.Remove(problem);

                await _context.SaveChangesAsync();
            }
        }


    }
}