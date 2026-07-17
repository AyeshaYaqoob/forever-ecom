using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ForeverEcom.Infrastructure.Services;

public class JwtService : IJwtService
{
    private readonly string _secret;
    private readonly int _expireDays;

    public JwtService(IConfiguration config)
    {
        _secret = config["JwtSettings:Secret"] ?? throw new InvalidOperationException("JWT Secret not configured");
        _expireDays = int.TryParse(config["JwtSettings:ExpiresInDays"], out var d) ? d : 3;
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("id", user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString().ToLower())
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(_expireDays),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public Guid? ValidateToken(string token)
    {
        try
        {
            var handler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            var jwt = (JwtSecurityToken)validatedToken;
            var idClaim = jwt.Claims.FirstOrDefault(c => c.Type == "id");
            return idClaim != null ? Guid.Parse(idClaim.Value) : null;
        }
        catch
        {
            return null;
        }
    }
}
