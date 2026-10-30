import { useEffect, useState } from 'react';
import { Building, Globe, Shield, Clock } from 'lucide-react';
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

  if (isInitialLoading) {
    return (
      <div className="pt-2 sm:pt-3 max-w-4xl mx-auto w-full">
        <SkeletonLoader type="stats" count={4} />
      </div>
    );
  }

  return (
    <div className="pt-2 sm:pt-3 max-w-4xl mx-auto w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
        {statsList.map((stat, index) => (
          <div
            key={index}
            className="bg-base-100/90 dark:bg-base-200/90 backdrop-blur-sm border border-base-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex items-center gap-2.5 sm:gap-3 hover:border-red-300 dark:hover:border-red-900/50 hover:shadow-md transition-all duration-300 group text-left"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl ${stat.color} flex items-center justify-center shrink-0 shadow-sm ${stat.shadow} group-hover:scale-105 transition-transform`}>
              <stat.icon className="text-white" size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg md:text-xl font-black text-base-content leading-tight tabular-nums">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-base-content/70 font-semibold truncate mt-0.5">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCentersStats;
