namespace ForeverEcom.Application.DTOs.Payment;

public record CreatePaymentIntentDto(decimal Amount, string Currency = "usd");

public class PaymentIntentResponseDto
{
    public string ClientSecret { get; set; } = string.Empty;
}
