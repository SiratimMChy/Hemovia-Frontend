import React from 'react';
import { HeartPulse, Users, UserCheck, DollarSign } from 'lucide-react';

const VolunteerStatCards = ({ stats, volunteerStats, totalFunding, totalUsers }) => {
  const cards = [
    {
      title: 'Lives Saved',
      value: stats.done || 0,
      subtext: 'Completed donations',
      icon: HeartPulse,
      gradient: 'from-red-500 to-rose-600 shadow-red-500/25',
    },
    {
      title: 'Total Donors',
      value: totalUsers || 0,
      subtext: 'Registered donors',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600 shadow-blue-500/25',
    },
    {
      title: 'Active Volunteers',
      value: volunteerStats.activeVolunteers || 0,
      subtext: 'Community helpers',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
    },
    {
      title: 'Total Funding',
      value: `$${Number(totalFunding || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      subtext: 'Funds raised',
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500 shadow-amber-500/25',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map(({ title, value, subtext, icon: Icon, gradient }) => (
        <div
          key={title}
          className="bg-base-200 border border-base-300 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          {/* Top Row: Colorful Icon with rounded-lg */}
          <div className="flex items-center justify-between mb-2">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}>
              <Icon size={15} className="text-white sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Big Number Metric */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-base-content leading-tight">
            {value}
          </div>

          {/* Title and Subtext */}
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

export default VolunteerStatCards;
