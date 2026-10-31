import { Siren, Activity, Users, CheckCircle, Droplet, Search } from 'lucide-react';
import { Link } from 'react-router';

const LiveImpactCards = ({ livesSaved, apiStats }) => {
  const metricCards = [
    { label: 'Emergency Cases', value: Math.floor(livesSaved * 0.8), icon: Siren, gradient: 'from-red-500 to-red-600', shadow: 'shadow-red-500/20', progressWidth: '80%', hoverBorder: 'hover:border-red-300 dark:hover:border-red-900/50' },
    { label: 'Surgeries Enabled', value: Math.floor(livesSaved * 0.6), icon: Activity, gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20', progressWidth: '60%', hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-900/50' },
    { label: 'Families Helped', value: Math.floor(livesSaved * 1.2), icon: Users, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20', progressWidth: '90%', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-900/50' },
    { label: 'Success Rate', value: `${apiStats.successRate}%`, icon: CheckCircle, gradient: 'from-purple-500 to-indigo-600', shadow: 'shadow-purple-500/20', progressWidth: `${apiStats.successRate}%`, hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-900/50' }
  ];

  return (
    <>
      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metricCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md ${item.hoverBorder} transition-all duration-200 group flex flex-col justify-between`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md ${item.shadow} shrink-0`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-base-content leading-none mb-1">{item.value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-base-content/70">{item.label}</p>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-full h-1.5 overflow-hidden">
                <div className={`bg-gradient-to-r ${item.gradient} h-1.5 rounded-full`} style={{ width: item.progressWidth }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10 sm:mt-12">
        <div className="bg-base-100 border-2 border-base-300 rounded-3xl p-6 sm:p-8 hover:border-red-300/60 dark:hover:border-red-900/50 transition-all shadow-md">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content mb-3">
            Be Part of This Impact
          </h3>
          <p className="text-sm sm:text-base text-base-content/70 mb-6 max-w-xl mx-auto">
            Join thousands of heroes who are making a difference every day. Your single donation can save up to 3 lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-7 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              <Droplet className="fill-white" size={17} />
              <span>Start Saving Lives</span>
            </Link>
            <Link
              to="/search"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-base-200 border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-500 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white px-7 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              <Search size={17} />
              <span>Find Blood Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveImpactCards;
