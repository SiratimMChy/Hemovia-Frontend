import { Droplet } from 'lucide-react';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import AddRequestForm from './AddRequestForm';

const AddRequest = () => {
    const { user } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas);
            });

        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts);
            });
    }, []);

    const selectedDistrictObj = districts.find(d => d.name === district);
    const filteredUpazilas = selectedDistrictObj
        ? upazilas.filter(u => u.district_id === selectedDistrictObj.id)
        : [];

    const handleRequest = (e) => {
        e.preventDefault();
        if (checkDemoRestriction()) {
            return;
        }

        const form = e.target;
        const requesterName = form.requesterName.value;
        const requesterEmail = form.requesterEmail.value;
        const recipientName = form.recipientName.value;
        const recipientDistrict = form.recipientDistrict.value;
        const recipientUpazila = form.recipientUpazila.value;
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const bloodGroup = form.bloodGroup.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const requestMessage = form.requestMessage.value;
        const mobile = form.mobile.value;

        const formData = {
            requesterName,
            requesterEmail,
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            mobile,
            donation_status: 'pending'
        };

        axiosSecure.post('/requests', formData)
            .then(res => {
                alert(res.data.insertedId);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen flex items-stretch sm:items-center justify-center px-0 sm:px-6 py-0 sm:py-6 bg-base-100">
            <div className="w-full min-h-screen sm:min-h-0 sm:max-w-3xl bg-base-200 rounded-none sm:rounded-2xl shadow-none sm:shadow-lg p-4 sm:p-6 md:p-8 border-0 sm:border-2 border-base-300">
                <h2 className="flex items-center justify-center gap-1 text-sm sm:text-2xl font-semibold text-red-600 dark:text-red-600 mb-6 text-center">
                    <Droplet className="text-red-600 dark:text-red-600" size={28} />
                    Blood Donation Request
                </h2>

                <AddRequestForm
                    user={user}
                    district={district}
                    setDistrict={setDistrict}
                    upazila={upazila}
                    setUpazila={setUpazila}
                    districts={districts}
                    filteredUpazilas={filteredUpazilas}
                    onSubmit={handleRequest}
                />
            </div>
        </div>
    );
};

export default AddRequest;