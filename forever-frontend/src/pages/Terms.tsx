import { FileText, Calendar, Scale } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the FOREVER e-commerce platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you are prohibited from using this website.'
    },
    {
      title: '2. User Accounts & Responsibilities',
      content: 'When registering an account on our platform, you must provide accurate, current, and complete details. You are solely responsible for maintaining the confidentiality of your account credentials and password.'
    },
    {
      title: '3. Purchasing & Payments',
      content: 'All purchase transactions on our platform are processed securely via Stripe. By placing an order, you warrant that you are authorized to use the chosen payment method and authorize us to charge the order total.'
    },
    {
      title: '4. Returns & Refund Policy',
      content: 'Returns and exchanges are governed by our official Returns Policy. We offer a 30-day window from the delivery date for qualifying items, subject to inspection. Custom items and sale items may not be returnable.'
    },
    {
      title: '5. Limitation of Liability',
      content: 'In no event shall FOREVER or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-150 dark:border-gray-700 shadow-sm">
        {/* Header */}
        <div className="border-b dark:border-gray-700 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-950 dark:text-white flex items-center gap-2">
              <FileText className="text-[#8b6d4b]" size={28} />
              Terms of Service
            </h1>
            <p className="text-gray-500 dark:text-gray-450 text-sm flex items-center gap-1">
              <Calendar size={14} />
              Last Updated: July 16, 2026
            </p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-955/20 text-[#8b6d4b] rounded-2xl w-fit">
            <Scale size={24} />
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-gray-650 dark:text-gray-300 leading-relaxed text-sm">
          <p>
            Welcome to FOREVER. Please read these Terms of Service carefully before accessing or using our platform. These terms govern your use of our website, purchasing procedures, account registration, and dispute resolution methods.
          </p>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h2>
                <p className="text-gray-600 dark:text-gray-450 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t dark:border-gray-700 pt-6 mt-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Questions or Legal Inquiries</h2>
            <p className="text-gray-650 dark:text-gray-450">
              If you have any queries regarding our terms, services, or legal compliance, please send your letters to <span className="font-semibold text-[#8b6d4b]">legal@forever.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
