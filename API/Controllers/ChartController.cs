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
    public class ChartController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenServices;

        public ChartController(UserManager<AppUser> userManager, TokenService tokenServices)
        {
            _tokenServices = tokenServices;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("annual-chart/{id}")] //api/chart/profile-chart/id
        public async Task<IActionResult> GetAnnualChart(Guid id)
        {
            return HandleApiResult(await Mediator.Send(new AnnualSubmissionChartDetail.Query { UserId = id }));
        }

        [AllowAnonymous]
        [HttpGet("languages-chart/{id}")] //api/chart/languages-chart/id
        public async Task<IActionResult> GetLanguagesChart(Guid id)
        {
            return HandleApiResult(await Mediator.Send(new LanguagesUsagesChartDetail.Query { UserId = id }));
        }

        [AllowAnonymous]
        [HttpGet("statistic-chart/{id}")] //api/chart/statistic-chart/id
        public async Task<IActionResult> GetStatisticChart(Guid id)
        {
            return HandleApiResult(await Mediator.Send(new ProblemStatisticChartDetail.Query { UserId = id }));
        }
    }
}