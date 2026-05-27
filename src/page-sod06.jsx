const {
  BarChart: P6_BarChart, Bar: P6_Bar, XAxis: P6_XAxis, YAxis: P6_YAxis,
  CartesianGrid: P6_CartesianGrid, Tooltip: P6_Tooltip, Cell: P6_Cell,
  ResponsiveContainer: P6_ResponsiveContainer, LabelList: P6_LabelList,
} = Recharts;

const { useState } = React;

const Sod06Kpis = () => {
  const k = window.MOCK.SUPER_ADMIN_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
      <StatCard label="Total Super-Admins" value={k.totalSuperAdmins} delta={k.deltas.totalSuperAdmins} deltaInvertGood />
      <StatCard severity="Critical" label="Critical Severity" value={k.critical} delta={k.deltas.critical} deltaInvertGood />
      <StatCard label="Source Roles" value={k.rolesContributing} sub="contributing" delta={k.deltas.rolesContributing} deltaInvertGood />
      <StatCard label="Affected Systems" value={k.systemsAffected} delta={k.deltas.systemsAffected} />
    </div>
  );
};

const RoleConcentrationChart = () => {
  const data = window.MOCK.ROLE_CONCENTRATION.slice().sort((a, b) => b.users - a.users);
  const maxUsers = Math.max(...data.map(d => d.users));
  return (
    <Section title="Role Authority Concentration" subtitle="Identification of SAP roles responsible for granting near-unrestricted access.">
      <div className="grid grid-cols-12 gap-0 divide-x divide-ink-100">
        <div className="col-span-12 lg:col-span-8 p-6">
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
                    </div>
                  );
                }} />
                <P6_Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={20}>
                  {data.map((d, i) => <P6_Cell key={i} fill={d.users / maxUsers > 0.6 ? '#EF4444' : '#475569'} />)}
                  <P6_LabelList dataKey="users" position="right" fill="#0F172A" style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono' }} />
                </P6_Bar>
              </P6_BarChart>
            </P6_ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 p-6 bg-ink-900 text-white flex flex-col justify-center">
           <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Critical Concentration</div>
           <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="shield" className="w-5 h-5 text-rose-500 mt-0.5" />
                <div>
                  <div className="text-sm font-bold">ZFI_BR_GL_POSTING</div>
                  <p className="text-[12px] text-ink-300 mt-1">Granted to 9 super-admin accounts. SAP standard recommended: 0.</p>
                </div>
              </div>
              <button className="w-full rounded-lg bg-white/10 border border-white/20 py-2 text-[11px] font-bold hover:bg-white/20 transition-colors uppercase tracking-widest">Generate Split Report</button>
           </div>
        </div>
      </div>
    </Section>
  );
};

const SuperAdminTable = () => {
  const { SUPER_ADMIN_ROWS, SUPER_ADMIN_RECOMMENDATIONS, SEVERITIES } = window.MOCK;
  const [rows, setRows] = useState(SUPER_ADMIN_ROWS);
  const [recFilter, setRecFilter] = useState(null);
  const [sevFilter, setSevFilter] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'score', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 10;

  const toggle = id => setExpanded(s => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const setStatus = (user, status) => setRows(rs => rs.map(r => r.user === user ? { ...r, status } : r));
  const setAssignee = (user, assignee) => setRows(rs => rs.map(r => r.user === user ? { ...r, assignee } : r));

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
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or ID…" />
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <Th></Th>
              <Th sortKey="user" sort={sort} onSort={k => setSort({key:k, dir: sort.dir==='asc'?'desc':'asc'})}>Identifier</Th>
              <Th>Security Indicator</Th>
              <Th align="right">Authority Score</Th>
              <Th align="right">Role Count</Th>
              <Th>Recommendation</Th>
              <Th>Severity</Th>
              <Th>Execution</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const isOpen = expanded.has(r.user);
              return (
                <React.Fragment key={r.user}>
                  <tr onClick={() => toggle(r.user)} className="row-hover cursor-pointer group">
                    <td className="pl-4">
                      <Icon name="chevron" className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.user}</td>
                    <td className="px-4 py-3.5 font-semibold text-ink-800">{r.indicator}</td>
                    <td className="px-4 py-3.5 text-right">
                       <span className="font-mono font-bold text-ink-900">{r.score}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-ink-600">{r.roles.length}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-[10px] tracking-tight uppercase text-ink-600 px-2 py-0.5 rounded bg-ink-100 ring-1 ring-inset ring-ink-200">{r.recommendation}</span>
                    </td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                       <StatusBadge value={r.status} onChange={s => setStatus(r.user, s)} />
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={8} className="px-12 py-5">
                        <RoleDrilldown row={r} />
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

const RoleDrilldown = ({ row }) => (
  <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Privileged Authorization Set</div>
      <div className="flex flex-wrap gap-2">
        {row.roles.map(r => <Role key={r.role} role={r.role} className="bg-white px-2 py-1 rounded ring-1 ring-ink-200 shadow-sm" />)}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 space-y-4">
      <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Technical Insight</div>
        <p className="text-xs font-semibold text-ink-700">Account grants unrestricted SE16, PFCG, and SM30 authority across production client.</p>
      </div>
      <button className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-500 shadow-sm uppercase tracking-widest">Execute Revocation</button>
    </div>
  </div>
);

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
