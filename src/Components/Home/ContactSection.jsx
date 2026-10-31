import React from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactEmergencyCard from './ContactEmergencyCard';

const hours = [
    { day: 'Mon - Fri', time: '8AM - 8PM' },
    { day: 'Saturday', time: '9AM - 6PM' },
    { day: 'Sunday', time: '10AM - 4PM' }
];

const ContactSection = () => {
    return (
        <section className="py-12 md:py-16 bg-base-100">
            <div className="px-4 lg:px-30 mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                        <MessageSquare className="text-red-600 dark:text-red-400" size={15} />
                        <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">Get in Touch</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3">
                        Contact <span className="text-red-600 dark:text-red-400">Hemovia</span>
                    </h2>
                    <p className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto">
                        Need urgent blood support or have questions? Our volunteer coordination team is here 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* Left: Contact Form */}
                    <ContactForm />

                    {/* Right: Unified Red Emergency Card & Operating Schedule */}
                    <div className="flex flex-col justify-between gap-4 h-full">
                        <ContactEmergencyCard />

                        {/* Operating Schedule Card */}
                        <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-base-300">
                                <div className="flex items-center gap-2 text-base-content font-bold text-sm sm:text-base">
                                    <Clock size={16} className="text-red-600 dark:text-red-400" />
                                    <span>Operating Schedule</span>
                                </div>
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-base-300 px-2.5 py-0.5 rounded-full">
                                    24/7 Online
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                {hours.map(h => (
                                    <div key={h.day} className="bg-base-100 p-2.5 rounded-xl border border-base-300 text-center">
                                        <p className="font-semibold text-base-content/60 text-[11px]">{h.day}</p>
                                        <p className="font-bold text-base-content mt-0.5">{h.time}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-base-content/60 text-center mt-3 pt-2.5 border-t border-base-300">
                                Emergency blood donor response is active 24 hours every day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
