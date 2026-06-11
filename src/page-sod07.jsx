
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
      <StatCard label="Cross-Process Sets" value={k.total} delta={k.deltas.total} deltaInvertGood metricKey="dualControl" />
      <StatCard severity="Critical" label="Critical Pairings" value={k.critical} delta={k.deltas.critical} deltaInvertGood metricKey="criticalViolations" />
      <StatCard severity="High" label="High Priority" value={k.high} delta={k.deltas.high} deltaInvertGood metricKey="highViolations" />
      <StatCard label="Unique Users" value={k.uniqueUsers} delta={k.deltas.uniqueUsers} deltaInvertGood metricKey="totalUsers" />
      <StatCard label="Impacted Areas" value={k.processAreas} metricKey="totalViolations" />
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

const ConflictInfoIcon = ({ procMap, rows }) => {
  const [show, setShow] = React.useState(false);
  const pairs = [...new Map(rows.map(r => [`${r.p1}:${r.p2}`, { p1: procMap[r.p1], p2: procMap[r.p2] }])).values()];
  return (
    <div className="relative inline-flex">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-ink-400 hover:text-brand-500 transition-colors focus:outline-none"
        aria-label="Process conflict legend"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
        </svg>
      </button>
      {show && (
        <div className="absolute left-6 top-0 z-50 w-72 rounded-lg border border-ink-200 bg-white shadow-pop p-3 text-[11px]">
          <div className="font-bold text-ink-700 mb-2 uppercase tracking-widest text-[10px]">Process Conflict Pairs</div>
          <div className="space-y-1">
            {pairs.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-ink-600">
                <span className="font-semibold text-ink-900">{p.p1?.label}</span>
                <span className="text-ink-400">×</span>
                <span className="font-semibold text-ink-900">{p.p2?.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DualProcessTable = ({ matrixFilter, onClearMatrixFilter }) => {
  const { DUAL_PROCESS_ROWS, DUAL_PROCESSES } = window.MOCK;
  const [rows, setRows] = useState(DUAL_PROCESS_ROWS);
  const [query, setQuery] = useState('');
  const updateStatus = (id, val) => setRows(rs => rs.map(r => r.id === id ? { ...r, status: val } : r));
  const [sevFilter, setSevFilter] = useState(null);
  const [conflictFilter, setConflictFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 12;

  const procMap = Object.fromEntries(DUAL_PROCESSES.map(p => [p.key, p]));
  const severities = ['Critical', 'High', 'Medium'];
  const conflictOptions = [...new Map(
    rows.map(r => [`${r.p1}:${r.p2}`, `${procMap[r.p1]?.label} \u00d7 ${procMap[r.p2]?.label}`])
  ).values()];

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
    .filter(r => !sevFilter || r.severity === sevFilter)
    .filter(r => !conflictFilter || `${procMap[r.p1]?.label} \u00d7 ${procMap[r.p2]?.label}` === conflictFilter)
    .filter(r => !query || (r.user + r.name).toLowerCase().includes(query.toLowerCase()));

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setQuery(''); setSevFilter(null); setConflictFilter(null); onClearMatrixFilter(); };

  return (
    <Section title="Granular Conflict Set" action={<ExportButton label="Export Detailed Evidence" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(query || matrixFilter || sevFilter || conflictFilter)}>
        <Select value={sevFilter} onChange={setSevFilter} options={severities} placeholder="All Severities" />
        <Select value={conflictFilter} onChange={setConflictFilter} options={conflictOptions} placeholder="All Process Conflicts" />
        <ConflictInfoIcon procMap={procMap} rows={rows} />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or ID..." />
      </FilterBar>

      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <Th></Th>
              <Th>User Identifier</Th>
              <Th>Process 1</Th>
              <Th>Process 2</Th>
              <Th>Conflict Codes</Th>
              <Th>Severity</Th>
              <Th>Status</Th>
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
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <select
                        value={r.status}
                        onChange={e => updateStatus(r.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase tracking-widest p-1.5 rounded ring-1 ring-inset border-none outline-none cursor-pointer ${
                          r.status === 'Resolved'    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                          r.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
                                                       'bg-ink-50 text-ink-600 ring-ink-200'
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={7} className="px-12 py-5">
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
        <div className="space-y-1.5 text-[11px]">
          <div><span className="font-bold text-ink-500">Identity:</span> <span className="font-mono font-bold text-ink-900">{row.user}</span></div>
          <div><span className="font-bold text-ink-500">Conflict:</span> <span className="text-ink-700">{p1.label} &times; {p2.label}</span></div>
          <div><span className="font-bold text-ink-500">T-Codes:</span> <span className="font-mono text-ink-700">{row.tcodes.join(', ')}</span></div>
          <div><span className="font-bold text-ink-500">Status:</span> <span className="text-ink-700">{row.status}</span></div>
          {row.assignee && <div><span className="font-bold text-ink-500">Assignee:</span> <span className="text-ink-700">{row.assignee}</span></div>}
        </div>
      </div>
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
