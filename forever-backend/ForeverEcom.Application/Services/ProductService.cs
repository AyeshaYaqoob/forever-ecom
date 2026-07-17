using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Product;
using ForeverEcom.Application.Interfaces;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepo;

    public ProductService(IProductRepository productRepo)
    {
        _productRepo = productRepo;
    }

    public async Task<PagedResult<List<ProductDto>>> GetProductsAsync(ProductQueryDto query)
    {
        var skip = (query.Page - 1) * query.Limit;
        var (products, total) = await _productRepo.GetAllAsync(
            query.Category, query.MinPrice, query.MaxPrice,
            query.MinRating, query.Search, query.SortBy, skip, query.Limit);

        return new PagedResult<List<ProductDto>>
        {
            Count = products.Count,
            Total = total,
            TotalPages = (int)Math.Ceiling((double)total / query.Limit),
            CurrentPage = query.Page,
            Items = products.Select(MapProduct).ToList()
        };
    }

    public async Task<ProductDto> GetProductAsync(Guid id)
    {
        var product = await _productRepo.GetByIdAsync(id)
            ?? throw new AppException("Product not found", 404);
        return MapProduct(product);
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            ComparePrice = dto.ComparePrice,
            Images = dto.Images,
            Category = dto.Category,
            Subcategory = dto.Subcategory,
            Brand = dto.Brand,
            Sku = dto.Sku,
            Inventory = dto.Inventory,
            Specifications = dto.Specifications,
            Tags = dto.Tags,
            IsFeatured = dto.IsFeatured
        };
        await _productRepo.CreateAsync(product);
        return MapProduct(product);
    }

    public async Task<ProductDto> UpdateProductAsync(Guid id, UpdateProductDto dto)
    {
        var product = await _productRepo.GetByIdAsync(id)
            ?? throw new AppException("Product not found", 404);

        if (dto.Name != null) product.Name = dto.Name;
        if (dto.Description != null) product.Description = dto.Description;
        if (dto.Price.HasValue) product.Price = dto.Price.Value;
        if (dto.ComparePrice.HasValue) product.ComparePrice = dto.ComparePrice.Value;
        if (dto.Images != null) product.Images = dto.Images;
        if (dto.Category != null) product.Category = dto.Category;
        if (dto.Subcategory != null) product.Subcategory = dto.Subcategory;
        if (dto.Brand != null) product.Brand = dto.Brand;
        if (dto.Sku != null) product.Sku = dto.Sku;
        if (dto.Inventory.HasValue) product.Inventory = dto.Inventory.Value;
        if (dto.Specifications != null) product.Specifications = dto.Specifications;
        if (dto.Tags != null) product.Tags = dto.Tags;
        if (dto.IsFeatured.HasValue) product.IsFeatured = dto.IsFeatured.Value;
        if (dto.IsActive.HasValue) product.IsActive = dto.IsActive.Value;
        product.UpdatedAt = DateTime.UtcNow;

        await _productRepo.UpdateAsync(product);
        return MapProduct(product);
    }

    public async Task DeleteProductAsync(Guid id)
    {
        var product = await _productRepo.GetByIdAsync(id)
            ?? throw new AppException("Product not found", 404);
        product.IsActive = false;
        product.UpdatedAt = DateTime.UtcNow;
        await _productRepo.UpdateAsync(product);
    }

    public async Task CreateReviewAsync(Guid productId, Guid userId, string userName, CreateReviewDto dto)
    {
        var product = await _productRepo.GetByIdAsync(productId)
            ?? throw new AppException("Product not found", 404);

        if (product.Reviews.Any(r => r.UserId == userId))
            throw new AppException("You have already reviewed this product", 400);

        product.Reviews.Add(new Review
        {
            UserId = userId,
            Name = userName,
            Rating = dto.Rating,
            Comment = dto.Comment,
            CreatedAt = DateTime.UtcNow
        });

        product.NumReviews = product.Reviews.Count;
        product.Rating = product.Reviews.Average(r => r.Rating);
        product.UpdatedAt = DateTime.UtcNow;

        await _productRepo.UpdateAsync(product);
    }

    public async Task<List<ProductDto>> GetFeaturedProductsAsync(int limit = 8)
    {
        var products = await _productRepo.GetFeaturedAsync(limit);
        return products.Select(MapProduct).ToList();
    }

    public async Task<List<ProductDto>> GetBestSellersAsync(int limit = 8)
    {
        var products = await _productRepo.GetBestSellersAsync(limit);
        return products.Select(MapProduct).ToList();
    }

    public async Task<List<ProductDto>> GetDealsAsync(int limit = 8)
    {
        var products = await _productRepo.GetDealsAsync(limit);
        return products.Select(MapProduct).ToList();
    }

    public async Task<List<ProductDto>> GetRelatedProductsAsync(Guid productId, int limit = 4)
    {
        var product = await _productRepo.GetByIdAsync(productId)
            ?? throw new AppException("Product not found", 404);
        var related = await _productRepo.GetRelatedAsync(productId, product.Category, limit);
        return related.Select(MapProduct).ToList();
    }

    public async Task<List<string>> GetCategoriesAsync()
    {
        return await _productRepo.GetDistinctCategoriesAsync();
    }

    public static ProductDto MapProduct(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Description = p.Description,
        Price = p.Price,
        ComparePrice = p.ComparePrice,
        DiscountPercentage = p.DiscountPercentage,
        Images = p.Images,
        Category = p.Category,
        Subcategory = p.Subcategory,
        Brand = p.Brand,
        Sku = p.Sku,
        Inventory = p.Inventory,
        Rating = p.Rating,
        NumReviews = p.NumReviews,
        Reviews = p.Reviews.Select(r => new ReviewDto
        {
            UserId = r.UserId,
            Name = r.Name,
            Rating = r.Rating,
            Comment = r.Comment,
            CreatedAt = r.CreatedAt
        }).ToList(),
        Specifications = p.Specifications,
        Tags = p.Tags,
        IsActive = p.IsActive,
        IsFeatured = p.IsFeatured,
        CreatedAt = p.CreatedAt
    };
}
