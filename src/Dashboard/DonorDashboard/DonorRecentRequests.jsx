import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FileText, Eye, ArrowUpRight, Plus } from 'lucide-react';

const DonorRecentRequests = ({ requests, loading }) => {
  const navigate = useNavigate();

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
    <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-base-300">
        <h3 className="font-bold text-sm sm:text-base text-base-content flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
            <FileText size={14} />
          </div>
          <span>Recent Donation Requests</span>
        </h3>
        <Link
          to="/dashboard/myRequest"
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
      ) : requests.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-base-300 bg-base-100">
            <table className="table table-sm w-full">
              <thead>
                <tr className="bg-base-200/60 text-xs font-bold uppercase text-base-content/60 border-b border-base-300">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Blood</th>
                  <th className="py-3 px-4">Hospital</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 text-xs sm:text-sm">
                {requests.map((request, index) => (
                  <tr key={request._id} className="hover:bg-base-200/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-base-content/50">{index + 1}</td>
                    <td className="py-3 px-4 font-bold text-base-content">{request.recipientName}</td>
                    <td className="py-3 px-4">
                      <span className="badge badge-sm bg-red-600 text-white font-bold">
                        {request.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-base-content/80">{request.hospitalName}</td>
                    <td className="py-3 px-4 font-medium text-base-content/80">{request.donationDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${getStatusBadge(request.donation_status)}`}>
                        {request.donation_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => navigate(`/dashboard/view-request/${request._id}`)}
                        className="btn btn-xs btn-ghost text-base-content/70 hover:text-red-600 rounded-lg gap-1"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< 768px) */}
          <div className="md:hidden space-y-2.5">
            {requests.map((request, index) => (
              <div key={request._id} className="bg-base-100 border border-base-300 rounded-xl p-3 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-base-content">
                    #{index + 1} {request.recipientName}
                  </span>
                  <span className="badge badge-sm bg-red-600 text-white font-bold">
                    {request.bloodGroup}
                  </span>
                </div>
                <div className="text-xs text-base-content/70 space-y-0.5">
                  <p><span className="font-medium text-base-content">Hospital:</span> {request.hospitalName}</p>
                  <p><span className="font-medium text-base-content">Date:</span> {request.donationDate}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-base-300">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border capitalize ${getStatusBadge(request.donation_status)}`}>
                    {request.donation_status}
                  </span>
                  <button
                    onClick={() => navigate(`/dashboard/view-request/${request._id}`)}
                    className="btn btn-xs btn-outline border-base-300 text-xs"
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <FileText size={40} className="text-base-content/30 mx-auto mb-2" />
          <p className="text-sm font-semibold text-base-content/70">No donation requests yet</p>
          <Link
            to="/dashboard/addRequest"
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none rounded-xl text-xs font-semibold gap-1.5 shadow-xs mt-3"
          >
            <Plus size={14} />
            <span>Create Request</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonorRecentRequests;
