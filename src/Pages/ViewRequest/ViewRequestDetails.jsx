import { Droplet, User, MapPin, Phone, Calendar, Clock } from 'lucide-react';

const ViewRequestDetails = ({ requestData }) => {
    return (
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Blood Type Card */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-red-100 text-sm sm:text-base font-medium mb-1">Blood Type Needed</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{requestData.bloodGroup}</p>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                    </div>
                </div>
            </div>

            {/* Recipient Information */}
            <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                    <User className="text-red-600 dark:text-red-400" size={20} />
                    Recipient Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Full Name</p>
                            <p className="text-sm sm:text-base text-base-content font-medium">{requestData.recipientName}</p>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Blood Group</p>
                            <div className="inline-flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1 rounded-full">
                                <Droplet className="w-3 h-3 text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-400" />
                                <span className="text-red-600 dark:text-red-500 font-bold text-sm">{requestData.bloodGroup}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Contact Number</p>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-base-content/40" />
                                <p className="text-sm sm:text-base text-base-content font-medium">{requestData.mobile}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Location</p>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-base-content/40 mt-0.5 shrink-0" />
                                <p className="text-sm sm:text-base text-base-content font-medium">
                                    {requestData.recipientUpazila}, {requestData.recipientDistrict}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Full Address */}
                {requestData.fullAddress && (
                    <div className="mt-4 pt-4 border-t border-base-300">
                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Full Address</p>
                        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">{requestData.fullAddress}</p>
                    </div>
                )}
            </div>

            {/* Donation Details */}
            <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                    <Calendar className="text-red-600 dark:text-red-400" size={20} />
                    Donation Schedule
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                            <p className="text-xs text-base-content/60 font-semibold">Date</p>
                            <p className="text-sm sm:text-base text-base-content font-medium">{requestData.donationDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="text-xs text-base-content/60 font-semibold">Time</p>
                            <p className="text-sm sm:text-base text-base-content font-medium">{requestData.donationTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hospital/Message */}
            {(requestData.hospitalName || requestData.requestMessage) && (
                <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4">Additional Information</h3>
                    {requestData.hospitalName && (
                        <div className="mb-4">
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Hospital/Location</p>
                            <p className="text-sm sm:text-base text-base-content/80">{requestData.hospitalName}</p>
                        </div>
                    )}
                    {requestData.requestMessage && (
                        <div>
                            <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Message</p>
                            <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">{requestData.requestMessage}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewRequestDetails;
