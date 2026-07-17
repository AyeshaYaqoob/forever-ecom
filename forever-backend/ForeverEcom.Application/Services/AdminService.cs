using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Admin;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Application.Services;

public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepo;
    private readonly IProductRepository _productRepo;
    private readonly IOrderRepository _orderRepo;

    public AdminService(IUserRepository userRepo, IProductRepository productRepo, IOrderRepository orderRepo)
    {
        _userRepo = userRepo;
        _productRepo = productRepo;
        _orderRepo = orderRepo;
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var totalUsers = await _userRepo.CountAsync();
        var totalOrders = await _orderRepo.CountAsync();
        var totalSales = await _orderRepo.GetTotalSalesAsync();
        var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);
        var salesByMonth = await _orderRepo.GetMonthlySalesAsync(sixMonthsAgo);
        var topProducts = await _orderRepo.GetTopProductsAsync(5);
        var statusCounts = await _orderRepo.GetStatusCountsAsync();
        var (recentOrders, _) = await _orderRepo.GetAllAsync(null, 0, 10);

        var (allProducts, totalProducts) = await _productRepo.GetAllAsync(null, null, null, null, null, null, 0, 1);

        return new DashboardStatsDto
        {
            TotalSales = totalSales,
            TotalOrders = totalOrders,
            TotalProducts = totalProducts,
            TotalUsers = totalUsers,
            SalesByMonth = salesByMonth.Select(s => new MonthlySalesDto { Month = s.Month, Sales = s.Sales }).ToList(),
            TopProducts = topProducts.Select(p => new TopProductDto { Id = p.ProductId, Name = p.Name, Quantity = p.Quantity }).ToList(),
            OrderStatusCounts = statusCounts.Select(s => new StatusCountDto { Status = s.Status, Count = s.Count }).ToList(),
            RecentOrders = recentOrders.Cast<object>().ToList()
        };
    }

    public async Task<PagedResult<List<User>>> GetAllUsersAsync(int page, int limit)
    {
        var skip = (page - 1) * limit;
        var users = await _userRepo.GetAllAsync(skip, limit);
        var total = await _userRepo.CountAsync();
        return new PagedResult<List<User>>
        {
            Count = users.Count,
            Total = total,
            TotalPages = (int)Math.Ceiling((double)total / limit),
            CurrentPage = page,
            Items = users
        };
    }

    public async Task<User> GetUserAsync(Guid id)
    {
        return await _userRepo.GetByIdAsync(id)
            ?? throw new AppException("User not found", 404);
    }

    public async Task<User> UpdateUserAsync(Guid id, UpdateUserAdminDto dto)
    {
        var user = await _userRepo.GetByIdAsync(id)
            ?? throw new AppException("User not found", 404);

        if (dto.Name != null) user.Name = dto.Name;
        if (dto.Email != null) user.Email = dto.Email;
        if (dto.Role != null && Enum.TryParse<UserRole>(dto.Role, true, out var role))
            user.Role = role;
        if (dto.IsEmailVerified.HasValue) user.IsEmailVerified = dto.IsEmailVerified.Value;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(user);
        return user;
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await _userRepo.GetByIdAsync(id)
            ?? throw new AppException("User not found", 404);

        if (user.Role == UserRole.Admin)
            throw new AppException("Cannot delete admin users", 400);

        await _userRepo.DeleteAsync(user);
    }

    public async Task<List<object>> GetLowStockProductsAsync(int threshold = 10)
    {
        var products = await _productRepo.GetLowStockAsync(threshold);
        return products.Cast<object>().ToList();
    }
}
