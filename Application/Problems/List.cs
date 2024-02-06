using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ProblemDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProblemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ProblemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string key = request.Params.Keywords;
                var query = await _context.Problems
                .ProjectTo<ProblemDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
                if (!string.IsNullOrEmpty(key))
                {
                    query = await _context.Problems.
                    Where(problem =>
                    problem.Title.Contains(request.Params.Keywords) || problem.Code.Contains(request.Params.Keywords))
                    .ProjectTo<ProblemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                }


                return Result<PagedList<ProblemDto>>
                    .Success(PagedList<ProblemDto>.CreateAsyncUsingList(query,
                        request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}