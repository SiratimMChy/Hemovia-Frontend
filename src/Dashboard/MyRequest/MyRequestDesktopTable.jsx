import { Link } from 'react-router';
import { Button } from '../../Components/UI';
import { FaTint } from 'react-icons/fa';
import { Eye, Edit, Trash2 } from 'lucide-react';

const MyRequestDesktopTable = ({
    myRequests,
    currentPage,
    page,
    handleDelete,
    checkDemoRestriction,
    getStatusColor,
    getStatusIcon
}) => {
    return (
        <div className="hidden lg:block overflow-x-auto bg-base-200 border-2 border-base-300 rounded-xl shadow-lg">
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-300">
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">#</th>
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">Recipient</th>
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">Blood Group</th>
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">Hospital</th>
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">Date</th>
                        <th className="border-r border-base-300 px-4 py-4 text-left font-bold text-base-content">Status</th>
                        <th className="px-4 py-4 text-center font-bold text-base-content">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myRequests.map((request, index) => (
                        <tr key={request._id} className="hover:bg-base-300/50 border-b border-base-300">
                            <td className="border-r border-base-300 px-4 py-4 font-semibold text-base-content">
                                {(currentPage - 1) * page + (index + 1)}
                            </td>
                            <td className="border-r border-base-300 px-4 py-4">
                                <div>
                                    <p className="font-bold text-base-content">{request.recipientName}</p>
                                    <p className="text-sm text-base-content/70">{request.mobile}</p>
                                </div>
                            </td>
                            <td className="border-r border-base-300 px-4 py-4">
                                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full w-fit">
                                    <FaTint className="w-3 h-3 text-red-600 dark:text-red-400" />
                                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">
                                        {request.bloodGroup}
                                    </span>
                                </div>
                            </td>
                            <td className="border-r border-base-300 px-4 py-4">
                                <div>
                                    <p className="font-semibold text-base-content">{request.hospitalName}</p>
                                    <p className="text-sm text-base-content/70 truncate max-w-xs">{request.fullAddress}</p>
                                </div>
                            </td>
                            <td className="border-r border-base-300 px-4 py-4 font-semibold text-base-content">
                                {request.donationDate}
                            </td>
                            <td className="border-r border-base-300 px-4 py-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(request.donation_status)}`}>
                                    {getStatusIcon(request.donation_status)}
                                    <span className="capitalize">{request.donation_status}</span>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        as={Link}
                                        to={`/dashboard/view-request/${request._id}`}
                                        variant="success"
                                        size="sm"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="accent"
                                        size="sm"
                                        onClick={() => {
                                            if (!checkDemoRestriction()) {
                                                window.location.href = `/dashboard/edit-request/${request._id}`;
                                            }
                                        }}
                                        title="Edit Request"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleDelete(request._id)}
                                        title="Delete Request"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyRequestDesktopTable;
