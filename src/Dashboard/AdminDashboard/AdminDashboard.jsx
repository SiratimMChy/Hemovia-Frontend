import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AdminStatCards from './AdminStatCards';
import AdminAnalytics from './AdminAnalytics';
import AdminRecentActivities from './AdminRecentActivities';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [requestStats, setRequestStats] = useState({
    pending: 0,
    inprogress: 0,
    done: 0,
    canceled: 0,
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error('Error fetching user data:', err));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axiosSecure.get('/users?page=0&size=1000');
        const donors =
          usersRes.data.users?.filter((u) => u.role?.toLowerCase() === 'donor') || [];
        setTotalUsers(donors.length);
        setRecentUsers(usersRes.data.users?.slice(0, 5) || []);

        const paymentsRes = await axiosSecure.get('/payment?page=0&size=1000');
        const total =
          paymentsRes.data.requests?.reduce(
            (sum, payment) => sum + Number(payment.amount || 0),
            0
          ) || 0;
        setTotalFunding(total);

        const requestsRes = await axiosSecure.get('/requests?page=0&size=1000');
        const requests = requestsRes.data.requests || [];
        setTotalRequests(requests.length);
        setRecentRequests(requests.slice(0, 5));

        setRequestStats({
          pending: requests.filter((r) => r.donation_status === 'pending').length,
          inprogress: requests.filter((r) => r.donation_status === 'inprogress').length,
          done: requests.filter((r) => r.donation_status === 'done').length,
          canceled: requests.filter((r) => r.donation_status === 'canceled').length,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1 border-b border-base-300">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-base-content tracking-tight">
            Welcome, <span className="text-red-600">{userData?.name || user?.displayName || 'Admin'}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
            Platform governance and real-time life-saving metrics overview.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <AdminStatCards
        totalUsers={totalUsers}
        requestStats={requestStats}
        totalFunding={totalFunding}
        totalRequests={totalRequests}
      />

      {/* Analytics & Platform Health */}
      <AdminAnalytics
        requestStats={requestStats}
        totalRequests={totalRequests}
        totalUsers={totalUsers}
        userData={userData}
      />

      {/* Recent Activity Tables */}
      <AdminRecentActivities
        recentRequests={recentRequests}
        recentUsers={recentUsers}
        loading={loading}
      />
    </div>
  );
};

export default AdminDashboard;