import { Heart } from 'lucide-react';

const DonateConfirmModal = ({
    showDonateModal,
    setShowDonateModal,
    user,
    handleConfirmDonate
}) => {
    if (!showDonateModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-4 sm:p-6">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">
                            Confirm Your Donation
                        </h3>
                        <p className="text-sm sm:text-base text-base-content/70">
                            You're about to save a life. Please confirm your details.
                        </p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">Your Name</label>
                            <input
                                readOnly
                                value={user?.displayName || user?.name || ''}
                                className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-100 text-base-content font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">Your Email</label>
                            <input
                                readOnly
                                value={user?.email || ''}
                                className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-100 text-base-content font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleConfirmDonate}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Heart className="w-4 h-4" />
                            <span>Confirm Donation</span>
                        </button>
                        <button
                            onClick={() => setShowDonateModal(false)}
                            className="flex-1 bg-base-300 hover:bg-base-400 text-base-content py-3 px-4 rounded-lg font-bold transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateConfirmModal;
