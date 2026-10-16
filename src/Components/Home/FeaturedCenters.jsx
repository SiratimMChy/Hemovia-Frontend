import { Link } from 'react-router';
import { MapPin, Building, Clock, Star, ArrowRight } from 'lucide-react';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const FeaturedCenters = ({ centersData }) => {
  return (
    <div className="py-20 md:py-24 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 md:py-2 rounded-full mb-4 shadow-sm">
            <MapPin className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">DONATION CENTERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3 md:mb-4">
            Featured Blood Centers
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-medium">
            Locate blood donation centers near you for safe and convenient donation
          </p>
        </div>

        {/* Cards Grid */}
        {centersData.length === 0 ? (
          <SkeletonLoader type="card" count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {centersData.filter(center => center.featured).slice(0, 4).map((center) => (
              <div
                key={center.id}
                className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-300 group flex flex-col justify-between h-full"
              >
                {/* Center Image / Icon Box */}
                <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-950/40 dark:to-rose-950/20 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative border border-red-200/40 dark:border-red-900/20 shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Building className="text-white" size={30} />
                  </div>
                  {/* Featured Badge */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-yellow-950 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1">
                    <Star size={10} className="fill-yellow-950" />
                    <span>Featured</span>
                  </div>
                </div>

                {/* Content Section - Flex Column with Space-Between */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Fixed Height Title Container for Equal Multi-Line Alignment */}
                    <div className="min-h-10 sm:min-h-12 flex items-center mb-2 sm:mb-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-base-content leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                        {center.name}
                      </h3>
                    </div>

                    {/* Center Details: Location on left, Open Hours on right */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-base-content/70 font-medium truncate">
                        <MapPin size={13} className="text-red-600 dark:text-red-400 shrink-0" />
                        <span className="truncate">{center.district || center.division}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                        <Clock size={13} className="shrink-0" />
                        <span>{center.openHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Bottom Action (Always Aligned) */}
                  <div className="pt-2.5 border-t border-base-300/70 mt-auto">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        {/* Fractional Star Rating */}
                        <div className="relative inline-flex items-center">
                          {/* Background: 5 gray stars */}
                          <div className="flex items-center gap-0.5 text-base-300">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="fill-base-300 text-base-300" />
                            ))}
                          </div>
                          {/* Foreground: 5 gold stars clipped by exact rating percentage */}
                          <div
                            className="absolute top-0 left-0 flex items-center gap-0.5 overflow-hidden"
                            style={{ width: `${Math.min(100, Math.max(0, (center.rating / 5) * 100))}%` }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-base-content">{center.rating}</span>
                      </div>
                      <span className="text-[11px] text-base-content/60 font-medium">({center.reviews} reviews)</span>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/center/${center.id}`}
                      className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Centers Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/center"
            className="inline-flex items-center justify-center gap-2.5 bg-base-200 border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-500 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
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
