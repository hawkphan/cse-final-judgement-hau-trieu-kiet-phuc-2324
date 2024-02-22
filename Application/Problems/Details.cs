using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class Details
    {
        public class Query : IRequest<ProblemDto>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, ProblemDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<ProblemDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Problems.ProjectTo<ProblemDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == request.Id);
            }
        }
    }
}