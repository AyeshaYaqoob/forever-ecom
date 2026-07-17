using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public List<string> Images { get; set; } = new();
    public string Category { get; set; } = string.Empty;  // stored as string to match frontend
    public string? Subcategory { get; set; }
    public string? Brand { get; set; }
    public string Sku { get; set; } = string.Empty;
    public int Inventory { get; set; } = 0;
    public double Rating { get; set; } = 0;
    public int NumReviews { get; set; } = 0;
    public List<Review> Reviews { get; set; } = new();
    public Dictionary<string, string> Specifications { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Computed property
    public int DiscountPercentage =>
        ComparePrice.HasValue && ComparePrice.Value > Price
            ? (int)Math.Round((ComparePrice.Value - Price) / ComparePrice.Value * 100)
            : 0;
}

public class Review
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
