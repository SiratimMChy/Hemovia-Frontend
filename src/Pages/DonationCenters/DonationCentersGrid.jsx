import { Link } from 'react-router';
import { Building, Star, CheckCircle, MapPin, Clock } from 'lucide-react';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';

const DonationCentersGrid = ({
  isInitialLoading,
  displayedCenters,
  filteredCenters,
  setSelectedDivision,
  setSearchQuery,
  setSelectedFilter
}) => {
  if (isInitialLoading) {
    return <SkeletonLoader type="card" count={8} />;
  }

  if (filteredCenters.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Building className="text-base-content/40" size={32} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">No Centers Found</h3>
        <p className="text-sm sm:text-base text-base-content/70 mb-4 sm:mb-6 px-4">
          We couldn't find any donation centers matching your search criteria.
        </p>
        <button
          onClick={() => {
            setSelectedDivision('All');
            setSearchQuery('');
            setSelectedFilter('All');
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all text-sm sm:text-base"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center mt-4 mb-6 sm:mb-8">
      {displayedCenters.map((center) => (
        <div
          key={center.id}
          className="card bg-base-100 w-full max-w-sm shadow-sm border border-base-300 flex flex-col h-full relative rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Featured Badge */}
          {center.featured && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-red-400 to-red-500 text-white px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm">
              <Star size={8} className="fill-white" />
              <span className="hidden sm:inline">Featured</span>
            </div>
          )}

          {/* Verified Badge */}
          <div className={`absolute top-2 sm:top-3 ${center.featured ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm`}>
            <CheckCircle size={8} className="fill-white" />
            <span className="hidden sm:inline">Verified</span>
          </div>

          {/* Figure Section */}
          <figure>
            <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center">
              <Building className="text-red-600 dark:text-red-400" size={32} />
            </div>
          </figure>

          {/* Card Body */}
          <div className="card-body p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h2 className="card-title mb-2 font-bold line-clamp-2 min-h-10 sm:min-h-12 text-sm sm:text-base text-base-content">{center.name}</h2>
              
              {/* Meta Information */}
              <div className="flex justify-between items-center">
                <h5 className="flex items-center gap-1 text-xs sm:text-sm font-medium text-base-content">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" /> 
                  {center.district}
                </h5>
                <h5 className="flex items-center gap-1 text-xs sm:text-sm font-medium text-base-content">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" /> 
                  {center.rating}
                </h5>
              </div>
            </div>

            <div className="flex justify-between mt-3 sm:mt-4 items-center">
              <div className="flex items-center font-bold text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-base-content/50 mr-1 sm:mr-2" />
                <span className="text-base-content/70">
                  {center.emergency && center.emergency.includes('24/7') ? '24/7 Available' : 'Regular Hours'}
                </span>
              </div>
              <Link
                to={`/center/${center.id}`}
                className="btn btn-sm bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">View</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationCentersGrid;
