import { Link } from 'react-router';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { Button } from '../../Components/UI';
import { TYPOGRAPHY } from '../../styles/designSystem';

const MyRequestHeader = ({ statusFilter, onStatusFilterChange, showingCount, totalCount }) => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className={`${TYPOGRAPHY.heading.h2} mb-2`}>
                        My Donation Requests
                    </h1>
                    <p className={TYPOGRAPHY.body.default}>
                        Manage and track your blood donation requests
                    </p>
                </div>
                <Button
                    as={Link}
                    to="/dashboard/addRequest"
                    variant="primary"
                    className="w-full sm:w-auto flex items-center gap-2"
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Add New Request</span>
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                    <FaFilter className="text-base-content/60" />
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                        className="select select-bordered bg-base-200 text-base-content border-base-300 focus:border-red-500 w-full sm:w-auto"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div className="text-sm text-base-content/70">
                    Showing {showingCount} of {totalCount} requests
                </div>
            </div>
        </div>
    );
};

export default MyRequestHeader;
