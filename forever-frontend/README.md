# FOREVER E-commerce Frontend

A modern, full-featured React e-commerce frontend for the FOREVER platform.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Dark Mode**: Full dark/light mode support
- **State Management**: Redux Toolkit for global state
- **Authentication**: JWT-based auth with protected routes
- **Product Browsing**: Advanced search, filters, and sorting
- **Shopping Cart**: Persistent cart with real-time updates
- **Wishlist**: Save favorites for later
- **Checkout**: Multi-step checkout with coupon support
- **Order Tracking**: View order history and track shipments
- **Admin Panel**: Dashboard for managing products, orders, and users

## Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Carousel**: Swiper
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed
- Backend API running (see forever-backend README)

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Environment Setup**:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5253/api
```

3. **Start development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
```

## Project Structure

```
forever-frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts (theme)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin panel pages
│   │   └── ...          # Public pages
│   ├── services/        # API services
│   ├── store/           # Redux store & slices
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features Overview

### Public Pages
- **Home**: Hero slider, featured products, categories, deals
- **Products**: Product grid with filters, search, sorting
- **Product Detail**: Image gallery, reviews, specifications
- **Cart**: Full cart management
- **Login/Register**: Authentication pages

### Protected Pages
- **Wishlist**: Saved products
- **Checkout**: Multi-step checkout flow
- **Profile**: User profile and addresses
- **Orders**: Order history and tracking

### Admin Pages
- **Dashboard**: Sales analytics, recent orders, top products
- **Products**: Manage products (CRUD)
- **Orders**: View and update order status
- **Users**: Manage users

## Default Login Credentials

- **Admin**: `admin@forever.com` / `admin123`
- **Demo User**: `user@example.com` / `user123`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5253/api` |

## License

MIT
