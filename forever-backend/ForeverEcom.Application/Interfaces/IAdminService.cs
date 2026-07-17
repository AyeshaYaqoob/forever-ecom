using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Admin;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();
    Task<PagedResult<List<User>>> GetAllUsersAsync(int page, int limit);
    Task<User> GetUserAsync(Guid id);
    Task<User> UpdateUserAsync(Guid id, UpdateUserAdminDto dto);
    Task DeleteUserAsync(Guid id);
    Task<List<object>> GetLowStockProductsAsync(int threshold = 10);
}
