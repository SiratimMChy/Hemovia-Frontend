import { Activity } from 'lucide-react';
import { bloodTypes, bloodColors } from './compatibilityData';

const getDonutSlices = (counts, total, cx = 120, cy = 120, outerR = 90, innerR = 60) => {
  let angle = 0;
  return bloodTypes
    .filter((type) => (counts[type] || 0) > 0)
    .map((type) => {
      const val = counts[type];
      const slice = (val / total) * 360;
      const start = (angle * Math.PI) / 180;
      angle += slice;
      const end = (angle * Math.PI) / 180;
      const largeArc = slice > 180 ? 1 : 0;
      const path = `M ${cx + outerR * Math.cos(start)} ${cy + outerR * Math.sin(start)}
                  A ${outerR} ${outerR} 0 ${largeArc} 1 ${cx + outerR * Math.cos(end)} ${cy + outerR * Math.sin(end)}
                  L ${cx + innerR * Math.cos(end)} ${cy + innerR * Math.sin(end)}
                  A ${innerR} ${innerR} 0 ${largeArc} 0 ${cx + innerR * Math.cos(start)} ${cy + innerR * Math.sin(start)}
                  Z`;
      return { type, path };
    });
};

const CompatibilityChart = ({ stats, selectedBloodType, onSelectBloodType, selectedCount }) => {
  const total = Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0);
  const slices = total > 0 ? getDonutSlices(stats.bloodTypeCounts, total) : [];

  return (
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
            {total === 0 ? (
              <circle cx="120" cy="120" r="75" fill="none" stroke="currentColor" className="text-base-300" strokeWidth="20" />
            ) : (
              slices.map(({ type, path }) => {
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
                    onClick={() => onSelectBloodType(type)}
                  />
                );
              })
            )}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
            <span className="text-xl sm:text-2xl font-black text-base-content leading-none">
              {selectedCount}
            </span>
            <span className="text-[10px] font-bold text-red-600 uppercase mt-1 truncate max-w-full">
              {selectedBloodType} Requests
            </span>
            <span className="text-[9px] text-base-content/50">
              of {total} total
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {bloodTypes.map((type) => {
          const count = stats.bloodTypeCounts[type] || 0;
          const percent = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
          const isSelected = selectedBloodType === type;

          return (
            <button
              key={type}
              onClick={() => onSelectBloodType(type)}
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
  );
};

export default CompatibilityChart;
