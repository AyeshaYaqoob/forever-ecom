namespace ForeverEcom.Application.DTOs.Cart;

public record AddToCartDto(Guid ProductId, int Quantity = 1);

public record UpdateCartDto(int Quantity);

/// <summary>Product details embedded in each cart item response — matches what the frontend MiniCart expects.</summary>
public class CartItemProductDto
{
    public string Id { get; set; } = string.Empty;
    public string _id { get; set; } = string.Empty;   // alias so frontend _id checks work
    public string Name { get; set; } = string.Empty;
    public List<string> Images { get; set; } = new();
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string? Brand { get; set; }
    public int Inventory { get; set; }
}

public class CartItemDto
{
    public CartItemProductDto Product { get; set; } = new();
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
