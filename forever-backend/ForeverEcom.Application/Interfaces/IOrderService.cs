using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Order;

namespace ForeverEcom.Application.Interfaces;

public interface IOrderService
{
    Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto);
    Task<OrderDto> GetOrderAsync(Guid orderId, Guid userId, bool isAdmin);
    Task<PagedResult<List<OrderDto>>> GetMyOrdersAsync(Guid userId, int page, int limit);
    Task<OrderDto> UpdateOrderToPaidAsync(Guid orderId, UpdateOrderToPaidDto dto);
    Task<OrderDto> UpdateOrderStatusAsync(Guid orderId, UpdateOrderStatusDto dto);
    Task<PagedResult<List<OrderDto>>> GetAllOrdersAsync(string? status, int page, int limit);
    Task<OrderDto> CancelOrderAsync(Guid orderId, Guid userId, bool isAdmin);
}
