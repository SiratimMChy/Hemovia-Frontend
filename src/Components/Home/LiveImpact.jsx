import { Droplet, Activity } from 'lucide-react';
import LiveImpactCards from './LiveImpactCards';

const LiveImpact = ({ livesSaved, apiStats, formatCount }) => {
  return (
    <div className="py-20 md:py-24 bg-gradient-to-br from-red-50/60 via-base-100 to-rose-50/60 dark:from-base-200 dark:via-base-100 dark:to-base-200 relative overflow-hidden">
      {/* Subtle Ambient Pulse Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-red-500/5 blur-3xl pointer-events-none rounded-full"
      ></div>

      <div className="px-4 lg:px-30 mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
              LIVE IMPACT TRACKER
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-base-content mb-3">
            Every Drop <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Counts</span>
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto">
            Watch the real-time impact of our blood donation community saving lives every single day
          </p>
        </div>

        {/* Main Counter Display */}
        <div className="bg-base-200/90 border-2 border-base-300 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl hover:border-red-300/60 dark:hover:border-red-900/50 transition-all duration-300 mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Animated Pulse Drop */}
            <div className="flex justify-center">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <Droplet 
                    className="text-white fill-white group-hover:scale-110 transition-transform duration-300" 
                    size={56} 
                  />
                </div>
                <div 
                  className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping pointer-events-none" 
                  style={{ animationDuration: '3s' }}
                ></div>
              </div>
            </div>

            {/* Live Counter */}
            <div className="text-center md:col-span-2">
              <div className="mb-6">
                <p className="text-5xl sm:text-6xl md:text-7xl font-black text-base-content mb-1 tracking-tight">
                  {livesSaved}
                </p>
                <div className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-xl sm:text-2xl">
                  <Activity size={20} className="animate-pulse" />
                  <span>Lives Saved Today</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="bg-base-100 border border-base-300 hover:border-red-300 dark:hover:border-red-900/50 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600 dark:text-red-400">
                    {formatCount(apiStats.totalDonors)}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-base-content/70 mt-1">
                    Active Heroes
                  </p>
                </div>

                <div className="bg-base-100 border border-base-300 hover:border-blue-300 dark:hover:border-blue-900/50 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">
                    {formatCount(apiStats.pendingRequests)}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-base-content/70 mt-1">
                    Pending Requests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Cards & CTA */}
        <LiveImpactCards livesSaved={livesSaved} apiStats={apiStats} />
      </div>
    </div>
  );
};

export default LiveImpact;
