using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{
    public class Details
    {
        public class Query : IRequest<ContestDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ContestDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<ContestDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Contests.ProjectTo<ContestDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == request.Id);
            }
        }
    }
}