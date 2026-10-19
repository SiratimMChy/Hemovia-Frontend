import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import {
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
    FaTimesCircle
} from 'react-icons/fa';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const Search = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [donors, setDonors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();

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

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = encodeURIComponent(e.target.bloodGroup.value);

        if (!bloodGroup && !district && !upazila) {
            alert('Please select at least one search criteria');
            return;
        }

        setIsLoading(true);
        axiosInstance.get(`/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setIsSearched(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/dashboard/view-request/${id}`);
        } else {
            navigate('/login');
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return {
                    label: 'Pending',
                    icon: <FaExclamationCircle className="w-3 h-3 text-amber-500 shrink-0" />,
                    classes: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                };
            case 'inprogress':
                return {
                    label: 'In Progress',
                    icon: <FaClock className="w-3 h-3 text-blue-500 shrink-0" />,
                    classes: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                };
            case 'done':
                return {
                    label: 'Completed',
                    icon: <FaCheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />,
                    classes: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                };
            case 'canceled':
                return {
                    label: 'Canceled',
                    icon: <FaTimesCircle className="w-3 h-3 text-red-500 shrink-0" />,
                    classes: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/60'
                };
            default:
                return {
                    label: status || 'Pending',
                    icon: <FaExclamationCircle className="w-3 h-3 text-amber-500 shrink-0" />,
                    classes: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                };
        }
    };

    return (
        <div className="min-h-screen bg-base-100 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4 tracking-tight">
                        Search Blood Donors
                    </h1>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Find available donors in your area. Fill in the search criteria to get started.
                    </p>
                </div>

                {/* Search Form */}
                <SearchForm
                    handleSearch={handleSearch}
                    isLoading={isLoading}
                    districts={districts}
                    district={district}
                    setDistrict={setDistrict}
                    upazila={upazila}
                    setUpazila={setUpazila}
                    filteredUpazilas={filteredUpazilas}
                />

                {/* Results Section */}
                <SearchResults
                    donors={donors}
                    isSearched={isSearched}
                    getStatusBadge={getStatusBadge}
                    handleViewDetails={handleViewDetails}
                />
            </div>
        </div>
    );
};

export default Search;
