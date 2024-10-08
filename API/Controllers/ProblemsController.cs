using Application.Core;
using Application.Problems;
using System.IO.Compression;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Text;
using System.IO;
using Microsoft.VisualBasic.FileIO;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http;
namespace API.Controllers
{
    public class ProblemsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/problems
        public async Task<IActionResult> GetProblems([FromQuery] PagingParams param, [FromQuery] bool isOnly, [FromQuery] Guid userId, [FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param, IsOnly = isOnly, UserId = userId, FromDate = fromDate, ToDate = toDate }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProblemDto>> GetProblem(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateProblem([FromForm] Problem newProblem, [FromForm] String allowedLanguages, [FromForm] IFormFile file)
        {
            return HandleApiResult(await Mediator.Send(new Create.Command { Problem = newProblem, AllowedLanguages = allowedLanguages, TestCaseZip = file }));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit([FromRoute] Guid id, [FromForm] Problem problem, [FromForm] String allowedLanguages, [FromForm] IFormFile? file)
        {
            problem.Id = id;
            return HandleApiResult(await Mediator.Send(new Edit.Command { Problem = problem, TestCaseZip = file, AllowedLanguages = allowedLanguages }));
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
