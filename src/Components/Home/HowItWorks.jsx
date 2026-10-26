import { UserCheck, Search, PhoneCall, HeartPulse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const steps = [
  {
    step: '01',
    phase: 'REGISTRATION',
    title: 'Register & Verify',
    icon: UserCheck,
    action: 'Join as Donor',
    link: '/Signup',
    desc: 'Sign up with your verified blood group, division, and emergency availability to join the ready donor network.'
  },
  {
    step: '02',
    phase: 'DISPATCH',
    title: 'Search & Match',
    icon: Search,
    action: 'Search Donors',
    link: '/search',
    desc: 'Filter verified donors by specific blood group, hospital district, and upazila during critical requirements.'
  },
  {
    step: '03',
    phase: 'CONNECT',
    title: 'Direct Contact',
    icon: PhoneCall,
    action: 'View Requests',
    link: '/donation-requests',
    desc: 'Reach donors directly via call or WhatsApp. Fast hospital coordination with zero intermediaries.'
  },
  {
    step: '04',
    phase: 'IMPACT',
    title: 'Donate & Save',
    icon: HeartPulse,
    action: 'Find Centers',
    link: '/center',
    desc: 'Meet at the hospital or certified blood bank. Every donation helps a trauma patient or child in surgery.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-600 dark:text-red-500 font-bold text-sm tracking-wide">THE LIFELINE PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight">
            How Hemovia Works
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
            A transparent four-stage pathway connecting volunteer blood donors with families in urgent medical need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-base-100 hover:bg-base-200/40 border-2 border-base-200 dark:border-base-800 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-black text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md tracking-wider">
                      STEP {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-base-content/50 uppercase tracking-widest">
                      {item.phase}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-red-500/20">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-base-content/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-base-200 dark:border-base-800">
                  <Link
                    to={item.link}
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-base-200/70 hover:bg-red-600 dark:bg-base-800/60 dark:hover:bg-red-600 text-base-content hover:text-white transition-all duration-200 text-xs font-semibold group/btn"
                  >
                    <span>{item.action}</span>
                    <ArrowRight size={13} className="text-red-600 dark:text-red-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
