import { Droplet, User, MapPin, Phone, Calendar, Clock, Building2, FileText } from 'lucide-react';

const ViewRequestDetails = ({ requestData }) => {
    const address = [requestData.fullAddress, requestData.recipientUpazila, requestData.recipientDistrict].filter(Boolean).join(', ');

    return (
        <>
            {/* Card 1 (Row 1 Left): Recipient Information */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full lg:col-start-1 lg:col-span-2 lg:row-start-1">
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-base-300">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                            <User size={18} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-base-content">Recipient Information</h3>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 h-9 sm:h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 font-black text-sm sm:text-base tracking-wider shrink-0">
                        <Droplet size={14} className="fill-white text-white" />
                        <span>{requestData.bloodGroup}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <User size={13} className="text-red-500 shrink-0" />
                            <span>Recipient Name</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-base-content">{requestData.recipientName}</p>
                    </div>

                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <Phone size={13} className="text-red-500 shrink-0" />
                            <span>Contact Number</span>
                        </div>
                        <a href={`tel:${requestData.mobile}`} className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 hover:underline block truncate">
                            {requestData.mobile}
                        </a>
                    </div>

                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <Building2 size={13} className="text-red-500 shrink-0" />
                            <span>Hospital / Medical Center</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-base-content truncate" title={requestData.hospitalName || 'Not specified'}>
                            {requestData.hospitalName || 'Not specified'}
                        </p>
                    </div>

                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <MapPin size={13} className="text-red-500 shrink-0" />
                            <span>Location / Address</span>
                        </div>
                        <p className="text-sm font-medium text-base-content truncate" title={address || 'Not specified'}>
                            {address || 'Not specified'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 2 (Row 2 Left): Donation Schedule & Notes */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between lg:col-start-1 lg:col-span-2 lg:row-start-2">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-base-300">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Calendar size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-base-content">Donation Schedule & Notes</h3>
                </div>

                <div className={`grid grid-cols-1 ${requestData.requestMessage ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3.5`}>
                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <Calendar size={13} className="text-red-500 shrink-0" />
                            <span>Date</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-base-content">{requestData.donationDate}</p>
                    </div>

                    <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            <Clock size={13} className="text-red-500 shrink-0" />
                            <span>Time</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-base-content">{requestData.donationTime || 'Flexible'}</p>
                    </div>

                    {requestData.requestMessage && (
                        <div className="p-3 bg-base-100/70 border border-base-300/70 rounded-xl min-w-0">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                                <FileText size={13} className="text-amber-500 shrink-0" />
                                <span>Additional Note</span>
                            </div>
                            <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed italic truncate" title={requestData.requestMessage}>
                                "{requestData.requestMessage}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewRequestDetails;
