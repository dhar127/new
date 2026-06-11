const { useState, useMemo } = React;

const ALL_RISKS = [
  {
    riskId: 'V-1042',
    title: 'Create Vendor + Approve Payment',
    status: 'Active',
    level: 'Critical',
    category: 'Financial',
    process: 'Procurement',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_VENDOR_MAINT, F_PAY_APPROVE',
    funcDesc: 'Maintain vendor accounts paired with automatic payment execution',
    funcStatus: 'Enabled',
    userCount: 3,
    affectedUsers: ['USR-1087', 'USR-1023', 'SBRYAN'],
    group: 'P2P Control Pool',
    recommendations: 'Separate vendor master edit roles from F110 execution profiles',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZMM_BR_VENDOR_CREATE', 'ZFI_BR_AP_PAYMENT'],
    tcodes: ['FK01', 'F110'],
    businessImpact: 'High potential for unauthorized supplier onboarding and payment release without independent audit trail.',
    complianceImpact: 'SOX §404 deficiency; K-SOX compliance breach.',
    grcMapping: 'GRC Ruleset ID P2P_SOD_002',
    auditNotes: 'Identified during periodic Q2 assessment. Compensating controls (daily payment log audits) are currently inactive.'
  },
  {
    riskId: 'V-1058',
    title: 'Full OTC Cycle Control',
    status: 'Active',
    level: 'Critical',
    category: 'Financial',
    process: 'OTC',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_SALES_ORDER, F_CUST_BILL, F_PAY_COLLECT',
    funcDesc: 'End-to-end sales processing, customer billing, and payment clearing',
    funcStatus: 'Enabled',
    userCount: 5,
    affectedUsers: ['HOANG.NGUYEN', 'JAE.KANG', 'PVALENCIA', 'RUTGER.DUKES', 'WBERRYMAN'],
    group: 'OTC Control Pool',
    recommendations: 'Redesign role ZSD_BR_BILLING_CREATE to remove sales order release or ledger clearing rights',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZSD_BR_SO_CREATE', 'ZSD_BR_BILLING_CREATE', 'ZFI_BR_AR_CLEAR'],
    tcodes: ['VA01', 'VF01', 'F-28'],
    businessImpact: 'A single individual can issue sales orders, invoice the customer, and clear payments, facilitating direct revenue leakage.',
    complianceImpact: 'Critical SOX §302 and §404 audit threat.',
    grcMapping: 'GRC Ruleset ID OTC_SOD_011',
    auditNotes: 'Direct table update and clearing authorization issues detected for user profiles.'
  },
  {
    riskId: 'V-1063',
    title: 'GL Posting + Bank Reconciliation',
    status: 'Active',
    level: 'Critical',
    category: 'Financial',
    process: 'Finance',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_GL_POST, F_BANK_RECON',
    funcDesc: 'Manual general ledger posting combined with bank statement processing',
    funcStatus: 'Enabled',
    userCount: 4,
    affectedUsers: ['USR-1103', 'USR-1034', 'USR-1082', 'JAE.KANG'],
    group: 'Finance Control Pool',
    recommendations: 'Restrict manual general ledger posting ZFI_BR_GL_POSTING from bank statement reconcilers',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZFI_BR_GL_POSTING', 'ZFI_BR_BANK_RECON'],
    tcodes: ['FB50', 'FF67'],
    businessImpact: 'Allows manual journal adjustments to mask discrepancies in bank reconciliations.',
    complianceImpact: 'Material control weakness under COSO framework.',
    grcMapping: 'GRC Ruleset ID FI_SOD_005',
    auditNotes: 'Internal audit noted three manual journal postings by bank reconcilers without supervisor signature.'
  },
  {
    riskId: 'V-1071',
    title: 'PFCG Role-Admin + Transaction Access',
    status: 'Active',
    level: 'Critical',
    category: 'Operational',
    process: 'IT',
    type: 'Privileged Access',
    ruleset: 'System Security Ruleset',
    func: 'F_ROLE_MAINT, F_BUSINESS_TX',
    funcDesc: 'Maintain user roles and hold operational posting transactions',
    funcStatus: 'Enabled',
    userCount: 5,
    affectedUsers: ['FF.IT', 'JSONNIER', 'SBRYAN', 'SUNIL.SAHAI', 'VRADHAKRISHN'],
    group: 'Basis Control Pool',
    recommendations: 'Revoke PFCG role maintenance profiles from business operations users',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZBC_BR_SYSTEM_ADMIN', 'ZFI_BR_AP_INVOICE'],
    tcodes: ['PFCG', 'MIRO'],
    businessImpact: 'Enables users to assign themselves or others additional authorizations to bypass security filters.',
    complianceImpact: 'Severe IT General Control (ITGC) failure.',
    grcMapping: 'GRC Ruleset ID SEC_SOD_001',
    auditNotes: 'Must restrict access to PFCG and SU01 profiles to SAP Basis Team exclusively.'
  },
  {
    riskId: 'V-1090',
    title: 'Firefighter ID Active >180 Days',
    status: 'Review',
    level: 'High',
    category: 'Regulatory',
    process: 'IT',
    type: 'Critical Access',
    ruleset: 'IAM Security Ruleset',
    func: 'F_FIREFIGHT_USAGE',
    funcDesc: 'Access to Firefighter emergency ID profile without periodic re-attestation',
    funcStatus: 'Pending',
    userCount: 13,
    affectedUsers: ['FF.BASIS', 'FF.EWM', 'FF.FI', 'FF.IT', 'FF.PM', 'FF.SD', 'JEFF.DOZART'],
    group: 'Emergency Access Pool',
    recommendations: 'Enforce firefighter ID expiry parameters; force 30-day max assignment',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZBC_BR_SYSTEM_ADMIN'],
    tcodes: ['/GRCPI/GRIA_FFLOG'],
    businessImpact: 'Prolonged emergency access permissions increase the systems attack surface and compromise accountability.',
    complianceImpact: 'Breach of ISO 27001 Access Management policies.',
    grcMapping: 'GRC Ruleset ID FF_LIFE_003',
    auditNotes: 'Overdue firefighter authorizations require immediate de-provisioning.'
  },
  {
    riskId: 'V-1094',
    title: 'PO Create + PO Release Over-Limit',
    status: 'Active',
    level: 'High',
    category: 'Operational',
    process: 'Procurement',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_PO_CREATE, F_PO_RELEASE',
    funcDesc: 'Purchase order creation paired with approval authorization exceeding grade limits',
    funcStatus: 'Enabled',
    userCount: 1,
    affectedUsers: ['SBRYAN'],
    group: 'P2P Control Pool',
    recommendations: 'Redesign ZPM_BR_PROCUREMENT_1720 release strategy parameters',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZMM_BR_PO_CREATE', 'ZMM_BR_PO_RELEASE'],
    tcodes: ['ME21N', 'ME29N'],
    businessImpact: 'A single buyer can create and approve their own purchase order, leading to uncontrolled expenditure.',
    complianceImpact: 'Direct procurement policy audit infraction.',
    grcMapping: 'GRC Ruleset ID P2P_SOD_015',
    auditNotes: 'Buyer assigned to release strategy class with limit codes above grade level.'
  },
  {
    riskId: 'V-1101',
    title: 'F110 Auto-Payment Run by Non-Treasury',
    status: 'Active',
    level: 'High',
    category: 'Financial',
    process: 'Finance',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_PAY_EXECUTION',
    funcDesc: 'Run automatic payment programs for vendor invoices',
    funcStatus: 'Enabled',
    userCount: 5,
    affectedUsers: ['FF.FI', 'FF.IT', 'FF.IT02', 'FF.TEMP', 'SBRYAN'],
    group: 'Treasury Control Pool',
    recommendations: 'Restrict F110 transaction access to Treasury role pool',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZFI_BR_AP_PAYMENT', 'ZFI_BR_TREASURY'],
    tcodes: ['F110'],
    businessImpact: 'Unsegregated automatic payment executions can result in unauthorized cash disbursements.',
    complianceImpact: 'SOX Treasury control failure.',
    grcMapping: 'GRC Ruleset ID FI_SOD_019',
    auditNotes: 'Access must be restricted immediately to prevent financial exposure.'
  },
  {
    riskId: 'V-1124',
    title: 'Technical Account Holds SAP_ALL',
    status: 'Active',
    level: 'Critical',
    category: 'Operational',
    process: 'IT',
    type: 'Privileged Access',
    ruleset: 'System Security Ruleset',
    func: 'F_SUPER_SYSTEM',
    funcDesc: 'Technical service or batch account holding unrestricted profile',
    funcStatus: 'Enabled',
    userCount: 8,
    affectedUsers: ['BATCH_USER', 'DDIC', 'KTERN_SERVIC', 'RFCUSER', 'SAPSUPPORT'],
    group: 'Basis Control Pool',
    recommendations: 'Replace SAP_ALL profiles on technical connections with scoped roles',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['SAP_ALL', 'SAP_NEW'],
    tcodes: ['*'],
    businessImpact: 'Technical background accounts carrying SAP_ALL present severe entry-point risks if credential compromise occurs.',
    complianceImpact: 'ITGC database access violation.',
    grcMapping: 'GRC Ruleset ID SEC_SOD_009',
    auditNotes: 'Batch and RFC accounts require immediate profile review and scoped role assignment.'
  },
  {
    riskId: 'V-1131',
    title: 'Goods Receipt + Invoice Verification',
    status: 'Active',
    level: 'Medium',
    category: 'Financial',
    process: 'Procurement',
    type: 'SoD Conflict',
    ruleset: 'SAP GRC Global Matrix v4.2',
    func: 'F_GOODS_RECEIPT, F_INVOICE_VERIFY',
    funcDesc: 'Record goods receipts paired with posting vendor logistics invoices',
    funcStatus: 'Enabled',
    userCount: 9,
    affectedUsers: ['EELLIOTT', 'HCLEMENT', 'HOANG.NGUYEN', 'JAE.KANG', 'SBORDELON', 'SBRYAN'],
    group: 'P2P Control Pool',
    recommendations: 'Enforce three-way match checks in MIRO configuration',
    lastRun: 'LCSOD-2026-Q2-007',
    lastDetected: 'May 19, 2026',
    roles: ['ZMM_BR_GR_AUTO', 'ZFI_BR_AP_INVOICE'],
    tcodes: ['MIGO', 'MIRO'],
    businessImpact: 'A clerk can record receiving fictitious goods and approve the invoice, enabling disbursement fraud.',
    complianceImpact: 'Operational internal control gap.',
    grcMapping: 'GRC Ruleset ID P2P_SOD_024',
    auditNotes: 'Recommendation logged to force automated invoice blocking when receipt quantities mismatch.'
  }
];

