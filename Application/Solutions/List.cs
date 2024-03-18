using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Solutions
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Solution>>>
        {
            public Guid? UserId { get; set; }
            public Guid? ProblemId { get; set; }
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Solution>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<Solution>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? problemId = request.ProblemId;
                Guid? userId = request.UserId;

                var solutions = _context.Solutions.Include(s => s.Language).Include(s => s.Results).ThenInclude(r => r.TestCase).AsQueryable();
                
                if (userId != null)
                {
                    solutions = solutions.Where(s => s.UserId == userId);
                }

                if (problemId != null)
                {
                    solutions = solutions.Where(s => s.ProblemId == problemId);
                }

                var queryList = await solutions.OrderByDescending(s => s.CreatedDate).ToListAsync();


                int PageNumber = (request.Params.PageSize == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageSize == -1) ? queryList.Count : request.Params.PageSize;

                return Result<PagedList<Solution>>
                    .Success(PagedList<Solution>.CreateAsyncUsingList(queryList,
                        PageNumber, PageSize));
            }
        }
    }
}