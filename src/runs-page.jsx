const { useState, useMemo, useEffect, useRef } = React;

/* ─── Portal helper ─────────────────────────────────────────── */
function Portal({ children }) {
  const el = useRef(document.createElement('div'));
  useEffect(() => {
    document.body.appendChild(el.current);
    return () => document.body.removeChild(el.current);
  }, []);
  return ReactDOM.createPortal(children, el.current);
}

/* ─── Runs Page ─────────────────────────────────────────────── */
const RUNS_PER_PAGE = 6;

window.RunsPage = function ({ onNavigate }) {
  const { ANALYSIS_RUNS } = window.MOCK;
  const [searchTerm, setSearchTerm]         = useState('');
  const [statusFilter, setStatusFilter]     = useState('All');
  const [scopeFilters, setScopeFilters]     = useState({});
  const [showCreateRun, setShowCreateRun]   = useState(false);
  const [showConnectSAP, setShowConnectSAP] = useState(false);
  const [visibleCount, setVisibleCount]     = useState(RUNS_PER_PAGE);

  const filteredRuns = useMemo(() => {
    return ANALYSIS_RUNS.filter(run => {
      const matchesSearch  = run.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus  = statusFilter === 'All' || run.status === statusFilter;
      const activeScopes   = Object.keys(scopeFilters).filter(k => scopeFilters[k]);
      const matchesScope   = activeScopes.length === 0 || activeScopes.some(s => run.scopes.includes(s));
      return matchesSearch && matchesStatus && matchesScope;
    });
  }, [searchTerm, statusFilter, scopeFilters, ANALYSIS_RUNS]);

  const visibleRuns  = filteredRuns.slice(0, visibleCount);
  const hasMore      = visibleCount < filteredRuns.length;
  const remaining    = filteredRuns.length - visibleCount;

  const handleScopeFilter = (scope) =>
    setScopeFilters(prev => ({ ...prev, [scope]: !prev[scope] }));

  useEffect(() => { setVisibleCount(RUNS_PER_PAGE); }, [searchTerm, statusFilter, scopeFilters]);

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Analysis Runs</h1>
          <p className="mt-1 text-sm text-ink-500">
            Select a completed run to explore its SoD report and user-level insights.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setShowConnectSAP(true)}
            className="px-4 py-2.5 rounded-lg bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <window.Icon name="shield" className="w-4 h-4" strokeWidth={2} />
            Connect SAP System
          </button>
          <button
            onClick={() => setShowCreateRun(true)}
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <window.Icon name="plus" className="w-4 h-4" strokeWidth={2} />
            Create Run
          </button>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <window.Icon name="search" className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search runs by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-ink-400">Filters:</span>
        <div className="flex gap-2">
          {['All', 'Completed', 'In Progress', 'Failed'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-ink-200" />
        <div className="flex gap-2">
          {['P2P', 'O2C', 'FI', 'HR', 'Basis'].map(scope => (
            <button
              key={scope}
              onClick={() => handleScopeFilter(scope)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scopeFilters[scope]
                  ? 'bg-red-100 text-red-700 ring-1 ring-red-200'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[11px] text-ink-400 font-medium">
          {filteredRuns.length} run{filteredRuns.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleRuns.length > 0 ? (
          visibleRuns.map(run => (
            <RunCard key={run.id} run={run} onNavigate={onNavigate} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl bg-white shadow-card ring-1 ring-ink-200 p-12 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-ink-50 text-ink-400 ring-1 ring-ink-200">
              <window.Icon name="file" className="w-6 h-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink-900">No runs found</h3>
            <p className="mt-1 text-xs text-ink-500">Try adjusting your filters or create a new run.</p>
          </div>
        )}
      </div>

      {/* ── Show More ── */}
      {hasMore && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <button
            onClick={() => setVisibleCount(c => c + RUNS_PER_PAGE)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white ring-1 ring-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 hover:ring-ink-300 transition-all shadow-sm"
          >
            <window.Icon name="chevron" className="w-4 h-4 rotate-90" strokeWidth={2} />
            Show {Math.min(RUNS_PER_PAGE, remaining)} more
            <span className="ml-1 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-500">
              {remaining} left
            </span>
          </button>
          <button
            onClick={() => setVisibleCount(filteredRuns.length)}
            className="text-[11px] font-medium text-red-600 hover:underline"
          >
            Show all {filteredRuns.length} runs
          </button>
        </div>
      )}

      {/* ── Show Less ── */}
      {!hasMore && visibleCount > RUNS_PER_PAGE && filteredRuns.length > RUNS_PER_PAGE && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => { setVisibleCount(RUNS_PER_PAGE); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white ring-1 ring-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 transition-all shadow-sm"
          >
            <window.Icon name="chevron" className="w-4 h-4 -rotate-90" strokeWidth={2} />
            Show less
          </button>
        </div>
      )}

      {/* ── Modals via Portal ── */}
      {showCreateRun && (
        <Portal>
          <window.CreateRunModal
            onClose={() => setShowCreateRun(false)}
            onNavigate={key => { setShowCreateRun(false); onNavigate(key); }}
          />
        </Portal>
      )}
      {showConnectSAP && (
        <Portal>
          <window.ConnectSAPModal
            onClose={() => setShowConnectSAP(false)}
            onConnect={() => setShowConnectSAP(false)}
          />
        </Portal>
      )}
    </div>
  );
};

/* ─── Run Card ──────────────────────────────────────────────── */
function RunCard({ run, onNavigate }) {
  const matchRateColor =
    run.matchRate >= 70 ? 'bg-emerald-100 ring-emerald-200' :
    run.matchRate >= 50 ? 'bg-amber-100 ring-amber-200'    :
                          'bg-rose-100 ring-rose-200';

  const matchRateText =
    run.matchRate >= 70 ? 'text-emerald-700' :
    run.matchRate >= 50 ? 'text-amber-700'   :
                          'text-rose-700';

  return (
    <div className="rounded-2xl bg-white shadow-card ring-1 ring-ink-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">

      {/* Header */}
      <div className="border-b border-ink-100 px-5 py-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-red-100 text-red-700 text-[10px] font-bold">
            {run.id}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ring-1 ring-inset ${
            run.status === 'Completed'   ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
            run.status === 'In Progress' ? 'bg-amber-50 text-amber-700 ring-amber-200'       :
                                           'bg-rose-50 text-rose-700 ring-rose-200'
          }`}>
            {run.status}
          </span>
        </div>
        <h3 className="text-sm font-bold text-ink-900 line-clamp-2">{run.name}</h3>
        <p className="mt-1 text-[11px] text-ink-500">{run.date}</p>
        <p className="text-[10px] text-ink-400 font-medium mt-0.5">{run.createdBy}</p>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 border-b border-ink-100 flex items-center gap-4">
        {[['Users', run.users], ['Roles', run.roles], ['Violations', run.violations]].map(([label, val], i) => (
          <div key={label} className={`flex-1 text-center ${i > 0 ? 'border-l border-ink-100' : ''}`}>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">{label}</div>
            <div className="text-xs font-bold text-ink-900 font-mono">{val}</div>
          </div>
        ))}
      </div>

      {/* Match Rate */}
      <div className="px-5 py-3 border-b border-ink-100">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
            License / Compliance Match
          </span>
          <span className={`text-xs font-bold ${matchRateText}`}>{run.matchRate}%</span>
        </div>
        <div className={`h-1.5 rounded-full ring-1 ring-inset ${matchRateColor} overflow-hidden`}>
          <div
            className={`h-full transition-all ${
              run.matchRate >= 70 ? 'bg-emerald-500' :
              run.matchRate >= 50 ? 'bg-amber-500'   : 'bg-rose-500'
            }`}
            style={{ width: `${run.matchRate}%` }}
          />
        </div>
      </div>

      {/* Scope Tags */}
      <div className="px-5 py-3 border-b border-ink-100 flex flex-wrap gap-1">
        {run.scopes.map(scope => (
          <span key={scope} className="inline-flex items-center px-2 py-1 rounded-md bg-ink-100 text-ink-600 text-[9px] font-bold uppercase tracking-wider">
            {scope}
          </span>
        ))}
      </div>

      {/* Action */}
      <div className="px-5 py-3 mt-auto">
        <button
          onClick={() => onNavigate('home')}
          className="w-full rounded-lg bg-red-600 text-white text-xs font-bold py-2 hover:bg-red-500 transition-colors"
        >
          Open Report
        </button>
      </div>
    </div>
  );
}

/* ─── Create Run Modal ──────────────────────────────────────── */
window.CreateRunModal = function ({ onClose, onNavigate }) {
  const [runName, setRunName]               = useState('Q3 2025 License Audit');
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [uploadedFile, setUploadedFile]     = useState(null);
  const fileInputRef                        = useRef(null);
  const { SAP_SYSTEMS } = window.MOCK;

  const handleCreate = () => {
    if (!selectedSystem) { alert('Please select a SAP system'); return; }
    onClose();
    if (onNavigate) onNavigate('home');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div className="rounded-2xl bg-white shadow-2xl flex flex-col"
           style={{ width: 370, maxWidth: '95vw', maxHeight: '90vh' }}>

        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4 flex items-start gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-red-50 flex-shrink-0">
            <window.Icon name="play" className="w-5 h-5 text-red-600" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900">Create New Run</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Set up a new license optimization analysis run</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
            <window.Icon name="x" className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-900 block mb-1.5">
              Run Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text" value={runName}
              onChange={e => setRunName(e.target.value)}
              placeholder="e.g. Q3 2025 License Audit"
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-900 block mb-1.5">
              SAP System <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedSystem || ''}
              onChange={e => setSelectedSystem(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors bg-white"
            >
              <option value="">Select a system...</option>
              {SAP_SYSTEMS.map(sys => (
                <option key={sys.id} value={sys.id}>
                  {sys.name} ({sys.ashost}) — Client {sys.client}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-900 block mb-1.5">
              Custom Rules
            </label>
            <div className="flex flex-col gap-2">

              {/* Sample download row */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <window.Icon name="file" className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-semibold text-gray-900">rules_sample.xlsx</p>
                    <p className="text-[10px] text-gray-400">Template · 3 sheets · SoD rule format</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = 'rules_sample.xlsx';
                    a.download = 'rules_sample.xlsx';
                    a.click();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  <window.Icon name="download" className="w-3 h-3" strokeWidth={2} />
                  Download
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.csv,.json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* Drop zone / uploaded state */}
              {uploadedFile ? (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <window.Icon name="file" className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-900 truncate max-w-[170px]">{uploadedFile.name}</p>
                      <p className="text-[10px] text-gray-400">{(uploadedFile.size / 1024).toFixed(1)} KB · ready to upload</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setUploadedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="p-1 hover:bg-red-100 rounded-md text-red-400 transition-colors"
                  >
                    <window.Icon name="x" className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex justify-center mb-1.5">
                    <window.Icon name="upload" className="w-6 h-6 text-red-300" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold text-gray-900">Upload custom rules file</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    or <span className="text-red-600 font-medium">browse files</span>
                    {' '}· .xlsx, .csv, .json
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-3 flex gap-2 justify-end bg-gray-50 rounded-b-2xl">
          <button onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium text-xs transition-colors">
            Cancel
          </button>
          <button onClick={handleCreate}
            className="px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-xs transition-colors flex items-center gap-1.5">
            Create Run
            <window.Icon name="arrow" className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Connect SAP Modal ─────────────────────────────────────── */
window.ConnectSAPModal = function ({ onClose, onConnect }) {
  const [sapName, setSAPName]           = useState('');
  const [appServer, setAppServer]       = useState('');
  const [instanceNum, setInstanceNum]   = useState('');
  const [client, setClient]             = useState('');
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting]     = useState(false);
  const [connected, setConnected]       = useState(false);

  const handleConnect = () => {
    if (!sapName || !appServer || !instanceNum || !client || !username || !password) {
      alert('Please fill in all fields'); return;
    }
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div className="rounded-2xl bg-white shadow-2xl flex flex-col"
           style={{ width: 370, maxWidth: '95vw', maxHeight: '90vh' }}>

        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4 flex items-start gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-red-50 flex-shrink-0">
            <window.Icon name="shield" className="w-5 h-5 text-red-600" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900">Connect SAP System</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Enter your SAP connection details to link this system</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
            <window.Icon name="x" className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!connected ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                  SAP Name <span className="text-red-500">*</span>
                </label>
                <input type="text" value={sapName} onChange={e => setSAPName(e.target.value)}
                  placeholder="e.g. PRD, Production ERP"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                    Application Server <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={appServer} onChange={e => setAppServer(e.target.value)}
                    placeholder="sap-prd.company.com"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={client} onChange={e => setClient(e.target.value)}
                    placeholder="100"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                  Instance Number <span className="text-red-500">*</span>
                </label>
                <input type="text" value={instanceNum} onChange={e => setInstanceNum(e.target.value)}
                  placeholder="e.g. 00"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                    placeholder="SAP username"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-900 block mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="SAP password"
                      className="w-full px-3 py-2 pr-8 rounded-lg border-2 border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-red-500 transition-colors" />
                    <button onClick={() => setShowPassword(p => !p)}
                      className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <window.Icon name="info" className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="flex justify-center mb-2.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500 text-white">
                  <window.Icon name="check" className="w-5 h-5" strokeWidth={3} />
                </div>
              </div>
              <p className="text-sm font-bold text-emerald-900">Connected successfully</p>
              <p className="text-xs text-emerald-700 mt-1.5">
                {sapName} — {appServer} (client {client}) is now linked.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-3 flex gap-2 justify-end bg-gray-50 rounded-b-2xl">
          {!connected ? (
            <>
              <button onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium text-xs transition-colors">
                Cancel
              </button>
              <button onClick={handleConnect} disabled={connecting}
                className="px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-xs disabled:opacity-50 transition-colors flex items-center gap-1.5">
                {connecting ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect
                    <window.Icon name="arrow" className="w-3.5 h-3.5" strokeWidth={2} />
                  </>
                )}
              </button>
            </>
          ) : (
            <button onClick={onConnect}
              className="w-full px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-xs transition-colors">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};