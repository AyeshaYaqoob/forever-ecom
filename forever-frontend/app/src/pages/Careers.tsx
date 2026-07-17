import { useState } from 'react';
import { Briefcase, MapPin, Heart, Shield, GraduationCap, Monitor, ArrowRight, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const openPositions: Job[] = [
  {
    title: 'Senior Frontend Developer (React)',
    department: 'Engineering',
    location: 'New York, NY / Hybrid',
    type: 'Full-Time',
    description: 'We are looking for a senior React engineer to build premium, responsive web interfaces, optimize performance, and collaborate with UX teams.'
  },
  {
    title: 'Visual UI/UX Designer',
    department: 'Design',
    location: 'Remote (US/Canada)',
    type: 'Full-Time',
    description: 'Lead visual design efforts across product pages, checkouts, and landing flows to create breathtaking brand experiences.'
  },
  {
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Remote (Global)',
    type: 'Full-Time',
    description: 'Help customers with orders, returns, and general support inquiries. Excellent verbal and written communication is a must.'
  },
  {
    title: 'Digital Marketing Lead',
    department: 'Growth',
    location: 'New York, NY / Hybrid',
    type: 'Full-Time',
    description: 'Drive acquisition, retention, and brand loyalty strategies through SEO, paid socials, and organic campaign funnels.'
  }
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeLink: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Application for "${selectedJob?.title}" submitted successfully!`);
      setSelectedJob(null);
      setFormData({ name: '', email: '', resumeLink: '', coverLetter: '' });
    }, 1500);
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      desc: 'Comprehensive medical, dental, and vision insurance premiums covered 100% for employees.'
    },
    {
      icon: Monitor,
      title: 'Flexible Workspace',
      desc: 'Work from home or check out our high-tech hubs in NYC. We provide top-tier hardware setups.'
    },
    {
      icon: GraduationCap,
      title: 'Growth Budgets',
      desc: 'Annual learning allowance for courses, bootcamps, and developer conferences.'
    },
    {
      icon: Shield,
      title: 'Retirement & Equity',
      desc: 'Competitive salaries with stock options and 401(k) retirement matching program.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight sm:text-5xl">
            Join Our <span className="text-[#8b6d4b]">Team</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Work on exciting e-commerce solutions, build premium user interfaces, and redefine digital retail alongside a passionate global team.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Why Work at FOREVER?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="p-3 bg-amber-50 dark:bg-amber-955/20 text-[#8b6d4b] rounded-xl w-fit mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-650 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Current Openings</h2>
          <div className="space-y-6">
            {openPositions.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-[#8b6d4b] rounded-full text-xs font-bold uppercase tracking-wider">
                    {job.department}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.type}
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full md:w-auto px-5 py-3 bg-[#8b6d4b] hover:bg-[#785d3f] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap shadow-sm"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-850 rounded-2xl max-w-lg w-full p-8 border border-gray-100 dark:border-gray-700 relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl font-bold"
              >
                &times;
              </button>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Apply for Position</h3>
              <p className="text-[#8b6d4b] font-semibold text-sm mb-6">{selectedJob.title}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-750 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border dark:border-gray-750 bg-white dark:bg-gray-700 text-gray-950 dark:text-white rounded-lg focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-750 dark:text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border dark:border-gray-750 bg-white dark:bg-gray-700 text-gray-950 dark:text-white rounded-lg focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-750 dark:text-gray-300">Resume / LinkedIn Link</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    value={formData.resumeLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, resumeLink: e.target.value }))}
                    className="w-full px-4 py-2 border dark:border-gray-750 bg-white dark:bg-gray-700 text-gray-950 dark:text-white rounded-lg focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-750 dark:text-gray-300">Cover Letter (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Why are you a great fit for FOREVER?"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    className="w-full px-4 py-2 border dark:border-gray-750 bg-white dark:bg-gray-700 text-gray-950 dark:text-white rounded-lg focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#8b6d4b] hover:bg-[#785d3f] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
