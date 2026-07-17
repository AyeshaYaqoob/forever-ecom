using ForeverEcom.Application.DTOs.Product;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : BaseController
{
    private readonly IProductService _products;
    public ProductsController(IProductService products) => _products = products;

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductQueryDto query)
    {
        var result = await _products.GetProductsAsync(query);
        return Ok(new { success = true, count = result.Count, total = result.Total, totalPages = result.TotalPages, currentPage = result.CurrentPage, products = result.Items });
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts([FromQuery] int limit = 8)
    {
        var products = await _products.GetFeaturedProductsAsync(limit);
        return Ok(new { success = true, count = products.Count, products });
    }

    [HttpGet("bestsellers")]
    public async Task<IActionResult> GetBestSellers([FromQuery] int limit = 8)
    {
        var products = await _products.GetBestSellersAsync(limit);
        return Ok(new { success = true, count = products.Count, products });
    }

    [HttpGet("deals")]
    public async Task<IActionResult> GetDeals([FromQuery] int limit = 8)
    {
        var products = await _products.GetDealsAsync(limit);
        return Ok(new { success = true, count = products.Count, products });
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _products.GetCategoriesAsync();
        return Ok(new { success = true, categories });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProduct(Guid id)
    {
        var product = await _products.GetProductAsync(id);
        return Ok(new { success = true, product });
    }

    [HttpGet("{id:guid}/related")]
    public async Task<IActionResult> GetRelatedProducts(Guid id, [FromQuery] int limit = 4)
    {
        var products = await _products.GetRelatedProductsAsync(id, limit);
        return Ok(new { success = true, count = products.Count, products });
    }

    [HttpPost("{id:guid}/reviews"), Authorize]
    public async Task<IActionResult> CreateReview(Guid id, [FromBody] CreateReviewDto dto)
    {
        await _products.CreateReviewAsync(id, UserId, UserName, dto);
        return StatusCode(201, new { success = true, message = "Review added successfully" });
    }

    [HttpPost, Authorize(Roles = "admin")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto dto)
    {
        var product = await _products.CreateProductAsync(dto);
        return StatusCode(201, new { success = true, message = "Product created successfully", product });
    }

    [HttpPut("{id:guid}"), Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] UpdateProductDto dto)
    {
        var product = await _products.UpdateProductAsync(id, dto);
        return Ok(new { success = true, message = "Product updated successfully", product });
    }

    [HttpDelete("{id:guid}"), Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        await _products.DeleteProductAsync(id);
        return Ok(new { success = true, message = "Product deleted successfully" });
    }
}
