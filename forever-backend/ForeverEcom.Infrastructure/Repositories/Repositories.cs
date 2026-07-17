using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ForeverEcom.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ForeverDbContext _db;
    public UserRepository(ForeverDbContext db) => _db = db;

    public async Task<User?> GetByIdAsync(Guid id) => await _db.Users.FindAsync(id);

    public async Task<User?> GetByEmailAsync(string email) =>
        await _db.Users.FirstOrDefaultAsync(u => u.Email == email.ToLower());

    public async Task<User?> GetByResetTokenAsync(string hashedToken) =>
        await _db.Users.FirstOrDefaultAsync(u => u.ResetPasswordToken == hashedToken);

    public async Task<List<User>> GetAllAsync(int skip, int limit) =>
        await _db.Users.OrderByDescending(u => u.CreatedAt).Skip(skip).Take(limit).ToListAsync();

    public async Task<int> CountAsync() => await _db.Users.CountAsync();

    public async Task<User> CreateAsync(User user)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user;
    }

    public async Task UpdateAsync(User user)
    {
        _db.Users.Update(user);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
    }
}

public class ProductRepository : IProductRepository
{
    private readonly ForeverDbContext _db;
    public ProductRepository(ForeverDbContext db) => _db = db;

    public async Task<Product?> GetByIdAsync(Guid id) =>
        await _db.Products.FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

    public async Task<Product?> GetBySkuAsync(string sku) =>
        await _db.Products.FirstOrDefaultAsync(p => p.Sku == sku);

    public async Task<(List<Product> Products, int Total)> GetAllAsync(
        string? category, decimal? minPrice, decimal? maxPrice,
        double? minRating, string? search, string? sortBy, int skip, int limit)
    {
        var query = _db.Products.Where(p => p.IsActive);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);
        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice.Value);
        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice.Value);
        if (minRating.HasValue)
            query = query.Where(p => p.Rating >= minRating.Value);
        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => EF.Functions.ILike(p.Name, $"%{search}%") ||
                                     EF.Functions.ILike(p.Description, $"%{search}%"));

        query = sortBy switch
        {
            "price-asc" => query.OrderBy(p => p.Price),
            "price-desc" => query.OrderByDescending(p => p.Price),
            "name-asc" => query.OrderBy(p => p.Name),
            "name-desc" => query.OrderByDescending(p => p.Name),
            "rating" => query.OrderByDescending(p => p.Rating),
            "newest" => query.OrderByDescending(p => p.CreatedAt),
            _ => query.OrderByDescending(p => p.NumReviews).ThenByDescending(p => p.Rating)
        };

        var total = await query.CountAsync();
        var products = await query.Skip(skip).Take(limit).ToListAsync();
        return (products, total);
    }

    public async Task<List<Product>> GetFeaturedAsync(int limit) =>
        await _db.Products.Where(p => p.IsActive && p.IsFeatured)
            .OrderByDescending(p => p.CreatedAt).Take(limit).ToListAsync();

    public async Task<List<Product>> GetBestSellersAsync(int limit) =>
        await _db.Products.Where(p => p.IsActive)
            .OrderByDescending(p => p.NumReviews).ThenByDescending(p => p.Rating)
            .Take(limit).ToListAsync();

    public async Task<List<Product>> GetDealsAsync(int limit) =>
        await _db.Products.Where(p => p.IsActive && p.ComparePrice != null && p.ComparePrice > p.Price)
            .OrderByDescending(p => p.CreatedAt).Take(limit).ToListAsync();

    public async Task<List<Product>> GetRelatedAsync(Guid productId, string category, int limit) =>
        await _db.Products.Where(p => p.IsActive && p.Category == category && p.Id != productId)
            .OrderByDescending(p => p.Rating).Take(limit).ToListAsync();

    public async Task<List<Product>> GetLowStockAsync(int threshold) =>
        await _db.Products.Where(p => p.IsActive && p.Inventory <= threshold)
            .OrderBy(p => p.Inventory).ToListAsync();

    public async Task<List<string>> GetDistinctCategoriesAsync() =>
        await _db.Products.Where(p => p.IsActive).Select(p => p.Category).Distinct().ToListAsync();

    public async Task<Product> CreateAsync(Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return product;
    }

    public async Task UpdateAsync(Product product)
    {
        _db.Products.Update(product);
        await _db.SaveChangesAsync();
    }
}

