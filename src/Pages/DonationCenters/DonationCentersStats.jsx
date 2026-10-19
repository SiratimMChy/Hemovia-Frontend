import { useEffect, useState } from 'react';
import { Award, Building, Globe, Shield, Clock } from 'lucide-react';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import { formatCount } from '../utils/centerHelpers';

const DonationCentersStats = ({ isInitialLoading, centers }) => {
  const [animatedStats, setAnimatedStats] = useState({
    centers: 0,
    divisions: 0,
    verified: 0,
    emergency: 0
  });

  useEffect(() => {
    const targetStats = {
      centers: centers.length,
      divisions: 8,
      verified: centers.filter(c => c.verified).length,
      emergency: 24
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        centers: Math.floor(targetStats.centers * progress),
        divisions: Math.floor(targetStats.divisions * progress),
        verified: Math.floor(targetStats.verified * progress),
        emergency: Math.floor(targetStats.emergency * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          centers: formatCount(targetStats.centers),
          divisions: targetStats.divisions,
          verified: formatCount(targetStats.verified),
          emergency: targetStats.emergency
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [centers]);

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 shadow-sm hover:border-red-200 dark:hover:border-red-800 transition-colors">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Award className="text-white" size={12} />
            </div>
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">
              NETWORK OVERVIEW
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-base-content mb-2 sm:mb-4">
            Our Network
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto px-4">
            Real-time statistics from our nationwide donation network
          </p>
        </div>

        {/* Stats Cards */}
        {isInitialLoading ? (
          <SkeletonLoader type="stats" count={4} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
                <Building className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-1 sm:mb-2 tabular-nums">{animatedStats.centers}</h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed font-semibold">
                Active Centers
              </p>
            </div>
            <div className="group bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
                <Globe className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-1 sm:mb-2 tabular-nums">{animatedStats.divisions}</h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed font-semibold">
                Divisions Covered
              </p>
            </div>

            <div className="group bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-green-200 dark:hover:border-green-900/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-green-900/30">
                <Shield className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-1 sm:mb-2 tabular-nums">{animatedStats.verified}</h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed font-semibold">
                Verified Centers
              </p>
            </div>

            <div className="group bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
                <Clock className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-1 sm:mb-2">24/7</h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed font-semibold">
                Emergency Support
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCentersStats;
