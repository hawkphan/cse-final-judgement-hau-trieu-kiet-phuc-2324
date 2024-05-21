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
using Persistence;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;

        public AccountsController(UserManager<AppUser> userManager, TokenService tokenService, DataContext context)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _context = context;
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
                return await CreateNewUserDto(user);
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
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Rating = 1000,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            await _userManager.AddToRoleAsync(user, "User");
            await _context.SaveChangesAsync();
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
                Token = _tokenService.CreateToken(user, roles),
                UserName = user.UserName,
                Roles = roles,
            };
        }

        [Authorize(Roles = "User,Admin,Author")]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return await CreateNewUserDto(user);
        }


    }
}