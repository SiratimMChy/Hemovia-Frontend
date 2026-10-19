import React from 'react';
import { Link } from 'react-router';
import { FileText, Users, ArrowUpRight } from 'lucide-react';

const AdminRecentActivities = ({ recentRequests, recentUsers, loading }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'done':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'inprogress':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Panel 1: Recent Blood Requests */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-base-300">
            <h3 className="font-bold text-sm sm:text-base text-base-content flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
                <FileText size={14} />
              </div>
              <span>Recent Blood Requests</span>
            </h3>
            <Link
              to="/dashboard/allRequest"
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 flex justify-center">
              <span className="loading loading-spinner text-red-600"></span>
            </div>
          ) : recentRequests.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
              <table className="table table-xs sm:table-sm w-full">
                <thead>
                  <tr className="bg-base-200/60 text-[11px] font-bold uppercase text-base-content/60 border-b border-base-300">
                    <th className="py-2.5 px-3">Recipient</th>
                    <th className="py-2.5 px-3">Blood</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 text-xs">
                  {recentRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-base-200/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-base-content">{request.recipientName}</td>
                      <td className="py-2.5 px-3">
                        <span className="badge badge-xs bg-red-600 text-white font-bold">
                          {request.bloodGroup}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusBadge(request.donation_status)}`}>
                          {request.donation_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-xs font-semibold text-base-content/60">
              No recent donation requests
            </div>
          )}
        </div>
      </div>

      {/* Panel 2: Recent Registered Users */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-base-300">
            <h3 className="font-bold text-sm sm:text-base text-base-content flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Users size={14} />
              </div>
              <span>Recent Registered Users</span>
            </h3>
            <Link
              to="/dashboard/all-users"
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
            >
              <span>Manage Users</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 flex justify-center">
              <span className="loading loading-spinner text-red-600"></span>
            </div>
          ) : recentUsers.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
              <table className="table table-xs sm:table-sm w-full">
                <thead>
                  <tr className="bg-base-200/60 text-[11px] font-bold uppercase text-base-content/60 border-b border-base-300">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 text-xs">
                  {recentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-base-200/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-base-content">{user.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="badge badge-xs badge-ghost font-semibold capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          user.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                        }`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-xs font-semibold text-base-content/60">
              No recent users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecentActivities;
