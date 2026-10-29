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

  const statsList = [
    {
      icon: Building,
      value: animatedStats.centers,
      label: 'Active Centers',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      shadow: 'shadow-red-200 dark:shadow-red-900/30'
    },
    {
      icon: Globe,
      value: animatedStats.divisions,
      label: 'Divisions Covered',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      shadow: 'shadow-blue-200 dark:shadow-blue-900/30'
    },
    {
      icon: Shield,
      value: animatedStats.verified,
      label: 'Verified Centers',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      shadow: 'shadow-emerald-200 dark:shadow-emerald-900/30'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Emergency Support',
      color: 'bg-gradient-to-br from-rose-500 to-red-600',
      shadow: 'shadow-rose-200 dark:shadow-rose-900/30'
    }
  ];

  return (
    <div className="pt-1 sm:pt-2 pb-4 sm:pb-6 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 shadow-sm hover:border-red-200 dark:hover:border-red-800 transition-colors">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Award className="text-white" size={12} />
            </div>
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">
              NETWORK OVERVIEW
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-2">
            Our Network
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto px-4">
            Real-time statistics from our nationwide donation network
          </p>
        </div>

        {/* Stats Cards matching About page style & height */}
        {isInitialLoading ? (
          <SkeletonLoader type="stats" count={4} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {statsList.map((stat, index) => (
              <div
                key={index}
                className="bg-base-200/90 border border-base-300 rounded-2xl p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4 hover:border-red-300 dark:hover:border-red-900/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-xl ${stat.color} flex items-center justify-center shrink-0 shadow-sm ${stat.shadow} group-hover:scale-105 transition-transform`}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-base-content leading-tight tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-base-content/70 font-semibold truncate mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCentersStats;
