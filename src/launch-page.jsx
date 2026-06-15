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

const getSodStreamsForUser = (u) => {
  const streams = new Set(['SOD-05', 'SOD-11']);
  const riskRows = window.getRiskViolationsForUser ? window.getRiskViolationsForUser(u) : [];
  if (riskRows.some(r => r.severity === 'High') || u.riskViolation === 'Yes') streams.add('SOD-03');
  if (u.status === 'Open' || u.status === 'In Progress' || ['P1', 'P2', 'P1 - Immediate', 'P2 - High'].includes(u.priority)) streams.add('SOD-04');
  if (u.firefighterId && String(u.firefighterId).startsWith('FF')) streams.add('SOD-08');
  if (u.accountType === 'Service' || u.accountType === 'System') streams.add('SOD-10');
  if ((u.role && u.role.includes('SYSTEM')) || riskRows.some(r => String(r.businessProcess).includes('Basis'))) streams.add('SOD-06');
  if (riskRows.some(r => String(r.businessProcess).includes('Order to Cash'))) streams.add('SOD-09');
  if (riskRows.some(r => String(r.businessProcess).includes('Procure to Pay'))) streams.add('SOD-P2P');
  if (riskRows.length) streams.add('SOD-07');
  return Array.from(streams);
};

const getSodStreamForUser = (u) => getSodStreamsForUser(u)[0] || 'SOD-11';

const getSodStreamsForRisk = (r) => {
  const streams = new Set(['SOD-05', 'SOD-11']);
  if (r.level === 'Critical') streams.add('SOD-03');
  if (r.status === 'Open' || r.status === 'In Progress' || r.level === 'Critical' || r.level === 'High') streams.add('SOD-04');
  if (['V-1071', 'V-1124'].includes(r.riskId)) streams.add('SOD-06');
  if (['V-1090', 'V-1071'].includes(r.riskId)) streams.add('SOD-08');
  if (['V-1058', 'V-1101'].includes(r.riskId)) streams.add('SOD-09');
  if (['V-1124', 'V-1071'].includes(r.riskId)) streams.add('SOD-10');
  if (r.riskId === 'V-1094' || r.riskId === 'V-1131') streams.add('SOD-P2P');
  if (r.riskId === 'V-1042' || r.riskId === 'V-1101') streams.add('SOD-07');
  if (r.riskId === 'V-1058') streams.add('SOD-07');
  return Array.from(streams);
};

const getSodStreamForRisk = (r) => getSodStreamsForRisk(r)[0] || 'SOD-11';

const getRiskScore = (item) => {
  if (item && Number(item.riskScore) > 0) return Number(item.riskScore);
  const category = item && (item.riskCategory || item.category);
  const severity = item && (item.severity || item.level);
  const categoryBase = category === 'Financial' ? 75 : 65;
  const severityLift = severity === 'Critical' ? 25 : severity === 'High' ? 15 : severity === 'Medium' ? 8 : 0;
  return Math.min(100, categoryBase + severityLift);
};

const RISK_SCORE_TOOLTIP = 'Risk score is calculated from risk category and severity. Financial starts at 75 because it can affect SOX, revenue, payment, or accounting controls; Operational starts at 65 because it affects access, process, or IT control reliability. Severity then adds Critical +25, High +15, Medium +8, capped at 100.';

const AUTH_OBJECT_BY_TCODE = {
  VA01: ['V_VBAK_AAT', 'Sales order create authorization'],
  VF01: ['V_VBRK_FKA', 'Billing document create authorization'],
  'F-28': ['F_BKPF_BUK', 'Customer payment clearing authorization'],
  FK01: ['F_LFA1_APP', 'Vendor master create authorization'],
  F110: ['F_REGU_BUK', 'Automatic payment run authorization'],
  PFCG: ['S_USER_AGR', 'Role administration authorization'],
  SU01: ['S_USER_GRP', 'User master maintenance authorization'],
  MIGO: ['M_MSEG_BWA', 'Goods movement posting authorization'],
  MIRO: ['M_RECH_BUK', 'Invoice verification authorization']
};

const splitTcodes = (value) => String(value || '').split(',').map(v => v.trim()).filter(Boolean);

const getUserViolationDetails = (user) => (
  window.getRiskViolationsForUser ? window.getRiskViolationsForUser(user) : []
);

const getRiskCount = (user) => (
  window.getRiskCountForUser ? window.getRiskCountForUser(user) : getUserViolationDetails(user).length
);

const getViolationCount = (user) => (
  window.getViolationCountForUser ? window.getViolationCountForUser(user) : Math.max(1, splitTcodes(user.conflictingTransactions).length)
);

const getRemediationSteps = (item) => {
  const action = item.recommendedAction || item.recommendations || 'Review and remove conflicting authorization access.';
  const tcodes = splitTcodes(item.conflictingTransactions || item.func).join(', ') || 'conflicting transactions';
  const role = item.role || (item.roles && item.roles[0]) || 'affected SAP role';
  return [
    `Use PFCG to review ${role} and identify access granting ${tcodes}.`,
    `${action}.`,
    `Create a separated least-privilege role so the conflicting functions are not held by the same user.`,
    `Use SU10 or the access request workflow to remove the conflicting authorization from affected users.`,
    `Re-run the SoD rule and keep the violation Active until the retest shows no conflict.`
  ];
};

