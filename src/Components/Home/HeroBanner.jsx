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
  totalCenters,
  formatCount
}) => {
  return (
    <div className="relative bg-base-100 overflow-hidden py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-30 mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-4 md:space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Droplet className="text-white" size={10} />
              </div>
              <span className="text-red-600 dark:text-red-400 font-bold text-xs tracking-wide">Save Lives • Make Impact</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-base-content leading-tight mb-2.5 tracking-tight">
                Donate<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Blood</span>
              </h1>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="h-0.5 w-10 md:w-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                <p className="text-base sm:text-sm md:text-base lg:text-lg font-bold text-base-content/80">Give Life</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-base-content/75 leading-relaxed max-w-xl font-medium mx-auto md:mx-0">
              Join our community of heroes making a real difference. Every donation saves up to three lives and brings hope to families in critical need.
            </p>

            <div className="flex flex-row gap-2.5 sm:gap-3 justify-center md:justify-start items-center w-full max-w-md mx-auto md:mx-0 pt-1">
              <Button as={Link} to={getDashboardPath()} variant="primary" className="flex-1 sm:flex-none group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold hover:scale-105 whitespace-nowrap shadow-md hover:shadow-lg transition-all">
                <Heart size={15} className="group-hover:scale-110 transition-transform fill-white shrink-0" />
                <span>{user ? 'Dashboard' : 'Join as Donor'}</span>
              </Button>
              <Button as={Link} to="/search" variant="outline" className="flex-1 sm:flex-none group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold hover:scale-105 whitespace-nowrap transition-all">
                <Search size={15} className="group-hover:rotate-12 transition-transform shrink-0" />
                <span>Search Donors</span>
              </Button>
            </div>

            {isStatsLoading ? (
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-4 max-w-md mx-auto md:mx-0">
                {[1, 2, 3].map((i) => <div key={i} className="animate-pulse bg-base-300 rounded-2xl h-18"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-4 max-w-md mx-auto md:mx-0">
                <div className="bg-base-200/90 border border-base-300 hover:border-red-300 dark:hover:border-red-900/60 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="text-red-600 dark:text-red-500" size={16} />
                  </div>
                  <p className="text-base sm:text-lg font-black text-base-content leading-tight">{formatCount(apiStats.totalDonors)}</p>
                  <p className="text-[11px] sm:text-xs text-base-content/70 font-semibold mt-0.5">Active Donors</p>
                </div>
                <div className="bg-base-200/90 border border-base-300 hover:border-red-300 dark:hover:border-red-900/60 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-500" size={16} />
                  </div>
                  <p className="text-base sm:text-lg font-black text-base-content leading-tight">{livesSaved}</p>
                  <p className="text-[11px] sm:text-xs text-base-content/70 font-semibold mt-0.5">Lives Saved</p>
                </div>
                <div className="bg-base-200/90 border border-base-300 hover:border-red-300 dark:hover:border-red-900/60 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="text-red-600 dark:text-red-500" size={16} />
                  </div>
                  <p className="text-base sm:text-lg font-black text-base-content leading-tight">{formatCount(totalCenters || centersData.length)}</p>
                  <p className="text-[11px] sm:text-xs text-base-content/70 font-semibold mt-0.5">Blood Banks</p>
                </div>
              </div>
            )}
          </div>

          <div className="relative mt-4 md:mt-0 block">
            <div className="relative max-w-md mx-auto md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl transform rotate-1 md:rotate-2 shadow-lg"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2016&auto=format&fit=crop" alt="Blood Donation" className="w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[390px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="absolute -bottom-3 left-2 md:-bottom-3 md:left-0 lg:-bottom-4 lg:-left-4 bg-base-200/95 backdrop-blur-md border-2 border-base-300 rounded-2xl p-2.5 sm:p-3.5 shadow-xl max-w-[170px] sm:max-w-[190px] hover:border-red-200 dark:hover:border-red-900/50 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0"><Shield className="text-white" size={14} /></div>
                <div><p className="text-sm sm:text-base font-black text-base-content">24/7</p><p className="text-[11px] sm:text-xs text-base-content/70 font-semibold">Emergency Support</p></div>
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-green-600 dark:text-green-400 font-medium"><Clock size={10} /><span>Always ready to help</span></div>
            </div>

            <div className="absolute top-3 right-2 md:top-4 md:right-0 lg:top-6 lg:-right-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-2.5 shadow-xl">
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
