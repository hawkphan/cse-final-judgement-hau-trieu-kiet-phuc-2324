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
    public class Leaderboard
    {

        public class Query : IRequest<Result<PagedList<RankUserDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<RankUserDto>>>
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

            public async Task<Result<PagedList<RankUserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _userManager.Users
                    .AsQueryable()
                    .OrderByDescending(x => x.Rating)
                    .ProjectTo<RankUserDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                int currentRank = 1;
                double previousElo = double.MinValue;

                for (int i = 0; i < users.Count; i++)
                {
                    if (users[i].Elo != previousElo)
                    {
                        currentRank = i + 1;
                        previousElo = users[i].Elo;
                    }
                    users[i].Id = users[i].Id.ToLower();
                    users[i].Rank = currentRank;
                }

                int pageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int pageSize = (request.Params.PageNumber == -1) ? users.Count : request.Params.PageSize;

                return Result<PagedList<RankUserDto>>
                    .Success(PagedList<RankUserDto>.CreateAsyncUsingList(users, pageNumber, pageSize));
            }
        }
    }
}