using Domain;
using MediatR;
using Application.Chart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.Identity;
using API.Services;


namespace API.Controllers
{
    public class ManagementController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenServices;

        public ManagementController(UserManager<AppUser> userManager, TokenService tokenServices)
        {
            _tokenServices = tokenServices;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("overal-statistic")] //api/management/overal-statistic
        public async Task<IActionResult> GetOveralStatistic()
        {
            return HandleApiResult(await Mediator.Send(new WebsiteOveralStatistic.Query { }));
        }

        [AllowAnonymous]
        [HttpGet("solutions-statistic")] //api/management/solutions-statistic?dateString={dateString}
        public async Task<IActionResult> GetSolutionStatistic(string dateString)
        {
            DateTime date = DateTime.ParseExact(dateString, 
                                                "yyyy-MM-ddTHH:mm:ss.fffZ", 
                                                System.Globalization.CultureInfo.InvariantCulture);
            
            return HandleApiResult(await Mediator.Send(new WebsiteSolutionStatistic.Query { dateTime = date }));
        }

        [AllowAnonymous]
        [HttpGet("problems-statistic")] //api/management/problems-statistic?dateString={dateString}
        public async Task<IActionResult> GetProblemsStatistic(string dateString)
        {
            DateTime date = DateTime.ParseExact(dateString, 
                                                "yyyy-MM-ddTHH:mm:ss.fffZ", 
                                                System.Globalization.CultureInfo.InvariantCulture);
            return HandleApiResult(await Mediator.Send(new WebsiteCreatedProblemStatistic.Query { dateTime = date }));
        }
    }
}