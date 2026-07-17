using ForeverEcom.Application.Common;
using ForeverEcom.Application.DTOs.Product;
using ForeverEcom.Domain.Entities;

namespace ForeverEcom.Application.Interfaces;

public interface IProductService
{
    Task<PagedResult<List<ProductDto>>> GetProductsAsync(ProductQueryDto query);
    Task<ProductDto> GetProductAsync(Guid id);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<ProductDto> UpdateProductAsync(Guid id, UpdateProductDto dto);
    Task DeleteProductAsync(Guid id);
    Task CreateReviewAsync(Guid productId, Guid userId, string userName, CreateReviewDto dto);
    Task<List<ProductDto>> GetFeaturedProductsAsync(int limit = 8);
    Task<List<ProductDto>> GetBestSellersAsync(int limit = 8);
    Task<List<ProductDto>> GetDealsAsync(int limit = 8);
    Task<List<ProductDto>> GetRelatedProductsAsync(Guid productId, int limit = 4);
    Task<List<string>> GetCategoriesAsync();
}
