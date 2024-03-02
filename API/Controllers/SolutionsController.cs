using Application.Solutions;
using Domain;
using MediatR;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Solution>> GetSolutions(Guid id)
        {
            //return await Mediator.Send(new Details.Query { Id = id });
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> CreateSolutions(Solution newSolution)
        {
            

            return HandleApiResult(await Mediator.Send(new Create.Command { Solution = newSolution }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            //await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
