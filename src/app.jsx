const { useState, useRef, useEffect, useMemo } = React;

const PAGE_TITLES = {
  'runs':             ['Runs', 'Analysis Runs'],
  'home':             ['Dashboard', 'Executive Overview'],
  'sod-04':           ['Immediate Actions', 'Critical Violations requiring urgent remediation'],
  'sod-05':           ['Compliance Impact', 'Compliance impact assessment across user population'],
  'sod-06':           ['Super Administrators', 'Privileged account monitoring and control'],
  'sod-07':           ['Cross-Process Conflicts', 'Dual process control and conflict analysis'],
  'sod-08':           ['Emergency Access', 'Firefighter ID lifecycle and usage monitoring'],
  'sod-p2p':          ['Procure-to-Pay', 'High-risk authorization combinations in P2P cycle'],
  'sod-09':           ['Order-to-Cash', 'OTC lifecycle control and ownership violations'],
  'sod-10':           ['Service Accounts', 'High-risk service account detection and governance'],
  'sod-11':           ['Remediation', 'Execution tracking and remediation governance'],
  'users':            ['User Inventory', 'SAP User Master Directory'],
  'risks':            ['Risk Catalog', 'Segregation of Duties Risk Directory'],
  'violation-detail': ['Violation Details', 'Forensic Audit Details for Conflict'],
  'user-profile':     ['User Profile', 'SAP Identity Authorization Blueprint'],
  'role-detail':      ['Role Profile', 'SAP Role Transaction Scope'],
  'risk-detail':      ['Risk Blueprint', 'SoD Rule Definition Mapping'],
};

// Selectable modules start from SOD-04 onwards, as SOD-01, SOD-02, and SOD-03 are displayed on the dashboard
const SOD_MODULES = [
  { id: 'violation-explorer', code: 'EXPLORER', name: 'Violation Explorer', desc: 'Interactive Master-Detail analysis of all SoD conflicts. Group by User or Risk to drill down into the forensic details of roles and T-Codes.' },
  { id: 'sod-04',  code: 'SOD-04', name: 'Immediate Actions', desc: 'KTern.AI identifies violations requiring urgent remediation and provides specific actionable steps such as access revocation, role redesign, or emergency access governance.' },
  { id: 'sod-05',  code: 'SOD-05', name: 'Compliance Impact', desc: 'Maps identified SoD violations to their potential operational and regulatory impact using rule-based and AI-assisted analysis.' },
  { id: 'sod-06',  code: 'SOD-06', name: 'Super Administrators', desc: 'Detects users with unrestricted or near-unrestricted access across SAP systems, highlighting concentration-of-power risks and non-compliant access patterns.' },
  { id: 'sod-07',  code: 'SOD-07', name: 'Dual Process Control', desc: 'Identifies users controlling multiple end-to-end business processes through cross-role and transaction analysis based on SAP standard dual process control violations.' },
  { id: 'sod-08',  code: 'SOD-08', name: 'Emergency Access', desc: 'Analyzes firefighter and emergency access usage patterns, detecting excessive access, prolonged assignments, and missing approvals.' },
  { id: 'sod-09',  code: 'SOD-09', name: 'OTC Control', desc: 'Flags users with end-to-end Order-to-Cash control, combining transactional authority and financial posting privileges across the OTC process cycle.' },
  { id: 'sod-10',  code: 'SOD-10', name: 'Service Accounts', desc: 'Identifies service and technical accounts with excessive or unmanaged privileges, including background job and integration users.' },
  { id: 'sod-11',  code: 'SOD-11', name: 'Remediation Governance', desc: 'Provides AI-backed remediation recommendations including role redesign, access removal, mitigating controls, and governance policy suggestions.' },
];

