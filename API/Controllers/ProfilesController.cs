using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using API.DTOS;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Application.Core;
using Application.Solutions;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenServices;

        public ProfilesController(UserManager<AppUser> userManager, TokenService tokenServices)
        {
            _tokenServices = tokenServices;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet] //api/profiles
        public async Task<IActionResult> GetAllProfiles([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Profiles.List.Query { Params = param }));
        }

        [AllowAnonymous]
        [HttpGet("{id}")] //api/profile
        public async Task<IActionResult> GetUserProfile(string id)
        {
            return HandleApiResult(await Mediator.Send(new Detail.Query { UserId = id }));
        }


        [AllowAnonymous]
        [HttpPut("editProfile")]
        public async Task<ActionResult<UserDto>> EditProfile([FromForm] UpdateDto UpdateDto)
        {
            FileManager fileManager = new FileManager();
            var user = await _userManager.FindByEmailAsync(UpdateDto.Email);
            user.DisplayName = UpdateDto.DisplayName;
            user.FirstName = UpdateDto.FirstName;
            user.LastName = UpdateDto.LastName;
            user.Gender = UpdateDto.Gender;
            user.Birthday = UpdateDto.Birthday;

            if (UpdateDto.Image != null && UpdateDto.Image.Length > 0)
            {
                fileManager.SaveFile(UpdateDto.Image, fileManager.ImagesPath, user.Id);
                user.AvatarUrl = Path.Combine("Uploads\\Images", $"{user.Id}.jpg");
            }

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return await CreateNewUserDto(user);
            }
            return BadRequest(result.Errors);
        }

        private async Task<UserDto> CreateNewUserDto(AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenServices.CreateToken(user, roles),
                UserName = user.UserName
            };
        }
    }
}
