using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Dtos;
using Application.Notifications;
namespace API.Controllers
{
    public class NotificationsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/notifications
        public async Task<IActionResult> GetNotifications([FromQuery] PagingParams param, [FromQuery] Guid userId)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param, UserId = userId }));
        }
    }
}