/* ── Dropdown Helper ────────────────────────────────────────── */
function Dropdown({ trigger, children, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div onClick={() => setOpen(o => !o)} className="cursor-pointer">{trigger(open)}</div>
      {open && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full mt-1.5 z-50 min-w-[240px] rounded-xl border border-ink-200 bg-white shadow-pop py-1.5 overflow-hidden`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Premium Dropdown component for SoD Modules (Violation Streams) ── */
function ViolationStreamsDropdown({ active, onNavigate, disabled }) {
  const [open, setOpen] = useState(false);
  const [activeDesc, setActiveDesc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveDesc(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => {
          if (disabled) return;
          setOpen(o => !o);
        }}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ring-1 ring-inset ${
          disabled 
            ? 'opacity-55 cursor-not-allowed bg-ink-50 text-ink-400 border-ink-100 ring-transparent'
            : open 
              ? 'bg-ink-100 border-ink-300 text-ink-900 ring-transparent' 
              : 'bg-white border-ink-200 text-ink-700 hover:bg-ink-50 ring-ink-150'
        }`}
      >
        <window.Icon name="table" className={`w-3.5 h-3.5 ${disabled ? 'text-ink-300' : 'text-brand-600'}`} />
        <span>Violation Streams</span>
        <window.Icon name="chevronDown" className="w-3 h-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-[350px] rounded-xl border border-ink-200 bg-white shadow-pop py-1.5 overflow-hidden pop-in">
          <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 bg-ink-50 flex items-center justify-between">
            <span>SoD Compliance Modules</span>
            <span className="text-[9px] font-mono text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded uppercase font-extrabold">SOD-04 — SOD-11</span>
          </div>
          <div className="max-h-[380px] overflow-y-auto divide-y divide-ink-100">
            {SOD_MODULES.map(m => {
              const isSelected = active === m.id;
              const hasDescOpen = activeDesc === m.code;
              return (
                <div key={m.code} className={`transition-colors ${isSelected ? 'bg-brand-50/20' : 'hover:bg-ink-50/50'}`}>
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <button
                      onClick={() => {
                        onNavigate(m.id);
                        setOpen(false);
                        setActiveDesc(null);
                      }}
                      className={`flex-1 text-left text-xs font-medium flex items-center gap-1.5 ${
                        isSelected ? 'text-brand-700 font-bold' : 'text-ink-850'
                      }`}
                    >
                      <span className={`font-mono text-[10.5px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-600'
                      }`}>
                        {m.code}
                      </span>
                      <span>{m.name}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDesc(hasDescOpen ? null : m.code);
                      }}
                      className={`p-1.5 rounded transition-colors ${
                        hasDescOpen ? 'text-brand-600 bg-brand-50' : 'text-ink-400 hover:text-brand-600 hover:bg-ink-100'
                      }`}
                      title="Show PRD description"
                    >
                      <window.Icon name="info" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {hasDescOpen && (
                    <div className="px-5 pb-3 pt-0.5 text-[11px] text-ink-600 font-medium leading-relaxed bg-brand-50/10 border-l-4 border-brand-500">
                      "{m.desc}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Top Bar Header ─────────────────────────────────────────── */
function GrcTopHeader({ active, onNavigate, selectedRun, onRunChange, hasSelectedRun }) {
  const MOCK_RUNS = window.MOCK.ANALYSIS_RUNS.map(r => ({
    id: r.id,
    label: `${r.id} · ${r.date.split(' · ')[0]}`
  }));

  const activeRunLabel = selectedRun 
    ? `${selectedRun.id} · ${selectedRun.date}`
    : "No Run Selected";

  return (
    <header className="sticky top-0 z-40 bg-white text-ink-900 border-b border-ink-200 shadow-sm shrink-0">
      <div className="flex items-center gap-3 px-4 md:px-7 h-16 justify-between">
        
        {/* Left branding and run selectors */}
        <div className="flex items-center gap-3">
          
          {/* Logo (Shield check + KTern SoD) */}
          <button
            onClick={() => onNavigate('runs')}
            className="flex items-center gap-2 mr-3 hover:opacity-90 transition-all shrink-0"
          >
            <div className="h-7 w-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white shadow-sm border border-ink-150">
              <img src="kternai.png" alt="KTern Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-black tracking-tight text-ink-900 font-sans">
              KTern SoD
            </span>
          </button>

          {/* Active Run Selector Dropdown */}
          <Dropdown trigger={open => (
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ring-1 ring-inset ${
              open ? 'bg-ink-100 border-ink-300 text-ink-900' : 'bg-white border-ink-200 text-ink-700 hover:bg-ink-50'
            }`}>
              <window.Icon name="play" className="w-3.5 h-3.5 text-red-600" />
              <span>{activeRunLabel}</span>
              <window.Icon name="chevronDown" className="w-3 h-3 text-ink-400" />
            </button>
          )}>
            <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 bg-ink-50">Select Audit Run</div>
            {MOCK_RUNS.map(r => (
              <button
                key={r.id}
                onClick={() => {
                  const fullRunObj = window.MOCK.ANALYSIS_RUNS.find(run => run.id === r.id);
                  const processedRun = {
                    id: fullRunObj.id,
                    name: fullRunObj.name,
                    sapSystem: 'PRD (Client 100)',
                    date: fullRunObj.date.split(' · ')[0],
                    status: fullRunObj.status,
                    usersAnalyzed: fullRunObj.users,
                    violationsFound: fullRunObj.violations,
                    complianceScore: fullRunObj.matchRate,
                    criticalViolationsCount: fullRunObj.id === 'LCSOD-2026-Q2-007' ? 18 : fullRunObj.id === 'LCSOD-2026-Q1-006' ? 15 : 22,
                    createdBy: fullRunObj.createdBy,
                    rolesAnalyzed: fullRunObj.roles
                  };
                  onRunChange(processedRun);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center justify-between gap-3 ${
                  selectedRun && r.id === selectedRun.id 
                    ? 'bg-rose-50 text-rose-700 font-bold' 
                    : 'text-ink-700 hover:bg-ink-50 font-medium'
                }`}
              >
                <span>{r.label}</span>
                {selectedRun && r.id === selectedRun.id && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600">Active</span>
                )}
              </button>
            ))}
          </Dropdown>

        </div>

        {/* Right Tab Pills */}
        <div className="flex items-center gap-1.5">
          <ViolationStreamsDropdown 
            active={active} 
            onNavigate={onNavigate} 
            disabled={!hasSelectedRun} 
          />

          <button
            onClick={() => onNavigate('violation-explorer')}
            className={`hidden md:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              active === 'violation-explorer'
                ? 'bg-ink-900 text-white shadow-sm'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
            }`}
          >
            Explorer
          </button>

          {/* Dashboard tab button removed to enforce flow */}
          
          <button
            onClick={() => onNavigate('runs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              active === 'runs'
                ? 'bg-ink-900 text-white shadow-sm'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
            }`}
          >
            Runs
          </button>
        </div>

      </div>
    </header>
  );
}

/* ── Run Not Selected Prompt State ─────────────────────────────── */
function NoRunSelectedPrompt({ onSelectRun }) {
  const runs = window.MOCK.ANALYSIS_RUNS;
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center animate-fade-in">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200 mx-auto mb-6 shadow-sm">
        <window.Icon name="play" className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-ink-900 tracking-tight">Select an Analysis Run to view Dashboard</h2>
      <p className="mt-2 text-sm text-ink-500 max-w-md mx-auto">
        To explore SoD violation modules, risk analysis dashboards, and remediation logs, you must first select an active audit run.
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
        {runs.map(run => (
          <div
            key={run.id}
            onClick={() => {
              const processedRun = {
                id: run.id,
                name: run.name,
                sapSystem: 'PRD (Client 100)',
                date: run.date.split(' · ')[0],
                status: run.status,
                usersAnalyzed: run.users,
                violationsFound: run.violations,
                complianceScore: run.matchRate,
                criticalViolationsCount: run.id === 'LCSOD-2026-Q2-007' ? 18 : run.id === 'LCSOD-2026-Q1-006' ? 15 : 22,
                createdBy: run.createdBy,
                rolesAnalyzed: run.roles
              };
              onSelectRun(processedRun);
            }}
            className="bg-white rounded-xl p-5 ring-1 ring-ink-200 hover:ring-rose-500 shadow-card hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-mono font-bold">{run.id}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded">{run.status}</span>
              </div>
              <h4 className="text-sm font-bold text-ink-900 leading-tight">{run.name}</h4>
              <p className="text-[10px] text-ink-450 mt-1 leading-normal font-mono">{run.date}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink-500">Violations: <b className="font-mono text-ink-900">{run.violations}</b></span>
              <button
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Open Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── App Mount Component ────────────────────────────────────── */
const App = () => {
  const [active, setActive] = useState('runs'); // Landing page must be Analysis Runs
  const [selectedRun, setSelectedRun] = useState(null);
  const [hasSelectedRun, setHasSelectedRun] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [globalFilters, setGlobalFilters] = useState({ severity: 'All', department: 'All', process: 'All' });
  const [drawerContent, setDrawerContent] = useState(null);

  const handleNavigate = (key, id = null) => {
    if (['violation-detail', 'user-profile', 'role-detail', 'risk-detail', 'compliance-detail'].includes(key)) {
      setDrawerContent({ type: key, id: id });
    } else {
      setActive(key);
      setDetailId(null);
      setDrawerContent(null);
      window.scrollTo(0, 0);
    }
  };

  const handleFilterApply = (filters) => {
    setGlobalFilters(prev => ({ ...prev, ...filters }));
  };

  const handleSelectRun = (run) => {
    setSelectedRun(run);
    setHasSelectedRun(true);
    // Transition to explorer upon selection
    setActive('violation-explorer');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    // 1. Landing runs page is always accessible
    if (active === 'runs') {
      return (
        <window.RunsPage 
          onNavigate={handleNavigate} 
          onSelectRun={handleSelectRun} 
          selectedRun={selectedRun} 
        />
      );
    }

    // 2. Lock dashboard/SoD modules if no run has been loaded yet
    if (!hasSelectedRun) {
      return <NoRunSelectedPrompt onSelectRun={handleSelectRun} />;
    }

    // 3. Render loaded pages
    if (active === 'home')             return <window.LaunchPage onNavigate={handleNavigate} onFilterApply={handleFilterApply} selectedRun={selectedRun} />;
    if (active === 'violation-explorer') return <window.ViolationExplorerPage onNavigate={handleNavigate} globalFilters={globalFilters} selectedRun={selectedRun} />;
    if (active === 'users')            return <window.UsersPage onNavigate={handleNavigate} globalFilters={globalFilters} selectedRun={selectedRun} />;
    if (active === 'risks')            return <window.RisksPage onNavigate={handleNavigate} globalFilters={globalFilters} selectedRun={selectedRun} />;
    if (active === 'violation-detail') return <window.ViolationDetailPage violationId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'user-profile')     return <window.UserProfilePage userId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'role-detail')      return <window.RoleDetailPage roleId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'risk-detail')      return <window.RiskDetailPage riskId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;

    // Stream pages (SOD-04 onwards)
    if (active === 'sod-04')  return <window.Sod04Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-05')  return <window.Sod05Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-06')  return <window.Sod06Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-07')  return <window.Sod07Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-p2p') return <window.SodP2pPage onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-08')  return <window.Sod08Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-09')  return <window.Sod09Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-10')  return <window.Sod10Page onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'sod-11')  return <window.Sod11Page onNavigate={handleNavigate} selectedRun={selectedRun} />;

    return (
      <div className="px-4 py-10 text-center">
        <h2 className="text-xl font-bold text-ink-900">Page under construction</h2>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 overflow-x-hidden flex flex-col font-sans relative">
      <GrcTopHeader
        active={active}
        onNavigate={handleNavigate}
        selectedRun={selectedRun}
        onRunChange={handleSelectRun}
        hasSelectedRun={hasSelectedRun}
      />
      <main className="flex-1 overflow-x-hidden">
        {renderPage()}
      </main>

      {/* Slide-over Side Drawer for drill-downs */}
      {drawerContent && (
        <div className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-[2px] flex justify-end">
          {/* Click overlay to close */}
          <div className="absolute inset-0" onClick={() => setDrawerContent(null)} />
          
          {/* Drawer Panel */}
          <div className="w-full max-w-5xl bg-ink-50 h-full shadow-2xl flex flex-col relative z-10 border-l border-ink-200 animate-slide-in overflow-y-auto">
            {/* Sticky Header Row */}
            <div className="sticky top-0 z-50 bg-white border-b border-ink-200 px-6 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600 font-mono">
                  {drawerContent.type.replace('-', ' ')}
                </span>
                {drawerContent.id && (
                  <>
                    <span className="text-ink-300">|</span>
                    <span className="text-xs font-bold text-ink-900 font-mono">ID: {drawerContent.id}</span>
                  </>
                )}
              </div>
              
              <button
                onClick={() => setDrawerContent(null)}
                className="p-1.5 rounded-lg border border-ink-200 bg-white hover:bg-ink-100 text-ink-500 hover:text-ink-700 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold"
                title="Close Detail Panel"
              >
                <window.Icon name="x" className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            {/* Drawer Body content */}
            <div className="flex-1">
              {drawerContent.type === 'violation-detail' && (
                <window.ViolationDetailPage
                  violationId={drawerContent.id}
                  onNavigate={handleNavigate}
                  selectedRun={selectedRun}
                />
              )}
              {drawerContent.type === 'user-profile' && (
                <window.UserProfilePage
                  userId={drawerContent.id}
                  onNavigate={handleNavigate}
                  selectedRun={selectedRun}
                />
              )}
              {drawerContent.type === 'role-detail' && (
                <window.RoleDetailPage
                  roleId={drawerContent.id}
                  onNavigate={handleNavigate}
                  selectedRun={selectedRun}
                />
              )}
              {drawerContent.type === 'risk-detail' && (
                <window.RiskDetailPage
                  riskId={drawerContent.id}
                  onNavigate={handleNavigate}
                  selectedRun={selectedRun}
                />
              )}
              {drawerContent.type === 'compliance-detail' && (
                <window.ComplianceDetailPage
                  onNavigate={handleNavigate}
                  selectedRun={selectedRun}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);