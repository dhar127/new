const {
  PieChart: P5_PieChart, Pie: P5_Pie, Cell: P5_Cell,
  BarChart: P5_BarChart, Bar: P5_Bar, XAxis: P5_XAxis, YAxis: P5_YAxis,
  CartesianGrid: P5_CartesianGrid, Tooltip: P5_Tooltip, Legend: P5_Legend,
  ResponsiveContainer: P5_ResponsiveContainer, LabelList: P5_LabelList,
} = Recharts;

const { useState, useMemo } = React;

const Sod05Kpis = () => {
  const k = window.MOCK.IMPACT_KPIS;
  const fmt$ = n => '$' + (n / 1_000_000).toFixed(1) + 'M';
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <StatCard label="MAPPED VIOLATIONS" value={k.totalMapped.toLocaleString()} delta={k.deltas.totalMapped} deltaInvertGood />
      <StatCard severity="Critical" label="HIGH EXPOSURE" value={k.financialExposureHigh} delta={k.deltas.financialExposureHigh} deltaInvertGood />
      <StatCard severity="Medium" label="MEDIUM EXPOSURE" value={k.financialExposureMed} />
      <StatCard severity="Low" label="LOW EXPOSURE" value={k.financialExposureLow} />
      <StatCard severity="Critical" label="MONEY AT RISK" value={fmt$(k.totalDollarExposure)} delta={k.deltas.totalDollarExposure / 1_000_000} deltaSuffix="M" deltaInvertGood />
    </div>
  );
};

