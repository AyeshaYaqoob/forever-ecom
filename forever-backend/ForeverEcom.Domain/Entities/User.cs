using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.User;
    public string Phone { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; } = false;
    public string? ResetPasswordToken { get; set; }
    public DateTime? ResetPasswordExpire { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Owned collections (stored as JSON in PostgreSQL)
    public List<Address> Addresses { get; set; } = new();
    public List<CartItem> Cart { get; set; } = new();
    public List<Guid> WishlistProductIds { get; set; } = new();

    // Navigation (not stored directly)
    public List<Order> Orders { get; set; } = new();
}

public class Address
{
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string Country { get; set; } = "USA";
    public bool IsDefault { get; set; } = false;
}

public class CartItem
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
