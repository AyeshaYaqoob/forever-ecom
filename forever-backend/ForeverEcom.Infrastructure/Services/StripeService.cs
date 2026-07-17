using ForeverEcom.Application.DTOs.Payment;
using ForeverEcom.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace ForeverEcom.Infrastructure.Services;

public class StripeService : IPaymentService
{
    public StripeService(IConfiguration config)
    {
        StripeConfiguration.ApiKey = config["Stripe:SecretKey"];
    }

    public async Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(dto.Amount * 100), // stripe uses cents
            Currency = dto.Currency
        };
        var service = new PaymentIntentService();
        var intent = await service.CreateAsync(options);
        return new PaymentIntentResponseDto { ClientSecret = intent.ClientSecret };
    }
}
