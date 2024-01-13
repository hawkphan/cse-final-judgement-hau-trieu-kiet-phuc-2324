using Domain;
using MediatR;
using Persistence;

namespace Application.Problems
{
    public class Details
    {
        public class Query : IRequest<Problem>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, Problem>
        {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }
            public async Task<Problem> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Problems.FindAsync(request.Id);
            }
        }
    }
}