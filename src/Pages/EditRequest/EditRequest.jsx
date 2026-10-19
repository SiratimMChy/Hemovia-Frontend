import { Droplet } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import EditRequestForm from './EditRequestForm';

const EditRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [requestData, setRequestData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const axiosSecure = useAxiosSecure();

    // fetch user role
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserRole(res.data.role);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json')
            .then(res => setDistricts(res.data.districts));
    }, []);

    const selectedDistrictObj = districts.find(d => d.name === district);
    const filteredUpazilas = selectedDistrictObj
        ? upazilas.filter(u => u.district_id === selectedDistrictObj.id)
        : [];

    // load request data
    useEffect(() => {
        if (!id || !user?.email || !userRole) return;

        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                const isOwner = res.data.requesterEmail.toLowerCase() === user.email.toLowerCase();
                const isAdmin = userRole === 'admin';

                if (!isOwner && !isAdmin) {
                    Swal.fire({
                        title: "Unauthorized",
                        text: "You are not authorized to edit this request",
                        icon: "error"
                    }).then(() => {
                        if (isAdmin) {
                            navigate('/dashboard/allRequest');
                        } else {
                            navigate('/dashboard/myRequest');
                        }
                    });
                }
                setRequestData(res.data);
                setDistrict(res.data.recipientDistrict);
                setUpazila(res.data.recipientUpazila);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to load request data",
                    icon: "error"
                });
            });
    }, [id, user, userRole, axiosSecure, navigate]);

    // update request
    const handleUpdateRequest = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            requesterName: form.requesterName.value,
            requesterEmail: form.requesterEmail.value,
            recipientName: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            mobile: form.mobile.value,
            donation_status: requestData.donation_status,
            createdAt: requestData.createdAt
        };

        axiosSecure.put(`/requests/${id}`, updatedData)
            .then(() => {
                Swal.fire({
                    title: "Successfully Updated",
                    icon: "success"
                });
                navigate('/dashboard/myRequest');
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to update request",
                    icon: "error"
                });
            });
    };

    // loading guard
    if (!requestData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-start sm:items-center justify-center px-3 sm:px-6 py-6">
            <div className="w-full max-w-3xl bg-base-200 rounded-xl sm:rounded-2xl shadow-lg border border-base-300 p-4 sm:p-6 md:p-8">
                <h2 className="flex items-center justify-center gap-1 text-sm sm:text-2xl font-semibold text-red-600 dark:text-red-400 mb-6 text-center">
                    <Droplet className="text-red-600 dark:text-red-400" size={28} />
                    Edit Blood Donation Request
                </h2>

                <EditRequestForm
                    requestData={requestData}
                    district={district}
                    setDistrict={setDistrict}
                    upazila={upazila}
                    setUpazila={setUpazila}
                    districts={districts}
                    filteredUpazilas={filteredUpazilas}
                    handleUpdateRequest={handleUpdateRequest}
                    onCancel={() => navigate('/dashboard/myRequest')}
                />
            </div>
        </div>
    );
};

export default EditRequest;
