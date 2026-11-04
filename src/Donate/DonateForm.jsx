import React from 'react';
import { HandHeart, ArrowRight, Lock, ShieldCheck, HeartPulse } from 'lucide-react';

const DonateForm = ({
    showForm,
    handleSubmit,
    isSubmitting,
    donateAmount,
    setDonateAmount
}) => {
    if (!showForm) return null;

    const presetAmounts = [10, 25, 50, 100];

    return (
        <div id="donate-form-section" className="flex justify-center mb-6 animate-fade-in">
            <div className="w-full max-w-xl bg-base-200 border-2 border-base-300 rounded-xl p-4 sm:p-5 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="text-center">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-base-content/60">
                            Select or Enter Contribution Amount (USD)
                        </span>
                    </div>

                    {/* Preset Amount Pills */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                        {presetAmounts.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setDonateAmount(preset.toString())}
                                className={`py-2 sm:py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 border-2 cursor-pointer ${
                                    donateAmount === preset.toString()
                                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent shadow-md'
                                        : 'bg-base-100 border-base-300 text-base-content hover:border-red-300 dark:hover:border-red-900/50 hover:text-red-600'
                                }`}
                            >
                                ${preset}
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/60 font-bold text-base">
                            $
                        </div>
                        <input
                            type="number"
                            name="donateAmount"
                            min="1"
                            step="any"
                            value={donateAmount}
                            onChange={(e) => setDonateAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full pl-8 pr-3 py-2.5 border-2 border-base-300 rounded-lg bg-base-100 text-base-content placeholder-base-content/40 focus:border-red-500 focus:outline-none font-bold text-base transition-all"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Redirecting to Checkout...</span>
                            </>
                        ) : (
                            <>
                                <HandHeart className="fill-white" size={17} />
                                <span>Donate ${donateAmount || '0'} Securely</span>
                                <ArrowRight size={17} />
                            </>
                        )}
                    </button>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-base-content/60 pt-0.5">
                        <span className="inline-flex items-center gap-1.5"><Lock size={12} className="text-emerald-500 shrink-0" /> 100% Encrypted & Secure</span>
                        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-blue-500 shrink-0" /> Powered by Stripe</span>
                        <span className="inline-flex items-center gap-1.5"><HeartPulse size={12} className="text-rose-500 shrink-0" /> Direct Medical Impact</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonateForm;
