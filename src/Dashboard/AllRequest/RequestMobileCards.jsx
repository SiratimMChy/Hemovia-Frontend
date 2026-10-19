import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Card, Button } from '../../Components/UI';

const RequestMobileCards = ({
    requests,
    currentPage,
    page,
    role,
    handleStatusChange,
    handleDelete,
    checkDemoRestriction
}) => {
    return (
        <div className="lg:hidden space-y-4">
            {requests.map((request, index) => (
                <Card key={request._id} interactive className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <span className="badge badge-lg text-base-content font-bold bg-base-300">
                            #{(currentPage - 1) * page + (index + 1)}
                        </span>
                        <span className="badge badge-lg bg-red-600 text-white font-bold">
                            {request.bloodGroup}
                        </span>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div>
                            <span className="text-xs text-base-content/70 font-semibold">
                                Recipient Name:
                            </span>
                            <p className="font-semibold text-base-content">
                                {request.recipientName}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-base-content/70 font-semibold">
                                Hospital:
                            </span>
                            <p className="font-semibold text-base-content">
                                {request.hospitalName}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-base-content/70 font-semibold">
                                Location:
                            </span>
                            <p className="font-semibold text-base-content">
                                {request.fullAddress}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <span className="text-xs text-base-content/70 font-semibold">
                                    Date:
                                </span>
                                <p className="font-semibold text-base-content">
                                    {request.donationDate}
                                </p>
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-base-content/70 font-semibold">
                                    Mobile:
                                </span>
                                <p className="font-semibold text-base-content">
                                    {request.mobile}
                                </p>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-base-content/70 font-semibold">
                                Status:
                            </span>
                            {role === 'admin' || role === 'demoadmin' || role === 'volunteer' ? (
                                <select
                                    value={request.donation_status}
                                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                    className="select select-sm w-full mt-1 bg-base-100 text-base-content border-base-300"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="done">Done</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            ) : (
                                <p className="font-semibold text-base-content capitalize mt-1">
                                    {request.donation_status}
                                </p>
                            )}
                        </div>
                    </div>
                    {(role === 'admin' || role === 'demoadmin') && (
                        <div className="flex gap-2 pt-3 border-t border-base-300">
                            <Button
                                variant="accent"
                                size="sm"
                                onClick={() => {
                                    if (!checkDemoRestriction()) {
                                        window.location.href = `/dashboard/edit-request/${request._id}`;
                                    }
                                }}
                                className="flex-1"
                            >
                                <FaEdit /> Edit
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleDelete(request._id)}
                                className="flex-1"
                            >
                                <MdDelete size={20} /> Delete
                            </Button>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default RequestMobileCards;
