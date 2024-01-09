using Application.Problems;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProblemsController : BaseApiController
    {
        [HttpGet] //api/problems
        public async Task<ActionResult<List<Problem>>> GetProblems(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Problem>> GetProblem(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult> CreateProblem(Problem newProblem)
        {
            await Mediator.Send(new Create.Command { Problem = newProblem });

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Problem Problem)
        {
            Problem.Id = id;
            await Mediator.Send(new Edit.Command { Problem = Problem });

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
