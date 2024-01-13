using Domain;
using MediatR;
using Persistence;

namespace Application.Examples
{
    public class Details
    {
        public class Query : IRequest<Example>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, Example>
        {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }
            public async Task<Example> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Examples.FindAsync(request.Id);
            }
        }
    }
}