using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Coupon;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface ICouponService
{
    Task<List<CouponDto>> GetCouponsAsync();
    Task<CouponDto> GetCouponAsync(Guid id);
    Task<CouponDto> CreateCouponAsync(CreateCouponDto dto);
    Task<CouponDto> UpdateCouponAsync(Guid id, CreateCouponDto dto);
    Task DeleteCouponAsync(Guid id);
    Task<(bool IsValid, decimal Discount)> ValidateCouponAsync(ValidateCouponDto dto);
}
