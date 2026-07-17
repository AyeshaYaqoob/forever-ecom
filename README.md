# FOREVER E-commerce Platform

A complete, production-ready full-stack e-commerce platform combining the best features of Amazon and Shopify.

![FOREVER Logo](https://via.placeholder.com/200x80/8b6d4b/FFFFFF?text=FOREVER)

## Overview

FOREVER is a modern e-commerce platform built with cutting-edge technologies, offering a seamless shopping experience for customers and powerful management tools for administrators.

## Project Structure

```
/mnt/okcomputer/output/
├── forever-backend/     # ASP.NET Core Web API (C#) + PostgreSQL
└── app/                 # React + TypeScript Frontend
```

## Quick Start

### Prerequisites

- Node.js 18+ (for Frontend)
- .NET 8 SDK or later
- PostgreSQL
- Git

### 1. Clone and Setup

```bash
# Backend
cd forever-backend/ForeverEcom.API
# Update appsettings.json with your PostgreSQL connection string

# Frontend (in a new terminal)
cd app
npm install
cp .env.example .env
# Edit .env with your API URL
```

### 2. Seed the Database

```bash
cd forever-backend/ForeverEcom.API
dotnet run  # Seeding happens automatically on startup
```

This creates:
- Admin user: `admin@forever.com` / `admin123`
- Demo user: `user@example.com` / `user123`
- 20+ sample products across 10 categories
- Sample coupons

### 3. Start the Servers

```bash
# Backend (port 5253 or 7089)
cd forever-backend/ForeverEcom.API
dotnet run

# Frontend (port 5173)
cd app
npm run dev
```

### 4. Access the Application

- **Store**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **API**: http://localhost:5000/api

## Features

### Customer Features

- **User Authentication**: Register, login, forgot password
- **Product Browsing**: Search, filter by category/price/rating, sort
- **Product Details**: Multiple images, reviews, specifications
- **Shopping Cart**: Add/remove items, update quantities
- **Wishlist**: Save favorites for later
- **Checkout**: Multi-step checkout with shipping, payment, review
- **Order Tracking**: View order history and status
- **Profile Management**: Update info, manage addresses

### Admin Features

- **Dashboard**: Sales analytics, charts, key metrics
- **Product Management**: Add, edit, delete products
- **Order Management**: View all orders, update status
- **User Management**: View and manage customers
- **Inventory Tracking**: Low stock alerts

### Technical Features

- **Dark Mode**: Full dark/light theme support
- **Responsive Design**: Mobile-first, works on all devices
- **Toast Notifications**: User-friendly feedback
- **Loading States**: Skeleton loaders for better UX
- **SEO Ready**: React Helmet for meta tags
- **Secure**: JWT authentication, protected routes

## Tech Stack

### Backend
- **Runtime**: .NET Core
- **Framework**: ASP.NET Core Web API
- **Language**: C#
- **Database**: PostgreSQL + Entity Framework Core
- **Auth**: JWT Bearer Authentication
- **Payments**: Stripe (test mode)
- **Email**: MailKit / SMTP
- **Images**: Cloudinary (optional)

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State**: Redux Toolkit
- **Routing**: React Router v6
- **UI**: shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgotpassword` - Request password reset

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured` - Featured products
- `GET /api/products/bestsellers` - Best sellers
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart & Wishlist
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add to wishlist

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get my orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update status (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `GET /api/admin/lowstock` - Low stock products

## Screenshots

### Home Page
- Hero slider with featured products
- Category browsing
- Best sellers and deals sections

### Product Page
- Grid/list view toggle
- Advanced filters (category, price, rating)
- Search with debounce
- Pagination

### Product Detail
- Image gallery
- Price and discount display
- Add to cart/wishlist
- Customer reviews
- Related products

### Cart
- Item list with quantity controls
- Price breakdown
- Proceed to checkout

### Checkout
- Step 1: Shipping address
- Step 2: Payment method
- Step 3: Order review
- Coupon code support

### Admin Dashboard
- Sales charts
- Recent orders
- Top products
- Order status breakdown

## Configuration

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=forever_ecom;Username=postgres;Password=your_password"
  },
  "Jwt": {
    "Key": "your_super_secret_key",
    "Issuer": "forever-ecom",
    "Audience": "forever-users"
  }
}
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Deployment

### Backend (Render/Azure/Heroku)
1. Set ASP.NET Core environment variables
2. Connect to managed PostgreSQL database
3. Deploy via Dockerfile or native .NET build

### Frontend (Vercel/Netlify)
1. Build with `npm run build`
2. Deploy `dist/` folder
3. Set API URL environment variable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact support@forever.com.

---

Built with ❤️ by the FOREVER Team
