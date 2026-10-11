import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import HeroBanner from '../Components/Home/HeroBanner';
import HowItWorks from '../Components/Home/HowItWorks';
import FeaturedCenters from '../Components/Home/FeaturedCenters';
import LiveImpact from '../Components/Home/LiveImpact';
import BloodCompatibilitySection from './BloodCompatibilitySection';
import FAQPage from './FAQPage';
import ContactSection from '../Components/Home/ContactSection';

const Home = () => {
  const { user, role } = useContext(AuthContext);

  const getDashboardPath = () => {
    if (!user) return '/signup';

    const routes = {
      admin: '/dashboard/admindashboard',
      volunteer: '/dashboard/volunteerdashboard',
      donor: '/dashboard/donordashboard'
    };

    return routes[role] || '/dashboard';
  };

  const [centersData, setCentersData] = useState([]);
  const [livesSaved, setLivesSaved] = useState(0);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [apiStats, setApiStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    successRate: 0,
    pendingRequests: 0
  });
  const axiosInstance = useAxios();

  const formatCount = (count) => {
    if (count >= 100) return '100+';
    if (count >= 50) return '50+';
    if (count >= 25) return '25+';
    if (count >= 10) return '10+';
    return count.toString();
  };

  useEffect(() => {
    axios.get('/centers.json')
      .then(res => {
        setCentersData(res.data);
      });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      try {
        const response = await axiosInstance.get('/public-stats');
        const { successRate, totalRequests, totalDonors } = response.data;

        const messageStatsResponse = await axiosInstance.get('/request-message-stats');
        const { emergencyCases, surgeriesEnabled, familiesHelped } = messageStatsResponse.data;

        const estimatedDone = Math.round((successRate / (100 - successRate)) * totalRequests);
        setLivesSaved(estimatedDone > 0 ? estimatedDone : 0);

        setApiStats({
          totalDonors: totalDonors,
          totalRequests: totalRequests + estimatedDone,
          successRate: successRate,
          pendingRequests: totalRequests,
          emergencyCases: emergencyCases || 0,
          surgeriesEnabled: surgeriesEnabled || 0,
          chronicCare: familiesHelped || 0
        });
      } catch (err) {
        console.error(err);
        setLivesSaved(0);
        setApiStats(prev => ({
          ...prev,
          emergencyCases: 0,
          surgeriesEnabled: 0,
          chronicCare: 0
        }));
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchStats();
  }, [axiosInstance]);

  return (
    <div className="min-h-screen bg-base-100">
      <HeroBanner
        user={user}
        getDashboardPath={getDashboardPath}
        isStatsLoading={isStatsLoading}
        apiStats={apiStats}
        livesSaved={livesSaved}
        centersData={centersData}
        formatCount={formatCount}
      />
      <HowItWorks />
      <FeaturedCenters centersData={centersData} />
      <LiveImpact
        livesSaved={livesSaved}
        apiStats={apiStats}
        formatCount={formatCount}
      />
      <BloodCompatibilitySection />
      <FAQPage />
      <ContactSection />
    </div>
  );
};

export default Home;