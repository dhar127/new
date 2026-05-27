const {
  BarChart: P11_BarChart, Bar: P11_Bar, XAxis: P11_XAxis, YAxis: P11_YAxis,
  CartesianGrid: P11_CartesianGrid, Tooltip: P11_Tooltip, Legend: P11_Legend,
  ResponsiveContainer: P11_ResponsiveContainer, LabelList: P11_LabelList,
} = Recharts;

const { useState } = React;

const TYPE_STYLE_11 = {
  'Role Redesign':       { color: '#334155', bg: 'bg-ink-50',   text: 'text-ink-800',  ring: 'ring-ink-200',   icon: 'wrench' },
  'Access Removal':      { color: '#EF4444', bg: 'bg-rose-50',  text: 'text-rose-700', ring: 'ring-rose-200',  icon: 'x' },
  'Mitigating Control':  { color: '#64748B', bg: 'bg-ink-50',   text: 'text-ink-800',  ring: 'ring-ink-200',   icon: 'shield' },
  'Policy':              { color: '#0F172A', bg: 'bg-ink-50',   text: 'text-ink-800',  ring: 'ring-ink-200',   icon: 'file' },
};

const PRIORITY_STYLE = {
  P1: 'bg-rose-50 text-rose-700 ring-rose-200',
  P2: 'bg-orange-50 text-orange-700 ring-orange-200',
  P3: 'bg-amber-50 text-amber-700 ring-amber-200',
  P4: 'bg-blue-50 text-blue-700 ring-blue-200',
};

const STATUS_COLOR = {
  Open: '#94A3B8',
  'In Progress': '#3B82F6',
  Resolved: '#22C55E',
};

/* ------------------------------------------------------------ */
/* KPIs — high density, professional                             */
/* ------------------------------------------------------------ */
const Sod11Kpis = () => {
  const k = window.MOCK.REMEDIATION_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
      <StatCard label="Total Tasks" value={k.total} delta={k.deltas.total} />
      <StatCard severity="Critical" label="Overdue" value={k.overdue} delta={k.deltas.overdue} deltaInvertGood />
      <StatCard label="Awaiting Owner" value={k.open} sub="open" delta={k.deltas.open} deltaInvertGood />
      <StatCard label="In Progress" value={k.inProgress} delta={k.deltas.inProgress} />
      <StatCard severity="Good" label="Closed" value={k.resolved} sub="this run" delta={k.deltas.resolved} />
    </div>
  );
};

