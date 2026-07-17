import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchProduct, clearCurrentProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { createReview } from '../store/slices/productSlice';

import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentProduct: product, loading } = useSelector((state: RootState) => state.products);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b6d4b]"></div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some(item => item._id === product._id);
  const hasReviewed = product.reviews.some(review => 
    typeof review.user === 'string' ? review.user === user?.id : (review.user as any)._id === user?.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product._id));
      toast.success('Added to wishlist');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      navigate('/login');
      return;
    }
    dispatch(createReview({ id: product._id, rating: reviewRating, comment: reviewComment }));
    setReviewComment('');
    setReviewRating(5);
  };

  const discount = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-[#8b6d4b]">Home</Link>
          <ChevronRight size={16} />
          <Link to="/products" className="hover:text-[#8b6d4b]">Products</Link>
          <ChevronRight size={16} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#8b6d4b]">
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-[#8b6d4b]' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} - ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-gray-600 dark:text-gray-400 ml-2">({product.numReviews} reviews)</span>
                </div>
                {product.inventory > 0 ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Check size={16} />
                    In Stock ({product.inventory} available)
                  </span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#8b6d4b]">${product.price.toFixed(2)}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-xl text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-[#8b6d4b] mb-2" size={24} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="text-[#8b6d4b] mb-2" size={24} />
                <span className="text-sm text-gray-600 dark:text-gray-400">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="text-[#8b6d4b] mb-2" size={24} />
                <span className="text-sm text-gray-600 dark:text-gray-400">30 Day Returns</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center border dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.inventory, q + 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-8 py-4 bg-[#8b6d4b] text-white rounded-lg font-medium hover:bg-[#7a5f41] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`p-4 rounded-lg border transition-colors ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Heart size={24} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="flex border-b dark:border-gray-700">
            {(['description', 'specifications', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-[#8b6d4b] border-b-2 border-[#8b6d4b]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab} ({tab === 'reviews' ? product.reviews.length : ''})
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{key}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Form */}
                {isAuthenticated && !hasReviewed && (
                  <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-1"
                          >
                            <Star
                              size={24}
                              className={star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Your Review</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                        placeholder="Share your experience..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                {product.reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#8b6d4b] text-white rounded-full flex items-center justify-center font-medium">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{review.name}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
