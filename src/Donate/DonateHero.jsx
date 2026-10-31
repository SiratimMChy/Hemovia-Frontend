import React from 'react';
import { Droplet, HandHeart } from 'lucide-react';

const DonateHero = ({ showForm, setShowForm }) => {
    return (
        <div className={`text-center ${showForm ? 'space-y-2.5 mb-3 sm:mb-4' : 'space-y-4 mb-8'} max-w-4xl mx-auto transition-all duration-300`}>
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0">
                    <Droplet className="text-white fill-white" size={10} />
                </div>
                <span className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm tracking-wide">
                    Support Our Mission • Give Fund
                </span>
            </div>

            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-base-content leading-none mb-1.5 sm:mb-2">
                    Fund Our<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Lifeline</span>
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-0.5 sm:h-1 w-8 sm:w-14 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-base-content/80">Every Contribution Counts</p>
                    <div className="h-0.5 sm:h-1 w-8 sm:w-14 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                </div>
            </div>

            <p className={`text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed max-w-2xl mx-auto px-4 ${showForm ? 'hidden sm:block line-clamp-1' : ''}`}>
                Your generous financial support helps us maintain 24/7 emergency response, verify blood donation centers nationwide, and ensure free lifesaving connectivity for everyone in need.
            </p>

            <div className="pt-1">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                    <HandHeart size={16} className="fill-white" />
                    <span>{showForm ? 'Close Form' : 'Give Fund'}</span>
                </button>
            </div>
        </div>
    );
};

export default DonateHero;

