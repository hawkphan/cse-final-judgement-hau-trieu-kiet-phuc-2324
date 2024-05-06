using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class List
    {

        public class Query : IRequest<Result<PagedList<ProfileDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProfileDto>>>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _context = context;
                _mapper = mapper;
                _userManager = userManager;
            }

            public async Task<Result<PagedList<ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _userManager.Users
                    .AsQueryable()
                    .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                int pageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int pageSize = (request.Params.PageNumber == -1) ? users.Count : request.Params.PageSize;

                return Result<PagedList<ProfileDto>>
                    .Success(PagedList<ProfileDto>.CreateAsyncUsingList(users, pageNumber, pageSize));
            }
        }
    }
}