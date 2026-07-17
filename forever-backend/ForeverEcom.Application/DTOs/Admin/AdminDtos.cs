namespace ForeverEcom.Application.DTOs.Admin;

public class DashboardStatsDto
{
    public decimal TotalSales { get; set; }
    public int TotalOrders { get; set; }
    public int TotalProducts { get; set; }
    public int TotalUsers { get; set; }
    public List<object> RecentOrders { get; set; } = new();
    public List<MonthlySalesDto> SalesByMonth { get; set; } = new();
    public List<TopProductDto> TopProducts { get; set; } = new();
    public List<StatusCountDto> OrderStatusCounts { get; set; } = new();
}

public class MonthlySalesDto
{
    public string Month { get; set; } = string.Empty;
    public decimal Sales { get; set; }
}

public class TopProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class StatusCountDto
{
    public string Status { get; set; } = string.Empty;
    public int Count { get; set; }
}

public class UpdateUserAdminDto
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Role { get; set; }
    public bool? IsEmailVerified { get; set; }
}
