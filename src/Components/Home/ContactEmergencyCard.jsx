import React from 'react';
import { Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';

const ContactEmergencyCard = () => {
    return (
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-5 sm:p-6 text-white shadow-md flex flex-col justify-between flex-1">
            {/* Emergency Hotline Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <ShieldAlert size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-base sm:text-lg leading-tight">24/7 Emergency Blood Hotline</p>
                        <p className="text-xs text-white/80 mt-0.5">Instant hospital and donor response</p>
                    </div>
                </div>
                <a
                    href="tel:+8801234567890"
                    className="hidden sm:inline-flex items-center gap-1.5 font-bold text-xs bg-white text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0 shadow-sm"
                >
                    <Phone size={12} />
                    <span>Call Now</span>
                </a>
            </div>

            {/* Direct Contact Channels */}
            <div className="grid sm:grid-cols-2 gap-3 py-3">
                <a
                    href="tel:+8801234567890"
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Phone size={15} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wide">Hotline</p>
                        <p className="font-bold text-xs sm:text-sm truncate text-white">+880-1234-567890</p>
                    </div>
                </a>

                <a
                    href="mailto:support@Hemovia.org"
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Mail size={15} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wide">Email</p>
                        <p className="font-bold text-xs sm:text-sm truncate text-white">support@Hemovia.org</p>
                    </div>
                </a>
            </div>

            {/* Coverage Tag */}
            <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-white shrink-0" />
                    <span>Sylhet & Nationwide, Bangladesh</span>
                </div>
                <span className="font-bold text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full text-white">
                    Available 24/7
                </span>
            </div>
        </div>
    );
};

export default ContactEmergencyCard;
