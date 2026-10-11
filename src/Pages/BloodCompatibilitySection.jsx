import { ArrowRight, CheckCircle, Droplet, Activity, Shield, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import useAxios from '../Hooks/useAxios';

const BloodCompatibilitySection = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('O+');
  const [viewMode, setViewMode] = useState('all');
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    successRate: 0,
    bloodTypeCounts: {}
  });
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  const bloodTypes = useMemo(() => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], []);

  const compatibilityData = {
    'O-': { canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'], description: 'Universal Donor', rarity: 'Critical' },
    'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'], description: 'Most Common', rarity: 'High' },
    'A-': { canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['A-', 'O-'], description: 'Type A Negative', rarity: 'Medium' },
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A-', 'A+', 'O-', 'O+'], description: 'Type A Positive', rarity: 'Common' },
    'B-': { canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['B-', 'O-'], description: 'Type B Negative', rarity: 'Rare' },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B-', 'B+', 'O-', 'O+'], description: 'Type B Positive', rarity: 'Medium' },
    'AB-': { canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'], description: 'Universal Plasma', rarity: 'Very Rare' },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'], description: 'Universal Recipient', rarity: 'Rare' }
  };

  const bloodColors = {
    'O+': '#dc2626',
    'O-': '#ef4444',
    'A+': '#be123c',
    'A-': '#f43f5e',
    'B+': '#16a34a',
    'B-': '#22c55e',
    'AB+': '#c2410c',
    'AB-': '#ea580c'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const statsRes = await axios.get('/public-stats');
        const statsData = statsRes.data;

        setStats({
          totalDonors: statsData.totalDonors,
          totalRequests: statsData.totalRequests,
          successRate: statsData.successRate,
          bloodTypeCounts: statsData.bloodTypeCounts || {}
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        setStats({
          totalDonors: 0,
          totalRequests: 0,
          successRate: 96,
          bloodTypeCounts: {}
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axios, bloodTypes]);

  const getDemandLevel = (bloodType) => {
    const count = stats.bloodTypeCounts[bloodType] || 0;
    const total = stats.totalRequests || 1;

    if (count > total * 0.2) return { level: 'High', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
    if (count > total * 0.1) return { level: 'Medium', color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' };
    if (count > total * 0.05) return { level: 'Low', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
    return { level: 'Stable', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' };
  };

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
  const demandLevel = getDemandLevel(selectedBloodType);

  return (
    <div className="py-12 md:py-16 bg-base-100 relative">
      <div className="container mx-auto px-4 max-w-6xl">
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
                  isSelected
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-base-200 hover:bg-base-300 text-base-content border border-base-300'
                }`}
              >
                <span>{type}</span>
                {reqCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-base-300 text-base-content/70'
                    }`}
                  >
                    {reqCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-base-300 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                    {selectedBloodType}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
                      {selectedBlood.description}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-base-content/60">
                        Rarity: <strong className="text-base-content">{selectedBlood.rarity}</strong>
                      </span>
                      <span className="text-xs text-base-content/30">•</span>
                      <span className={`text-xs font-semibold ${demandLevel.textColor}`}>
                        {demandLevel.level} Demand
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex bg-base-100 p-1 rounded-xl border border-base-300 text-xs font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode('donate')}
                    className={`px-3 py-1.5 rounded-lg border transition ${
                      viewMode === 'donate' ? 'bg-green-600 border-green-600 text-white shadow-sm' : 'border-transparent text-base-content/70 hover:text-base-content'
                    }`}
                  >
                    Give Blood
                  </button>
                  <button
                    onClick={() => setViewMode('receive')}
                    className={`px-3 py-1.5 rounded-lg border transition ${
                      viewMode === 'receive' ? 'bg-red-600 border-red-600 text-white shadow-sm' : 'border-transparent text-base-content/70 hover:text-base-content'
                    }`}
                  >
                    Receive Blood
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-3 py-1.5 rounded-lg border transition ${
                      viewMode === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 shadow-sm'
                        : 'border-transparent text-base-content/70 hover:text-base-content'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>

              <div className={`grid gap-4 items-stretch flex-1 ${viewMode === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {(viewMode === 'all' || viewMode === 'donate') && (
                  <div className="bg-base-100 rounded-xl p-4 border-2 border-green-500/20 shadow-sm flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-3">
                        <span className="text-xs sm:text-sm font-bold text-base-content flex items-center gap-1.5 whitespace-nowrap">
                          <ArrowRight size={15} className="text-green-600 shrink-0" />
                          Can Donate To:
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-600 text-white shrink-0 whitespace-nowrap">
                          {selectedBlood.canDonateTo.length} of 8
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedBlood.canDonateTo.map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedBloodType(type)}
                            className="px-3 py-1.5 rounded-lg font-black text-sm bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>{type}</span>
                            <CheckCircle size={13} className="text-white" />
                          </button>
                        ))}
                      </div>

                      {selectedBlood.canDonateTo.length === 8 && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1">
                          🌟 Universal Donor — Can give blood to any patient!
                        </p>
                      )}
                    </div>

                    {selectedBlood.canDonateTo.length < 8 && (
                      <div className="mt-3 pt-2.5 border-t border-base-200">
                        <div className="flex items-center gap-1.5 flex-wrap text-xs">
                          <span className="text-base-content/50 font-semibold shrink-0">Cannot donate to:</span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {bloodTypes
                              .filter((t) => !selectedBlood.canDonateTo.includes(t))
                              .map((t) => (
                                <span key={t} className="px-1.5 py-0.5 rounded bg-base-200 text-base-content/50 font-semibold text-[11px]">
                                  {t}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(viewMode === 'all' || viewMode === 'receive') && (
                  <div className="bg-base-100 rounded-xl p-4 border-2 border-red-500/20 shadow-sm flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-3">
                        <span className="text-xs sm:text-sm font-bold text-base-content flex items-center gap-1.5 whitespace-nowrap">
                          <Shield size={15} className="text-red-600 shrink-0" />
                          Can Receive From:
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white shrink-0 whitespace-nowrap">
                          {selectedBlood.canReceiveFrom.length} of 8
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedBlood.canReceiveFrom.map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedBloodType(type)}
                            className="px-3 py-1.5 rounded-lg font-black text-sm bg-red-600 hover:bg-red-700 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>{type}</span>
                            <CheckCircle size={13} className="text-white" />
                          </button>
                        ))}
                      </div>

                      {selectedBlood.canReceiveFrom.length === 8 && (
                        <p className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                          🌟 Universal Recipient — Can safely receive blood from ALL groups!
                        </p>
                      )}
                    </div>

                    {selectedBlood.canReceiveFrom.length < 8 && (
                      <div className="mt-3 pt-2.5 border-t border-base-200">
                        <div className="flex items-center gap-1.5 flex-wrap text-xs">
                          <span className="text-base-content/50 font-semibold shrink-0">Cannot receive from:</span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {bloodTypes
                              .filter((t) => !selectedBlood.canReceiveFrom.includes(t))
                              .map((t) => (
                                <span key={t} className="px-1.5 py-0.5 rounded bg-base-200 text-base-content/50 font-semibold text-[11px]">
                                  {t}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-base-content/60 font-medium text-center sm:text-left">
                Active hospital requests for {selectedBloodType}: <strong className="text-base-content">{selectedCount}</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="/search"
                  className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Search size={14} />
                  <span>Find {selectedBloodType} Donors</span>
                </a>
                <a
                  href="/donation-requests"
                  className="flex-1 sm:flex-none text-center px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
                >
                  Requests
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-base-300">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-red-600" />
                <h4 className="font-bold text-sm sm:text-base text-base-content">
                  Live Request Distribution
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Live
              </span>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                <svg viewBox="0 0 240 240" className="-rotate-90">
                  {(() => {
                    const total = Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0);
                    if (total === 0) {
                      return (
                        <circle cx="120" cy="120" r="75" fill="none" stroke="currentColor" className="text-base-300" strokeWidth="20" />
                      );
                    }

                    let angle = 0;
                    const cx = 120;
                    const cy = 120;
                    const outerR = 90;
                    const innerR = 60;

                    return (
                      <>
                        {bloodTypes.map((type) => {
                          const val = stats.bloodTypeCounts[type] || 0;
                          if (!val) return null;

                          const slice = (val / total) * 360;
                          const start = (angle * Math.PI) / 180;
                          const end = ((angle + slice) * Math.PI) / 180;
                          angle += slice;

                          const largeArc = slice > 180 ? 1 : 0;
                          const path = `M ${cx + outerR * Math.cos(start)} ${cy + outerR * Math.sin(start)}
                                      A ${outerR} ${outerR} 0 ${largeArc} 1 ${cx + outerR * Math.cos(end)} ${cy + outerR * Math.sin(end)}
                                      L ${cx + innerR * Math.cos(end)} ${cy + innerR * Math.sin(end)}
                                      A ${innerR} ${innerR} 0 ${largeArc} 0 ${cx + innerR * Math.cos(start)} ${cy + innerR * Math.sin(start)}
                                      Z`;

                          const isSelected = selectedBloodType === type;

                          return (
                            <path
                              key={type}
                              d={path}
                              fill={bloodColors[type] || '#dc2626'}
                              stroke="currentColor"
                              className={`text-base-200 cursor-pointer transition-all ${
                                isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                              }`}
                              strokeWidth="3"
                              onClick={() => setSelectedBloodType(type)}
                            />
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
                  <span className="text-xl sm:text-2xl font-black text-base-content leading-none">
                    {selectedCount}
                  </span>
                  <span className="text-[10px] font-bold text-red-600 uppercase mt-1 truncate max-w-full">
                    {selectedBloodType} Requests
                  </span>
                  <span className="text-[9px] text-base-content/50">
                    of {Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0)} total
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {bloodTypes.map((type) => {
                const count = stats.bloodTypeCounts[type] || 0;
                const total = Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
                const isSelected = selectedBloodType === type;

                return (
                  <button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between text-xs transition ${
                      isSelected
                        ? 'bg-base-100 border-red-500 shadow-sm ring-1 ring-red-500/20'
                        : 'bg-base-100/60 border-base-300 hover:bg-base-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: bloodColors[type] }}></span>
                      <strong className="text-base-content font-bold">{type}</strong>
                    </span>
                    <span className="text-base-content/60 font-medium">
                      {count} ({percent}%)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodCompatibilitySection;