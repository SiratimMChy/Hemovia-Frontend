import React from 'react';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const DonorStatCards = ({ stats, completionRate }) => {
  const cards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests,
      subtext: 'All time',
      icon: Users,
      gradient: 'from-red-500 to-rose-600 shadow-red-500/25',
    },
    {
      title: 'Pending',
      value: stats.pendingRequests,
      subtext: 'Awaiting donor',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500 shadow-amber-500/25',
    },
    {
      title: 'Completed',
      value: stats.completedRequests,
      subtext: 'Donations done',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
    },
    {
      title: 'Success Rate',
      value: `${completionRate}%`,
      subtext: 'Completion rate',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-indigo-600 shadow-blue-500/25',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map(({ title, value, subtext, icon: Icon, gradient }) => (
        <div
          key={title}
          className="bg-base-200 border border-base-300 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          {/* Top Row: Colorful Icon */}
          <div className="flex items-center justify-between mb-2">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}>
              <Icon size={15} className="text-white sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Big Number Metric */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-base-content leading-tight">
            {value}
          </div>

          {/* Title and Subtext (Full width, no truncate - so no '...' on 320px/375px) */}
          <div className="mt-1">
            <p className="text-xs sm:text-sm font-bold text-base-content leading-tight">
              {title}
            </p>
            <p className="text-[10px] sm:text-xs text-base-content/50 mt-0.5 leading-tight">
              {subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorStatCards;
