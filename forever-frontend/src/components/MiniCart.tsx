import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { removeFromCart, updateCartItem, selectCartTotal } from '../store/slices/cartSlice';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '../types';
import toast from 'react-hot-toast';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const cartTotal = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} removed from cart`);
  };

  const handleCheckout = () => {
    onClose();
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#8b6d4b]" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const product = item.product as Product;
                return (
                  <div
                    key={product._id}
                    className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        to={`/products/${product._id}`}
                        onClick={onClose}
                        className="font-medium text-gray-900 dark:text-white hover:text-[#8b6d4b] transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[#8b6d4b] font-semibold mt-1">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(product._id, item.quantity - 1)}
                            disabled={loading}
                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                            disabled={loading}
                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(product._id, product.name)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t dark:border-gray-700 p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Shipping and taxes calculated at checkout
            </p>

            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#8b6d4b] text-white rounded-lg font-medium hover:bg-[#7a5f41] transition-colors"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full py-3 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
