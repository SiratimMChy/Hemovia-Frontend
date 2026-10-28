import { ArrowLeft, Droplet, AlertTriangle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import { getStatusColor, getStatusIcon } from '../../Dashboard/utils/requestHelpers';
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
        setLoading(true);
        axiosSecure.get(`/requests/${id}`)
            .then(res => setRequestData(res.data))
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to load request data', 'error');
            })
            .finally(() => setLoading(false));
    }, [id, axiosSecure]);

    const handleConfirmDonate = async () => {
        if (checkDemoRestriction()) return;
        try {
            await axiosSecure.put(`/requests/${id}`, {
                donation_status: 'inprogress',
                donorName: user?.displayName || user?.name || 'Anonymous Donor',
                donorEmail: user?.email
            });
            Swal.fire({
                title: 'Donation Confirmed!',
                text: 'Thank you for stepping forward. The requester has been notified.',
                icon: 'success',
                confirmButtonColor: '#dc2626'
            });
            setShowDonateModal(false);
            const res = await axiosSecure.get(`/requests/${id}`);
            setRequestData(res.data);
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to confirm donation', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] bg-base-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-red-600"></span>
                    <p className="text-base-content/60 text-sm mt-3 font-medium">Loading request details...</p>
                </div>
            </div>
        );
    }

    if (!requestData) {
        return (
            <div className="min-h-[70vh] bg-base-100 flex items-center justify-center px-4">
                <div className="text-center bg-base-200 border border-base-300 rounded-2xl p-8 max-w-md w-full shadow-lg">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-base-content mb-1">Request Not Found</h2>
                    <p className="text-base-content/60 text-sm mb-6">This donation request could not be found or has been removed.</p>
                    <button onClick={() => navigate(-1)} className="btn bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0 w-full rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                {/* Modern Redesigned Header */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/60 hover:text-red-600 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 text-xs font-bold uppercase tracking-wider mb-2">
                                <Droplet size={12} className="fill-red-600 dark:fill-red-400" />
                                <span>Blood Donation Request</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-base-content tracking-tight">
                                Donation Request Details
                            </h1>
                            <p className="text-sm text-base-content/60 mt-1">
                                Review patient requirements and confirm your voluntary donation
                            </p>
                        </div>

                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border capitalize self-start sm:self-center shadow-xs ${getStatusColor(requestData.donation_status)}`}>
                            {getStatusIcon(requestData.donation_status)}
                            <span>Status: {requestData.donation_status || 'Pending'}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid (Row 1 & Row 2 aligned) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
