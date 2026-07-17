namespace ForeverEcom.Application.DTOs.Product;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public int DiscountPercentage { get; set; }
    public List<string> Images { get; set; } = new();
    public string Category { get; set; } = string.Empty;
    public string? Subcategory { get; set; }
    public string? Brand { get; set; }
    public string Sku { get; set; } = string.Empty;
    public int Inventory { get; set; }
    public double Rating { get; set; }
    public int NumReviews { get; set; }
    public List<ReviewDto> Reviews { get; set; } = new();
    public Dictionary<string, string> Specifications { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ReviewDto
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public List<string> Images { get; set; } = new();
    public string Category { get; set; } = string.Empty;
    public string? Subcategory { get; set; }
    public string? Brand { get; set; }
    public string Sku { get; set; } = string.Empty;
    public int Inventory { get; set; }
    public Dictionary<string, string> Specifications { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public bool IsFeatured { get; set; }
}

public class UpdateProductDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public List<string>? Images { get; set; }
    public string? Category { get; set; }
    public string? Subcategory { get; set; }
    public string? Brand { get; set; }
    public string? Sku { get; set; }
    public int? Inventory { get; set; }
    public Dictionary<string, string>? Specifications { get; set; }
    public List<string>? Tags { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? IsActive { get; set; }
}

public class CreateReviewDto
{
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
}

public class ProductQueryDto
{
    public int Page { get; set; } = 1;
    public int Limit { get; set; } = 12;
    public string? Category { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public double? MinRating { get; set; }
    public string? Search { get; set; }
    public string? SortBy { get; set; }
}
