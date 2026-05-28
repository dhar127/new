const { useState, useMemo, useEffect } = React;

/* ─── Modal Portal for Fixed Positioning ────────────────────
   Renders modals on document.body to escape parent transform
   constraints and ensure fixed positioning works correctly.
─────────────────────────────────────────────────────────── */
function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return ReactDOM.createPortal(children, document.body);
}

/* ─── Response Window Badge ──────────────────────────────────
   Replaces cryptic "P1 · 24h" / "P2 · 48h" labels with a
   human-readable deadline pill + overdue indicator.
   
   P1 = must be resolved within 24 hours of detection
   P2 = must be resolved within 48 hours of detection
   P3 = must be resolved within 5 business days
   
   "createdAt" is a days-ago integer on each action (from MOCK).
   If not present we derive a plausible value from urgency.
──────────────────────────────────────────────────────────── */
function ResponseWindowBadge({ urgency, createdDaysAgo }) {
  const isP1 = urgency.includes('P1');
  const isP2 = urgency.includes('P2');

  // deadline in hours
  const deadlineHours = isP1 ? 24 : isP2 ? 48 : 120;
  const deadlineLabel = isP1 ? '24 h window' : isP2 ? '48 h window' : '5 day window';
  const priorityLabel = isP1 ? 'P1 · Critical Response'
                      : isP2 ? 'P2 · Urgent Response'
                      :        'P3 · Standard Response';

  // how many hours have elapsed (createdDaysAgo * 24)
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
      {/* Priority label */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${textColor}`}>{priorityLabel}</span>
      </div>

      {/* Deadline description */}
      <div className="text-[11px] font-semibold text-ink-600">
        {isOverdue
          ? <span className="text-rose-600 font-bold">
              ⚠ Overdue by {overdueDays > 0 ? `${overdueDays}d ` : ''}{overdueHrsRem > 0 ? `${overdueHrsRem}h` : ''}
            </span>
          : <span>Deadline: <span className="font-bold">{deadlineLabel}</span> from detection</span>
        }
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/60 rounded-full overflow-hidden ring-1 ring-inset ring-black/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-[9px] text-ink-400">
        <span>Detected {createdDaysAgo}d ago</span>
        <span className="font-bold">{deadlineLabel}</span>
      </div>
    </div>
  );
}

/* ─── Download Remediation Rules ────────────────────────────
   Generates and downloads a rules CSV file for the action item.
─────────────────────────────────────────────────────────── */
function downloadRemediationRules(action, profile) {
  const timestamp = new Date().toISOString().split('T')[0];
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

/* ─── User Profile Slide-over ────────────────────────────────
   Full profile panel triggered by "Inspect Full Profile"
   Renders on document.body using ModalPortal for proper positioning.
──────────────────────────────────────────────────────────── */
function UserProfilePanel({ action, onClose }) {
  if (!action) return null;

  // Derive plausible profile data from the action object
  const profile = {
    userId:      action.user,
    fullName:    action.user.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    department:  ['Finance', 'Procurement', 'IT Basis', 'HR Operations', 'Sales'][Math.abs(action.user.charCodeAt(0)) % 5],
    role:        ['Senior Analyst', 'Process Owner', 'SAP Admin', 'Controller', 'Manager'][Math.abs(action.user.charCodeAt(1) || 0) % 5],
    location:    ['Seoul, KR', 'Frankfurt, DE', 'Singapore, SG', 'London, UK', 'Mumbai, IN'][Math.abs(action.user.charCodeAt(2) || 0) % 5],
    lastLogin:   `${Math.floor(Math.random() * 5) + 1} days ago`,
    licenseType: ['Professional', 'Limited Professional', 'Employee'][Math.abs(action.user.charCodeAt(3) || 0) % 3],
    rolesCount:  Math.floor(Math.abs(action.user.charCodeAt(0)) % 8) + 3,
    violations:  [action, ...(window.MOCK.IMMEDIATE_ACTIONS || []).filter(a => a.user === action.user && a.id !== action.id).slice(0, 2)],
    authGroups:  ['SUPER_USER', 'FI_POSTING', 'MM_ORDERS', 'HR_PAYROLL', 'BASIS_ADMIN']
                   .slice(0, (Math.abs(action.user.charCodeAt(0)) % 3) + 2),
  };

  return (
    <ModalPortal>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[99998]"
        onClick={onClose}
      />

      {/* Panel */}
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
              <span className="text-[10px] font-bold bg-brand-600/30 text-brand-300 px-2 py-0.5 rounded-full">{profile.licenseType}</span>
              <span className="text-[10px] text-white/40">{profile.department} · {profile.role}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <window.Icon name="x" className="w-4 h-4 text-white/60" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Identity details */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">Identity Details</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Location',     profile.location],
                ['Last Login',   profile.lastLogin],
                ['SAP Roles',    `${profile.rolesCount} assigned`],
                ['Auth Groups',  `${profile.authGroups.length} active`],
              ].map(([label, val]) => (
                <div key={label} className="rounded-lg bg-ink-50 ring-1 ring-ink-100 px-3 py-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-0.5">{label}</div>
                  <div className="text-[13px] font-bold text-ink-800">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth groups */}
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

          {/* Active violations for this user */}
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

          {/* Risk summary */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Risk Summary</div>
            <div className="rounded-xl bg-[#0B0F19] p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <window.Icon name="bot" className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">AI Assessment</span>
              </div>
              <p className="text-[12px] text-white/70 leading-relaxed">
                This user holds overlapping authorizations across{' '}
                <span className="text-white font-bold">{profile.authGroups.length} critical groups</span>,
                creating {profile.violations.length} active SoD conflict{profile.violations.length !== 1 ? 's' : ''}.
                Immediate role remediation is advised to reduce audit exposure in the{' '}
                <span className="text-brand-400 font-bold">{profile.department}</span> stream.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-ink-100 bg-ink-50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-white ring-1 ring-ink-200 text-ink-700 text-xs font-bold py-2.5 hover:bg-ink-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => downloadRemediationRules(action, profile)}
            className="flex-1 rounded-lg bg-emerald-600 text-white text-xs font-bold py-2.5 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
          >
            <window.Icon name="download" className="w-3.5 h-3.5" strokeWidth={2.5} />
            Download Rules
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
window.Sod04Page = function () {
  const { IMMEDIATE_ACTIONS } = window.MOCK;

  // Inject a "createdDaysAgo" if not present in MOCK data
  const enriched = (IMMEDIATE_ACTIONS || []).map((a, i) => ({
    ...a,
    createdDaysAgo: a.createdDaysAgo ?? [2, 4, 1, 6, 3, 5][i % 6],
  }));

  const [actions, setActions]           = useState(enriched);
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
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

  // Overdue = elapsed hours > deadline hours
  const countOverdue = actions.filter(a => {
    const hrs    = (a.createdDaysAgo || 0) * 24;
    const dlHrs  = a.urgency.includes('P1') ? 24 : a.urgency.includes('P2') ? 48 : 120;
    return hrs > dlHrs && a.status !== 'Resolved';
  }).length;

  return (
    <div data-screen-label="SOD-04 Immediate Actions" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="SOD-04 · Triage"
        title="Immediate Actions"
        subtitle="High-priority violations requiring remediation within defined response windows to prevent material exposure or audit failure."
      />

      {/* ── KPI bar ── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <window.StatCard label="Total Urgent"   value={actions.length} icon="flame" />
        <window.StatCard severity="Critical"    label="P1 · Must resolve in 24 h" value={actions.filter(a => a.urgency.includes('P1')).length} deltaInvertGood icon="bell" />
        <window.StatCard severity="High"        label="Currently Open"            value={actions.filter(a => a.status === 'Open').length} deltaInvertGood icon="x" />
        <window.StatCard severity={countOverdue > 0 ? 'Critical' : 'Good'} label="Past Deadline" value={countOverdue} deltaInvertGood icon="flame" />
      </div>

      {/* ── Legend: what P1/P2/P3 means ── */}
      <div className="rounded-xl bg-ink-50 ring-1 ring-ink-200 px-5 py-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">Response Window Guide</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { code: 'P1', window: '24 hours',       desc: 'Immediate financial fraud or SOX audit risk. Escalate to security lead.',    color: 'text-rose-700',   bg: 'bg-rose-50',   ring: 'ring-rose-200'   },
            { code: 'P2', window: '48 hours',       desc: 'High operational risk. Can cause compliance breach if unresolved.',          color: 'text-orange-700', bg: 'bg-orange-50', ring: 'ring-orange-200' },
            { code: 'P3', window: '5 business days',desc: 'Standard resolution cycle. Log in change management.',                      color: 'text-amber-700',  bg: 'bg-amber-50',  ring: 'ring-amber-200'  },
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

      {/* ── Search & Filter ── */}
      <div className="space-y-3">
        <div className="relative">
          <window.Icon name="search" className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search by ID, description, or user..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ink-400">Filter:</span>
          {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-ink-400 font-medium">
            {filteredActions.length} action{filteredActions.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* ── Action Queue ── */}
      <window.Section title="Action Queue">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-[13px]">
            <thead className="bg-ink-50/50">
              <tr>
                <window.Th>Identity</window.Th>
                <window.Th>Violation Description</window.Th>
                <window.Th>Business Risk</window.Th>
                <window.Th>Required Action</window.Th>
                <window.Th>Response Window</window.Th>
                <window.Th>Status</window.Th>
                <window.Th></window.Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredActions.map(action => (
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

                  {/* Response Window — replaces raw "P1 · 24h" badge */}
                  <td className="px-4 py-3.5">
                    <ResponseWindowBadge urgency={action.urgency} createdDaysAgo={action.createdDaysAgo} />
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

                  {/* Inspect */}
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setProfileAction(action)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 text-[11px] font-bold hover:bg-brand-100 transition-colors whitespace-nowrap"
                    >
                      <window.Icon name="user" className="w-3.5 h-3.5" strokeWidth={2} />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-ink-400 font-bold uppercase tracking-widest text-[12px]">
              No actions found for the selected filter.
            </div>
          )}
        </div>
      </window.Section>

      {/* ── Profile Slide-over ── */}
      {profileAction && (
        <UserProfilePanel
          action={profileAction}
          onClose={() => setProfileAction(null)}
        />
      )}
    </div>
  );
};