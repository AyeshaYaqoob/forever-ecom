using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Domain.Entities;

public class Coupon
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public DiscountType DiscountType { get; set; }
    public decimal DiscountValue { get; set; }
    public decimal MinPurchase { get; set; } = 0;
    public decimal? MaxDiscount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? UsageLimit { get; set; }
    public int UsageCount { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public bool IsValid()
    {
        var now = DateTime.UtcNow;
        if (EndDate < now) return false;
        if (StartDate > now) return false;
        if (UsageLimit.HasValue && UsageCount >= UsageLimit.Value) return false;
        if (!IsActive) return false;
        return true;
    }

    public decimal CalculateDiscount(decimal subtotal)
    {
        if (!IsValid()) return 0;
        if (subtotal < MinPurchase) return 0;

        decimal discount;
        if (DiscountType == DiscountType.Percentage)
        {
            discount = subtotal * DiscountValue / 100;
            if (MaxDiscount.HasValue)
                discount = Math.Min(discount, MaxDiscount.Value);
        }
        else
        {
            discount = DiscountValue;
        }

        return Math.Min(discount, subtotal);
    }
}
