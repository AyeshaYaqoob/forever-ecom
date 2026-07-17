import { useState } from 'react';
import { Search, HelpCircle, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqsData: FAQItem[] = [
  {
    id: 'q1',
    category: 'General',
    question: 'What is FOREVER?',
    answer: 'FOREVER is a premium e-commerce platform offering carefully curated selection of high-quality electronics, fashion, home decor, beauty products and more. We aim to combine high-end goods with top-tier customer support.'
  },
  {
    id: 'q2',
    category: 'Orders',
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive an email confirmation with a tracking number. You can also view details and track it by logging in, going to your Profile, and clicking on "Orders".'
  },
  {
    id: 'q3',
    category: 'Orders',
    question: 'Can I change or cancel my order after placing it?',
    answer: 'We process orders quickly to ensure fast delivery. You can change or cancel your order within 30 minutes of placing it by contacting our support team. Once it enters the shipping phase, we can no longer edit or halt the order.'
  },
  {
    id: 'q4',
    category: 'Shipping',
    question: 'How long will delivery take?',
    answer: 'Standard shipping usually takes 3 to 7 business days, while express shipping takes 1 to 3 business days. Delivery times may vary depending on your location and holiday season peaks.'
  },
  {
    id: 'q5',
    category: 'Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders over $50. For orders under $50, a standard shipping fee of $5.99 applies.'
  },
  {
    id: 'q6',
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return window. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be in original condition, unused, and with all tags intact.'
  },
  {
    id: 'q7',
    category: 'Returns',
    question: 'How do I start a return process?',
    answer: 'To start a return, visit the "Returns" page linked in the footer, enter your order number and email, select the items you wish to return, and print your prepaid shipping label.'
  },
  {
    id: 'q8',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and secure payments processed via Stripe.'
  },
  {
    id: 'q9',
    category: 'Payments',
    question: 'Is it safe to use my credit card on your website?',
    answer: 'Absolutely. We use industry-standard SSL encryption and partner with Stripe for secure transaction processing. We do not store your credit card information on our servers.'
  }
];

const categories = ['All', 'General', 'Orders', 'Shipping', 'Returns', 'Payments'];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqsData.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            Frequently Asked <span className="text-[#8b6d4b]">Questions</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about shipping, orders, returns, payments, and services.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="block w-full pl-10 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-950 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b6d4b] focus:border-[#8b6d4b] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto space-x-2 pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[#8b6d4b] text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                      <HelpCircle className="text-[#8b6d4b] flex-shrink-0" size={20} />
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-[#8b6d4b]' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100 border-t border-gray-100 dark:border-gray-700' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm bg-gray-50/50 dark:bg-gray-800/30">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No FAQs found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            If you couldn't find the answers you were looking for, please get in touch with our customer service.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] hover:bg-[#785d3f] text-white font-semibold rounded-xl transition-all shadow-md"
          >
            <MessageSquare size={18} />
            Contact Support
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
