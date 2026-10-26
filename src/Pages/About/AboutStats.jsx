const AboutStats = ({ displayStats }) => {
  const colorClasses = [
    { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/30' },
    { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' },
    { bg: 'bg-gradient-to-br from-emerald-500 to-green-600', shadow: 'shadow-emerald-200 dark:shadow-emerald-900/30' },
    { bg: 'bg-gradient-to-br from-rose-500 to-red-600', shadow: 'shadow-rose-200 dark:shadow-rose-900/30' }
  ];

  return (
    <div className="py-6 sm:py-8 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {displayStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-base-200/90 border border-base-300 rounded-2xl p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4 hover:border-red-300 dark:hover:border-red-900/50 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-xl ${colorClasses[index].bg} flex items-center justify-center shrink-0 shadow-sm ${colorClasses[index].shadow}`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-base-content leading-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-base-content/70 font-semibold truncate mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStats;
