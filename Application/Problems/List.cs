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
                bool? isOnly = request.IsOnly;
                Guid? userId = request.UserId;
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
                    problem.Title.Contains(request.Params.Keywords) || problem.Code.Contains(request.Params.Keywords));

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