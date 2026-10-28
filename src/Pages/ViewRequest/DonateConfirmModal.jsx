import { Heart, X } from 'lucide-react';

const DonateConfirmModal = ({
    showDonateModal,
    setShowDonateModal,
    user,
    handleConfirmDonate
}) => {
    if (!showDonateModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="p-5 sm:p-6 pb-4 border-b border-base-300 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                            <Heart size={18} className="fill-red-600 dark:fill-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-base-content">Confirm Donation</h3>
                    </div>
                    <button
                        onClick={() => setShowDonateModal(false)}
                        className="btn btn-ghost btn-circle btn-xs text-base-content/60 hover:text-base-content"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-base-content/70">
                        Please review your contact info. The requester will be able to contact you once confirmed.
                    </p>

                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-base-100 border border-base-300">
                            <p className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">Donor Name</p>
                            <p className="text-sm font-bold text-base-content">{user?.displayName || user?.name || 'Anonymous'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-base-100 border border-base-300">
                            <p className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">Donor Email</p>
                            <p className="text-sm font-bold text-base-content break-all">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowDonateModal(false)}
                            className="btn btn-ghost flex-1 border border-base-300 hover:bg-base-300 text-base-content rounded-xl font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirmDonate}
                            className="btn bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white flex-1 border-0 rounded-xl shadow-md font-bold gap-1.5"
                        >
                            <Heart size={15} className="fill-white" />
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateConfirmModal;
