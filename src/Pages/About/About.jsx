import { useState, useEffect } from 'react';
import { Heart, Users, Award, Shield, Target, Activity } from 'lucide-react';
import useAxios from '../../Hooks/useAxios';
import AboutHero from './AboutHero';
import AboutStats from './AboutStats';
import AboutMissionVision from './AboutMissionVision';
import AboutValues from './AboutValues';
import AboutNetwork from './AboutNetwork';
import AboutLiveStats from './AboutLiveStats';
import AboutCta from './AboutCta';

const About = () => {
  const [centersData, setCentersData] = useState([]);
  const [livesSaved, setLivesSaved] = useState(0);
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
    axiosInstance.get('/centers')
      .then(res => {
        setCentersData(res.data.centers);
      });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/public-stats');
        console.log('Public stats response:', response.data);
        const { successRate, totalRequests, totalDonors } = response.data;
        const estimatedDone = Math.round((successRate / (100 - successRate)) * totalRequests);
        setLivesSaved(estimatedDone > 0 ? estimatedDone : 0);
        setApiStats({
          totalDonors: totalDonors,
          totalRequests: totalRequests + estimatedDone, 
          successRate: successRate,
          pendingRequests: totalRequests 
        });
      } catch (err) {
        console.error(err);
        setLivesSaved(0);
      }
    };
    fetchStats();
  }, [axiosInstance]);

  const stats = {
    totalDonors: formatCount(apiStats.totalDonors),
    successfulDonations: livesSaved,
    totalCenters: formatCount(centersData.length),
    totalCities: [...new Set(centersData.map(center => center.district))].length,
    totalDivisions: [...new Set(centersData.map(center => center.division))].length,
    totalRequests: formatCount(apiStats.totalRequests),
    pendingRequests: formatCount(apiStats.pendingRequests),
    successRate: apiStats.successRate
  };

  const displayStats = [
    { 
      icon: Users, 
      value: `${stats.totalDonors}`, 
      label: 'Active Donors', 
      color: 'red' 
    },
    { 
      icon: Heart, 
      value: `${stats.successfulDonations}`, 
      label: 'Lives Saved', 
      color: 'red' 
    },
    { 
      icon: Activity, 
      value: `${stats.totalCenters}`, 
      label: 'Blood Banks', 
      color: 'red' 
    },
    { 
      icon: Award, 
      value: `${stats.totalCities}+`, 
      label: 'Cities Covered', 
      color: 'red' 
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the willingness to help others in their time of need.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'We maintain the highest standards of safety and privacy to protect both donors and recipients.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong network of donors and recipients who support each other in saving lives.'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Every donation matters. We focus on creating meaningful connections that save lives.'
    }
  ];

  const getCentersByDivision = (division) => {
    return centersData.filter(center => center.division === division);
  };

  const divisions = [...new Set(centersData.map(center => center.division))];

  return (
    <div className="min-h-screen bg-base-100">
      <AboutHero stats={stats} />
      <AboutStats displayStats={displayStats} />
      <AboutMissionVision stats={stats} />
      <AboutValues values={values} />
      <AboutNetwork stats={stats} divisions={divisions} getCentersByDivision={getCentersByDivision} />
      <AboutLiveStats stats={stats} />
      <AboutCta stats={stats} />
    </div>
  );
};

export default About;
