using Application.Core;
using Application.Contest;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Contests;
using Domain.Dtos;
namespace API.Controllers
{
    public class ContestsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("unregistered")] //api/Contests
        public async Task<IActionResult> GetUnregisteredContests([FromQuery] PagingParams pagingParams, [FromQuery] Guid userId)
        {
            return HandlePagedResult(await Mediator.Send(new UnregisteredList.Query { Params = pagingParams, UserId = userId }));
        }
        [AllowAnonymous]
        [HttpGet("registered")]
        public async Task<IActionResult> GetRegisteredContests([FromQuery] PagingParams pagingParams, [FromQuery] Guid userId)
        {
            return HandlePagedResult(await Mediator.Send(new RegisteredList.Query { Params = pagingParams, UserId = userId }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ContestDto>> GetContest(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateContest(Contest newContest)
        {
            await Mediator.Send(new Create.Command { Contest = newContest });
            return Ok();
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditContest([FromRoute] Guid id, [FromForm] Contest contest)
        {
            // Problem.Id = id;
            // return HandleApiResult(await Mediator.Send(new Edit.Command { Problem = Problem, TestCaseZip = file }));
            throw new NotImplementedException();
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
