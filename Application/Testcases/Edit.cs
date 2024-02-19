using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application.TestCases
{
    public class Edit
    {
        public class Command : IRequest
        {
            public TestCase TestCase;
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
                var TestCase = await _context.Activities.FindAsync(request.TestCase.Id);

                _mapper.Map(request.TestCase, TestCase);

                await _context.SaveChangesAsync();
            }
        }
    }
}
