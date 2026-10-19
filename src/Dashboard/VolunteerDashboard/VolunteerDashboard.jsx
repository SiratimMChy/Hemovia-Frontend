import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import VolunteerStatCards from './VolunteerStatCards';
import VolunteerAnalytics from './VolunteerAnalytics';
import VolunteerRecentActivity from './VolunteerRecentActivity';

const VolunteerDashboard = () => {
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

  const [volunteerStats, setVolunteerStats] = useState({
    totalVolunteers: 0,
    activeVolunteers: 0,
    helpedRequests: 0,
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
        const allUsers = usersRes.data.users || [];
        const donors = allUsers.filter((u) => u.role?.toLowerCase() === 'donor');
        const volunteers = allUsers.filter((u) => u.role?.toLowerCase() === 'volunteer');

        setTotalUsers(donors.length);
        setRecentUsers(allUsers.slice(0, 5));
        setVolunteerStats({
          totalVolunteers: volunteers.length,
          activeVolunteers: volunteers.filter((v) => v.status === 'active').length,
          helpedRequests: Math.floor(volunteers.length * 2.5),
        });

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
        console.error('Error fetching dashboard data:', err);
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
            Welcome, <span className="text-red-600">{userData?.name || user?.displayName || 'Volunteer'}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
            Support the life-saving mission and oversee community contributions.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <VolunteerStatCards
        stats={requestStats}
        volunteerStats={volunteerStats}
        totalFunding={totalFunding}
        totalUsers={totalUsers}
      />

      {/* Analytics & Impact Overview */}
      <VolunteerAnalytics
        stats={requestStats}
        volunteerStats={volunteerStats}
        totalRequests={totalRequests}
        userData={userData}
      />

      {/* Recent Activity Tables */}
      <VolunteerRecentActivity
        recentRequests={recentRequests}
        recentUsers={recentUsers}
        loading={loading}
      />
    </div>
  );
};

export default VolunteerDashboard;