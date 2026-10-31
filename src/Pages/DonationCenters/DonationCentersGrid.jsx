import { Building } from 'lucide-react';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import FeaturedCenterCard from '../../Components/Home/FeaturedCenterCard';

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
      <div className="text-center py-12 sm:py-16 bg-base-100 rounded-2xl border-2 border-base-300 p-6 sm:p-10 my-4 shadow-sm">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Building className="text-red-500" size={32} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">No Centers Found</h3>
        <p className="text-sm sm:text-base text-base-content/70 mb-5 sm:mb-6 max-w-md mx-auto">
          We couldn't find any donation centers matching your search criteria.
        </p>
        <button
          onClick={() => {
            setSelectedDivision('All');
            setSearchQuery('');
            setSelectedFilter('All');
          }}
          className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all text-sm sm:text-base shadow-md hover:shadow-lg"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch mt-4 mb-6 sm:mb-8">
      {displayedCenters.map((center, index) => (
        <FeaturedCenterCard
          key={center.id || center._id || index}
          center={center}
          index={index}
        />
      ))}
    </div>
  );
};

export default DonationCentersGrid;
