using ForeverEcom.Application.DTOs.Wishlist;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/wishlist")]
[Authorize]
public class WishlistController : BaseController
{
    private readonly IWishlistService _wishlist;
    public WishlistController(IWishlistService wishlist) => _wishlist = wishlist;

    [HttpGet]
    public async Task<IActionResult> GetWishlist()
    {
        var products = await _wishlist.GetWishlistAsync(UserId);
        return Ok(new { success = true, wishlist = products });
    }

    [HttpPost]
    public async Task<IActionResult> AddToWishlist([FromBody] AddToWishlistDto dto)
    {
        var wishlist = await _wishlist.AddToWishlistAsync(UserId, dto.ProductId);
        return Ok(new { success = true, message = "Added to wishlist", wishlist });
    }

    [HttpDelete("{productId:guid}")]
    public async Task<IActionResult> RemoveFromWishlist(Guid productId)
    {
        var wishlist = await _wishlist.RemoveFromWishlistAsync(UserId, productId);
        return Ok(new { success = true, message = "Removed from wishlist", wishlist });
    }

    [HttpDelete]
    public async Task<IActionResult> ClearWishlist()
    {
        var wishlist = await _wishlist.ClearWishlistAsync(UserId);
        return Ok(new { success = true, message = "Wishlist cleared", wishlist });
    }
}
