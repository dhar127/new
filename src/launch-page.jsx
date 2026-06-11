const { useState, useMemo } = React;

/* ─── Segmented Severity Distribution Line ─────────────────────── */
function EnterpriseSeverityDistributionLine({ critical, high, medium, low }) {
  const total = (critical + high + medium + low) || 1;
  const pctCritical = ((critical / total) * 100).toFixed(1);
  const pctHigh = ((high / total) * 100).toFixed(1);
  const pctMedium = ((medium / total) * 100).toFixed(1);
  const pctLow = ((low / total) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Segmented Line */}
      <div className="h-4 rounded-full flex overflow-hidden ring-1 ring-ink-200">
        {critical > 0 && (
          <div 
            style={{ width: `${pctCritical}%` }} 
            className="bg-red-500 hover:brightness-95 transition-all cursor-help"
            title={`Critical: ${critical} (${pctCritical}%)`}
          />
        )}
        {high > 0 && (
          <div 
            style={{ width: `${pctHigh}%` }} 
            className="bg-orange-500 hover:brightness-95 transition-all cursor-help"
            title={`High: ${high} (${pctHigh}%)`}
          />
        )}
        {medium > 0 && (
          <div 
            style={{ width: `${pctMedium}%` }} 
            className="bg-yellow-500 hover:brightness-95 transition-all cursor-help"
            title={`Medium: ${medium} (${pctMedium}%)`}
          />
        )}
        {low > 0 && (
          <div 
            style={{ width: `${pctLow}%` }} 
            className="bg-blue-500 hover:brightness-95 transition-all cursor-help"
            title={`Low: ${low} (${pctLow}%)`}
          />
        )}
      </div>

      {/* Legend & Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
        {/* Critical */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span>Critical Severity</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-ink-900 font-mono">{critical}</span>
            <span className="text-xs text-ink-450 font-semibold">({pctCritical}%)</span>
          </div>
        </div>

        {/* High */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-700">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span>High Severity</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-ink-900 font-mono">{high}</span>
            <span className="text-xs text-ink-450 font-semibold">({pctHigh}%)</span>
          </div>
        </div>

        {/* Medium */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span>Medium Severity</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-ink-900 font-mono">{medium}</span>
            <span className="text-xs text-ink-450 font-semibold">({pctMedium}%)</span>
          </div>
        </div>

        {/* Low */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span>Low Severity</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-ink-900 font-mono">{low}</span>
            <span className="text-xs text-ink-450 font-semibold">({pctLow}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Violation Investigation Grid (Material Risk Inventory) ──── */
const MATERIAL_VIOLATIONS = [
  {
    userId: 'HOANG.NGUYEN',
    firstName: 'Hoang',
    lastName: 'Nguyen',
    violationId: 'V-1058',
    violationType: 'Cross-Role Conflict',
    category: 'Complete OTC Control',
    severity: 'Critical',
    area: 'OTC',
    desc: 'Full OTC cycle control (Order Entry, Invoicing, Clearing) held by a single identity.',
    action: 'Remove VF01 document release rights from sales assistant profile.',
    assignee: 'IT Compliance Lead',
    status: 'Open',
    expanded: {
      roles: ['ZSD_BR_SO_CREATE', 'ZSD_BR_BILLING_CREATE'],
      tcodes: ['VA01', 'VF01', 'F-28'],
      authObjects: ['S_TCODE', 'S_TABU_DIS', 'S_DEVELOP'],
      impact: 'SOX §404 deficiency and revenue leakage potential. Bypasses dual controls.',
      mapping: 'SOX §404 (OTC-12), K-SOX §17',
      history: 'Flagged in 3 consecutive scans since Dec 2025.'
    }
  },
  {
    userId: 'JAE.KANG',
    firstName: 'Jae',
    lastName: 'Kang',
    violationId: 'V-1042',
    violationType: 'Procurement Overlap',
    category: 'Dual Process Control',
    severity: 'Critical',
    area: 'P2P',
    desc: 'Incompatible vendor record edits and automatic payment run rights.',
    action: 'Redesign role ZMM_BR_VENDOR_CREATE to exclude transaction code F110.',
    assignee: 'SAP Security Architect',
    status: 'Open',
    expanded: {
      roles: ['ZMM_BR_VENDOR_CREATE', 'ZFI_BR_AP_PAYMENT'],
      tcodes: ['FK01', 'F110'],
      authObjects: ['S_TCODE', 'S_TABU_DIS'],
      impact: 'Enables creation of fictitious suppliers paired with payment releases.',
      mapping: 'COSO Principle 10, SOX §302',
      history: 'First detected in May 2026 assessment run.'
    }
  },
  {
    userId: 'BASIS_AMS',
    firstName: 'Ji-hoon',
    lastName: 'Park',
    violationId: 'V-1071',
    violationType: 'Privilege Escalation',
    category: 'Super Administrators',
    severity: 'Critical',
    area: 'Basis',
    desc: 'User administration maintenance and role assignment controls held simultaneously.',
    action: 'Separate user profile setup (SU01) from PFCG roles configuration.',
    assignee: 'Basis Admin Lead',
    status: 'In Progress',
    expanded: {
      roles: ['ZBC_BR_SYSTEM_ADMIN', 'ZBC_BR_BACKGROUND'],
      tcodes: ['SU01', 'PFCG'],
      authObjects: ['S_USER_GRP', 'S_USER_PRO'],
      impact: 'Allows creating custom credentials and self-assigning super administrator access.',
      mapping: 'ISO 27001 Control A.9.2.3',
      history: 'Re-occurred after role modification in Apr 2026.'
    }
  },
  {
    userId: 'BATCH_USER',
    firstName: 'System',
    lastName: 'Batch',
    violationId: 'V-1124',
    violationType: 'System Profile Override',
    category: 'Super Administrators',
    severity: 'Critical',
    area: 'Basis',
    desc: 'Unmitigated SAP_ALL profile assigned to standard background job interface.',
    action: 'De-allocate SAP_ALL and configure custom, restricted technical roles.',
    assignee: 'IT Infrastructure Manager',
    status: 'Open',
    expanded: {
      roles: ['SAP_ALL'],
      tcodes: ['SM37', 'SM30', 'SE38'],
      authObjects: ['S_ADMI_FCD', 'S_DEVELOP'],
      impact: 'Technical bypass of authorization checks across all SAP modules.',
      mapping: 'COBIT DSS05.04',
      history: 'Persistent flag since initial ruleset upload.'
    }
  },
  {
    userId: 'SBRYAN',
    firstName: 'Stephanie',
    lastName: 'Bryan',
    violationId: 'V-1101',
    violationType: 'AP Reconciliation Overlap',
    category: 'Dual Process Control',
    severity: 'High',
    area: 'Finance',
    desc: 'Posting manual journal entries (GL) and clearing accounts payable ledger.',
    action: 'Revoke clearance authority F-58 from assistant accountants.',
    assignee: 'Finance Control Director',
    status: 'Open',
    expanded: {
      roles: ['ZFI_BR_GL_POSTING', 'ZFI_BR_AP_INVOICE'],
      tcodes: ['FB50', 'F-58'],
      authObjects: ['F_BKPF_BUK', 'F_BKPF_GSB'],
      impact: 'Enables posting unverified manual G/L entries and settling outflows.',
      mapping: 'SOX §404, K-SOX §12',
      history: 'Detected in last 2 scans.'
    }
  },
  {
    userId: 'FF.IT',
    firstName: 'Ely',
    lastName: 'Taleon',
    violationId: 'V-1088',
    violationType: 'Firefighter SLA Override',
    category: 'Emergency Access',
    severity: 'High',
    area: 'IT Basis',
    desc: 'Firefighter ID session active beyond the approved SLA break-glass window.',
    action: 'Revoke active firefighter session and request post-incident reviews.',
    assignee: 'Security Administrator',
    status: 'In Progress',
    expanded: {
      roles: ['ZBC_BR_SYSTEM_ADMIN'],
      tcodes: ['STMS', 'OBYC'],
      authObjects: ['S_TRANSPRT', 'S_TABU_CLI'],
      impact: 'Prolonged unmonitored execution of system configuration edits.',
      mapping: 'ITIL Access Control, SOC 2 Type II',
      history: 'Occurred twice during recent Q2 database upgrade.'
    }
  }
];

function MaterialRiskInventoryGrid({ onNavigate }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return MATERIAL_VIOLATIONS.filter(v => 
      v.userId.toLowerCase().includes(search.toLowerCase()) ||
      v.violationId.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <window.Section 
      title="Material Risk Inventory [SOD-03]" 
      subtitle="Enterprise workspace for active dialog user violations. Click any row to expand forensic audit logs inline."
    >
      {/* Search Filter */}
      <div className="px-5 py-3 border-b border-ink-100 bg-ink-50/20 flex justify-between items-center">
        <div className="relative w-64">
          <window.Icon name="search" className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-ink-400" />
          <input
            type="text"
            placeholder="Search User ID, Risk ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-ink-200 rounded-lg text-xs placeholder-ink-450 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all text-ink-900"
          />
        </div>
        <span className="text-[11px] font-bold text-ink-400 uppercase tracking-wider flex items-center gap-1">
          {filtered.length} active violations
          <window.GRCInfoTooltip metricKey="totalViolations" />
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50/50">
              <th className="w-8 px-4 py-3"></th>
              <window.Th className="w-32">User SAP ID</window.Th>
              <window.Th className="w-28">First Name</window.Th>
              <window.Th className="w-28">Last Name</window.Th>
              <window.Th className="w-28">Violation ID</window.Th>
              <window.Th className="w-36">Violation Type</window.Th>
              <window.Th className="w-40">SoD Category</window.Th>
              <window.Th className="w-28">Severity</window.Th>
              <window.Th className="w-24">Area</window.Th>
              <window.Th className="w-32">Status</window.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map(v => {
              const isExpanded = expandedRow === v.userId;
              return (
                <React.Fragment key={v.userId}>
                  <tr 
                    onClick={() => setExpandedRow(isExpanded ? null : v.userId)}
                    className={`row-hover cursor-pointer align-middle ${isExpanded ? 'bg-rose-50/10' : ''}`}
                  >
                    <td className="px-4 py-3 text-center">
                      <window.Icon 
                        name="chevron" 
                        className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-ink-900">{v.userId}</td>
                    <td className="px-4 py-3 font-medium text-ink-800">{v.firstName}</td>
                    <td className="px-4 py-3 font-medium text-ink-800">{v.lastName}</td>
                    <td className="px-4 py-3 font-mono font-bold text-brand-600">{v.violationId}</td>
                    <td className="px-4 py-3 text-xs text-ink-600 font-semibold">{v.violationType}</td>
                    <td className="px-4 py-3 font-medium text-ink-800">{v.category}</td>
                    <td className="px-4 py-3"><window.SeverityBadge value={v.severity} /></td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-600 bg-ink-50 px-2 py-0.5 rounded ring-1 ring-inset ring-ink-200">
                        {v.area}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                        v.status === 'Open' 
                          ? 'bg-rose-50 text-rose-700 ring-rose-200' 
                          : 'bg-amber-50 text-amber-700 ring-amber-200'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>

                  {/* Expandable row content */}
                  {isExpanded && (
                    <tr className="bg-ink-50/40">
                      <td colSpan={11} className="px-8 py-5 border-b border-ink-150">
                        <div className="grid grid-cols-12 gap-6 pl-4 border-l-4 border-rose-500 text-left">
                          
                          {/* Col 1: Conflict Scope */}
                          <div className="col-span-12 md:col-span-5 space-y-3.5">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Risk Description</span>
                              <p className="text-xs text-ink-850 font-semibold leading-relaxed">{v.desc}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Recommended Remediation Action</span>
                              <p className="text-xs text-ink-850 leading-relaxed font-bold text-amber-700 bg-amber-50 p-2.5 rounded border border-amber-200">
                                {v.action}
                              </p>
                            </div>
                          </div>

                          {/* Col 2: SAP Parameters */}
                          <div className="col-span-12 md:col-span-4 space-y-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Conflicting Roles</span>
                              <div className="flex flex-wrap gap-1.5">
                                {v.expanded.roles.map(r => (
                                  <span key={r} className="font-mono text-[10px] bg-white border border-ink-200 text-brand-700 px-2 py-0.5 rounded font-bold shadow-sm">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Conflicting Transactions</span>
                              <div className="flex flex-wrap gap-1.5">
                                {v.expanded.tcodes.map(tc => (
                                  <window.TCode key={tc} code={tc} size="sm" />
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Authorization Objects Checked</span>
                              <div className="flex flex-wrap gap-1.5">
                                {v.expanded.authObjects.map(obj => (
                                  <span key={obj} className="font-mono text-[9px] bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded font-semibold border border-ink-200">
                                    {obj}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Col 3: Audit Mapping */}
                          <div className="col-span-12 md:col-span-3 space-y-3 bg-white p-4 rounded-xl border border-ink-200 shadow-sm">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compliance & Regulatory Impact</span>
                              <p className="text-xs font-semibold text-rose-800 leading-snug">{v.expanded.impact}</p>
                            </div>
                            <div className="pt-2 border-t border-ink-100">
                              <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Regulatory Mapping</span>
                              <span className="font-mono text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded block w-fit">
                                {v.expanded.mapping}
                              </span>
                            </div>
                            <div className="pt-2 border-t border-ink-100">
                              <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Historical Violations</span>
                              <p className="text-[11px] text-ink-500 leading-snug">{v.expanded.history}</p>
                            </div>
                            <div className="pt-2 border-t border-ink-100 flex gap-2">
                              <button
                                onClick={() => onNavigate('user-profile', v.userId)}
                                className="flex-1 text-center py-1.5 rounded bg-ink-900 text-white hover:bg-ink-850 font-bold text-[11px] transition-colors"
                              >
                                User Profile
                              </button>
                              <button
                                onClick={() => onNavigate('risk-detail', v.violationId)}
                                className="flex-1 text-center py-1.5 rounded border border-ink-300 hover:bg-ink-50 text-ink-700 font-bold text-[11px] transition-colors"
                              >
                                Risk Details
                              </button>
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </window.Section>
  );
}

/* ─── Remediation Tracking Grid ────────────────────────────────── */
const REMEDIATION_TASKS = [
  {
    violationId: 'V-1058',
    recType: 'Role Redesign',
    priority: 'P1 - Immediate',
    owner: 'Finance Systems Manager',
    dueDate: '2026-06-25',
    status: 'In Progress',
    expanded: {
      steps: '1. Review transaction logs for VF01. 2. Redesign ZSD_BR_BILLING_CREATE to split order entry and billing release scopes. 3. Deploy and verify role utilization.',
      justification: 'Removes billing authorization overlaps that bypass dual authorization controls.',
      benefit: 'Aligns revenue processes with SOX §404 compliance guidelines.',
      auditImpact: 'Addresses key audit deficiencies identified by lead compliance auditors.'
    }
  },
  {
    violationId: 'V-1071',
    recType: 'Access Removal',
    priority: 'P1 - Immediate',
    owner: 'Basis Security Lead',
    dueDate: '2026-06-18',
    status: 'Open',
    expanded: {
      steps: '1. Revoke direct SU01 accesses from secondary administrator logins. 2. Restrict user maintenance tools to emergency firefighters only.',
      justification: 'Prevents untraceable privilege creation.',
      benefit: 'Eliminates technical backdoor accesses, reinforcing ISO 27001 policies.',
      auditImpact: 'Prevents security audit failure for platform user controls.'
    }
  },
  {
    violationId: 'V-1042',
    recType: 'Access Removal',
    priority: 'P2 - High',
    owner: 'SAP Security Architect',
    dueDate: '2026-07-10',
    status: 'In Progress',
    expanded: {
      steps: '1. Identify all accountants holding FK01 (create vendor) and F110 (approve payments). 2. Revoke FK01 from payables clerks. 3. Enforce secondary reviews.',
      justification: 'Closes key fraud vector where payouts could be sent to self-created vendor accounts.',
      benefit: 'Eliminates high-risk embezzlement exposure vectors.',
      auditImpact: 'Ensures compliance with standard Segregation of Duties guidelines.'
    }
  },
  {
    violationId: 'V-1124',
    recType: 'Role Redesign',
    priority: 'P1 - Immediate',
    owner: 'IT Security Manager',
    dueDate: '2026-06-20',
    status: 'Open',
    expanded: {
      steps: '1. Map execution tasks triggered by the job account. 2. Remove default SAP_ALL assignment. 3. Assign custom least-privilege batch role.',
      justification: 'Background system integration users must not hold unmonitored global admin profiles.',
      benefit: 'Reduces threat profile for automated integrations.',
      auditImpact: 'Resolves critical security deficiency highlighted in prior quarterly audit report.'
    }
  },
  {
    violationId: 'V-1101',
    recType: 'Mitigating Control',
    priority: 'P3 - Medium',
    owner: 'Treasury Controller',
    dueDate: '2026-08-01',
    status: 'Open',
    expanded: {
      steps: '1. Deploy automated verification workflow for manual ledger edits. 2. Maintain dual signature authorization on all outgoing disbursements.',
      justification: 'Establishes compensating controls while long-term role redesigns are implemented.',
      benefit: 'Lowers operational vulnerability during restructuring transitions.',
      auditImpact: 'Enables compliant GRC exception listing with auditor approval.'
    }
  }
];

function RemediationTrackingGrid() {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <window.Section 
      title="Remediation Tracking [SOD-11]" 
      subtitle="Remediation governance logs. Click any row to expand remediation details, justification, and audit benefits."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50/50">
              <th className="w-8 px-4 py-3"></th>
              <window.Th className="w-32">Violation ID</window.Th>
              <window.Th className="w-44">Recommendation Type</window.Th>
              <window.Th className="w-36">Priority</window.Th>
              <window.Th className="w-56">Owner</window.Th>
              <window.Th className="w-36">Due Date</window.Th>
              <window.Th className="w-32">Status</window.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {REMEDIATION_TASKS.map(t => {
              const isExpanded = expandedRow === t.violationId;
              const priorityColor = t.priority.startsWith('P1') ? 'text-rose-600' : t.priority.startsWith('P2') ? 'text-orange-600' : 'text-amber-600';
              const statusColor = t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-emerald-250' : t.status === 'In Progress' ? 'bg-blue-50 text-blue-750 ring-blue-200' : 'bg-ink-50 text-ink-600 ring-ink-200';

              return (
                <React.Fragment key={t.violationId}>
                  <tr 
                    onClick={() => setExpandedRow(isExpanded ? null : t.violationId)}
                    className={`row-hover cursor-pointer align-middle ${isExpanded ? 'bg-rose-50/10' : ''}`}
                  >
                    <td className="px-4 py-3 text-center">
                      <window.Icon 
                        name="chevron" 
                        className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-ink-900">{t.violationId}</td>
                    <td className="px-4 py-3 font-semibold text-ink-800">{t.recType}</td>
                    <td className={`px-4 py-3 font-bold text-xs ${priorityColor}`}>{t.priority}</td>
                    <td className="px-4 py-3 font-medium text-ink-700">{t.owner}</td>
                    <td className="px-4 py-3 font-mono text-ink-600 text-xs">{t.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>

                  {/* Expandable row content */}
                  {isExpanded && (
                    <tr className="bg-ink-50/40">
                      <td colSpan={7} className="px-8 py-4 border-b border-ink-150">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 border-brand-500 text-left">
                          
                          {/* Left: Action Steps & Justification */}
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Remediation Action Steps</span>
                              <p className="text-xs text-ink-800 leading-relaxed font-semibold">{t.expanded.steps}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Business Justification</span>
                              <p className="text-xs text-ink-650 font-medium leading-relaxed italic">"{t.expanded.justification}"</p>
                            </div>
                          </div>

                          {/* Right: Compliance Benefit & Audit Impact */}
                          <div className="space-y-3 bg-white p-4 rounded-xl border border-ink-200 shadow-sm">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compliance Benefit</span>
                              <p className="text-xs text-ink-800 leading-relaxed font-medium">{t.expanded.benefit}</p>
                            </div>
                            <div className="pt-2.5 border-t border-ink-100">
                              <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Audit Impact</span>
                              <p className="text-xs font-bold text-brand-700 leading-relaxed">{t.expanded.benefit}</p>
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </window.Section>
  );
}

/* ─── Executive GRC Dashboard Assembly ────────────────────────── */
window.LaunchPage = function({ onNavigate, selectedRun }) {
  // Process counts dynamically based on active run or seed defaults
  const runId = selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007';
  const totalUsers = selectedRun ? selectedRun.usersAnalyzed : '540';
  const totalViolations = selectedRun ? selectedRun.violationsFound : '46';
  const complianceScore = selectedRun ? selectedRun.complianceScore : 93.5;
  const criticalCount = selectedRun ? selectedRun.criticalViolationsCount : 18;
  const runDate = selectedRun ? selectedRun.date : 'May 19, 2026';

  // Seed relative breakdowns
  const highCount = runId === 'LCSOD-2026-Q2-007' ? 19 : runId === 'LCSOD-2026-Q1-006' ? 15 : 22;
  const mediumCount = runId === 'LCSOD-2026-Q2-007' ? 9 : runId === 'LCSOD-2026-Q1-006' ? 8 : 4;
  const lowCount = 0;

  return (
    <div data-screen-label="Dashboard Overview" className="space-y-6 px-4 md:px-7 py-6 text-left">
      
      {/* Dashboard Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-ink-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">Executive Dashboard</span>
          <h2 className="text-xl font-black text-ink-900 mt-0.5">KTern.AI SoD Compliance Command Center</h2>
          <p className="text-xs text-ink-500 mt-1">
            Real-time Segregation of Duties metrics and remediation tracking for Lotte Chemical ERP systems.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-700 bg-ink-50 px-4 py-2.5 rounded-xl border border-ink-200">
          <span>Active Run: <b className="font-mono text-brand-700">{runId}</b></span>
          <span className="text-ink-300">|</span>
          <span>System: <b>PRD · S/4HANA</b></span>
          <span className="text-ink-300">|</span>
          <span>Scan Date: <b>{runDate}</b></span>
        </div>
      </div>

      {/* SECTION 1: Compliance Overview (Exactly 4 Main KPIs only) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
          <span>Compliance Overview [SOD-01 / SOD-02]</span>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <window.StatCard label="Total Users Scanned" value={totalUsers} metricKey="totalUsers" />
          <window.StatCard severity="Critical" label="Total SoD Violations" value={totalViolations} metricKey="totalViolations" />
          <window.StatCard label="Compliance Score" value={`${complianceScore}%`} tone="good" metricKey="complianceScore" onClick={() => onNavigate('compliance-detail')} />
          <window.StatCard severity="Critical" label="Critical Risks" value={criticalCount} metricKey="criticalViolations" />
        </div>
      </div>

      {/* SECTION 2: Risk Overview */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
          <span>Risk Overview [SOD-05]</span>
        </div>
        
        <window.Section 
          title={
            <div className="flex items-center gap-1.5">
              <span>Enterprise Risk Severity Distribution Line</span>
              <window.Tooltip 
                align="top-left"
                tooltipClassName="w-[450px] bg-white border border-ink-200 shadow-pop p-3 text-ink-800 font-medium"
                tip={
                  <div className="space-y-2 text-left">
                    <div className="font-bold text-ink-900 text-[12px] border-b border-ink-100 pb-1.5">
                      Risk Coverage Score Formula
                    </div>
                    <code className="block bg-ink-50 p-2 rounded font-mono text-[11px] text-brand-700 border border-ink-150 leading-snug whitespace-nowrap">
                      Score = ( 1 - WUR / WDR ) * 100
                    </code>
                    <p className="text-ink-500 text-[10.5px] leading-relaxed">
                      Where <b>WDR</b> is Weighted Detected Risk and <b>WUR</b> is Weighted Unmitigated Risk based on critical, high, medium, and low severity weight parameters.
                    </p>
                  </div>
                }
              >
                <button type="button" className="text-ink-400 hover:text-brand-600 transition-colors p-0.5 rounded cursor-help focus:outline-none">
                  <window.Icon name="info" className="w-3.5 h-3.5" />
                </button>
              </window.Tooltip>
            </div>
          }
          subtitle="Linear progression chart mapping unmitigated access conflicts across severity classifications. Bar chart excluded in favor of progression lines."
        >
          <div className="p-6">
            <EnterpriseSeverityDistributionLine 
              critical={criticalCount} 
              high={highCount} 
              medium={mediumCount} 
              low={lowCount} 
            />
          </div>
        </window.Section>
      </div>

      {/* SECTION 3: Violation Investigation */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
          <span>Violation Investigation [SOD-03]</span>
        </div>
        <MaterialRiskInventoryGrid onNavigate={onNavigate} />
      </div>

      {/* SECTION 4: Remediation Tracking */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
          <span>Remediation Tracking [SOD-11]</span>
        </div>
        <RemediationTrackingGrid />
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center border-t border-ink-200 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
        KTern.AI SoD Auditor · v2.4 · Lotte Chemical Compliance Protocol
      </footer>
    </div>
  );
};