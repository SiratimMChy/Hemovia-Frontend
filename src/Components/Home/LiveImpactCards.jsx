import { Heart, Activity, Users, Award, Droplet, Search } from 'lucide-react';
import { Card } from '../UI';

const LiveImpactCards = ({ livesSaved, apiStats }) => {
  return (
    <>
      {/* Impact Visualization */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="group p-6 hover:border-red-200 dark:hover:border-red-900/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
              <Heart className="text-white fill-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 0.8)}</p>
              <p className="text-sm font-bold text-base-content/70">Emergency Cases</p>
            </div>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </Card>

        <Card className="group p-6 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 0.6)}</p>
              <p className="text-sm font-bold text-base-content/70">Surgeries Enabled</p>
            </div>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </Card>

        <Card className="group p-6 hover:border-green-200 dark:hover:border-green-900/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-green-900/30">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 1.2)}</p>
              <p className="text-sm font-bold text-base-content/70">Families Helped</p>
            </div>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </Card>

        <Card className="group p-6 hover:border-purple-200 dark:hover:border-purple-900/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-base-content">{apiStats.successRate}%</p>
              <p className="text-sm font-bold text-base-content/70">Success Rate</p>
            </div>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: `${apiStats.successRate}%` }}></div>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Card className="p-8 hover:border-red-200 dark:hover:border-red-900/70 transition-all">
          <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
            Be Part of This Impact
          </h3>
          <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
            Join thousands of heroes who are making a difference every day. Your single donation can save up to 3 lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Droplet className="fill-white" size={20} />
              Start Saving Lives
            </a>
            <a
              href="/search"
              className="inline-flex items-center justify-center gap-2 bg-base-200 border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-base-300 hover:border-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Search size={20} />
              Find Blood Now
            </a>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LiveImpactCards;
