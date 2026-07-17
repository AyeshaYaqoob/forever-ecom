using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Order;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Domain.Enums;

namespace ForeverEcom.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly IProductRepository _productRepo;
    private readonly ICouponRepository _couponRepo;
    private readonly IUserRepository _userRepo;

    public OrderService(IOrderRepository orderRepo, IProductRepository productRepo,
        ICouponRepository couponRepo, IUserRepository userRepo)
    {
        _orderRepo = orderRepo;
        _productRepo = productRepo;
        _couponRepo = couponRepo;
        _userRepo = userRepo;
    }

    public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto)
    {
        if (dto.OrderItems == null || !dto.OrderItems.Any())
            throw new AppException("No order items", 400);

        decimal itemsPrice = 0;
        var validatedItems = new List<OrderItem>();

        foreach (var item in dto.OrderItems)
        {
            var product = await _productRepo.GetByIdAsync(item.Product)
                ?? throw new AppException($"Product not found: {item.Product}", 404);

            if (product.Inventory < item.Quantity)
                throw new AppException($"Insufficient inventory for {product.Name}", 400);

            product.Inventory -= item.Quantity;
            product.UpdatedAt = DateTime.UtcNow;
            await _productRepo.UpdateAsync(product);

            itemsPrice += product.Price * item.Quantity;
            validatedItems.Add(new OrderItem
            {
                ProductId = item.Product,
                Name = product.Name,
                Image = product.Images.FirstOrDefault() ?? "",
                Price = product.Price,
                Quantity = item.Quantity
            });
        }

        var taxPrice = itemsPrice * 0.08m;
        var shippingPrice = itemsPrice > 100 ? 0 : 10;
        decimal discountPrice = 0;

        if (!string.IsNullOrEmpty(dto.CouponCode))
        {
            var coupon = await _couponRepo.GetByCodeAsync(dto.CouponCode.ToUpper());
            if (coupon != null && coupon.IsValid())
            {
                discountPrice = coupon.CalculateDiscount(itemsPrice);
                coupon.UsageCount++;
                coupon.UpdatedAt = DateTime.UtcNow;
                await _couponRepo.UpdateAsync(coupon);
            }
        }

        var paymentMethod = Enum.TryParse<PaymentMethod>(dto.PaymentMethod, true, out var pm)
            ? pm : PaymentMethod.Card;

        var order = new Order
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            OrderItems = validatedItems,
            ShippingAddress = new Address
            {
                Street = dto.ShippingAddress.Street,
                City = dto.ShippingAddress.City,
                State = dto.ShippingAddress.State,
                ZipCode = dto.ShippingAddress.ZipCode,
                Country = dto.ShippingAddress.Country
            },
            PaymentMethod = paymentMethod,
            ItemsPrice = itemsPrice,
            TaxPrice = taxPrice,
            ShippingPrice = shippingPrice,
            DiscountPrice = discountPrice,
            TotalPrice = itemsPrice + taxPrice + shippingPrice - discountPrice,
            CouponCode = dto.CouponCode
        };

        await _orderRepo.CreateAsync(order);

        var user = await _userRepo.GetByIdAsync(userId);
        if (user != null)
        {
            user.Cart.Clear();
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepo.UpdateAsync(user);
        }

        return MapOrder(order);
    }

    public async Task<OrderDto> GetOrderAsync(Guid orderId, Guid userId, bool isAdmin)
    {
        var order = await _orderRepo.GetByIdAsync(orderId)
            ?? throw new AppException("Order not found", 404);

        if (order.UserId != userId && !isAdmin)
            throw new AppException("Not authorized", 403);

        return MapOrder(order);
    }

    public async Task<PagedResult<List<OrderDto>>> GetMyOrdersAsync(Guid userId, int page, int limit)
    {
        var skip = (page - 1) * limit;
        var (orders, total) = await _orderRepo.GetByUserAsync(userId, skip, limit);
        return new PagedResult<List<OrderDto>>
        {
            Count = orders.Count,
            Total = total,
            TotalPages = (int)Math.Ceiling((double)total / limit),
            CurrentPage = page,
            Items = orders.Select(MapOrder).ToList()
        };
    }

    public async Task<OrderDto> UpdateOrderToPaidAsync(Guid orderId, UpdateOrderToPaidDto dto)
    {
        var order = await _orderRepo.GetByIdAsync(orderId)
            ?? throw new AppException("Order not found", 404);

        order.IsPaid = true;
        order.PaidAt = DateTime.UtcNow;
        order.PaymentResult = new PaymentResult
        {
            Id = dto.Id,
            Status = dto.Status,
            UpdateTime = dto.UpdateTime,
            EmailAddress = dto.EmailAddress
        };
        order.UpdatedAt = DateTime.UtcNow;
        await _orderRepo.UpdateAsync(order);
        return MapOrder(order);
    }

    public async Task<OrderDto> UpdateOrderStatusAsync(Guid orderId, UpdateOrderStatusDto dto)
    {
        var order = await _orderRepo.GetByIdAsync(orderId)
            ?? throw new AppException("Order not found", 404);

        if (Enum.TryParse<OrderStatus>(dto.Status, true, out var status))
            order.Status = status;

        if (!string.IsNullOrEmpty(dto.TrackingNumber))
            order.TrackingNumber = dto.TrackingNumber;

        if (order.Status == OrderStatus.Delivered)
            order.DeliveredAt = DateTime.UtcNow;

        order.UpdatedAt = DateTime.UtcNow;
        await _orderRepo.UpdateAsync(order);
        return MapOrder(order);
    }

    public async Task<PagedResult<List<OrderDto>>> GetAllOrdersAsync(string? status, int page, int limit)
    {
        var skip = (page - 1) * limit;
        var (orders, total) = await _orderRepo.GetAllAsync(status, skip, limit);
        return new PagedResult<List<OrderDto>>
        {
            Count = orders.Count,
            Total = total,
            TotalPages = (int)Math.Ceiling((double)total / limit),
            CurrentPage = page,
            Items = orders.Select(MapOrder).ToList()
        };
    }

    public async Task<OrderDto> CancelOrderAsync(Guid orderId, Guid userId, bool isAdmin)
    {
        var order = await _orderRepo.GetByIdAsync(orderId)
            ?? throw new AppException("Order not found", 404);

        if (order.UserId != userId && !isAdmin)
            throw new AppException("Not authorized", 403);

        if (order.Status != OrderStatus.Pending && order.Status != OrderStatus.Processing)
            throw new AppException("Cannot cancel this order", 400);

        foreach (var item in order.OrderItems)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product != null)
            {
                product.Inventory += item.Quantity;
                product.UpdatedAt = DateTime.UtcNow;
                await _productRepo.UpdateAsync(product);
            }
        }

        order.Status = OrderStatus.Cancelled;
        order.UpdatedAt = DateTime.UtcNow;
        await _orderRepo.UpdateAsync(order);
        return MapOrder(order);
    }

    private static OrderDto MapOrder(Order o) => new()
    {
        Id = o.Id,
        OrderItems = o.OrderItems.Select(i => new OrderItemDto
        {
            Product = i.ProductId,
            Name = i.Name,
            Image = i.Image,
            Price = i.Price,
            Quantity = i.Quantity
        }).ToList(),
        ShippingAddress = new DTOs.Order.AddressDto
        {
            Street = o.ShippingAddress.Street,
            City = o.ShippingAddress.City,
            State = o.ShippingAddress.State,
            ZipCode = o.ShippingAddress.ZipCode,
            Country = o.ShippingAddress.Country
        },
        PaymentMethod = o.PaymentMethod.ToString().ToLower(),
        ItemsPrice = o.ItemsPrice,
        TaxPrice = o.TaxPrice,
        ShippingPrice = o.ShippingPrice,
        DiscountPrice = o.DiscountPrice,
        TotalPrice = o.TotalPrice,
        CouponCode = o.CouponCode,
        IsPaid = o.IsPaid,
        PaidAt = o.PaidAt,
        Status = o.Status.ToString().ToLower(),
        DeliveredAt = o.DeliveredAt,
        TrackingNumber = o.TrackingNumber,
        CreatedAt = o.CreatedAt
    };
}
