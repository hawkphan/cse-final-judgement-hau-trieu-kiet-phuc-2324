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
using System.Collections.Generic;
using System.Linq;
using Domain.Dtos;

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
            private readonly DataContext _context;

            public Handler(IMapper mapper, UserManager<AppUser> userManager, DataContext context)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }
            public async Task<ApiResult<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId);
                var solutions = _context.Solutions.AsQueryable();
                Guid? userId = Guid.Parse(request.UserId);
                solutions = solutions.Where(s => s.UserId == userId);

                var profile = _mapper.Map<ProfileDto>(user);
                string avatarPath = Path.Combine(Directory.GetCurrentDirectory(), $"Uploads\\Images\\{user.Id}.jpg");

                if (File.Exists(avatarPath))
                {
                    byte[] fileBytes = await File.ReadAllBytesAsync(avatarPath);
                    string base64Image = Convert.ToBase64String(fileBytes);
                    profile.Avatar = base64Image;
                }

                var languageUsage = solutions.GroupBy(s => s.LanguageId)
                .Select(group => group.Key)
                .ToList();
                profile.LanguageUsage = languageUsage;

                DateTime startOfLastWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Monday).AddDays(-7);
                DateTime endOfLastWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);

                var Views = solutions.GroupBy(s => s.ProblemId);
                var SolvedProblems = Views.Where(group => group.Any(solution => solution.Status == 3));
                if (profile.Activities == null)
                {
                    profile.Activities = new UserActivityRecord();
                }
                profile.Activities.Views = Views.Count();
                profile.Activities.LastWeekViews = Views.Count(group => group.Any(
                    solution => (solution.CreatedDate >= startOfLastWeek && solution.CreatedDate <= endOfLastWeek)));

                profile.Activities.Solutions = solutions.Count();
                profile.Activities.LastWeekSolutions = solutions.Count(solution => (solution.CreatedDate >= startOfLastWeek && solution.CreatedDate <= endOfLastWeek));

                profile.Activities.SolvedProblems = SolvedProblems.Count();
                profile.Activities.LastWeekSolvedProblems = SolvedProblems.Count(group => group.Any(
                    solution => (solution.CreatedDate >= startOfLastWeek && solution.CreatedDate <= endOfLastWeek)));

                return ApiResult<ProfileDto>.Success(profile);
            }
        }
    }
}
