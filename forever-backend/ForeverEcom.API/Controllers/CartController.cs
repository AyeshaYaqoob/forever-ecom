using ForeverEcom.Application.DTOs.Cart;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : BaseController
{
    private readonly ICartService _cart;
    public CartController(ICartService cart) => _cart = cart;

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var cart = await _cart.GetCartAsync(UserId);
        return Ok(new { success = true, cart });
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
    {
        var cart = await _cart.AddToCartAsync(UserId, dto);
        return Ok(new { success = true, message = "Item added to cart", cart });
    }

    [HttpPut("{productId:guid}")]
    public async Task<IActionResult> UpdateCartItem(Guid productId, [FromBody] UpdateCartDto dto)
    {
        var cart = await _cart.UpdateCartItemAsync(UserId, productId, dto);
        return Ok(new { success = true, message = "Cart updated", cart });
    }

    [HttpDelete("{productId:guid}")]
    public async Task<IActionResult> RemoveFromCart(Guid productId)
    {
        var cart = await _cart.RemoveFromCartAsync(UserId, productId);
        return Ok(new { success = true, message = "Item removed from cart", cart });
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var cart = await _cart.ClearCartAsync(UserId);
        return Ok(new { success = true, message = "Cart cleared", cart });
    }

    [HttpPost("movetowishlist/{productId:guid}")]
    public async Task<IActionResult> MoveToWishlist(Guid productId)
    {
        var (cart, wishlist) = await _cart.MoveToWishlistAsync(UserId, productId);
        return Ok(new { success = true, message = "Item moved to wishlist", cart, wishlist });
    }
}
