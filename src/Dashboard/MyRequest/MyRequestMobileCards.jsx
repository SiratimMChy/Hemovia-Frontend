import { Link } from 'react-router';
import { Card, Button } from '../../Components/UI';
import { FaTint, FaRegEye, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaPhone } from 'react-icons/fa';
import { Eye, Edit, Trash2 } from 'lucide-react';

const MyRequestMobileCards = ({
    myRequests,
    currentPage,
    page,
    handleDelete,
    checkDemoRestriction,
    getStatusColor,
    getStatusIcon
}) => {
    return (
        <div className="lg:hidden space-y-4">
            {myRequests.map((request, index) => (
                <Card key={request._id} interactive className="hover:border-red-200 dark:hover:border-red-900/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-base-300 text-base-content px-3 py-1 rounded-full text-sm font-bold">
                                #{(currentPage - 1) * page + (index + 1)}
                            </span>
                            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                                <FaTint className="w-3 h-3 text-red-600 dark:text-red-400" />
                                <span className="text-red-600 dark:text-red-400 font-bold text-sm">
                                    {request.bloodGroup}
                                </span>
                            </div>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(request.donation_status)}`}>
                            {getStatusIcon(request.donation_status)}
                            <span className="capitalize">{request.donation_status}</span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3">
                            <FaRegEye className="w-4 h-4 text-base-content/60 mt-1 shrink-0" />
                            <div>
                                <p className="text-xs text-base-content/60 font-semibold">Recipient Name</p>
                                <p className="font-bold text-base-content">{request.recipientName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaHospital className="w-4 h-4 text-base-content/60 mt-1 shrink-0" />
                            <div>
                                <p className="text-xs text-base-content/60 font-semibold">Hospital</p>
                                <p className="font-semibold text-base-content">{request.hospitalName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="w-4 h-4 text-base-content/60 mt-1 shrink-0" />
                            <div>
                                <p className="text-xs text-base-content/60 font-semibold">Location</p>
                                <p className="font-semibold text-base-content text-sm">{request.fullAddress}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <FaCalendarAlt className="w-4 h-4 text-base-content/60 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-base-content/60 font-semibold">Date</p>
                                    <p className="font-semibold text-base-content text-sm">{request.donationDate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaPhone className="w-4 h-4 text-base-content/60 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-base-content/60 font-semibold">Mobile</p>
                                    <p className="font-semibold text-base-content text-sm">{request.mobile}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-base-300">
                        <Button
                            as={Link}
                            to={`/dashboard/view-request/${request._id}`}
                            variant="success"
                            size="sm"
                            className="flex-1"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                        </Button>
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
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleDelete(request._id)}
                            className="flex-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MyRequestMobileCards;
