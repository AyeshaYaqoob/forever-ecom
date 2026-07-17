import { ShieldCheck, Calendar, Lock } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect personal information you provide to us directly when creating an account, making a purchase, subscribing to our newsletter, or contacting our support. This information may include your name, email, shipping/billing address, phone number, and payment credentials.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the collected information to process and fulfill your orders, manage user accounts, provide customer support, improve our services, send promotional communications, and secure our system against fraudulent activities.'
    },
    {
      title: '3. Data Sharing & Third Parties',
      content: 'We do not sell your personal data. We only share information with trusted third-party service providers (like Stripe for payments, Shippo for fulfillment) that perform actions on our behalf and are bound by confidentiality terms.'
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-standard technical and organizational security measures (such as SSL encryption) to protect your personal information from unauthorized access, modification, or disclosure.'
    },
    {
      title: '5. Your Rights & Choices',
      content: 'You have the right to access, update, correct, or request deletion of your personal data at any time. You can manage these settings in your account profile or contact support at privacy@forever.com.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-150 dark:border-gray-700 shadow-sm">
        {/* Header */}
        <div className="border-b dark:border-gray-700 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-950 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-[#8b6d4b]" size={28} />
              Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-450 text-sm flex items-center gap-1">
              <Calendar size={14} />
              Last Updated: July 16, 2026
            </p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-955/20 text-[#8b6d4b] rounded-2xl w-fit">
            <Lock size={24} />
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-gray-650 dark:text-gray-300 leading-relaxed text-sm">
          <p>
            At FOREVER, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and protect your information when you visit our website or use our e-commerce platform.
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
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Us Regarding Privacy</h2>
            <p className="text-gray-650 dark:text-gray-450">
              If you have any questions, comments, or concerns about this policy or our data handling practices, please send an email to our data protection officer at <span className="font-semibold text-[#8b6d4b]">privacy@forever.com</span> or contact us at 123 Commerce St, New York, NY 10001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
