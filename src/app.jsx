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
          {hasSelectedRun && (
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                active === 'home'
                  ? 'bg-ink-900 text-white shadow-sm'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
              }`}
            >
              Dashboard
            </button>
          )}

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
  const [drawerContent, setDrawerContent] = useState(null);

  const [activeModalRisk, setActiveModalRisk] = useState(null);

  const modalUsers = useMemo(() => {
    if (!activeModalRisk || !activeModalRisk.affectedUsers) return [];
    return activeModalRisk.affectedUsers.map(uid => {
      const matched = (window.MOCK.ALL_USERS || []).find(u => u.userId === uid);
      if (matched) {
        return {
          userId: matched.userId,
          fullName: matched.fullName,
          dept: matched.processArea || matched.dept || 'IT Basis',
          role: matched.role || 'ZFI_BR_GL_POSTING',
          license: matched.accountType === 'Service' ? 'Service Account' : 'Limited Professional',
          severity: matched.severity || activeModalRisk.level
        };
      }
      const formattedName = uid.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return {
        userId: uid,
        fullName: formattedName,
        dept: uid.includes('FF') ? 'IT Basis' : 'Finance',
        role: 'ZFI_BR_GL_POSTING',
        license: uid.includes('FF') ? 'Professional' : 'Limited Professional',
        severity: activeModalRisk.level
      };
    });
  }, [activeModalRisk]);

  // Lifted Dashboard state for preservation
  const [dashboardStream, setDashboardStream] = useState(null);
  
  // Master User table state
  const [userSearch, setUserSearch] = useState('');
  const [userDept, setUserDept] = useState('All');
  const [userRisk, setUserRisk] = useState('All');
  const [userSodFilter, setUserSodFilter] = useState('All');
  const [userPage, setUserPage] = useState(1);
  const [userSort, setUserSort] = useState({ key: 'userId', dir: 'asc' });

  // Master Risk table state
  const [riskSearch, setRiskSearch] = useState('');
  const [riskProcess, setRiskProcess] = useState('All');
  const [riskLevel, setRiskLevel] = useState('All');
  const [riskSodFilter, setRiskSodFilter] = useState('All');
  const [riskPage, setRiskPage] = useState(1);
  const [riskSort, setRiskSort] = useState({ key: 'riskId', dir: 'asc' });

  // Scroll Position
  const [preservedScrollY, setPreservedScrollY] = useState(0);

  const handleNavigate = (key, id = null) => {
    if (['violation-detail', 'role-detail', 'compliance-detail'].includes(key)) {
      setDrawerContent({ type: key, id: id });
    } else {
      if (key === 'user-profile' || key === 'risk-detail') {
        // Save scroll position before leaving dashboard
        setPreservedScrollY(window.scrollY);
        setActive(key);
        setDetailId(id);
        setDrawerContent(null);
        window.scrollTo(0, 0);
      } else {
        setActive(key);
        setDetailId(id);
        setDrawerContent(null);
        if (key !== 'home') {
          window.scrollTo(0, 0);
          setPreservedScrollY(0); // Reset scroll if not going back to dashboard
        }
      }
    }
  };

  const handleSelectRun = (run) => {
    setSelectedRun(run);
    setHasSelectedRun(true);
    // Transition to Dashboard overview upon selection
    setActive('home');
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

    // 2. Lock dashboard if no run has been loaded yet
    if (!hasSelectedRun) {
      return <NoRunSelectedPrompt onSelectRun={handleSelectRun} />;
    }

    // 3. Render loaded pages
    if (active === 'home') {
      return (
        <window.LaunchPage 
          onNavigate={handleNavigate} 
          selectedRun={selectedRun}
          
          activeStream={dashboardStream}
          setActiveStream={setDashboardStream}
          
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          userDept={userDept}
          setUserDept={setUserDept}
          userRisk={userRisk}
          setUserRisk={setUserRisk}
          userSodFilter={userSodFilter}
          setUserSodFilter={setUserSodFilter}
          userPage={userPage}
          setUserPage={setUserPage}
          userSort={userSort}
          setUserSort={setUserSort}
          
          riskSearch={riskSearch}
          setRiskSearch={setRiskSearch}
          riskProcess={riskProcess}
          setRiskProcess={setRiskProcess}
          riskLevel={riskLevel}
          setRiskLevel={setRiskLevel}
          riskSodFilter={riskSodFilter}
          setRiskSodFilter={setRiskSodFilter}
          riskPage={riskPage}
          setRiskPage={setRiskPage}
          riskSort={riskSort}
          setRiskSort={setRiskSort}
          
          preservedScrollY={preservedScrollY}
          setPreservedScrollY={setPreservedScrollY}
          setActiveModalRisk={setActiveModalRisk}
        />
      );
    }
    
    if (active === 'user-profile')     return <window.UserProfilePage userId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;
    if (active === 'risk-detail')      return <window.RiskDetailPage riskId={detailId} onNavigate={handleNavigate} selectedRun={selectedRun} />;

    return (
      <div className="px-4 py-10 text-center">
        <h2 className="text-xl font-bold text-ink-900">Page under construction</h2>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 flex flex-col font-sans relative">
      <GrcTopHeader
        active={active}
        onNavigate={handleNavigate}
        selectedRun={selectedRun}
        onRunChange={handleSelectRun}
        hasSelectedRun={hasSelectedRun}
      />
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Affected Users Modal */}
      {activeModalRisk && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setActiveModalRisk(null)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden w-full max-w-2xl max-h-[85vh] flex flex-col z-10 border border-ink-150 animate-scale-in">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-ink-100 flex items-start justify-between bg-ink-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-100">
                    {activeModalRisk.riskId}
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-100">
                    {activeModalRisk.grcMapping || 'GRC Rule'}
                  </span>
                  <window.SeverityBadge value={activeModalRisk.level} />
                </div>
                <h3 className="text-base font-extrabold text-ink-900 mt-2 pr-6">
                  {activeModalRisk.title}
                </h3>
                <p className="text-xs text-ink-500 font-semibold mt-1">
                  Active User Accounts violating this Segregation of Duties check.
                </p>
              </div>
              <button 
                onClick={() => setActiveModalRisk(null)}
                className="text-ink-400 hover:text-ink-700 hover:bg-ink-100 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <window.Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="border border-ink-200 rounded-xl overflow-hidden shadow-sm bg-white text-left">
                <table className="w-full text-[12.5px] border-collapse">
                  <thead className="bg-ink-50 text-ink-650 font-bold uppercase text-[10px] border-b border-ink-200">
                    <tr>
                      <th className="px-4 py-2.5 text-left">User ID</th>
                      <th className="px-4 py-2.5 text-left">Full Name</th>
                      <th className="px-4 py-2.5 text-left">Department</th>
                      <th className="px-4 py-2.5 text-left">Role / Access</th>
                      <th className="px-4 py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100 font-medium text-ink-800">
                    {modalUsers.map(u => (
                      <tr key={u.userId} className="hover:bg-ink-50/40 transition-colors">
                        <td className="px-4 py-2.5 font-mono font-bold text-ink-900">{u.userId}</td>
                        <td className="px-4 py-2.5 font-semibold text-ink-850">{u.fullName}</td>
                        <td className="px-4 py-2.5 text-ink-600">{u.dept}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-ink-500 truncate max-w-[150px]" title={u.role}>{u.role}</td>
                        <td className="px-4 py-2.5 text-right">
                          <button 
                            onClick={() => {
                              setActiveModalRisk(null);
                              handleNavigate('user-profile', u.userId);
                            }}
                            className="px-2.5 py-1 rounded font-bold text-[11px] bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors inline-flex items-center gap-1"
                          >
                            <span>Profile</span>
                            <window.Icon name="arrow" className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {modalUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-ink-400 font-bold uppercase tracking-wider text-xs">
                          No violating users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-ink-100 bg-ink-50/30 flex items-center justify-between">
              <span className="text-xs font-bold text-ink-500">
                Total Violating Users: <span className="font-mono text-sm text-ink-950 font-black">{modalUsers.length}</span>
              </span>
              <button 
                onClick={() => setActiveModalRisk(null)}
                className="px-4 py-2 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-bold text-xs transition-colors shadow-sm focus:outline-none"
              >
                Close Dialog
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);