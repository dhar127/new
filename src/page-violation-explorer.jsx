const { useState, useMemo } = React;

// ────────────────────────────────────────────────────────────
// VIOLATION EXPLORER - DATA AGGREGATION & SEEDING
// ────────────────────────────────────────────────────────────
// In a real app, this would come from the backend. We'll build
// a robust mock engine here to simulate the cross-referencing.

// Use the base risks from the existing risk page mock
const BASE_RISKS = [
  { id: 'V-1042', title: 'Create Vendor + Approve Payment', level: 'Critical', process: 'Procurement', tcodes: ['FK01', 'F110'], roles: ['ZMM_BR_VENDOR_CREATE', 'ZFI_BR_AP_PAYMENT'], action: 'Separate vendor master edit roles from F110 execution profiles' },
  { id: 'V-1058', title: 'Full OTC Cycle Control', level: 'Critical', process: 'OTC', tcodes: ['VA01', 'VF01', 'F-28'], roles: ['ZSD_BR_SO_CREATE', 'ZSD_BR_BILLING_CREATE', 'ZFI_BR_AR_CLEAR'], action: 'Redesign role ZSD_BR_BILLING_CREATE' },
  { id: 'V-1063', title: 'GL Posting + Bank Reconciliation', level: 'Critical', process: 'Finance', tcodes: ['FB50', 'FF67'], roles: ['ZFI_BR_GL_POSTING', 'ZFI_BR_BANK_RECON'], action: 'Restrict manual general ledger posting' },
  { id: 'V-1071', title: 'PFCG Role-Admin + Transaction Access', level: 'Critical', process: 'IT', tcodes: ['PFCG', 'MIRO'], roles: ['ZBC_BR_SYSTEM_ADMIN', 'ZFI_BR_AP_INVOICE'], action: 'Revoke PFCG role maintenance profiles' },
  { id: 'V-1090', title: 'Firefighter ID Active >180 Days', level: 'High', process: 'IT', tcodes: ['/GRCPI/GRIA_FFLOG'], roles: ['ZBC_BR_SYSTEM_ADMIN'], action: 'Enforce firefighter ID expiry parameters' },
  { id: 'V-1094', title: 'PO Create + PO Release Over-Limit', level: 'High', process: 'Procurement', tcodes: ['ME21N', 'ME29N'], roles: ['ZMM_BR_PO_CREATE', 'ZMM_BR_PO_RELEASE'], action: 'Redesign release strategy parameters' },
  { id: 'V-1101', title: 'F110 Auto-Payment Run by Non-Treasury', level: 'High', process: 'Finance', tcodes: ['F110'], roles: ['ZFI_BR_AP_PAYMENT', 'ZFI_BR_TREASURY'], action: 'Restrict F110 transaction access' },
  { id: 'V-1124', title: 'Technical Account Holds SAP_ALL', level: 'Critical', process: 'IT', tcodes: ['*'], roles: ['SAP_ALL'], action: 'Replace SAP_ALL profiles with scoped roles' },
  { id: 'V-1131', title: 'Goods Receipt + Invoice Verification', level: 'Medium', process: 'Procurement', tcodes: ['MIGO', 'MIRO'], roles: ['ZMM_BR_GR_AUTO', 'ZFI_BR_AP_INVOICE'], action: 'Enforce three-way match checks' }
];

