const { useState, useRef, useEffect } = React;

const EXPOSURE_BADGE_09 = {
  High:   'bg-rose-50 text-rose-700 ring-rose-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  Low:    'bg-blue-50 text-blue-700 ring-blue-200',
};

const Sod09Kpis = () => {
  const k = window.MOCK.OTC_KPIS;
  const fmt$ = n => '$' + (n / 1_000_000).toFixed(1) + 'M';
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="Cross-Step Users" value={k.totalViolators} delta={k.deltas.totalViolators} deltaInvertGood />
      <StatCard severity="Critical" label="Full-Cycle Control" value={k.fullCycleControllers} delta={k.deltas.fullCycleControllers} deltaInvertGood />
      <StatCard severity="High" label="Partial Overlap" value={k.partialControllers} delta={k.deltas.partialControllers} deltaInvertGood />
      <StatCard severity="Critical" label="Money at Risk" value={fmt$(k.totalDollarExposure)} delta={k.deltas.totalDollarExposure / 1_000_000} deltaSuffix="M" deltaInvertGood />
    </div>
  );
};

const OTCStepper = ({ selected, onSelect }) => {
  const { OTC_ROWS, OTC_STEPS } = window.MOCK;
  const stepStats = OTC_STEPS.map(s => ({
    ...s,
    count: OTC_ROWS.filter(r => r.steps.includes(s.key)).length,
    covered: selected.steps.includes(s.key),
  }));
  const aggregateMode = selected.id === '__aggregate';

  return (
    <Section title="Order-to-Cash Pipeline Analysis" subtitle="Granular visibility into user ownership across the critical revenue cycle.">
      <div className="px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
           <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Process Ownership visualization</div>
           <UserPicker selected={selected} onSelect={onSelect} />
        </div>
        
        <div className="flex items-stretch gap-2 overflow-x-auto scrollbar-hide">
          {stepStats.map((s, i) => (
            <StepCard key={s.key} step={s} index={i} totalUsers={OTC_ROWS.length} active={s.covered && !aggregateMode} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const StepCard = ({ step, index, totalUsers, active }) => {
  const pct = Math.round((step.count / totalUsers) * 100);
  return (
    <div className={`flex-1 min-w-[180px] rounded-xl p-5 transition-all ring-1 ring-inset ${active ? 'bg-rose-50 ring-rose-300 shadow-sm' : 'bg-white ring-ink-200 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`grid h-8 w-8 place-items-center rounded-lg font-mono text-[11px] font-bold ${active ? 'bg-rose-600 text-white' : 'bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200'}`}>
          0{index + 1}
        </div>
        {active && <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">Controlled</span>}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Process Step</div>
      <div className="text-[15px] font-bold text-ink-900 mb-4">{step.label}</div>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {step.tcodes.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-ink-50 ring-1 ring-inset ring-ink-200 text-[10px] font-mono font-bold text-ink-700">{t}</span>)}
      </div>
      <div className="pt-4 border-t border-ink-100">
        <div className="flex justify-between items-center text-[10px] font-bold text-ink-500 uppercase tracking-widest">
          <span>Ownership</span>
          <span className="text-ink-900 font-mono">{pct}%</span>
        </div>
        <div className="mt-2 h-1 w-full bg-ink-100 rounded-full overflow-hidden">
          <div className="h-full bg-ink-800 transition-all duration-1000" style={{ width: pct + '%' }} />
        </div>
      </div>
    </div>
  );
};

const UserPicker = ({ selected, onSelect }) => {
  const { OTC_ROWS } = window.MOCK;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-3 rounded-lg bg-ink-900 px-4 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-ink-800 transition-colors uppercase tracking-widest">
        <Icon name="user" className="w-3.5 h-3.5 text-ink-400" />
        {selected.id === '__aggregate' ? 'Aggregate View' : selected.user}
        <Icon name="chevronDown" className="w-3 h-3 text-ink-500" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-56 max-h-[300px] overflow-y-auto rounded-xl border border-ink-200 bg-white shadow-pop">
          {OTC_ROWS.map(u => (
            <button key={u.id} onClick={() => { onSelect(u); setOpen(false); }} className="flex w-full items-center justify-between p-3 text-[11px] hover:bg-ink-50 border-b border-ink-100 last:border-0">
              <span className="font-mono font-bold text-ink-900">{u.user}</span>
              <span className="font-bold text-ink-400 uppercase tracking-tighter">{u.steps.length}/4 Steps</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const OtcTable = () => {
  const { OTC_ROWS, OTC_STEPS } = window.MOCK;
  const [rows, setRows] = useState(OTC_ROWS);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'steps', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const pageSize = 10;

  const toggle = id => setExpanded(s => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const setStatus = (id, status) => setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r));

  const filtered = rows
    .filter(r => !query || (r.user + r.name).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.steps.length - a.steps.length));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Section title="Full Control Violation Set" action={<ExportButton label="Download Dataset" size="sm" />}>
      <FilterBar onClear={() => setQuery('')} hasFilters={!!query}>
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or ID…" />
      </FilterBar>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <Th></Th>
              <Th>User Identifier</Th>
              <Th>Process Path</Th>
              <Th>Auth Profile</Th>
              <Th align="right">Amount ($)</Th>
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
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.user}</td>
                    <td className="px-4 py-3.5">
                       <div className="flex gap-1">
                          {OTC_STEPS.map(s => <span key={s.key} className={`w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold ${r.steps.includes(s.key) ? 'bg-rose-500 text-white' : 'bg-ink-100 text-ink-300'}`}>{s.short[0]}</span>)}
                       </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-ink-600 uppercase text-[10px] tracking-tight">{r.steps.length} Steps Owned</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-ink-900">${(r.amount / 1_000).toLocaleString()}K</td>
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={6} className="px-12 py-5">
                        <OtcDrilldown row={r} />
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

const OtcDrilldown = ({ row }) => (
  <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
    <div className="col-span-12 lg:col-span-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Material Transactional History</div>
      <div className="space-y-1.5">
        {row.transactions.slice(0,3).map((t, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-2 rounded ring-1 ring-ink-100 text-xs font-semibold">
            <span className="font-mono text-ink-900">{t.date}</span>
            <TCode code={t.tcode} size="sm" />
            <span className="text-ink-600">{t.doc}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 space-y-4">
       <div className="rounded-xl bg-ink-900 p-4 text-white shadow-sm">
         <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Aggregate Exposure</div>
         <div className="text-2xl font-bold tabular-nums">${(row.amount / 1_000_000).toFixed(2)}M</div>
       </div>
       <button className="w-full rounded-lg border border-ink-200 bg-white py-2 text-xs font-bold text-ink-800 hover:bg-ink-50 uppercase tracking-widest">Execute Profile Split</button>
    </div>
  </div>
);

const Sod09Page = () => {
  const [selectedUser, setSelectedUser] = useState(window.MOCK.OTC_ROWS[0]);
  return (
    <div data-screen-label="09 OTC Control" className="space-y-6 px-7 py-6">
      <DetailHeader
        code="SOD-09 · Revenue Stream"
        title="OTC Lifecycle Control"
        subtitle="End-to-end monitoring of the Order-to-Cash process to detect high-risk ownership consolidation."
      />
      <Sod09Kpis />
      <OTCStepper selected={selectedUser} onSelect={setSelectedUser} />
      <OtcTable />
    </div>
  );
};

window.Sod09Page = Sod09Page;
