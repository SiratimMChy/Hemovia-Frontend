import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import {
    FaSearch,
    FaTint,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaUser,
    FaHospital,
    FaCalendarAlt,
    FaClock,
    FaEye,
    FaCheckCircle,
    FaExclamationCircle,
    FaTimesCircle
} from 'react-icons/fa';

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
                <div className="bg-base-200 rounded-2xl shadow-xl border border-base-300 p-6 md:p-8 mb-12">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {/* Blood Group */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                        <FaTint className="text-red-500" /> Blood Group
                                    </span>
                                </label>
                                <select
                                    name="bloodGroup"
                                    defaultValue=""
                                    className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                >
                                    <option disabled value="">Choose Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-red-500" /> District
                                    </span>
                                </label>
                                <select
                                    value={district}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                        setUpazila('');
                                    }}
                                    className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                >
                                    <option value="">Choose District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-red-500" /> Upazila
                                    </span>
                                </label>
                                <select
                                    value={upazila}
                                    onChange={(e) => setUpazila(e.target.value)}
                                    disabled={!district}
                                    className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <option value="">{district ? 'Choose Upazila' : 'Select district first'}</option>
                                    {filteredUpazilas.map(u => (
                                        <option key={u.id} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 px-12 py-3 text-lg font-semibold flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <FaSearch /> Search Donors
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {isSearched && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                Search Results
                            </h2>
                            <span className="badge badge-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold border-0">
                                {donors.length} {donors.length === 1 ? 'Donor' : 'Donors'} Found
                            </span>
                        </div>

                        {donors.length === 0 ? (
                            <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 p-12 text-center">
                                <div className="text-base-content/40 mb-4">
                                    <FaSearch size={56} className="mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold text-base-content mb-2">No Donors Found</h3>
                                <p className="text-base-content/70">
                                    No donors match your search criteria. Try adjusting your filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {donors.map((donor) => {
                                    const badge = getStatusBadge(donor.donation_status);
                                    return (
                                        <div
                                            key={donor._id}
                                            className="bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-base-300 overflow-hidden flex flex-col justify-between min-h-[440px] h-full"
                                        >
                                            {/* Card Header */}
                                            <div className="pt-5 sm:pt-6 px-4 sm:px-5 pb-3.5 sm:pb-4 border-b border-base-300 flex items-center justify-between gap-3 bg-base-200">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 font-black text-sm sm:text-base tracking-wider shrink-0">
                                                        <FaTint className="text-white text-xs sm:text-sm shrink-0" />
                                                        <span>{donor.bloodGroup}</span>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-bold text-base md:text-lg text-base-content leading-tight truncate" title={donor.recipientName}>
                                                            {donor.recipientName}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Status Pill */}
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${badge.classes}`}>
                                                    {badge.icon}
                                                    <span>{badge.label}</span>
                                                </span>
                                            </div>

                                            {/* Card Body - Professional Details */}
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <div className="space-y-3.5">
                                                    {/* Location */}
                                                    <div className="flex items-start gap-3">
                                                        <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={15} />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Location</p>
                                                            <p className="text-sm font-medium text-base-content truncate" title={`${donor.recipientUpazila ? `${donor.recipientUpazila}, ` : ''}${donor.recipientDistrict}`}>
                                                                {donor.recipientUpazila ? `${donor.recipientUpazila}, ` : ''}{donor.recipientDistrict}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Contact */}
                                                    {donor.mobile && (
                                                        <div className="flex items-start gap-3">
                                                            <FaPhone className="text-red-500 mt-1 shrink-0" size={14} />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Contact</p>
                                                                <a
                                                                    href={`tel:${donor.mobile}`}
                                                                    className="text-sm font-semibold text-base-content hover:text-red-600 transition-colors truncate block"
                                                                    title={donor.mobile}
                                                                >
                                                                    {donor.mobile}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Hospital */}
                                                    {donor.hospitalName && (
                                                        <div className="flex items-start gap-3">
                                                            <FaHospital className="text-red-500 mt-1 shrink-0" size={15} />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Hospital</p>
                                                                <p className="text-sm text-base-content/80 font-medium truncate" title={donor.hospitalName}>
                                                                    {donor.hospitalName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Donation Date & Time */}
                                                    {(donor.donationDate || donor.donationTime) && (
                                                        <div className="pt-2.5 border-t border-base-300">
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {donor.donationDate && (
                                                                    <div className="flex items-start gap-2">
                                                                        <FaCalendarAlt className="text-red-500 mt-0.5 shrink-0" size={13} />
                                                                        <div className="min-w-0">
                                                                            <p className="text-xs text-base-content/60 font-semibold">Date</p>
                                                                            <p className="text-xs text-base-content/80 font-medium truncate">{donor.donationDate}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {donor.donationTime && (
                                                                    <div className="flex items-start gap-2">
                                                                        <FaClock className="text-red-500 mt-0.5 shrink-0" size={13} />
                                                                        <div className="min-w-0">
                                                                            <p className="text-xs text-base-content/60 font-semibold">Time</p>
                                                                            <p className="text-xs text-base-content/80 font-medium truncate">{donor.donationTime}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* View Button Footer */}
                                                <div className="pt-3 border-t border-base-300">
                                                    <button
                                                        onClick={() => handleViewDetails(donor._id)}
                                                        className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full flex items-center justify-center gap-2 font-semibold"
                                                    >
                                                        <FaEye size={16} />
                                                        <span>View Details</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;