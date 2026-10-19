const RequestHeader = ({ totalRequests, statusFilter, onStatusFilterChange }) => {
    return (
        <div className="space-y-4 pb-4 border-b border-base-300">
            {/* Title & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
                        All <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Requests</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
                        Manage and monitor all blood donation requests across the platform
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="badge badge-lg bg-base-200 border border-base-300 font-bold text-xs text-base-content">
                        Total Requests: <span className="text-red-600 ml-1.5">{totalRequests}</span>
                    </span>
                </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center justify-between gap-4 pt-1">
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="select select-sm sm:select-md w-full max-w-44 bg-base-200 text-base-content border-base-300 rounded-lg"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
        </div>
    );
};

export default RequestHeader;
