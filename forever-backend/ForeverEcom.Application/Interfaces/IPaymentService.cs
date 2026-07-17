using ForeverEcom.Application.DTOs.Payment;

namespace ForeverEcom.Application.Interfaces;

public interface IPaymentService
{
    Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto);
}
