import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b6d4b]"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats?.totalSales?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      trend: '+8.2%'
    },
    {
      title: 'Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-purple-500',
      trend: '+5.1%'
    },
    {
      title: 'Customers',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-orange-500',
      trend: '+15.3%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-green-600 text-sm">
              <TrendingUp size={16} />
              <span>{stat.trend}</span>
              <span className="text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Overview</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {stats?.salesByMonth?.map((item: any, index: number) => {
              const maxSales = Math.max(...stats.salesByMonth.map((s: any) => s.sales));
              const height = maxSales > 0 ? (item.sales / maxSales) * 100 : 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[#8b6d4b] rounded-t-lg transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <p className="text-xs text-gray-500 mt-2">{item.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status</h3>
          <div className="space-y-4">
            {stats?.orderStatusCounts?.map((status: any) => (
              <div key={status._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    status._id === 'delivered' ? 'bg-green-500' :
                    status._id === 'shipped' ? 'bg-blue-500' :
                    status._id === 'processing' ? 'bg-yellow-500' :
                    status._id === 'pending' ? 'bg-gray-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{status._id}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
            <Link to="/admin/orders" className="text-[#8b6d4b] hover:underline text-sm flex items-center gap-1">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.recentOrders?.slice(0, 5).map((order: any) => (
              <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#8b6d4b]">${order.totalPrice.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
            <Link to="/admin/products" className="text-[#8b6d4b] hover:underline text-sm flex items-center gap-1">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.topProducts?.slice(0, 5).map((product: any, index: number) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="w-8 h-8 bg-[#8b6d4b] text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.quantity} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
