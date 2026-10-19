import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import RequestHeader from './RequestHeader';
import RequestDesktopTable from './RequestDesktopTable';
import RequestMobileCards from './RequestMobileCards';
import RequestPagination from './RequestPagination';

const AllRequest = () => {
    const { role } = useContext(AuthContext);
    const [totalRequests, setTotalRequests] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            if (isMounted) {
                setIsLoading(true);
            }
            axiosSecure
                .get(`/requests?page=${currentPage - 1}&size=${page}&status=${statusFilter}`)
                .then((response) => {
                    if (isMounted) {
                        setMyRequests(response.data.requests);
                        setTotalRequests(response.data.totalRequests);
                    }
                })
                .catch((err) => {
                    if (isMounted) {
                        console.error('Error fetching requests:', err);
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                });
        };
        fetchData();
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

    const handleStatusChange = (id, newStatus) => {
        if (checkDemoRestriction()) {
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: `Change status to ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .put(`/requests/${id}`, { donation_status: newStatus })
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            const updatedRequests = myRequests.map((req) =>
                                req._id === id ? { ...req, donation_status: newStatus } : req
                            );
                            setMyRequests(updatedRequests);
                            Swal.fire({
                                title: 'Updated!',
                                text: 'Status has been updated.',
                                icon: 'success',
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to update status.',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    const handleDelete = (id) => {
        if (checkDemoRestriction()) {
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/delete-request/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.deletedCount == 1) {
                            const remaining = myRequests.filter((listing) => listing._id !== id);
                            setMyRequests(remaining);
                            setTotalRequests((prev) => Math.max(0, prev - 1));
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success',
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 w-full space-y-6">
            {/* Header & Status Filter */}
            <RequestHeader
                totalRequests={totalRequests}
                statusFilter={statusFilter}
                onStatusFilterChange={(newStatus) => {
                    setStatusFilter(newStatus);
                    setCurrentPage(1);
                }}
            />

            {isLoading ? (
                <div className="space-y-4">
                    <div className="h-6 bg-base-300 rounded w-48 animate-pulse mb-6"></div>
                    <SkeletonLoader type="list" count={8} />
                </div>
            ) : (
                <>
                    <RequestMobileCards
                        requests={myRequests}
                        currentPage={currentPage}
                        page={page}
                        role={role}
                        handleStatusChange={handleStatusChange}
                        handleDelete={handleDelete}
                        checkDemoRestriction={checkDemoRestriction}
                    />

                    <RequestDesktopTable
                        requests={myRequests}
                        currentPage={currentPage}
                        page={page}
                        role={role}
                        handleStatusChange={handleStatusChange}
                        handleDelete={handleDelete}
                        checkDemoRestriction={checkDemoRestriction}
                    />

                    <RequestPagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        onSetPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default AllRequest;
