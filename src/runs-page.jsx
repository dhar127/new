const { useState, useMemo } = React;

window.RunsPage = function({ onNavigate }) {
  const { ANALYSIS_RUNS } = window.MOCK;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [scopeFilters, setScopeFilters] = useState({});
  const [showCreateRunModal, setShowCreateRunModal] = useState(false);
  const [showConnectSAPModal, setShowConnectSAPModal] = useState(false);

  const filteredRuns = useMemo(() => {
    return ANALYSIS_RUNS.filter(run => {
      const matchesSearch = run.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || run.status === statusFilter;
      const matchesScope = Object.keys(scopeFilters).length === 0 || 
        Object.keys(scopeFilters).some(scope => scopeFilters[scope] && run.scopes.includes(scope));
      return matchesSearch && matchesStatus && matchesScope;
    });
  }, [searchTerm, statusFilter, scopeFilters]);

  const handleScopeFilter = (scope) => {
    setScopeFilters(prev => ({
      ...prev,
      [scope]: !prev[scope]
    }));
  };

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Analysis Runs</h1>
          <p className="mt-1 text-sm text-ink-500">Select a completed run to explore its SoD report and user-level insights.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => setShowConnectSAPModal(true)}
            className="px-4 py-2.5 rounded-lg bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <window.Icon name="shield" className="w-4 h-4" strokeWidth={2} />
            Connect SAP System
          </button>
          <button 
            onClick={() => setShowCreateRunModal(true)}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <window.Icon name="plus" className="w-4 h-4" strokeWidth={2} />
            Create Run
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <window.Icon name="search" className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search runs by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-ink-400">Filters:</span>
        
        {/* Status Filters */}
        <div className="flex gap-2">
          {['All', 'Completed', 'In Progress', 'Failed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === status
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-ink-200" />

        {/* Scope Filters */}
        <div className="flex gap-2">
          {['P2P', 'O2C', 'FI', 'HR', 'Basis'].map(scope => (
            <button
              key={scope}
              onClick={() => handleScopeFilter(scope)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scopeFilters[scope]
                  ? 'bg-brand-100 text-brand-700 ring-1 ring-brand-200'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>

      {/* Runs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRuns.length > 0 ? (
          filteredRuns.map(run => (
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

      {/* Create Run Modal */}
      {showCreateRunModal && (
        <CreateRunModal 
          onClose={() => setShowCreateRunModal(false)}
          onNavigate={onNavigate}
        />
      )}

      {/* Connect SAP Modal */}
      {showConnectSAPModal && (
        <window.ConnectSAPModal 
          onClose={() => setShowConnectSAPModal(false)}
          onConnect={(system) => {
            setShowConnectSAPModal(false);
          }}
        />
      )}
    </div>
  );
};

function RunCard({ run, onNavigate }) {
  const matchRateColor = run.matchRate >= 70 ? 'bg-emerald-100 ring-emerald-200' : 
                         run.matchRate >= 50 ? 'bg-amber-100 ring-amber-200' : 
                         'bg-rose-100 ring-rose-200';
  
  const matchRateTextColor = run.matchRate >= 70 ? 'text-emerald-700' : 
                            run.matchRate >= 50 ? 'text-amber-700' : 
                            'text-rose-700';

  return (
    <div className="rounded-2xl bg-white shadow-card ring-1 ring-ink-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="border-b border-ink-100 px-5 py-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-brand-100 text-brand-700 text-[10px] font-bold">
            {run.id}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ring-1 ring-inset ${
            run.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
            run.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
            'bg-rose-50 text-rose-700 ring-rose-200'
          }`}>
            {run.status}
          </span>
        </div>
        <h3 className="text-sm font-bold text-ink-900 line-clamp-2">{run.name}</h3>
        <p className="mt-1 text-[11px] text-ink-500">{run.date}</p>
        <p className="text-[10px] text-ink-400 font-medium mt-0.5">{run.createdBy}</p>
      </div>

      {/* Stats Row */}
      <div className="px-5 py-3 border-b border-ink-100 flex items-center gap-4">
        <div className="flex-1 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Users</div>
          <div className="text-xs font-bold text-ink-900 font-mono">{run.users}</div>
        </div>
        <div className="flex-1 text-center border-l border-ink-100">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Roles</div>
          <div className="text-xs font-bold text-ink-900 font-mono">{run.roles}</div>
        </div>
        <div className="flex-1 text-center border-l border-ink-100">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Violations</div>
          <div className="text-xs font-bold text-ink-900 font-mono">{run.violations}</div>
        </div>
      </div>

      {/* Match Rate Bar */}
      <div className="px-5 py-3 border-b border-ink-100">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">License / Compliance Match</span>
          <span className={`text-xs font-bold ${matchRateTextColor}`}>{run.matchRate}%</span>
        </div>
        <div className={`h-1.5 rounded-full ring-1 ring-inset ${matchRateColor} overflow-hidden`}>
          <div 
            className={`h-full transition-all ${
              run.matchRate >= 70 ? 'bg-emerald-500' : 
              run.matchRate >= 50 ? 'bg-amber-500' : 
              'bg-rose-500'
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

      {/* Action Button */}
      <div className="px-5 py-3">
        <button
          onClick={() => {
            // Navigate to run details - for now just navigate to home which shows the dashboard
            // In a real app, you'd navigate to a specific run page
            window.location.href = '?run=' + run.id;
          }}
          className="w-full rounded-lg bg-brand-600 text-white text-xs font-bold py-2 hover:bg-brand-500 transition-colors"
        >
          Open Report
        </button>
      </div>
    </div>
  );
}

window.CreateRunModal = function({ onClose, onNavigate }) {
  const [runName, setRunName] = useState('Q3 2025 License Audit');
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [authTraceFile, setAuthTraceFile] = useState(null);
  const { SAP_SYSTEMS } = window.MOCK;

  const handleCreateRun = () => {
    if (!selectedSystem) {
      alert('Please select a SAP system');
      return;
    }
    onClose();
    onNavigate('home');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" style={{ backdropFilter: 'blur(4px)' }}>
        <div className="rounded-2xl bg-white shadow-2xl" style={{ width: '420px', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-5 flex items-start gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
              <window.Icon name="play" className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Create New Run</h2>
              <p className="text-sm text-gray-600 mt-1">Set up a new license optimization analysis run</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 text-gray-400 transition-colors">
              <window.Icon name="x" className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Run Name */}
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">Run Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={runName}
                onChange={(e) => setRunName(e.target.value)}
                placeholder="e.g. Q3 2025 License Audit"
                className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">SAP System <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <select
                  value={selectedSystem || ''}
                  onChange={(e) => setSelectedSystem(e.target.value ? parseInt(e.target.value) : null)}
                  className="flex-1 px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select a system...</option>
                  {SAP_SYSTEMS.map(sys => (
                    <option key={sys.id} value={sys.id}>
                      {sys.name} ({sys.ashost}) - Client {sys.client}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="px-3 py-2.5 rounded-lg bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <window.Icon name="shield" className="w-4 h-4" strokeWidth={2} />
                  Connect SAP
                </button>
              </div>
            </div>

            {/* Auth Trace Files */}
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-2">Auth Trace Files <span className="text-gray-500 font-normal">(optional)</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="flex justify-center mb-3">
                  <window.Icon name="download" className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
                </div>
                <p className="text-base font-semibold text-gray-900">Drop auth trace files here</p>
                <p className="text-sm text-gray-600 mt-1">or <button className="text-blue-600 hover:underline font-medium">browse files</button> • .csv, .xls, .xlsx</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-6 py-3 flex gap-3 justify-end bg-gray-50">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRun}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2"
            >
              Create Run
              <window.Icon name="arrow" className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Connect SAP System Modal */}
      {showConnectModal && (
        <window.ConnectSAPModal 
          onClose={() => setShowConnectModal(false)}
          onConnect={(system) => {
            setSelectedSystem(system.id);
            setShowConnectModal(false);
          }}
        />
      )}
    </>
  );
};

window.ConnectSAPModal = function({ onClose, onConnect }) {
  const [sapName, setSAPName] = useState('');
  const [appServer, setAppServer] = useState('');
  const [instanceNum, setInstanceNum] = useState('');
  const [client, setClient] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    if (!sapName || !appServer || !instanceNum || !client || !username || !password) {
      alert('Please fill in all fields');
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1500);
  };

  const handleDone = () => {
    if (connected) {
      onConnect({ 
        id: Date.now(), 
        name: sapName, 
        ashost: appServer, 
        sysnr: instanceNum, 
        client, 
        status: 'connected' 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40" style={{ backdropFilter: 'blur(4px)' }}>
      <div className="rounded-2xl bg-white shadow-2xl" style={{ width: '420px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5 flex items-start gap-3">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
            <window.Icon name="shield" className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Connect SAP System</h2>
            <p className="text-sm text-gray-600 mt-1">Enter your SAP connection details to link this system</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 text-gray-400 transition-colors">
            <window.Icon name="x" className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!connected ? (
            <div className="space-y-4">
              {/* SAP Name */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">SAP Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={sapName} 
                  onChange={(e) => setSAPName(e.target.value)} 
                  placeholder="e.g. PRD, Production ERP"
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Application Server & Client (Side by Side) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Application Server <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={appServer} 
                    onChange={(e) => setAppServer(e.target.value)} 
                    placeholder="e.g. sap-prd.company.com"
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Client <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={client} 
                    onChange={(e) => setClient(e.target.value)} 
                    placeholder="e.g. 100"
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Instance Number */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Instance Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={instanceNum} 
                  onChange={(e) => setInstanceNum(e.target.value)} 
                  placeholder="e.g. 00"
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Username */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Username <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="SAP username"
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="SAP password"
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <window.Icon name="info" className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-white">
                  <window.Icon name="check" className="w-6 h-6" strokeWidth={3} />
                </div>
              </div>
              <p className="text-base font-bold text-emerald-900">Connected successfully</p>
              <p className="text-sm text-emerald-700 mt-2">{sapName} — {appServer} (client {client}) is now linked.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-3 flex gap-3 justify-end bg-gray-50">
          {!connected ? (
            <>
              <button 
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConnect} 
                disabled={connecting}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {connecting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect
                    <window.Icon name="arrow" className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </>
          ) : (
            <button 
              onClick={handleDone}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors w-full"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