const UserViolationExpansion = ({ user }) => {
  const details = getUserViolationDetails(user);
  const [expandedRemediationRow, setExpandedRemediationRow] = useState(null);
  return (
    <div className="p-4 border-t border-ink-100 text-left">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-ink-500">Ruleset Risk Violations</span>
        <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded-lg ring-1 ring-brand-100">{user.userId}</span>
        <span className="text-xs font-bold text-ink-700">{details.length} risks mapped from S4HANAOP</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[1900px] text-xs">
          <thead className="bg-ink-50 text-[10px] uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-3 py-2 text-left">Risk ID</th>
              <th className="px-3 py-2 text-left">Function IDs</th>
              <th className="px-3 py-2 text-left">Function Names</th>
              <th className="px-3 py-2 text-left">Role Type</th>
              <th className="px-3 py-2 text-left">Business Process</th>
              <th className="px-3 py-2 text-left">Risk Category</th>
              <th className="px-3 py-2 text-left">Risk Score</th>
              <th className="px-3 py-2 text-left">Severity</th>
              <th className="px-3 py-2 text-left">Violation Scenario</th>
              <th className="px-3 py-2 text-left">Conflicting Transactions</th>
              <th className="px-3 py-2 text-left">Auth Objects</th>
              <th className="px-3 py-2 text-left">Business Impact</th>
              <th className="px-3 py-2 text-left">Standards / Controls Violated</th>
              <th className="px-3 py-2 text-left">Recommended Action</th>
              <th className="px-3 py-2 text-left">Remediation Priority</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {details.map((d, idx) => (
              <React.Fragment key={`${user.userId}_${d.riskId}_${idx}`}>
                <tr>
                  <td className="px-3 py-2 font-mono font-bold text-brand-700">{d.riskId}</td>
                  <td className="px-3 py-2 font-mono font-bold text-ink-800">{(d.functionIds || []).join(', ')}</td>
                  <td className="px-3 py-2 font-semibold text-ink-800 min-w-[220px]">{(d.functionNames || []).join(' | ')}</td>
                  <td className="px-3 py-2"><span className="rounded-md bg-slate-50 px-2 py-0.5 ring-1 ring-slate-200">{d.roleType}</span></td>
                  <td className="px-3 py-2 font-semibold text-ink-800">{d.businessProcess}</td>
                  <td className="px-3 py-2">{d.riskCategory}</td>
                  <td className="px-3 py-2 font-mono font-black text-ink-900">{d.riskScore}</td>
                  <td className="px-3 py-2"><window.SeverityBadge value={d.severity} /></td>
                  <td className="px-3 py-2 font-semibold text-ink-800 min-w-[220px]">{d.scenario}</td>
                  <td className="px-3 py-2 font-mono text-brand-700 min-w-[220px]">{d.conflictingTransactions}</td>
                  <td className="px-3 py-2 font-mono text-ink-700 min-w-[180px]">{d.authObjects}</td>
                  <td className="px-3 py-2 text-ink-700 min-w-[260px]">{d.businessImpact}</td>
                  <td className="px-3 py-2 text-ink-700 min-w-[180px]">{d.standardsViolated}</td>
                  <td className="px-3 py-2 align-top min-w-[360px]">
                    <button
                      type="button"
                      onClick={() => setExpandedRemediationRow(current => current === idx ? null : idx)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100 text-left"
                    >
                      <window.Icon name="chevron" className={`w-3 h-3 transition-transform ${expandedRemediationRow === idx ? 'rotate-90' : ''}`} />
                      <span>{d.recommendedAction}</span>
                    </button>
                    {expandedRemediationRow === idx && (
                      <div className="mt-2 w-full rounded-xl border border-brand-100 bg-brand-50/40 p-3 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="text-[10px] font-black uppercase tracking-wider text-brand-700">Remediation Plan</div>
                          <span className="font-mono text-[10px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded ring-1 ring-brand-100">{d.riskId}</span>
                        </div>
                        <ol className="list-decimal pl-4 space-y-1.5 text-[11px] font-semibold text-ink-700">
                          {getRemediationSteps(d).map((step, stepIdx) => (
                            <li key={`${user.userId}_${d.riskId}_step_${stepIdx}`}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 font-black text-ink-850">{d.priority}</td>
                  <td className="px-3 py-2"><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Active</span></td>
                  <td className="px-3 py-2 font-semibold text-ink-800">{d.assignee}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RiskUsersExpansion = ({ risk, users }) => {
  const [expandedRemediationRow, setExpandedRemediationRow] = useState(null);
  const affected = window.getUsersForRisk
    ? window.getUsersForRisk(risk, users)
    : (risk.affectedUsers || []).map(uid => users.find(u => u.userId === uid) || (window.MOCK.ALL_USERS || []).find(u => u.userId === uid)).filter(Boolean);
  return (
    <div className="p-4 border-t border-ink-100 text-left">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-ink-500">Affected Users</span>
        <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded-lg ring-1 ring-brand-100">{risk.riskId}</span>
        <span className="text-xs font-bold text-ink-700">{affected.length} users listed</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[1320px] text-xs">
          <thead className="bg-ink-50 text-[10px] uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-3 py-2 text-left">User ID</th>
              <th className="px-3 py-2 text-left">First Name</th>
              <th className="px-3 py-2 text-left">Last Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Standards Violated</th>
              <th className="px-3 py-2 text-left">Violation Count</th>
              <th className="px-3 py-2 text-left">T-Codes</th>
              <th className="px-3 py-2 text-left">Auth Objects</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Recommendation</th>
              <th className="px-3 py-2 text-left">Priority</th>
              <th className="px-3 py-2 text-left">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {affected.map((u, idx) => {
              const mappedRisk = getUserViolationDetails(u).find(item => item.riskId === risk.riskId) || risk;
              return (
                <tr key={`${risk.riskId}_${u.userId}`}>
                  <td className="px-3 py-2 font-mono font-bold text-ink-850">{u.userId}</td>
                  <td className="px-3 py-2 font-semibold">{u.firstName}</td>
                  <td className="px-3 py-2 font-semibold">{u.lastName}</td>
                  <td className="px-3 py-2 text-ink-600">{u.email}</td>
                  <td className="px-3 py-2">GRC Ruleset</td>
                  <td className="px-3 py-2 font-mono">{getViolationCount(u)}</td>
                  <td className="px-3 py-2 font-mono text-brand-700 min-w-[180px]">{mappedRisk.conflictingTransactions}</td>
                  <td className="px-3 py-2 font-mono text-ink-700 min-w-[160px]">{mappedRisk.authObjects}</td>
                  <td className="px-3 py-2"><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Active</span></td>
                  <td className="px-3 py-2 align-top min-w-[360px]">
                    <button
                      type="button"
                      onClick={() => setExpandedRemediationRow(current => current === idx ? null : idx)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100 text-left"
                    >
                      <window.Icon name="chevron" className={`w-3 h-3 transition-transform ${expandedRemediationRow === idx ? 'rotate-90' : ''}`} />
                      <span>{mappedRisk.recommendedAction || risk.recommendations}</span>
                    </button>
                    {expandedRemediationRow === idx && (
                      <div className="mt-2 w-full rounded-xl border border-brand-100 bg-brand-50/40 p-3 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="text-[10px] font-black uppercase tracking-wider text-brand-700">Remediation Plan</div>
                          <span className="font-mono text-[10px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded ring-1 ring-brand-100">{risk.riskId}</span>
                        </div>
                        <ol className="list-decimal pl-4 space-y-1.5 text-[11px] font-semibold text-ink-700">
                          {getRemediationSteps(mappedRisk).map((step, stepIdx) => (
                            <li key={`${u.userId}_step_${stepIdx}`}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 font-black text-ink-850">{mappedRisk.priority}</td>
                  <td className="px-3 py-2 font-semibold text-ink-800">{mappedRisk.assignee}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.LaunchPage = function({ 
  onNavigate, 
  selectedRun,
  userSodFilter,
  setUserSodFilter,
  riskSodFilter,
  setRiskSodFilter,
  preservedScrollY,
  setPreservedScrollY,
  setActiveModalRisk
}) {
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const runData = useMemo(() => {
    return window.getMockDataForRun(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007');
  }, [selectedRun]);

  const { users, risks, kpis } = runData;
  const { totalUsers, totalRoles, totalViolations, critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount, complianceScore, riskScore } = kpis;
  const totalRisks = risks.length;
  const runId = selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007';
  const runDate = selectedRun ? selectedRun.date : 'May 19, 2026';

  // Restore scroll position
  useEffect(() => {
    if (preservedScrollY > 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, preservedScrollY);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [preservedScrollY]);

  // Pre-filter data for the table based on active pills
  const filteredUsers = useMemo(() => {
    if (!userSodFilter || userSodFilter === 'All') return users;
    return users.filter(u => getSodStreamsForUser(u).includes(userSodFilter));
  }, [users, userSodFilter]);

  const filteredRisks = useMemo(() => {
    if (!riskSodFilter || riskSodFilter === 'All') return risks;
    return risks.filter(r => getSodStreamsForRisk(r).includes(riskSodFilter));
  }, [risks, riskSodFilter]);

  const getUserCountForStream = (streamKey) => {
    if (streamKey === 'All') return users.length;
    return users.filter(u => getSodStreamsForUser(u).includes(streamKey)).length;
  };

  const getRiskCountForStream = (streamKey) => {
    if (streamKey === 'All') return risks.length;
    return risks.filter(r => getSodStreamsForRisk(r).includes(streamKey)).length;
  };

  // Define column definitions for user registry
  const userColumns = useMemo(() => [
    { id: 'userId', label: 'User ID', accessor: u => u.userId, isMono: true, tooltip: 'Unique SAP User identifier' },
    { id: 'firstName', label: 'First Name', accessor: u => u.firstName, tooltip: 'SAP user first name' },
    { id: 'lastName', label: 'Last Name', accessor: u => u.lastName, tooltip: 'SAP user last name' },
    { id: 'email', label: 'Email', accessor: u => u.email, tooltip: 'SAP user email address' },
    { id: 'accountType', label: 'Account Type', accessor: u => u.accountType, tooltip: 'SAP account type from user master data' },
    { id: 'riskCount', label: 'Risk Count', accessor: getRiskCount, tooltip: 'Click to expand ruleset-derived risks for this user' },
    { id: 'violationCount', label: 'Violation Count', accessor: getViolationCount, tooltip: 'Number of active SoD risk violations mapped to this user' },
    { id: 'viewAction', label: 'View', accessor: u => 'View', tooltip: 'Navigate to user profile detail' }
  ], [risks]);

  // Define column definitions for risk catalog
  const riskColumns = useMemo(() => [
    { id: 'riskId', label: 'Risk ID', accessor: r => r.riskId, isMono: true, tooltip: 'Unique GRC Risk identifier' },
    { id: 'functionIds', label: 'Function IDs', accessor: r => Array.isArray(r.functionIds) ? r.functionIds.join(', ') : '', isMono: true, tooltip: 'Conflicting Function IDs from ruleset' },
    { id: 'title', label: 'Risk Name', accessor: r => r.title, tooltip: 'Name of the risk scenario' },
    { id: 'process', label: 'Business Process', accessor: r => r.process, tooltip: 'Business process flow classification' },
    { id: 'category', label: 'Risk Category', accessor: r => r.category, tooltip: 'GRC Risk category' },
    { id: 'riskScore', label: 'Risk Score', accessor: getRiskScore, tooltip: RISK_SCORE_TOOLTIP },
    { id: 'level', label: 'Severity', accessor: r => r.level, tooltip: 'Risk severity classification' },
    { id: 'grcMapping', label: 'Standards / Controls Violated', accessor: r => r.grcMapping, tooltip: 'Framework mapping' },
    { id: 'func', label: 'Conflicting Transactions', accessor: r => r.func, tooltip: 'Incompatible transaction set' },
    { 
      id: 'userCount', 
      label: 'Total Users', 
      accessor: r => r.userCount, 
      tooltip: 'Click to expand the affected users and recommendations for this rule'
    },
    { id: 'businessImpact', label: 'Business Impact', accessor: r => r.businessImpact, tooltip: 'Financial or regulatory impact detail' },
    { id: 'recommendations', label: 'Recommended Action', accessor: r => r.recommendations, tooltip: 'Standard mitigation instruction' },
    { id: 'assignee', label: 'Assignee', accessor: r => r.assignee, tooltip: 'Mitigation team lead' },
    { id: 'viewAction', label: 'View', accessor: r => 'View', tooltip: 'Navigate to risk details' }
  ], []);

  // Export handlers
  const handleExportExcel = (filteredData, orderedColumns) => {
    if (window.exportGrcExcel) {
      let exportUsers = filteredUsers;
      let exportRisks = filteredRisks;
      let userColSeq = null;
      let riskColSeq = null;

      if (filteredData && filteredData.length > 0) {
        if (filteredData[0].userId) {
          exportUsers = filteredData;
          userColSeq = orderedColumns;
        } else {
          exportRisks = filteredData;
          riskColSeq = orderedColumns;
        }
      }
      window.exportGrcExcel(runId, exportUsers, exportRisks, userColSeq, riskColSeq);
    } else {
      console.error('exportGrcExcel function is not loaded');
    }
  };

  const pctCrit = totalViolations > 0 ? ((criticalCount / totalViolations) * 100).toFixed(1) : '0.0';
  const pctHigh = totalViolations > 0 ? ((highCount / totalViolations) * 100).toFixed(1) : '0.0';
  const pctMed = totalViolations > 0 ? ((mediumCount / totalViolations) * 100).toFixed(1) : '0.0';
  const pctLow = totalViolations > 0 ? ((lowCount / totalViolations) * 100).toFixed(1) : '0.0';

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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: No. of Users Scanned */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-blue-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <window.Icon name="user" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">NO. OF USERS SCANNED</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalUsers}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            Total SAP users analyzed
          </div>
        </div>

        {/* Card 2: Total Violations */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-red-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-red-50 text-red-650 flex items-center justify-center">
              <window.Icon name="flame" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">TOTAL VIOLATIONS</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalViolations}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            Active identity conflicts
          </div>
        </div>

        {/* Card 3: Total Roles Scanned */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-amber-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <window.Icon name="shield" className="w-4 h-4" />
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

        {/* Card 4: Total Risks */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-purple-500 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <window.Icon name="shield" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">TOTAL RISKS</span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-bold leading-none text-ink-900 font-mono">{totalRisks}</span>
          </div>
          <div className="mt-2 text-xs text-ink-450 font-medium">
            Active SoD risk rules detected
          </div>
        </div>

        {/* Card 5: Risk Severity Classification */}
        <div className="bg-white rounded-xl shadow-card ring-1 ring-ink-200 overflow-hidden border-t-4 border-orange-500 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <window.Icon name="flame" className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">RISK SEVERITIES</span>
            </div>

            <div className="mt-3.5">
              <div className="h-2.5 w-full bg-ink-100 rounded-full overflow-hidden flex">
                <div className="bg-red-500 h-full" style={{ width: `${pctCrit}%` }} />
                <div className="bg-orange-500 h-full" style={{ width: `${pctHigh}%` }} />
                <div className="bg-yellow-500 h-full" style={{ width: `${pctMed}%` }} />
                <div className="bg-blue-500 h-full" style={{ width: `${pctLow}%` }} />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-2 text-[9px] font-bold text-ink-800">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>CRIT <b className="font-mono text-red-650">{pctCrit}%</b></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>HIGH <b className="font-mono text-orange-650">{pctHigh}%</b></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span>MED <b className="font-mono text-yellow-650">{pctMed}%</b></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>LOW <b className="font-mono text-blue-650">{pctLow}%</b></span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 text-xs text-ink-450 font-medium pt-1 border-t border-ink-100">
            By unmitigated violations
          </div>
        </div>
      </div>

      {/* Combined SoD Risk Distribution & Coverage Assessment */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-6 text-left">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-ink-100 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-ink-900 uppercase tracking-tight flex items-center gap-2">
              <span>Risk Distribution & Coverage Assessment</span>
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-mono font-bold rounded-full border border-purple-200">Executive Summary</span>
            </h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Unified severity distribution matrix and compliance coverage calculation.</p>
          </div>
          <button
            onClick={() => handleExportExcel(users)}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <window.Icon name="download" className="w-3.5 h-3.5" />
            <span>Export Analysis (Excel)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Risk Distribution Table */}
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
                  <th className="py-2.5 w-1/3">
                    <span className="flex items-center">
                      RISK DISTRIBUTION
                      <window.HeaderTooltip tip="Risk Coverage Score = ( 1 - WUR ÷ WDR ) × 100. Where WDR is Weighted Detected Risk and WUR is Weighted Unmitigated Risk based on critical, high, medium, and low severity weight parameters." />
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{pctCrit}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: `${pctCrit}%` }} />
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{pctHigh}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: `${pctHigh}%` }} />
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{pctMed}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${pctMed}%` }} />
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink-700 w-10 shrink-0">{pctLow}%</span>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${pctLow}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right text-blue-600 font-bold">Minimal Risk (P4)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: Risk Coverage Score */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-ink-150 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-ink-100 mb-4">
                <span className="text-xs font-bold text-ink-700 uppercase tracking-wider">Compliance Assessment</span>
                <span className="text-xs text-ink-550 font-mono font-bold">{totalViolations} total violations</span>
              </div>
              
              {/* Large Score Callout */}
              <div className="bg-slate-50 border border-ink-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-sm relative">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-500">Risk Coverage Score</span>
                  <button
                    onClick={() => setShowInfoPanel(o => !o)}
                    className="w-5 h-5 rounded-full bg-white border border-ink-200 hover:border-ink-300 shadow-sm flex items-center justify-center text-ink-500 hover:text-brand-600 transition-all focus:outline-none"
                    title="View calculation formula"
                  >
                    <window.Icon name="info" className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-4xl font-black text-ink-900 tracking-tight mt-1.5 font-mono">
                  {complianceScore}%
                </div>
                <div className="mt-2.5 px-3 py-1 bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Target Baseline: 95.0% - 98.0%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-ink-100 space-y-3">
              <span className="text-[11px] font-bold text-ink-700 uppercase tracking-wider block">Calculation Methodology</span>
              <div className="bg-white border border-ink-200 rounded-xl p-3 text-center shadow-sm">
                <code className="text-xs md:text-sm font-mono font-bold text-ink-900">
                  Risk Coverage Score = ( 1 - WUR ÷ WDR ) × 100
                </code>
              </div>
              <p className="text-[11px] text-ink-600 leading-relaxed font-medium">
                Where <b className="text-ink-900 font-bold">WDR</b> is Weighted Detected Risk and <b className="text-ink-900 font-bold">WUR</b> is Weighted Unmitigated Risk based on critical, high, medium, and low severity weight parameters.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic calculation details panel */}
        <window.RiskCoverageInfoPanel
          isOpen={showInfoPanel}
          onClose={() => setShowInfoPanel(false)}
        />
      </div>

      {/* Master User-wise Table */}
      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between border-b border-ink-200 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-ink-900">Master User-wise Compliance Registry</h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Comprehensive grid containing all violating user identities and unmitigated authorization check flags.</p>
          </div>
        </div>

        {/* Scrollable SoD Stream Pills Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
          {[
            { key: 'All', label: 'All Streams' },
            { key: 'SOD-03', label: 'Critical Risks' },
            { key: 'SOD-04', label: 'Immediate Actions' },
            { key: 'SOD-05', label: 'Compliance Impact' },
            { key: 'SOD-06', label: 'Super Administrators' },
            { key: 'SOD-07', label: 'Cross-Process Conflicts' },
            { key: 'SOD-08', label: 'Emergency Access' },
            { key: 'SOD-P2P', label: 'Procure-to-Pay' },
            { key: 'SOD-09', label: 'Order-to-Cash' },
            { key: 'SOD-10', label: 'Service Accounts' },
            { key: 'SOD-11', label: 'Remediation Plan' }
          ].map(s => {
            const isSelected = userSodFilter === s.key;
            const count = getUserCountForStream(s.key);
            return (
              <button
                key={s.key}
                onClick={() => setUserSodFilter(s.key)}
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

        {/* Interactive GRC Table */}
        <window.InteractiveGRCTable
          data={filteredUsers}
          columns={userColumns}
          pageSize={10}
          onRowClick={(row) => onNavigate('user-profile', row.userId)}
          exportLabel="Export Users (Excel)"
          onExport={handleExportExcel}
          getRowId={(row) => row.userId}
          expandColumnId="riskCount"
          renderExpandedRow={(row) => <UserViolationExpansion user={row} />}
        />
      </div>

      {/* Master Risk-wise Table */}
      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between border-b border-ink-200 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-ink-900">Master SoD Risks Ruleset Catalog</h3>
            <p className="text-xs text-ink-500 mt-0.5 font-semibold">Global definitions of Segregation of Duties checks, conflict pairs, and business impact parameters.</p>
          </div>
        </div>

        {/* Scrollable SoD Stream Pills Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
          {[
            { key: 'All', label: 'All Streams' },
            { key: 'SOD-03', label: 'Critical Risks' },
            { key: 'SOD-04', label: 'Immediate Actions' },
            { key: 'SOD-05', label: 'Compliance Impact' },
            { key: 'SOD-06', label: 'Super Administrators' },
            { key: 'SOD-07', label: 'Cross-Process Conflicts' },
            { key: 'SOD-08', label: 'Emergency Access' },
            { key: 'SOD-P2P', label: 'Procure-to-Pay' },
            { key: 'SOD-09', label: 'Order-to-Cash' },
            { key: 'SOD-10', label: 'Service Accounts' },
            { key: 'SOD-11', label: 'Remediation Plan' }
          ].map(s => {
            const isSelected = riskSodFilter === s.key;
            const count = getRiskCountForStream(s.key);
            return (
              <button
                key={s.key}
                onClick={() => setRiskSodFilter(s.key)}
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

        {/* Interactive GRC Table */}
        <window.InteractiveGRCTable
          data={filteredRisks}
          columns={riskColumns}
          pageSize={5}
          onRowClick={(row) => onNavigate('risk-detail', row.riskId)}
          exportLabel="Export Ruleset (Excel)"
          onExport={handleExportExcel}
          getRowId={(row) => row.riskId}
          expandColumnId="userCount"
          renderExpandedRow={(row) => <RiskUsersExpansion risk={row} users={users} />}
        />
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center border-t border-ink-200 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 animate-fade-in">
        KTern.AI SoD Auditor · v2.4 · Lotte Chemical Compliance Protocol
      </footer>

    </div>
  );
};

/* ─── Dedicated Page Components ─── */

const RiskUsersModal = function({ activeModalRisk, onClose, onNavigate }) {
  const modalUsers = React.useMemo(() => {
    if (!activeModalRisk || !activeModalRisk.affectedUsers) return [];
    return activeModalRisk.affectedUsers.map(uid => {
      const matched = (window.MOCK.ALL_USERS || []).find(u => u.userId === uid);
      if (matched) {
        return {
          userId: matched.userId,
          firstName: matched.firstName,
          lastName: matched.lastName,
          dept: matched.processArea || matched.dept || 'IT Basis',
          role: matched.role || 'ZFI_BR_GL_POSTING',
          severity: matched.severity || activeModalRisk.level
        };
      }
      const formattedName = uid.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const parts = formattedName.split(/\s+/).filter(Boolean);
      return {
        userId: uid,
        firstName: parts[0] || 'SAP',
        lastName: parts.slice(1).join(' ') || 'User',
        dept: uid.includes('FF') ? 'IT Basis' : 'Finance',
        role: 'ZFI_BR_GL_POSTING',
        severity: activeModalRisk.level
      };
    });
  }, [activeModalRisk]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden w-full max-w-4xl max-h-[85vh] flex flex-col z-10 border border-ink-150 animate-scale-in text-left">
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
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 hover:bg-ink-100 p-1.5 rounded-lg transition-colors focus:outline-none"
          >
            <window.Icon name="x" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="border border-ink-200 rounded-xl overflow-x-auto shadow-sm bg-white">
            <table className="w-full min-w-[760px] text-[12.5px] border-collapse">
              <thead className="bg-ink-50 text-ink-650 font-bold uppercase text-[10px] border-b border-ink-200">
                <tr>
                  <th className="px-4 py-2.5 text-left">User ID</th>
                  <th className="px-4 py-2.5 text-left">First Name</th>
                  <th className="px-4 py-2.5 text-left">Last Name</th>
                  <th className="px-4 py-2.5 text-left">Business Process</th>
                  <th className="px-4 py-2.5 text-left">Role / Access</th>
                  <th className="px-4 py-2.5 text-right w-28 min-w-[7rem]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 font-medium text-ink-800">
                {modalUsers.map(u => (
                  <tr key={u.userId} className="hover:bg-ink-50/40 transition-colors">
                    <td className="px-4 py-2.5 font-mono font-bold text-ink-900">{u.userId}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-850">{u.firstName}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-850">{u.lastName}</td>
                    <td className="px-4 py-2.5 text-ink-600">{u.dept}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-500 truncate max-w-[150px]" title={u.role}>{u.role}</td>
                    <td className="px-4 py-2.5 text-right w-28 min-w-[7rem] whitespace-nowrap">
                      <button 
                        onClick={() => {
                          onClose();
                          onNavigate('user-profile', u.userId);
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
                    <td colSpan={6} className="py-8 text-center text-ink-400 font-bold uppercase tracking-wider text-xs">
                      No violating users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-ink-100 bg-ink-50/30 flex items-center justify-between">
          <span className="text-xs font-bold text-ink-500">
            Total Violating Users: <span className="font-mono text-sm text-ink-950 font-black">{modalUsers.length}</span>
          </span>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-bold text-xs transition-colors shadow-sm focus:outline-none"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};

window.UserInventoryPage = function({ onNavigate, selectedRun }) {
  const [userSodFilter, setUserSodFilter] = useState('All');
  const runData = useMemo(() => {
    return window.getMockDataForRun(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007');
  }, [selectedRun]);
  const { users, risks } = runData;
  const filteredUsers = useMemo(() => {
    if (!userSodFilter || userSodFilter === 'All') return users;
    return users.filter(u => getSodStreamsForUser(u).includes(userSodFilter));
  }, [users, userSodFilter]);

  const userColumns = useMemo(() => [
    { id: 'userId', label: 'User ID', accessor: u => u.userId, isMono: true, tooltip: 'Unique SAP User identifier' },
    { id: 'firstName', label: 'First Name', accessor: u => u.firstName, tooltip: 'SAP user first name' },
    { id: 'lastName', label: 'Last Name', accessor: u => u.lastName, tooltip: 'SAP user last name' },
    { id: 'email', label: 'Email', accessor: u => u.email, tooltip: 'SAP user email address' },
    { id: 'accountType', label: 'Account Type', accessor: u => u.accountType, tooltip: 'SAP account type from user master data' },
    { id: 'riskCount', label: 'Risk Count', accessor: getRiskCount, tooltip: 'Click to expand ruleset-derived risks for this user' },
    { id: 'violationCount', label: 'Violation Count', accessor: getViolationCount, tooltip: 'Number of active SoD risk violations mapped to this user' },
    { id: 'viewAction', label: 'View', accessor: u => 'View', tooltip: 'Navigate to user profile' }
  ], [risks]);

  const handleExportExcel = () => {
    if (window.exportGrcExcel) {
      window.exportGrcExcel(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007', users, []);
    }
  };

  return (
    <div data-screen-label="User Inventory" className="space-y-6 px-4 md:px-7 py-6 text-left animate-fade-in">
      <window.DetailHeader
        code="CATALOG-USERS"
        title="SAP User Inventory"
        subtitle="Registry of all scanned user accounts, authorization roles, and active Segregation of Duties checks."
      />
      
      <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
        {[
          { key: 'All', label: 'All Streams' },
          { key: 'SOD-03', label: 'Critical Risks' },
          { key: 'SOD-04', label: 'Immediate Actions' },
          { key: 'SOD-05', label: 'Compliance Impact' },
          { key: 'SOD-06', label: 'Super Administrators' },
          { key: 'SOD-07', label: 'Cross-Process Conflicts' },
          { key: 'SOD-08', label: 'Emergency Access' },
          { key: 'SOD-P2P', label: 'Procure-to-Pay' },
          { key: 'SOD-09', label: 'Order-to-Cash' },
          { key: 'SOD-10', label: 'Service Accounts' },
          { key: 'SOD-11', label: 'Remediation Plan' }
        ].map(s => {
          const isSelected = userSodFilter === s.key;
          const count = users.filter(u => s.key === 'All' || getSodStreamsForUser(u).includes(s.key)).length;
          return (
            <button
              key={s.key}
              onClick={() => setUserSodFilter(s.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 snap-center ${
                isSelected ? 'bg-ink-900 border-ink-900 text-white shadow-sm ring-1 ring-ink-900' : 'bg-white border-ink-200 text-ink-650 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              <span>{s.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-ink-100 text-ink-600'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <window.InteractiveGRCTable
        data={filteredUsers}
        columns={userColumns}
        pageSize={15}
        onRowClick={(row) => onNavigate('user-profile', row.userId)}
        exportLabel="Export Users (Excel)"
        onExport={handleExportExcel}
        getRowId={(row) => row.userId}
        expandColumnId="riskCount"
        renderExpandedRow={(row) => <UserViolationExpansion user={row} />}
      />
    </div>
  );
};

window.RiskCatalogPage = function({ onNavigate, selectedRun }) {
  const [riskSodFilter, setRiskSodFilter] = useState('All');
  const runData = useMemo(() => {
    return window.getMockDataForRun(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007');
  }, [selectedRun]);
  const { users, risks } = runData;
  const filteredRisks = useMemo(() => {
    if (!riskSodFilter || riskSodFilter === 'All') return risks;
    return risks.filter(r => getSodStreamsForRisk(r).includes(riskSodFilter));
  }, [risks, riskSodFilter]);

  const riskColumns = useMemo(() => [
    { id: 'riskId', label: 'Risk ID', accessor: r => r.riskId, isMono: true, tooltip: 'Unique GRC Risk identifier' },
    { id: 'title', label: 'Risk Name', accessor: r => r.title, tooltip: 'Name of the risk scenario' },
    { id: 'process', label: 'Business Process', accessor: r => r.process, tooltip: 'Business process flow classification' },
    { id: 'category', label: 'Risk Category', accessor: r => r.category, tooltip: 'GRC Risk category' },
    { id: 'riskScore', label: 'Risk Score', accessor: getRiskScore, tooltip: RISK_SCORE_TOOLTIP },
    { id: 'level', label: 'Severity', accessor: r => r.level, tooltip: 'Risk severity classification' },
    { id: 'grcMapping', label: 'GRC Mapping', accessor: r => r.grcMapping, tooltip: 'Framework mapping' },
    { id: 'func', label: 'Conflicting Transactions', accessor: r => r.func, tooltip: 'Incompatible transaction set' },
    {
      id: 'userCount',
      label: 'Total Users',
      accessor: r => r.userCount,
      tooltip: 'Click to expand affected users and recommendations'
    },
    { id: 'viewAction', label: 'View', accessor: r => 'View', tooltip: 'Navigate to risk details' }
  ], []);

  const handleExportExcel = () => {
    if (window.exportGrcExcel) {
      window.exportGrcExcel(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007', [], risks);
    }
  };

  return (
    <div data-screen-label="Risk Catalog" className="space-y-6 px-4 md:px-7 py-6 text-left animate-fade-in">
      <window.DetailHeader
        code="CATALOG-RISKS"
        title="Master SoD Risks Ruleset Catalog"
        subtitle="Global definitions of Segregation of Duties checks, conflict pairs, and business impact parameters."
      />

      <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x whitespace-nowrap border-b border-ink-100">
        {[
          { key: 'All', label: 'All Streams' },
          { key: 'SOD-03', label: 'Critical Risks' },
          { key: 'SOD-04', label: 'Immediate Actions' },
          { key: 'SOD-05', label: 'Compliance Impact' },
          { key: 'SOD-06', label: 'Super Administrators' },
          { key: 'SOD-07', label: 'Cross-Process Conflicts' },
          { key: 'SOD-08', label: 'Emergency Access' },
          { key: 'SOD-P2P', label: 'Procure-to-Pay' },
          { key: 'SOD-09', label: 'Order-to-Cash' },
          { key: 'SOD-10', label: 'Service Accounts' },
          { key: 'SOD-11', label: 'Remediation Plan' }
        ].map(s => {
          const isSelected = riskSodFilter === s.key;
          const count = risks.filter(r => s.key === 'All' || getSodStreamsForRisk(r).includes(s.key)).length;
          return (
            <button
              key={s.key}
              onClick={() => setRiskSodFilter(s.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 snap-center ${
                isSelected ? 'bg-ink-900 border-ink-900 text-white shadow-sm ring-1 ring-ink-900' : 'bg-white border-ink-200 text-ink-650 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              <span>{s.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-ink-100 text-ink-600'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <window.InteractiveGRCTable
        data={filteredRisks}
        columns={riskColumns}
        pageSize={10}
        onRowClick={(row) => onNavigate('risk-detail', row.riskId)}
        exportLabel="Export Ruleset (Excel)"
        onExport={handleExportExcel}
        getRowId={(row) => row.riskId}
        expandColumnId="userCount"
        renderExpandedRow={(row) => <RiskUsersExpansion risk={row} users={users} />}
      />
    </div>
  );
};

window.ViolationExplorerPage = function({ onNavigate, selectedRun }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [processFilter, setProcessFilter] = useState('All');
  
  const runData = useMemo(() => {
    return window.getMockDataForRun(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007');
  }, [selectedRun]);
  const { users, risks } = runData;

  const filtered = useMemo(() => {
    return users.filter(u => {
      const riskRows = getUserViolationDetails(u);
      const riskSearchText = riskRows.map(r => `${r.riskId} ${r.scenario} ${r.businessProcess} ${(r.functionNames || []).join(' ')}`).join(' ').toLowerCase();
      const matchesSearch = 
        u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(u.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(u.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        riskSearchText.includes(searchTerm.toLowerCase()) ||
        String(u.role || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'All' || riskRows.some(r => r.severity === severityFilter);
      const matchesProcess = processFilter === 'All' || riskRows.some(r => r.businessProcess === processFilter || r.riskCategory === processFilter);
      
      return matchesSearch && matchesSeverity && matchesProcess;
    });
  }, [users, searchTerm, severityFilter, processFilter]);

  const columns = useMemo(() => [
    { id: 'userId', label: 'User ID', accessor: u => u.userId, isMono: true, tooltip: 'SAP user ID' },
    { id: 'firstName', label: 'First Name', accessor: u => u.firstName, tooltip: 'SAP user first name' },
    { id: 'lastName', label: 'Last Name', accessor: u => u.lastName, tooltip: 'SAP user last name' },
    { id: 'email', label: 'Email', accessor: u => u.email, tooltip: 'SAP user email address' },
    { id: 'accountType', label: 'Account Type', accessor: u => u.accountType, tooltip: 'SAP account type from user master data' },
    { id: 'riskCount', label: 'Risk Count', accessor: getRiskCount, tooltip: 'Click to expand ruleset-derived risks for this user' },
    { id: 'violationCount', label: 'Violation Count', accessor: getViolationCount, tooltip: 'Number of active SoD risk violations mapped to this user' },
    { id: 'viewAction', label: 'View', accessor: u => 'View', tooltip: 'Navigate to user profile' }
  ], [risks]);

  const handleExportExcel = () => {
    if (window.exportGrcExcel) {
      window.exportGrcExcel(selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007', users, []);
    }
  };

  return (
    <div data-screen-label="Violation Explorer" className="space-y-6 px-4 md:px-7 py-6 text-left animate-fade-in">
      <window.DetailHeader
        code="VIOLATION-EXPLORER"
        title="SoD Violation Explorer"
        subtitle="Forensic audit workbench to search, filter, and inspect all active conflicts and transaction overlaps across the SAP landscape."
      />

      <window.FilterBar onClear={() => { setSearchTerm(''); setSeverityFilter('All'); setProcessFilter('All'); }} hasFilters={!!(searchTerm || severityFilter !== 'All' || processFilter !== 'All')}>
        <window.SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search by User, Role, Risk..." />
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50">
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={processFilter} onChange={e => setProcessFilter(e.target.value)} className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50">
          <option value="All">All Business Areas</option>
          <option value="Finance">Finance</option>
          <option value="Procure to Pay">Procure to Pay</option>
          <option value="Order to Cash">Order to Cash</option>
          <option value="Basis">Basis</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </window.FilterBar>

      <window.InteractiveGRCTable
        data={filtered}
        columns={columns}
        pageSize={15}
        onRowClick={(row) => onNavigate('user-profile', row.userId)}
        exportLabel="Export Violations (Excel)"
        onExport={handleExportExcel}
        getRowId={(row) => row.userId}
        expandColumnId="riskCount"
        renderExpandedRow={(row) => <UserViolationExpansion user={row} />}
      />
    </div>
  );
};
