import { Droplet } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAxios from '../Hooks/useAxios';
import { bloodTypes, compatibilityData, getDemandLevel } from '../Components/BloodCompatibility/compatibilityData';
import CompatibilityMatches from '../Components/BloodCompatibility/CompatibilityMatches';
import CompatibilityChart from '../Components/BloodCompatibility/CompatibilityChart';

const BloodCompatibilitySection = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('O+');
  const [viewMode, setViewMode] = useState('all');
  const [stats, setStats] = useState({ totalDonors: 0, totalRequests: 0, successRate: 0, bloodTypeCounts: {} });
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsRes = await axios.get('/public-stats');
        setStats({
          totalDonors: statsRes.data.totalDonors,
          totalRequests: statsRes.data.totalRequests,
          successRate: statsRes.data.successRate,
          bloodTypeCounts: statsRes.data.bloodTypeCounts || {}
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setStats({ totalDonors: 0, totalRequests: 0, successRate: 96, bloodTypeCounts: {} });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axios]);

  if (loading) {
    return (
      <div className="py-16 bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-red-200 dark:border-red-900/50 rounded-full animate-spin border-t-red-500 mx-auto mb-3"></div>
            <Droplet className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500" size={16} />
          </div>
          <p className="text-sm text-base-content/70 font-medium">Loading compatibility...</p>
        </div>
      </div>
    );
  }

  const selectedBlood = compatibilityData[selectedBloodType];
  const selectedCount = stats.bloodTypeCounts[selectedBloodType] || 0;
  const demandLevel = getDemandLevel(selectedBloodType, stats);

  return (
    <div className="py-12 md:py-16 bg-base-100 relative">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full mb-3">
            <Droplet className="text-red-600 fill-red-600" size={13} />
            <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
              Compatibility Checker
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-2">
            Blood Type Compatibility
          </h2>
          <p className="text-sm sm:text-base text-base-content/70 max-w-xl mx-auto">
            Select your blood group to see who you can safely donate to and receive blood from.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {bloodTypes.map((type) => {
            const isSelected = selectedBloodType === type;
            const reqCount = stats.bloodTypeCounts[type] || 0;
            return (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-1.5 ${
                  isSelected ? 'bg-red-600 text-white shadow-md scale-105' : 'bg-base-200 hover:bg-base-300 text-base-content border border-base-300'
                }`}
              >
                <span>{type}</span>
                {reqCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isSelected ? 'bg-white/20 text-white' : 'bg-base-300 text-base-content/70'}`}>
                    {reqCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <CompatibilityMatches
            selectedBloodType={selectedBloodType}
            selectedBlood={selectedBlood}
            selectedCount={selectedCount}
            demandLevel={demandLevel}
            viewMode={viewMode}
            setViewMode={setViewMode}
            bloodTypes={bloodTypes}
            onSelectBloodType={setSelectedBloodType}
          />
          <CompatibilityChart
            stats={stats}
            selectedBloodType={selectedBloodType}
            onSelectBloodType={setSelectedBloodType}
            selectedCount={selectedCount}
          />
        </div>
      </div>
    </div>
  );
};

export default BloodCompatibilitySection;