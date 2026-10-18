import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaEye, FaUser, FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHospital, FaPhone } from "react-icons/fa";
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';

const DonationRequests = () => {
  const { user } = useContext(AuthContext);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [page] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/public-requests?page=${currentPage - 1}&size=${page}&status=pending`);
        setPendingRequests(response.data.requests);
        setTotalRequests(response.data.totalRequests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosInstance, currentPage, page]);

  const numberOfPages = Math.ceil(totalRequests / page);
  const Pages = [...Array(numberOfPages).keys()].map(num => num + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < Pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleViewDetails = (id) => {
    if (user) {
      navigate(`/dashboard/view-request/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-3">
            Pending Donation Requests
          </h2>
          <p className="text-base-content/70 text-lg">
            Help save lives by responding to urgent blood requests
          </p>
          {!loading && (
            <div className="mt-4">
              <span className="badge badge-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold">
                {pendingRequests.length} {pendingRequests.length === 1 ? 'Request' : 'Requests'} Pending
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <SkeletonLoader type="card" count={8} />
        ) : (
          <>
            {/* Cards Grid */}
            {pendingRequests.length === 0 ? (
              <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-12 text-center">
                <div className="text-base-content/40 mb-4">
                  <FaTint size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">No Pending Requests</h3>
                <p className="text-base-content/70">
                  There are currently no pending donation requests.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {pendingRequests.map(request => (
                  <div
                    key={request._id}
                    className="bg-base-200 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-300 overflow-hidden flex flex-col justify-between min-h-[390px] h-full"
                  >
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
                          onClick={() => handleViewDetails(request._id)}
                          className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full flex items-center justify-center gap-2 font-semibold"
                        >
                          <FaEye size={16} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pendingRequests.length > 0 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={handlePrevPage}
                  className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Prev
                </button>
                {Pages.map(pg => (
                  <button
                    key={pg}
                    className={`btn rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${pg === currentPage
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                      : 'bg-base-200 text-base-content hover:bg-base-300'
                      }`}
                    onClick={() => setCurrentPage(pg)}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;