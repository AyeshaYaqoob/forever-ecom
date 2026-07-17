using ForeverEcom.Application.DTOs.Admin;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "admin")]
public class AdminController : BaseController
{
    private readonly IAdminService _admin;
    public AdminController(IAdminService admin) => _admin = admin;

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var stats = await _admin.GetDashboardStatsAsync();
        return Ok(new { success = true, stats });
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var result = await _admin.GetAllUsersAsync(page, limit);
        return Ok(new { success = true, count = result.Count, total = result.Total, totalPages = result.TotalPages, currentPage = result.CurrentPage, users = result.Items });
    }

    [HttpGet("users/{id:guid}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
        var user = await _admin.GetUserAsync(id);
        return Ok(new { success = true, user });
    }

    [HttpPut("users/{id:guid}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserAdminDto dto)
    {
        var user = await _admin.UpdateUserAsync(id, dto);
        return Ok(new { success = true, message = "User updated successfully", user });
    }

    [HttpDelete("users/{id:guid}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        await _admin.DeleteUserAsync(id);
        return Ok(new { success = true, message = "User deleted successfully" });
    }

    [HttpGet("lowstock")]
    public async Task<IActionResult> GetLowStockProducts([FromQuery] int threshold = 10)
    {
        var products = await _admin.GetLowStockProductsAsync(threshold);
        return Ok(new { success = true, count = products.Count, products });
    }
}