window.RisksPage = function({ onNavigate, globalFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processFilter, setProcessFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [sort, setSort] = useState({ key: 'riskId', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expandedRisks, setExpandedRisks] = useState(new Set());
  
  const pageSize = 10;

  const toggleRiskExpanded = (riskId) => {
    setExpandedRisks(prev => {
      const next = new Set(prev);
      if (next.has(riskId)) next.delete(riskId);
      else next.add(riskId);
      return next;
    });
  };

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      dir: prev.key === key ? (prev.dir === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  const processes = useMemo(() => {
    return Array.from(new Set(ALL_RISKS.map(r => r.process))).sort();
  }, []);

  const filteredRisks = useMemo(() => {
    return ALL_RISKS.filter(r => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = r.riskId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.process.toLowerCase().includes(q) ||
        r.ruleset.toLowerCase().includes(q);

      const matchesProcess = !processFilter || r.process === processFilter;
      const matchesLevel = !levelFilter || r.level === levelFilter;

      // Global filters synchronization
      let matchesGlobal = true;
      if (globalFilters) {
        if (globalFilters.severity && globalFilters.severity !== 'All') {
          matchesGlobal = r.level.toLowerCase() === globalFilters.severity.toLowerCase();
        }
        if (globalFilters.process && globalFilters.process !== 'All') {
          matchesGlobal = matchesGlobal && r.process.toLowerCase() === globalFilters.process.toLowerCase();
        }
      }

      return matchesSearch && matchesProcess && matchesLevel && matchesGlobal;
    }).sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      const key = sort.key;
      
      if (key === 'userCount') {
        return (a.userCount - b.userCount) * dir;
      }
      return String(a[key]).localeCompare(String(b[key])) * dir;
    });
  }, [searchTerm, processFilter, levelFilter, sort, globalFilters]);

  const pagedRisks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRisks.slice(start, start + pageSize);
  }, [filteredRisks, page]);

  return (
    <div data-screen-label="Risks Inventory" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="GRC · Risk Ruleset"
        title="Material SoD Risk Catalog"
        subtitle="Master registry of Segregation of Duties (SoD) risks, authorization overlaps, and transaction pairings enforced in KTern rules engines."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <window.StatCard label="Total Risks Defined" value={ALL_RISKS.length} icon="shield" metricKey="totalViolations" />
        <window.StatCard severity="Critical" label="Critical Severity Risks" value={ALL_RISKS.filter(r => r.level === 'Critical').length} metricKey="criticalViolations" />
        <window.StatCard severity="High" label="High Severity Risks" value={ALL_RISKS.filter(r => r.level === 'High').length} metricKey="highViolations" />
        <window.StatCard severity="Medium" label="Medium Severity Risks" value={ALL_RISKS.filter(r => r.level === 'Medium').length} metricKey="mediumViolations" />
      </div>

      {/* Filter Bar */}
      <window.FilterBar onClear={() => { setSearchTerm(''); setProcessFilter(''); setLevelFilter(''); }} hasFilters={!!(searchTerm || processFilter || levelFilter)}>
        <window.Select
          value={processFilter}
          onChange={val => { setProcessFilter(val); setPage(1); }}
          options={processes}
          placeholder="All Processes"
        />
        <window.Select
          value={levelFilter}
          onChange={val => { setLevelFilter(val); setPage(1); }}
          options={['Critical', 'High', 'Medium']}
          placeholder="All Risk Levels"
        />
        <window.SearchInput
          value={searchTerm}
          onChange={val => { setSearchTerm(val); setPage(1); }}
          placeholder="Search by ID, title, ruleset..."
        />
        <span className="ml-auto text-[11px] text-ink-400 font-semibold uppercase tracking-wider">
          {filteredRisks.length} risk{filteredRisks.length !== 1 ? 's' : ''} found
        </span>
      </window.FilterBar>

      {/* Risk Table */}
      <window.Section
        title="SoD Risks Master List"
        subtitle="Click a row to expand risk descriptions, conflicting transaction code lists, affected users, and audit notes."
        action={<window.ExportButton label="Export Ruleset" size="sm" />}
      >
        <div className="overflow-auto max-h-[500px]">
          <table className="w-full text-[13px] table-fixed">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-ink-200">
                <th className="w-10 px-4 py-3 text-left"></th>
                <window.Th sortKey="riskId" sort={sort} onSort={handleSort} className="w-32">Risk ID</window.Th>
                <window.Th sortKey="title" sort={sort} onSort={handleSort} className="w-64">Risk Title</window.Th>
                <window.Th sortKey="level" sort={sort} onSort={handleSort} className="w-28">Risk Level</window.Th>
                <window.Th sortKey="category" sort={sort} onSort={handleSort} className="w-32">Category</window.Th>
                <window.Th sortKey="process" sort={sort} onSort={handleSort} className="w-36">Business Process</window.Th>
                <window.Th sortKey="ruleset" sort={sort} onSort={handleSort} className="w-56">Active Rule Set</window.Th>
                <window.Th sortKey="userCount" sort={sort} onSort={handleSort} align="right" className="w-28">Affected Users</window.Th>
                <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {pagedRisks.map(risk => {
                const isExpanded = expandedRisks.has(risk.riskId);
                return (
                  <React.Fragment key={risk.riskId}>
                    <tr 
                      className={`row-hover cursor-pointer align-middle ${isExpanded ? 'bg-ink-50/40' : ''}`}
                      onClick={() => toggleRiskExpanded(risk.riskId)}
                    >
                      <td className="px-4 py-3 text-center">
                        <window.Icon 
                          name="chevron" 
                          className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        />
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-ink-900">
                        {risk.riskId}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink-850 truncate">
                        {risk.title}
                      </td>
                      <td className="px-4 py-3">
                        <window.SeverityBadge value={risk.level} />
                      </td>
                      <td className="px-4 py-3 font-medium text-ink-600 uppercase text-[10px]">
                        {risk.category}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink-700">
                        {risk.process}
                      </td>
                      <td className="px-4 py-3 text-ink-500 truncate text-xs">
                        {risk.ruleset}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-ink-700">
                        {risk.userCount}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => onNavigate('risk-detail', risk.riskId)}
                          className="px-2.5 py-1 rounded bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold text-[11px] transition-colors whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-ink-50/25">
                        <td colSpan={9} className="px-8 py-5 border-b border-ink-150">
                          <RiskExpansionPanel risk={risk} onNavigate={onNavigate} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {pagedRisks.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                    No risks found matching criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <window.Pagination
          page={page}
          pageSize={pageSize}
          total={filteredRisks.length}
          onPage={setPage}
        />
      </window.Section>
    </div>
  );
};

/* ── Risk Row Expansion Panel Component ────────────────────── */
function RiskExpansionPanel({ risk, onNavigate }) {
  return (
    <div className="grid grid-cols-12 gap-6 pl-4 border-l-4 border-rose-500">
      
      {/* Col 1: Business and Compliance Impact */}
      <div className="col-span-12 md:col-span-5 space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Business Impact</span>
          <p className="text-[12.5px] text-ink-700 leading-relaxed font-medium">{risk.businessImpact}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compliance & Regulatory Impact</span>
          <p className="text-[12.5px] text-ink-700 leading-relaxed font-semibold text-rose-700">{risk.complianceImpact}</p>
        </div>
      </div>

      {/* Col 2: Conflicting Functions & Mappings */}
      <div className="col-span-12 md:col-span-4 space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">Conflicting Roles & T-Codes</span>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[9.5px] font-bold text-ink-500 uppercase mr-1">T-Codes:</span>
              {risk.tcodes.map(tc => <window.TCode key={tc} code={tc} />)}
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[9.5px] font-bold text-ink-500 uppercase mr-1">SAP Roles:</span>
              {risk.roles.map(r => <window.Role key={r} role={r} />)}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-ink-100">
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">SAP GRC Mapping</span>
          <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded border border-brand-200">
            {risk.grcMapping}
          </span>
        </div>
      </div>

      {/* Col 3: Affected Users & Actions */}
      <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-xl border border-ink-150 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">
            Affected Users ({risk.userCount})
          </span>
          <div className="flex flex-wrap gap-1 mb-3">
            {risk.affectedUsers.map(user => (
              <button
                key={user}
                onClick={() => onNavigate('user-profile', user)}
                className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-ink-50 text-ink-800 border border-ink-200 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 transition-all shadow-sm"
              >
                {user}
              </button>
            ))}
            {risk.userCount > risk.affectedUsers.length && (
              <span className="text-[10px] font-bold text-ink-400 px-1 py-0.5">
                +{risk.userCount - risk.affectedUsers.length} more
              </span>
            )}
          </div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compensating Recommendations</span>
          <p className="text-[11.5px] text-ink-600 leading-snug">{risk.recommendations}</p>
        </div>
        <div className="pt-4 border-t border-ink-100 flex gap-2">
          <button
            onClick={() => onNavigate('risk-detail', risk.riskId)}
            className="flex-1 text-center py-1.5 rounded bg-ink-900 text-white hover:bg-ink-800 font-bold text-[11px] transition-colors"
          >
            Detailed Risk Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
