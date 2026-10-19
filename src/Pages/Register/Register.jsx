import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0];
        const bloodGroup = e.target.bloodGroup.value;

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!uppercase.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }
        if (!lowercase.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API_KEY}`, { image: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        const imageUrl = res.data.data.display_url;

        const formData = {
            email,
            password,
            name,
            imageUrl,
            bloodGroup,
            district,
            upazila
        };

        if (res.data.success === true) {
            createUser(email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: imageUrl
                    }).then(() => {
                        axios.post(`${import.meta.env.VITE_LOCALHOST_URL || import.meta.env.VITE_API_URL}/users`, formData)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.error(err);
                            });
                        
                        logOut().then(() => {
                            toast.success('Registration successful! Please login.');
                            navigate('/login');
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch(error => {
                    toast.error(error.message);
                    console.error(error);
                });
        }
    };

    return (
        <div className='min-h-screen bg-base-100 flex items-center justify-center px-4 py-10'>
            <title>Registration</title>
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-base-content mb-4 tracking-tight">
                        Join Our <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Community</span>
                    </h1>
                    <p className="text-base-content/60 text-base">
                        Create your account and start saving lives today
                    </p>
                </div>

                <RegisterForm
                    handleSubmit={handleSubmit}
                    district={district}
                    setDistrict={setDistrict}
                    upazila={upazila}
                    setUpazila={setUpazila}
                    districts={districts}
                    filteredUpazilas={filteredUpazilas}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />
            </div>
        </div>
    );
};

export default Register;
