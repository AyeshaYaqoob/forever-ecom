import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchWishlist, removeFromWishlist, moveToCart } from '../store/slices/wishlistSlice';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.wishlist);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemove = (productId: string, productName: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success(`${productName} removed from wishlist`);
  };

  const handleMoveToCart = (productId: string) => {
    dispatch(moveToCart({ productId, quantity: 1 }));
    toast.success('Moved to cart');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Sign in to view your wishlist</p>
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
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Save items you love to your wishlist</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
          >
            Explore Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{items.length} items saved</p>
          </div>
          <Link
            to="/products"
            className="text-[#8b6d4b] hover:underline flex items-center gap-1"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <Link to={`/products/${product._id}`} className="relative aspect-square block overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                  </span>
                )}
              </Link>

              <div className="p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {product.category}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="font-medium text-gray-900 dark:text-white mt-1 line-clamp-2 hover:text-[#8b6d4b] transition-colors"
                >
                  {product.name}
                </Link>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-[#8b6d4b]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.comparePrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleMoveToCart(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product._id, product.name)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
