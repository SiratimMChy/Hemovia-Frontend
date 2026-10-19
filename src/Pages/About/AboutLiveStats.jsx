import { Activity, Heart, CheckCircle, Users, Clock } from 'lucide-react';

const AboutLiveStats = ({ stats }) => {
  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <Activity className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">PLATFORM ACTIVITY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4">
            Live Platform Statistics
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Real-time insights into our blood donation network
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
              <Heart className="text-white" size={24} />
            </div>
            <p className="text-2xl font-black text-base-content mb-2">{stats.totalRequests}</p>
            <p className="text-base-content/70 font-semibold">Total Requests</p>
          </div>
          <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200 dark:shadow-green-900/30">
              <CheckCircle className="text-white" size={24} />
            </div>
            <p className="text-2xl font-black text-base-content mb-2">{stats.successRate}%</p>
            <p className="text-base-content/70 font-semibold">Success Rate</p>
          </div>
          <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200 dark:shadow-red-900/30">
              <Users className="text-white" size={24} />
            </div>
            <p className="text-2xl font-black text-base-content mb-2">{stats.totalDonors}</p>
            <p className="text-base-content/70 font-semibold">Active Donors</p>
          </div>
          <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200 dark:shadow-red-900/30">
              <Clock className="text-white" size={24} />
            </div>
            <p className="text-2xl font-black text-base-content mb-2">{stats.pendingRequests}</p>
            <p className="text-base-content/70 font-semibold">Need Help Now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutLiveStats;
