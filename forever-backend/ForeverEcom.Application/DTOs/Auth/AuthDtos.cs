namespace ForeverEcom.Application.DTOs.Auth;

public record RegisterDto(string Name, string Email, string Password);

public record LoginDto(string Email, string Password);

public record ForgotPasswordDto(string Email);

public record ResetPasswordDto(string Password);

public record UpdateProfileDto(string? Name, string? Phone, string? Avatar);

public record UpdatePasswordDto(string CurrentPassword, string NewPassword);

public class UserResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public List<object> Addresses { get; set; } = new();
    public List<object> Cart { get; set; } = new();
    public List<Guid> Wishlist { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class AuthResponseDto
{
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public UserResponseDto User { get; set; } = new();
}
