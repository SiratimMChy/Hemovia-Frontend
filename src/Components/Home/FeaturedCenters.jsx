import { Link } from 'react-router';
import { MapPin, ArrowRight } from 'lucide-react';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import FeaturedCenterCard from './FeaturedCenterCard';

const FeaturedCenters = ({ centersData = [] }) => {
  const featuredList = (centersData.filter(c => c.featured).length > 0
    ? centersData.filter(c => c.featured)
    : centersData
  ).slice(0, 4);

  return (
    <div className="py-12 md:py-16 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 md:py-2 rounded-full mb-4 shadow-sm">
            <MapPin className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">DONATION CENTERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3 md:mb-4">
            Featured Blood <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Centers</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-medium">
            Locate blood donation centers near you for safe and convenient donation
          </p>
        </div>

        {/* Cards Grid */}
        {centersData.length === 0 ? (
          <SkeletonLoader type="card" count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {featuredList.map((center, index) => (
              <FeaturedCenterCard
                key={center.id || center._id || index}
                center={center}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Centers Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/center"
            className="inline-flex items-center justify-center gap-2.5 bg-base-200 border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-500 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
          >
            <MapPin size={18} />
            <span>View All Centers</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCenters;
