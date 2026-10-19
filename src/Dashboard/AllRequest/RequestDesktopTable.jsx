import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from '../../Components/UI';

const RequestDesktopTable = ({
    requests,
    currentPage,
    page,
    role,
    handleStatusChange,
    handleDelete,
    checkDemoRestriction
}) => {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="table table-xs lg:table-auto w-full bg-base-200 border-2 border-base-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-base-300">
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            #
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Recipient Name
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Blood Group
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Hospital
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Location
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Donation Date
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Mobile
                        </th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                            Status
                        </th>
                        {(role === 'admin' || role === 'demoadmin') && (
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={request._id} className="hover:bg-base-300/50">
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {(currentPage - 1) * page + (index + 1)}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {request.recipientName}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                                {request.bloodGroup}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {request.hospitalName}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {request.fullAddress}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {request.donationDate}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {request.mobile}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3">
                                {role === 'admin' || role === 'demoadmin' || role === 'volunteer' ? (
                                    <select
                                        value={request.donation_status}
                                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                        className="select select-sm w-full min-w-32 bg-base-200 text-base-content border-base-300"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                ) : (
                                    <span className="font-semibold text-base-content">
                                        {request.donation_status}
                                    </span>
                                )}
                            </td>
                            {(role === 'admin' || role === 'demoadmin') && (
                                <td className="border-2 border-base-300 px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="accent"
                                            size="sm"
                                            onClick={() => {
                                                if (!checkDemoRestriction()) {
                                                    window.location.href = `/dashboard/edit-request/${request._id}`;
                                                }
                                            }}
                                        >
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleDelete(request._id)}
                                        >
                                            <MdDelete size={20} /> Delete
                                        </Button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestDesktopTable;
