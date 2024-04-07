using Application.Core;
using Application.Languages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class LanguagesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/languages
        public async Task<IActionResult> GetLanguages([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<LanguageDto>> GetLanguage(int id)
        {
            // return await Mediator.Send(new Details.Query { Id = id });
            return Ok();

        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateLanguage(Language newLanguage)
        {
            // await Mediator.Send(new Create.Command { Language = newLanguage });
            return Ok();
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Language Language)
        {
            return Ok();

            // return HandleApiResult(await Mediator.Send(new Edit.Command { Language = Language }));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            // await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
