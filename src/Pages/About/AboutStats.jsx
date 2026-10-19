const AboutStats = ({ displayStats }) => {
  const colorClasses = [
    { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/30' },
    { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' },
    { bg: 'bg-gradient-to-br from-green-500 to-green-600', shadow: 'shadow-green-200 dark:shadow-green-900/30' },
    { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' }
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <div key={index} className="bg-base-200 border-2 border-base-300 rounded-2xl p-6 text-center hover:border-red-200 dark:hover:border-red-900/50 transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 ${colorClasses[index].bg} rounded-2xl flex items-center justify-center shadow-lg ${colorClasses[index].shadow}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-black text-base-content mb-2">
                {stat.value}
              </p>
              <p className="text-base-content/70 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStats;
