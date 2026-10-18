import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { 
    FileText, 
    Clock, 
    CheckCircle, 
    XCircle, 
    TrendingUp, 
    Calendar, 
    Activity, 
    Plus, 
    MapPin, 
    Eye, 
    ArrowUpRight, 
    Droplets, 
    ShieldCheck, 
    HeartHandshake,
    AlertCircle
} from 'lucide-react';
import { MdBloodtype } from 'react-icons/md';
import { compatibilityData } from '../../Components/BloodCompatibility/compatibilityData';

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState({
        totalRequests: 0,
        pendingRequests: 0,
        inprogressRequests: 0,
        completedRequests: 0,
        canceledRequests: 0
    });

    useEffect(() => {
        if (user?.email) {
            setLoading(true);

            // Fetch user profile info
            const fetchUserData = axiosSecure.get(`/users/role/${user.email}`);
            
            // Fetch user requests
            const fetchRequests = axiosSecure.get('/myRequests?page=0&size=1000');

            Promise.all([fetchUserData, fetchRequests])
                .then(([userRes, reqRes]) => {
                    setUserData(userRes.data);

                    const requests = reqRes.data.requests || [];
                    setMyRequests(requests.slice(0, 5)); // Recent 5 requests

                    const stats = {
                        totalRequests: requests.length,
                        pendingRequests: requests.filter(r => r.donation_status === 'pending').length,
                        inprogressRequests: requests.filter(r => r.donation_status === 'inprogress').length,
                        completedRequests: requests.filter(r => r.donation_status === 'done').length,
                        canceledRequests: requests.filter(r => r.donation_status === 'canceled').length
                    };
                    setDashboardStats(stats);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching donor dashboard data:', err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Completion percentage calculation
    const completionRate = dashboardStats.totalRequests > 0 
        ? Math.round((dashboardStats.completedRequests / dashboardStats.totalRequests) * 100)
        : 0;

    // Donor blood group data
    const userBloodGroup = userData?.bloodGroup || 'O+';
    const bloodInfo = compatibilityData[userBloodGroup] || compatibilityData['O+'];

    // Status pill style generator
    const getStatusBadge = (status) => {
        switch (status) {
            case 'done':
                return {
                    label: 'Completed',
                    classes: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                    dotClass: 'bg-emerald-500'
                };
            case 'inprogress':
                return {
                    label: 'In Progress',
                    classes: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
                    dotClass: 'bg-blue-500 animate-pulse'
                };
            case 'pending':
                return {
                    label: 'Pending',
                    classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
                    dotClass: 'bg-amber-500'
                };
            case 'canceled':
                return {
                    label: 'Canceled',
                    classes: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
                    dotClass: 'bg-rose-500'
                };
            default:
                return {
                    label: status || 'Unknown',
                    classes: 'bg-base-300 text-base-content/70 border border-base-300',
                    dotClass: 'bg-base-content/40'
                };
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 p-2 sm:p-4 max-w-7xl mx-auto animate-pulse">
                {/* Hero skeleton */}
                <div className="h-44 bg-base-200 rounded-3xl border border-base-300"></div>
                {/* KPI stats skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-base-200 rounded-2xl border border-base-300"></div>
                    ))}
                </div>
                {/* Content grid skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 h-64 bg-base-200 rounded-2xl border border-base-300"></div>
                    <div className="lg:col-span-5 h-64 bg-base-200 rounded-2xl border border-base-300"></div>
                </div>
                {/* Table skeleton */}
                <div className="h-72 bg-base-200 rounded-2xl border border-base-300"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 p-1 sm:p-3 md:p-5 max-w-7xl mx-auto">
            {/* 1. HERO / PROFILE WELCOME BANNER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500/10 via-base-200 to-base-200 border border-base-300 rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm">
                {/* Background decorative glow */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: User identity & stats */}
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="relative shrink-0">
                            {user?.photoURL || userData?.imageUrl ? (
                                <img 
                                    src={user?.photoURL || userData?.imageUrl} 
                                    alt={userData?.name || 'User'} 
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-red-500/30 shadow-md"
                                />
                            ) : (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md">
                                    {(userData?.name || user?.displayName || 'D').charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-base-100 rounded-full" title="Active"></div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                    Donor
                                </span>
                                {userData?.bloodGroup && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-base-300 text-base-content flex items-center gap-1 border border-base-content/10">
                                        <MdBloodtype className="text-red-600" size={14} />
                                        {userData.bloodGroup}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-base-content">
                                Welcome back, <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{userData?.name || user?.displayName || 'Donor'}</span>!
                            </h1>

                            <p className="text-xs sm:text-sm text-base-content/70 mt-1 flex items-center gap-2 flex-wrap">
                                <span>Your kindness helps save lives every single day.</span>
                                {(userData?.district || userData?.upazila) && (
                                    <span className="inline-flex items-center gap-1 text-base-content/60 font-medium">
                                        <MapPin size={13} className="text-red-500" />
                                        {[userData?.upazila, userData?.district].filter(Boolean).join(', ')}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            to="/dashboard/addRequest"
                            className="btn btn-sm sm:btn-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-none rounded-xl shadow-md shadow-red-600/20 font-semibold gap-2"
                        >
                            <Plus size={18} />
                            <span>Create Request</span>
                        </Link>
                        <Link
                            to="/dashboard/myRequest"
                            className="btn btn-sm sm:btn-md btn-outline border-base-300 hover:border-red-500 hover:bg-base-200 text-base-content rounded-xl font-medium"
                        >
                            <span>My Requests</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. OVERVIEW KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Card 1: Total Requests */}
                <div className="bg-base-200/70 border border-base-300 hover:border-red-500/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            Total Requests
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                            {dashboardStats.totalRequests}
                        </h3>
                    </div>
                    <p className="text-xs text-base-content/50 mt-1">
                        All-time blood requests
                    </p>
                </div>

                {/* Card 2: Pending Requests */}
                <div className="bg-base-200/70 border border-base-300 hover:border-amber-500/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            Pending
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                            {dashboardStats.pendingRequests}
                        </h3>
                        {dashboardStats.pendingRequests > 0 && (
                            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                Needs Donor
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-base-content/50 mt-1">
                        Awaiting donor match
                    </p>
                </div>

                {/* Card 3: In Progress */}
                <div className="bg-base-200/70 border border-base-300 hover:border-blue-500/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            In Progress
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                            {dashboardStats.inprogressRequests}
                        </h3>
                    </div>
                    <p className="text-xs text-base-content/50 mt-1">
                        Donor accepted & active
                    </p>
                </div>

                {/* Card 4: Completed Donations */}
                <div className="bg-base-200/70 border border-base-300 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            Completed
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                            {dashboardStats.completedRequests}
                        </h3>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            {completionRate}% Rate
                        </span>
                    </div>
                    <p className="text-xs text-base-content/50 mt-1">
                        Lives saved successfully
                    </p>
                </div>
            </div>

            {/* 3. MIDDLE SECTION: REQUEST BREAKDOWN + BLOOD COMPATIBILITY WIDGET */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                {/* Left (7 cols): Request Status Distribution */}
                <div className="lg:col-span-7 bg-base-200/70 border border-base-300 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-base-300">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-red-600" size={18} />
                                <h3 className="font-bold text-base sm:text-lg text-base-content">
                                    Request Status Distribution
                                </h3>
                            </div>
                            <span className="text-xs text-base-content/60 font-medium">
                                Total: {dashboardStats.totalRequests}
                            </span>
                        </div>

                        {/* Progress Bars */}
                        <div className="space-y-4">
                            {/* Pending */}
                            <div>
                                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                                    <span className="flex items-center gap-2 text-base-content">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                        Pending
                                    </span>
                                    <span className="text-base-content/70">
                                        {dashboardStats.pendingRequests} ({dashboardStats.totalRequests > 0 ? Math.round((dashboardStats.pendingRequests / dashboardStats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                                <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.pendingRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* In Progress */}
                            <div>
                                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                                    <span className="flex items-center gap-2 text-base-content">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                                        In Progress
                                    </span>
                                    <span className="text-base-content/70">
                                        {dashboardStats.inprogressRequests} ({dashboardStats.totalRequests > 0 ? Math.round((dashboardStats.inprogressRequests / dashboardStats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                                <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.inprogressRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Completed */}
                            <div>
                                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                                    <span className="flex items-center gap-2 text-base-content">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                        Completed
                                    </span>
                                    <span className="text-base-content/70">
                                        {dashboardStats.completedRequests} ({dashboardStats.totalRequests > 0 ? Math.round((dashboardStats.completedRequests / dashboardStats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                                <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.completedRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Canceled */}
                            <div>
                                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                                    <span className="flex items-center gap-2 text-base-content">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                                        Canceled
                                    </span>
                                    <span className="text-base-content/70">
                                        {dashboardStats.canceledRequests} ({dashboardStats.totalRequests > 0 ? Math.round((dashboardStats.canceledRequests / dashboardStats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                                <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-rose-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.canceledRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Metric Tiles at bottom */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-6 pt-5 border-t border-base-300">
                        <div className="bg-base-100 rounded-xl p-3 border border-base-300 text-center">
                            <span className="text-[11px] font-medium text-base-content/60 block">Success Rate</span>
                            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{completionRate}%</span>
                        </div>
                        <div className="bg-base-100 rounded-xl p-3 border border-base-300 text-center">
                            <span className="text-[11px] font-medium text-base-content/60 block">Lives Saved</span>
                            <span className="text-lg font-bold text-red-600 dark:text-red-400">{dashboardStats.completedRequests}</span>
                        </div>
                        <div className="bg-base-100 rounded-xl p-3 border border-base-300 text-center">
                            <span className="text-[11px] font-medium text-base-content/60 block">Active Queue</span>
                            <span className="text-lg font-bold text-base-content">{dashboardStats.pendingRequests + dashboardStats.inprogressRequests}</span>
                        </div>
                    </div>
                </div>

                {/* Right (5 cols): Blood Compatibility & Eligibility Widget */}
                <div className="lg:col-span-5 bg-base-200/70 border border-base-300 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-base-300">
                            <div className="flex items-center gap-2">
                                <Droplets className="text-red-600" size={18} />
                                <h3 className="font-bold text-base sm:text-lg text-base-content">
                                    Blood Compatibility
                                </h3>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                                {userBloodGroup}
                            </span>
                        </div>

                        {/* Blood Type Note */}
                        <div className="bg-base-100 p-3.5 rounded-2xl border border-base-300 mb-4">
                            <div className="flex items-start gap-2.5">
                                <ShieldCheck className="text-red-600 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="text-xs font-bold text-base-content uppercase tracking-wider">
                                        {bloodInfo.description}
                                    </h4>
                                    <p className="text-xs text-base-content/70 mt-0.5 leading-relaxed">
                                        {bloodInfo.note}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Who you can donate to */}
                        <div className="mb-4">
                            <span className="text-xs font-semibold text-base-content/70 block mb-2">
                                You can donate red blood cells to:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {bloodInfo.canDonateTo.map(type => (
                                    <span 
                                        key={type}
                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Who you can receive from */}
                        <div>
                            <span className="text-xs font-semibold text-base-content/70 block mb-2">
                                You can safely receive blood from:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {bloodInfo.canReceiveFrom.map(type => (
                                    <span 
                                        key={type}
                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-base-300 flex items-center justify-between">
                        <span className="text-xs text-base-content/60">
                            Want to learn more?
                        </span>
                        <Link 
                            to="/BloodCom"
                            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
                        >
                            <span>Full Compatibility Chart</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 4. RECENT DONATION REQUESTS TABLE & CARDS */}
            <div className="bg-base-200/70 border border-base-300 rounded-3xl p-5 sm:p-6 shadow-xs">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-base-300">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
                            <FileText size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-base sm:text-lg text-base-content">
                                Recent Donation Requests
                            </h3>
                            <p className="text-xs text-base-content/60">
                                Quick access to your 5 most recently created blood requests
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/dashboard/myRequest"
                        className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline self-start sm:self-auto"
                    >
                        <span>View All Requests</span>
                        <ArrowUpRight size={15} />
                    </Link>
                </div>

                {/* Table / Cards Content */}
                {myRequests.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-base-200/60 text-xs font-bold uppercase tracking-wider text-base-content/70 border-b border-base-300">
                                        <th className="py-3.5 px-4">#</th>
                                        <th className="py-3.5 px-4">Recipient</th>
                                        <th className="py-3.5 px-4">Blood Group</th>
                                        <th className="py-3.5 px-4">Hospital & Location</th>
                                        <th className="py-3.5 px-4">Donation Date</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-base-300 text-sm">
                                    {myRequests.map((request, index) => {
                                        const badge = getStatusBadge(request.donation_status);
                                        return (
                                            <tr key={request._id} className="hover:bg-base-200/50 transition-colors">
                                                <td className="py-3.5 px-4 font-semibold text-base-content/60">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3.5 px-4 font-bold text-base-content">
                                                    {request.recipientName}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                                        <MdBloodtype size={14} />
                                                        {request.bloodGroup}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 font-medium text-base-content/80">
                                                    <div>{request.hospitalName}</div>
                                                    {(request.upazila || request.district) && (
                                                        <div className="text-xs text-base-content/50">
                                                            {[request.upazila, request.district].filter(Boolean).join(', ')}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-4 font-medium text-base-content/80">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={13} className="text-base-content/50" />
                                                        <span>{request.donationDate}</span>
                                                    </div>
                                                    {request.donationTime && (
                                                        <div className="text-xs text-base-content/50 flex items-center gap-1.5 mt-0.5">
                                                            <Clock size={12} />
                                                            <span>{request.donationTime}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${badge.classes}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></span>
                                                        {badge.label}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-center">
                                                    <button
                                                        onClick={() => navigate(`/dashboard/view-request/${request._id}`)}
                                                        className="btn btn-xs btn-ghost text-base-content/70 hover:text-red-600 hover:bg-red-50 dark:hover:bg-base-300 rounded-lg gap-1"
                                                        title="View Request Details"
                                                    >
                                                        <Eye size={14} />
                                                        <span>View</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="md:hidden space-y-3">
                            {myRequests.map((request, index) => {
                                const badge = getStatusBadge(request.donation_status);
                                return (
                                    <div 
                                        key={request._id}
                                        className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-2xs space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-base-content/50">
                                                    #{index + 1}
                                                </span>
                                                <h4 className="font-bold text-sm text-base-content">
                                                    {request.recipientName}
                                                </h4>
                                            </div>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                                <MdBloodtype size={13} />
                                                {request.bloodGroup}
                                            </span>
                                        </div>

                                        <div className="text-xs space-y-1 text-base-content/70">
                                            <div>
                                                <span className="font-semibold text-base-content">Hospital: </span>
                                                <span>{request.hospitalName}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-base-content">Date: </span>
                                                <span>{request.donationDate} {request.donationTime ? `at ${request.donationTime}` : ''}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-base-300">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.classes}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></span>
                                                {badge.label}
                                            </span>
                                            <button
                                                onClick={() => navigate(`/dashboard/view-request/${request._id}`)}
                                                className="btn btn-xs btn-outline border-base-300 text-xs font-medium hover:bg-base-200"
                                            >
                                                <Eye size={13} />
                                                <span>View</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12 px-4">
                        <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <HeartHandshake size={32} />
                        </div>
                        <h4 className="font-bold text-base sm:text-lg text-base-content mb-1">
                            No donation requests yet
                        </h4>
                        <p className="text-xs sm:text-sm text-base-content/60 max-w-sm mx-auto mb-5">
                            You haven't posted any blood donation requests yet. Create a request whenever you or someone you know needs blood.
                        </p>
                        <Link
                            to="/dashboard/addRequest"
                            className="btn btn-sm bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl shadow-md font-semibold gap-1.5"
                        >
                            <Plus size={16} />
                            <span>Create Your First Request</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonorDashboard;