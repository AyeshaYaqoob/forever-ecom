using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Auth;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
    private readonly IAuthService _auth;
    public AuthController(IAuthService auth) => _auth = auth;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _auth.RegisterAsync(dto);
        return StatusCode(201, result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _auth.LoginAsync(dto);
        return Ok(result);
    }

    [HttpGet("me"), Authorize]
    public async Task<IActionResult> GetMe()
    {
        var user = await _auth.GetMeAsync(UserId);
        return Ok(new { success = true, user });
    }

    [HttpPut("updateprofile"), Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var user = await _auth.UpdateProfileAsync(UserId, dto);
        return Ok(new { success = true, message = "Profile updated successfully", user });
    }

    [HttpPut("updatepassword"), Authorize]
    public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDto dto)
    {
        var token = await _auth.UpdatePasswordAsync(UserId, dto);
        return Ok(new { success = true, message = "Password updated successfully", token });
    }

    [HttpPost("forgotpassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        var resetToken = await _auth.ForgotPasswordAsync(dto);
        return Ok(new { success = true, message = "Password reset email sent", resetToken });
    }

    [HttpPut("resetpassword/{resettoken}")]
    public async Task<IActionResult> ResetPassword(string resettoken, [FromBody] ResetPasswordDto dto)
    {
        var token = await _auth.ResetPasswordAsync(resettoken, dto);
        return Ok(new { success = true, message = "Password reset successful", token });
    }

    [HttpGet("logout"), Authorize]
    public IActionResult Logout() => Ok(new { success = true, message = "Logged out successfully" });
}
