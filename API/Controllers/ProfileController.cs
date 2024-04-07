using Application.Activities;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using API.DTOS;
using Application.Solutions;
using Microsoft.AspNetCore.Identity;
using API.Services;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenServices;

        public ProfileController(UserManager<AppUser> userManager, TokenService tokenServices)
        {   
            _tokenServices = tokenServices;
            _userManager = userManager;
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
                return CreateNewUserDto(user);
            }
            return BadRequest(result.Errors);
        }

        private UserDto CreateNewUserDto(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenServices.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}
