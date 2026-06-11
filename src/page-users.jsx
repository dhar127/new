const { useState, useMemo } = React;

// Pre-seeded base users from actual mock data details to ensure parity
const BASE_USERS = [
  { userId: 'HOANG.NGUYEN', firstName: 'Hoang', lastName: 'Nguyen', dept: 'Finance', rolesCount: 237, critical: 8, high: 12, medium: 3, low: 0, lastLogin: '2026-05-19 12:44', action: 'Split SD billing authority' },
  { userId: 'JAE.KANG', firstName: 'Jae', lastName: 'Kang', dept: 'Finance', rolesCount: 148, critical: 6, high: 8, medium: 5, low: 0, lastLogin: '2026-05-18 10:15', action: 'Split SD billing authority' },
  { userId: 'PVALENCIA', firstName: 'Valencia', lastName: 'Patricia', dept: 'Finance', rolesCount: 107, critical: 4, high: 7, medium: 2, low: 0, lastLogin: '2026-05-19 11:20', action: 'Redesign billing role ZSD_BR_BILLING_CREATE' },
  { userId: 'RUTGER.DUKES', firstName: 'Rutger', lastName: 'Dukes', dept: 'Finance', rolesCount: 50, critical: 2, high: 4, medium: 1, low: 0, lastLogin: '2026-05-15 08:30', action: 'Revoke SD Billing access' },
  { userId: 'WBERRYMAN', firstName: 'Wendy', lastName: 'Berryman', dept: 'Finance', rolesCount: 51, critical: 3, high: 3, medium: 2, low: 0, lastLogin: '2026-05-17 14:02', action: 'Revoke SD Billing access' },
  { userId: 'FF.IT', firstName: 'Ely', lastName: 'Taleon', dept: 'IT Basis', rolesCount: 78, critical: 12, high: 15, medium: 4, low: 0, lastLogin: '2026-05-19 09:12', action: 'Revoke PFCG role admin authority' },
  { userId: 'JSONNIER', firstName: 'James', lastName: 'Sonnier', dept: 'Finance', rolesCount: 35, critical: 5, high: 4, medium: 0, low: 0, lastLogin: '2026-05-12 16:34', action: 'Revoke PFCG from end-users' },
  { userId: 'SBRYAN', firstName: 'Stephanie', lastName: 'Bryan', dept: 'Finance', rolesCount: 96, critical: 9, high: 9, medium: 1, low: 0, lastLogin: '2026-05-19 15:45', action: 'Revoke PFCG from end-users' },
  { userId: 'SUNIL.SAHAI', firstName: 'Sunil', lastName: 'Sahai', dept: 'Finance', rolesCount: 78, critical: 7, high: 8, medium: 2, low: 0, lastLogin: '2026-05-19 10:10', action: 'Separate administrative profile' },
  { userId: 'VRADHAKRISHN', firstName: 'Vinoth', lastName: 'Radhakrishnan', dept: 'Finance', rolesCount: 74, critical: 5, high: 6, medium: 1, low: 0, lastLogin: '2026-05-18 09:00', action: 'Revoke PFCG from end-users' },
  { userId: 'BATCH_USER', firstName: 'Batch', lastName: 'System', dept: 'IT Basis', rolesCount: 44, critical: 15, high: 18, medium: 5, low: 0, lastLogin: '2026-05-19 04:00', action: 'Replace with scoped profile' },
  { userId: 'DDIC', firstName: 'Data', lastName: 'Dictionary', dept: 'IT Basis', rolesCount: 9, critical: 8, high: 5, medium: 1, low: 0, lastLogin: '2026-05-19 00:01', action: 'Deactivate / restrict DDIC access' },
  { userId: 'KTERN_SERVIC', firstName: 'KTern', lastName: 'Connection', dept: 'IT Basis', rolesCount: 7, critical: 6, high: 4, medium: 0, low: 0, lastLogin: '2026-05-19 03:00', action: 'Restrict profile authorizations' },
  { userId: 'RFCUSER', firstName: 'RFC', lastName: 'System User', dept: 'IT Basis', rolesCount: 13, critical: 5, high: 2, medium: 0, low: 0, lastLogin: '2026-05-19 02:15', action: 'Enforce technical user policies' },
  { userId: 'SAPSUPPORT', firstName: 'SAP', lastName: 'Support Admin', dept: 'IT Basis', rolesCount: 70, critical: 10, high: 12, medium: 4, low: 0, lastLogin: '2026-05-14 11:22', action: 'Revoke SAP_ALL profile' },
];