const generateMockUsers = () => {
  const list = [];
  const depts = ['Finance', 'Procurement', 'OTC', 'HR', 'IT Basis', 'Sales', 'Treasury'];
  const firstNames = ['John', 'David', 'Raj', 'Michael', 'Robert', 'William', 'James', 'Linda', 'Mary', 'Patricia', 'Sarah', 'Karthik', 'Sunita', 'Ellen', 'Hannah'];
  const lastNames = ['Smith', 'Lee', 'Kumar', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Iyer', 'Verma', 'Elliott', 'Clement', 'Nair'];

  // Ensure we have some specific users for demo purposes
  const coreUsers = ['HOANG.NGUYEN', 'JAE.KANG', 'FF.IT', 'SBRYAN', 'BATCH_USER'];

  for (let i = 0; i < 200; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const dept = depts[i % depts.length];
    const userId = i < coreUsers.length ? coreUsers[i] : `USR-${1000 + i}`;
    
    // Assign 1-4 random risks to each user (skewed towards 0 or 1)
    const numRisks = i % 5 === 0 ? 0 : (i % 3) + 1;
    const userRisks = [];
    
    let critical = 0, high = 0, medium = 0, low = 0;

    for (let j = 0; j < numRisks; j++) {
        // Pick a pseudo-random risk based on i and j
        const riskIndex = (i + j * 7) % BASE_RISKS.length;
        const risk = BASE_RISKS[riskIndex];
        userRisks.push({
            riskId: risk.id,
            // Generate user-specific context for this risk
            authObjects: ['S_TCODE', 'S_TABU_DIS', j % 2 === 0 ? 'S_DEVELOP' : 'F_BKPF_BUK'],
            assignedRoles: risk.roles,
            assignedTcodes: risk.tcodes,
        });

        if (risk.level === 'Critical') critical++;
        else if (risk.level === 'High') high++;
        else if (risk.level === 'Medium') medium++;
        else low++;
    }

    // Deduplicate risks per user
    const uniqueUserRisks = Array.from(new Map(userRisks.map(r => [r.riskId, r])).values());

    list.push({
      userId,
      firstName: fn,
      lastName: ln,
      fullName: `${fn} ${ln}`,
      dept,
      rolesCount: (i % 25) + 5,
      critical,
      high,
      medium,
      low,
      risks: uniqueUserRisks
    });
  }
  return list;
};

const EXPLORER_USERS = generateMockUsers();

// Build the inverted map: Risks -> Users
const EXPLORER_RISKS = BASE_RISKS.map(risk => {
    const affectedUsers = EXPLORER_USERS.filter(u => u.risks.some(r => r.riskId === risk.id));
    return {
        ...risk,
        userCount: affectedUsers.length,
        affectedUsers: affectedUsers.map(u => ({
            userId: u.userId,
            fullName: u.fullName,
            dept: u.dept,
            // Find the specific context for this user-risk combo
            context: u.risks.find(r => r.riskId === risk.id)
        }))
    };
});


// ────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────────
window.ViolationExplorerPage = function({ onNavigate, globalFilters }) {
  const [viewMode, setViewMode] = useState('user'); // 'user' | 'risk'
  
  // Master Table State
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState({ key: viewMode === 'user' ? 'userId' : 'id', dir: 'asc' });
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Selection State
  const [selectedMasterId, setSelectedMasterId] = useState(null); // userId or riskId
  const [selectedDetailId, setSelectedDetailId] = useState(null); // riskId (if user mode) or userId (if risk mode)

  // Reset selection and pagination when view mode changes
  const handleViewModeChange = (mode) => {
      setViewMode(mode);
      setSelectedMasterId(null);
      setSelectedDetailId(null);
      setPage(1);
      setSort({ key: mode === 'user' ? 'userId' : 'id', dir: 'asc' });
  };

  const handleMasterSelect = (id) => {
      if (selectedMasterId === id) {
          // Deselect
          setSelectedMasterId(null);
          setSelectedDetailId(null);
      } else {
          setSelectedMasterId(id);
          setSelectedDetailId(null); // Reset detail selection
      }
  };

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      dir: prev.key === key ? (prev.dir === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  // --- Filtering & Sorting Data ---

  const masterData = useMemo(() => {
    if (viewMode === 'user') {
        return EXPLORER_USERS.filter(u => {
            if (globalFilters?.severity && globalFilters.severity !== 'All') {
                const sev = globalFilters.severity.toLowerCase();
                if (sev === 'critical' && u.critical === 0) return false;
                if (sev === 'high' && u.high === 0) return false;
                if (sev === 'medium' && u.medium === 0) return false;
            }
            if (globalFilters?.department && globalFilters.department !== 'All') {
                if (u.dept !== globalFilters.department) return false;
            }
            if (searchTerm) {
                const q = searchTerm.toLowerCase();
                return u.userId.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q);
            }
            return true;
        }).sort((a, b) => {
            const dir = sort.dir === 'asc' ? 1 : -1;
            if (sort.key === 'riskCount') {
                const aRisk = a.critical * 10 + a.high * 5 + a.medium;
                const bRisk = b.critical * 10 + b.high * 5 + b.medium;
                return (aRisk - bRisk) * dir;
            }
            return String(a[sort.key] || '').localeCompare(String(b[sort.key] || '')) * dir;
        });
    } else {
        return EXPLORER_RISKS.filter(r => {
             if (globalFilters?.severity && globalFilters.severity !== 'All') {
                 if (r.level.toLowerCase() !== globalFilters.severity.toLowerCase()) return false;
             }
             if (globalFilters?.process && globalFilters.process !== 'All') {
                 if (r.process.toLowerCase() !== globalFilters.process.toLowerCase()) return false;
             }
             if (searchTerm) {
                 const q = searchTerm.toLowerCase();
                 return r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q);
             }
             return true;
        }).sort((a, b) => {
            const dir = sort.dir === 'asc' ? 1 : -1;
            if (sort.key === 'userCount') {
                return (a.userCount - b.userCount) * dir;
            }
            return String(a[sort.key] || '').localeCompare(String(b[sort.key] || '')) * dir;
        });
    }
  }, [viewMode, searchTerm, sort, globalFilters]);

  const pagedMasterData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return masterData.slice(start, start + pageSize);
  }, [masterData, page]);

  // Derived state for the Detail Pane
  const selectedMasterItem = useMemo(() => {
      if (!selectedMasterId) return null;
      if (viewMode === 'user') return EXPLORER_USERS.find(u => u.userId === selectedMasterId);
      return EXPLORER_RISKS.find(r => r.id === selectedMasterId);
  }, [selectedMasterId, viewMode]);

  return (
    <div data-screen-label="Violation Explorer" className="flex flex-col h-[calc(100vh-64px)] bg-ink-50/30 overflow-hidden">
        
      {/* 1. TOP CONTROL BAR */}
      <div className="flex-none bg-white border-b border-ink-200 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('runs')}
              className="p-1.5 rounded-lg border border-ink-200 bg-white hover:bg-ink-50 text-ink-500 hover:text-ink-700 transition-colors shadow-sm shrink-0 flex items-center justify-center"
              title="Back to Analysis Runs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-ink-955 tracking-tight">Violation Explorer</h1>
              <p className="text-xs text-ink-500 font-medium mt-0.5">Interactive Master-Detail analysis of SoD conflicts.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-end">
              {/* Mode Toggle */}
              <div className="flex bg-ink-100 rounded-lg p-1 border border-ink-200 shadow-inner shrink-0">
                  <button 
                    onClick={() => handleViewModeChange('user')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'user' ? 'bg-white text-ink-900 shadow-sm ring-1 ring-ink-200' : 'text-ink-500 hover:text-ink-700'}`}
                  >
                      User Basis
                  </button>
                  <button 
                    onClick={() => handleViewModeChange('risk')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'risk' ? 'bg-white text-ink-900 shadow-sm ring-1 ring-ink-200' : 'text-ink-500 hover:text-ink-700'}`}
                  >
                      Risk Basis
                  </button>
              </div>

              {/* Search filter and Dashboard button row */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="flex-1 sm:flex-initial sm:w-64">
                  <window.SearchInput
                      value={searchTerm}
                      onChange={val => { setSearchTerm(val); setPage(1); }}
                      placeholder={`Search ${viewMode === 'user' ? 'users...' : 'risks...'}`}
                  />
                </div>
                
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm shrink-0 whitespace-nowrap"
                >
                  <window.Icon name="home" className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
              </div>
          </div>
      </div>

      {/* 2. SPLIT LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
          
          {/* A. MASTER PANE */}
          <div className={`flex-1 flex flex-col bg-white border-r border-ink-200 transition-all duration-300 ${selectedMasterId ? 'max-w-[45%]' : 'max-w-full'}`}>
              
              {/* Master Header */}
              <div className="flex-none px-5 py-3 border-b border-ink-100 bg-ink-50/50 flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-500 uppercase tracking-wider">
                      {viewMode === 'user' ? 'Enterprise Identities' : 'Risk Rule Definitions'}
                  </span>
                  <span className="text-xs font-mono font-bold text-ink-400 bg-white px-2 py-0.5 rounded border border-ink-200 shadow-sm">
                      {masterData.length} records
                  </span>
              </div>

              {/* Master Table */}
              <div className="flex-1 overflow-auto">
                  <table className="w-full text-[12.5px] table-fixed">
                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                        {viewMode === 'user' ? (
                            <tr className="border-b border-ink-200">
                                <window.Th sortKey="userId" sort={sort} onSort={handleSort} className="w-32 px-4 py-3">User ID</window.Th>
                                <window.Th sortKey="fullName" sort={sort} onSort={handleSort} className="w-40 px-4 py-3">Name</window.Th>
                                <window.Th sortKey="dept" sort={sort} onSort={handleSort} className="w-28 px-4 py-3">Dept</window.Th>
                                <th className="w-32 px-4 py-3 text-right text-[10.5px] font-bold uppercase text-ink-500 tracking-wider">Risks (C/H/M/L)</th>
                            </tr>
                        ) : (
                            <tr className="border-b border-ink-200">
                                <window.Th sortKey="id" sort={sort} onSort={handleSort} className="w-24 px-4 py-3">Risk ID</window.Th>
                                <window.Th sortKey="title" sort={sort} onSort={handleSort} className="w-48 px-4 py-3">Title</window.Th>
                                <window.Th sortKey="level" sort={sort} onSort={handleSort} className="w-24 px-4 py-3">Severity</window.Th>
                                <window.Th sortKey="userCount" sort={sort} onSort={handleSort} align="right" className="w-24 px-4 py-3">Users</window.Th>
                            </tr>
                        )}
                    </thead>
                    <tbody className="divide-y divide-ink-100">
                        {pagedMasterData.map(item => {
                            const isSelected = selectedMasterId === (viewMode === 'user' ? item.userId : item.id);
                            
                            if (viewMode === 'user') {
                                const hasRisk = (item.critical + item.high + item.medium) > 0;
                                return (
                                    <tr 
                                        key={item.userId} 
                                        onClick={() => handleMasterSelect(item.userId)}
                                        className={`cursor-pointer transition-colors ${isSelected ? 'bg-brand-50/50' : 'hover:bg-ink-50'}`}
                                    >
                                        <td className="px-4 py-3 font-mono font-bold text-ink-900 truncate">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-brand-500' : 'bg-transparent'}`} />
                                                {item.userId}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-ink-700 truncate">{item.fullName}</td>
                                        <td className="px-4 py-3 text-ink-500 truncate">{item.dept}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="inline-flex gap-1 font-mono font-bold text-[11px] bg-white border border-ink-150 rounded px-1.5 py-0.5 shadow-sm">
                                                <span className={item.critical > 0 ? 'text-rose-600' : 'text-ink-300'}>{item.critical}</span>
                                                <span className="text-ink-300">/</span>
                                                <span className={item.high > 0 ? 'text-orange-600' : 'text-ink-300'}>{item.high}</span>
                                                <span className="text-ink-300">/</span>
                                                <span className={item.medium > 0 ? 'text-amber-600' : 'text-ink-300'}>{item.medium}</span>
                                                <span className="text-ink-300">/</span>
                                                <span className={item.low > 0 ? 'text-blue-500' : 'text-ink-300'}>{item.low}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr 
                                        key={item.id} 
                                        onClick={() => handleMasterSelect(item.id)}
                                        className={`cursor-pointer transition-colors ${isSelected ? 'bg-brand-50/50' : 'hover:bg-ink-50'}`}
                                    >
                                        <td className="px-4 py-3 font-mono font-bold text-ink-900">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-brand-500' : 'bg-transparent'}`} />
                                                {item.id}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-ink-800 truncate" title={item.title}>{item.title}</td>
                                        <td className="px-4 py-3"><window.SeverityBadge value={item.level} /></td>
                                        <td className="px-4 py-3 text-right font-mono font-bold text-ink-600">
                                            {item.userCount}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                  </table>
              </div>
              <div className="flex-none border-t border-ink-200">
                  <window.Pagination page={page} pageSize={pageSize} total={masterData.length} onPage={setPage} />
              </div>
          </div>

          {/* B. DETAIL PANE */}
          {selectedMasterId ? (
              <div className="flex-1 flex flex-col bg-ink-50/50 overflow-hidden relative shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                  {/* Close button for mobile/tight screens */}
                  <button 
                    onClick={() => setSelectedMasterId(null)}
                    className="absolute top-4 right-4 p-1.5 bg-white border border-ink-200 rounded-md text-ink-400 hover:text-ink-700 shadow-sm z-20"
                  >
                      <window.Icon name="x" className="w-4 h-4" />
                  </button>

                  {viewMode === 'user' ? (
                      <UserDetailPane 
                        user={selectedMasterItem} 
                        selectedRiskId={selectedDetailId} 
                        onRiskSelect={setSelectedDetailId}
                        onNavigate={onNavigate}
                      />
                  ) : (
                      <RiskDetailPane 
                        risk={selectedMasterItem} 
                        selectedUserId={selectedDetailId} 
                        onUserSelect={setSelectedDetailId}
                        onNavigate={onNavigate}
                      />
                  )}
              </div>
          ) : (
              <div className="flex-1 hidden md:flex flex-col items-center justify-center text-ink-400 p-8 text-center bg-white/50">
                  <div className="w-16 h-16 bg-ink-100 rounded-full flex items-center justify-center mb-4 border border-ink-200">
                      <window.Icon name="shield" className="w-8 h-8 text-ink-300" />
                  </div>
                  <h3 className="text-sm font-bold text-ink-700 mb-1">Select an item to view forensic details</h3>
                  <p className="text-xs max-w-sm mx-auto leading-relaxed">
                      Choose a {viewMode === 'user' ? 'user identity' : 'risk definition'} from the master list to drill down into the underlying roles, transaction codes, and authorization objects causing the conflict.
                  </p>
              </div>
          )}

      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// SUB-PANEL: USER DETAIL (When ViewMode = 'user')
// ────────────────────────────────────────────────────────────
function UserDetailPane({ user, selectedRiskId, onRiskSelect, onNavigate }) {
    if (!user) return null;

    const selectedRiskContext = user.risks.find(r => r.riskId === selectedRiskId);
    const selectedRiskDef = BASE_RISKS.find(br => br.id === selectedRiskId);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex-none p-6 bg-white border-b border-ink-200 shadow-sm relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-ink-900 text-white flex items-center justify-center font-bold text-xl shadow-md border border-ink-800">
                        {user.userId.slice(0, 2)}
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-0.5">Identity Profile</div>
                        <h2 className="text-xl font-extrabold text-ink-900">{user.userId}</h2>
                        <div className="flex items-center gap-2 mt-1 text-xs text-ink-600 font-medium">
                            <span>{user.fullName}</span>
                            <span className="text-ink-300">•</span>
                            <span>{user.dept}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of Risks for this User */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-3 flex items-center justify-between">
                        <span>Active SoD Violations ({user.risks.length})</span>
                        {user.risks.length === 0 && <span className="text-emerald-600">Compliant Profile</span>}
                    </h3>
                    
                    <div className="space-y-3">
                        {user.risks.map(rContext => {
                            const riskDef = BASE_RISKS.find(br => br.id === rContext.riskId);
                            const isSelected = selectedRiskId === rContext.riskId;
                            
                            return (
                                <div 
                                    key={rContext.riskId}
                                    className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${isSelected ? 'border-brand-400 ring-1 ring-brand-400' : 'border-ink-200 hover:border-ink-300'}`}
                                >
                                    {/* Risk Card Header (Clickable) */}
                                    <div 
                                        className="p-4 cursor-pointer flex items-start gap-4"
                                        onClick={() => onRiskSelect(isSelected ? null : rContext.riskId)}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono font-bold text-sm text-ink-900">{rContext.riskId}</span>
                                                <window.SeverityBadge value={riskDef?.level} />
                                            </div>
                                            <p className="text-[12.5px] font-semibold text-ink-700">{riskDef?.title}</p>
                                        </div>
                                        <div className="flex-none pt-1">
                                            <window.Icon name="chevron" className={`w-4 h-4 text-ink-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                                        </div>
                                    </div>

                                    {/* Risk Drill-Down Content (Roles/Tcodes/Auths specific to THIS user) */}
                                    {isSelected && (
                                        <div className="bg-ink-50/50 p-4 border-t border-ink-150 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2">
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Conflicting Assigned Roles</span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {rContext.assignedRoles.map(r => <window.Role key={r} role={r} />)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Authorized T-Codes Executed</span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {rContext.assignedTcodes.map(tc => <window.TCode key={tc} code={tc} />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Auth Objects Checked</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {rContext.authObjects.map(ao => (
                                                            <span key={ao} className="font-mono text-[10px] font-bold bg-white text-ink-600 ring-1 ring-ink-200 px-1.5 py-0.5 rounded">{ao}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Required Remediation</span>
                                                    <p className="text-[11.5px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded p-2 leading-snug">
                                                        {riskDef?.action}
                                                    </p>
                                                </div>
                                                <div className="pt-2">
                                                    <button 
                                                        onClick={() => onNavigate('violation-detail', rContext.riskId)}
                                                        className="text-[11px] font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
                                                    >
                                                        View Full Risk Blueprint <window.Icon name="chevron" className="w-3 h-3 rotate-[-90deg]" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// SUB-PANEL: RISK DETAIL (When ViewMode = 'risk')
// ────────────────────────────────────────────────────────────
function RiskDetailPane({ risk, selectedUserId, onUserSelect, onNavigate }) {
    if (!risk) return null;

    const selectedUserContext = risk.affectedUsers.find(u => u.userId === selectedUserId);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex-none p-6 bg-white border-b border-ink-200 shadow-sm relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">Rule Set Definition</div>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-extrabold text-ink-900 font-mono">{risk.id}</h2>
                            <window.SeverityBadge value={risk.level} />
                        </div>
                        <p className="text-[13px] text-ink-600 font-semibold">{risk.title}</p>
                    </div>
                    <button 
                        onClick={() => onNavigate('risk-detail', risk.id)}
                        className="px-3 py-1.5 rounded bg-ink-900 text-white hover:bg-ink-800 font-bold text-[11px] transition-colors whitespace-nowrap"
                    >
                        Risk Settings
                    </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-ink-100 flex flex-wrap gap-4">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Process Area</span>
                        <span className="text-[11px] font-bold text-ink-700 bg-ink-100 px-2 py-0.5 rounded">{risk.process}</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Global Remediation Policy</span>
                        <span className="text-[11px] font-semibold text-ink-700">{risk.action}</span>
                    </div>
                </div>
            </div>

            {/* List of Users violating this Risk */}
            <div className="flex-1 overflow-auto p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-3 flex items-center justify-between">
                    <span>Identities in Violation ({risk.userCount})</span>
                </h3>

                <div className="space-y-2">
                    {risk.affectedUsers.map(user => {
                        const isSelected = selectedUserId === user.userId;
                        return (
                            <div 
                                key={user.userId}
                                className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${isSelected ? 'border-brand-400 ring-1 ring-brand-400' : 'border-ink-200 hover:border-ink-300'}`}
                            >
                                {/* User Card Header */}
                                <div 
                                    className="p-3 cursor-pointer flex items-center gap-3"
                                    onClick={() => onUserSelect(isSelected ? null : user.userId)}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'}`}>
                                        {user.userId.slice(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-mono font-bold text-sm text-ink-900">{user.userId}</div>
                                        <div className="text-[11px] font-medium text-ink-500">{user.fullName} • {user.dept}</div>
                                    </div>
                                    <div className="flex-none">
                                        <window.Icon name="chevron" className={`w-4 h-4 text-ink-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                                    </div>
                                </div>

                                {/* User Forensic Drill-Down */}
                                {isSelected && user.context && (
                                    <div className="bg-ink-50/50 p-4 border-t border-ink-150 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                                        <div>
                                            <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Conflicting Assigned Roles</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {user.context.assignedRoles.map(r => <window.Role key={r} role={r} />)}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-500 block mb-2">Authorized T-Codes Executed</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {user.context.assignedTcodes.map(tc => <window.TCode key={tc} code={tc} />)}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 pt-2 border-t border-ink-150 flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-ink-500 font-semibold">
                                                Auth Objects Checked: {user.context.authObjects.join(', ')}
                                            </span>
                                            <button 
                                                onClick={() => onNavigate('user-profile', user.userId)}
                                                className="text-[11px] font-bold text-brand-600 hover:text-brand-700 hover:underline"
                                            >
                                                View Identity Profile
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Attach the new component to the window object so it can be routed to in app.jsx
window.ViolationExplorerPage = window.ViolationExplorerPage;
