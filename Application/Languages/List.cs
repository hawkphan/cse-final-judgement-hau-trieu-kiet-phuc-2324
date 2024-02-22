using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Languages
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<LanguageDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<LanguageDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<LanguageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await _context.Languages
                    .ProjectTo<LanguageDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                return Result<PagedList<LanguageDto>>
                    .Success(PagedList<LanguageDto>.CreateAsyncUsingList(query,
                        1, query.Count));
            }
        }
    }
}