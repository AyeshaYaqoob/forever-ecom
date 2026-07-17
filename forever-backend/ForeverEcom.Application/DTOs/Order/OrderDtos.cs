namespace ForeverEcom.Application.DTOs.Order;

public class CreateOrderDto
{
    public List<OrderItemInputDto> OrderItems { get; set; } = new();
    public AddressDto ShippingAddress { get; set; } = new();
    public string PaymentMethod { get; set; } = string.Empty;
    public string? CouponCode { get; set; }
}

public class OrderItemInputDto
{
    public Guid Product { get; set; }
    public int Quantity { get; set; }
}

public class AddressDto
{
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string Country { get; set; } = "USA";
    public bool IsDefault { get; set; } = false;
}

public class UpdateOrderStatusDto
{
    public string Status { get; set; } = string.Empty;
    public string? TrackingNumber { get; set; }
}

public class UpdateOrderToPaidDto
{
    public string? Id { get; set; }
    public string? Status { get; set; }
    public string? UpdateTime { get; set; }
    public string? EmailAddress { get; set; }
}

public class OrderDto
{
    public Guid Id { get; set; }
    public object? User { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
    public AddressDto ShippingAddress { get; set; } = new();
    public string PaymentMethod { get; set; } = string.Empty;
    public object? PaymentResult { get; set; }
    public decimal ItemsPrice { get; set; }
    public decimal TaxPrice { get; set; }
    public decimal ShippingPrice { get; set; }
    public decimal DiscountPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public string? CouponCode { get; set; }
    public bool IsPaid { get; set; }
    public DateTime? PaidAt { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? DeliveredAt { get; set; }
    public string? TrackingNumber { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class OrderItemDto
{
    public Guid Product { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
