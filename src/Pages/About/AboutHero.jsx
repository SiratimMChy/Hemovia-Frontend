import { Droplet } from 'lucide-react';

const AboutHero = ({ stats }) => {
  return (
    <div className="relative py-20 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="relative px-4 lg:px-30 mx-auto w-full">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-5 py-3 rounded-full shadow-sm mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
              <Droplet className="text-white" size={16} />
            </div>
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">About Hemovia</span>
          </div>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-base-content leading-none mb-5">
              Connecting<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Hearts</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
              <p className="text-xl md:text-2xl font-bold text-base-content/80">Saving Lives</p>
              <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-base-content/70 leading-relaxed max-w-4xl mx-auto font-medium">
            Hemovia is a growing blood donation platform in Bangladesh, connecting donors with those in urgent need. 
            With <span className="font-bold text-red-600 dark:text-red-400">{stats.totalDonors} registered donors</span> and{' '}
            <span className="font-bold text-red-600 dark:text-red-400">{stats.successfulDonations} lives saved</span>, we're building a community 
            where compassion meets technology to create real impact in Sylhet and across Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
