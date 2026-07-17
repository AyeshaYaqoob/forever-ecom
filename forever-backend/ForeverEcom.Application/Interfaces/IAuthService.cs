using ForeverEcom.Application.DTOs.Auth;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    Task<User> GetMeAsync(Guid userId);
    Task<User> UpdateProfileAsync(Guid userId, UpdateProfileDto dto);
    Task<string> UpdatePasswordAsync(Guid userId, UpdatePasswordDto dto);
    Task<string> ForgotPasswordAsync(ForgotPasswordDto dto);
    Task<string> ResetPasswordAsync(string resetToken, ResetPasswordDto dto);
}
