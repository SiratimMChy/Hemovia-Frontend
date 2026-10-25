import { Award } from 'lucide-react';

const AboutValues = ({ values }) => {
  const colorClasses = [
    { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' },
    { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/30' },
    { bg: 'bg-gradient-to-br from-green-500 to-green-600', shadow: 'shadow-green-200 dark:shadow-green-900/30' },
    { bg: 'bg-gradient-to-br from-red-500 to-red-600', shadow: 'shadow-red-200 dark:shadow-red-900/30' }
  ];

  return (
    <div className="py-20 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <Award className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">OUR VALUES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4">
            What Drives Us Forward
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Our core values guide every decision we make and every feature we build
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 ${colorClasses[index].bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all shadow-lg ${colorClasses[index].shadow}`}>
                <value.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">{value.title}</h3>
              <p className="text-base-content/70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutValues;
