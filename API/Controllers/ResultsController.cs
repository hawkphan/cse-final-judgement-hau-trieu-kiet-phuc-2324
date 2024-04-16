using Application.Core;
using Application.Results;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Controllers
{
    public class ResultsController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet] //api/results
        public async Task<IActionResult> GetResultsBySolutionId(Guid id, [FromQuery] PagingParams param)
        {
            return HandlePagedResult<Result>(await Mediator.Send(new List.Query { SolutionId = id, Params = param }));
        }
        // [AllowAnonymous]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Result>> UpdateResult(string id)
        // {
        //     if (id.IsNullOrEmpty())
        //     {
        //         return BadRequest("empty id");
        //     }
        //     return HandleApiResult(await Mediator.Send(new Update.Command { ResultId = id }));
        // }

    }
}
