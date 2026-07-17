import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import type { Product } from '../types';
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Grid3X3,
  List,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, loading, pagination } = useSelector(
    (state: RootState) => state.products
  );
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const fetchProductsWithFilters = useCallback(() => {
    const params: Record<string, any> = {
      page: currentPage,
      limit: 12,
      sortBy
    };

    if (selectedCategory) params.category = selectedCategory;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (minRating) params.minRating = minRating;
    if (searchQuery) params.search = searchQuery;

    dispatch(fetchProducts(params));

    // Update URL
    const newParams = new URLSearchParams();
    if (selectedCategory) newParams.set('category', selectedCategory);
    if (priceRange.min) newParams.set('minPrice', priceRange.min);
    if (priceRange.max) newParams.set('maxPrice', priceRange.max);
    if (minRating) newParams.set('minRating', minRating);
    if (sortBy !== 'popularity') newParams.set('sortBy', sortBy);
    if (searchQuery) newParams.set('search', searchQuery);
    if (currentPage > 1) newParams.set('page', currentPage.toString());

    setSearchParams(newParams);
  }, [dispatch, selectedCategory, priceRange, minRating, sortBy, searchQuery, currentPage, setSearchParams]);

  // Sync URL params → state when navigating via navbar links (e.g. /products?category=Electronics)
  // useState() only reads the initial value once, so we need this effect to handle external URL changes.
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const searchFromUrl  = searchParams.get('search') || '';
    const sortFromUrl    = searchParams.get('sortBy') || 'popularity';
    const pageFromUrl    = parseInt(searchParams.get('page') || '1');
    const minPriceFromUrl = searchParams.get('minPrice') || '';
    const maxPriceFromUrl = searchParams.get('maxPrice') || '';
    const minRatingFromUrl = searchParams.get('minRating') || '';

    if (categoryFromUrl !== selectedCategory) setSelectedCategory(categoryFromUrl);
    if (searchFromUrl  !== searchQuery)       setSearchQuery(searchFromUrl);
    if (sortFromUrl    !== sortBy)            setSortBy(sortFromUrl);
    if (pageFromUrl    !== currentPage)       setCurrentPage(pageFromUrl);
    if (minPriceFromUrl !== priceRange.min || maxPriceFromUrl !== priceRange.max)
      setPriceRange({ min: minPriceFromUrl, max: maxPriceFromUrl });
    if (minRatingFromUrl !== minRating)       setMinRating(minRatingFromUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  useEffect(() => {
    fetchProductsWithFilters();
  }, [fetchProductsWithFilters]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (product: Product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product._id));
      toast.success('Added to wishlist');
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setMinRating('');
    setSortBy('popularity');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategory || priceRange.min || priceRange.max || minRating || searchQuery;

  const ProductCard = ({ product }: { product: Product }) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);

    if (viewMode === 'list') {
      return (
        <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Link to={`/products/${product._id}`} className="w-48 h-48 flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-[#8b6d4b] transition-colors"
                >
                  {product.name}
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({product.numReviews})</span>
                </div>
              </div>
              <button
                onClick={() => handleWishlistToggle(product)}
                className={`p-2 rounded-lg transition-colors ${
                  isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Heart size={20} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{product.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#8b6d4b]">${product.price.toFixed(2)}</span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <Link to={`/products/${product._id}`} className="relative aspect-square block overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlistToggle(product);
            }}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart size={18} className={isInWishlist ? 'fill-current' : ''} />
          </button>
        </Link>
        <div className="p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{product.category}</p>
          <Link
            to={`/products/${product._id}`}
            className="font-medium text-gray-900 dark:text-white mt-1 line-clamp-2 group-hover:text-[#8b6d4b] transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#8b6d4b]">${product.price.toFixed(2)}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-[#8b6d4b] hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedCategory || 'All Products'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {pagination.total} products found
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              defaultValue={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b] text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory('')}
                      className="text-[#8b6d4b] focus:ring-[#8b6d4b]"
                    />
                    <span className="text-gray-600 dark:text-gray-400">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-[#8b6d4b] focus:ring-[#8b6d4b]"
                      />
                      <span className="text-gray-600 dark:text-gray-400">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating.toString()}
                        onChange={() => setMinRating(rating.toString())}
                        className="text-[#8b6d4b] focus:ring-[#8b6d4b]"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-gray-600 dark:text-gray-400 ml-1">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg"
                >
                  <Filter size={18} />
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#8b6d4b] text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#8b6d4b] text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className={`bg-gray-200 dark:bg-gray-700 rounded-xl ${viewMode === 'grid' ? 'aspect-square' : 'h-48'}`} />
                    <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#8b6d4b] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Previous
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-[#8b6d4b] text-white'
                        : 'border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 border dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
