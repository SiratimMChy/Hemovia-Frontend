import { User, Heart, ArrowLeft, Edit3, CheckCircle, Mail } from 'lucide-react';

const ViewRequestSidebar = ({ requestData, user, id, navigate, setShowDonateModal, checkDemoRestriction }) => {
    const isOwner = user?.email && user?.email?.toLowerCase() === requestData.requesterEmail?.toLowerCase();
    const isPending = requestData.donation_status?.toLowerCase() === 'pending';
    const isInProgress = requestData.donation_status?.toLowerCase() === 'inprogress';

    return (
        <>
            {/* Card 3 (Row 1 Right): Posted By */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full lg:col-start-3 lg:col-span-1 lg:row-start-1">
                <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-base-300">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <User size={18} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-base-content">Posted By</h3>
                    </div>

                    <div className="space-y-3.5">
                        <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                            <p className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">Requester Name</p>
                            <p className="text-sm sm:text-base font-bold text-base-content">{requestData.requesterName}</p>
                        </div>

                        <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                            <p className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">Email Address</p>
                            <a href={`mailto:${requestData.requesterEmail}`} className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:underline break-all flex items-center gap-1">
                                <Mail size={12} className="shrink-0" />
                                <span>{requestData.requesterEmail}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 4 (Row 2 Right): Actions & Donor */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3 lg:col-start-3 lg:col-span-1 lg:row-start-2">
                <div>
                    <h3 className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-2">Actions</h3>

                    <div className="space-y-2.5">
                        {isPending && !isOwner && (
                            <button
                                onClick={() => setShowDonateModal(true)}
                                className="btn bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white w-full border-0 rounded-xl shadow-md hover:shadow-lg transition-all font-bold gap-2"
                            >
                                <Heart size={16} className="fill-white" />
                                <span>Confirm Donation</span>
                            </button>
                        )}

                        {isOwner && (
                            <button
                                onClick={() => !checkDemoRestriction() && navigate(`/dashboard/edit-request/${id}`)}
                                className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full border-0 rounded-xl shadow-md font-bold gap-2"
                            >
                                <Edit3 size={16} />
                                <span>Edit Request</span>
                            </button>
                        )}

                        <button
                            onClick={() => navigate(isOwner ? '/dashboard/myRequest' : -1)}
                            className="btn btn-outline border-base-300 hover:bg-base-300 text-base-content w-full rounded-xl gap-2 font-semibold"
                        >
                            <ArrowLeft size={16} />
                            <span>{isOwner ? 'My Requests' : 'Go Back'}</span>
                        </button>
                    </div>
                </div>

                {/* Donor Info (when In Progress) */}
                {isInProgress && requestData.donorName && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 text-emerald-900 dark:text-emerald-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                            <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
                            <span>Donor Confirmed</span>
                        </div>
                        <div className="text-[11px] space-y-0.5 pt-1 border-t border-emerald-200/60 dark:border-emerald-800/40">
                            <p><span className="font-semibold text-emerald-700 dark:text-emerald-400">Name:</span> {requestData.donorName}</p>
                            <p><span className="font-semibold text-emerald-700 dark:text-emerald-400">Email:</span> {requestData.donorEmail}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewRequestSidebar;
