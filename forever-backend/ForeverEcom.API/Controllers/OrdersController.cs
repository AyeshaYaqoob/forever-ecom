using ForeverEcom.Application.DTOs.Order;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize]
public class OrdersController : BaseController
{
    private readonly IOrderService _orders;
    public OrdersController(IOrderService orders) => _orders = orders;

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var order = await _orders.CreateOrderAsync(UserId, dto);
        return StatusCode(201, new { success = true, message = "Order created successfully", order });
    }

    [HttpGet("myorders")]
    public async Task<IActionResult> GetMyOrders([FromQuery] int page = 1, [FromQuery] int limit = 10)
    {
        var result = await _orders.GetMyOrdersAsync(UserId, page, limit);
        return Ok(new { success = true, count = result.Count, total = result.Total, totalPages = result.TotalPages, currentPage = result.CurrentPage, orders = result.Items });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetOrder(Guid id)
    {
        var order = await _orders.GetOrderAsync(id, UserId, IsAdmin);
        return Ok(new { success = true, order });
    }

    [HttpGet, Authorize(Roles = "admin")]
    public async Task<IActionResult> GetAllOrders([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var result = await _orders.GetAllOrdersAsync(status, page, limit);
        return Ok(new { success = true, count = result.Count, total = result.Total, totalPages = result.TotalPages, currentPage = result.CurrentPage, orders = result.Items });
    }

    [HttpPut("{id:guid}/pay")]
    public async Task<IActionResult> UpdateOrderToPaid(Guid id, [FromBody] UpdateOrderToPaidDto dto)
    {
        var order = await _orders.UpdateOrderToPaidAsync(id, dto);
        return Ok(new { success = true, message = "Order marked as paid", order });
    }

    [HttpPut("{id:guid}/status"), Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusDto dto)
    {
        var order = await _orders.UpdateOrderStatusAsync(id, dto);
        return Ok(new { success = true, message = "Order status updated", order });
    }

    [HttpPut("{id:guid}/cancel")]
    public async Task<IActionResult> CancelOrder(Guid id)
    {
        var order = await _orders.CancelOrderAsync(id, UserId, IsAdmin);
        return Ok(new { success = true, message = "Order cancelled successfully", order });
    }
}
