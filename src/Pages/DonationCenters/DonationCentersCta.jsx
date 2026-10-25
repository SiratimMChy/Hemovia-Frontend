import { Link } from 'react-router';
import { Droplet, Search, Users, Shield, Clock } from 'lucide-react';
import { formatCount } from '../utils/centerHelpers';

const DonationCentersCta = ({ centers }) => {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-red-50 to-rose-50 dark:from-base-200 dark:to-base-200">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge matching Home theme */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:border-red-200 dark:hover:border-red-800 transition-colors">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Droplet className="text-white fill-white" size={12} />
            </div>
            <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">SAVE LIVES • MAKE IMPACT</span>
          </div>

          {/* Main Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-base-content leading-none mb-2 sm:mb-3">
              Ready to<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Save Lives?</span>
            </h2>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-base-content/80">Join Our Mission</p>
              <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </div>
          </div>
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-base-content/70 leading-relaxed max-w-2xl mx-auto font-medium px-4">
            Visit any of our verified donation centers and become a hero today. Every donation saves up to three lives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto"
            >
              <Droplet size={18} className="group-hover:scale-110 transition-transform fill-white" />
              <span>Register as Donor</span>
            </Link>
            <Link
              to="/search"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-base-100 text-red-600 dark:text-red-400 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg border-2 border-red-600/70 dark:border-red-500/80 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-sm hover:shadow-md hover:scale-[1.02] w-full sm:w-auto"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform" />
              <span>Find Donors</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-6 sm:pt-8 max-w-lg sm:max-w-2xl mx-auto">
            <div className="group bg-base-100 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 hover:border-red-200 dark:hover:border-red-900/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md shadow-red-200 dark:shadow-red-900/30 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={18} />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-base-content">{formatCount(centers.length > 0 ? centers.length : 120)}</p>
              <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Centers</p>
            </div>

            <div className="group bg-base-100 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 hover:border-green-200 dark:hover:border-green-900/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md shadow-green-200 dark:shadow-green-900/30 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={18} />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-base-content">100%</p>
              <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Verified</p>
            </div>

            <div className="group bg-base-100 border-2 border-base-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 hover:border-rose-200 dark:hover:border-rose-900/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md shadow-red-200 dark:shadow-red-900/30 group-hover:scale-110 transition-transform">
                <Clock className="text-white" size={18} />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-base-content">24/7</p>
              <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCentersCta;
