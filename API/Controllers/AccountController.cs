using System.Security.Claims;
using API.DTOS;
using API.Services;
using Application.Profiles;
using Application.Solutions;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenServices;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenServices)
        {
            _tokenServices = tokenServices;
            _userManager = userManager;
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateNewUserDto(user);
            }
            else
            {
                return Unauthorized();
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username taken");
            }
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email taken");
            }
            var user = new AppUser
            {
                DisplayName = registerDto.UserName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return CreateNewUserDto(user);
            }
            return BadRequest(result.Errors);
        }

        [AllowAnonymous]
        [HttpPut("EditProfile")]
        public async Task<ActionResult<UserDto>> Update([FromForm] UpdateDto UpdateDto)
        {
            var user = await _userManager.FindByEmailAsync(UpdateDto.Email);
            user.DisplayName = UpdateDto.UserName;
            user.FirstName = UpdateDto.FirstName;
            user.LastName = UpdateDto.LastName;
            user.FirstName = UpdateDto.FirstName;

            FileManager fileManager = new FileManager();
            fileManager.SaveFile(UpdateDto.Image, fileManager.ProfilePicturePath, user.Id);


            await _userManager.UpdateAsync(user);
            return Ok();
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
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateNewUserDto(user);
        }


    }
}