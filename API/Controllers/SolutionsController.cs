// using Application.Solutions;
using API.DTOS;
using Application.Solutions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SolutionsController : BaseApiController
    {
        [HttpGet] //api/Solutions
        public async Task<ActionResult<List<Solution>>> GetSolutions(CancellationToken ct)
        {
            //return await Mediator.Send(new List.Query(),ct);
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("{userId}/{problemId}")]
        public async Task<ActionResult<Solution>> GetSolutions(Guid userId, Guid problemId)
        {

            return HandlePagedResult(await Mediator.Send(new List.Query { UserId = userId, ProblemId = problemId }));
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
            //await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
