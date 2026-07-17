import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Recursively adds `_id` as an alias for `id` on every object in the response.
 * The .NET backend returns camelCase `id` but the frontend expects MongoDB-style `_id`.
 */
function normalizeIds(data: any): any {
  if (Array.isArray(data)) {
    return data.map(normalizeIds);
  }
  if (data !== null && typeof data === 'object') {
    const result: any = {};
    for (const key of Object.keys(data)) {
      result[key] = normalizeIds(data[key]);
    }
    if ('id' in result && !('_id' in result)) {
      result._id = result.id;
    }
    return result;
  }
  return data;
}

// Normalize id → _id and handle token expiration
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = normalizeIds(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: Partial<{ name: string; phone: string; avatar: string }>) =>
    api.put('/auth/updateprofile', data),
  updatePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/updatepassword', { currentPassword, newPassword }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgotpassword', { email }),
  resetPassword: (token: string, password: string) =>
    api.put(`/auth/resetpassword/${token}`, { password }),
  logout: () => api.get('/auth/logout')
};

// Products API
export const productsAPI = {
  getProducts: (params?: Record<string, any>) =>
    api.get('/products', { params }),
  getProduct: (id: string) =>
    api.get(`/products/${id}`),
  getFeatured: () =>
    api.get('/products/featured'),
  getBestSellers: () =>
    api.get('/products/bestsellers'),
  getDeals: () =>
    api.get('/products/deals'),
  getRelated: (id: string) =>
    api.get(`/products/${id}/related`),
  getCategories: () =>
    api.get('/products/categories'),
  createReview: (id: string, rating: number, comment: string) =>
    api.post(`/products/${id}/reviews`, { rating, comment }),
  // Admin
  createProduct: (data: FormData) =>
    api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  updateProduct: (id: string, data: FormData) =>
    api.put(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteProduct: (id: string) =>
    api.delete(`/products/${id}`)
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId: string, quantity: number) =>
    api.post('/cart', { productId, quantity }),
  updateCartItem: (productId: string, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId: string) =>
    api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart'),
  moveToWishlist: (productId: string) =>
    api.post(`/cart/movetowishlist/${productId}`)
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId: string) =>
    api.post('/wishlist', { productId }),
  removeFromWishlist: (productId: string) =>
    api.delete(`/wishlist/${productId}`),
  moveToCart: (productId: string, quantity: number) =>
    api.post(`/wishlist/movetocart/${productId}`, { quantity }),
  clearWishlist: () => api.delete('/wishlist')
};

// Orders API
export const ordersAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getMyOrders: (params?: Record<string, any>) =>
    api.get('/orders/myorders', { params }),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`),
  // Admin
  getAllOrders: (params?: Record<string, any>) =>
    api.get('/orders', { params }),
  updateStatus: (id: string, status: string, trackingNumber?: string) =>
    api.put(`/orders/${id}/status`, { status, trackingNumber })
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params?: Record<string, any>) =>
    api.get('/admin/users', { params }),
  getUser: (id: string) => api.get(`/admin/users/${id}`),
  updateUser: (id: string, data: any) =>
    api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  getLowStock: (threshold?: number) =>
    api.get('/admin/lowstock', { params: { threshold } })
};

// Coupons API
export const couponsAPI = {
  getCoupons: () => api.get('/coupons'),
  getCoupon: (id: string) => api.get(`/coupons/${id}`),
  createCoupon: (data: any) => api.post('/coupons', data),
  updateCoupon: (id: string, data: any) => api.put(`/coupons/${id}`, data),
  deleteCoupon: (id: string) => api.delete(`/coupons/${id}`),
  validate: (code: string, subtotal: number) =>
    api.post('/coupons/validate', { code, subtotal })
};

// Payment API
export const paymentAPI = {
  getConfig: () => api.get('/payment/config'),
  createPaymentIntent: (orderId: string) =>
    api.post('/payment/create-payment-intent', { orderId }),
  processFakePayment: (orderId: string) =>
    api.post('/payment/fake-payment', { orderId })
};

export default api;
