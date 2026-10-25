import { MapPin } from 'lucide-react';

const AboutNetwork = ({ stats, divisions, getCentersByDivision }) => {
  return (
    <div className="py-20 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <MapPin className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">OUR NETWORK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4">
            Blood Centers Across Bangladesh
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            {stats.totalCenters} verified blood centers across {stats.totalDivisions} divisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((division, index) => {
            const divisionCenters = getCentersByDivision(division);
            const colorClasses = [
              { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' },
              { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/30' },
              { bg: 'bg-gradient-to-br from-green-500 to-green-600', shadow: 'shadow-green-200 dark:shadow-green-900/30' }
            ];
            const colorIndex = index % colorClasses.length;
            return (
              <div key={division} className="bg-base-200 border-2 border-base-300 rounded-2xl p-6 text-center hover:border-red-200 dark:hover:border-red-900/50 transition-all shadow-sm hover:shadow-lg">
                <div className={`w-16 h-16 ${colorClasses[colorIndex].bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${colorClasses[colorIndex].shadow}`}>
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">{division}</h3>
                <p className="text-3xl font-black text-red-600 dark:text-red-400 mb-2">{divisionCenters.length}</p>
                <p className="text-base-content/70 font-semibold">Blood Centers</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutNetwork;
