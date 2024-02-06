using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Languages
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Language Language { get; set; }
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
                var Language = await _context.Languages.FindAsync(request.Language.Id);
                
                _mapper.Map(request.Language, Language);

                await _context.SaveChangesAsync();
            }
        }
    }
}
