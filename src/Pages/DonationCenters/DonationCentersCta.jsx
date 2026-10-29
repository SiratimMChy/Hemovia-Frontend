import { Link } from 'react-router';
import { Droplet, Search, Utensils, Droplets, Moon, IdCard, CheckCircle2 } from 'lucide-react';

const DonationCentersCta = () => {
  const preDonationTips = [
    {
      step: 'Step 01',
      badge: 'Diet Prep',
      icon: Utensils,
      title: 'Eat a Healthy Meal',
      desc: 'Eat a light, nutritious meal 2-3 hours prior; avoid donating on an empty stomach.',
      highlight: '2-3 hours prior to visit',
      gradient: 'from-red-500 to-red-600',
      shadow: 'shadow-red-200 dark:shadow-red-900/30',
      hoverBorder: 'hover:border-red-300 dark:hover:border-red-800',
      hoverShadow: 'hover:shadow-red-500/10 dark:hover:shadow-red-950/30',
      hoverTitle: 'group-hover:text-red-600 dark:group-hover:text-red-400',
      badgeClass: 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40',
      accentText: 'text-red-600 dark:text-red-400'
    },
    {
      step: 'Step 02',
      badge: 'Hydration',
      icon: Droplets,
      title: 'Stay Well Hydrated',
      desc: 'Drink plenty of water or natural fruit juice (at least 500ml) for smooth donation.',
      highlight: 'At least 500ml fluids',
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-200 dark:shadow-blue-900/30',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-800',
      hoverShadow: 'hover:shadow-blue-500/10 dark:hover:shadow-blue-950/30',
      hoverTitle: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      badgeClass: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40',
      accentText: 'text-blue-600 dark:text-blue-400'
    },
    {
      step: 'Step 03',
      badge: 'Rest & Sleep',
      icon: Moon,
      title: 'Get Adequate Rest',
      desc: 'Ensure 7-8 hours of sound sleep the night before and avoid extreme fatigue.',
      highlight: '7-8 hours sound sleep',
      gradient: 'from-rose-500 to-red-600',
      shadow: 'shadow-rose-200 dark:shadow-rose-900/30',
      hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-800',
      hoverShadow: 'hover:shadow-rose-500/10 dark:hover:shadow-rose-950/30',
      hoverTitle: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
      badgeClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40',
      accentText: 'text-rose-600 dark:text-rose-400'
    },
    {
      step: 'Step 04',
      badge: 'Identity',
      icon: IdCard,
      title: 'Carry Valid Photo ID',
      desc: 'Bring your National ID (NID), Passport, or Student ID for desk registration.',
      highlight: 'Valid NID or Student ID',
      gradient: 'from-emerald-500 to-green-600',
      shadow: 'shadow-emerald-200 dark:shadow-emerald-900/30',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800',
      hoverShadow: 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/30',
      hoverTitle: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40',
      accentText: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-br from-red-50 to-rose-50 dark:from-base-200 dark:to-base-200">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center space-y-5 sm:space-y-6">
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
          <p className="text-sm sm:text-base md:text-lg text-base-content/70 leading-relaxed max-w-2xl mx-auto font-medium px-4">
            Visit any of our verified donation centers and become a hero today. Every donation saves up to three lives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-1 sm:pt-2">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto"
            >
              <Droplet size={18} className="group-hover:scale-110 transition-transform fill-white" />
              <span>Register as Donor</span>
            </Link>
            <Link
              to="/search"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-base-100 text-red-600 dark:text-red-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 border-red-600/70 dark:border-red-500/80 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-sm hover:shadow-md hover:scale-[1.02] w-full sm:w-auto"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform" />
              <span>Find Donors</span>
            </Link>
          </div>

          {/* Pre-Donation Quick Checklist */}
          <div className="pt-6 sm:pt-8">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-base-content/60 mb-3 sm:mb-4">
              Quick Checklist Before Visiting a Center
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full items-stretch">
              {preDonationTips.map((tip, index) => (
                <div
                  key={index}
                  className={`group bg-base-100 border border-base-300/80 dark:border-base-700/60 rounded-2xl p-3.5 sm:p-4 ${tip.hoverBorder} transition-all duration-300 ease-out shadow-sm hover:shadow-xl ${tip.hoverShadow} hover:-translate-y-1 flex flex-col justify-between h-full text-left`}
                >
                  <div>
                    {/* Top Row: Icon & Step Badge */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-9.5 h-9.5 sm:w-10 sm:h-10 bg-gradient-to-br ${tip.gradient} rounded-xl flex items-center justify-center shadow-sm ${tip.shadow} group-hover:scale-105 transition-transform duration-300`}>
                        <tip.icon className="text-white drop-shadow-sm" size={18} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tip.badgeClass} transition-colors`}>
                        {tip.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className={`text-sm sm:text-base font-bold text-base-content mb-1 ${tip.hoverTitle} transition-colors duration-200`}>
                      {tip.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-base-content/70 leading-relaxed font-normal">
                      {tip.desc}
                    </p>
                  </div>

                  {/* Bottom Highlight with Verified Check */}
                  <div className="pt-2 mt-2.5 border-t border-base-200 dark:border-base-800/80 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className={`${tip.accentText} shrink-0`} />
                    <span className="text-[11px] sm:text-xs font-semibold text-base-content/80 whitespace-nowrap truncate">
                      {tip.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCentersCta;
