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
        [HttpGet("overall-statistic")] //api/management/overal-statistic
        public async Task<IActionResult> GetOverallStatistic()
        {
            return HandleApiResult(await Mediator.Send(new WebsiteOverallStatistic.Query { }));
        }

        [AllowAnonymous]
        [HttpGet("solutions-statistic")] //api/management/solutions-statistic?start={start}&end={end}
        public async Task<IActionResult> GetSolutionStatistic(string start, string end)
        {
            DateTime startDate = DateTime.ParseExact(start, 
                                                "yyyy-MM-ddTHH:mm:ss.fffZ", 
                                                System.Globalization.CultureInfo.InvariantCulture);
            DateTime endDate = DateTime.ParseExact(end, 
                                                "yyyy-MM-ddTHH:mm:ss.fffZ", 
                                                System.Globalization.CultureInfo.InvariantCulture);
            
            return HandleApiResult(await Mediator.Send(new WebsiteSolutionStatistic.Query { startTime = startDate, endTime = endDate }));
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