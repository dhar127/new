const { useState, useMemo, useEffect } = React;

/* ─── Runs Page Component ─────────────────────────────────────── */
window.RunsPage = function ({ onSelectRun, selectedRun }) {
  // Local state initialized with window.MOCK.ANALYSIS_RUNS
  const [runsList, setRunsList] = useState(() => window.MOCK.ANALYSIS_RUNS);

  // Modals Visibility
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Create Run Modal States
  const [runName, setRunName] = useState('LCSOD-2026-Q2-007');
  const [customRulesFile, setCustomRulesFile] = useState(null);

  // Connected SAP Connection
  const [sapConnection, setSapConnection] = useState(null);

  // Connect SAP System Form States
  const [sapName, setSapName] = useState('');
  const [appServer, setAppServer] = useState('');
  const [client, setClient] = useState('');
  const [instanceNumber, setInstanceNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('idle'); // 'idle' | 'checking' | 'success'

  // Connection handlers
  const handleCheckConnection = () => {
    setConnectionStatus('checking');
    setTimeout(() => {
      setConnectionStatus('success');
    }, 1000);
  };

  const handleConfirmConnection = () => {
    if (!sapName.trim() || !client.trim()) return;
    setSapConnection({
      name: `${sapName.toUpperCase()} (Client ${client})`,
      client: client,
    });
    setConnectionStatus('idle');
    setIsConnectModalOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleCreateRun = () => {
    const newRunId = runName.trim() || `LCSOD-2026-Q2-${String(window.MOCK.ANALYSIS_RUNS.length + 1).padStart(3, '0')}`;
    const newRunObj = {
      id: newRunId,
      name: `${newRunId.split('-')[1] || 'Q2'} 2026 — Enterprise SoD Assessment`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' GMT+9',
      createdBy: 'Seo-yeon Kim (Lead Audit)',
      status: 'In Progress',
      users: '540',
      roles: '1620',
      violations: '46',
      matchRate: 93.5,
      scopes: ['P2P', 'O2C', 'FI', 'HR', 'Basis'],
      sapSystem: sapConnection ? sapConnection.name : 'PRD (Client 100)'
    };
    
    // Add to global mock data
    window.MOCK.ANALYSIS_RUNS = [newRunObj, ...window.MOCK.ANALYSIS_RUNS];
    setRunsList(window.MOCK.ANALYSIS_RUNS);
    setIsCreateModalOpen(false);

    // Reset form states
    setRunName('LCSOD-2026-Q2-007');
    setSapConnection(null);
    setSapName('');
    setAppServer('');
    setClient('');
    setInstanceNumber('');
    setUsername('');
    setPassword('');
    setCustomRulesFile(null);

    // Simulate analysis run completion after 5 seconds
    setTimeout(() => {
      newRunObj.status = 'Completed';
      setRunsList([...window.MOCK.ANALYSIS_RUNS]);
    }, 5000);
  };

  // Process runs to map compliance scores and critical counts
  const processedRuns = useMemo(() => {
    return runsList.map(run => {
      const criticalCount = run.id === 'LCSOD-2026-Q2-007' ? 18 : run.id === 'LCSOD-2026-Q1-006' ? 15 : 22;
      return {
        id: run.id,
        name: run.name,
        sapSystem: run.sapSystem || 'PRD (Client 100)',
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
  }, [runsList]);

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
            onClick={() => setIsCreateModalOpen(true)}
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

      {/* ── Create New Run Modal ── */}
      {isCreateModalOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 bg-ink-950/45 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={() => setIsCreateModalOpen(false)} />
          
          {/* Modal Content */}
          <div className="bg-white rounded-[20px] w-full max-w-[460px] shadow-pop border border-ink-250 relative z-10 overflow-hidden flex flex-col pop-in text-left">
            
            {/* Header */}
            <div className="px-6 py-5 flex items-start justify-between border-b border-ink-100">
              <div className="flex items-center gap-3.5">
                {/* Red play container */}
                <div className="h-11 w-11 rounded-xl bg-red-50 text-red-650 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-red-600 shrink-0">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-black text-ink-900 leading-tight">Create New Run</h3>
                  <p className="text-[11px] text-ink-450 mt-1">Set up a new license optimization analysis run</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-ink-400 hover:text-ink-600 hover:bg-ink-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              
              {/* Run Name */}
              <div>
                <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                  Run Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. LCSOD-2026-Q2-007"
                  value={runName}
                  onChange={e => setRunName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                />
              </div>

              {/* SAP System */}
              <div>
                <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                  SAP System <span className="text-red-500 font-bold">*</span>
                </label>
                {sapConnection ? (
                  <div 
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsConnectModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-emerald-50/20 border border-emerald-300 rounded-xl hover:bg-emerald-50/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-6 w-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600 shrink-0">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800">{sapConnection.name}</span>
                        <span className="text-[10px] text-emerald-600 font-bold ml-2 uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-150">Connected</span>
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsConnectModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-dashed border-ink-300 rounded-xl hover:bg-ink-50/50 hover:border-red-400 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5 text-ink-450 shrink-0">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs font-semibold text-ink-550">Connect SAP System...</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-ink-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                )}
              </div>

              {/* Custom Rules */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider">
                  Custom Rules
                </label>
                
                {/* Sample xlsx template row */}
                <div className="flex items-center justify-between p-3 bg-ink-50/50 border border-ink-200 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-500 shrink-0">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11.5px] font-bold text-ink-900">rules_sample.xlsx</div>
                      <div className="text-[10px] text-ink-450">Template · 3 sheets · SoD rule format</div>
                    </div>
                  </div>
                  
                  <a
                    href="rules_sample.xlsx"
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-ink-200 hover:bg-ink-50 text-ink-700 font-bold text-[11px] rounded-lg transition-all shadow-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0 text-ink-600">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download</span>
                  </a>
                </div>

                {/* Upload drag/drop zone */}
                {customRulesFile ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50/10 border border-dashed border-emerald-300 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-600 shrink-0">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[11.5px] font-bold text-emerald-800">{customRulesFile.name}</div>
                        <div className="text-[10px] text-emerald-650">{customRulesFile.size} · Custom rules ready</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setCustomRulesFile(null)}
                      className="p-1 rounded-lg text-emerald-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove file"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setCustomRulesFile({ name: 'rules_custom.xlsx', size: '15.8 KB' });
                    }}
                    className="w-full border border-dashed border-ink-300 hover:border-red-400 rounded-xl py-6 flex flex-col items-center justify-center bg-white hover:bg-ink-50/30 transition-all cursor-pointer text-center"
                  >
                    <span className="text-[11.5px] font-bold text-ink-800">Upload custom rules file</span>
                    <span className="text-[10px] text-ink-450 mt-1">
                      or <span className="text-red-600 hover:underline font-semibold">browse files</span> · .xlsx, .csv, .json
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-ink-50/30 border-t border-ink-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-white border border-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 rounded-xl transition-all shadow-sm"
              >
                Cancel
              </button>
              
              <button
                onClick={handleCreateRun}
                disabled={!runName.trim() || !sapConnection}
                className="px-4 py-2 bg-red-600 hover:bg-red-750 disabled:bg-[#E0E0E0] disabled:text-[#9E9E9E] disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Create Run</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
                  <path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* ── Connect SAP System Modal ── */}
      {isConnectModalOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 bg-ink-950/45 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={() => setIsConnectModalOpen(false)} />
          
          {/* Modal Content */}
          <div className="bg-white rounded-[20px] w-full max-w-[460px] shadow-pop border border-ink-250 relative z-10 overflow-hidden flex flex-col pop-in text-left">
            
            {/* Header */}
            <div className="px-6 py-5 flex items-start justify-between border-b border-ink-100">
              <div className="flex items-center gap-3.5">
                {/* Red shield container */}
                <div className="h-11 w-11 rounded-xl bg-red-50 text-red-650 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-red-600 shrink-0">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-black text-ink-900 leading-tight">Connect SAP System</h3>
                  <p className="text-[11px] text-ink-450 mt-1">Enter credentials and verify the connection</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="p-1 rounded-lg text-ink-400 hover:text-ink-600 hover:bg-ink-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              
              {/* SAP Name */}
              <div>
                <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                  SAP Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. PRD, Production ERP"
                  value={sapName}
                  onChange={e => setSapName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                />
              </div>

              {/* Application Server & Client */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                    Application Server <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="sap-prd.company.com"
                    value={appServer}
                    onChange={e => setAppServer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                    Client <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="100"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Instance Number */}
              <div>
                <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                  Instance Number <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 00"
                  value={instanceNumber}
                  onChange={e => setInstanceNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                />
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                    Username <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="SAP username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-ink-650 uppercase tracking-wider mb-1.5">
                    Password <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      placeholder="SAP password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-ink-200 rounded-xl text-xs placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-ink-900 font-medium pr-10 shadow-sm"
                    />
                    <div className="absolute right-3 text-ink-400 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 cursor-help">
                        <circle cx="12" cy="12" r="10" />
                        <text x="12" y="16.5" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="bold" fontSize="13" textAnchor="middle" fill="currentColor" stroke="none">i</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Status Feedback Banner */}
              {connectionStatus === 'checking' && (
                <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2.5 animate-pulse">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 animate-spin text-blue-600 shrink-0">
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
                    <path d="M21 12a9 9 0 0 0-9-9" />
                  </svg>
                  <span>Verifying RFC connection to SAP system...</span>
                </div>
              )}
              {connectionStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-semibold">RFC Connection verified successfully! Latency: 38ms.</span>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-ink-50/30 border-t border-ink-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setIsConnectModalOpen(false);
                  setIsCreateModalOpen(true);
                }}
                className="px-4 py-2 bg-white border border-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-ink-700 shrink-0">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCheckConnection}
                  disabled={connectionStatus === 'checking'}
                  className="px-4 py-2 bg-white border border-red-200 hover:bg-red-50/20 text-red-650 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-red-600 shrink-0">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{connectionStatus === 'success' ? 'Verified' : 'Check Connection'}</span>
                </button>

                <button
                  onClick={handleConfirmConnection}
                  disabled={!sapName.trim() || !appServer.trim() || !client.trim() || !instanceNumber.trim() || !username.trim() || !password.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-750 disabled:bg-[#E0E0E0] disabled:text-[#9E9E9E] disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Confirm</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
                    <path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5L19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};