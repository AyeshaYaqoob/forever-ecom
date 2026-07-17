import { Truck, ShieldCheck, Globe, Clock, Package, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shipping = () => {
  const methods = [
    {
      name: 'Standard Delivery',
      time: '3–7 Business Days',
      cost: 'Free on orders over $50 / otherwise $5.99',
      description: 'Reliable, cost-effective delivery right to your doorstep. Best for everyday purchases.',
      icon: Truck,
      color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Express Shipping',
      time: '1–3 Business Days',
      cost: '$14.99 flat rate',
      description: 'Expedited processing and shipping for time-sensitive orders. Includes premium tracking.',
      icon: Clock,
      color: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
    },
    {
      name: 'Next-Day Delivery',
      time: '1 Business Day (order by 2 PM)',
      cost: '$29.99 flat rate',
      description: 'Need it tomorrow? Place order before 2:00 PM EST for guaranteed next-day delivery.',
      icon: Package,
      color: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            Shipping <span className="text-[#8b6d4b]">Information</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about our delivery options, processing times, and order tracking policies.
          </p>
        </div>

        {/* Shipping Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
              >
                <div className={`p-4 rounded-2xl w-fit ${method.color} mb-6`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.name}</h3>
                <p className="text-[#8b6d4b] font-semibold text-sm mb-4">{method.time}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  {method.description}
                </p>
                <div className="border-t border-gray-100 dark:border-gray-750 pt-4 mt-auto">
                  <span className="text-xs text-gray-400 dark:text-gray-500 block mb-1">Shipping Cost</span>
                  <span className="text-gray-900 dark:text-white font-bold text-sm">{method.cost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Processing Times */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-[#8b6d4b]" size={24} />
              Order Processing & Fulfillment
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                We do our best to process and pack all orders within <strong className="text-gray-900 dark:text-white font-semibold">1 to 2 business days</strong>. Orders placed on weekends or national holidays are queued for processing on the next available business day.
              </p>
              <p>
                As soon as your parcel leaves our fulfillment center, we will send you a shipment notification email containing your tracking number and order summary.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 flex gap-3 text-amber-800 dark:text-amber-300 text-xs">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p>
                  Please double-check your shipping address during checkout. We cannot redirect or refund shipments that are returned to us due to incomplete or incorrect address inputs.
                </p>
              </div>
            </div>
          </div>

          {/* International Shipping */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="text-[#8b6d4b]" size={24} />
              International Shipping
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                FOREVER currently ships to selected countries worldwide. International shipping rates, custom duties, and processing speeds vary by destination country.
              </p>
              <p>
                Please note that international orders may be subject to customs clearance procedures, which can cause unexpected delays beyond our original delivery estimates.
              </p>
              <p>
                Import duties, taxes, and brokerage fees are not included in the item price or shipping cost. These fees are the buyer's responsibility and are collected upon delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Tracking CTA */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-850 to-gray-900 dark:from-[#2a221a] dark:to-gray-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold">Track Your Delivery</h2>
            <p className="text-gray-300 max-w-xl text-sm lg:text-base leading-relaxed">
              Want to see exactly where your order is? Check your profile dashboard or input your tracking credentials on our dedicated order page.
            </p>
          </div>
          <Link
            to="/orders"
            className="px-8 py-4 bg-[#8b6d4b] hover:bg-[#785d3f] text-white font-bold rounded-xl whitespace-nowrap shadow-md transition-colors"
          >
            Go to Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
