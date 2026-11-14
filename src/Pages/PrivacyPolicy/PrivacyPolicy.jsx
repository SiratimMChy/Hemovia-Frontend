import { ShieldCheck } from 'lucide-react';

const sections = [
    {
        title: '1. Information We Collect',
        content: 'When you register on Hemovia, we collect your name, email address, blood group, district, upazila, and profile photo. This helps create your donor identity and match you with nearby blood needs.'
    },
    {
        title: '2. Blood Donation Requests',
        content: 'When a blood request is submitted, details like the recipient name, blood group, hospital name, full address, district, upazila, and message are displayed on the public feed so voluntary donors can find and assist.'
    },
    {
        title: '3. Secure Payments & Funding',
        content: 'Financial contributions made through our funding page are processed directly and securely by Stripe. Hemovia never stores or handles your credit card numbers or banking credentials.'
    },
    {
        title: '4. Data Privacy & Confidentiality',
        content: 'We do not sell, rent, or trade your personal records to third parties or marketing advertisers. Your information is used strictly for humanitarian blood donation coordination.'
    },
    {
        title: '5. Profile & Data Control',
        content: 'You maintain full control over your information. You can view, update, or edit your personal details, blood group, and location anytime directly from your dashboard Profile settings.'
    }
];

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                        <ShieldCheck className="text-red-600 dark:text-red-400" size={15} />
                        <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
                            Legal & Data Protection
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3">
                        Privacy <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Policy</span>
                    </h1>
                    <p className="text-sm sm:text-base text-base-content/70 max-w-xl mx-auto">
                        Transparent guidelines on how Hemovia handles your account details and blood donation requests.
                    </p>
                </div>

                <div className="space-y-4">
                    {sections.map(({ title, content }) => (
                        <div key={title} className="bg-base-200 border border-base-300 rounded-xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-bold text-base-content mb-2">{title}</h2>
                            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
                                {content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-xs text-base-content/50">
                    Last updated: November 2026 · Committed to donor privacy and data transparency in Bangladesh
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
