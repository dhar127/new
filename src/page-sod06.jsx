const {
  BarChart: P6_BarChart, Bar: P6_Bar, XAxis: P6_XAxis, YAxis: P6_YAxis,
  CartesianGrid: P6_CartesianGrid, Tooltip: P6_Tooltip, Cell: P6_Cell,
  ResponsiveContainer: P6_ResponsiveContainer, LabelList: P6_LabelList,
} = Recharts;

const { useState, useEffect, useRef } = React;

/* ─────────────────────────────────────────────
   MODAL PORTAL
───────────────────────────────────────────── */
const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return ReactDOM.createPortal(children, document.body);
};

/* ─────────────────────────────────────────────
   DOWNLOAD SPLIT REPORT
───────────────────────────────────────────── */
const downloadSplitReport = (role) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const csv = [
    ['Role Split Report'],
    ['Generated', new Date().toLocaleString()],
    ['Original Role', role.role],
    ['Current Users', role.users],
    ['To Remediate', role.users],
    [''],
    ['Proposed Role Splits'],
    ['Role Name', 'Description', 'Authorization Level'],
    [role.role + '_READ', 'Read-only access — view GL entries, no posting rights', 'Read'],
    [role.role + '_POST_CTL', 'Controlled posting — requires dual approval workflow', 'Write with Controls'],
    [''],
    ['Implementation Notes'],
    ['1. Create new roles with restricted authorization objects'],
    ['2. Migrate users to split roles incrementally'],
    ['3. Implement dual-approval workflow for _POST_CTL assignments'],
    ['4. Monitor all role assignment changes via SM01 logs'],
    ['5. Schedule quarterly SoD compliance reviews'],
    [''],
    ['References'],
    ['SAP Note 1860731 - Security Optimization Service guidelines'],
    ['SAP Note 2159014 - Role segregation best practices'],
    ['Internal Policy - Super-Admin accountability framework'],
  ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `SOD-06_RoleSplit_${role.role}_${timestamp}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* ─────────────────────────────────────────────
   INFO TOOLTIP
───────────────────────────────────────────── */
const InfoTooltip = ({ content, maxWidth = 260 }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.top - 10, left: rect.left + rect.width / 2 });
    }
    setShow(true);
  };

  return (
    <span className="relative inline-flex items-center ml-1.5 align-middle" style={{ verticalAlign: 'middle' }}>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        onFocus={handleMouseEnter}
        onBlur={() => setShow(false)}
        className="text-ink-400 hover:text-brand-500 transition-colors focus:outline-none"
        aria-label="More information"
        tabIndex={0}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
        </svg>
      </button>
      {show && (
        <ModalPortal>
          <div
            className="fixed z-50 rounded-lg border border-ink-200 bg-white shadow-pop text-[11px] text-ink-700 leading-relaxed p-3"
            style={{ width: maxWidth, top: `${position.top}px`, left: `${position.left}px`, transform: 'translate(-50%, -100%)', pointerEvents: 'none', marginTop: '-8px' }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
              style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #fff' }} />
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
              style={{ borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #E2E8F0', marginTop: '1px', marginLeft: '-7px' }} />
            {content}
          </div>
        </ModalPortal>
      )}
    </span>
  );
};

/* ─────────────────────────────────────────────
   SPLIT REPORT MODAL
───────────────────────────────────────────── */
const SplitReportModal = ({ role, onClose }) => {
  if (!role) return null;
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm" onClick={onClose}>
        <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-2xl border border-ink-200 overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-ink-900 px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Generate Split Report</div>
                <div className="font-mono font-bold text-white text-base">{role.role}</div>
              </div>
              <button onClick={onClose} className="text-ink-400 hover:text-white transition-colors mt-0.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-ink-50 border border-ink-200 px-3 py-3 text-center">
                <div className="text-[22px] font-black font-mono text-rose-500">{role.users}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mt-0.5">Current Users</div>
              </div>
              <div className="rounded-lg bg-ink-50 border border-ink-200 px-3 py-3 text-center">
                <div className="text-[22px] font-black font-mono text-amber-500">{role.users}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mt-0.5">To Remediate</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Proposed Role Split</div>
              <div className="space-y-2">
                {[
                  { name: role.role + '_READ', desc: 'Read-only access — view GL entries, no posting rights' },
                  { name: role.role + '_POST_CTL', desc: 'Controlled posting — requires dual approval workflow' },
                ].map(r => (
                  <div key={r.name} className="flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2.5 border border-ink-200">
                    <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className="font-mono text-[11px] font-bold text-ink-900">{r.name}</div>
                      <div className="text-[11px] text-ink-500 mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Implementation Roadmap</div>
              <div className="space-y-1.5 text-[11px] text-ink-600">
                {[
                  ['Week 1', 'Create new split roles in DEV/QA, configure approvers'],
                  ['Week 2', 'Notify users, commence migration to _READ role'],
                  ['Week 3', 'Migrate posting rights to _POST_CTL with approval workflow'],
                  ['Week 4', 'Revoke original role, validate all systems, monitor logs'],
                ].map(([w, t]) => (
                  <div key={w} className="flex gap-2">
                    <span className="font-bold text-amber-600">{w}:</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-ink-200 bg-ink-50 px-6 py-4 flex gap-2">
            <button onClick={() => { downloadSplitReport(role); onClose(); }}
              className="flex-1 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors shadow-sm uppercase tracking-widest">
              Download Split Report
            </button>
            <button onClick={onClose} className="px-4 py-2.5 rounded-lg bg-white text-xs font-bold text-ink-600 hover:bg-ink-100 transition-colors border border-ink-200 uppercase tracking-widest">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

/* ─────────────────────────────────────────────
   KPIs
───────────────────────────────────────────── */
const Sod06Kpis = () => {
  const k = window.MOCK.SUPER_ADMIN_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
      <StatCard label="Total Super-Admins" value={k.totalSuperAdmins} delta={k.deltas.totalSuperAdmins} deltaInvertGood />
      <StatCard severity="Critical" label="Critical Severity" value={k.critical} delta={k.deltas.critical} deltaInvertGood />
      <StatCard label="Source Roles" value={k.rolesContributing} sub="contributing" delta={k.deltas.rolesContributing} deltaInvertGood />
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROLE CONCENTRATION CHART
───────────────────────────────────────────── */
const RoleConcentrationChart = () => {
  const data = window.MOCK.ROLE_CONCENTRATION.slice().sort((a, b) => b.users - a.users);
  const maxUsers = Math.max(...data.map(d => d.users));
  const [modalRole, setModalRole] = useState(null);

  return (
    <>
      <Section title="Role Authority Concentration" subtitle="Identification of SAP roles responsible for granting near-unrestricted access.">
        <div className="p-6">
          <div className="h-[320px]">
            <P6_ResponsiveContainer>
              <P6_BarChart data={data} layout="vertical" margin={{ top: 8, right: 32, bottom: 0, left: 8 }}>
                <P6_CartesianGrid stroke="#F1F5F9" horizontal={false} />
                <P6_XAxis type="number" hide />
                <P6_YAxis type="category" dataKey="role" width={160} tick={{ fill: '#0F172A', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <P6_Tooltip cursor={{ fill: '#F8FAFC' }} content={({ active, payload, label }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                      <div className="font-bold text-ink-900 mb-1">{label}</div>
                      <div className="text-ink-600 flex justify-between gap-4">
                        <span>Grant Count:</span> <b className="font-mono text-ink-900">{payload[0].value} Users</b>
                      </div>
                      <div className="text-[10px] text-brand-500 mt-1.5 font-semibold">Click bar to generate split report →</div>
                    </div>
                  );
                }} />
                <P6_Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={20} onClick={(barData) => setModalRole(barData)}>
                  {data.map((d, i) => (
                    <P6_Cell key={i} fill={d.users / maxUsers > 0.6 ? '#EF4444' : '#475569'} style={{ cursor: 'pointer' }} />
                  ))}
                  <P6_LabelList dataKey="users" position="right" fill="#0F172A" style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono' }} />
                </P6_Bar>
              </P6_BarChart>
            </P6_ResponsiveContainer>
          </div>
          <p className="text-[11px] text-ink-400 mt-2 pl-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-rose-500 mr-1.5 align-middle" />
            Red bars exceed 60% concentration threshold — click any bar to generate a role split report.
          </p>
        </div>
      </Section>
      {modalRole && <SplitReportModal role={modalRole} onClose={() => setModalRole(null)} />}
    </>
  );
};

/* ─────────────────────────────────────────────
   SEVERITY CHIP COLOR HELPER
───────────────────────────────────────────── */
const roleChipColor = (role) => {
  if (!role) return '';
  const n = role.toUpperCase();
  if (n === 'SAP_ALL' || n.includes('PFCG') || n.includes('SU01') || n.includes('SYSTEM_ADMIN'))
    return 'bg-rose-50 text-rose-800 border-rose-200';
  if (n.includes('PAYMENT') || n.includes('TREASURY') || n.includes('PAYROLL') || n.includes('TRANSPORT'))
    return 'bg-orange-50 text-orange-800 border-orange-200';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

/* ─────────────────────────────────────────────
   SUPER ADMIN TABLE
───────────────────────────────────────────── */
const SuperAdminTable = () => {
  const { SUPER_ADMIN_ROWS, SUPER_ADMIN_RECOMMENDATIONS, SEVERITIES } = window.MOCK;
  const [rows] = useState(SUPER_ADMIN_ROWS);
  const [recFilter, setRecFilter] = useState(null);
  const [sevFilter, setSevFilter] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'score', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [openRows, setOpenRows] = useState(new Set());
  const pageSize = 10;

  const toggleRow = (user) => {
    setOpenRows(prev => {
      const next = new Set(prev);
      next.has(user) ? next.delete(user) : next.add(user);
      return next;
    });
  };

  const filtered = rows
    .filter(r => !recFilter || r.recommendation === recFilter)
    .filter(r => !sevFilter || r.severity === sevFilter)
    .filter(r => !query || (r.user + r.name + r.userId).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      return (a.score - b.score) * dir;
    });

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setRecFilter(null); setSevFilter(null); setQuery(''); };

  return (
    <Section title="Super-Admin Account Registry" action={<ExportButton label="Export Audit Log" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(recFilter || sevFilter || query)}>
        <Select value={recFilter} onChange={setRecFilter} options={SUPER_ADMIN_RECOMMENDATIONS} placeholder="All Recommendations" />
        <Select value={sevFilter} onChange={setSevFilter} options={SEVERITIES} placeholder="All Severities" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by Username or ID…" />
      </FilterBar>

      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="w-8" />
              <Th sortKey="user" sort={sort} onSort={k => setSort({ key: k, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}>
                <span className="inline-flex items-center">Username</span>
              </Th>
              <Th>
                <span className="inline-flex items-center">User Actions</span>
              </Th>
              <Th>Recommendation</Th>
              <Th>Severity</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const isOpen = openRows.has(r.user);
              return (
                <React.Fragment key={r.user}>
                  {/* Main Row */}
                  <tr
                    className={`row-hover cursor-pointer select-none ${isOpen ? 'bg-ink-50/60' : ''}`}
                    onClick={() => toggleRow(r.user)}
                  >
                    <td className="pl-3 pr-1 py-3.5">
                      <svg
                        className={`w-3.5 h-3.5 text-ink-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 14 14" fill="none"
                      >
                        <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-900">{r.user}</td>
                    <td className="px-4 py-3.5 font-semibold text-ink-800">{r.indicator}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-[10px] tracking-tight uppercase text-ink-600 px-2 py-0.5 rounded bg-ink-100 ring-1 ring-inset ring-ink-200">
                        {r.recommendation}
                      </span>
                    </td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                  </tr>

                  {/* Expand Panel */}
                  {isOpen && (
                    <tr className="bg-ink-50/40">
                      <td colSpan={6} className="px-0 pt-0 pb-0 border-b border-ink-100">
                        <div className="pl-10 pr-6 py-4 space-y-4">

                          {/* Compliance Risk Rationale */}
                          {r.rationale && (
                            <div className={`rounded-lg p-4 border border-ink-200 border-l-4 ${
                              r.severity === 'Critical' ? 'border-l-rose-500 bg-rose-50/20' :
                              r.severity === 'High' ? 'border-l-orange-500 bg-orange-50/20' :
                              'border-l-amber-500 bg-amber-50/20'
                            }`}>
                              <div className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${
                                r.severity === 'Critical' ? 'text-rose-700' :
                                r.severity === 'High' ? 'text-orange-700' :
                                'text-amber-700'
                              }`}>Compliance Risk Rationale</div>
                              <p className="text-[12px] text-ink-700 leading-relaxed font-medium">
                                {r.rationale}
                              </p>
                            </div>
                          )}

                          {/* Affected Users */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Affected Users</div>
                            <div className="flex flex-wrap gap-2">
                              {(r.affectedUsers || [r.user]).map(user => (
                                <span key={user} className="font-mono text-[10px] px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 ring-1 ring-rose-200 font-semibold">
                                  {user}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Roles */}
                          {r.roles && r.roles.length > 0 && (
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Assigned Roles & Access</div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {r.roles.map(role => (
                                  <div key={role.role} className="bg-white border border-ink-200 rounded-lg px-3.5 py-2.5 flex items-start gap-2.5">
                                    <span className={`font-mono text-[11px] px-2 py-0.5 rounded border shrink-0 mt-0.5 ${roleChipColor(role.role)}`}>
                                      {role.role}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[11px] text-ink-700 leading-snug font-medium">{role.desc}</div>
                                      {role.authObjects && role.authObjects.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1 items-center">
                                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-ink-400 mr-1">Auth Objects:</span>
                                          {role.authObjects.map(obj => (
                                            <span key={obj} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-ink-100 text-ink-700 border border-ink-200/60 font-semibold shadow-sm">
                                              {obj}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

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
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} />
    </Section>
  );
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const Sod06Page = () => {
  return (
    <div data-screen-label="06 Super Administrators" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-06 · Admin Stream"
        title="Super-Administrator Inventory"
        subtitle="Detection of accounts holding global unrestricted authorization profiles across the SAP landscape."
      />
      <Sod06Kpis />
      <RoleConcentrationChart />
      <SuperAdminTable />
    </div>
  );
};

window.Sod06Page = Sod06Page;