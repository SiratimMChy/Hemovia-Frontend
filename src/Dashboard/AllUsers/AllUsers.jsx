import { useContext, useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import UserDesktopTable from './UserDesktopTable';
import UserMobileCards from './UserMobileCards';
import UserPagination from './UserPagination';
import UserRoleModal from './UserRoleModal';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { user, role } = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const { checkDemoRestriction } = useDemoRestriction();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const res = await axiosSecure.get(`/users?page=${currentPage - 1}&size=${page}`);
                setUsers(res.data.users);
                setTotalUsers(res.data.totalUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [axiosSecure, user, currentPage, page]);

    const numberOfPages = Math.ceil(totalUsers / page);

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

    const handleStatusChange = (email, status) => {
        if (checkDemoRestriction()) {
            return;
        }
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(previousState =>
                        previousState.map(u =>
                            u.email === email ? { ...u, status } : u
                        )
                    );
                }
            });
    };

    const handleEditRole = (userItem) => {
        if (!checkDemoRestriction()) {
            setSelectedUser(userItem);
            document.getElementById('my_modal_3').showModal();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkDemoRestriction()) {
            return;
        }
        const form = e.target;
        const email = form.email.value;
        const roleValue = form.role.value;
        axiosSecure.patch(`/update/user/role?email=${email}&role=${roleValue}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(previousRole =>
                        previousRole.map(u =>
                            u.email === email ? { ...u, role: roleValue } : u
                        )
                    );
                }
            })
            .catch(err => console.error(err));
        form.reset();
        document.getElementById('my_modal_3').close();
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-base-300">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
                        All <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Users</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
                        Manage user roles, permissions, and access control across the platform
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="badge badge-lg bg-base-200 border border-base-300 font-bold text-xs text-base-content">
                        Total Users: <span className="text-red-600 ml-1.5">{totalUsers}</span>
                    </span>
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    <div className="h-6 bg-base-300 rounded w-48 animate-pulse mb-6"></div>
                    <SkeletonLoader type="list" count={8} />
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <UserDesktopTable
                        users={users}
                        currentPage={currentPage}
                        page={page}
                        role={role}
                        handleStatusChange={handleStatusChange}
                        onEditRole={handleEditRole}
                    />

                    {/* Responsive Mobile Cards View */}
                    <UserMobileCards
                        users={users}
                        currentPage={currentPage}
                        page={page}
                        role={role}
                        handleStatusChange={handleStatusChange}
                        onEditRole={handleEditRole}
                    />

                    {/* Pagination Controls */}
                    <UserPagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        onSetPage={setCurrentPage}
                    />
                </>
            )}

            {/* Modal */}
            <UserRoleModal
                selectedUser={selectedUser}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AllUsers;