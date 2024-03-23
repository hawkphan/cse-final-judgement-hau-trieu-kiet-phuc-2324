using Application.Activities;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("{id}")] //api/profile
        public async Task<IActionResult> GetUserProfile(string id)
        {
            return HandleApiResult(await Mediator.Send(new Detail.Query { UserId = id }));
        }
    }
}
