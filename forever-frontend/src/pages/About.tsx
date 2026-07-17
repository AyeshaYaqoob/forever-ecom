import { Shield, Sparkles, Heart, Award, ArrowUpRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'We source only the finest goods and partner with reputable brands to ensure every item meets strict standards.'
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description: "Our customer service goes above and beyond to guarantee you have an exceptional shopping experience every single time."
    },
    {
      icon: Leaf,
      title: 'Sustainable Focus',
      description: 'We strive to make conscious choices, selecting eco-friendly packaging and prioritizing items built to last.'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your security is our priority. We employ industry-standard encryption protocols and secure Stripe checkouts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Intro Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-[#8b6d4b] font-bold tracking-widest uppercase text-sm block">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-950 dark:text-white leading-tight">
              Elevating Your Everyday <span className="text-[#8b6d4b]">Lifestyle</span>
            </h1>
            <p className="text-gray-650 dark:text-gray-300 leading-relaxed text-lg">
              Founded in 2024, FOREVER was born out of a desire to make premium products easily accessible. We curate exceptional electronics, fashion items, kitchen essentials, and beauty solutions, blending durability with modern aesthetics.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              We believe that shopping should be inspiring and hassle-free. From our carefully structured checkout process to our robust 30-day refund policy, every touchpoint has been optimized around your convenience.
            </p>
            
            <div className="pt-4 flex gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8b6d4b] hover:bg-[#785d3f] text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Explore Shop
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Elegant Graphic Box */}
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-[#8b6d4b]/20 to-amber-100/10 dark:from-[#8b6d4b]/10 dark:to-gray-800 p-2 shadow-inner">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex flex-col justify-center items-center text-center p-8 relative overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#8b6d4b]/10 rounded-full blur-2xl" />
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-full text-[#8b6d4b] mb-4">
                  <Award size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Excellence Certified</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
                  Partnered with global leaders to ensure certified authenticity and standard warranties on all electronics and premium goods.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Stats Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-150 dark:border-gray-750 shadow-sm mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-4xl lg:text-5xl font-black text-[#8b6d4b]">10k+</span>
            <span className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider block mt-2">Active Customers</span>
          </div>
          <div>
            <span className="block text-4xl lg:text-5xl font-black text-[#8b6d4b]">500+</span>
            <span className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider block mt-2">Premium Brands</span>
          </div>
          <div>
            <span className="block text-4xl lg:text-5xl font-black text-[#8b6d4b]">99.8%</span>
            <span className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider block mt-2">Satisfaction Rate</span>
          </div>
          <div>
            <span className="block text-4xl lg:text-5xl font-black text-[#8b6d4b]">24/7</span>
            <span className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider block mt-2">Support Helpline</span>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white">Our Core Values</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
              The fundamental principles that guide our everyday decisions and long-term brand vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-3 bg-amber-50 dark:bg-amber-955/20 text-[#8b6d4b] rounded-xl w-fit mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
