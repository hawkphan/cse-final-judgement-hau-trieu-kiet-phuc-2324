using API.Extensions;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.Succeeded && result.Data != null)
                return Ok(result);

            if (result.Succeeded && result.Data == null)
                return NotFound();

            return BadRequest(result.Errors);
        }

        protected ActionResult HandleApiResult<T>(ApiResult<T> apiResult)
        {
            if (apiResult == null) return NotFound();
            if (apiResult.Succeeded && apiResult.Data != null)
                return Ok(apiResult);
            if (apiResult.Succeeded && apiResult.Data == null)
                return NotFound();

            return BadRequest(apiResult.Errors);
        }


        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {

            if (result == null) return NotFound();
            if (result.Succeeded && result.Data != null)
            {
                Response.AddPaginationHeader(result.Data.CurrentPage, result.Data.PageSize,
                    result.Data.TotalCount, result.Data.TotalPages);

                result.TotalCount = result.Data.TotalCount;
                result.PageSize = result.Data.PageSize;
                result.Records = result.Data.TotalCount;
                result.TotalPage = result.Data.TotalPages;
                result.PageNo = result.Data.CurrentPage;
                return Ok(result);
            }

            if (result.Succeeded && result.Data == null)
                return NotFound();
            return BadRequest(result.Errors);
        }
    }
}