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
                ContestDto contestDto = await _context.Contests.Include(c => c.Problems).ProjectTo<ContestDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == request.Id);

                var contestProblems = await _context.ContestProblems.Include(p => p.Problem).ThenInclude(c => c.ProblemLanguages).Where(p => p.ContestId == request.Id).ToListAsync();
                var contestMembers = await _context.ContestMembers.Include(p => p.User).Where(p => p.ContestId == request.Id).ToListAsync();

                contestDto.Problems = contestProblems;
                contestDto.Members = contestMembers;
                contestDto.StartTime = contestDto.StartTime.AddHours(7);
                contestDto.EndTime = contestDto.EndTime.AddHours(7);

                return contestDto;
            }
        }
    }
}