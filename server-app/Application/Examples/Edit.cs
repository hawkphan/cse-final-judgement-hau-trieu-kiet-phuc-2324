using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Examples
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Example Example { get; set; }
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
                var Example = await _context.Examples.FindAsync(request.Example.Id);

                _mapper.Map(request.Example, Example);

                await _context.SaveChangesAsync();
            }
        }
    }
}
