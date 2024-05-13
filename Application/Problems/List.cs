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
            public bool? IsOnly { get; set; }
            public Guid? UserId { get; set; }
            public DateTime? FromDate { get; set; }
            public DateTime? ToDate { get; set; }
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
                string order = request.Params.Order;
                bool? isOnly = request.IsOnly;
                Guid? userId = request.UserId;
                DateTime? fromDate = request.FromDate;
                DateTime? toDate = request.ToDate;

                var problems = _context.Problems.AsQueryable();

                if ((bool)isOnly && userId != null)
                {
                    problems = _context.Problems.Where(problem =>
                    problem.UserId.Equals(userId));
                }

                if (!string.IsNullOrEmpty(key))
                {
                    problems = _context.Problems.
                    Where(problem =>
                    problem.Title.Contains(key) || problem.Code.Contains(key));
                }

                if (fromDate != null && fromDate != DateTime.MinValue)
                {
                    problems = problems.Where(problem => problem.Date > fromDate);
                }

                if (toDate != null && toDate != DateTime.MinValue)
                {
                    problems = problems.Where(problem => problem.Date <= toDate);
                }

                if (!String.IsNullOrEmpty(order) && order.Contains("difficulty") && order.Contains("desc"))
                {
                    problems = problems.OrderByDescending(problem => problem.Difficulty);
                }
                if (!String.IsNullOrEmpty(order) && order.Contains("difficulty") && order.Contains("asc"))
                {
                    problems = problems.OrderBy(problem => problem.Difficulty);
                }

                if (!String.IsNullOrEmpty(order) && order.Contains("date") && order.Contains("desc"))
                {
                    problems = problems.OrderByDescending(problem => problem.Date);
                }
                if (!String.IsNullOrEmpty(order) && order.Contains("date") && order.Contains("asc"))
                {
                    problems = problems.OrderBy(problem => problem.Date);
                }

                if (String.IsNullOrEmpty(order))
                {
                    problems = problems.OrderByDescending(problem => problem.Date);
                }

                var query = await problems.ProjectTo<ProblemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken: cancellationToken);
                int PageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageNumber == -1) ? query.Count : request.Params.PageSize;
                return Result<PagedList<ProblemDto>>
                    .Success(PagedList<ProblemDto>.CreateAsyncUsingList(query,
                        PageNumber, PageSize));
            }
        }
    }
}