import React from 'react';

const DonateTable = ({ payments = [], totalDonations = 0 }) => {
    return (
        <div>
            {/* Header & Total Donations Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 bg-base-200 border border-base-300 rounded-xl px-4 py-3">
                <h3 className="font-bold text-base-content text-base sm:text-lg">Donation History</h3>
                <div className="font-semibold text-sm sm:text-base text-base-content">
                    Total Donations: <span className="font-bold text-green-600 dark:text-green-400">${totalDonations.toLocaleString()}</span>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-300 bg-base-200 shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-base-300 bg-base-300/50 text-xs font-bold uppercase tracking-wider text-base-content/70">
                            <th className="py-3 px-4 w-12 text-center">#</th>
                            <th className="py-3 px-4">Donor Name</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Funding Date</th>
                            <th className="py-3 px-4">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-base-content/60 font-medium">
                                    No donation records found
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={payment._id || index} className="hover:bg-base-300/40 transition-colors">
                                    <td className="py-3 px-4 text-center font-semibold text-base-content/60">{index + 1}</td>
                                    <td className="py-3 px-4 font-semibold text-base-content">{payment.donorName || 'Anonymous Donor'}</td>
                                    <td className="py-3 px-4 font-bold text-green-600 dark:text-green-400">${payment.amount}</td>
                                    <td className="py-3 px-4 text-base-content/80">
                                        {new Date(payment.paidAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-xs text-base-content/70 select-all">
                                        {payment.transactionId}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-3">
                {payments.length === 0 ? (
                    <div className="p-6 text-center text-base-content/60 bg-base-200 border border-base-300 rounded-xl font-medium">
                        No donation records found
                    </div>
                ) : (
                    payments.map((payment, index) => (
                        <div key={payment._id || index} className="bg-base-200 border border-base-300 rounded-xl p-3.5 space-y-2 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-base-content text-sm">
                                    {payment.donorName || 'Anonymous Donor'}
                                </span>
                                <span className="font-extrabold text-sm text-green-600 dark:text-green-400">
                                    ${payment.amount}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-base-content/70 pt-2 border-t border-base-300">
                                <span>{new Date(payment.paidAt).toLocaleDateString()}</span>
                                <span className="font-mono text-[11px] bg-base-100 px-2 py-0.5 rounded border border-base-300 text-base-content/70 select-all">
                                    {payment.transactionId}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DonateTable;
