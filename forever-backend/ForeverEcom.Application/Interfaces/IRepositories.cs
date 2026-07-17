using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByResetTokenAsync(string hashedToken);
    Task<List<User>> GetAllAsync(int skip, int limit);
    Task<int> CountAsync();
    Task<User> CreateAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(User user);
}

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product?> GetBySkuAsync(string sku);
    Task<(List<Product> Products, int Total)> GetAllAsync(
        string? category, decimal? minPrice, decimal? maxPrice,
        double? minRating, string? search, string? sortBy, int skip, int limit);
    Task<List<Product>> GetFeaturedAsync(int limit);
    Task<List<Product>> GetBestSellersAsync(int limit);
    Task<List<Product>> GetDealsAsync(int limit);
    Task<List<Product>> GetRelatedAsync(Guid productId, string category, int limit);
    Task<List<Product>> GetLowStockAsync(int threshold);
    Task<List<string>> GetDistinctCategoriesAsync();
    Task<Product> CreateAsync(Product product);
    Task UpdateAsync(Product product);
}

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id);
    Task<(List<Order> Orders, int Total)> GetByUserAsync(Guid userId, int skip, int limit);
    Task<(List<Order> Orders, int Total)> GetAllAsync(string? status, int skip, int limit);
    Task<decimal> GetTotalSalesAsync();
    Task<int> CountAsync(string? status = null);
    Task<List<(string Month, decimal Sales)>> GetMonthlySalesAsync(DateTime from);
    Task<List<(Guid ProductId, string Name, int Quantity)>> GetTopProductsAsync(int limit);
    Task<List<(string Status, int Count)>> GetStatusCountsAsync();
    Task<Order> CreateAsync(Order order);
    Task UpdateAsync(Order order);
}

public interface ICouponRepository
{
    Task<Coupon?> GetByIdAsync(Guid id);
    Task<Coupon?> GetByCodeAsync(string code);
    Task<List<Coupon>> GetAllAsync();
    Task<Coupon> CreateAsync(Coupon coupon);
    Task UpdateAsync(Coupon coupon);
    Task DeleteAsync(Coupon coupon);
}
