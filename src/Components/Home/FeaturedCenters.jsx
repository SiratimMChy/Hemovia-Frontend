import { MapPin, Building, Phone, Clock } from 'lucide-react';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const FeaturedCenters = ({ centersData }) => {
  return (
    <div className="py-24 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
            <MapPin className="text-red-700 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-500 font-bold text-sm">DONATION CENTERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Featured Blood Centers
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Locate blood donation centers near you for safe and convenient donation
          </p>
        </div>

        {/* Cards Grid */}
        {centersData.length === 0 ? (
          <SkeletonLoader type="card" count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {centersData.filter(center => center.featured).slice(0, 4).map((center) => (
              <div key={center.id} className="bg-base-200 border-2 border-base-300 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300 group">
                {/* Center Image */}
                <div className="w-full h-48 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building className="text-white" size={32} />
                  </div>
                  {/* Featured Badge */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    ⭐ Featured
                  </div>
                </div>

                {/* Center Name */}
                <h3 className="text-lg md:text-xl font-bold text-base-content mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                  {center.name}
                </h3>

                {/* Center Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <MapPin size={14} className="text-red-600 shrink-0" />
                    <span className="truncate">{center.district}, {center.division}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Phone size={14} className="text-red-600 shrink-0" />
                    <span className="truncate">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Clock size={14} className="text-green-600 shrink-0" />
                    <span className="truncate">{center.openHours}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(center.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-base-content">{center.rating}</span>
                  <span className="text-xs text-base-content/60">({center.reviews} reviews)</span>
                </div>

                {/* View Details Button */}
                <a
                  href={`/center/${center.id}`}
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-center"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}

        {/* View All Centers Button */}
        <div className="text-center mt-12">
          <a
            href="/center"
            className="inline-flex items-center justify-center gap-3 bg-base-200 border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <MapPin size={20} />
            <span>View All Centers</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCenters;
