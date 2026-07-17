import { Cookie, Calendar, Info } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      title: '1. Essential Cookies',
      purpose: 'Strictly necessary to enable core site functionality, handle authentication, secure your user login sessions, and save your shopping cart state. Without these, our checkout and cart logic would not function.',
      duration: 'Session-based or persistent (up to 30 days)'
    },
    {
      title: '2. Analytical & Performance Cookies',
      purpose: 'Help us analyze how users interact with our platform by collecting and reporting anonymous analytics data. This allows us to resolve interface issues, build features, and understand traffic sources.',
      duration: 'Up to 2 years'
    },
    {
      title: '3. Functional Cookies',
      purpose: 'Remember your preferences and configuration settings across visits (such as your chosen Light/Dark theme mode, currency choice, or location settings) to offer a more personalized shopping experience.',
      duration: 'Up to 1 year'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-150 dark:border-gray-700 shadow-sm">
        {/* Header */}
        <div className="border-b dark:border-gray-700 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-950 dark:text-white flex items-center gap-2">
              <Cookie className="text-[#8b6d4b]" size={28} />
              Cookie Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-450 text-sm flex items-center gap-1">
              <Calendar size={14} />
              Last Updated: July 16, 2026
            </p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-955/20 text-[#8b6d4b] rounded-2xl w-fit">
            <Info size={24} />
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-gray-650 dark:text-gray-300 leading-relaxed text-sm">
          <p>
            FOREVER uses cookies, web beacons, and similar tracking technologies to enhance your browsing experience, provide security, analyze traffic, and customize content and ads. This policy explains what cookies are and how you can manage them.
          </p>

          <div className="space-y-6">
            {cookieTypes.map((type, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{type.title}</h2>
                <p className="text-gray-600 dark:text-gray-450 leading-relaxed">
                  <strong>Purpose:</strong> {type.purpose}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs">
                  <strong>Retention Period:</strong> {type.duration}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t dark:border-gray-700 pt-6 mt-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How to Manage Cookies</h2>
            <p className="text-gray-650 dark:text-gray-450 mb-4">
              Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, please note that blocking essential cookies will prevent you from logging in, checking out, or using core shopping cart functions on our website.
            </p>
            <p className="text-gray-655 dark:text-gray-450">
              For more information about how we process your personal data, please visit our <a href="/privacy" className="text-[#8b6d4b] hover:underline font-semibold">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
