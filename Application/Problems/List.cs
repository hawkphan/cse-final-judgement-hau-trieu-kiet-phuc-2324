using Application.Core;
using Application.Interfaces;
using AutoMapper;
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<Problem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var problems = _context.Problems
                .Include(u => u.User)
                .Include(s => s.Solutions)
                    .ThenInclude(su => su.User)
                .Include(t => t.TestCases)
                .Include(pl => pl.ProblemLanguages)
                .ToList();

                var pagedProblems = PagedList<Problem>.CreateAsyncUsingList(problems, request.Params.pageNumber, request.Params.PageSize);
                return Result<PagedList<Problem>>.Success(
                    pagedProblems
                );
            }
        }
    }
}