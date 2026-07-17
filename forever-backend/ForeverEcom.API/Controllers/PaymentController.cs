using ForeverEcom.Application.DTOs.Payment;
using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForeverEcom.API.Controllers;

[ApiController]
[Route("api/payment")]
[Authorize]
public class PaymentController : BaseController
{
    private readonly IPaymentService _payment;
    public PaymentController(IPaymentService payment) => _payment = payment;

    [HttpPost("create-intent")]
    public async Task<IActionResult> CreateIntent([FromBody] CreatePaymentIntentDto dto)
    {
        var result = await _payment.CreatePaymentIntentAsync(dto);
        return Ok(new { success = true, clientSecret = result.ClientSecret });
    }
}
