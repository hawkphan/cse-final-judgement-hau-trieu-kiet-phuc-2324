// using Application.Solutions;
using API.DTOS;
using Application.Solutions;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.OpenApi.Models;

namespace API.Controllers
{
    public class SolutionsController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<Solution>> GetSolutions([FromQuery] Guid userId, [FromQuery] Guid problemId, [FromQuery] PagingParams param)
        {

            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param, UserId = userId, ProblemId = problemId }));
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> SubmitSolution(SolutionDto newSolution)
        {
            return HandleApiResult(await Mediator.Send(new Create.Command { SolutionDto = newSolution }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            return Ok();
        }
    }
}
