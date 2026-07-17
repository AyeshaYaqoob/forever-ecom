using ForeverEcom.Application.DTOs.Cart;

namespace ForeverEcom.Application.Interfaces;

public interface ICartService
{
    Task<List<CartItemDto>> GetCartAsync(Guid userId);
    Task<List<CartItemDto>> AddToCartAsync(Guid userId, AddToCartDto dto);
    Task<List<CartItemDto>> UpdateCartItemAsync(Guid userId, Guid productId, UpdateCartDto dto);
    Task<List<CartItemDto>> RemoveFromCartAsync(Guid userId, Guid productId);
    Task<List<CartItemDto>> ClearCartAsync(Guid userId);
    Task<(List<CartItemDto> Cart, List<Guid> Wishlist)> MoveToWishlistAsync(Guid userId, Guid productId);
}
