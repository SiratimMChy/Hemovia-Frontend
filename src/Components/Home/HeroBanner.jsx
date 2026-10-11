import { Link } from 'react-router';
import { Heart, Search, Droplet, Users, Activity, Shield, Clock } from 'lucide-react';
import { Card, Button } from '../UI';

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
    <div className="relative min-h-[75vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[80vh] bg-base-100 overflow-hidden flex items-center py-8 sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative px-4 lg:px-30 mx-auto w-full pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-4 md:gap-6 lg:gap-8 items-center">
          <div className="space-y-4 sm:space-y-3 md:space-y-4 lg:space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3 md:px-4 py-2 rounded-full shadow-sm">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Droplet className="text-white" size={10} />
              </div>
              <span className="text-red-600 dark:text-red-400 font-bold text-xs">Save Lives • Make Impact</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-base-content leading-tight mb-2">
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

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button as={Link} to={getDashboardPath()} variant="primary" className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm hover:scale-105">
                <Heart size={16} className="group-hover:scale-110 transition-transform fill-white" />
                {user ? 'Go to Dashboard' : 'Join as Donor'}
              </Button>
              <Button as={Link} to="/search" variant="outline" className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm hover:scale-105">
                <Search size={16} className="group-hover:rotate-12 transition-transform" />
                Search Donors
              </Button>
            </div>

            {isStatsLoading ? (
              <div className="grid grid-cols-3 gap-2 pt-4 max-w-md mx-auto lg:mx-0">
                {[1, 2, 3].map((i) => <div key={i} className="animate-pulse bg-base-300 rounded-xl h-16"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 pt-4 max-w-md mx-auto lg:mx-0">
                <Card className="p-2 hover:border-red-200 dark:hover:border-red-900/50 transition text-center flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><Users className="text-red-600" size={12} /></div>
                  <p className="text-base font-black text-base-content">{formatCount(apiStats.totalDonors)}</p>
                  <p className="text-xs text-base-content/70 font-semibold">Active Donors</p>
                </Card>
                <Card className="p-2 hover:border-red-200 dark:hover:border-red-900/50 transition text-center flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><Heart className="text-red-600 fill-red-600" size={12} /></div>
                  <p className="text-base font-black text-base-content">{livesSaved}</p>
                  <p className="text-xs text-base-content/70 font-semibold">Lives Saved</p>
                </Card>
                <Card className="p-2 hover:border-red-200 dark:hover:border-red-900/50 transition text-center flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><Activity className="text-red-600" size={12} /></div>
                  <p className="text-base font-black text-base-content">{formatCount(centersData.length)}</p>
                  <p className="text-xs text-base-content/70 font-semibold">Blood Banks</p>
                </Card>
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl transform rotate-2"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2016&auto=format&fit=crop" alt="Blood Donation" className="w-full h-[280px] lg:h-[320px] xl:h-[360px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-base-200 border-2 border-base-300 rounded-2xl p-3 shadow-xl max-w-[180px] hover:border-red-200 dark:hover:border-red-900/50 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0"><Shield className="text-white" size={16} /></div>
                <div><p className="text-base font-black text-base-content">24/7</p><p className="text-xs text-base-content/70 font-semibold">Emergency Support</p></div>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium"><Clock size={10} /><span>Always ready to help</span></div>
            </div>

            <div className="absolute top-6 -right-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-2 shadow-lg">
              <Droplet className="text-white fill-white mb-1" size={16} />
              <p className="text-white font-bold text-xs">Every Drop</p>
              <p className="text-white/90 text-xs">Counts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
