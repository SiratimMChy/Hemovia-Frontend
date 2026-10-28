import { Building, Star, Clock, ChevronDown } from 'lucide-react';

const DonationCentersFilterBar = ({
  startIndex,
  endIndex,
  filteredCenters,
  selectedDivision,
  selectedFilter,
  totalPages,
  currentPage,
  setSelectedFilter,
  setSelectedDivision,
  centers,
  divisions
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
          <Building className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content">All Centers</h2>
          <p className="text-sm sm:text-base text-base-content/70">
            Showing <span className="font-bold text-base-content">{startIndex + 1}-{Math.min(endIndex, filteredCenters.length)}</span> of <span className="font-bold text-base-content">{filteredCenters.length}</span> donation centers
            {selectedDivision !== 'All' && <span> in <span className="font-bold text-red-600 dark:text-red-400">{selectedDivision}</span></span>}
            {selectedFilter !== 'All' && <span> • <span className="font-bold text-blue-600 dark:text-blue-400">{selectedFilter}</span></span>}
            {totalPages > 1 && <span> • Page <span className="font-bold text-base-content">{currentPage}</span> of <span className="font-bold text-base-content">{totalPages}</span></span>}
          </p>
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="w-full lg:w-auto">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-3">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`w-full sm:w-auto h-11 sm:h-12 px-3 sm:px-4 lg:px-5 rounded-lg sm:rounded-xl font-bold transition-colors duration-200 shadow-md text-xs sm:text-sm border-2 whitespace-nowrap inline-flex items-center justify-center gap-1.5 ${
              selectedFilter === 'All'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent'
                : 'bg-base-100 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            <span>All Centers</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${selectedFilter === 'All' ? 'bg-white/20 text-white' : 'bg-base-200 text-base-content/70'}`}>
              {centers.length}
            </span>
          </button>
          <button
            onClick={() => setSelectedFilter('Featured')}
            className={`w-full sm:w-auto h-11 sm:h-12 px-3 sm:px-4 lg:px-5 rounded-lg sm:rounded-xl font-bold transition-colors duration-200 shadow-md inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm border-2 whitespace-nowrap ${
              selectedFilter === 'Featured'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-transparent'
                : 'bg-base-100 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            <Star size={13} className={selectedFilter === 'Featured' ? 'fill-white text-white' : 'fill-amber-400 text-amber-500'} />
            <span>Featured</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${selectedFilter === 'Featured' ? 'bg-white/20 text-white' : 'bg-base-200 text-base-content/70'}`}>
              {centers.filter(c => c.featured).length}
            </span>
          </button>
          <button
            onClick={() => setSelectedFilter('24/7')}
            className={`w-full sm:w-auto h-11 sm:h-12 px-3 sm:px-4 lg:px-5 rounded-lg sm:rounded-xl font-bold transition-colors duration-200 shadow-md inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm border-2 whitespace-nowrap ${
              selectedFilter === '24/7'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-transparent'
                : 'bg-base-100 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            <Clock size={13} className={selectedFilter === '24/7' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} />
            <span>24/7 Available</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${selectedFilter === '24/7' ? 'bg-white/20 text-white' : 'bg-base-200 text-base-content/70'}`}>
              {centers.filter(c => c.emergency && c.emergency.includes('24/7')).length}
            </span>
          </button>

          {/* Division Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className={`w-full h-11 sm:h-12 pl-3 sm:pl-4 pr-8 sm:pr-9 border-2 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none appearance-none font-bold shadow-md cursor-pointer text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                selectedDivision !== 'All'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600 dark:text-red-400'
                  : 'bg-base-100 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              {divisions.map(division => (
                <option key={division} value={division} className="bg-base-100 text-base-content font-medium">
                  {division === 'All' ? 'All Divisions' : division}
                  {division !== 'All' && ` (${centers.filter(c => c.division === division).length})`}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors ${
              selectedDivision !== 'All' ? 'text-red-500' : 'text-base-content/40'
            }`} size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCentersFilterBar;
