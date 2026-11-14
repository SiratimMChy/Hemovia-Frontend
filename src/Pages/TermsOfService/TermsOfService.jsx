import { Scale } from 'lucide-react';

const sections = [
    {
        title: '1. Platform Purpose & Scope',
        content: 'Hemovia is a non-profit coordination platform dedicated to connecting voluntary blood donors with patients and hospitals in Bangladesh. Hemovia does not store, collect, buy, or sell blood.'
    },
    {
        title: '2. User Eligibility & Accuracy',
        content: 'Donors must meet standard health criteria (minimum 18 years of age and medically fit). Requesters must provide genuine patient details, hospital location, and verifiable blood requirements.'
    },
    {
        title: '3. Strictly Non-Commercial',
        content: 'Blood donation facilitated through Hemovia is purely voluntary and free. Any attempt to solicit money, broker fees, or trade blood for financial reward is strictly illegal and causes immediate ban.'
    },
    {
        title: '4. Medical & Transfusion Disclaimer',
        content: 'Hemovia is a communication directory, not a clinical entity. All mandatory lab tests (grouping, cross-matching, screening for diseases) and transfusion procedures must be administered by certified medical professionals.'
    },
    {
        title: '5. Appropriate Conduct & Privacy',
        content: 'Users must respect donor privacy. Phone numbers and location details acquired through donation requests must never be abused, shared with third parties, or used for unsolicited communication.'
    }
];

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                        <Scale className="text-red-600 dark:text-red-400" size={15} />
                        <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
                            Legal & Community Standards
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3">
                        Terms of <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Service</span>
                    </h1>
                    <p className="text-sm sm:text-base text-base-content/70 max-w-xl mx-auto">
                        Clear, transparent guidelines designed to ensure safety and trust across our voluntary blood network.
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
                    Last updated: November 2026 · Governed by humanitarian blood donation standards in Bangladesh
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
