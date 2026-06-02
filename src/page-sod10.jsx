const {
  PieChart: P10_PieChart, Pie: P10_Pie, Cell: P10_Cell,
  BarChart: P10_BarChart, Bar: P10_Bar, XAxis: P10_XAxis, YAxis: P10_YAxis,
  CartesianGrid: P10_CartesianGrid, Tooltip: P10_Tooltip,
  ResponsiveContainer: P10_ResponsiveContainer,
} = Recharts;

const { useState } = React;

const Sod10Kpis = () => {
  const k = window.MOCK.SERVICE_ACCOUNT_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="Total Identities" value={k.totalAccounts} delta={k.deltas.totalAccounts} />
      <StatCard severity="Critical" label="Elevated Privilege" value={k.highPrivilege} delta={k.deltas.highPrivilege} deltaInvertGood />
      <StatCard severity="High" label="Dormant (60d+)" value={k.inactiveAccounts} delta={k.deltas.inactiveAccounts} deltaInvertGood />
      <StatCard severity="Critical" label="Unmanaged IDs" value={k.unmanagedAccounts} delta={k.deltas.unmanagedAccounts} deltaInvertGood />
    </div>
  );
};

const AccountDistribution = () => {
  const { ACCOUNT_TYPE_SPLIT, SERVICE_ACCOUNTS } = window.MOCK;
  const total = ACCOUNT_TYPE_SPLIT.reduce((s, x) => s + x.count, 0);
  const [hover, setHover] = useState(null);

  const matrix = ['Critical', 'High', 'Medium', 'Low'].map(p => ({
    priv: p,
    Service:     SERVICE_ACCOUNTS.filter(a => a.privilege === p && a.type === 'Service').length,
    Background:  SERVICE_ACCOUNTS.filter(a => a.privilege === p && a.type === 'Background').length,
    Integration: SERVICE_ACCOUNTS.filter(a => a.privilege === p && a.type === 'Integration').length,
  }));

  return (
    <Section title="Identity Classification" subtitle="Structural breakdown of non-human service accounts by function and authority level.">
      <div className="grid grid-cols-12 gap-0 divide-x divide-ink-100">
        <div className="col-span-12 md:col-span-5 p-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Identity Types</div>
          <div className="relative h-[220px]">
            <P10_ResponsiveContainer>
              <P10_PieChart>
                <P10_Pie
                  data={ACCOUNT_TYPE_SPLIT} dataKey="count" nameKey="type" cx="50%" cy="50%"
                  innerRadius={68} outerRadius={92} paddingAngle={4} stroke="#fff" strokeWidth={4}
                  onMouseEnter={(_, i) => setHover(i)} onMouseLeave={() => setHover(null)}
                >
                  {ACCOUNT_TYPE_SPLIT.map((d, i) => (
                    <P10_Cell key={i} fill={d.color} opacity={hover === null || hover === i ? 1 : 0.3} />
                  ))}
                </P10_Pie>
              </P10_PieChart>
            </P10_ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
               <div className="text-center">
                  <div className="text-2xl font-bold text-ink-900">{total}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink-400">Total IDs</div>
               </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 p-6 bg-ink-50/30">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Privilege × Function Matrix</div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-ink-400 font-bold uppercase tracking-tighter">
                <th className="pb-2 text-left">Privilege</th>
                <th className="pb-2 text-center">Service</th>
                <th className="pb-2 text-center">Batch</th>
                <th className="pb-2 text-center">RFC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {matrix.map(r => (
                <tr key={r.priv} className="hover:bg-white/40 transition-colors">
                  <td className="py-3 font-bold text-ink-700">{r.priv}</td>
                  <td className="py-3 text-center font-mono font-bold text-ink-900">{r.Service || '·'}</td>
                  <td className="py-3 text-center font-mono font-bold text-ink-900">{r.Background || '·'}</td>
                  <td className="py-3 text-center font-mono font-bold text-ink-900">{r.Integration || '·'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

const ServiceAccountTable = () => {
  const { SERVICE_ACCOUNTS } = window.MOCK;
  const [rows, setRows] = useState(SERVICE_ACCOUNTS);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [privFilter, setPrivFilter] = useState('All');
  const [sort, setSort] = useState({ key: 'privilege', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 12;

  const toggle = id => setExpanded(s => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const setStatus = (id, status) => setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r));

  const filtered = rows.filter(r => 
    (!query || r.account.toLowerCase().includes(query.toLowerCase())) &&
    (typeFilter === 'All' || r.type === typeFilter) &&
    (privFilter === 'All' || r.privilege === privFilter)
  );
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Section title="Service Identity Inventory" action={<ExportButton label="Export IAM Set" size="sm" />}>
      <FilterBar onClear={() => { setQuery(''); setTypeFilter('All'); setPrivFilter('All'); }} hasFilters={!!query || typeFilter !== 'All' || privFilter !== 'All'}>
        <div className="flex flex-wrap gap-2 w-full">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by Account or System…" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50">
            <option value="All">All Types</option>
            <option value="Service">Service</option>
            <option value="Background">Background</option>
            <option value="Integration">Integration</option>
          </select>
          <select value={privFilter} onChange={e => setPrivFilter(e.target.value)} className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50">
            <option value="All">All Privileges</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <Th></Th>
              <Th>System Identity</Th>
              <Th>Account Type</Th>
              <Th>Privilege</Th>
              <Th>Last Activity</Th>
              <Th>Risk Classification</Th>
              <Th>Custodian</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const isOpen = expanded.has(r.id);
              return (
                <React.Fragment key={r.id}>
                  <tr onClick={() => toggle(r.id)} className="row-hover cursor-pointer group">
                    <td className="pl-4">
                      <Icon name="chevron" className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.account}</div>
                      <div className="text-[10px] font-bold text-ink-400 uppercase">{r.id}</div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-ink-600 uppercase text-[10px] tracking-tight">{r.type}</td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.privilege} /></td>
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-600">{r.lastActivity}</td>
                    <td className="px-4 py-3.5 font-semibold text-ink-800 text-[11px] leading-tight max-w-[200px]">{r.risk}</td>
                    <td className="px-4 py-3.5">
                       {r.owner ? <span className="font-bold text-ink-800">{r.owner}</span> : <span className="text-rose-600 font-bold uppercase text-[9px] tracking-widest bg-rose-50 px-1.5 py-0.5 rounded ring-1 ring-rose-200">Unmanaged</span>}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={8} className="px-12 py-5">
                        <AccountDrilldown row={r} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          {paged.length === 0 && (
              <tr><td colSpan={8} className="py-12 text-center text-sm text-ink-500 font-bold uppercase tracking-widest">No Identities Match Selection</td></tr>
          )}
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} />
    </Section>
  );
};

const AccountDrilldown = ({ row }) => (
  <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Assigned Auth Profiles</div>
      <div className="flex flex-wrap gap-2">
         {row.roles.map(r => <span key={r.role} className="px-2 py-1 rounded bg-white ring-1 ring-ink-200 shadow-sm font-mono text-[11px] font-bold text-ink-800">{r.role}</span>)}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 space-y-4">
       <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm">
         <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">IAM Integrity Logic</div>
         <p className="text-xs font-semibold text-ink-700 leading-relaxed italic">"Identity holds production-wide authority with no valid custodian mapping. Recommend immediate profile scoping."</p>
       </div>
       {/* <button className="w-full rounded-lg bg-ink-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-800 uppercase tracking-widest transition-colors shadow-sm">Assign Custodian</button> */}
    </div>
  </div>
);

const Sod10Page = () => {
  return (
    <div data-screen-label="10 Service Accounts" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-10 · Identity Stream"
        title="Non-Human Access Control"
        subtitle="Monitoring the authorization footprint and lifecycle of service, batch, and integration IDs."
      />
      <Sod10Kpis />
      <AccountDistribution />
      <ServiceAccountTable />
    </div>
  );
};

window.Sod10Page = Sod10Page;
