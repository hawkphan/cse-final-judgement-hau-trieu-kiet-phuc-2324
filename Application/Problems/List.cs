using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Problem>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Problem>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<PagedList<Problem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var query = _context.Problems.AsQueryable();
                var problems = _context.Problems.ToList();
                return Result<PagedList<Problem>>.Success(
                    PagedList<Problem>.CreateAsyncUsingList(problems, request.Params.pageNumber, request.Params.PageSize)
                );
            }
        }
    }
}