using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    Guid? ValidateToken(string token);
}
