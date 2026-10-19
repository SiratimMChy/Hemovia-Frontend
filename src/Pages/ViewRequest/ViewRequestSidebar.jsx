import { User, Heart, ArrowLeft, Edit, CheckCircle } from 'lucide-react';

const ViewRequestSidebar = ({
    requestData,
    user,
    id,
    navigate,
    setShowDonateModal,
    checkDemoRestriction
}) => {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Requester Information */}
            <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                    <User className="text-blue-600 dark:text-blue-400" size={20} />
                    Requester
                </h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Name</p>
                        <p className="text-sm sm:text-base text-base-content font-medium">{requestData.requesterName}</p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Email</p>
                        <p className="text-sm sm:text-base text-base-content/80 break-all">{requestData.requesterEmail}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
                {requestData.donation_status === 'pending' && user?.email !== requestData.requesterEmail && (
                    <>
                        <button
                            onClick={() => setShowDonateModal(true)}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Confirm Donation</span>
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Go Back</span>
                        </button>
                    </>
                )}

                {user?.email === requestData.requesterEmail && (
                    <>
                        <button
                            onClick={() => {
                                if (!checkDemoRestriction()) {
                                    navigate(`/dashboard/edit-request/${id}`);
                                }
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Edit Request</span>
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/myRequest')}
                            className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>My Requests</span>
                        </button>
                    </>
                )}

                {requestData.donation_status !== 'pending' && user?.email !== requestData.requesterEmail && (
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Go Back</span>
                    </button>
                )}
            </div>

            {/* Donor Info (if in progress) */}
            {requestData.donation_status === 'inprogress' && requestData.donorName && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Donor Confirmed
                    </h3>
                    <div className="space-y-2">
                        <p className="text-sm text-green-700 dark:text-green-300">
                            <span className="font-semibold">Name:</span> {requestData.donorName}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                            <span className="font-semibold">Email:</span> {requestData.donorEmail}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewRequestSidebar;
