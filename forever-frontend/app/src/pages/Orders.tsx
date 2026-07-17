import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { fetchMyOrders } from '../store/slices/orderSlice';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyOrders({}));
    }
  }, [dispatch, isAuthenticated]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'processing':
        return <Package className="text-blue-500" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Sign in to view your orders</p>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Orders Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41] transition-colors"
            >
              Start Shopping
              <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {order.orderItems.slice(0, 3).map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">+{order.orderItems.length - 3}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-[#8b6d4b]">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
