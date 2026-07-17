import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchCart, updateCartItem, removeFromCart, clearCart, selectCartTotal } from '../store/slices/cartSlice';
import { moveToWishlist } from '../store/slices/cartSlice';
import type { Product } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, Heart, ArrowRight, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} removed from cart`);
  };

  const handleMoveToWishlist = (productId: string) => {
    dispatch(moveToWishlist(productId));
    toast.success('Moved to wishlist');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Sign in to view your cart</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything yet</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
          >
            <Package size={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 dark:text-gray-400">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>

            {items.map((item) => {
              const product = item.product as Product;
              return (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 flex gap-4"
                >
                  <Link to={`/products/${product._id}`} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          to={`/products/${product._id}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-[#8b6d4b] transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                      </div>
                      <p className="font-semibold text-[#8b6d4b]">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(product._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveToWishlist(product._id)}
                          className="p-2 text-gray-500 hover:text-[#8b6d4b] transition-colors"
                          title="Move to Wishlist"
                        >
                          <Heart size={18} />
                        </button>
                        <button
                          onClick={() => handleRemove(product._id, product.name)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 bg-[#8b6d4b] text-white rounded-lg font-medium hover:bg-[#7a5f41] transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <Link
                to="/products"
                className="block w-full text-center mt-4 text-[#8b6d4b] hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
