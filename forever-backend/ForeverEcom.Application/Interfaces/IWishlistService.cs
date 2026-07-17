using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IWishlistService
{
    Task<List<Product>> GetWishlistAsync(Guid userId);
    Task<List<Product>> AddToWishlistAsync(Guid userId, Guid productId);
    Task<List<Product>> RemoveFromWishlistAsync(Guid userId, Guid productId);
    Task<List<Product>> ClearWishlistAsync(Guid userId);
}
