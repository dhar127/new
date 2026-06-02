const { useState, useMemo, useEffect } = React;

function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return ReactDOM.createPortal(children, document.body);
}

function ResponseWindowBadge({ urgency, createdDaysAgo }) {
  const isP1 = urgency.includes('P1');
  const isP2 = urgency.includes('P2');
  const deadlineHours = isP1 ? 24 : isP2 ? 48 : 120;
  const deadlineLabel = isP1 ? '24 h window' : isP2 ? '48 h window' : '5 day window';
  const priorityLabel = isP1 ? 'Priority 1 · Critical Response'
                      : isP2 ? 'Priority 2 · Urgent Response'
                      :        'Priority 3 · Standard Response';
  const elapsedHours  = (createdDaysAgo || 0) * 24;
  const pct           = Math.min((elapsedHours / deadlineHours) * 100, 100);
  const overdueHours  = Math.max(elapsedHours - deadlineHours, 0);
  const isOverdue     = overdueHours > 0;
  const overdueDays   = Math.floor(overdueHours / 24);
  const overdueHrsRem = overdueHours % 24;
  const barColor  = isOverdue ? 'bg-rose-500'  : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500';
  const textColor = isOverdue ? 'text-rose-700' : pct > 75 ? 'text-amber-700' : 'text-emerald-700';
  const bgColor   = isOverdue ? 'bg-rose-50'    : pct > 75 ? 'bg-amber-50'   : 'bg-emerald-50';
  const ringColor = isOverdue ? 'ring-rose-200' : pct > 75 ? 'ring-amber-200': 'ring-emerald-200';
  return (
    <div className={`rounded-lg px-3 py-2 ${bgColor} ring-1 ring-inset ${ringColor} flex flex-col gap-1.5 min-w-[140px]`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${textColor}`}>{priorityLabel}</span>
      </div>
      <div className="text-[11px] font-semibold text-ink-600">
        {isOverdue
          ? <span className="text-rose-600 font-bold">
              ⚠ Overdue by {overdueDays > 0 ? `${overdueDays}d ` : ''}{overdueHrsRem > 0 ? `${overdueHrsRem}h` : ''}
            </span>
          : <span>Deadline: <span className="font-bold">{deadlineLabel}</span> from detection</span>
        }
      </div>
      <div className="h-1.5 bg-white/60 rounded-full overflow-hidden ring-1 ring-inset ring-black/5">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-[9px] text-ink-400">
        <span>Detected {createdDaysAgo}d ago</span>
        <span className="font-bold">{deadlineLabel}</span>
      </div>
    </div>
  );
}

/* ─── Regulatory Rules per violation type ─────────────────── */
const REGULATORY_RULES = {
  'P1': [
    { code: 'SOX §302', desc: 'CEO/CFO certification of internal controls' },
    { code: 'SOX §404', desc: 'Management assessment of ICFR' },
    { code: 'COSO 2013', desc: 'Control environment – SoD principle' },
  ],
  'P2': [
    { code: 'SOX §302', desc: 'Disclosure controls and procedures' },
    { code: 'ITGC AC-1', desc: 'Access control policy enforcement' },
    { code: 'ISO 27001 A.9', desc: 'Access management requirements' },
  ],
  'P3': [
    { code: 'ITGC AC-2', desc: 'Account management and review' },
    { code: 'ISO 27001 A.9.2', desc: 'User access provisioning' },
    { code: 'GDPR Art. 25', desc: 'Data protection by design' },
  ],
};

function RegulatoryRulesBadge({ urgency }) {
  const tier = urgency.includes('P1') ? 'P1' : urgency.includes('P2') ? 'P2' : 'P3';
  const rules = REGULATORY_RULES[tier];
  return (
    <div className="flex flex-col gap-1 min-w-[160px]">
      {rules.map(r => (
        <div key={r.code} className="flex items-start gap-1.5">
          <span className="text-[10px] font-bold font-mono bg-ink-100 text-ink-700 ring-1 ring-ink-200 px-1.5 py-0.5 rounded whitespace-nowrap">
            {r.code}
          </span>
          <span className="text-[11px] text-ink-500 leading-snug">{r.desc}</span>
        </div>
      ))}
    </div>
  );
}

function downloadRemediationRules(action, profile) {
  const timestamp = new Date().toISOString().split('T')[0];
  const tier = action.urgency.includes('P1') ? 'P1' : action.urgency.includes('P2') ? 'P2' : 'P3';
  const rules = REGULATORY_RULES[tier];
  const lines = [
    ['Remediation Action ID', 'User ID', 'User Name', 'Department', 'Role'],
    [action.id, profile.userId, profile.fullName, profile.department, profile.role],
    [],
    ['VIOLATION DETAILS'],
    ['Description', action.desc],
    ['Required Action', action.action],
    ['Business Risk', action.risk],
    ['Severity', 'CRITICAL'],
    [],
    ['REGULATORY RULES'],
    ['Rule Code', 'Description'],
    ...rules.map(r => [r.code, r.desc]),
    [],
    ['REMEDIATION ROADMAP'],
    ['Week', 'Task', 'Responsible', 'Status'],
    ['1', 'Audit user transactions for last 90 days', 'Compliance Officer', 'Pending'],
    ['1', 'Identify conflicting authorizations', 'SAP Admin', 'Pending'],
    ['2', 'Prepare role reassignment plan', 'Process Owner', 'Pending'],
    ['2', 'Obtain business approvals', 'Manager', 'Pending'],
    ['3', 'Execute role removal in DEV environment', 'SAP Admin', 'Pending'],
    ['3', 'Validate system behavior post-change', 'QA Team', 'Pending'],
    ['4', 'Apply changes to production', 'Change Manager', 'Pending'],
    ['4', 'Document completion and archive evidence', 'Compliance', 'Pending'],
    [],
    ['AUTHORIZATION GROUPS TO REMEDIATE'],
    ...profile.authGroups.map(g => [g, 'To be revoked'])
  ];
  const csv = lines
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `SOD04-Remediation-${action.id}-${timestamp}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

const getAuthGroups = (user) => {
  return ['SUPER_USER', 'FI_POSTING', 'MM_ORDERS', 'HR_PAYROLL', 'BASIS_ADMIN']
           .slice(0, (Math.abs(user.charCodeAt(0)) % 3) + 2);
};

const getImmediateActions = (urgency) => {
  if (urgency.includes('P1')) {
    return ['Review authorizations', 'Escalate to manager', 'Initiate revocation'];
  } else if (urgency.includes('P2')) {
    return ['Conduct audit review', 'Notify department head', 'Update security logs'];
  } else {
    return ['Schedule policy review', 'Log in change management', 'Verify quarterly compliance'];
  }
};

/* ─── User Profile Slide-over ─────────────────────────────────
   Cleaned up: removed Identity Details grid (location/login/
   roles/groups count). Kept Auth Groups chips, Active Violations,
   Regulatory Rules section, and Risk Summary AI block.
──────────────────────────────────────────────────────────────── */
function UserProfilePanel({ action, onClose }) {
  if (!action) return null;

  const profile = {
    userId:     action.user,
    fullName:   action.user.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    department: ['Finance', 'Procurement', 'IT Basis', 'HR Operations', 'Sales'][Math.abs(action.user.charCodeAt(0)) % 5],
    role:       ['Senior Analyst', 'Process Owner', 'SAP Admin', 'Controller', 'Manager'][Math.abs(action.user.charCodeAt(1) || 0) % 5],
    licenseType:['Professional', 'Limited Professional', 'Employee'][Math.abs(action.user.charCodeAt(3) || 0) % 3],
    violations: [action, ...(window.MOCK.IMMEDIATE_ACTIONS || []).filter(a => a.user === action.user && a.id !== action.id).slice(0, 2)],
    authGroups: getAuthGroups(action.user),
  };

  const tier = action.urgency.includes('P1') ? 'P1' : action.urgency.includes('P2') ? 'P2' : 'P3';
  const regulatoryRules = REGULATORY_RULES[tier];

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/40 z-[99998]" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[99999] flex flex-col"
        style={{ animation: 'slideInRight 0.25s ease-out' }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-5 border-b border-ink-100 bg-[#0B0F19] text-white">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-brand-600 flex items-center justify-center text-lg font-bold tracking-tight">
            {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-bold text-white truncate">{profile.fullName}</h2>
            <div className="text-[11px] text-white/50 font-mono mt-0.5">{profile.userId}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-white/40">{profile.department} · {profile.role}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <window.Icon name="x" className="w-4 h-4 text-white/60" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Severity Score & Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-white border border-ink-200 p-3 text-center">
              <div className="text-[20px] font-bold font-mono text-rose-600">{action.urgency.includes('P1') ? 95 : action.urgency.includes('P2') ? 75 : 55}/100</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mt-1">Severity Score</div>
            </div>
            <div className="rounded-lg bg-white border border-ink-200 p-3 text-center">
              <div className="text-[20px] font-bold font-mono text-ink-600">{profile.violations.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mt-1">Active Issues</div>
            </div>
            <div className="rounded-lg bg-white border border-ink-200 p-3 text-center">
              <div className="text-[20px] font-bold font-mono text-ink-600">{profile.authGroups.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mt-1">Auth Groups</div>
            </div>
          </div>

          {/* Affected Users */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Affected Users</div>
            <div className="flex flex-wrap gap-2">
              {[profile.user || action.user].map(user => (
                <span key={user} className="font-mono text-[10px] px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 ring-1 ring-rose-200 font-semibold">
                  {user}
                </span>
              ))}
            </div>
          </div>

          {/* Immediate Action Users */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Immediate Action Required</div>
            <div className="flex flex-wrap gap-2">
              {getImmediateActions(action.urgency).map((task, i) => (
                <span key={i} className="font-mono text-[10px] px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-200 font-semibold">
                  {task}
                </span>
              ))}
            </div>
          </div>

          {/* Authorization groups — kept as useful for compliance context */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Authorization Groups</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.authGroups.map(g => (
                <span key={g} className="text-[10px] font-bold font-mono bg-ink-100 text-ink-700 ring-1 ring-ink-200 px-2 py-1 rounded-md">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Active violations */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">
              Active Violations ({profile.violations.length})
            </div>
            <div className="space-y-2">
              {profile.violations.map((v, i) => (
                <div key={v.id} className={`rounded-xl p-3 ring-1 ring-inset ${
                  i === 0 ? 'bg-rose-50 ring-rose-200' : 'bg-ink-50 ring-ink-200'
                }`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-ink-700">{v.id}</span>
                    <window.SeverityBadge value={v.severity || 'High'} />
                  </div>
                  <p className="text-[12px] font-semibold text-ink-800 leading-snug">{v.desc}</p>
                  <p className="text-[11px] text-ink-500 mt-1">{v.action}</p>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-ink-100 bg-ink-50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-ink-900 text-white text-xs font-bold py-2.5 hover:bg-ink-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
window.Sod04Page = function () {
  const { IMMEDIATE_ACTIONS } = window.MOCK;

  const enriched = (IMMEDIATE_ACTIONS || []).map((a, i) => ({
    ...a,
    createdDaysAgo: a.createdDaysAgo ?? [2, 4, 1, 6, 3, 5][i % 6],
  }));

  const [actions, setActions]             = useState(enriched);
  const [searchTerm, setSearchTerm]       = useState('');
  const [statusFilter, setStatusFilter]   = useState('All');
  const [profileAction, setProfileAction] = useState(null);

  const filteredActions = useMemo(() => {
    let f = statusFilter === 'All' ? actions : actions.filter(a => a.status === statusFilter);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      f = f.filter(a =>
        a.id.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.user.toLowerCase().includes(q)
      );
    }
    return f;
  }, [actions, searchTerm, statusFilter]);

  const updateStatus = (id, newStatus) =>
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));

  const statusOptions = ['Open', 'In Progress', 'Resolved'];

  const countOverdue = actions.filter(a => {
    const hrs   = (a.createdDaysAgo || 0) * 24;
    const dlHrs = a.urgency.includes('P1') ? 24 : a.urgency.includes('P2') ? 48 : 120;
    return hrs > dlHrs && a.status !== 'Resolved';
  }).length;

  const uniqueUsers = useMemo(() => {
    const set = new Set((IMMEDIATE_ACTIONS || []).map(a => a.user));
    return Array.from(set);
  }, []);

  const hasFilters = !!(searchTerm || statusFilter !== 'All');

  const clear = () => {
    setStatusFilter('All');
    setSearchTerm('');
  };

  return (
    <div data-screen-label="SOD-04 Immediate Actions" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="SOD-04 · Triage"
        title="Immediate Actions"
        subtitle="High-priority violations requiring remediation within defined timeframes to prevent material exposure or audit failure."
      />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <window.StatCard label="Total Urgent"   value={actions.length} icon="flame" />
        <window.StatCard severity="Critical"    label="Priority 1 · Must resolve in 24 h" value={actions.filter(a => a.urgency.includes('P1')).length} deltaInvertGood icon="bell" />
        <window.StatCard severity="High"        label="Currently Open"            value={actions.filter(a => a.status === 'Open').length} deltaInvertGood icon="x" />
        <window.StatCard severity={countOverdue > 0 ? 'Critical' : 'Good'} label="Past Deadline" value={countOverdue} deltaInvertGood icon="flame" />
      </div>

      {/* Priority Legend */}
      <div className="rounded-xl bg-ink-50 ring-1 ring-ink-200 px-5 py-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">Priority Guide</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { code: 'Priority 1', window: '24 hours',        desc: 'Immediate financial risk or SOX audit exposure. Escalate to security lead.',   color: 'text-rose-700',   bg: 'bg-rose-50',   ring: 'ring-rose-200'   },
            { code: 'Priority 2', window: '48 hours',        desc: 'High operational risk. Can cause compliance breach if unresolved.',         color: 'text-orange-700', bg: 'bg-orange-50', ring: 'ring-orange-200' },
            { code: 'Priority 3', window: '5 business days', desc: 'Standard resolution cycle. Log in change management.',                     color: 'text-amber-700',  bg: 'bg-amber-50',  ring: 'ring-amber-200'  },
          ].map(p => (
            <div key={p.code} className={`rounded-lg px-3 py-2.5 ${p.bg} ring-1 ring-inset ${p.ring}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[11px] font-bold ${p.color}`}>{p.code}</span>
                <span className="text-[10px] font-bold text-ink-500 bg-white px-1.5 py-0.5 rounded ring-1 ring-ink-200">{p.window}</span>
              </div>
              <p className="text-[11px] text-ink-600 leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <window.FilterBar onClear={clear} hasFilters={hasFilters}>
        <window.Select 
          value={statusFilter === 'All' ? '' : statusFilter} 
          onChange={val => setStatusFilter(val || 'All')} 
          options={statusOptions} 
          placeholder="All Statuses" 
        />
        <window.SearchInput 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search by ID, desc, user…" 
        />
        <span className="ml-auto text-[11px] text-ink-400 font-semibold uppercase tracking-wider">
          {filteredActions.length} action{filteredActions.length !== 1 ? 's' : ''} found
        </span>
      </window.FilterBar>

      {/* Action Queue */}
      <window.Section title="Action Queue" action={<window.ExportButton label="Download Actions" size="sm" />}>
        <div className="overflow-auto max-h-[480px] scrollbar-hide">
          <table className="w-full text-[13px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <window.Th>Identity</window.Th>
                <window.Th>Violation Description</window.Th>
                <window.Th>Business Risk</window.Th>
                <window.Th>Required Action</window.Th>
                <window.Th>Regulatory Rules</window.Th>
                <window.Th>Status</window.Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredActions.map(action => {
                return (
                  <tr key={action.id} className="row-hover align-top">
                    {/* Identity */}
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-ink-900 text-[12px]">{action.id}</div>
                      <div className="text-[11px] text-ink-500 mt-0.5">{action.user}</div>
                    </td>

                    {/* Violation */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-bold text-ink-900 leading-snug">{action.desc}</div>
                    </td>

                    {/* Risk */}
                    <td className="px-4 py-3.5 max-w-[180px]">
                      <span className="text-ink-600 text-[12px] leading-snug">{action.risk}</span>
                    </td>

                    {/* Required Action */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="text-ink-800 text-[12px] leading-snug">{action.action}</div>
                    </td>

                    {/* Regulatory Rules */}
                    <td className="px-4 py-3.5">
                      <RegulatoryRulesBadge urgency={action.urgency} />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <select
                        value={action.status}
                        onChange={e => updateStatus(action.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase tracking-widest p-1.5 rounded ring-1 ring-inset border-none outline-none focus:ring-2 ${
                          action.status === 'Resolved'    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                          action.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200'         :
                                                            'bg-rose-50 text-rose-700 ring-rose-200'
                        }`}
                      >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-ink-400 font-bold uppercase tracking-widest text-[12px]">
              No actions found for the selected filter.
            </div>
          )}
        </div>
      </window.Section>
    </div>
  );
};