const { useState, useMemo, useEffect } = React;

/* ─── Runs Page Component ─────────────────────────────────────── */
window.RunsPage = function ({ onSelectRun, selectedRun }) {
  const { ANALYSIS_RUNS } = window.MOCK;

  // Process runs to map compliance scores and critical counts
  const processedRuns = useMemo(() => {
    return ANALYSIS_RUNS.map(run => {
      const criticalCount = run.id === 'LCSOD-2026-Q2-007' ? 18 : run.id === 'LCSOD-2026-Q1-006' ? 15 : 22;
      return {
        id: run.id,
        name: run.name,
        sapSystem: 'PRD (Client 100)',
        date: run.date,
        status: run.status,
        usersAnalyzed: run.users,
        violationsFound: run.violations,
        complianceScore: run.matchRate, // map matchRate to complianceScore
        criticalViolationsCount: criticalCount,
        createdBy: run.createdBy,
        rolesAnalyzed: run.roles
      };
    });
  }, [ANALYSIS_RUNS]);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);

  // Filters
  const filteredRuns = useMemo(() => {
    return processedRuns.filter(run => {
      const matchesSearch = run.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            run.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || run.status === statusFilter || 
                            (statusFilter === 'Failed' && run.status === 'Failed');
      return matchesSearch && matchesStatus;
    });
  }, [processedRuns, searchTerm, statusFilter]);

  // Checkbox comparisons
  const handleToggleCheck = (runId) => {
    setSelectedForCompare(prev => {
      if (prev.includes(runId)) {
        return prev.filter(id => id !== runId);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 runs at a time.");
          return prev;
        }
        return [...prev, runId];
      }
    });
  };

  const selectedRunObjects = useMemo(() => {
    return processedRuns.filter(r => selectedForCompare.includes(r.id));
  }, [processedRuns, selectedForCompare]);

  return (
    <div className="space-y-6 px-4 md:px-7 py-6 animate-fade-in relative text-left">
      
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-ink-900 tracking-tight">Analysis Runs</h1>
          <p className="text-xs text-ink-500 mt-1">
            Select a completed run to explore its SoD report and user-level insights.
          </p>
        </div>
        
        {/* Header Action Controls */}
        <div className="flex items-center gap-2">
          {selectedForCompare.length >= 2 && (
            <button
              onClick={() => setShowCompareDrawer(true)}
              className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <window.Icon name="split" className="w-3.5 h-3.5" />
              Compare Selected ({selectedForCompare.length})
            </button>
          )}
          
          <button
            onClick={() => alert("Initializing new analysis run scheduler...")}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
          >
            <window.Icon name="plus" className="w-3.5 h-3.5 text-white" />
            Create Run
          </button>
        </div>
      </div>

      {/* ── Search Input (Full Width Block) ── */}
      <div className="relative">
        <window.Icon name="search" className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search runs by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-ink-200 rounded-lg text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all text-ink-900 shadow-sm"
        />
      </div>

      {/* ── Filter Pills & Telemetry Row ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-150 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-ink-400 font-bold uppercase tracking-wider text-[10px] mr-1">Filters:</span>
          <div className="flex gap-1.5">
            {['All', 'Completed', 'In Progress', 'Failed'].map(s => {
              const isActive = statusFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-ink-400 font-bold uppercase tracking-wider">
          {filteredRuns.length} run{filteredRuns.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRuns.map(run => {
          const isChecked = selectedForCompare.includes(run.id);
          const scoreColor = 'text-emerald-500';
          const scoreBg = 'bg-emerald-500';

          return (
            <div 
              key={run.id} 
              className={`rounded-2xl bg-white shadow-card border border-ink-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between relative ${
                selectedRun && selectedRun.id === run.id ? 'ring-2 ring-red-500 border-transparent' : ''
              }`}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-ink-100 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleCheck(run.id)}
                      disabled={run.status !== 'Completed'}
                      className="rounded border-ink-300 text-red-600 focus:ring-red-500 h-4 w-4 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold font-mono whitespace-nowrap leading-tight">
                      {run.id}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ring-1 ring-inset ${
                    run.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' 
                      : run.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700 ring-amber-250'
                        : 'bg-rose-50 text-rose-700 ring-rose-250'
                  }`}>
                    {run.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-black text-ink-900 leading-snug">{run.name}</h3>
                  <p className="text-[10.5px] text-ink-500 mt-1">{run.date}</p>
                  <p className="text-[10px] text-ink-400 font-semibold mt-0.5">Creator: {run.createdBy}</p>
                </div>
              </div>

              {/* Stats Block (3 Columns) */}
              <div className="px-5 py-3 border-b border-ink-100 grid grid-cols-3 gap-2 text-center bg-ink-50/30">
                <div className="border-r border-ink-100">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Users</div>
                  <div className="text-xs font-black text-ink-900 font-mono mt-0.5">{run.usersAnalyzed}</div>
                </div>
                <div className="border-r border-ink-100">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Roles</div>
                  <div className="text-xs font-black text-ink-900 font-mono mt-0.5">{run.rolesAnalyzed}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Violations</div>
                  <div className="text-xs font-black text-ink-900 font-mono mt-0.5">{run.violationsFound}</div>
                </div>
              </div>

              {/* Progress bar (Compliance Match) */}
              <div className="px-5 py-3.5 border-b border-ink-100 space-y-1.5">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold uppercase tracking-wider">
                  <span className="text-ink-450">License / Compliance Match</span>
                  <span className={scoreColor}>{run.complianceScore}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                  <div className={`h-full ${scoreBg}`} style={{ width: `${run.complianceScore}%` }} />
                </div>
              </div>

              {/* Action Button */}
              <div className="px-5 py-3.5">
                {run.status === 'Completed' ? (
                  <button
                    onClick={() => onSelectRun(run)}
                    className="w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors uppercase tracking-widest"
                  >
                    Open Report
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full text-center py-2 bg-ink-100 text-ink-400 font-semibold text-xs rounded-lg cursor-not-allowed"
                  >
                    Analysis In Progress...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Historical Comparison Drawer ── */}
      {showCompareDrawer && selectedRunObjects.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-ink-950/45 backdrop-blur-[2px] flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto pop-in">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-ink-150 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">GRC Comparator</span>
                <h3 className="text-xl font-black text-ink-900 mt-0.5">Historical Run Comparison</h3>
                <p className="text-xs text-ink-500 mt-1">Drift analysis between selected compliance runs.</p>
              </div>
              <button
                onClick={() => {
                  setShowCompareDrawer(false);
                  setSelectedForCompare([]);
                }}
                className="p-1.5 rounded-lg border border-ink-200 bg-ink-50 hover:bg-ink-100 text-ink-500 transition-colors"
              >
                <window.Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="space-y-6 flex-1 text-left">
              
              {/* Metrics Table */}
              <div className="border border-ink-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-200 font-bold uppercase text-[10px] text-ink-500">
                      <th className="px-4 py-3">Metric</th>
                      {selectedRunObjects.map(r => (
                        <th key={r.id} className="px-4 py-3 text-right font-mono">{r.id}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-150">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-ink-800">Compliance Score</td>
                      {selectedRunObjects.map(r => (
                        <td key={r.id} className="px-4 py-3 text-right font-mono font-bold text-emerald-600">{r.complianceScore}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-ink-800">Total Violations</td>
                      {selectedRunObjects.map(r => (
                        <td key={r.id} className="px-4 py-3 text-right font-mono font-bold text-ink-900">{r.violationsFound}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-ink-800">Critical Risks</td>
                      {selectedRunObjects.map(r => (
                        <td key={r.id} className="px-4 py-3 text-right font-mono font-bold text-rose-600">{r.criticalViolationsCount}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-ink-800">Users Scanned</td>
                      {selectedRunObjects.map(r => (
                        <td key={r.id} className="px-4 py-3 text-right font-mono">{r.usersAnalyzed}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Drift Summary */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-ink-900">Drift Breakdown</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-rose-700 block">New Risks</span>
                    <div className="text-xl font-bold font-mono text-rose-800 mt-1">+8</div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">Resolved</span>
                    <div className="text-xl font-bold font-mono text-emerald-800 mt-1">-10</div>
                  </div>
                  <div className="bg-ink-50 border border-ink-250 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-ink-650 block">Persistent</span>
                    <div className="text-xl font-bold font-mono text-ink-800 mt-1">38</div>
                  </div>
                </div>

                <div className="bg-white border border-ink-200 rounded-xl p-4 space-y-3 shadow-sm text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block border-b border-ink-100 pb-1.5">Drift Logs</span>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <b className="text-rose-700 font-bold mr-1.5">[NEW]</b>
                        <span className="font-mono font-bold text-ink-900">V-1071</span>
                        <p className="text-ink-500 text-[10px]">SU01 + PFCG assigned to BASIS_AMS</p>
                      </div>
                      <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-mono">Critical</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-t border-ink-100 pt-2">
                      <div>
                        <b className="text-emerald-700 font-bold mr-1.5">[RESOLVED]</b>
                        <span className="font-mono font-bold text-ink-900">V-1042</span>
                        <p className="text-ink-500 text-[10px]">PO Create separated from LIV Posting</p>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">High</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-ink-200 pt-4 mt-6 flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowCompareDrawer(false);
                  setSelectedForCompare([]);
                }}
                className="px-4 py-2 rounded-lg border border-ink-300 bg-white hover:bg-ink-50 text-xs font-bold text-ink-700 transition-all"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};