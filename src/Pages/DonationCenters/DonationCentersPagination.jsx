const DonationCentersPagination = ({
  filteredCenters,
  itemsPerPage,
  startIndex,
  endIndex,
  selectedFilter,
  currentPage,
  totalPages,
  goToPrevious,
  goToNext,
  goToPage
}) => {
  if (filteredCenters.length <= itemsPerPage) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
      <div className="text-center lg:text-left">
        <p className="text-sm sm:text-base md:text-lg text-base-content/70">
          Showing <span className="font-bold text-base-content">{startIndex + 1}</span> to{' '}
          <span className="font-bold text-base-content">{Math.min(endIndex, filteredCenters.length)}</span> of{' '}
          <span className="font-bold text-red-600 dark:text-red-400">{filteredCenters.length}</span> centers
          {selectedFilter !== 'All' && <span> ({selectedFilter.toLowerCase()})</span>}
        </p>
        <p className="text-xs sm:text-sm text-base-content/50 mt-1">
          Page <span className="font-bold text-base-content/70">{currentPage}</span> of{' '}
          <span className="font-bold text-base-content/70">{totalPages}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm md:text-base ${
            currentPage === 1
              ? 'bg-base-300 text-base-content/40 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const showPage = 
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1);
            
            if (!showPage) {
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 sm:px-3 py-2 sm:py-3 text-base-content/40 font-bold text-xs sm:text-sm">
                    ...
                  </span>
                );
              }
              return null;
            }
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 min-w-8 sm:min-w-10 md:min-w-12 text-xs sm:text-sm md:text-base ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg transform scale-105'
                    : 'bg-base-100 border-2 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 shadow-sm hover:shadow-md transform hover:scale-105'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm md:text-base ${
            currentPage === totalPages
              ? 'bg-base-300 text-base-content/40 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default DonationCentersPagination;
