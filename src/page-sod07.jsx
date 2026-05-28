
const {
  BarChart: S07_BarChart, Bar: S07_Bar, XAxis: S07_XAxis, YAxis: S07_YAxis,
  CartesianGrid: S07_CartesianGrid, Tooltip: S07_Tooltip,
  ResponsiveContainer: S07_ResponsiveContainer, Cell: S07_Cell,
} = Recharts;

const { useState } = React;

const AREA_COLOR_07 = {
  Procurement: '#475569',
  Finance:     '#0F172A',
  OTC:         '#64748B',
  HR:          '#94A3B8',
  IT:          '#334155',
};

const Sod07Kpis = () => {
  const k = window.MOCK.DUAL_PROCESS_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <StatCard label="Cross-Process Sets" value={k.total} delta={k.deltas.total} deltaInvertGood />
      <StatCard severity="Critical" label="Fraud Pairings" value={k.critical} delta={k.deltas.critical} deltaInvertGood />
      <StatCard severity="High" label="High Priority" value={k.high} delta={k.deltas.high} deltaInvertGood />
      <StatCard label="Unique Users" value={k.uniqueUsers} delta={k.deltas.uniqueUsers} deltaInvertGood />
      <StatCard label="Impacted Areas" value={k.processAreas} />
    </div>
  );
};

const ConflictChart = ({ selected, onSelect }) => {
  const { CONFLICT_MATRIX, DUAL_PROCESSES } = window.MOCK;
  const procs = DUAL_PROCESSES;

  const data = [];
  procs.forEach(r => {
    procs.forEach(c => {
      if (r.key >= c.key) return;
      const row = CONFLICT_MATRIX[r.key];
      const val = row && c.key in row ? row[c.key]
        : (CONFLICT_MATRIX[c.key] && r.key in CONFLICT_MATRIX[c.key] ? CONFLICT_MATRIX[c.key][r.key] : null);
      if (val) data.push({ label: `${r.label} × ${c.label}`, p1: r.key, p2: c.key, count: val });
    });
  });
  data.sort((a, b) => b.count - a.count);
  const top = data.slice(0, 8);

  return (
    <Section title="Process Conflict Distribution" subtitle="Top cross-process authorization overlaps ranked by user count.">
      <div className="h-[300px] px-6 py-6">
        <S07_ResponsiveContainer width="100%" height="100%">
          <S07_BarChart data={top} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 160 }}>
            <S07_CartesianGrid stroke="#F1F5F9" horizontal={false} />
            <S07_XAxis type="number" hide />
            <S07_YAxis
              type="category"
              dataKey="label"
              width={160}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <S07_Tooltip
              cursor={{ fill: '#F8FAFC' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                    <div className="font-bold text-ink-900 mb-1">{d.label}</div>
                    <div className="flex justify-between gap-4 text-ink-600">
                      <span>Users in conflict:</span>
                      <b className="font-mono text-ink-900">{d.count}</b>
                    </div>
                  </div>
                );
              }}
            />
            <S07_Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              barSize={20}
              onClick={d => onSelect({ p1: d.p1, p2: d.p2, count: d.count })}
            >
              {top.map((d, i) => {
                const isSel = selected && (
                  (selected.p1 === d.p1 && selected.p2 === d.p2) ||
                  (selected.p1 === d.p2 && selected.p2 === d.p1)
                );
                return (
                  <S07_Cell
                    key={i}
                    fill={isSel ? '#0F172A' : d.count >= 15 ? '#EF4444' : d.count >= 8 ? '#F97316' : '#3B82F6'}
                    cursor="pointer"
                  />
                );
              })}
            </S07_Bar>
          </S07_BarChart>
        </S07_ResponsiveContainer>
      </div>
      {selected && (
        <div className="mx-6 mb-5 flex items-center justify-between rounded-lg bg-ink-50 px-4 py-2.5 ring-1 ring-ink-200 text-[12px]">
          <span className="font-bold text-ink-700">
            Filtered: <span className="text-ink-900">{selected.p1} × {selected.p2}</span> — {selected.count} users
          </span>
          <button
            onClick={() => onSelect(null)}
            className="text-[11px] font-bold text-ink-500 hover:text-ink-900 uppercase tracking-widest"
          >
            Clear
          </button>
        </div>
      )}
    </Section>
  );
};

