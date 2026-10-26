import { Droplet, ArrowLeft, CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import ViewRequestDetails from './ViewRequestDetails';
import ViewRequestSidebar from './ViewRequestSidebar';
import DonateConfirmModal from './DonateConfirmModal';

const ViewRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState(null);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const fetchRequestData = () => {
            if (isMounted) {
                setLoading(true);
            }

            axiosSecure.get(`/requests/${id}`)
                .then(res => {
                    if (isMounted) {
                        setRequestData(res.data);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        console.log(err);
                        setLoading(false);
                        Swal.fire("Error", "Failed to load request data", "error");
                    }
                });
        };

        fetchRequestData();

        return () => {
            isMounted = false;
        };
    }, [id, axiosSecure]);

    const handleConfirmDonate = async () => {
        // Don't let demo users confirm a donation
        if (checkDemoRestriction()) {
            return;
        }

        try {
            await axiosSecure.put(`/requests/${id}`, {
                donation_status: 'inprogress',
                donorName: user.displayName,
                donorEmail: user.email
            });

            Swal.fire({
                title: "Success!",
                text: "Thank you for confirming your donation. The requester will be notified.",
                icon: "success",
                confirmButtonColor: "#dc2626"
            });
            setShowDonateModal(false);

            const res = await axiosSecure.get(`/requests/${id}`);
            setRequestData(res.data);

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to confirm donation", "error");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'inprogress':
                return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'done':
                return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'canceled':
                return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            default:
                return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-base-content/70 text-sm sm:text-base">Loading request details...</p>
                </div>
            </div>
        );
    }

    if (!requestData) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-2">Request Not Found</h2>
                    <p className="text-base-content/70 mb-6">The requested donation request could not be found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn bg-gradient-to-r from-red-600 to-red-700 text-white border-0 hover:from-red-700 hover:to-red-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back button and page title */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost btn-sm mb-4 text-base-content hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 sm:gap-3  px-3 sm:px-4 py-2 rounded-full mb-4 add border-2 border-red-600">
                            <Droplet className="text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-400" size={16} />
                            <span className="text-red-600 dark:text-red-500 font-bold text-xs sm:text-sm">BLOOD REQUEST</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
                            Donation Request Details
                        </h1>
                        <p className="text-base-content/70 text-sm sm:text-base">
                            Help save a life by responding to this urgent request
                        </p>
                    </div>
                </div>

                {/* Donation status (pending, in progress, done) */}
                <div className="mb-6 sm:mb-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-base-300 font-bold text-sm sm:text-base text-green-600 dark:text-green-400">
                        {getStatusIcon(requestData.donation_status)}
                        <span>Status: {requestData.donation_status?.toUpperCase()}</span>
                    </div>
                </div>

                {/* Patient request info and donor contact card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <ViewRequestDetails requestData={requestData} />
                    <ViewRequestSidebar
                        requestData={requestData}
                        user={user}
                        id={id}
                        navigate={navigate}
                        setShowDonateModal={setShowDonateModal}
                        checkDemoRestriction={checkDemoRestriction}
                    />
                </div>

                {/* Popup to confirm blood donation */}
                <DonateConfirmModal
                    showDonateModal={showDonateModal}
                    setShowDonateModal={setShowDonateModal}
                    user={user}
                    handleConfirmDonate={handleConfirmDonate}
                />
            </div>
        </div>
    );
};

export default ViewRequest;
