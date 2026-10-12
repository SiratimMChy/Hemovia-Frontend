import { Link } from 'react-router';
import { Heart, Search, Droplet, Users, Activity, Shield, Clock } from 'lucide-react';
import { Button } from '../UI';

const HeroBanner = ({
  user,
  getDashboardPath,
  isStatsLoading,
  apiStats,
  livesSaved,
  centersData,
  formatCount
}) => {
  return (
    <div className="relative bg-base-100 overflow-hidden flex items-center py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-30 mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-6 lg:gap-10 items-center">
          <div className="space-y-4 sm:space-y-3 md:space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Droplet className="text-white" size={10} />
              </div>
              <span className="text-red-600 dark:text-red-400 font-bold text-xs">Save Lives • Make Impact</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-black text-base-content leading-tight mb-2">
                Donate<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Blood</span>
              </h1>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="h-0.5 w-10 md:w-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                <p className="text-base sm:text-sm md:text-base lg:text-lg font-bold text-base-content/80">Give Life</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-base-content/70 leading-relaxed max-w-xl font-medium mx-auto md:mx-0">
              Join our community of heroes making a real difference. Every donation saves up to three lives and brings hope to families in critical need.
            </p>

            <div className="flex flex-row gap-2.5 sm:gap-3 justify-center md:justify-start items-center w-full max-w-md mx-auto md:mx-0">
              <Button as={Link} to={getDashboardPath()} variant="primary" className="flex-1 sm:flex-none group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm hover:scale-105 whitespace-nowrap">
                <Heart size={15} className="group-hover:scale-110 transition-transform fill-white shrink-0" />
                <span>{user ? 'Dashboard' : 'Join as Donor'}</span>
              </Button>
              <Button as={Link} to="/search" variant="outline" className="flex-1 sm:flex-none group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm hover:scale-105 whitespace-nowrap">
                <Search size={15} className="group-hover:rotate-12 transition-transform shrink-0" />
                <span>Search Donors</span>
              </Button>
            </div>

            {isStatsLoading ? (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 max-w-md mx-auto md:mx-0">
                {[1, 2, 3].map((i) => <div key={i} className="animate-pulse bg-base-300 rounded-xl h-16"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 max-w-md mx-auto md:mx-0">
                <div className="bg-base-200 border border-base-300 hover:border-red-200 dark:hover:border-red-900/50 rounded-xl p-2 sm:p-2.5 transition text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="text-red-600" size={14} />
                  </div>
                  <p className="text-base font-black text-base-content leading-tight">{formatCount(apiStats.totalDonors)}</p>
                  <p className="text-[11px] text-base-content/70 font-semibold mt-0.5">Active Donors</p>
                </div>
                <div className="bg-base-200 border border-base-300 hover:border-red-200 dark:hover:border-red-900/50 rounded-xl p-2 sm:p-2.5 transition text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="text-red-600 fill-red-600" size={14} />
                  </div>
                  <p className="text-base font-black text-base-content leading-tight">{livesSaved}</p>
                  <p className="text-[11px] text-base-content/70 font-semibold mt-0.5">Lives Saved</p>
                </div>
                <div className="bg-base-200 border border-base-300 hover:border-red-200 dark:hover:border-red-900/50 rounded-xl p-2 sm:p-2.5 transition text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="text-red-600" size={14} />
                  </div>
                  <p className="text-base font-black text-base-content leading-tight">{formatCount(centersData.length)}</p>
                  <p className="text-[11px] text-base-content/70 font-semibold mt-0.5">Blood Banks</p>
                </div>
              </div>
            )}
          </div>

          <div className="relative mt-4 md:mt-0 block">
            <div className="relative max-w-md mx-auto md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl transform rotate-1 md:rotate-2"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2016&auto=format&fit=crop" alt="Blood Donation" className="w-full h-[220px] sm:h-[260px] md:h-[280px] lg:h-[340px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="absolute -bottom-3 left-2 md:-bottom-3 md:left-0 lg:-bottom-4 lg:-left-4 bg-base-200 border-2 border-base-300 rounded-2xl p-2.5 sm:p-3 shadow-xl max-w-[170px] sm:max-w-[180px] hover:border-red-200 dark:hover:border-red-900/50 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0"><Shield className="text-white" size={14} /></div>
                <div><p className="text-sm sm:text-base font-black text-base-content">24/7</p><p className="text-[11px] sm:text-xs text-base-content/70 font-semibold">Emergency Support</p></div>
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-green-600 dark:text-green-400 font-medium"><Clock size={10} /><span>Always ready to help</span></div>
            </div>

            <div className="absolute top-3 right-2 md:top-4 md:right-0 lg:top-6 lg:-right-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-2 shadow-lg">
              <Droplet className="text-white fill-white mb-0.5 sm:mb-1" size={14} />
              <p className="text-white font-bold text-[11px] sm:text-xs">Every Drop</p>
              <p className="text-white/90 text-[10px] sm:text-xs">Counts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
