import { Droplet } from 'lucide-react';
import { Card } from '../UI';
import LiveImpactCards from './LiveImpactCards';

const DROPLETS = [
  { left: '8%', delay: '0.4s', duration: '2.8s', size: 28 },
  { left: '16%', delay: '1.2s', duration: '3.5s', size: 22 },
  { left: '25%', delay: '2.1s', duration: '2.4s', size: 34 },
  { left: '33%', delay: '0.8s', duration: '3.1s', size: 20 },
  { left: '42%', delay: '1.9s', duration: '2.9s', size: 30 },
  { left: '50%', delay: '0.2s', duration: '3.8s', size: 24 },
  { left: '59%', delay: '2.5s', duration: '2.6s', size: 36 },
  { left: '68%', delay: '1.5s', duration: '3.3s', size: 22 },
  { left: '76%', delay: '0.6s', duration: '2.7s', size: 32 },
  { left: '84%', delay: '2.2s', duration: '3.6s', size: 26 },
  { left: '91%', delay: '1.0s', duration: '2.5s', size: 20 },
  { left: '97%', delay: '1.7s', duration: '3.0s', size: 28 },
];

const LiveImpact = ({ livesSaved, apiStats, formatCount }) => {
  return (
    <div className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200 relative overflow-hidden">
      {/* Animated Background Drops */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
        {DROPLETS.map((drop, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration
            }}
          >
            <Droplet
              className="text-red-200 fill-red-200 opacity-30"
              size={drop.size}
            />
          </div>
        ))}
      </div>

      <div className="px-4 lg:px-30 mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4 shadow-lg">
            <Droplet className="text-red-600 dark:text-red-400 fill-red-600" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">LIVE IMPACT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Every Drop <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Counts</span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Watch the real-time impact of our blood donation community
          </p>
        </div>

        {/* Main Counter Display */}
        <Card className="p-8 md:p-12 shadow-2xl hover:border-red-200 dark:hover:border-red-900/50 mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Animated Blood Drop */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Droplet className="text-white fill-white" size={60} />
                </div>
                {/* Ripple Effect */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-red-400 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 bg-red-300 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Live Counter */}
            <div className="text-center md:col-span-2">
              <div className="mb-6">
                <p className="text-6xl md:text-8xl font-black text-base-content mb-2">
                  {livesSaved}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-500">Lives Saved Today</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="p-4 text-center hover:border-red-200 dark:hover:border-red-900/50 transition-all">
                  <p className="text-3xl md:text-4xl font-black text-red-600 dark:text-red-500">{formatCount(apiStats.totalDonors)}</p>
                  <p className="text-sm font-bold text-base-content/70">Active Heroes</p>
                </Card>
                <Card className="p-4 text-center hover:border-blue-200 dark:hover:border-blue-900/50 transition-all">
                  <p className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-500">{formatCount(apiStats.pendingRequests)}</p>
                  <p className="text-sm font-bold text-base-content/70">Pending Requests</p>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        {/* Impact Cards & CTA */}
        <LiveImpactCards livesSaved={livesSaved} apiStats={apiStats} />
      </div>
    </div>
  );
};

export default LiveImpact;
