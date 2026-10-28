import { Link } from 'react-router';
import { Building, Star, CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
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
      {displayedCenters.map((center, index) => {
        const centerId = center.id || center._id || index;
        const is24_7 = center.emergency && center.emergency.includes('24/7');

        return (
          <div
            key={centerId}
            className="bg-base-100 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 md:p-5 shadow-sm hover:shadow-xl hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-300 group flex flex-col justify-between h-full"
          >
            {/* Top Media / Center Visual Banner */}
            <div className="w-full h-32 sm:h-36 bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-xl mb-3 sm:mb-4 p-3 flex flex-col justify-between overflow-hidden relative shadow-md shrink-0 group-hover:shadow-lg transition-all duration-300">
              {/* Ambient Glowing Spheres */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -left-6 -top-6 w-24 h-24 bg-rose-400/20 rounded-full blur-lg pointer-events-none" />

              {/* Heartbeat Pulse Line */}
              <svg
                className="absolute inset-0 w-full h-full text-white/10 pointer-events-none"
                viewBox="0 0 300 120"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 60 H90 L102 38 L114 82 L126 22 L138 98 L150 50 L160 68 L170 60 H300"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Top Badges Row */}
              <div className="flex items-center justify-between w-full z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-sm">
                  <CheckCircle size={11} className="text-white" />
                  Verified
                </span>

                {center.featured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-400 text-amber-950 shadow-sm">
                    <Star size={11} className="fill-amber-950 text-amber-950" />
                    Featured
                  </span>
                ) : is24_7 ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-sm">
                    <Clock size={11} />
                    24/7 Available
                  </span>
                ) : null}
              </div>

              {/* Center Emblem */}
              <div className="flex items-center justify-center my-auto z-10">
                <div className="w-12 h-12 sm:w-13 sm:h-13 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                  <Building className="text-white drop-shadow-sm" size={24} />
                </div>
              </div>

              {/* Bottom Division Tag */}
              <div className="flex items-center justify-center z-10">
                <span className="text-[10px] tracking-wider uppercase font-bold text-white/90 bg-black/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                  {center.division ? `${center.division} Center` : 'Donation Center'}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Title */}
                <div className="min-h-11 sm:min-h-12 flex items-center mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-base-content leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                    {center.name}
                  </h3>
                </div>

                {/* Location & Hours */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <div className="flex items-center gap-1.5 text-base-content/70 font-medium truncate">
                    <MapPin size={13} className="text-red-600 dark:text-red-400 shrink-0" />
                    <span className="truncate">{center.district || center.division}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                    <Clock size={13} className="shrink-0" />
                    <span>{is24_7 ? '24/7 Open' : (center.openHours || 'Regular Hours')}</span>
                  </div>
                </div>
              </div>

              {/* Rating & Action Button */}
              <div className="pt-2.5 border-t border-base-300/70 mt-auto">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="relative inline-flex items-center">
                      <div className="flex items-center gap-0.5 text-base-300">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-base-300 text-base-300" />
                        ))}
                      </div>
                      <div
                        className="absolute top-0 left-0 flex items-center gap-0.5 overflow-hidden"
                        style={{ width: `${Math.min(100, Math.max(0, ((center.rating || 4.5) / 5) * 100))}%` }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400 shrink-0" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-base-content">{center.rating || '4.5'}</span>
                  </div>
                  {center.reviews && (
                    <span className="text-[11px] text-base-content/60 font-medium">({center.reviews} reviews)</span>
                  )}
                </div>

                {/* View Details Button */}
                <Link
                  to={`/center/${centerId}`}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DonationCentersGrid;
