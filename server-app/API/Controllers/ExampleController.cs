using Application.Examples;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ExamplesController : BaseApiController
    {
        [HttpGet] //api/Examples
        public async Task<ActionResult<List<Example>>> GetExamples(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Example>> GetExample(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult> CreateExample(Example newExample)
        {
            await Mediator.Send(new Create.Command { Example = newExample });

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Example Example)
        {
            Example.Id = id;
            await Mediator.Send(new Edit.Command { Example = Example });

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
