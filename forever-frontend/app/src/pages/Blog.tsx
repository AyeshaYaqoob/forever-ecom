import { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Rss, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface Post {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const postsData: Post[] = [
  {
    title: 'Top 5 Smarthome Devices for Minimalist Living in 2026',
    category: 'Technology',
    excerpt: 'Streamline your daily routines with smarthome devices that balance high functionality with aesthetic minimalism.',
    author: 'Alex Carter',
    date: 'July 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600'
  },
  {
    title: 'Seasonal Wardrobe Capsule: How to Pack Light but Stay Premium',
    category: 'Fashion',
    excerpt: 'Discover the ultimate capsule wardrobe checklist that keeps you looking stylish and elegant with minimal pieces.',
    author: 'Emily Watson',
    date: 'June 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600'
  },
  {
    title: 'The Art of Brewing the Perfect Cup of French Press at Home',
    category: 'Lifestyle',
    excerpt: 'A complete breakdown of coffee ratios, grind sizes, and water temperature variables to unlock your beans full profile.',
    author: 'Marcus Vance',
    date: 'June 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600'
  },
  {
    title: 'Skincare Essentials: Science-Backed Products for Glowing Skin',
    category: 'Beauty',
    excerpt: 'From hyaluronic acid to niacinamides, we analyze which ingredients actually deliver visible skin improvement results.',
    author: 'Dr. Sarah Lin',
    date: 'May 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600'
  }
];

const categories = ['All', 'Technology', 'Fashion', 'Lifestyle', 'Beauty'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1200);
  };

  const filteredPosts = postsData.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            The FOREVER <span className="text-[#8b6d4b]">Journal</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Inspiring stories, product tips, lifestyle features, and technological trends curated for you.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto space-x-2 pb-4 mb-8 no-scrollbar justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group"
            >
              {/* Image Container with Zoom effect */}
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#8b6d4b] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Content block */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 font-semibold mb-3">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-[#8b6d4b] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => toast.success('Reading full article (mock)')}
                  className="inline-flex items-center gap-1.5 text-sm text-[#8b6d4b] hover:text-[#785d3f] font-bold mt-auto"
                >
                  Read More
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 lg:p-12 border border-gray-800 text-white shadow-xl text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-[#8b6d4b]/10 rounded-full blur-3xl pointer-events-none" />
          
          <Rss size={48} className="mx-auto text-[#8b6d4b] mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
            Get the latest lifestyle journals, promotional updates, and product curation guides delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="px-6 py-3 bg-[#8b6d4b] hover:bg-[#785d3f] text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              {isSubscribing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Mail size={16} />
                  Subscribe
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
