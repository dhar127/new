const { useState, useMemo } = React;

/* ──────────────────────────────────────────────────────────── */
/* VIOLATION DETAIL PAGE                                        */
/* ──────────────────────────────────────────────────────────── */
window.ViolationDetailPage = function({ violationId, onNavigate }) {
  const { CRITICAL_FINDINGS, IMMEDIATE_ACTIONS } = window.MOCK;

  const finding = useMemo(() => {
    return CRITICAL_FINDINGS.find(f => f.id === violationId) || 
           IMMEDIATE_ACTIONS.find(a => a.id === violationId || a.user === violationId) ||
           {
             id: violationId,
             desc: 'Full OTC cycle control (Order → Bill → Collect) by single user in PRD',
             severity: 'Critical',
             area: 'OTC',
             action: 'Split SD billing authority — redesign role ZSD_BR_BILLING_CREATE',
             user: 'HOANG.NGUYEN',
             risk: 'Unmitigated dual custody violation across critical transactions'
           };
  }, [violationId, CRITICAL_FINDINGS, IMMEDIATE_ACTIONS]);

  const user = finding.user || (finding.affectedUsersList && finding.affectedUsersList[0]?.userId) || 'HOANG.NGUYEN';
  const userName = finding.affectedUsersList && finding.affectedUsersList[0]?.name || 'Hoang Nguyen';

  const details = {
    roles: ['ZSD_BR_SO_CREATE', 'ZSD_BR_BILLING_CREATE'],
    authObjects: ['S_TCODE', 'S_DEVELOP', 'S_TABU_DIS', 'S_TABU_CLI'],
    tcodes: ['VA01', 'VF01', 'F-28'],
    explanation: 'User holds transaction codes across the order creation, invoicing, and collection stages. This violates the standard Segregation of Duties policy for revenue cycles by enabling a single identity to process sales and ledger settlements.',
    reasonFlagged: 'Scanned authorization profiles contain transaction access mapping directly to conflict code OTC_SOD_011 (VA01 × VF01 × F-28).',
    complianceImpact: 'SOX §404 Control 12 (Segregation of Duties in Revenue Cycle); K-SOX compliance audit failure.',
    auditNotes: 'Risk identified on May 19, 2026. No active mitigating controls or compensating supervisor reviews are documented for this account profile.'
  };

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs text-ink-500 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-600 transition-colors">Dashboard</button>
          <span>/</span>
          <span className="text-ink-900 font-bold">Violation {finding.id}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('home')} 
            className="px-3 py-1.5 rounded-lg bg-white ring-1 ring-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 transition-all flex items-center gap-1.5"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <window.DetailHeader
        code={`SOD VIOLATION · ${finding.area}`}
        title={`Violation Details: ${finding.id}`}
        subtitle="Full forensic audit details for flagged Segregation of Duties conflicts, including active roles, transaction codes, and remediation advice."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Core Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <window.Section title="Forensic Violation Blueprint">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Violation Description</span>
                <p className="text-sm font-bold text-ink-900 leading-snug">{finding.desc}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-ink-100">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">Area</span>
                  <span className="font-bold text-[11px] uppercase tracking-wide bg-ink-50 text-ink-700 ring-1 ring-ink-200 px-2 py-0.5 rounded">
                    {finding.area}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">Severity</span>
                  <window.SeverityBadge value={finding.severity || 'Critical'} />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">SAP GRC Mapping</span>
                  <span className="font-mono text-[10px] font-semibold text-brand-600 block">GRC_SOD_011</span>
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Contributing Roles & Authorization Scope">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Roles Contributing to Conflict</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.roles.map(r => (
                    <div key={r} className="bg-white border border-ink-200 rounded-lg p-3 flex items-start gap-2.5 shadow-sm">
                      <window.Icon name="file" className="w-4 h-4 text-brand-500 mt-0.5" />
                      <div>
                        <button 
                          onClick={() => onNavigate('role-detail', r)}
                          className="font-mono text-xs font-bold text-brand-700 hover:underline"
                        >
                          {r}
                        </button>
                        <p className="text-[10px] text-ink-400 mt-0.5">Assigned profile containing conflicting T-codes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Conflicting Transactions Executed</span>
                <div className="flex flex-wrap gap-2">
                  {details.tcodes.map(tc => (
                    <window.TCode key={tc} code={tc} size="md" />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Authorization Objects Checked</span>
                <div className="flex flex-wrap gap-1.5">
                  {details.authObjects.map(obj => (
                    <span key={obj} className="font-mono text-[10px] bg-ink-100 text-ink-700 ring-1 ring-ink-200 px-2 py-0.5 rounded font-semibold">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Risk Analysis & Audit Narrative">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Risk Explanation</span>
                <p className="text-xs font-medium text-ink-700 leading-relaxed">{details.explanation}</p>
              </div>
              <div className="pt-3 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Reason Flagged</span>
                <p className="text-xs font-semibold text-rose-700 leading-relaxed">{details.reasonFlagged}</p>
              </div>
              <div className="pt-3 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Regulatory & Compliance Impact</span>
                <p className="text-xs font-semibold text-ink-800 leading-relaxed">{details.complianceImpact}</p>
              </div>
            </div>
          </window.Section>
        </div>

        {/* Right Col: Affected User & Actions */}
        <div className="space-y-6">
          <window.Section title="Affected Identity Profile">
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center">
                  {user.slice(0,2)}
                </div>
                <div>
                  <button 
                    onClick={() => onNavigate('user-profile', user)}
                    className="font-mono font-bold text-ink-900 hover:text-brand-600 transition-colors text-sm hover:underline"
                  >
                    {user}
                  </button>
                  <p className="text-[11px] font-semibold text-ink-500">{userName}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-ink-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-ink-450">Department:</span>
                  <span className="font-bold text-ink-800">Finance Operations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-450">Run Scope:</span>
                  <span className="font-bold text-ink-800">LCKR-PRD-01 (Active)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-450">Assigned Roles:</span>
                  <span className="font-bold text-ink-800 font-mono">148 Roles</span>
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Remediation Plan">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Governance Recommendation</span>
                <p className="text-xs font-semibold text-ink-800 leading-relaxed bg-amber-50 border border-amber-200 rounded p-2.5">
                  {finding.action || 'Split SD billing authority — redesign role ZSD_BR_BILLING_CREATE'}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Business Risk Estimate</span>
                <p className="text-xs font-bold text-rose-700">{finding.risk || 'System security threat'}</p>
              </div>
              <div className="pt-3 border-t border-ink-100 space-y-2">
                <button
                  onClick={() => alert(`Generating PDF audit report for ${finding.id}...`)}
                  className="w-full text-center py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <window.Icon name="download" className="w-3.5 h-3.5" />
                  Export PDF Report
                </button>
                <button
                  onClick={() => onNavigate('user-profile', user)}
                  className="w-full text-center py-2 rounded-lg border border-ink-300 text-ink-700 hover:bg-ink-50 font-bold text-xs transition-colors"
                >
                  Inspect User Profile
                </button>
              </div>
            </div>
          </window.Section>


        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────── */
/* USER PROFILE / DETAIL PAGE                                   */
/* ──────────────────────────────────────────────────────────── */
window.UserProfilePage = function({ userId, onNavigate }) {
  const user = useMemo(() => {
    // Generate a default profile if user not found in pre-seeded lists
    const nameFormatted = userId.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      userId,
      fullName: nameFormatted,
      dept: userId.includes('FF') ? 'IT Basis' : 'Finance',
      role: userId.includes('FF') ? 'SAP Security Specialist' : 'Senior Analyst',
      licenseType: userId.includes('FF') ? 'Professional' : 'Limited Professional',
      lastLogin: '2026-05-19 14:10',
      criticalCount: userId.includes('HOANG') ? 8 : userId.includes('FF') ? 12 : 3,
      highCount: userId.includes('HOANG') ? 12 : userId.includes('FF') ? 15 : 4,
      mediumCount: 2,
      lowCount: 0,
      roles: ['ZFI_BR_GL_POSTING', 'ZFI_BR_AP_INVOICE', 'ZMM_BR_PO_CREATE', 'ZBC_BR_SYSTEM_ADMIN'],
      tcodes: ['FB50', 'MIRO', 'ME21N', 'SU01', 'PFCG'],
      action: 'Separate conflicting billing and invoice receipt roles immediately.',
      violations: [
        { id: 'V-1058', desc: 'Full OTC cycle control (Order → Bill → Collect) by single user', severity: 'Critical' },
        { id: 'V-1101', desc: 'F110 Auto-Payment Run runnable by non-treasury users', severity: 'High' }
      ]
    };
  }, [userId]);

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">
      
      {/* Navigation Headers */}
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs text-ink-500 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-600 transition-colors">Dashboard</button>
          <span>/</span>
          <button onClick={() => onNavigate('users')} className="hover:text-brand-600 transition-colors">Users</button>
          <span>/</span>
          <span className="text-ink-900 font-bold">{user.userId} Profile</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('users')}
            className="px-3 py-1.5 rounded-lg bg-white ring-1 ring-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 transition-all"
          >
            ← Back to Users
          </button>
        </div>
      </div>

      {/* User Branding Card */}
      <div className="rounded-2xl bg-[#0B0F19] text-white p-6 shadow-xl flex flex-wrap items-center justify-between gap-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xl ring-4 ring-white/10">
            {user.userId.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.fullName}</h1>
            <div className="text-xs text-white/50 font-mono mt-0.5">{user.userId}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-white/70">
              <span>Dept: <b>{user.dept}</b></span>
              <span>Role Title: <b>{user.role}</b></span>
              <span>License: <b>{user.licenseType}</b></span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">Last System Sync</div>
          <div className="font-mono text-sm font-bold text-white/80">{user.lastLogin}</div>
          <button
            onClick={() => alert(`Exporting master audit logs for user ${user.userId}...`)}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <window.Icon name="download" className="w-3.5 h-3.5" />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Severity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <window.StatCard severity="Critical" label="Critical SoD Risks" value={user.criticalCount} />
        <window.StatCard severity="High" label="High SoD Risks" value={user.highCount} />
        <window.StatCard severity="Medium" label="Medium SoD Risks" value={user.mediumCount} />
        <window.StatCard severity="Good" label="Total Active Roles" value={user.roles.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Roles & Tcodes */}
        <div className="lg:col-span-2 space-y-6">
          
          <window.Section title="Active Conflict Mappings (SoD Violations)">
            <div className="p-0">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50/50">
                    <window.Th className="w-24">Risk ID</window.Th>
                    <window.Th>Conflict Description</window.Th>
                    <window.Th className="w-28">Severity</window.Th>
                    <window.Th className="w-32 text-right">Actions</window.Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {user.violations.map(v => (
                    <tr key={v.id} className="row-hover">
                      <td className="px-4 py-3 font-mono font-bold text-ink-900">{v.id}</td>
                      <td className="px-4 py-3 text-ink-850 font-semibold">{v.desc}</td>
                      <td className="px-4 py-3"><window.SeverityBadge value={v.severity} /></td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onNavigate('violation-detail', v.id)}
                          className="px-2.5 py-1 rounded bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold text-[11px] transition-colors"
                        >
                          Audit Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </window.Section>

          <window.Section title="Authorized Scope Detail">
            <div className="p-5 space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Assigned SAP Authorization Roles</span>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map(r => (
                    <window.Role key={r} role={r} />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Authorized Transaction Codes (T-Codes)</span>
                <div className="flex flex-wrap gap-2">
                  {user.tcodes.map(tc => (
                    <window.TCode key={tc} code={tc} size="md" />
                  ))}
                </div>
              </div>
            </div>
          </window.Section>
        </div>

        {/* Governance & Notes */}
        <div className="space-y-6">
          
          <window.Section title="Remediation & Compensation">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Recommended Control Actions</span>
                <p className="text-xs font-semibold text-ink-800 bg-amber-50 border border-amber-200 rounded p-3 leading-relaxed">
                  {user.action}
                </p>
              </div>
              <div className="pt-3 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compensating Monitor</span>
                <p className="text-xs text-ink-600 leading-relaxed font-medium">
                  Implement daily reviewer checklists on transactions completed by this user under role ZSD_BR_BILLING_CREATE.
                </p>
              </div>
            </div>
          </window.Section>

          <window.Section title="Role Exemption & Approvals">
            <div className="p-5 text-xs text-ink-700 space-y-3">
              <div className="bg-ink-50 border border-ink-200 rounded p-3 leading-relaxed font-medium">
                No active audit approvals or policy exceptions have been registered for this account. System requires role redesign to maintain compliant score baseline.
              </div>
              <button
                onClick={() => alert('Redirecting to exception request workflow...')}
                className="w-full text-center py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 font-bold text-xs transition-colors"
              >
                Request Access Exception
              </button>
            </div>
          </window.Section>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────── */
/* ROLE DETAIL PAGE                                             */
/* ──────────────────────────────────────────────────────────── */
window.RoleDetailPage = function({ roleId, onNavigate }) {
  const details = {
    id: roleId,
    desc: window.explain(roleId) || `SAP role profile for authorizations assigned under code ${roleId}`,
    tcodes: ['VA01', 'VA02', 'VA03', 'VF01', 'VF02'],
    authObjects: ['S_TCODE', 'S_TABU_DIS', 'S_TABU_CLI', 'S_DEVELOP'],
    assignedUsers: ['HOANG.NGUYEN', 'JAE.KANG', 'PVALENCIA', 'RUTGER.DUKES', 'WBERRYMAN'],
    riskAssociations: [
      { id: 'V-1058', desc: 'Full OTC cycle control (Order → Bill → Collect) by single user', severity: 'Critical' }
    ]
  };

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">
      
      {/* Navigation Headers */}
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs text-ink-500 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-600 transition-colors">Dashboard</button>
          <span>/</span>
          <span className="text-ink-900 font-bold">Role {details.id}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('home')} 
            className="px-3 py-1.5 rounded-lg bg-white ring-1 ring-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <window.DetailHeader
        code="SAP IAM · Role Definition"
        title={`Role Profile: ${details.id}`}
        subtitle="Detailed configuration blueprint of the role profile, including mapped transaction codes, active authorization objects, and assigned user accounts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Role Config */}
        <div className="lg:col-span-2 space-y-6">
          <window.Section title="Role Configuration Scope">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Role Description</span>
                <p className="text-sm font-bold text-ink-900 leading-snug">{details.desc}</p>
              </div>
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Contained Transaction Codes (T-Codes)</span>
                <div className="flex flex-wrap gap-2">
                  {details.tcodes.map(tc => (
                    <window.TCode key={tc} code={tc} size="md" />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Authorization Objects Checked</span>
                <div className="flex flex-wrap gap-2">
                  {details.authObjects.map(obj => (
                    <span key={obj} className="font-mono text-xs bg-ink-100 text-ink-700 ring-1 ring-ink-200 px-2 py-0.5 rounded font-semibold">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Assigned GRC Audit Violations">
            <div className="p-0">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50/50">
                    <window.Th className="w-24">Risk ID</window.Th>
                    <window.Th>Conflict Description</window.Th>
                    <window.Th className="w-28">Severity</window.Th>
                    <window.Th className="w-32 text-right">Actions</window.Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {details.riskAssociations.map(v => (
                    <tr key={v.id} className="row-hover">
                      <td className="px-4 py-3 font-mono font-bold text-ink-900">{v.id}</td>
                      <td className="px-4 py-3 text-ink-850 font-semibold">{v.desc}</td>
                      <td className="px-4 py-3"><window.SeverityBadge value={v.severity} /></td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onNavigate('violation-detail', v.id)}
                          className="px-2.5 py-1 rounded bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold text-[11px] transition-colors"
                        >
                          Audit Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </window.Section>
        </div>

        {/* Right Side: Assigned Users */}
        <div className="space-y-6">
          <window.Section title={`Assigned User Accounts (${details.assignedUsers.length})`}>
            <div className="p-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Users Holding This Role</span>
              <div className="divide-y divide-ink-100 max-h-[350px] overflow-y-auto pr-1">
                {details.assignedUsers.map(user => (
                  <div key={user} className="py-2.5 flex items-center justify-between gap-3 hover:bg-ink-50 transition-colors rounded px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-ink-200 text-ink-700 font-bold text-[10px] flex items-center justify-center">
                        {user.slice(0,2)}
                      </div>
                      <span className="font-mono text-xs font-bold text-ink-800">{user}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('user-profile', user)}
                      className="px-2 py-0.5 rounded border border-ink-300 text-ink-700 hover:bg-ink-50 font-bold text-[10px] transition-colors"
                    >
                      Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </window.Section>

          <window.Section title="Role Remediation Status">
            <div className="p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Status</span>
              <span className="font-bold text-[10.5px] uppercase tracking-wide bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-2 py-0.5 rounded">
                Remediation Needed
              </span>
              <p className="text-xs text-ink-600 leading-relaxed pt-2">
                This role is marked as containing conflicting transaction sequences. Redesign proposal is logged under Remediation task plane.
              </p>
              <button
                onClick={() => alert(`Initiating role split wizard for ${details.id}...`)}
                className="w-full text-center py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 font-bold text-xs transition-colors"
              >
                Launch Role Split Wizard
              </button>
            </div>
          </window.Section>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────── */
/* RISK DETAIL PAGE                                             */
/* ──────────────────────────────────────────────────────────── */
window.RiskDetailPage = function({ riskId, onNavigate }) {
  const details = {
    id: riskId,
    title: riskId === 'V-1058' ? 'Full OTC Cycle Control' : 'Create Vendor + Approve Payment',
    level: 'Critical',
    process: riskId === 'V-1058' ? 'OTC' : 'Procurement',
    category: 'Financial',
    ruleset: 'SAP GRC Global Matrix v4.2',
    tcodes: riskId === 'V-1058' ? ['VA01', 'VF01', 'F-28'] : ['FK01', 'F110'],
    roles: riskId === 'V-1058' ? ['ZSD_BR_SO_CREATE', 'ZSD_BR_BILLING_CREATE'] : ['ZMM_BR_VENDOR_CREATE', 'ZFI_BR_AP_PAYMENT'],
    businessImpact: 'A single individual holding both parameters has the ability to register suppliers/sales transactions and execute payouts or clear bill postings without independent oversight.',
    complianceImpact: 'Direct violation of SOX Section 404 requirements concerning internal controls over financial reporting (ICFR).',
    compensatingControls: 'Implement automated three-way matching verification in client configuration, paired with daily independent reconciliation logs.',
    affectedUsers: ['HOANG.NGUYEN', 'JAE.KANG', 'PVALENCIA', 'RUTGER.DUKES', 'WBERRYMAN']
  };

  return (
    <div className="space-y-6 px-4 md:px-7 py-6">
      
      {/* Navigation Headers */}
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs text-ink-500 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-600 transition-colors">Dashboard</button>
          <span>/</span>
          <button onClick={() => onNavigate('risks')} className="hover:text-brand-600 transition-colors">Risks</button>
          <span>/</span>
          <span className="text-ink-900 font-bold">Risk {details.id} Blueprint</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('risks')}
            className="px-3 py-1.5 rounded-lg bg-white ring-1 ring-ink-200 hover:bg-ink-50 text-xs font-bold text-ink-700 transition-all"
          >
            ← Back to Risks
          </button>
        </div>
      </div>

      <window.DetailHeader
        code="SAP GRC · SoD Risk Definition"
        title={`SoD Risk Blueprint: ${details.id}`}
        subtitle="Complete ruleset definition for the specified SoD conflict pattern, including core business impacts, frameworks, and active user listings."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Risk Blueprints */}
        <div className="lg:col-span-2 space-y-6">
          <window.Section title="Risk Profile Configuration">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Risk Title</span>
                <p className="text-base font-bold text-ink-900">{details.title}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-ink-100">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">Process Area</span>
                  <span className="font-bold text-[11px] uppercase text-ink-700 bg-ink-50 ring-1 ring-ink-200 px-2 py-0.5 rounded">
                    {details.process}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">Risk Level</span>
                  <window.SeverityBadge value={details.level} />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400 block mb-0.5">Active Rule Set</span>
                  <span className="font-mono text-xs text-ink-600 block">{details.ruleset}</span>
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Conflicting Transactions & Roles Matrix">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Incompatible Transactions</span>
                <div className="flex flex-wrap gap-2">
                  {details.tcodes.map(tc => (
                    <window.TCode key={tc} code={tc} size="md" />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Contributing SAP Roles</span>
                <div className="flex flex-wrap gap-2">
                  {details.roles.map(r => (
                    <window.Role key={r} role={r} />
                  ))}
                </div>
              </div>
            </div>
          </window.Section>

          <window.Section title="Risk Impacts & Mitigations">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Business Impact</span>
                <p className="text-xs font-semibold text-ink-700 leading-relaxed">{details.businessImpact}</p>
              </div>
              <div className="pt-3 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compliance & Regulatory Impact</span>
                <p className="text-xs font-semibold text-rose-700 leading-relaxed">{details.complianceImpact}</p>
              </div>
              <div className="pt-3 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Compensating Monitor Controls</span>
                <p className="text-xs font-semibold text-ink-800 leading-relaxed bg-emerald-50 border border-emerald-200 rounded p-2.5">
                  {details.compensatingControls}
                </p>
              </div>
            </div>
          </window.Section>
        </div>

        {/* Right Col: Affected Users */}
        <div className="space-y-6">
          <window.Section title={`Affected User Accounts (${details.affectedUsers.length})`}>
            <div className="p-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Identities Currently in Conflict</span>
              <div className="divide-y divide-ink-100 max-h-[350px] overflow-y-auto pr-1">
                {details.affectedUsers.map(user => (
                  <div key={user} className="py-2.5 flex items-center justify-between gap-3 hover:bg-ink-50 transition-colors rounded px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-ink-200 text-ink-700 font-bold text-[10px] flex items-center justify-center">
                        {user.slice(0,2)}
                      </div>
                      <span className="font-mono text-xs font-bold text-ink-800">{user}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('user-profile', user)}
                      className="px-2 py-0.5 rounded border border-ink-300 text-ink-700 hover:bg-ink-50 font-bold text-[10px] transition-colors"
                    >
                      Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </window.Section>

          <window.Section title="Audit Attestation Status">
            <div className="p-5 space-y-3 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-ink-450 uppercase font-bold text-[9px]">Status</span>
                <span className="font-bold text-[10px] uppercase tracking-wide bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-2 py-0.5 rounded">
                  Open Risks
                </span>
              </div>
              <p className="text-ink-600 leading-relaxed">
                This rule check has flagged violations. Mitigating control assignments or active exceptions are required to pass periodic SOX audit reviews.
              </p>
              <button
                onClick={() => alert('Initiating compliance mitigation request workflow...')}
                className="w-full text-center py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 font-bold text-xs transition-colors"
              >
                Apply Mitigating Control
              </button>
            </div>
          </window.Section>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────── */
/* COMPLIANCE CORE / DETAIL PAGE                                */
/* ──────────────────────────────────────────────────────────── */
window.ComplianceDetailPage = function({ onNavigate, selectedRun }) {
  const runId = selectedRun ? selectedRun.id : 'LCSOD-2026-Q2-007';
  
  return (
    <div className="space-y-6 px-4 md:px-7 py-6 text-left">
      <window.DetailHeader
        code="SOD-01 / SOD-02 · Compliance Core"
        title="Compliance Score & Calculation Methodology"
        subtitle="Forensic mathematical audit trail detailing the calculation methodology and risk distribution for the unmitigated Segregation of Duties checks."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Calculation Methodology & Weights */}
        <div className="lg:col-span-2 space-y-6">
          <window.Section 
            title="Formula & Calculation Methodology"
            subtitle="The mathematical algorithm used to derive the GRC compliance index."
          >
            <div className="p-6 space-y-5">
              <div className="bg-ink-900 text-white rounded-xl p-6 text-center font-mono shadow-inner border border-ink-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-2">Mathematical Representation</div>
                <div className="text-xl md:text-2xl font-extrabold text-brand-400 py-3">
                  Risk Coverage Score = ( 1 - ( WUR / WDR ) ) * 100
                </div>
                <div className="text-[10px] text-ink-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Where WDR is the Weighted Detected Risk and WUR is the Weighted Unmitigated Risk.
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-ink-900 border-b border-ink-100 pb-1.5">Parameter Definitions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-ink-50/50 p-4 rounded-xl border border-ink-200">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-500 block mb-1">Weighted Detected Risk (WDR)</span>
                    <p className="text-xs text-ink-700 leading-relaxed font-semibold">
                      The total severity-weighted sum of all access conflicts detected across the entire user population before applying mitigating controls.
                    </p>
                  </div>
                  <div className="bg-ink-50/50 p-4 rounded-xl border border-ink-200">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-500 block mb-1">Weighted Unmitigated Risk (WUR)</span>
                    <p className="text-xs text-ink-700 leading-relaxed font-semibold">
                      The severity-weighted sum of violations that remain active and lack approved, signed off mitigating or compensating controls.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed font-medium">
                <strong>Architectural Note:</strong> By weighing severity levels differently, the compliance algorithm ensures that high-risk administrative bypasses (e.g. SU01 + PFCG) impact the score more heavily than minor operational overlaps. A higher score represents stronger compliance health and better control coverage.
              </div>
            </div>
          </window.Section>
        </div>

        {/* Right Column: Risk Distribution Table (SOD-01) */}
        <div className="space-y-6">
          <window.Section 
            title="Risk Distribution (SOD-01)" 
            subtitle="Risk inventory severity breakdown for active violations."
          >
            <div className="p-5 space-y-4">
              <div className="bg-ink-50 p-3 rounded-xl flex items-center justify-between text-xs border border-ink-200">
                <span className="font-semibold text-ink-500">Total Flagged Violations:</span>
                <span className="font-mono font-black text-ink-950 text-sm font-bold">46 total violations</span>
              </div>

              <div className="overflow-hidden border border-ink-200 rounded-xl shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-200 text-[10px] font-bold uppercase text-ink-500">
                      <th className="px-4 py-2.5">Severity</th>
                      <th className="px-4 py-2.5 text-center">Count</th>
                      <th className="px-4 py-2.5 text-center">% of Total</th>
                      <th className="px-4 py-2.5 text-right">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-150 font-medium">
                    <tr className="hover:bg-ink-50/30">
                      <td className="px-4 py-2.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-rose-700 font-bold">Critical</span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-ink-900">18</td>
                      <td className="px-4 py-2.5 text-center font-mono text-ink-500">39.1%</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-ink-700">Weight x1.0</td>
                    </tr>
                    <tr className="hover:bg-ink-50/30">
                      <td className="px-4 py-2.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        <span className="text-orange-700 font-bold">High</span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-ink-900">19</td>
                      <td className="px-4 py-2.5 text-center font-mono text-ink-500">41.3%</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-ink-700">Weight x0.6</td>
                    </tr>
                    <tr className="hover:bg-ink-50/30">
                      <td className="px-4 py-2.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                        <span className="text-amber-700 font-bold">Medium</span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-ink-900">9</td>
                      <td className="px-4 py-2.5 text-center font-mono text-ink-500">19.6%</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-ink-700">Weight x0.3</td>
                    </tr>
                    <tr className="hover:bg-ink-50/30">
                      <td className="px-4 py-2.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-blue-700 font-bold">Low</span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-ink-900">0</td>
                      <td className="px-4 py-2.5 text-center font-mono text-ink-500">0.0%</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-ink-700">Weight x0.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1">Impact Summary</span>
                <p className="text-xs text-ink-500 leading-relaxed">
                  These weights prioritize critical security remediation, preventing concentration of elevated privileges.
                </p>
              </div>
            </div>
          </window.Section>
        </div>

      </div>
    </div>
  );
};
