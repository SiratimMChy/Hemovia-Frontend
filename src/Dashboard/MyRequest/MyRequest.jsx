import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import { LAYOUT, SPACING } from '../../styles/designSystem';
import { getStatusIcon, getStatusColor } from '../utils/requestHelpers';
import MyRequestHeader from './MyRequestHeader';
import MyRequestStatCards from './MyRequestStatCards';
import MyRequestEmptyState from './MyRequestEmptyState';
import MyRequestDesktopTable from './MyRequestDesktopTable';
import MyRequestMobileCards from './MyRequestMobileCards';
import MyRequestPagination from './MyRequestPagination';

const MyRequest = () => {
    const [totalRequests, setTotalRequests] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [page] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        let isMounted = true;
        const fetchRequests = () => {
            if (isMounted) {
                setLoading(true);
            }
            axiosSecure.get(`/myRequests?page=${currentPage - 1}&size=${page}&status=${statusFilter}`)
                .then(response => {
                    if (isMounted) {
                        setMyRequests(response.data.requests);
                        setTotalRequests(response.data.totalRequests);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        console.error(err);
                        setLoading(false);
                    }
                });
        };
        fetchRequests();
        return () => {
            isMounted = false;
        };
    }, [axiosSecure, currentPage, page, statusFilter]);

    const numberOfPages = Math.ceil(totalRequests / page);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDelete = (id) => {
        if (checkDemoRestriction()) {
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this donation request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount == 1) {
                            const remaining = myRequests.filter(listing => listing._id !== id);
                            setMyRequests(remaining);
                            setTotalRequests(prev => prev - 1);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your donation request has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#dc2626"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the request. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#dc2626"
                        });
                    });
            }
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-base-content/70 text-sm sm:text-base">Loading your requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
            <div className={LAYOUT.container}>
                {/* Header Section & Filter */}
                <div className={SPACING.marginXl}>
                    <MyRequestHeader
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                        showingCount={myRequests.length}
                        totalCount={totalRequests}
                    />

                    {/* Stats Grid */}
                    <MyRequestStatCards totalRequests={totalRequests} myRequests={myRequests} />
                </div>

                {/* Empty State */}
                {myRequests.length === 0 && !loading && (
                    <MyRequestEmptyState statusFilter={statusFilter} />
                )}

                {/* Requests Views: Mobile Cards & Desktop Table */}
                {myRequests.length > 0 && (
                    <>
                        <MyRequestMobileCards
                            myRequests={myRequests}
                            currentPage={currentPage}
                            page={page}
                            handleDelete={handleDelete}
                            checkDemoRestriction={checkDemoRestriction}
                            getStatusColor={getStatusColor}
                            getStatusIcon={getStatusIcon}
                        />

                        <MyRequestDesktopTable
                            myRequests={myRequests}
                            currentPage={currentPage}
                            page={page}
                            handleDelete={handleDelete}
                            checkDemoRestriction={checkDemoRestriction}
                            getStatusColor={getStatusColor}
                            getStatusIcon={getStatusIcon}
                        />
                    </>
                )}

                {/* Pagination Controls */}
                <MyRequestPagination
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    totalRequests={totalRequests}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default MyRequest;