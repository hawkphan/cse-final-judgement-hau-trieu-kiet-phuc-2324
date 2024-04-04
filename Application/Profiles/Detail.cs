using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Solutions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.VisualBasic;

namespace Application.Profiles
{
    public class Detail
    {
        public class Query : IRequest<ApiResult<ProfileDto>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<ProfileDto>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
            }
            public async Task<ApiResult<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId);
                var profile = _mapper.Map<ProfileDto>(user);
                string avatarPath = Path.Combine(Directory.GetCurrentDirectory(), $"Uploads\\Images\\{user.Id}.jpg");

                if (File.Exists(avatarPath))
                {
                    byte[] fileBytes = await File.ReadAllBytesAsync(avatarPath);
                    string base64Image = Convert.ToBase64String(fileBytes);
                    profile.Avatar = base64Image;
                }
                return ApiResult<ProfileDto>.Success(profile);
            }
        }
    }
}
