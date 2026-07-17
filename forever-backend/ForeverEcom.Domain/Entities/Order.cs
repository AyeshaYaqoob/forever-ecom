using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new();
    public Address ShippingAddress { get; set; } = new();
    public PaymentMethod PaymentMethod { get; set; }
    public PaymentResult? PaymentResult { get; set; }
    public decimal ItemsPrice { get; set; }
    public decimal TaxPrice { get; set; }
    public decimal ShippingPrice { get; set; }
    public decimal DiscountPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public string? CouponCode { get; set; }
    public bool IsPaid { get; set; } = false;
    public DateTime? PaidAt { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public DateTime? DeliveredAt { get; set; }
    public string? TrackingNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class OrderItem
{
    public Guid ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

public class PaymentResult
{
    public string? Id { get; set; }
    public string? Status { get; set; }
    public string? UpdateTime { get; set; }
    public string? EmailAddress { get; set; }
}