// Dynamically generate up to 540 users to make it completely scalable and realistic
const generateMockUsers = () => {
  const list = [...BASE_USERS];
  const depts = ['Finance', 'Procurement', 'OTC', 'HR', 'IT Basis', 'Sales', 'Treasury'];
  const actions = [
    'Revoke conflicting role',
    'Split T-code authorizations',
    'Assign compensating control',
    'Review firefighter logs',
    'Perform quarterly attestation',
    'None - Compliant'
  ];
  const firstNames = ['John', 'David', 'Raj', 'Michael', 'Robert', 'William', 'James', 'Linda', 'Mary', 'Patricia', 'Sarah', 'Karthik', 'Sunita', 'Ellen', 'Hannah'];
  const lastNames = ['Smith', 'Lee', 'Kumar', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Iyer', 'Verma', 'Elliott', 'Clement', 'Nair'];

  for (let i = list.length + 1; i <= 540; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const dept = depts[i % depts.length];
    const roles = (i % 25) + 3;
    const critical = i % 19 === 0 ? 1 : 0;
    const high = i % 13 === 0 ? (i % 3) + 1 : 0;
    const medium = i % 7 === 0 ? (i % 2) + 1 : 0;
    const low = i % 11 === 0 ? 1 : 0;
    const lastDay = (i % 28) + 1;
    const hr = i % 24;
    const min = i % 60;
    
    list.push({
      userId: `USR-${1000 + i}`,
      firstName: fn,
      lastName: ln,
      dept,
      rolesCount: roles,
      critical,
      high,
      medium,
      low,
      lastLogin: `2026-05-${lastDay < 10 ? '0' + lastDay : lastDay} ${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}`,
      action: (critical + high) > 0 ? actions[i % 4] : actions[4 + (i % 2)]
    });
  }
  return list;
};

const ALL_USERS = generateMockUsers();

window.UsersPage = function({ onNavigate, globalFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState(''); // 'Critical', 'High', 'Medium', 'None'
  const [sort, setSort] = useState({ key: 'userId', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expandedUsers, setExpandedUsers] = useState(new Set());
  
  const pageSize = 12;

  const toggleUserExpanded = (userId) => {
    setExpandedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const departments = useMemo(() => {
    return Array.from(new Set(ALL_USERS.map(u => u.dept))).sort();
  }, []);

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      dir: prev.key === key ? (prev.dir === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  // Filter and Search
  const filteredUsers = useMemo(() => {
    return ALL_USERS.filter(u => {
      // 1. Search Query
      const q = searchTerm.toLowerCase();
      const matchesSearch = u.userId.toLowerCase().includes(q) ||
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.dept.toLowerCase().includes(q);
      
      // 2. Department Filter
      const matchesDept = !deptFilter || u.dept === deptFilter;

      // 3. Risk Level Filter
      let matchesRisk = true;
      if (riskFilter === 'Critical') matchesRisk = u.critical > 0;
      else if (riskFilter === 'High') matchesRisk = u.high > 0;
      else if (riskFilter === 'Medium') matchesRisk = u.medium > 0;
      else if (riskFilter === 'None') matchesRisk = (u.critical + u.high + u.medium) === 0;

      // 4. Global Filters Sync (if set in top bar)
      let matchesGlobal = true;
      if (globalFilters) {
        if (globalFilters.severity && globalFilters.severity !== 'All') {
          const sev = globalFilters.severity.toLowerCase();
          if (sev === 'critical') matchesGlobal = u.critical > 0;
          else if (sev === 'high') matchesGlobal = u.high > 0;
          else if (sev === 'medium') matchesGlobal = u.medium > 0;
          else if (sev === 'low') matchesGlobal = u.low > 0;
        }
        if (globalFilters.department && globalFilters.department !== 'All') {
          matchesGlobal = matchesGlobal && u.dept === globalFilters.department;
        }
      }

      return matchesSearch && matchesDept && matchesRisk && matchesGlobal;
    }).sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      const key = sort.key;
      
      if (key === 'riskCount') {
        const aRisk = a.critical * 10 + a.high * 5 + a.medium;
        const bRisk = b.critical * 10 + b.high * 5 + b.medium;
        return (aRisk - bRisk) * dir;
      }
      
      return String(a[key]).localeCompare(String(b[key])) * dir;
    });
  }, [searchTerm, deptFilter, riskFilter, sort, globalFilters]);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page]);

  const clearFilters = () => {
    setSearchTerm('');
    setDeptFilter('');
    setRiskFilter('');
    setPage(1);
  };

  return (
    <div data-screen-label="Users Inventory" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="IAM · User Inventory"
        title="SAP User Master Directory"
        subtitle="Global directory of dialog and technical users scanned across active clients, mapped to authorization complexity and unmitigated GRC risks."
      />

      {/* KPI Stats Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <window.StatCard label="Total Users Scanned" value={ALL_USERS.length} icon="user" metricKey="totalUsers" />
        <window.StatCard severity="Critical" label="Users in Critical Conflict" value={ALL_USERS.filter(u => u.critical > 0).length} metricKey="criticalViolations" />
        <window.StatCard severity="High" label="Users in High Conflict" value={ALL_USERS.filter(u => u.high > 0).length} metricKey="highViolations" />
        <window.StatCard severity="Good" label="Compliant Users" value={ALL_USERS.filter(u => (u.critical + u.high + u.medium) === 0).length} metricKey="complianceScore" />
      </div>

      {/* Filter and Search Bar */}
      <window.FilterBar onClear={clearFilters} hasFilters={!!(searchTerm || deptFilter || riskFilter)}>
        <window.Select
          value={deptFilter}
          onChange={val => { setDeptFilter(val); setPage(1); }}
          options={departments}
          placeholder="All Departments"
        />
        <window.Select
          value={riskFilter}
          onChange={val => { setRiskFilter(val); setPage(1); }}
          options={['Critical', 'High', 'Medium', 'None']}
          placeholder="All Risk Levels"
        />
        <window.SearchInput
          value={searchTerm}
          onChange={val => { setSearchTerm(val); setPage(1); }}
          placeholder="Search by ID, name, department..."
        />
        <span className="ml-auto text-[11px] text-ink-400 font-semibold uppercase tracking-wider">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
        </span>
      </window.FilterBar>

      {/* Table Data Grid */}
      <window.Section
        title="Enterprise Identities"
        subtitle="Sortable audit registry of SAP User IDs. Click a row to expand authorization objects and conflicting transaction logs."
        action={
          <div className="flex gap-2">
            <window.ExportButton label="Export User List" size="sm" />
          </div>
        }
      >
        <div className="overflow-auto max-h-[550px]">
          <table className="w-full text-[13px] table-fixed">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-ink-200">
                <th className="w-10 px-4 py-3 text-left"></th>
                <window.Th sortKey="userId" sort={sort} onSort={handleSort} className="w-32">SAP User ID</window.Th>
                <window.Th sortKey="firstName" sort={sort} onSort={handleSort} className="w-40">Name</window.Th>
                <window.Th sortKey="dept" sort={sort} onSort={handleSort} className="w-36">Department</window.Th>
                <window.Th sortKey="rolesCount" sort={sort} onSort={handleSort} align="right" className="w-24">Roles</window.Th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 w-48">Risks (C / H / M / L)</th>
                <window.Th sortKey="lastLogin" sort={sort} onSort={handleSort} className="w-44">Last Login</window.Th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 w-56">Recommended Actions</th>
                <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {pagedUsers.map(user => {
                const isExpanded = expandedUsers.has(user.userId);
                const fullName = `${user.firstName} ${user.lastName}`;
                const hasRisk = (user.critical + user.high + user.medium) > 0;
                
                return (
                  <React.Fragment key={user.userId}>
                    <tr 
                      className={`row-hover cursor-pointer align-middle ${isExpanded ? 'bg-ink-50/40' : ''}`}
                      onClick={() => toggleUserExpanded(user.userId)}
                    >
                      <td className="px-4 py-3 text-center">
                        <window.Icon 
                          name="chevron" 
                          className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        />
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-ink-900 truncate">
                        {user.userId}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink-800 truncate">
                        {fullName}
                      </td>
                      <td className="px-4 py-3 text-ink-600 truncate">
                        {user.dept}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-ink-700">
                        {user.rolesCount}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex gap-1.5 font-mono font-bold text-[11px]">
                          <span className={user.critical > 0 ? 'text-rose-600' : 'text-ink-300'}>{user.critical}</span>
                          <span className="text-ink-300">/</span>
                          <span className={user.high > 0 ? 'text-orange-600' : 'text-ink-300'}>{user.high}</span>
                          <span className="text-ink-300">/</span>
                          <span className={user.medium > 0 ? 'text-amber-600' : 'text-ink-300'}>{user.medium}</span>
                          <span className="text-ink-300">/</span>
                          <span className={user.low > 0 ? 'text-blue-500' : 'text-ink-300'}>{user.low}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-ink-500 truncate">
                        {user.lastLogin}
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-700 truncate" title={user.action}>
                        {user.action}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => onNavigate('user-profile', user.userId)}
                          className="px-2 py-1 rounded bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold text-[11px] transition-colors whitespace-nowrap"
                        >
                          Profile
                        </button>
                      </td>
                    </tr>
                    
                    {isExpanded && (
                      <tr className="bg-ink-50/25">
                        <td colSpan={9} className="px-8 py-5 border-b border-ink-150">
                          <UserExpansionPanel user={user} onNavigate={onNavigate} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {pagedUsers.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                    No users found matching filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <window.Pagination
          page={page}
          pageSize={pageSize}
          total={filteredUsers.length}
          onPage={setPage}
        />
      </window.Section>
    </div>
  );
};

/* ── Row Expansion Panel Component ─────────────────────────── */
function UserExpansionPanel({ user, onNavigate }) {
  // Hardcoded simulation mapping to match the original profiles and transactions
  const details = useMemo(() => {
    const roles = ['ZFI_BR_GL_POSTING', 'ZFI_BR_AP_INVOICE', 'ZMM_BR_PO_CREATE', 'ZBC_BR_SYSTEM_ADMIN', 'ZSD_BR_BILLING_CREATE']
      .slice(0, (user.rolesCount % 3) + 2);
    
    const tcodes = ['FB50', 'MIRO', 'ME21N', 'SU01', 'VF01', 'VA01']
      .slice(0, (user.rolesCount % 4) + 2);

    const violations = [];
    if (user.critical > 0) {
      violations.push({ id: 'V-1058', desc: 'Full OTC cycle control (Order → Bill → Collect) by single user', severity: 'Critical' });
    }
    if (user.high > 0) {
      violations.push({ id: 'V-1101', desc: 'F110 Auto-Payment Run runnable by non-treasury users', severity: 'High' });
    }
    if (violations.length === 0 && (user.medium + user.low) > 0) {
      violations.push({ id: 'V-1131', desc: 'Goods Receipt + Invoice Verification by same user', severity: 'Medium' });
    }

    return { roles, tcodes, violations };
  }, [user]);

  return (
    <div className="grid grid-cols-12 gap-6 pl-4 border-l-4 border-brand-500">
      
      {/* Col 1: Roles & Transactions */}
      <div className="col-span-12 md:col-span-5 space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Assigned SAP Roles</span>
          <div className="flex flex-wrap gap-1.5">
            {details.roles.map(r => (
              <window.Role key={r} role={r} className="shadow-sm" />
            ))}
            {user.rolesCount > details.roles.length && (
              <span className="inline-flex px-1.5 py-0.5 rounded bg-ink-100 text-[10px] font-bold text-ink-500">
                +{user.rolesCount - details.roles.length} more
              </span>
            )}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Authorized Transactions</span>
          <div className="flex flex-wrap gap-1.5">
            {details.tcodes.map(t => (
              <window.TCode key={t} code={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Col 2: Active Violations */}
      <div className="col-span-12 md:col-span-4 space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Active Compliance Violations</span>
        {details.violations.length > 0 ? (
          <div className="space-y-2">
            {details.violations.map(v => (
              <div key={v.id} className="p-2.5 rounded-lg border border-ink-200 bg-white shadow-sm flex items-start justify-between gap-3">
                <div>
                  <button 
                    onClick={() => onNavigate('violation-detail', v.id)}
                    className="font-mono font-bold text-brand-600 hover:underline text-[11px]"
                  >
                    {v.id}
                  </button>
                  <p className="text-[11.5px] font-semibold text-ink-800 leading-snug mt-0.5">{v.desc}</p>
                </div>
                <window.SeverityBadge value={v.severity} />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[11.5px] font-bold text-emerald-600 block bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1.5">
            ✓ Zero active SoD conflicts detected
          </span>
        )}
      </div>

      {/* Col 3: Rationale & Governance */}
      <div className="col-span-12 md:col-span-3 space-y-3 bg-white p-3.5 rounded-xl border border-ink-150 shadow-sm">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Recommended Mitigation</span>
          <p className="text-[11.5px] text-ink-700 leading-snug font-medium">{user.action}</p>
        </div>
        <div className="pt-2.5 border-t border-ink-100 flex justify-between gap-2">
          <button
            onClick={() => onNavigate('user-profile', user.userId)}
            className="flex-1 text-center py-1.5 rounded border border-ink-300 text-ink-700 hover:bg-ink-50 font-bold text-[11px] transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => {
              alert(`Exporting audit log for user ${user.userId}...`);
            }}
            className="flex-1 text-center py-1.5 rounded bg-ink-900 text-white hover:bg-ink-800 font-bold text-[11px] transition-colors"
          >
            Export Log
          </button>
        </div>
      </div>
    </div>
  );
}
