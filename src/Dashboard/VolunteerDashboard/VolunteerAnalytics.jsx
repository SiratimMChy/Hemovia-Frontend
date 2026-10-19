import React from 'react';
import { MdBloodtype } from 'react-icons/md';
import { Activity, Heart, TrendingUp, ShieldCheck } from 'lucide-react';

const VolunteerAnalytics = ({ stats, volunteerStats, totalRequests, userData }) => {
  const getPercent = (count) => (totalRequests > 0 ? Math.round((count / totalRequests) * 100) : 0);
  const successRate = totalRequests > 0 ? Math.round(((stats.done || 0) / totalRequests) * 100) : 0;

  const statuses = [
    { label: 'Pending', count: stats.pending || 0, color: 'bg-amber-500' },
    { label: 'In Progress', count: stats.inprogress || 0, color: 'bg-blue-500' },
    { label: 'Completed', count: stats.done || 0, color: 'bg-emerald-500' },
    { label: 'Canceled', count: stats.canceled || 0, color: 'bg-rose-500' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Request Status Breakdown */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs">
        <h3 className="text-sm sm:text-base font-bold text-base-content mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
            <MdBloodtype size={15} />
          </div>
          <span>Request Status Distribution</span>
        </h3>

        <div className="space-y-3">
          {statuses.map(({ label, count, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-2 text-base-content">
                  <span className={`w-2 h-2 rounded-full ${color}`}></span>
                  {label}
                </span>
                <span className="text-base-content/70 font-semibold">
                  {count} ({getPercent(count)}%)
                </span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                <div
                  className={`${color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${getPercent(count)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Mission & Community Impact */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <h3 className="text-sm sm:text-base font-bold text-base-content mb-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Activity size={14} />
          </div>
          <span>Volunteer Impact & Mission</span>
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center py-2">
          <div className="bg-base-100 p-2.5 sm:p-3 rounded-xl border border-base-300">
            <span className="text-[10px] sm:text-[11px] text-base-content/60 block mb-0.5">Success</span>
            <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
              {successRate}%
            </span>
          </div>
          <div className="bg-base-100 p-2.5 sm:p-3 rounded-xl border border-base-300">
            <span className="text-[10px] sm:text-[11px] text-base-content/60 block mb-0.5">Lives Helped</span>
            <span className="text-lg sm:text-xl font-black text-red-600 dark:text-red-400">
              {volunteerStats.helpedRequests || stats.done || 0}
            </span>
          </div>
          <div className="bg-base-100 p-2.5 sm:p-3 rounded-xl border border-base-300">
            <span className="text-[10px] sm:text-[11px] text-base-content/60 block mb-0.5">Volunteers</span>
            <span className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400">
              {volunteerStats.totalVolunteers || 0}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-base-300 flex items-center justify-between text-xs text-base-content/70">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            Verified Volunteer
          </span>
          <span className="badge badge-sm bg-red-600 text-white font-bold">
            {userData?.bloodGroup ? `${userData.bloodGroup} Donor` : 'Hemovia Volunteer'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAnalytics;
