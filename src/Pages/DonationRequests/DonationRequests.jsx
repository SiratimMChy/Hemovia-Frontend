import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaTint } from "react-icons/fa";
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import DonationRequestCard from './DonationRequestCard';

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
        {/* Page title and count of active requests */}
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

        {/* Loading placeholders */}
        {loading ? (
          <SkeletonLoader type="card" count={8} />
        ) : (
          <>
            {/* List of blood request cards */}
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
                  <DonationRequestCard
                    key={request._id}
                    request={request}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}

            {/* Page buttons */}
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