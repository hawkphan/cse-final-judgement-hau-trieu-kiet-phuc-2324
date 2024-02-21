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
        // [AllowAnonymous]
        // [HttpGet] //api/languages
        // public async Task<ActionResult<LanguageDto>> GetLanguages(CancellationToken ct)
        // {
        //     return await Mediator.Send(new List.Query(), ct);
        // }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<LanguageDto>> GetLanguage(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateLanguage(Language newLanguage)
        {
            await Mediator.Send(new Create.Command { Language = newLanguage });

            return Ok();
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Language Language)
        {
            Language.Id = id;
            await Mediator.Send(new Edit.Command { Language = Language });

            return Ok();
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
