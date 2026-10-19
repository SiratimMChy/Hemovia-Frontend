import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Plus } from 'lucide-react';
import DonorStatCards from './DonorStatCards';
import DonorAnalytics from './DonorAnalytics';
import DonorRecentRequests from './DonorRecentRequests';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    canceledRequests: 0,
  });

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      const fetchUserData = axiosSecure.get(`/users/role/${user.email}`);
      const fetchRequests = axiosSecure.get('/myRequests?page=0&size=1000');

      Promise.all([fetchUserData, fetchRequests])
        .then(([userRes, reqRes]) => {
          setUserData(userRes.data);
          const requests = reqRes.data.requests || [];
          setMyRequests(requests.slice(0, 5));
          setDashboardStats({
            totalRequests: requests.length,
            pendingRequests: requests.filter((r) => r.donation_status === 'pending').length,
            completedRequests: requests.filter((r) => r.donation_status === 'done').length,
            canceledRequests: requests.filter((r) => r.donation_status === 'canceled').length,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching donor dashboard:', err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const completionRate =
    dashboardStats.totalRequests > 0
      ? Math.round((dashboardStats.completedRequests / dashboardStats.totalRequests) * 100)
      : 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Focused Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-base-content">
            Welcome, <span className="text-red-600 font-extrabold">{userData?.name || user?.displayName || 'Donor'}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-base-content/70 mt-0.5">
            Your kindness helps save lives every day.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/addRequest"
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none rounded-xl text-xs font-semibold gap-1.5 shadow-xs"
          >
            <Plus size={15} />
            <span>Create Request</span>
          </Link>
        </div>
      </div>

      {/* 4 Focused KPI Stat Cards */}
      <DonorStatCards stats={dashboardStats} completionRate={completionRate} />

      {/* Analytics & Metrics */}
      <DonorAnalytics stats={dashboardStats} completionRate={completionRate} userData={userData} />

      {/* Recent Requests Data Table */}
      <DonorRecentRequests requests={myRequests} loading={loading} />
    </div>
  );
};

export default DonorDashboard;