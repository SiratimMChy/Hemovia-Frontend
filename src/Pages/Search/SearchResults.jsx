import React from 'react';
import {
    FaSearch,
    FaTint,
    FaMapMarkerAlt,
    FaPhone,
    FaHospital,
    FaCalendarAlt,
    FaClock,
    FaEye
} from 'react-icons/fa';

const SearchResults = ({
    donors,
    isSearched,
    getStatusBadge,
    handleViewDetails
}) => {
    if (!isSearched) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                    Search Results
                </h2>
                <span className="badge badge-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold border-0">
                    {donors.length} {donors.length === 1 ? 'Donor' : 'Donors'} Found
                </span>
            </div>

            {donors.length === 0 ? (
                <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-12 text-center">
                    <div className="text-base-content/40 mb-4">
                        <FaSearch size={56} className="mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-base-content mb-2">No Donors Found</h3>
                    <p className="text-base-content/70">
                        No donors match your search criteria. Try adjusting your filters.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {donors.map((donor) => {
                        const badge = getStatusBadge(donor.donation_status);
                        return (
                            <div
                                key={donor._id}
                                className="bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-base-300 overflow-hidden flex flex-col justify-between min-h-[390px] h-full"
                            >
                                {/* Card Header */}
                                <div className="pt-5 sm:pt-6 px-4 sm:px-5 pb-3.5 sm:pb-4 border-b border-base-300 flex items-center justify-between gap-3 bg-base-200">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 font-black text-sm sm:text-base tracking-wider shrink-0">
                                            <FaTint className="text-white text-xs sm:text-sm shrink-0" />
                                            <span>{donor.bloodGroup}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-base md:text-lg text-base-content leading-tight truncate" title={donor.recipientName}>
                                                {donor.recipientName}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Status Pill */}
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${badge.classes}`}>
                                        {badge.icon}
                                        <span>{badge.label}</span>
                                    </span>
                                </div>

                                {/* Card Body - Professional Details */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3.5">
                                        {/* Location */}
                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={15} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Location</p>
                                                <p className="text-sm font-medium text-base-content truncate" title={`${donor.recipientUpazila ? `${donor.recipientUpazila}, ` : ''}${donor.recipientDistrict}`}>
                                                    {donor.recipientUpazila ? `${donor.recipientUpazila}, ` : ''}{donor.recipientDistrict}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        {donor.mobile && (
                                            <div className="flex items-start gap-3">
                                                <FaPhone className="text-red-500 mt-1 shrink-0" size={14} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Contact</p>
                                                    <a
                                                        href={`tel:${donor.mobile}`}
                                                        className="text-sm font-semibold text-base-content hover:text-red-600 transition-colors truncate block"
                                                        title={donor.mobile}
                                                    >
                                                        {donor.mobile}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hospital */}
                                        {donor.hospitalName && (
                                            <div className="flex items-start gap-3">
                                                <FaHospital className="text-red-500 mt-1 shrink-0" size={15} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Hospital</p>
                                                    <p className="text-sm text-base-content/80 font-medium truncate" title={donor.hospitalName}>
                                                        {donor.hospitalName}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Donation Date & Time */}
                                        {(donor.donationDate || donor.donationTime) && (
                                            <div className="pt-2.5 border-t border-base-300">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {donor.donationDate && (
                                                        <div className="flex items-start gap-2">
                                                            <FaCalendarAlt className="text-red-500 mt-0.5 shrink-0" size={13} />
                                                            <div className="min-w-0">
                                                                <p className="text-xs text-base-content/60 font-semibold">Date</p>
                                                                <p className="text-xs text-base-content/80 font-medium truncate">{donor.donationDate}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {donor.donationTime && (
                                                        <div className="flex items-start gap-2">
                                                            <FaClock className="text-red-500 mt-0.5 shrink-0" size={13} />
                                                            <div className="min-w-0">
                                                                <p className="text-xs text-base-content/60 font-semibold">Time</p>
                                                                <p className="text-xs text-base-content/80 font-medium truncate">{donor.donationTime}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* View Button Footer */}
                                    <div className="pt-3 border-t border-base-300">
                                        <button
                                            onClick={() => handleViewDetails(donor._id)}
                                            className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full flex items-center justify-center gap-2 font-semibold"
                                        >
                                            <FaEye size={16} />
                                            <span>View Details</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