public class OrderRepository : IOrderRepository
{
    private readonly ForeverDbContext _db;
    public OrderRepository(ForeverDbContext db) => _db = db;

    public async Task<Order?> GetByIdAsync(Guid id) =>
        await _db.Orders.Include(o => o.User).FirstOrDefaultAsync(o => o.Id == id);

    public async Task<(List<Order> Orders, int Total)> GetByUserAsync(Guid userId, int skip, int limit)
    {
        var query = _db.Orders.Where(o => o.UserId == userId).OrderByDescending(o => o.CreatedAt);
        var total = await query.CountAsync();
        var orders = await query.Skip(skip).Take(limit).ToListAsync();
        return (orders, total);
    }

    public async Task<(List<Order> Orders, int Total)> GetAllAsync(string? status, int skip, int limit)
    {
        var query = _db.Orders.Include(o => o.User).AsQueryable();
        if (!string.IsNullOrEmpty(status))
            query = query.Where(o => o.Status == Enum.Parse<Domain.Enums.OrderStatus>(status, true));
        query = query.OrderByDescending(o => o.CreatedAt);
        var total = await query.CountAsync();
        var orders = await query.Skip(skip).Take(limit).ToListAsync();
        return (orders, total);
    }

    public async Task<decimal> GetTotalSalesAsync() =>
        await _db.Orders.Where(o => o.IsPaid).SumAsync(o => o.TotalPrice);

    public async Task<int> CountAsync(string? status = null)
    {
        if (string.IsNullOrEmpty(status)) return await _db.Orders.CountAsync();
        return await _db.Orders.CountAsync(o => o.Status == Enum.Parse<Domain.Enums.OrderStatus>(status, true));
    }

    public async Task<List<(string Month, decimal Sales)>> GetMonthlySalesAsync(DateTime from)
    {
        var result = await _db.Orders
            .Where(o => o.IsPaid && o.CreatedAt >= from)
            .GroupBy(o => new { o.CreatedAt.Year, o.CreatedAt.Month })
            .Select(g => new { g.Key.Year, g.Key.Month, Sales = g.Sum(o => o.TotalPrice) })
            .OrderBy(g => g.Year).ThenBy(g => g.Month)
            .ToListAsync();
        return result.Select(r => ($"{r.Year}-{r.Month:D2}", r.Sales)).ToList();
    }

    public async Task<List<(Guid ProductId, string Name, int Quantity)>> GetTopProductsAsync(int limit)
    {
        // Load orders and aggregate in memory due to JSONB collection
        var orders = await _db.Orders.ToListAsync();
        return orders
            .SelectMany(o => o.OrderItems)
            .GroupBy(i => new { i.ProductId, i.Name })
            .Select(g => (g.Key.ProductId, g.Key.Name, g.Sum(i => i.Quantity)))
            .OrderByDescending(x => x.Item3)
            .Take(limit)
            .ToList();
    }

    public async Task<List<(string Status, int Count)>> GetStatusCountsAsync()
    {
        var result = await _db.Orders
            .GroupBy(o => o.Status)
            .Select(g => new { Status = g.Key.ToString(), Count = g.Count() })
            .ToListAsync();
        return result.Select(r => (r.Status.ToLower(), r.Count)).ToList();
    }

    public async Task<Order> CreateAsync(Order order)
    {
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();
        return order;
    }

    public async Task UpdateAsync(Order order)
    {
        _db.Orders.Update(order);
        await _db.SaveChangesAsync();
    }
}

public class CouponRepository : ICouponRepository
{
    private readonly ForeverDbContext _db;
    public CouponRepository(ForeverDbContext db) => _db = db;

    public async Task<Coupon?> GetByIdAsync(Guid id) => await _db.Coupons.FindAsync(id);
    public async Task<Coupon?> GetByCodeAsync(string code) =>
        await _db.Coupons.FirstOrDefaultAsync(c => c.Code == code.ToUpper());
    public async Task<List<Coupon>> GetAllAsync() => await _db.Coupons.ToListAsync();

    public async Task<Coupon> CreateAsync(Coupon coupon)
    {
        _db.Coupons.Add(coupon);
        await _db.SaveChangesAsync();
        return coupon;
    }

    public async Task UpdateAsync(Coupon coupon)
    {
        _db.Coupons.Update(coupon);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Coupon coupon)
    {
        _db.Coupons.Remove(coupon);
        await _db.SaveChangesAsync();
    }
}
