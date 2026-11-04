import { User, Droplet, MapPin, Hospital, Phone, Calendar, Clock, ArrowRight } from 'lucide-react';

const DonationRequestCard = ({ request, onViewDetails }) => {
    return (
        <div className="bg-base-100 border-2 border-base-300 rounded-xl overflow-hidden flex flex-col justify-between min-h-[390px] h-full shadow-sm hover:shadow-xl hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-300 group">
            {/* Header: Recipient & Blood Group */}
            <div className="pt-5 px-4 sm:px-5 pb-3.5 border-b border-base-300 flex items-center justify-between gap-3 bg-base-200/50">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-base-content/60 font-semibold uppercase tracking-wider mb-1">
                        <User size={12} className="text-red-600 dark:text-red-400 shrink-0" />
                        <span>Recipient</span>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-base-content leading-tight truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" title={request.recipientName}>
                        {request.recipientName}
                    </h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 h-10 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md font-black text-sm sm:text-base tracking-wider shrink-0">
                    <Droplet size={13} className="text-white fill-white shrink-0" />
                    <span>{request.bloodGroup}</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-start gap-2.5">
                        <MapPin size={15} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-base-content/60 font-semibold uppercase tracking-wider">Location</p>
                            <p className="text-sm font-medium text-base-content line-clamp-2" title={request.fullAddress}>
                                {request.fullAddress}
                            </p>
                        </div>
                    </div>

                    {/* Hospital */}
                    {request.hospitalName && (
                        <div className="flex items-start gap-2.5">
                            <Hospital size={15} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] text-base-content/60 font-semibold uppercase tracking-wider">Hospital</p>
                                <p className="text-sm text-base-content/85 font-medium truncate" title={request.hospitalName}>
                                    {request.hospitalName}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Contact */}
                    {request.mobile && (
                        <div className="flex items-start gap-2.5">
                            <Phone size={15} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] text-base-content/60 font-semibold uppercase tracking-wider">Contact</p>
                                <a
                                    href={`tel:${request.mobile}`}
                                    className="text-sm font-semibold text-base-content hover:text-red-600 dark:hover:text-red-400 transition-colors truncate block"
                                    title={request.mobile}
                                >
                                    {request.mobile}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Date & Time */}
                    <div className="pt-2.5 border-t border-base-300">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-start gap-1.5 min-w-0">
                                <Calendar size={13} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-base-content/60 font-semibold">Date</p>
                                    <p className="text-xs text-base-content/85 font-medium truncate">{request.donationDate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1.5 min-w-0">
                                <Clock size={13} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-base-content/60 font-semibold">Time</p>
                                    <p className="text-xs text-base-content/85 font-medium truncate">{request.donationTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="pt-3 border-t border-base-300">
                    <button
                        onClick={() => onViewDetails(request._id)}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestCard;
