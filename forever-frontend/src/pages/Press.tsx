import { Newspaper, Download, Mail, Calendar, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Press = () => {
  const pressReleases = [
    {
      date: 'July 10, 2026',
      title: 'FOREVER Announces Series A Funding to Expand AI-Driven Personalization',
      excerpt: 'With $15M raised in Series A funding, FOREVER plans to accelerate feature rollouts, enrich inventory lines, and integrate predictive shopping assistants.'
    },
    {
      date: 'May 18, 2026',
      title: 'Launch of "Eco-Living" Home Decor Collections with Sustainable Brands',
      excerpt: 'FOREVER launches certified sustainable home, kitchen and accessory lines in collaboration with ethical makers globally.'
    },
    {
      date: 'March 05, 2026',
      title: 'FOREVER Named in Top 50 Fast-Growing Digital Commerce Brands',
      excerpt: 'Recognized for excellent order fulfillment times, customer-centric support, and high customer retention rates in 2026.'
    }
  ];

  const resources = [
    { name: 'Brand Identity Guidelines', size: '2.4 MB', type: 'PDF' },
    { name: 'Official Logo Asset Pack', size: '5.8 MB', type: 'ZIP (PNG, SVG)' },
    { name: 'Fulfillment Center B-Roll', size: '45.1 MB', type: 'MP4' }
  ];

  const handleDownload = (name: string) => {
    toast.success(`Started download for ${name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            Press & <span className="text-[#8b6d4b]">Media</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Welcome to our media room. Stay up to date with our company announcements, press releases, and brand asset downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Press Releases Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Newspaper className="text-[#8b6d4b]" size={24} />
              Recent Announcements
            </h2>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-semibold mb-2">
                    <Calendar size={12} />
                    {release.date}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {release.title}
                  </h3>
                  <p className="text-gray-650 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {release.excerpt}
                  </p>
                  <button
                    onClick={() => toast.success('Viewing full release (mock)')}
                    className="inline-flex items-center gap-1.5 text-sm text-[#8b6d4b] hover:text-[#785d3f] font-bold"
                  >
                    Read Full Release
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Columns (Media Kits & Contacts) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Press Assets Download Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Media Kit Assets</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">
                Official logos, branding colors, guidelines, and media resources for press publications.
              </p>

              <div className="space-y-4">
                {resources.map((res, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-transparent dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{res.name}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">
                        {res.type} &bull; {res.size}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDownload(res.name)}
                      className="p-2.5 bg-white dark:bg-gray-800 border dark:border-gray-750 text-[#8b6d4b] hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-xl transition-all shadow-sm"
                      aria-label="Download asset"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Contact details */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-850 dark:from-[#251e18] dark:to-gray-900 rounded-2xl p-6 text-white shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Mail className="text-[#8b6d4b]" size={20} />
                Media Inquiries
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Are you a member of the press? Reach out to our communications team directly for commentary, interview setups, or specific image requests.
              </p>
              
              <div className="space-y-2">
                <span className="text-xs text-gray-400 block">PR Team Email</span>
                <span className="font-semibold text-[#8b6d4b] text-sm block">press@forever.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
