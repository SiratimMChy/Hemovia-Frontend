import { HeartPulse, Clock, Stethoscope, ShieldCheck, Droplets, Timer, CheckCheck } from 'lucide-react';
import { TYPOGRAPHY } from '../../styles/designSystem';

const whyDonateStats = [
  {
    icon: HeartPulse,
    highlightIcon: Droplets,
    title: 'Save 3 Lives',
    badge: 'Triple Impact',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-200 dark:shadow-red-900/30',
    accentColor: 'text-red-600 dark:text-red-400',
    desc: 'Each donation separates into red cells, platelets, and plasma, allowing one single donor to help three hospital patients.',
    highlight: 'Provides red cells, platelets & plasma'
  },
  {
    icon: Clock,
    highlightIcon: Timer,
    title: '15-30 Minutes',
    badge: 'Quick Process',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-200 dark:shadow-blue-900/30',
    accentColor: 'text-blue-600 dark:text-blue-400',
    desc: 'The entire visit takes under thirty minutes, while blood draw takes just ten minutes before resting with refreshments.',
    highlight: 'Takes 8–10 minutes for active donation'
  },
  {
    icon: Stethoscope,
    highlightIcon: HeartPulse,
    title: 'Free Health Check',
    badge: 'Health Screening',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-200 dark:shadow-green-900/30',
    accentColor: 'text-green-600 dark:text-green-400',
    desc: 'Every donor receives a complimentary health check testing blood pressure, pulse rate, body temperature, and vital hemoglobin levels.',
    highlight: 'Free vital signs and hemoglobin checks'
  },
  {
    icon: ShieldCheck,
    highlightIcon: CheckCheck,
    title: '100% Safe & Sterile',
    badge: 'Hospital Grade',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-200 dark:shadow-purple-900/30',
    accentColor: 'text-purple-600 dark:text-purple-400',
    desc: 'All collection equipment is strictly sterile and single-use, safely disposed immediately after every donation by certified medical staff.',
    highlight: 'Hospital grade sterile single use kits'
  }
];

const WhyDonateBlood = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
            <HeartPulse className="text-red-600 dark:text-red-500" size={16} />
            <span className="text-red-600 dark:text-red-500 font-bold text-sm">LIFE-SAVING IMPACT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Why Donate Blood?
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            A single act of kindness creates an irreplaceable lifeline for patients in emergency trauma, surgery, and chronic care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyDonateStats.map((item, idx) => {
            const Icon = item.icon;
            const HighlightIcon = item.highlightIcon;
            return (
              <div
                key={idx}
                className="group bg-base-100 hover:bg-base-200/40 border-2 border-base-200 dark:border-base-800 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between h-full min-h-[318px]"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md ${item.shadow}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-base-200 dark:bg-base-800 text-base-content/70 border border-base-300 dark:border-base-700">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title Container - Fixed height for equal alignment */}
                  <div className="min-h-7 flex items-center mb-2">
                    <h3 className={`${TYPOGRAPHY.heading.h4} group-hover:text-red-600 transition-colors`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Description Container - Fixed height for equal multi-line alignment */}
                  <div className="min-h-[4.75rem] flex items-start">
                    <p className="text-xs text-base-content/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight - Exactly 1 line, strictly aligned, no truncation */}
                <div className="pt-3.5 border-t border-base-200 dark:border-base-800 flex items-center gap-2 mt-auto min-h-10">
                  <HighlightIcon size={14} className={`${item.accentColor} shrink-0`} />
                  <span className="text-xs font-semibold text-base-content/80 whitespace-nowrap">
                    {item.highlight}
                  </span>
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
