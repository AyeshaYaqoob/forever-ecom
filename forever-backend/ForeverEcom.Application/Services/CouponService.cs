using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Coupon;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Application.Services;

public class CouponService : ICouponService
{
    private readonly ICouponRepository _couponRepo;

    public CouponService(ICouponRepository couponRepo)
    {
        _couponRepo = couponRepo;
    }

    public async Task<List<CouponDto>> GetCouponsAsync()
    {
        var coupons = await _couponRepo.GetAllAsync();
        return coupons.Select(MapCoupon).ToList();
    }

    public async Task<CouponDto> GetCouponAsync(Guid id)
    {
        var coupon = await _couponRepo.GetByIdAsync(id)
            ?? throw new AppException("Coupon not found", 404);
        return MapCoupon(coupon);
    }

    public async Task<CouponDto> CreateCouponAsync(CreateCouponDto dto)
    {
        var discountType = Enum.TryParse<DiscountType>(dto.DiscountType, true, out var dt) ? dt : DiscountType.Fixed;
        var coupon = new Coupon
        {
            Id = Guid.NewGuid(),
            Code = dto.Code.ToUpper().Trim(),
            DiscountType = discountType,
            DiscountValue = dto.DiscountValue,
            MinPurchase = dto.MinPurchase,
            MaxDiscount = dto.MaxDiscount,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            UsageLimit = dto.UsageLimit
        };
        await _couponRepo.CreateAsync(coupon);
        return MapCoupon(coupon);
    }

    public async Task<CouponDto> UpdateCouponAsync(Guid id, CreateCouponDto dto)
    {
        var coupon = await _couponRepo.GetByIdAsync(id)
            ?? throw new AppException("Coupon not found", 404);

        coupon.Code = dto.Code.ToUpper().Trim();
        if (Enum.TryParse<DiscountType>(dto.DiscountType, true, out var dt))
            coupon.DiscountType = dt;
        coupon.DiscountValue = dto.DiscountValue;
        coupon.MinPurchase = dto.MinPurchase;
        coupon.MaxDiscount = dto.MaxDiscount;
        coupon.StartDate = dto.StartDate;
        coupon.EndDate = dto.EndDate;
        coupon.UsageLimit = dto.UsageLimit;
        coupon.UpdatedAt = DateTime.UtcNow;

        await _couponRepo.UpdateAsync(coupon);
        return MapCoupon(coupon);
    }

    public async Task DeleteCouponAsync(Guid id)
    {
        var coupon = await _couponRepo.GetByIdAsync(id)
            ?? throw new AppException("Coupon not found", 404);
        await _couponRepo.DeleteAsync(coupon);
    }

    public async Task<(bool IsValid, decimal Discount)> ValidateCouponAsync(ValidateCouponDto dto)
    {
        var coupon = await _couponRepo.GetByCodeAsync(dto.Code.ToUpper());
        if (coupon == null || !coupon.IsValid())
            return (false, 0);

        return (true, coupon.CalculateDiscount(dto.Subtotal));
    }

    private static CouponDto MapCoupon(Coupon c) => new()
    {
        Id = c.Id,
        Code = c.Code,
        DiscountType = c.DiscountType.ToString().ToLower(),
        DiscountValue = c.DiscountValue,
        MinPurchase = c.MinPurchase,
        MaxDiscount = c.MaxDiscount,
        StartDate = c.StartDate,
        EndDate = c.EndDate,
        UsageLimit = c.UsageLimit,
        UsageCount = c.UsageCount,
        IsActive = c.IsActive
    };
}