/* ------------------------------------------------------------ */
/* Summary — streamlined flow chart                              */
/* ------------------------------------------------------------ */
const RemediationSummary = () => {
  const { REMEDIATIONS } = window.MOCK;
  const data = Object.keys(TYPE_STYLE_11).map(type => {
    const set = REMEDIATIONS.filter(r => r.type === type);
    const scale = 18;
    return {
      type,
      Open:         set.filter(r => r.status === 'Open').length * scale,
      'In Progress':set.filter(r => r.status === 'In Progress').length * scale,
      Resolved:     set.filter(r => r.status === 'Resolved').length * scale,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      <div className="md:col-span-8">
        <Section title="Remediation Pipeline" subtitle="Workload distribution by task type and execution status.">
          <div className="h-[260px] p-6">
            <P11_ResponsiveContainer>
              <P11_BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -24 }} layout="vertical">
                <P11_CartesianGrid stroke="#F1F5F9" horizontal={false} />
                <P11_XAxis type="number" hide />
                <P11_YAxis dataKey="type" type="category" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} width={120} />
                <P11_Tooltip cursor={{ fill: '#F8FAFC' }} content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  return (
                    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                      <div className="font-bold text-ink-900 mb-1">{label}</div>
                      {payload.map((p, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 py-0.5">
                          <span className="flex items-center gap-1.5 text-ink-500">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
                            {p.name}
                          </span>
                          <span className="font-mono font-bold text-ink-900">{(p.value || 0).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  );
                }} />
                <P11_Bar dataKey="Open"        stackId="s" fill={STATUS_COLOR.Open}        radius={[0,0,0,0]} barSize={32} />
                <P11_Bar dataKey="In Progress" stackId="s" fill={STATUS_COLOR['In Progress']} />
                <P11_Bar dataKey="Resolved"    stackId="s" fill={STATUS_COLOR.Resolved}    radius={[0,4,4,0]} />
              </P11_BarChart>
            </P11_ResponsiveContainer>
          </div>
        </Section>
      </div>
      <div className="md:col-span-4 flex flex-col gap-4">
        <div className="flex-1 rounded-2xl bg-ink-900 p-5 text-white shadow-card">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">AI Performance Insights</div>
          <div className="mt-4 flex items-start gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Icon name="check" className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Access Removal Velocity</div>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-300">Tasks in this category are closing <b>42% faster</b> than Q1. Recommend prioritizing role-redesign next to maintain momentum.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
             {data.slice(0,2).map(d => {
               const total = d.Open + d['In Progress'] + d.Resolved;
               const pct = Math.round((d.Resolved / total) * 100);
               return (
                 <div key={d.type}>
                   <div className="flex justify-between text-[11px] mb-1.5">
                     <span className="font-semibold text-ink-200">{d.type}</span>
                     <span className="font-mono text-emerald-400">{pct}%</span>
                   </div>
                   <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${pct}%` }} />
                   </div>
                 </div>
               )
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------ */
/* Tracker — high density table                                 */
/* ------------------------------------------------------------ */
const RemediationTable = () => {
  const { REMEDIATIONS, REMEDIATION_TYPES, PRIORITIES, TEAMS } = window.MOCK;
  const [rows, setRows] = useState(REMEDIATIONS);
  const [typeFilter, setTypeFilter] = useState(null);
  const [prioFilter, setPrioFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'priority', dir: 'asc' });
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const prioOrder = { P1: 0, P2: 1, P3: 2, P4: 3 };



  const filtered = rows
    .filter(r => !typeFilter || r.type === typeFilter)
    .filter(r => !prioFilter || r.priority === prioFilter)
    .filter(r => !statusFilter || r.status === statusFilter)
    .filter(r => !query || (r.id + r.title + r.violationId).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'priority') return (prioOrder[a.priority] - prioOrder[b.priority]) * dir;
      return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir;
    });
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setTypeFilter(null); setPrioFilter(null); setStatusFilter(null); setQuery(''); };

  return (
    <Section title="Remediation Tracker" action={<ExportButton label="Export Master Plan" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(typeFilter || prioFilter || statusFilter || query)}>
        <Select value={typeFilter} onChange={setTypeFilter} options={REMEDIATION_TYPES} placeholder="All Types" />
        <Select value={prioFilter} onChange={setPrioFilter} options={PRIORITIES} placeholder="All Priorities" />
        <Select value={statusFilter} onChange={setStatusFilter} options={['Open','In Progress','Resolved']} placeholder="All Status" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by ID or title…" />
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-ink-50/50">
              <Th className="w-10"></Th>
              <Th sortKey="priority" sort={sort} onSort={k => setSort({key:k, dir: sort.dir==='asc'?'desc':'asc'})}>Prio</Th>
              <Th sortKey="violationId" sort={sort} onSort={k => setSort({key:k, dir: sort.dir==='asc'?'desc':'asc'})}>Source Violation</Th>
              <Th>Action Title</Th>
              <Th>Category</Th>
              <Th>Due Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const ts = TYPE_STYLE_11[r.type];
              return (
                <tr key={r.id} className="row-hover group">
                  <td className="pl-4"></td>
                  <td className="px-4 py-3.5">
                     <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-bold text-[10px] ring-1 ring-inset ${PRIORITY_STYLE[r.priority]}`}>{r.priority}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.violationId}</td>
                  <td className="px-4 py-3.5 font-semibold text-ink-800">{r.title}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-ink-600">
                      <Icon name={ts.icon} className="w-3.5 h-3.5 opacity-60" />
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                     <span className={`font-mono text-[11px] ${r.overdue ? 'text-rose-600 font-bold' : 'text-ink-500'}`}>{r.due}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} />
    </Section>
  );
};
const ActionStepsPanel = ({ row }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const toggleStep = (idx) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Step-by-step resolution</h4>
          <span className="text-[10px] font-medium text-ink-500">{completedSteps.size}/{row.steps.length} completed</span>
        </div>
        <div className="space-y-2">
          {row.steps.map((s, i) => (
            <label key={i} className="flex items-start gap-3 rounded-lg bg-white p-3 ring-1 ring-ink-200 hover:ring-ink-300 transition-shadow cursor-pointer shadow-sm">
              <input type="checkbox" checked={completedSteps.has(i)} onChange={() => toggleStep(i)} className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
              <span className="text-[13px] text-ink-700 leading-snug">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 space-y-5">
        <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-2">Technical Rationale</div>
          <p className="text-[13px] text-ink-600 leading-relaxed italic">"{row.rationale}"</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-ink-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-800 transition-colors shadow-sm">Mark Category Resolved</button>
          <button className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50 shadow-sm"><Icon name="file" className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------ */
const PolicySuggestions = () => {
  const { POLICY_SUGGESTIONS } = window.MOCK;
  return (
    <Section eyebrow="Long-term Governance" title="AI Policy Recommendations" subtitle="Root-cause fixes to prevent recurring findings.">
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-4 p-5 min-w-max">
          {POLICY_SUGGESTIONS.map((p, i) => (
            <div key={i} className="w-[320px] rounded-xl bg-ink-50/50 p-5 ring-1 ring-ink-200 hover:bg-white hover:shadow-pop transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ring-1 ring-inset ${PRIORITY_STYLE[p.priority]}`}>{p.priority}</span>
                <Icon name="spark" className="w-4 h-4 text-brand-500 animate-pulse" />
              </div>
              <h5 className="font-bold text-ink-900 text-sm leading-tight mb-2 group-hover:text-brand-700 transition-colors">{p.title}</h5>
              <p className="text-[12px] text-ink-500 line-clamp-2 leading-relaxed mb-4">{p.rationale}</p>
              <div className="flex items-center justify-between border-t border-ink-100 pt-3 mt-auto">
                <span className="text-[11px] font-bold text-ink-700">{p.owner}</span>
                <button className="text-[11px] font-bold text-brand-600 hover:underline">Adopt Policy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------ */
/* Main page                                                     */
/* ------------------------------------------------------------ */
const Sod11Page = () => {
  return (
    <div data-screen-label="11 Remediation" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-11 · Remediation Stream"
        title="Execution & Accountability"
        subtitle="The central control plane for access risk remediation. Every finding is mapped to a dated task and a named owner."
      />
      <Sod11Kpis />
      <RemediationSummary />
      <RemediationTable />
      <PolicySuggestions />
    </div>
  );
};

window.Sod11Page = Sod11Page;
