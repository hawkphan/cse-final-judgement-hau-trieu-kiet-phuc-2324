using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Languages
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Language>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Language>>>
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

            public async Task<Result<PagedList<Language>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Languages = _context.Languages
                // .Include(u => u.User.GetSafeProfileObject())
                .Include(pl => pl.ProblemLanguages).ThenInclude(pp => pp.Problem)
                .ToList();

                var pagedLanguages = PagedList<Language>.CreateAsyncUsingList(Languages, request.Params.pageNumber, request.Params.PageSize);
                return Result<PagedList<Language>>.Success(
                    pagedLanguages
                );
            }
        }
    }
}