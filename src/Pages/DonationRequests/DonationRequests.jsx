import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Droplet } from 'lucide-react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import DonationRequestCard from './DonationRequestCard';
import DonationRequestsPagination from './DonationRequestsPagination';

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
                setPendingRequests(response.data.requests || []);
                setTotalRequests(response.data.totalRequests || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [axiosInstance, currentPage, page]);

    const numberOfPages = Math.ceil(totalRequests / page);

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/dashboard/view-request/${id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-base-100 py-8 sm:py-10 md:py-14 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                        <Droplet className="text-red-600 dark:text-red-400 fill-red-600" size={14} />
                        <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
                            Urgent Blood Calls
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3">
                        Pending Donation <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Requests</span>
                    </h1>
                    <p className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto">
                        Help save lives by responding to urgent hospital and emergency blood requests
                    </p>
                </div>

                {/* Content Section */}
                {loading ? (
                    <SkeletonLoader type="card" count={8} />
                ) : pendingRequests.length === 0 ? (
                    <div className="bg-base-200 rounded-xl shadow-sm border-2 border-base-300 p-8 sm:p-12 text-center max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
                            <Droplet size={32} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">No Pending Requests</h3>
                        <p className="text-sm sm:text-base text-base-content/70">
                            There are currently no urgent blood requests. Please check back later.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Live Counter Info Bar above grid */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2.5 border-b border-base-300">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                                </span>
                                <p className="text-xs sm:text-sm font-semibold text-base-content/80">
                                    Available Requests: <span className="text-red-600 dark:text-red-400 font-black">{totalRequests || pendingRequests.length}</span>
                                </p>
                            </div>
                            {numberOfPages > 1 && (
                                <span className="text-xs text-base-content/60 font-medium">
                                    Page {currentPage} of {numberOfPages}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
                            {pendingRequests.map(request => (
                                <DonationRequestCard
                                    key={request._id}
                                    request={request}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        <DonationRequestsPagination
                            currentPage={currentPage}
                            totalPages={numberOfPages}
                            onPrevPage={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            onNextPage={() => currentPage < numberOfPages && setCurrentPage(currentPage + 1)}
                            onPageSelect={(pg) => setCurrentPage(pg)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;
