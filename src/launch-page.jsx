const { useState, useMemo, useEffect } = React;

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
        <span className="text-[11px] font-bold text-ink-450 uppercase tracking-wider flex items-center gap-1">
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

window.MaterialRiskInventoryGrid = MaterialRiskInventoryGrid;

/* ─── SOD-12 Continuous Compliance Component ─── */
function Sod12ContinuousComplianceView() {
  const rules = [
    { id: 'RUL-904', code: 'Z_SOD_01', desc: 'Prevent Vendor Create + AP Payment', deployed: '2026-05-20', status: 'Active', author: 'J. Smith' },
    { id: 'RUL-903', code: 'Z_SOD_02', desc: 'Enforce Firefighter Expiry < 30 days', deployed: '2026-05-18', status: 'Active', author: 'A. Poche' },
    { id: 'RUL-902', code: 'Z_SOD_03', desc: 'Flag F110 out of Treasury group', deployed: '2026-05-10', status: 'Active', author: 'B. Carrier' },
    { id: 'RUL-901', code: 'Z_SOD_04', desc: 'Restrict PFCG for non-Basis users', deployed: '2026-05-02', status: 'Active', author: 'J. Smith' },
    { id: 'RUL-900', code: 'Z_SOD_05', desc: 'Detect Bank Edit + Payment Block removal', deployed: '2026-04-25', status: 'Active', author: 'H. Schroder' },
    { id: 'RUL-899', code: 'Z_SOD_06', desc: 'Full OTC cycle by single user alert', deployed: '2026-04-10', status: 'Pending', author: 'Y. Kim' },
    { id: 'RUL-898', code: 'Z_SOD_07', desc: 'Background RFC with SAP_ALL equivalent', deployed: '2026-04-05', status: 'Pending', author: 'S. Chen' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <window.StatCard label="Automated Check Rules" value="7 Deployed" icon="shield" />
        <window.StatCard label="Active Status" value="5 Active" tone="good" />
        <window.StatCard label="Pending Review" value="2 Pending" severity="High" />
        <window.StatCard label="Rule Coverage Rate" value="95%" tone="good" />
      </div>

      <window.Section 
        title="Continuous Rules Deployment Log"
        subtitle="Automated checks deployed in background engines to monitor access changes between quarterly scans."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50/50">
                <window.Th className="px-4 py-3 text-left">Rule ID</window.Th>
                <window.Th className="px-4 py-3 text-left">Rule Code</window.Th>
                <window.Th className="px-4 py-3 text-left">Description</window.Th>
                <window.Th className="px-4 py-3 text-left">Deployed Date</window.Th>
                <window.Th className="px-4 py-3 text-left">Status</window.Th>
                <window.Th className="px-4 py-3 text-left">Author</window.Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rules.map(r => (
                <tr key={r.id} className="row-hover">
                  <td className="px-4 py-3 font-mono font-bold text-ink-900">{r.id}</td>
                  <td className="px-4 py-3 font-mono font-bold text-brand-600">{r.code}</td>
                  <td className="px-4 py-3 font-semibold text-ink-800">{r.desc}</td>
                  <td className="px-4 py-3 font-mono text-ink-600">{r.deployed}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500 font-semibold">{r.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </window.Section>
    </div>
  );
}

const getSodStreamForUser = (u) => {
  if (u.firefighterId && u.firefighterId !== 'N/A') return 'SOD-08';
  if (u.accountType === 'Service' || u.accountType === 'System') return 'SOD-10';
  if (u.role && u.role.includes('SYSTEM')) return 'SOD-06';
  if (u.violationId === 'V-1058') return 'SOD-09';
  if (u.violationId === 'V-1042') return 'SOD-07';
  if (u.violationId === 'V-1101') return 'SOD-04';
  if (u.violationId === 'V-1090') return 'SOD-08';
  if (u.violationId === 'V-1131') return 'SOD-05';
  if (u.riskViolation === 'Yes') return 'SOD-03';
  return 'SOD-11';
};

const getSodStreamForRisk = (r) => {
  if (r.riskId === 'V-1058') return 'SOD-09';
  if (r.riskId === 'V-1042') return 'SOD-07';
  if (r.riskId === 'V-1101') return 'SOD-04';
  if (r.riskId === 'V-1090') return 'SOD-08';
  if (r.riskId === 'V-1131') return 'SOD-05';
  if (r.level === 'Critical') return 'SOD-03';
  if (r.level === 'High') return 'SOD-06';
  return 'SOD-11';
};

window.LaunchPage = function({ 
  onNavigate, 
  selectedRun,
  activeStream,
  setActiveStream,
  userSearch,
  setUserSearch,
  userDept,
  setUserDept,
  userRisk,
  setUserRisk,
  userSodFilter,
  setUserSodFilter,
  userPage,
  setUserPage,
  userSort,
  setUserSort,
  riskSearch,
  setRiskSearch,
  riskProcess,
  setRiskProcess,
  riskLevel,
  setRiskLevel,
  riskSodFilter,
  setRiskSodFilter,
  riskPage,
  setRiskPage,
  riskSort,
  setRiskSort,
  preservedScrollY,
  setPreservedScrollY,
  setActiveModalRisk
}) {
  const runId = selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007';
  const totalUsers = selectedRun ? selectedRun.usersAnalyzed : '540';
  const totalViolations = selectedRun ? selectedRun.violationsFound : '46';
  const complianceScore = selectedRun ? selectedRun.complianceScore : 93.5;
  const criticalCount = selectedRun ? selectedRun.criticalViolationsCount : 18;
  const runDate = selectedRun ? selectedRun.date : 'May 19, 2026';

  const highCount = runId === 'LCSOD-2026-Q2-007' ? 19 : runId === 'LCSOD-2026-Q1-006' ? 15 : 22;
  const mediumCount = runId === 'LCSOD-2026-Q2-007' ? 9 : runId === 'LCSOD-2026-Q1-006' ? 8 : 4;
  const lowCount = 0;

  const totalRoles = selectedRun ? selectedRun.rolesAnalyzed : '450';
  const totalAuthObjects = runId === 'LCSOD-2026-Q2-007' ? '27,819' : runId === 'LCSOD-2026-Q1-006' ? '26,450' : '25,120';

  // Restore scroll position
  useEffect(() => {
    if (preservedScrollY > 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, preservedScrollY);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [preservedScrollY]);

  // Master Users pagination & filtering logic
  const filteredUsers = useMemo(() => {
    return (window.MOCK.ALL_USERS || []).filter(u => {
      const q = userSearch.toLowerCase();
      const matchesSearch = !userSearch || 
        u.userId.toLowerCase().includes(q) || 
        u.fullName.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.violationId.toLowerCase().includes(q) ||
        u.violationDesc.toLowerCase().includes(q);

      const matchesDept = userDept === 'All' || u.processArea === userDept;
      const matchesRisk = userRisk === 'All' || 
        (userRisk === 'Violators' && u.riskViolation === 'Yes') ||
        (userRisk === 'Compliant' && u.riskViolation === 'No') ||
        (userRisk === 'Critical' && u.severity === 'Critical') ||
        (userRisk === 'High' && u.severity === 'High');

      const stream = getSodStreamForUser(u);
      const matchesSod = !userSodFilter || userSodFilter === 'All' || stream === userSodFilter;

      return matchesSearch && matchesDept && matchesRisk && matchesSod;
    }).sort((a, b) => {
      const dir = userSort.dir === 'asc' ? 1 : -1;
      const key = userSort.key;
      if (key === 'sodStream') {
        return getSodStreamForUser(a).localeCompare(getSodStreamForUser(b)) * dir;
      }
      return String(a[key] || '').localeCompare(String(b[key] || '')) * dir;
    });
  }, [userSearch, userDept, userRisk, userSort, userSodFilter]);

  const pagedUsers = useMemo(() => {
    const size = 10;
    return filteredUsers.slice((userPage - 1) * size, userPage * size);
  }, [filteredUsers, userPage]);

  // Master Risks pagination & filtering logic
  const filteredRisks = useMemo(() => {
    return (window.MOCK.ALL_RISKS || []).filter(r => {
      const q = riskSearch.toLowerCase();
      const matchesSearch = !riskSearch ||
        r.riskId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.grcMapping.toLowerCase().includes(q);

      const matchesProcess = riskProcess === 'All' || r.process === riskProcess;
      const matchesLevel = riskLevel === 'All' || r.level === riskLevel;

      const stream = getSodStreamForRisk(r);
      const matchesSod = !riskSodFilter || riskSodFilter === 'All' || stream === riskSodFilter;

      return matchesSearch && matchesProcess && matchesLevel && matchesSod;
    }).sort((a, b) => {
      const dir = riskSort.dir === 'asc' ? 1 : -1;
      const key = riskSort.key;
      if (key === 'userCount') {
        return (a.userCount - b.userCount) * dir;
      }
      if (key === 'sodStream') {
        return getSodStreamForRisk(a).localeCompare(getSodStreamForRisk(b)) * dir;
      }
      return String(a[key] || '').localeCompare(String(b[key] || '')) * dir;
    });
  }, [riskSearch, riskProcess, riskLevel, riskSort, riskSodFilter]);

  const pagedRisks = useMemo(() => {
    const size = 5;
    return filteredRisks.slice((riskPage - 1) * size, riskPage * size);
  }, [filteredRisks, riskPage]);

  const getUserCountForStream = (streamKey) => {
    if (streamKey === 'All') return (window.MOCK.ALL_USERS || []).length;
    return (window.MOCK.ALL_USERS || []).filter(u => getSodStreamForUser(u) === streamKey).length;
  };

  const getRiskCountForStream = (streamKey) => {
    if (streamKey === 'All') return (window.MOCK.ALL_RISKS || []).length;
    return (window.MOCK.ALL_RISKS || []).filter(r => getSodStreamForRisk(r) === streamKey).length;
  };

  return (
    <div data-screen-label="Dashboard Overview" className="space-y-6 px-4 md:px-7 py-6 text-left animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-500">
          <window.Icon name="home" className="w-3.5 h-3.5" />
          <span>Home</span>
          <span className="text-ink-300">/</span>
          <span>Analysis Runs</span>
          <span className="text-ink-300">/</span>
          <span className="text-ink-900 font-bold">SoD Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          PRD — Production
        </div>
      </div>

      {/* Page Title Header */}
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center shadow-sm border border-blue-100 shrink-0">
          <window.Icon name="shield" className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">SoD Analysis</h1>
          <p className="text-sm text-ink-500 mt-1">
            Analyze and optimize SAP user segregation of duties checks and unmitigated risk controls across your organization.
          </p>
        </div>
      </div>

      {/* Redesigned 4 KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: No. of Users */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-blue-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <window.Icon name="user" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">NO. OF USERS</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalUsers}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            Total SAP users analyzed
          </div>
        </div>

        {/* Card 2: Total Roles Scanned */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-orange-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <window.Icon name="table" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">TOTAL ROLES SCANNED</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalRoles}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            {totalRoles} active role mappings
          </div>
        </div>

        {/* Card 3: Total Auth Objects */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-yellow-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <window.Icon name="package" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">TOTAL AUTH OBJECTS</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalAuthObjects}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            {totalAuthObjects} assigned auth Objects
          </div>
        </div>

        {/* Card 4: Risk Severity Classification */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-purple-500 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <window.Icon name="flame" className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">RISK SEVERITIES</span>
            </div>

            <div className="mt-3.5">
              <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden flex">
                <div className="bg-red-500 h-full" style={{ width: '39.1%' }} />
                <div className="bg-orange-500 h-full" style={{ width: '41.3%' }} />
                <div className="bg-yellow-500 h-full" style={{ width: '19.6%' }} />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-ink-800">
              <div className="flex items-center gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>CRIT <b className="font-mono">{criticalCount}</b></span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>HIGH <b className="font-mono">{highCount}</b></span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span>MED <b className="font-mono">{mediumCount}</b></span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-ink-450 font-medium">
            By unmitigated violations
          </div>
        </div>
      </div>

      {/* Combined SoD Risk Distribution & Coverage Assessment [SOD-01 & SOD-02] */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-6 text-left">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-ink-100 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-ink-900 uppercase tracking-tight flex items-center gap-2">
              <span>SoD Risk Distribution & Coverage Assessment [SOD-01 & SOD-02]</span>
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-mono font-bold rounded-full border border-purple-200">Executive Summary</span>
            </h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Unified severity distribution matrix and compliance coverage calculation.</p>
          </div>
          <window.ExportButton label="Export Analysis (Excel)" size="sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: SoD Risk Distribution Table (SOD-01) */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xs font-bold text-ink-700 uppercase tracking-wider">Unified Risk Severity Matrix</h4>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-ink-200 text-ink-500 font-bold">
                  <th className="py-2.5 flex items-center">
                    SEVERITY TIER
                    <window.HeaderTooltip tip="The classified severity level of the risk rule definition." />
                  </th>
                  <th className="py-2.5">
                    <span className="flex items-center">
                      ACTIVE VIOLATIONS
                      <window.HeaderTooltip tip="The number of active user logins currently triggering this severity level." />
                    </span>
                  </th>
                  <th className="py-2.5">
                    <span className="flex items-center">
                      SEVERITY WEIGHT
                      <window.HeaderTooltip tip="Weight coefficient applied to this severity in risk score calculations." />
                    </span>
                  </th>
                  <th className="py-2.5 w-1/3">
                    <span className="flex items-center">
                      RISK DISTRIBUTION
                      <window.HeaderTooltip tip="Percentage share and visual representation of this severity against total violations." />
                    </span>
                  </th>
                  <th className="py-2.5 text-right">
                    <span className="flex items-center justify-end">
                      BUSINESS IMPACT
                      <window.HeaderTooltip tip="Operational, financial, or regulatory impact classification." />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 font-medium">
                {/* Critical */}
                <tr className="row-hover">
                  <td className="py-3.5 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                    <span className="font-bold text-ink-900">Critical Severity</span>
                  </td>
                  <td className="py-3.5">
                    <div className="text-sm font-bold text-ink-900">{criticalCount} <span className="text-[10px] text-ink-450 font-normal">users</span></div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 rounded font-mono text-[10px] font-bold">Weight ×1.0</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{((criticalCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: `${((criticalCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right text-rose-600 font-bold">High Risk (P1)</td>
                </tr>
                {/* High */}
                <tr className="row-hover">
                  <td className="py-3.5 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <span className="font-bold text-ink-900">High Severity</span>
                  </td>
                  <td className="py-3.5">
                    <div className="text-sm font-bold text-ink-900">{highCount} <span className="text-[10px] text-ink-450 font-normal">users</span></div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200 rounded font-mono text-[10px] font-bold">Weight ×0.6</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{((highCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: `${((highCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right text-orange-600 font-bold">Medium Risk (P2)</td>
                </tr>
                {/* Medium */}
                <tr className="row-hover">
                  <td className="py-3.5 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                    <span className="font-bold text-ink-900">Medium Severity</span>
                  </td>
                  <td className="py-3.5">
                    <div className="text-sm font-bold text-ink-900">{mediumCount} <span className="text-[10px] text-ink-450 font-normal">users</span></div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 rounded font-mono text-[10px] font-bold">Weight ×0.3</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{((mediumCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${((mediumCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right text-yellow-600 font-bold">Low Risk (P3)</td>
                </tr>
                {/* Low */}
                <tr className="row-hover">
                  <td className="py-3.5 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                    <span className="font-bold text-ink-900">Low Severity</span>
                  </td>
                  <td className="py-3.5">
                    <div className="text-sm font-bold text-ink-900">{lowCount} <span className="text-[10px] text-ink-450 font-normal">users</span></div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 rounded font-mono text-[10px] font-bold">Weight ×0.1</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{((lowCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${((lowCount / (Number(totalViolations) || 1)) * 100).toFixed(1)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right text-blue-600 font-bold">Minimal Risk (P4)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: Risk Coverage Score & Weights (SOD-02) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-ink-150 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-ink-100 mb-4">
                <span className="text-xs font-bold text-ink-700 uppercase tracking-wider">Compliance Assessment</span>
                <span className="text-xs text-ink-550 font-mono font-bold">{totalViolations} total violations</span>
              </div>
              
              {/* Large Score Callout */}
              <div className="bg-slate-50 border border-ink-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-500">Risk Coverage Score</span>
                <div className="text-4xl font-black text-ink-900 tracking-tight mt-1.5 font-mono">
                  {complianceScore}%
                </div>
                <div className="mt-2.5 px-3 py-1 bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Target Baseline: 95.0% - 98.0%
                </div>
              </div>
            </div>

            {/* Calculation Methodology Section */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-450 block">CALCULATION METHODOLOGY</span>
              <div className="bg-white rounded-xl border border-ink-200 shadow-sm p-3.5 text-center">
                <span className="text-xs font-bold text-ink-850 tracking-wide font-mono block">
                  Risk Coverage Score = ( 1 - WUR ÷ WDR ) × 100
                </span>
              </div>
              <p className="text-[11px] text-ink-550 leading-relaxed font-medium">
                Where <span className="font-bold text-ink-850">WDR</span> is Weighted Detected Risk and <span className="font-bold text-ink-850">WUR</span> is Weighted Unmitigated Risk based on critical, high, medium, and low severity weight parameters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Master User-wise Table */}
      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between border-b border-ink-200 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-ink-900">Master User-wise Compliance Registry</h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Comprehensive grid containing all dialog and firefighter identities and unmitigated authorization check flags.</p>
          </div>
          <window.ExportButton label="Export Users (Excel)" size="sm" />
        </div>

        {/* Scrollable SoD Stream Pills Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
          {[
            { key: 'All', label: 'All Streams' },
            { key: 'SOD-03', label: 'SOD-03: Critical' },
            { key: 'SOD-04', label: 'SOD-04: Immediate' },
            { key: 'SOD-05', label: 'SOD-05: Compliance' },
            { key: 'SOD-06', label: 'SOD-06: Super Admin' },
            { key: 'SOD-07', label: 'SOD-07: Cross Process' },
            { key: 'SOD-08', label: 'SOD-08: Emergency Access' },
            { key: 'SOD-09', label: 'SOD-09: OTC Control' },
            { key: 'SOD-10', label: 'SOD-10: Service Accounts' },
            { key: 'SOD-11', label: 'SOD-11: Remediation' }
          ].map(s => {
            const isSelected = userSodFilter === s.key;
            const count = getUserCountForStream(s.key);
            return (
              <button
                key={s.key}
                onClick={() => {
                  setUserSodFilter(s.key);
                  setUserPage(1);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 snap-center ${
                  isSelected
                    ? 'bg-ink-900 border-ink-900 text-white shadow-sm ring-1 ring-ink-900'
                    : 'bg-white border-ink-200 text-ink-650 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                <span>{s.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-ink-100 text-ink-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* User Filter Controls */}
        <window.FilterBar 
          onClear={() => { 
            setUserSearch(''); 
            setUserDept('All'); 
            setUserRisk('All'); 
            setUserSodFilter('All');
            setUserPage(1); 
          }} 
          hasFilters={userSearch !== '' || userDept !== 'All' || userRisk !== 'All' || userSodFilter !== 'All'}
        >
          <div className="flex flex-wrap gap-2 items-center w-full">
            <window.Select 
              value={userDept} 
              onChange={val => { setUserDept(val); setUserPage(1); }} 
              options={['All', 'Finance', 'Procurement', 'OTC', 'HR', 'IT Basis', 'Sales', 'Treasury']}
              placeholder="All Areas" 
            />
            <window.Select 
              value={userRisk} 
              onChange={val => { setUserRisk(val); setUserPage(1); }} 
              options={['All', 'Violators', 'Compliant', 'Critical', 'High']} 
              placeholder="All Violations"
            />
            <div className="w-72">
              <window.SearchInput 
                value={userSearch} 
                onChange={val => { setUserSearch(val); setUserPage(1); }} 
                placeholder="Search user ID, name, role..." 
              />
            </div>
            <span className="ml-auto text-[11px] font-mono text-ink-400 font-bold">
              {filteredUsers.length} Users found
            </span>
          </div>
        </window.FilterBar>

        {/* User Grid with Horizontal Scroll */}
        <div className="overflow-x-auto border border-ink-200 rounded-xl shadow-sm bg-white min-h-[180px]">
          <table className="w-full text-[12.5px] border-collapse min-w-[2000px] table-fixed">
            <thead className="sticky top-0 bg-ink-50 z-10">
              <tr className="border-b border-ink-250">
                <window.Th className="w-24 px-4 py-3" sortKey="userId" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  User ID
                  <window.HeaderTooltip tip="Unique identification code of the user in the SAP system." />
                </window.Th>
                <window.Th className="w-36 px-4 py-3" sortKey="fullName" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Full Name
                  <window.HeaderTooltip tip="First and last name of the user." />
                </window.Th>
                <window.Th className="w-24 px-4 py-3" sortKey="riskViolation" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Violator
                  <window.HeaderTooltip tip="Indicates if the user has any active unmitigated SoD conflicts." />
                </window.Th>
                <window.Th className="w-24 px-4 py-3" sortKey="violationId" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Violation ID
                  <window.HeaderTooltip tip="The specific conflict rule ID violated by this user." />
                </window.Th>

                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Violation Description
                    <window.HeaderTooltip tip="Details of the incompatible permissions or transaction codes." />
                  </span>
                </th>
                <window.Th className="w-24 px-4 py-3" sortKey="severity" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Severity
                  <window.HeaderTooltip tip="Risk classification of the conflict (Critical, High, Medium, Low)." />
                </window.Th>
                <window.Th className="w-28 px-4 py-3" sortKey="processArea" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Process Area
                  <window.HeaderTooltip tip="The business department or functional area of the conflict (e.g. Finance, OTC)." />
                </window.Th>
                <th className="w-48 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Conflicting Transactions
                    <window.HeaderTooltip tip="Incompatible SAP transaction codes assigned to the user." />
                  </span>
                </th>
                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Business Impact
                    <window.HeaderTooltip tip="Potential risk or financial impact of this authorization overlap." />
                  </span>
                </th>
                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Recommended Action
                    <window.HeaderTooltip tip="Proposed remediation steps to resolve the conflict." />
                  </span>
                </th>
                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Recommendation Type
                    <window.HeaderTooltip tip="Type of mitigation (e.g. Role Redesign, Privilege Revocation)." />
                  </span>
                </th>
                <th className="w-28 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Priority
                    <window.HeaderTooltip tip="Urgency mapping for the remediation task." />
                  </span>
                </th>
                <window.Th className="w-28 px-4 py-3" sortKey="status" sort={userSort} onSort={k => setUserSort({ key: k, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Status
                  <window.HeaderTooltip tip="Current mitigation status (Open, In Progress, Resolved)." />
                </window.Th>
                <th className="w-36 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Assignee Suggestion
                    <window.HeaderTooltip tip="Recommended internal team to resolve the conflict." />
                  </span>
                </th>
                <th className="w-28 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Account Type
                    <window.HeaderTooltip tip="Type of SAP account (Dialog, Service, System)." />
                  </span>
                </th>
                <th className="w-24 px-4 py-3 text-right font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center justify-end">
                    Actions
                    <window.HeaderTooltip tip="Interactive drill-down and analysis actions." />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {pagedUsers.map(u => {
                return (
                  <tr key={u.userId} className="row-hover cursor-pointer transition-colors" onClick={() => onNavigate('user-profile', u.userId)}>
                    <td className="px-4 py-2.5 font-mono font-bold text-ink-900 truncate">{u.userId}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-800 truncate">{u.fullName}</td>
                    <td className="px-4 py-2.5">
                      <span className={`font-bold uppercase text-[10px] ${u.riskViolation === 'Yes' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {u.riskViolation}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-brand-600 font-bold truncate">{u.violationId}</td>
 
                    <td className="px-4 py-2.5 text-ink-700 truncate" title={u.violationDesc}>{u.violationDesc}</td>
                    <td className="px-4 py-2.5"><window.SeverityBadge value={u.severity} /></td>
                    <td className="px-4 py-2.5 font-semibold text-ink-600">{u.processArea}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-600 truncate" title={u.conflictingTransactions}>{u.conflictingTransactions}</td>
                    <td className="px-4 py-2.5 text-ink-500 truncate text-xs" title={u.businessImpact}>{u.businessImpact}</td>
                    <td className="px-4 py-2.5 text-ink-600 truncate text-xs" title={u.recommendedAction}>{u.recommendedAction}</td>
                    <td className="px-4 py-2.5 text-ink-700 truncate font-semibold">{u.recommendationType}</td>
                    <td className="px-4 py-2.5 font-bold text-ink-700">{u.priority}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                        u.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-emerald-250' : 'bg-rose-50 text-rose-700 ring-rose-250'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-ink-600 font-semibold truncate">{u.assignee}</td>
                    <td className="px-4 py-2.5 text-ink-600">{u.accountType}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('user-profile', u.userId);
                        }}
                        className="px-2.5 py-1 rounded font-bold text-[11px] bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {pagedUsers.length === 0 && (
                <tr>
                  <td colSpan={16} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                    No users found matching filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <window.Pagination page={userPage} pageSize={10} total={filteredUsers.length} onPage={setUserPage} />
      </div>

      {/* Master Risk-wise Table */}
      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between border-b border-ink-200 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-ink-900">Master SoD Risks Ruleset Catalog</h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Global definitions of Segregation of Duties checks, conflict pairs, and business impact parameters.</p>
          </div>
          <window.ExportButton label="Export Ruleset" size="sm" />
        </div>

        {/* Scrollable SoD Stream Pills Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
          {[
            { key: 'All', label: 'All Streams' },
            { key: 'SOD-03', label: 'SOD-03: Critical' },
            { key: 'SOD-04', label: 'SOD-04: Immediate' },
            { key: 'SOD-05', label: 'SOD-05: Compliance' },
            { key: 'SOD-06', label: 'SOD-06: Super Admin' },
            { key: 'SOD-07', label: 'SOD-07: Cross Process' },
            { key: 'SOD-08', label: 'SOD-08: Emergency Access' },
            { key: 'SOD-09', label: 'SOD-09: OTC Control' },
            { key: 'SOD-10', label: 'SOD-10: Service Accounts' },
            { key: 'SOD-11', label: 'SOD-11: Remediation' }
          ].map(s => {
            const isSelected = riskSodFilter === s.key;
            const count = getRiskCountForStream(s.key);
            return (
              <button
                key={s.key}
                onClick={() => {
                  setRiskSodFilter(s.key);
                  setRiskPage(1);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 snap-center ${
                  isSelected
                    ? 'bg-ink-900 border-ink-900 text-white shadow-sm ring-1 ring-ink-900'
                    : 'bg-white border-ink-200 text-ink-650 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                <span>{s.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-ink-100 text-ink-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Risk Filter Controls */}
        <window.FilterBar 
          onClear={() => { 
            setRiskSearch(''); 
            setRiskProcess('All'); 
            setRiskLevel('All'); 
            setRiskSodFilter('All');
            setRiskPage(1); 
          }} 
          hasFilters={riskSearch !== '' || riskProcess !== 'All' || riskLevel !== 'All' || riskSodFilter !== 'All'}
        >
          <div className="flex flex-wrap gap-2 items-center w-full">
            <window.Select 
              value={riskProcess} 
              onChange={val => { setRiskProcess(val); setRiskPage(1); }} 
              options={['All', 'Finance', 'Procurement', 'OTC', 'HR', 'IT']} 
              placeholder="All Processes" 
            />
            <window.Select 
              value={riskLevel} 
              onChange={val => { setRiskLevel(val); setRiskPage(1); }} 
              options={['All', 'Critical', 'High', 'Medium', 'Low']} 
              placeholder="All Levels" 
            />
            <div className="w-72">
              <window.SearchInput 
                value={riskSearch} 
                onChange={val => { setRiskSearch(val); setRiskPage(1); }} 
                placeholder="Search risk ID, title, grc code..." 
              />
            </div>
            <span className="ml-auto text-[11px] font-mono text-ink-400 font-bold">
              {filteredRisks.length} Risks found
            </span>
          </div>
        </window.FilterBar>

        {/* Risk Grid with Horizontal Scroll */}
        <div className="overflow-x-auto border border-ink-200 rounded-xl shadow-sm bg-white min-h-[180px]">
          <table className="w-full text-[12.5px] border-collapse min-w-[1600px] table-fixed">
            <thead className="sticky top-0 bg-ink-50 z-10">
              <tr className="border-b border-ink-250">
                <window.Th className="w-24 px-4 py-3" sortKey="riskId" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Risk ID
                  <window.HeaderTooltip tip="Global identifier for the Segregation of Duties check rule." />
                </window.Th>
                <window.Th className="w-48 px-4 py-3" sortKey="title" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Risk Title
                  <window.HeaderTooltip tip="Descriptive name of the SoD check rule." />
                </window.Th>
                <window.Th className="w-32 px-4 py-3" sortKey="category" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Risk Category
                  <window.HeaderTooltip tip="Business control domain (e.g., Financial, Operational)." />
                </window.Th>

                <window.Th className="w-24 px-4 py-3" sortKey="level" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Severity
                  <window.HeaderTooltip tip="Severity level of the risk if violated (Critical, High, Medium, Low)." />
                </window.Th>
                <window.Th className="w-28 px-4 py-3" sortKey="userCount" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Affected Users
                  <window.HeaderTooltip tip="Number of active user accounts violating this specific rule." />
                </window.Th>
                <th className="w-48 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Affected Roles
                    <window.HeaderTooltip tip="Count of SAP roles carrying the incompatible transaction codes." />
                  </span>
                </th>
                <window.Th className="w-28 px-4 py-3" sortKey="process" sort={riskSort} onSort={k => setRiskSort({ key: k, dir: riskSort.dir === 'asc' ? 'desc' : 'asc' })}>
                  Process Area
                  <window.HeaderTooltip tip="SAP module or business process area monitored." />
                </window.Th>
                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Regulatory / Business Impact
                    <window.HeaderTooltip tip="Compliance frameworks (SOX, ISO) and business risks." />
                  </span>
                </th>
                <th className="w-64 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Recommended Action
                    <window.HeaderTooltip tip="Audit-approved remediation recommendations." />
                  </span>
                </th>
                <th className="w-24 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Priority
                    <window.HeaderTooltip tip="Triage priority for resolving violations of this rule." />
                  </span>
                </th>
                <th className="w-24 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Status
                    <window.HeaderTooltip tip="Status of the risk rule in the active ruleset." />
                  </span>
                </th>
                <th className="w-36 px-4 py-3 text-left font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center">
                    Assignee
                    <window.HeaderTooltip tip="Accountable compliance or security team." />
                  </span>
                </th>
                <th className="w-24 px-4 py-3 text-right font-bold text-ink-600 uppercase text-[10px]">
                  <span className="flex items-center justify-end">
                    Actions
                    <window.HeaderTooltip tip="Drill-down to view rule blueprints." />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {pagedRisks.map(r => {
                const priority = r.level === 'Critical' ? 'P1 - Urgent' : r.level === 'High' ? 'P2 - High' : 'P3 - Medium';
                return (
                  <tr key={r.riskId} className="row-hover cursor-pointer transition-colors" onClick={() => onNavigate('risk-detail', r.riskId)}>
                    <td className="px-4 py-2.5 font-mono font-bold text-ink-900 truncate">{r.riskId}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-800 truncate" title={r.title}>{r.title}</td>
                    <td className="px-4 py-2.5 text-ink-600 font-semibold">{r.category}</td>
 
                    <td className="px-4 py-2.5"><window.SeverityBadge value={r.level} /></td>
                    <td className="px-4 py-2.5">
                      {r.userCount > 0 ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalRisk(r);
                          }}
                          className="font-mono font-bold text-brand-600 hover:text-brand-850 underline cursor-pointer focus:outline-none"
                        >
                          {r.userCount}
                        </button>
                      ) : (
                        <span className="font-mono font-bold text-ink-700">{r.userCount}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-600 truncate" title={r.roles.join(', ')}>{r.roles.join(', ')}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-600">{r.process}</td>
                    <td className="px-4 py-2.5 text-ink-500 truncate text-xs" title={`${r.businessImpact} ${r.complianceImpact}`}>
                      {r.businessImpact} {r.complianceImpact}
                    </td>
                    <td className="px-4 py-2.5 text-ink-650 truncate text-xs" title={r.recommendations}>{r.recommendations}</td>
                    <td className="px-4 py-2.5 font-bold text-ink-700">{priority}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                        r.status === 'Active' ? 'bg-rose-50 text-rose-700 ring-rose-200' : 'bg-amber-50 text-amber-700 ring-amber-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-ink-600 font-semibold truncate">{r.assignee || 'IT Compliance Lead'}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('risk-detail', r.riskId);
                        }}
                        className="px-2.5 py-1 rounded font-bold text-[11px] bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {pagedRisks.length === 0 && (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                    No risks found matching filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <window.Pagination page={riskPage} pageSize={5} total={filteredRisks.length} onPage={setRiskPage} />
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center border-t border-ink-200 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 animate-fade-in">
        KTern.AI SoD Auditor · v2.4 · Lotte Chemical Compliance Protocol
      </footer>

    </div>
  );
};