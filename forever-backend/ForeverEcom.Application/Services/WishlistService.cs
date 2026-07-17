using ForeverEcom.Application.Common;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Services;

public class WishlistService : IWishlistService
{
    private readonly IUserRepository _userRepo;
    private readonly IProductRepository _productRepo;

    public WishlistService(IUserRepository userRepo, IProductRepository productRepo)
    {
        _userRepo = userRepo;
        _productRepo = productRepo;
    }

    public async Task<List<Product>> GetWishlistAsync(Guid userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        var products = new List<Product>();
        foreach (var id in user.WishlistProductIds)
        {
            var p = await _productRepo.GetByIdAsync(id);
            if (p != null) products.Add(p);
        }
        return products;
    }

    public async Task<List<Product>> AddToWishlistAsync(Guid userId, Guid productId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        if (!user.WishlistProductIds.Contains(productId))
            user.WishlistProductIds.Add(productId);

        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return await GetWishlistAsync(userId);
    }

    public async Task<List<Product>> RemoveFromWishlistAsync(Guid userId, Guid productId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        user.WishlistProductIds.Remove(productId);
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return await GetWishlistAsync(userId);
    }

    public async Task<List<Product>> ClearWishlistAsync(Guid userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        user.WishlistProductIds.Clear();
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return new List<Product>();
    }
}
