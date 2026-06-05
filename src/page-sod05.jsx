const {
  PieChart: P5_PieChart, Pie: P5_Pie, Cell: P5_Cell,
  BarChart: P5_BarChart, Bar: P5_Bar, XAxis: P5_XAxis, YAxis: P5_YAxis,
  CartesianGrid: P5_CartesianGrid, Tooltip: P5_Tooltip, Legend: P5_Legend,
  ResponsiveContainer: P5_ResponsiveContainer, LabelList: P5_LabelList,
} = Recharts;

const { useState, useMemo } = React;

const Sod05Kpis = () => {
  const k = window.MOCK.IMPACT_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="MAPPED VIOLATIONS" value={k.totalMapped.toLocaleString()} delta={k.deltas.totalMapped} deltaInvertGood />
      <StatCard severity="Critical" label="CRITICAL" value="324" icon="alert" />
      <StatCard severity="High" label="HIGH" value="567" icon="bell" />
      <StatCard severity="Medium" label="MEDIUM" value="256" icon="exclamation" />
    </div>
  );
};

/* ─── Custom Tooltip for Bar Chart ─────────────────────────── */
const BarTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
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
    </div>
  );
};

const RiskQuantification = () => {
  const { IMPACT_SPLIT } = window.MOCK;
  const total = IMPACT_SPLIT.reduce((s, x) => s + x.count, 0);

  const sorted = IMPACT_SPLIT.slice().sort((a, b) => b.count - a.count);

  return (
    <Section
      title="Quantitative Impact Analysis"
      subtitle="Financial and operational risk distribution across the enterprise landscape."
    >
      <div className="p-6">
        {/* Chart header */}
        <div className="flex items-center justify-between mb-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
            Risk Distribution by Category
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Aggregate Risk · </span>
            <span className="text-[12px] font-bold tabular-nums text-ink-900">{total.toLocaleString()} Violations</span>
          </div>
        </div>

        {/* Horizontal bar chart */}
        <div className="h-[260px] mt-4">
          <P5_ResponsiveContainer width="100%" height="100%">
            <P5_BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 4, right: 80, left: 8, bottom: 4 }}
              barCategoryGap="28%"
            >
              <P5_CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e5e7eb" />
              <P5_XAxis
                type="number"
                tick={false}
                tickLine={false}
                axisLine={false}
              />
              <P5_YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 11, fill: '#374151', fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <P5_Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              <P5_Bar dataKey="count" radius={[0, 3, 3, 0]}>
                {sorted.map((d, i) => (
                  <P5_Cell key={i} fill={d.color} />
                ))}
                <P5_LabelList
                  dataKey="count"
                  position="right"
                  formatter={v => v.toLocaleString()}
                  style={{ fontSize: 11, fontWeight: 700, fill: '#374151', fontFamily: 'monospace' }}
                />
              </P5_Bar>
            </P5_BarChart>
          </P5_ResponsiveContainer>
        </div>

        {/* Legend row */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pl-1">
          {sorted.map(d => (
            <div key={d.category} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span className="text-[11px] font-semibold text-ink-600">{d.category}</span>
              <span className="text-[10px] font-mono text-ink-400">
                {Math.round(d.count / total * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ImpactMatrix = () => {
  const { IMPACT_ROWS, IMPACT_CATEGORIES, EXPOSURE_LEVELS } = window.MOCK;
  const [cat, setCat] = useState(null);
  const [exp, setExp] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'exposure', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const pageSize = 12;
  const expOrder = { High: 0, Medium: 1, Low: 2 };

  const filtered = IMPACT_ROWS
    .filter(r => !cat || r.category === cat)
    .filter(r => !exp || r.exposure === exp)
    .filter(r => !query || (r.id + r.desc).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'exposure') return (expOrder[a.exposure] - expOrder[b.exposure]) * dir;
      return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir;
    });

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setCat(null); setExp(null); setQuery(''); };

  return (
    <Section title="Risk Inventory Matrix" action={<ExportButton label="Download Impact Set" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(cat || exp || query)}>
        <Select value={cat} onChange={setCat} options={IMPACT_CATEGORIES} placeholder="All Impact Types" />
        <Select value={exp} onChange={setExp} options={EXPOSURE_LEVELS} placeholder="All Severity" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by ID or description…" />
      </FilterBar>

      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <Th></Th>
              <Th sortKey="id" sort={sort} onSort={k => setSort({ key: k, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}>Identifier</Th>
              <Th>Impact Description</Th>
              <Th>Impact Type</Th>
              <Th sortKey="exposure" sort={sort} onSort={k => setSort({ key: k, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}>Severity</Th>
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
                    <td className="px-4 py-3.5">
                      {(r.frameworks || []).includes('') && (
                        <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                          
                        </span>
                      )}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={6} className="px-12 py-5">
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
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Process Areas</div>
        <div className="space-y-1">
          {row.areas.map(a => (
            <div key={a} className="text-xs font-semibold text-ink-700">● {a}</div>
          ))}
        </div>
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