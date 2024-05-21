using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Results
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Result>>>
        {
            public Guid SolutionId { get; set; }
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<Result>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<Result>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();

                var query = await _context.Results.Include(r => r.TestCase).Where(r => r.SolutionId == request.SolutionId).ToListAsync();

                query = query.OrderBy(r => int.Parse(r.TestCase.Name)).ToList();

                int PageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageNumber == -1) ? query.Count : request.Params.PageSize;

                return Result<PagedList<Result>>
                    .Success(PagedList<Result>.CreateAsyncUsingList(query,
                        PageNumber, PageSize));
            }
        }
    }
}