const RiskQuantification = () => {
  const { IMPACT_SPLIT, FRAMEWORK_BREAKDOWN } = window.MOCK;
  const total = IMPACT_SPLIT.reduce((s, x) => s + x.count, 0);
  const [hover, setHover] = useState(null);
  const totalDollars = IMPACT_SPLIT.reduce((s, x) => s + x.dollars, 0);

  return (
    <Section title="Quantitative Impact Analysis" subtitle="Financial and operational risk distribution across the enterprise landscape.">
      <div className="grid grid-cols-12 gap-0 divide-x divide-ink-100">
        <div className="col-span-12 md:col-span-5 p-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Risk Distribution by Category</div>
          <div className="relative h-[240px]">
            <P5_ResponsiveContainer>
              <P5_PieChart>
                <P5_Pie
                  data={IMPACT_SPLIT} dataKey="count" nameKey="category" cx="50%" cy="50%"
                  innerRadius={72} outerRadius={100} paddingAngle={4} stroke="#fff" strokeWidth={4}
                  onMouseEnter={(_, i) => setHover(i)} onMouseLeave={() => setHover(null)}
                >
                  {IMPACT_SPLIT.map((d, i) => (
                    <P5_Cell key={i} fill={d.color} opacity={hover === null || hover === i ? 1 : 0.3} />
                  ))}
                </P5_Pie>
                <P5_Tooltip content={<DonutTooltip total={total} />} />
              </P5_PieChart>
            </P5_ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
                  {hover != null ? IMPACT_SPLIT[hover].category : 'Aggregate Risk'}
                </div>
                <div className="text-3xl font-bold tabular-nums text-ink-900">
                  {hover != null ? IMPACT_SPLIT[hover].count.toLocaleString() : total.toLocaleString()}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-ink-500">
                  {hover != null ? `${Math.round(IMPACT_SPLIT[hover].count / total * 100)}% Share` : `~$${(totalDollars / 1_000_000).toFixed(1)}M Total`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 p-6 bg-ink-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Compliance Framework Coverage</div>
          </div>
          <div className="space-y-3.5">
            {FRAMEWORK_BREAKDOWN.slice().sort((a, b) => b.count - a.count).map(f => {
              const max = Math.max(...FRAMEWORK_BREAKDOWN.map(x => x.count));
              const pct = (f.count / max) * 100;
              return (
                <div key={f.framework}>
                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-ink-900 w-16">{f.framework}</span>
                      <SeverityBadge value={f.criticality} />
                    </div>
                    <span className="font-mono font-bold text-ink-800">{f.count.toLocaleString()} <span className="font-normal text-ink-400 uppercase tracking-tighter">Violations</span></span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: pct + '%', background: SEV_HEX[f.criticality] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

const DonutTooltip = ({ active, payload, total }) => {
  if (!active || !payload || !payload.length || !payload[0].payload) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
      <div className="flex items-center gap-2 font-bold text-ink-900 mb-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
        {d.category}
      </div>
      <div className="text-ink-600 flex justify-between gap-4">
        <span>Count:</span> <b className="font-mono text-ink-900">{(d.count || 0).toLocaleString()}</b>
      </div>
      {d.dollars > 0 && <div className="text-ink-600 flex justify-between gap-4">
        <span>Exposure:</span> <b className="font-mono text-ink-900">${((d.dollars || 0) / 1_000_000).toFixed(1)}M</b>
      </div>}
    </div>
  );
};

const ImpactMatrix = () => {
  const { IMPACT_ROWS, IMPACT_CATEGORIES, EXPOSURE_LEVELS, FRAMEWORKS } = window.MOCK;
  const [cat, setCat] = useState(null);
  const [exp, setExp] = useState(null);
  const [fw, setFw] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'exposure', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const pageSize = 12;
  const expOrder = { High: 0, Medium: 1, Low: 2 };

  const filtered = IMPACT_ROWS
    .filter(r => !cat || r.category === cat)
    .filter(r => !exp || r.exposure === exp)
    .filter(r => !fw || r.frameworks.includes(fw))
    .filter(r => !query || (r.id + r.desc).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'exposure') return (expOrder[a.exposure] - expOrder[b.exposure]) * dir;
      return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir;
    });

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setCat(null); setExp(null); setFw(null); setQuery(''); };

  return (
    <Section title="Risk Inventory Matrix" action={<ExportButton label="Download Impact Set" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(cat || exp || fw || query)}>
        <Select value={cat} onChange={setCat} options={IMPACT_CATEGORIES} placeholder="All Categories" />
        <Select value={exp} onChange={setExp} options={EXPOSURE_LEVELS} placeholder="All Exposure Levels" />
        <Select value={fw} onChange={setFw} options={FRAMEWORKS} placeholder="All Frameworks" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by ID or description…" />
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <Th></Th>
              <Th sortKey="id" sort={sort} onSort={k => setSort({key:k, dir: sort.dir==='asc'?'desc':'asc'})}>Identifier</Th>
              <Th>Impact Description</Th>
              <Th>Impact Type</Th>
              <Th sortKey="exposure" sort={sort} onSort={k => setSort({key:k, dir: sort.dir==='asc'?'desc':'asc'})}>Severity</Th>
              <Th align="right">Metric ($)</Th>
              <Th>Affected Areas</Th>
              <Th>Frameworks</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const isOpen = expanded === r.id;
              return (
                <React.Fragment key={r.id}>
                  <tr onClick={() => setExpanded(isOpen ? null : r.id)} className="row-hover cursor-pointer group">
                    <td className="w-8 pl-4">
                      <Icon name="chevron" className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-900">{r.id}</td>
                    <td className="px-4 py-3.5 font-semibold text-ink-800 max-w-[320px] truncate">{r.desc}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-ink-600 tracking-tight uppercase text-[10px]">{r.category}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-1.5 py-0.5 rounded font-bold text-[10px] ring-1 ring-inset ${SEV_STYLE[r.exposure]}`}>{r.exposure}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-ink-900">
                      {r.dollars ? '$' + (r.dollars / 1_000_000).toFixed(2) + 'M' : '—'}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        {r.areas.slice(0,2).map(a => <span key={a} className="px-1.5 py-0.5 rounded bg-ink-100 text-[10px] font-bold text-ink-700">{a}</span>)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        {r.frameworks.map(f => <span key={f} className="font-mono text-[10px] font-bold text-brand-600">{f}</span>)}
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={8} className="px-12 py-5">
                        <DrilldownPanel row={r} />
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

const DrilldownPanel = ({ row }) => (
  <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Technical Summary</div>
      <p className="text-[13px] text-ink-700 leading-relaxed italic">"{row.desc}"</p>
    </div>
    <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
       <div>
         <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Framework Citation</div>
         <div className="space-y-1">
           {row.frameworks.map(f => <div key={f} className="text-xs font-semibold text-brand-700">● {f} Compliance Standard</div>)}
         </div>
       </div>
       <div className="flex flex-col justify-end">
         <button className="rounded-lg bg-ink-900 px-4 py-2 text-xs font-bold text-white hover:bg-ink-800 transition-shadow shadow-sm">Inspect Full Profile</button>
       </div>
    </div>
  </div>
);

const Sod05Page = () => {
  return (
    <div data-screen-label="05 Compliance Impact" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-05 · Impact Stream"
        title="Business Exposure Analysis"
        subtitle="Mapping identified SoD violations to quantifiable financial, operational, and regulatory risks."
      />
      <Sod05Kpis />
      <RiskQuantification />
      <ImpactMatrix />
    </div>
  );
};

window.Sod05Page = Sod05Page;
