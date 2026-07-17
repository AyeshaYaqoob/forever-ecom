using System.Text.Json;
using ForeverEcom.Domain.Entities;
using ForeverEcom.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ForeverEcom.Infrastructure.Data;

public class ForeverDbContext : DbContext
{
    public ForeverDbContext(DbContextOptions<ForeverDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Coupon> Coupons => Set<Coupon>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ── USER ─────────────────────────────────────────────────────
        builder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Name).HasMaxLength(50).IsRequired();
            e.Property(u => u.Email).HasMaxLength(255).IsRequired();
            e.Property(u => u.Role)
                .HasConversion(r => r.ToString().ToLower(), s => Enum.Parse<UserRole>(s, true));

            // JSON columns for owned collections
            e.Property(u => u.Addresses)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Address>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(u => u.Cart)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<CartItem>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(u => u.WishlistProductIds)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Guid>>(v, (JsonSerializerOptions?)null) ?? new());

            // Ignore nav property — orders are accessed via Order.UserId
            e.Ignore(u => u.Orders);
        });

        // ── PRODUCT ──────────────────────────────────────────────────
        builder.Entity<Product>(e =>
        {
            e.HasKey(p => p.Id);
            e.HasIndex(p => p.Sku).IsUnique();
            e.Property(p => p.Name).HasMaxLength(200).IsRequired();
            e.Property(p => p.Price).HasPrecision(18, 2);
            e.Property(p => p.ComparePrice).HasPrecision(18, 2);
            e.Ignore(p => p.DiscountPercentage);

            e.Property(p => p.Images)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(p => p.Reviews)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Review>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(p => p.Specifications)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(p => p.Tags)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new());
        });

        // ── ORDER ────────────────────────────────────────────────────
        builder.Entity<Order>(e =>
        {
            e.HasKey(o => o.Id);
            e.HasIndex(o => new { o.UserId, o.CreatedAt });
            e.HasIndex(o => o.Status);
            e.Property(o => o.ItemsPrice).HasPrecision(18, 2);
            e.Property(o => o.TaxPrice).HasPrecision(18, 2);
            e.Property(o => o.ShippingPrice).HasPrecision(18, 2);
            e.Property(o => o.DiscountPrice).HasPrecision(18, 2);
            e.Property(o => o.TotalPrice).HasPrecision(18, 2);

            e.Property(o => o.Status)
                .HasConversion(s => s.ToString().ToLower(), s => Enum.Parse<OrderStatus>(s, true));

            e.Property(o => o.PaymentMethod)
                .HasConversion(pm => pm.ToString().ToLower(), s => Enum.Parse<PaymentMethod>(s, true));

            e.Property(o => o.OrderItems)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<OrderItem>>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(o => o.ShippingAddress)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<Address>(v, (JsonSerializerOptions?)null) ?? new());

            e.Property(o => o.PaymentResult)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<PaymentResult>(v, (JsonSerializerOptions?)null));

            e.HasOne(o => o.User).WithMany().HasForeignKey(o => o.UserId).OnDelete(DeleteBehavior.Restrict);
        });

        // ── COUPON ───────────────────────────────────────────────────
        builder.Entity<Coupon>(e =>
        {
            e.HasKey(c => c.Id);
            e.HasIndex(c => c.Code).IsUnique();
            e.Property(c => c.DiscountValue).HasPrecision(18, 2);
            e.Property(c => c.MinPurchase).HasPrecision(18, 2);
            e.Property(c => c.MaxDiscount).HasPrecision(18, 2);

            e.Property(c => c.DiscountType)
                .HasConversion(dt => dt.ToString().ToLower(), s => Enum.Parse<DiscountType>(s, true));
        });
    }
}
