using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Detail
    {
        public class Query : IRequest<Result<Domain.Profile>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Domain.Profile>>
        {
            // private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                // _context = context;
            }
            public async Task<Result<Domain.Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId);
                var profile = _mapper.Map<Domain.Profile>(user);

                if (user == null) return null;

                return Result<Domain.Profile>.Success(profile);
            }
        }
    }
}
