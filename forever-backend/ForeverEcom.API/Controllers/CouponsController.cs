using ForeverEcom.Application.DTOs.Coupon;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/coupons")]
public class CouponsController : BaseController
{
    private readonly ICouponService _coupons;
    public CouponsController(ICouponService coupons) => _coupons = coupons;

    [HttpGet, Authorize(Roles = "admin")]
    public async Task<IActionResult> GetCoupons()
    {
        var coupons = await _coupons.GetCouponsAsync();
        return Ok(new { success = true, count = coupons.Count, coupons });
    }

    [HttpGet("{id:guid}"), Authorize(Roles = "admin")]
    public async Task<IActionResult> GetCoupon(Guid id)
    {
        var coupon = await _coupons.GetCouponAsync(id);
        return Ok(new { success = true, coupon });
    }

    [HttpPost, Authorize(Roles = "admin")]
    public async Task<IActionResult> CreateCoupon([FromBody] CreateCouponDto dto)
    {
        var coupon = await _coupons.CreateCouponAsync(dto);
        return StatusCode(201, new { success = true, coupon });
    }

    [HttpPut("{id:guid}"), Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateCoupon(Guid id, [FromBody] CreateCouponDto dto)
    {
        var coupon = await _coupons.UpdateCouponAsync(id, dto);
        return Ok(new { success = true, coupon });
    }

    [HttpDelete("{id:guid}"), Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteCoupon(Guid id)
    {
        await _coupons.DeleteCouponAsync(id);
        return Ok(new { success = true, message = "Coupon deleted" });
    }

    [HttpPost("validate"), Authorize]
    public async Task<IActionResult> ValidateCoupon([FromBody] ValidateCouponDto dto)
    {
        var (isValid, discount) = await _coupons.ValidateCouponAsync(dto);
        return Ok(new { success = true, isValid, discount });
    }
}