const DualProcessTable = ({ matrixFilter, onClearMatrixFilter }) => {
  const { DUAL_PROCESS_ROWS, DUAL_PROCESSES } = window.MOCK;
  const [rows, setRows] = useState(DUAL_PROCESS_ROWS);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 12;

  const procMap = Object.fromEntries(DUAL_PROCESSES.map(p => [p.key, p]));

  const toggle = id => setExpanded(s => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const filtered = rows
    .filter(r => !matrixFilter || (
      (r.p1 === matrixFilter.p1 && r.p2 === matrixFilter.p2) ||
      (r.p1 === matrixFilter.p2 && r.p2 === matrixFilter.p1)
    ))
    .filter(r => !query || (r.user + r.name).toLowerCase().includes(query.toLowerCase()));

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Section title="Granular Conflict Set" action={<ExportButton label="Export Detailed Evidence" size="sm" />}>
      <FilterBar onClear={() => { setQuery(''); onClearMatrixFilter(); }} hasFilters={!!(query || matrixFilter)}>
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or ID…" />
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <Th></Th>
              <Th>User Identifier</Th>
              <Th>Control Axis 1</Th>
              <Th>Control Axis 2</Th>
              <Th>Conflict Codes</Th>
              <Th>Severity</Th>
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
                      <div className="font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.user}</div>
                      <div className="text-[10px] font-bold text-ink-400 uppercase">{r.name}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-ink-700 uppercase text-[10px] tracking-tight">{procMap[r.p1].label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-ink-700 uppercase text-[10px] tracking-tight">{procMap[r.p2].label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        {r.tcodes.slice(0, 3).map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-ink-100 font-mono text-[10px] font-bold text-ink-600">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={6} className="px-12 py-5">
                        <ExecutionHistory row={r} p1={procMap[r.p1]} p2={procMap[r.p2]} />
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

const ExecutionHistory = ({ row, p1, p2 }) => (
  <div className="grid grid-cols-12 gap-6 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">
        Conflict Usage — Last 30 Days
      </div>
      <div className="w-full">
        <div className="grid grid-cols-3 gap-x-4 px-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-400 border-b border-ink-100">
          <span>Date</span>
          <span>T-Code</span>
          <span>Document</span>
        </div>
        <div className="divide-y divide-ink-50">
          {row.execHistory.slice(0, 5).map((h, i) => (
            <div key={i} className="grid grid-cols-3 gap-x-4 px-2 py-2.5 text-xs hover:bg-ink-50 transition-colors rounded">
              <span className="font-mono font-bold text-ink-700">{h.date}</span>
              <TCode code={h.tcode} size="sm" />
              <span className="text-ink-600 truncate">{h.doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 space-y-3">
      <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Audit Insight</div>
        <p className="text-xs font-semibold text-ink-700 leading-relaxed italic">
          "Active cross-process execution detected. Immediate segregation recommended."
        </p>
      </div>
      <button className="w-full rounded-lg bg-ink-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-800 shadow-sm uppercase tracking-widest">
        Execute Profile Split
      </button>
    </div>
  </div>
);

const Sod07Page = () => {
  const [matrixFilter, setMatrixFilter] = useState(null);
  return (
    <div data-screen-label="07 Dual Process Control" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-07 · Process Stream"
        title="Cross-Process Conflict Analysis"
        subtitle="Identifying users with incompatible authorizations across split-control workflows."
      />
      <Sod07Kpis />
      <ConflictChart selected={matrixFilter} onSelect={setMatrixFilter} />
      <DualProcessTable matrixFilter={matrixFilter} onClearMatrixFilter={() => setMatrixFilter(null)} />
    </div>
  );
};

window.Sod07Page = Sod07Page;
