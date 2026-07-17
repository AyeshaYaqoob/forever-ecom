using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Cart;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Services;

public class CartService : ICartService
{
    private readonly IUserRepository _userRepo;
    private readonly IProductRepository _productRepo;

    public CartService(IUserRepository userRepo, IProductRepository productRepo)
    {
        _userRepo = userRepo;
        _productRepo = productRepo;
    }

    // ── Helper: map raw CartItem list → enriched CartItemDto list ────────────
    private async Task<List<CartItemDto>> EnrichCartAsync(List<CartItem> cartItems)
    {
        var result = new List<CartItemDto>();
        foreach (var item in cartItems)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product == null) continue; // skip orphaned items

            var idStr = item.ProductId.ToString();
            result.Add(new CartItemDto
            {
                Product = new CartItemProductDto
                {
                    Id   = idStr,
                    _id  = idStr,
                    Name = product.Name,
                    Images = product.Images,
                    Price  = product.Price,
                    Category  = product.Category,
                    Brand     = product.Brand,
                    Inventory = product.Inventory
                },
                Quantity = item.Quantity,
                Price    = item.Price
            });
        }
        return result;
    }

    public async Task<List<CartItemDto>> GetCartAsync(Guid userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);
        return await EnrichCartAsync(user.Cart);
    }

    public async Task<List<CartItemDto>> AddToCartAsync(Guid userId, AddToCartDto dto)
    {
        var product = await _productRepo.GetByIdAsync(dto.ProductId)
            ?? throw new AppException("Product not found", 404);

        if (product.Inventory < dto.Quantity)
            throw new AppException("Insufficient inventory", 400);

        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        var existing = user.Cart.FirstOrDefault(c => c.ProductId == dto.ProductId);
        if (existing != null)
            existing.Quantity += dto.Quantity;
        else
            user.Cart.Add(new CartItem { ProductId = dto.ProductId, Quantity = dto.Quantity, Price = product.Price });

        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return await EnrichCartAsync(user.Cart);
    }

    public async Task<List<CartItemDto>> UpdateCartItemAsync(Guid userId, Guid productId, UpdateCartDto dto)
    {
        if (dto.Quantity < 1)
            throw new AppException("Quantity must be at least 1", 400);

        var product = await _productRepo.GetByIdAsync(productId)
            ?? throw new AppException("Product not found", 404);

        if (product.Inventory < dto.Quantity)
            throw new AppException("Insufficient inventory", 400);

        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        var item = user.Cart.FirstOrDefault(c => c.ProductId == productId)
            ?? throw new AppException("Item not found in cart", 404);

        item.Quantity = dto.Quantity;
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return await EnrichCartAsync(user.Cart);
    }

    public async Task<List<CartItemDto>> RemoveFromCartAsync(Guid userId, Guid productId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        user.Cart.RemoveAll(c => c.ProductId == productId);
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return await EnrichCartAsync(user.Cart);
    }

    public async Task<List<CartItemDto>> ClearCartAsync(Guid userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        user.Cart.Clear();
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return new List<CartItemDto>();
    }

    public async Task<(List<CartItemDto> Cart, List<Guid> Wishlist)> MoveToWishlistAsync(Guid userId, Guid productId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new AppException("User not found", 404);

        user.Cart.RemoveAll(c => c.ProductId == productId);

        if (!user.WishlistProductIds.Contains(productId))
            user.WishlistProductIds.Add(productId);

        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);
        return (await EnrichCartAsync(user.Cart), user.WishlistProductIds);
    }
}
