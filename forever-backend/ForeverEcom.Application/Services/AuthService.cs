using System.Security.Cryptography;
using System.Text;
using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Auth;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly IJwtService _jwtService;

    public AuthService(IUserRepository userRepo, IJwtService jwtService)
    {
        _userRepo = userRepo;
        _jwtService = jwtService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existing = await _userRepo.GetByEmailAsync(dto.Email);
        if (existing != null)
            throw new AppException("User already exists", 400);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Email = dto.Email.ToLower().Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.User
        };

        await _userRepo.CreateAsync(user);
        var token = _jwtService.GenerateToken(user);

        return new AuthResponseDto
        {
            Success = true,
            Message = "Registration successful! Welcome to FOREVER.",
            Token = token,
            User = MapUser(user)
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new AppException("Invalid credentials", 401);

        var token = _jwtService.GenerateToken(user);

        return new AuthResponseDto
        {
            Success = true,
            Message = "Login successful! Welcome back.",
            Token = token,
            User = MapUser(user)
        };
    }

    public async Task<User> GetMeAsync(Guid userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);
        return user;
    }

    public async Task<User> UpdateProfileAsync(Guid userId, UpdateProfileDto dto)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        if (dto.Name != null) user.Name = dto.Name;
        if (dto.Phone != null) user.Phone = dto.Phone;
        if (dto.Avatar != null) user.Avatar = dto.Avatar;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(user);
        return user;
    }

    public async Task<string> UpdatePasswordAsync(Guid userId, UpdatePasswordDto dto)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            throw new AppException("Current password is incorrect", 401);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);

        return _jwtService.GenerateToken(user);
    }

    public async Task<string> ForgotPasswordAsync(ForgotPasswordDto dto)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email)
            ?? throw new AppException("User not found", 404);

        var resetToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(20));
        user.ResetPasswordToken = HashToken(resetToken);
        user.ResetPasswordExpire = DateTime.UtcNow.AddMinutes(10);
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(user);
        return resetToken; // In production, send this via email
    }

    public async Task<string> ResetPasswordAsync(string resetToken, ResetPasswordDto dto)
    {
        var hashedToken = HashToken(resetToken);
        var user = await _userRepo.GetByResetTokenAsync(hashedToken)
            ?? throw new AppException("Invalid or expired token", 400);

        if (user.ResetPasswordExpire < DateTime.UtcNow)
            throw new AppException("Invalid or expired token", 400);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        user.ResetPasswordToken = null;
        user.ResetPasswordExpire = null;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(user);
        return _jwtService.GenerateToken(user);
    }

    private static string HashToken(string token) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));

    private static UserResponseDto MapUser(User user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Role = user.Role.ToString().ToLower(),
        Avatar = user.Avatar,
        Phone = user.Phone,
        IsEmailVerified = user.IsEmailVerified,
        CreatedAt = user.CreatedAt
    };
}
