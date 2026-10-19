import { FaEye, FaUser, FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHospital, FaPhone } from "react-icons/fa";

const DonationRequestCard = ({ request, onViewDetails }) => {
  return (
    <div className="bg-base-200 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-300 overflow-hidden flex flex-col justify-between min-h-[390px] h-full">
      {/* Card Header */}
      <div className="pt-5 sm:pt-6 px-4 sm:px-5 pb-3.5 sm:pb-4 border-b border-base-300 flex items-center justify-between gap-3 bg-base-200">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs text-base-content/60 font-semibold uppercase tracking-wider mb-1">
            <FaUser size={11} className="text-red-500 shrink-0" />
            <span>Recipient Information</span>
          </div>
          <h3 className="font-bold text-base md:text-lg text-base-content leading-tight truncate" title={request.recipientName}>
            {request.recipientName}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 font-black text-sm sm:text-base tracking-wider shrink-0">
          <FaTint className="text-white text-xs sm:text-sm shrink-0" />
          <span>{request.bloodGroup}</span>
        </div>
      </div>

      {/* Card Body - Professional Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          {/* Location */}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={15} />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Location</p>
              <p className="text-sm font-medium text-base-content line-clamp-2" title={request.fullAddress}>
                {request.fullAddress}
              </p>
            </div>
          </div>

          {/* Hospital */}
          {request.hospitalName && (
            <div className="flex items-start gap-3">
              <FaHospital className="text-red-500 mt-1 shrink-0" size={15} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Hospital</p>
                <p className="text-sm text-base-content/80 font-medium truncate" title={request.hospitalName}>
                  {request.hospitalName}
                </p>
              </div>
            </div>
          )}

          {/* Contact */}
          {request.mobile && (
            <div className="flex items-start gap-3">
              <FaPhone className="text-red-500 mt-1 shrink-0" size={14} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Contact</p>
                <a
                  href={`tel:${request.mobile}`}
                  className="text-sm font-semibold text-base-content hover:text-red-600 transition-colors truncate block"
                  title={request.mobile}
                >
                  {request.mobile}
                </a>
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="pt-2.5 border-t border-base-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <FaCalendarAlt className="text-red-500 mt-0.5 shrink-0" size={13} />
                <div className="min-w-0">
                  <p className="text-xs text-base-content/60 font-semibold">Date</p>
                  <p className="text-xs text-base-content/80 font-medium truncate">{request.donationDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaClock className="text-red-500 mt-0.5 shrink-0" size={13} />
                <div className="min-w-0">
                  <p className="text-xs text-base-content/60 font-semibold">Time</p>
                  <p className="text-xs text-base-content/80 font-medium truncate">{request.donationTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Button Footer */}
        <div className="pt-3 border-t border-base-300">
          <button
            onClick={() => onViewDetails(request._id)}
            className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full flex items-center justify-center gap-2 font-semibold"
          >
            <FaEye size={16} />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestCard;
