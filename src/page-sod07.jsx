const { useState } = React;

/* Subtle neutral palette — area is identity, not severity. */
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

const ConflictMatrix = ({ selected, onSelect }) => {
  const { DUAL_PROCESSES, CONFLICT_MATRIX } = window.MOCK;
  const procs = DUAL_PROCESSES;
  const allCounts = [];
  procs.forEach(r => procs.forEach(c => {
    const v = getCount(r.key, c.key);
    if (v != null) allCounts.push(v);
  }));
  const maxV = Math.max(...allCounts);

  function getCount(a, b) {
    if (a === b) return null;
    const row = CONFLICT_MATRIX[a];
    if (row && b in row) return row[b];
    const rev = CONFLICT_MATRIX[b];
    if (rev && a in rev) return rev[a];
    return null;
  }

  return (
    <Section title="Interaction Heatmap" subtitle="Cross-process authorization overlaps highlighting systemic control weaknesses.">
      <div className="p-6">
        <div className="flex items-start gap-8 overflow-x-auto scrollbar-hide pb-4">
           <div className="flex-1">
             <table className="border-collapse" style={{ minWidth: 500 }}>
               <thead>
                 <tr>
                   <th className="w-24"></th>
                   {procs.map(c => (
                     <th key={c.key} className="p-1 pb-4 align-bottom">
                       <span className="origin-bottom-left -rotate-45 whitespace-nowrap text-[10px] font-bold text-ink-400 uppercase tracking-tighter" style={{ height: 40, lineHeight: '40px', display: 'block' }}>{c.label}</span>
                     </th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {procs.map(r => (
                   <tr key={r.key}>
                     <td className="pr-4 text-right py-1">
                        <span className="text-[11px] font-bold text-ink-900 uppercase tracking-tighter">{r.label}</span>
                     </td>
                     {procs.map(c => {
                       const v = getCount(r.key, c.key);
                       const isDiag = r.key === c.key;
                       const isSel = selected && ((selected.p1 === r.key && selected.p2 === c.key) || (selected.p1 === c.key && selected.p2 === r.key));
                       const intensity = v ? Math.max(0.1, v / maxV) : 0;
                       return (
                         <td key={c.key} className="p-0.5">
                           {isDiag ? <div className="w-9 h-9 bg-ink-50 rounded-md" /> : (
                             <button onClick={() => v != null && onSelect({ p1: r.key, p2: c.key, count: v })}
                               className={`w-9 h-9 rounded-md border text-[11px] font-bold transition-all hover:scale-110 shadow-sm ${isSel ? 'ring-2 ring-ink-900 ring-offset-2' : ''}`}
                               style={{ background: v ? `rgba(239, 68, 68, ${intensity})` : '#F8FAFC', borderColor: v ? '#EF444455' : '#E2E8F0', color: intensity > 0.5 ? '#fff' : '#7F1D1D' }}>
                               {v || '·'}
                             </button>
                           )}
                         </td>
                       )
                     })}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <div className="w-56 shrink-0 space-y-4">
              <div className="p-4 rounded-xl bg-ink-900 text-white shadow-sm">
                 <div className="text-[9px] font-bold uppercase tracking-widest text-ink-400 mb-2">Matrix Context</div>
                 <p className="text-[11px] font-semibold text-ink-200">The SO × Billing pair represents the highest risk with 22 concurrent controllers.</p>
              </div>
              <button className="w-full rounded-lg bg-ink-100 border border-ink-200 py-2 text-[11px] font-bold text-ink-700 hover:bg-ink-200 transition-colors uppercase tracking-widest" onClick={() => onSelect(null)}>Reset Heatmap</button>
           </div>
        </div>
      </div>
    </Section>
  );
};

const DualProcessTable = ({ matrixFilter, onClearMatrixFilter }) => {
  const { DUAL_PROCESS_ROWS, DUAL_PROCESSES } = window.MOCK;
  const [rows, setRows] = useState(DUAL_PROCESS_ROWS);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'severity', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 12;

  const procMap = Object.fromEntries(DUAL_PROCESSES.map(p => [p.key, p]));
  const toggle = id => setExpanded(s => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const setStatus = (id, status) => setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r));

  const filtered = rows
    .filter(r => !matrixFilter || ((r.p1 === matrixFilter.p1 && r.p2 === matrixFilter.p2) || (r.p1 === matrixFilter.p2 && r.p2 === matrixFilter.p1)))
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
                          {r.tcodes.slice(0,3).map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-ink-100 font-mono text-[10px] font-bold text-ink-600">{t}</span>)}
                       </div>
                    </td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                       <StatusBadge value={r.status} onChange={s => setStatus(r.id, s)} />
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
  <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Conflict Usage (Last 30 Days)</div>
      <div className="space-y-1.5">
        {row.execHistory.slice(0,3).map((h, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-2 rounded ring-1 ring-ink-100 text-xs font-semibold">
            <span className="font-mono text-ink-900">{h.date}</span>
            <TCode code={h.tcode} size="sm" />
            <span className="text-ink-600 truncate">{h.doc}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4">
       <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm mb-4">
         <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Audit Insight</div>
         <p className="text-xs font-semibold text-ink-700 leading-relaxed italic">"Active cross-process execution detected. Immediate segregation recommended."</p>
       </div>
       <button className="w-full rounded-lg bg-ink-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-800 shadow-sm uppercase tracking-widest">Execute Profile Split</button>
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
      <ConflictMatrix selected={matrixFilter} onSelect={setMatrixFilter} />
      <DualProcessTable matrixFilter={matrixFilter} onClearMatrixFilter={() => setMatrixFilter(null)} />
    </div>
  );
};

window.Sod07Page = Sod07Page;
