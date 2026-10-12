import { Heart, Clock, Shield, Award } from 'lucide-react';
import { TYPOGRAPHY } from '../../styles/designSystem';

const whyDonateStats = [
  {
    icon: Heart,
    title: 'Save 3 Lives',
    badge: 'Triple Impact',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-200 dark:shadow-red-900/30',
    desc: 'One donation separates into red cells, plasma, and platelets to treat up to 3 patients in emergency care.'
  },
  {
    icon: Clock,
    title: '15-30 Minutes',
    badge: 'Quick Process',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-200 dark:shadow-blue-900/30',
    desc: 'The actual donation takes under 15 minutes of your day, leaving a lifetime of difference for patients in need.'
  },
  {
    icon: Shield,
    title: 'Mini Health Check',
    badge: 'Free Screening',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-200 dark:shadow-green-900/30',
    desc: 'Complimentary pre-donation screening of your pulse, blood pressure, hemoglobin, and vital markers.'
  },
  {
    icon: Award,
    title: '100% Safe & Clean',
    badge: 'Zero Risk',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-200 dark:shadow-purple-900/30',
    desc: 'Completely sterile, single-use equipment with zero transmission risk and healthy natural cell renewal.'
  }
];

const WhyDonateBlood = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
            <Heart className="text-red-600 fill-red-600" size={15} />
            <span className="text-red-600 dark:text-red-500 font-bold text-sm">LIFE-SAVING IMPACT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Why Donate Blood?
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            A single act of kindness creates an irreplaceable lifeline for patients in emergency trauma, surgery, and chronic care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyDonateStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-base-200/60 dark:bg-base-200 border-2 border-base-300/80 dark:border-base-700/80 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${item.shadow}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-base-100 dark:bg-base-300 text-base-content/70 border border-base-300 dark:border-base-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className={`${TYPOGRAPHY.heading.h4} mb-2`}>{item.title}</h3>
                  <p className={`${TYPOGRAPHY.body.small} leading-relaxed`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
