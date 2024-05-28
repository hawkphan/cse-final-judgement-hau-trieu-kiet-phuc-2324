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
        [HttpGet] //api/contests
        public async Task<IActionResult> GetContests([FromQuery] PagingParams param, [FromQuery] Guid userId)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param, UserId = userId }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ContestDto>> GetContest(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpGet("{id}/leaderboard")]
        public async Task<ActionResult<List<RankingMemberDto>>> GetRank(Guid id)
        {
            return HandleApiResult(await Mediator.Send(new Grade.Command { ContestId = id }));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateContest([FromBody] ContestDto newContest)
        {
            return HandleApiResult(await Mediator.Send(new Create.Command { Contest = newContest }));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditContest([FromRoute] Guid id, [FromBody] ContestDto contest)
        {
            contest.Id = id;
            return HandleApiResult(await Mediator.Send(new Edit.Command { Contest = contest }));
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
