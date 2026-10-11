import { ArrowRight, CheckCircle, Shield, Search } from 'lucide-react';

const CompatibilityMatches = ({
  selectedBloodType,
  selectedBlood,
  selectedCount,
  demandLevel,
  viewMode,
  setViewMode,
  bloodTypes,
  onSelectBloodType
}) => {
  const renderMatchCard = (isDonate) => {
    const title = isDonate ? 'Can Donate To' : 'Can Receive From';
    const Icon = isDonate ? ArrowRight : Shield;
    const list = isDonate ? selectedBlood.canDonateTo : selectedBlood.canReceiveFrom;
    const btnColor = isDonate ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    const textColor = isDonate ? 'text-green-600' : 'text-red-600';
    const borderColor = isDonate ? 'border-green-500/20' : 'border-red-500/20';
    const badgeColor = isDonate ? 'bg-green-600' : 'bg-red-600';

    return (
      <div className={`bg-base-100 rounded-xl p-4 border-2 ${borderColor} shadow-sm flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-1 mb-3">
            <span className="text-xs sm:text-sm font-bold text-base-content flex items-center gap-1.5 whitespace-nowrap">
              <Icon size={15} className={`${textColor} shrink-0`} />
              {title}:
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor} text-white shrink-0`}>
              {list.length} of 8
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {list.map((type) => (
              <button
                key={type}
                onClick={() => onSelectBloodType(type)}
                className={`px-3 py-1.5 rounded-lg font-black text-sm ${btnColor} text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer`}
              >
                <span>{type}</span>
                <CheckCircle size={13} className="text-white" />
              </button>
            ))}
          </div>
        </div>
        {list.length < 8 && (
          <div className="mt-3 pt-2.5 border-t border-base-200 flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-base-content/50 font-semibold shrink-0">Cannot {isDonate ? 'donate to' : 'receive from'}:</span>
            {bloodTypes.filter((t) => !list.includes(t)).map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded bg-base-200 text-base-content/50 font-semibold text-[11px]">{t}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-7 bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-base-300 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
              {selectedBloodType}
            </div>
            <div>
              <h3 className="text-lg font-bold text-base-content flex items-center gap-2">{selectedBlood.description}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-base-content/60">Rarity: <strong className="text-base-content">{selectedBlood.rarity}</strong></span>
                <span className="text-xs text-base-content/30">•</span>
                <span className={`text-xs font-semibold ${demandLevel.textColor}`}>{demandLevel.level} Demand</span>
              </div>
            </div>
          </div>

          <div className="inline-flex bg-base-100 p-1 rounded-xl border border-base-300 text-xs font-bold self-start sm:self-auto">
            <button onClick={() => setViewMode('donate')} className={`px-3 py-1.5 rounded-lg border transition ${viewMode === 'donate' ? 'bg-green-600 border-green-600 text-white shadow-sm' : 'border-transparent text-base-content/70 hover:text-base-content'}`}>Give Blood</button>
            <button onClick={() => setViewMode('receive')} className={`px-3 py-1.5 rounded-lg border transition ${viewMode === 'receive' ? 'bg-red-600 border-red-600 text-white shadow-sm' : 'border-transparent text-base-content/70 hover:text-base-content'}`}>Receive Blood</button>
            <button onClick={() => setViewMode('all')} className={`px-3 py-1.5 rounded-lg border transition ${viewMode === 'all' ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 shadow-sm' : 'border-transparent text-base-content/70 hover:text-base-content'}`}>Both</button>
          </div>
        </div>

        <div className={`grid gap-4 items-stretch flex-1 ${viewMode === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {(viewMode === 'all' || viewMode === 'donate') && renderMatchCard(true)}
          {(viewMode === 'all' || viewMode === 'receive') && renderMatchCard(false)}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-base-content/60 font-medium text-center sm:text-left">
          Active hospital requests for {selectedBloodType}: <strong className="text-base-content">{selectedCount}</strong>
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a href="/search" className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm flex items-center justify-center gap-1.5">
            <Search size={14} />
            <span>Find {selectedBloodType} Donors</span>
          </a>
          <a href="/donation-requests" className="flex-1 sm:flex-none text-center px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-colors">
            Requests
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityMatches;
