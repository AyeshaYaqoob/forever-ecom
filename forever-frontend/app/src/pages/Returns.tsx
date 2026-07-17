import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, ShieldCheck, Clipboard, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Returns = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    reason: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Return request submitted! Check your email for shipping label instructions.');
      setFormData({ orderId: '', email: '', reason: '', comment: '' });
    }, 1500);
  };

  const steps = [
    {
      num: '01',
      title: 'Submit Request',
      description: 'Fill out our online return form with your Order ID and contact details.'
    },
    {
      num: '02',
      title: 'Print Label',
      description: 'Check email box for a prepaid shipping label and packing slip printouts.'
    },
    {
      num: '03',
      title: 'Ship Package',
      description: 'Pack items securely in their original packaging and drop off at your nearest carrier point.'
    },
    {
      num: '04',
      title: 'Get Refunded',
      description: 'Once checked at our facility, refunds are processed to your original payment within 5-7 days.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            Returns & <span className="text-[#8b6d4b]">Exchanges</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Need to return or exchange an item? We make it simple. Follow our hassle-free process to get started.
          </p>
        </div>

        {/* Steps to Return */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-150 dark:border-gray-700 shadow-sm relative">
                <span className="text-4xl font-black text-amber-500/20 dark:text-amber-500/10 absolute right-4 top-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-8">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Policy Guidelines */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <RotateCcw className="text-[#8b6d4b]" size={22} />
                Return Policy Highlights
              </h2>

              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <div className="flex gap-3">
                  <ShieldCheck size={20} className="text-[#8b6d4b] flex-shrink-0" />
                  <p>
                    <strong>30-Day Window:</strong> Returns must be initiated within 30 days of the product delivery date.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Clipboard size={20} className="text-[#8b6d4b] flex-shrink-0" />
                  <p>
                    <strong>Condition:</strong> Items must be unworn, unwashed, and returned in their original packaging with tags intact.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertTriangle size={20} className="text-[#8b6d4b] flex-shrink-0" />
                  <p>
                    <strong>Non-Returnable:</strong> Final sale items, gift cards, and personalized products cannot be returned or exchanged.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
              <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Need an Exchange?</h3>
              <p className="text-amber-800 dark:text-amber-400 text-sm leading-relaxed">
                If you need a different size, color, or replacement item, please submit a request using the form here and state "Exchange" in the comments. Or email us directly at support@forever.com.
              </p>
            </div>
          </div>

          {/* Return Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start Your Return</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Fill out the form below to request a prepaid shipping label.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Order ID
                    </label>
                    <input
                      type="text"
                      id="orderId"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                      required
                      placeholder="e.g. ORD-12345"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white focus:ring-2 focus:ring-[#8b6d4b] focus:border-[#8b6d4b] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white focus:ring-2 focus:ring-[#8b6d4b] focus:border-[#8b6d4b] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Return
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white focus:ring-2 focus:ring-[#8b6d4b] focus:border-[#8b6d4b] transition-colors"
                  >
                    <option value="">Select a reason</option>
                    <option value="wrong-size">Incorrect size / Fit issues</option>
                    <option value="damaged">Item arrived damaged / defective</option>
                    <option value="not-matching">Doesn't match website description</option>
                    <option value="changed-mind">Changed my mind / No longer needed</option>
                    <option value="other">Other reason (explain below)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comments / Details
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Provide additional details or request an exchange (optional)..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white focus:ring-2 focus:ring-[#8b6d4b] focus:border-[#8b6d4b] transition-colors"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#8b6d4b] hover:bg-[#785d3f] text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
