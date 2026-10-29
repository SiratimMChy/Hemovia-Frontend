import { Building, Search, Navigation, Shield, Clock, Award } from 'lucide-react';

const DonationCentersHero = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading
}) => {
  return (
    <div className={`relative ${searchQuery.trim() ? 'min-h-0' : 'min-h-[80vh] lg:min-h-screen'} bg-base-100 overflow-hidden transition-all duration-300`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200">
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className={`relative px-4 lg:px-30 mx-auto w-full ${searchQuery.trim() ? 'pt-6 sm:pt-8 pb-4 sm:pb-6' : 'pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12'} transition-all duration-300`}>
        <div className={`text-center ${searchQuery.trim() ? 'space-y-4 sm:space-y-6' : 'space-y-6 sm:space-y-8'} max-w-5xl mx-auto transition-all duration-300`}>
          {/* Badge matching Home theme */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:border-red-200 dark:hover:border-red-800 transition-colors">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Building className="text-white" size={12} />
            </div>
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">
              Donation Centers • Nationwide Network
            </span>
          </div>

          {/* Main Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-base-content leading-none mb-3 md:mb-5">
              Find<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Centers</span>
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="h-0.5 sm:h-1 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-base-content/80">Save Lives</p>
              <div className="h-0.5 sm:h-1 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-base xl:text-lg text-base-content/70 leading-relaxed max-w-2xl lg:max-w-none lg:whitespace-nowrap mx-auto font-medium px-4">
            Connect with verified donation centers across Bangladesh. Safe, reliable, and always ready to help save lives in your community.
          </p>

          {/* Search Interface */}
          <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg max-w-4xl mx-auto">
            {/* Main Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 group-focus-within:text-red-500 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Search by name, location, or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-base-300 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-base-content/30 text-sm sm:text-base bg-base-100 text-base-content"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={16} />
                    <span className="hidden sm:inline">Find Centers</span>
                    <span className="sm:hidden">Find</span>
                  </>
                )}
              </button>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-base-content/70">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="text-green-500" size={14} />
                <span className="font-medium">100% Verified Centers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="text-blue-500" size={14} />
                <span className="font-medium">24/7 Emergency Support</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="text-red-500" size={14} />
                <span className="font-medium">Professional Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      {!searchQuery.trim() && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 md:h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-base-100" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DonationCentersHero;
