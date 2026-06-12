const { useState, useRef, useEffect } = React;

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

const EXPOSURE_BADGE_09 = {
  High:   'bg-rose-50 text-rose-700 ring-rose-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  Low:    'bg-blue-50 text-blue-700 ring-blue-200',
};

const Sod09Kpis = () => {
  const k = window.MOCK.OTC_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <StatCard label="Cross-Step Users" value={k.totalViolators} delta={k.deltas.totalViolators} deltaInvertGood metricKey="otcControl" />
      <StatCard 
        severity="Critical" 
        label="Full-Cycle Control" 
        value={k.fullCycleControllers} 
        delta={k.deltas.fullCycleControllers} 
        deltaInvertGood 
        metricKey="criticalViolations"
      />
      <StatCard severity="High" label="Partial Overlap" value={k.partialControllers} delta={k.deltas.partialControllers} deltaInvertGood metricKey="highViolations" />
    </div>
  );
};

const OTCStepper = ({ activeStepFilter, onStepClick }) => {
  const { OTC_ROWS, OTC_STEPS } = window.MOCK;
  const stepStats = OTC_STEPS.map(s => ({
    ...s,
    count: OTC_ROWS.filter(r => r.steps.includes(s.key)).length,
  }));

  return (
    <Section title="Order-to-Cash Pipeline Analysis" subtitle="Granular visibility into user ownership across the critical revenue cycle.">
      <div className="px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
           <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 flex items-center gap-2">
             <span>Process Step Filters</span>
             {activeStepFilter && (
               <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 ring-1 ring-rose-200 rounded px-1.5 py-0.5 text-[9px] font-bold animate-pulse">
                 Active Filter
               </span>
             )}
           </div>
           {activeStepFilter && (
             <button 
               onClick={() => onStepClick(null)}
               className="text-[10px] font-bold text-brand-600 hover:text-brand-500 uppercase tracking-widest transition-colors"
             >
               Clear Filter &times;
             </button>
           )}
        </div>
        
        <div className="flex items-stretch gap-2 overflow-x-auto scrollbar-hide">
          {stepStats.map((s, i) => (
            <StepCard 
              key={s.key} 
              step={s} 
              index={i} 
              active={activeStepFilter === s.key} 
              onClick={() => onStepClick(s.key)} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const StepCard = ({ step, index, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex-1 min-w-[180px] rounded-xl p-5 transition-all cursor-pointer ring-1 ring-inset ${active ? 'bg-rose-50 ring-rose-400 shadow-md border-b-4 border-rose-500' : 'bg-white ring-ink-200 hover:ring-ink-300 shadow-sm'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`grid h-8 w-8 place-items-center rounded-lg font-mono text-[11px] font-bold ${active ? 'bg-rose-600 text-white' : 'bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200'}`}>
          0{index + 1}
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${active ? 'bg-rose-600 text-white' : 'bg-ink-100 text-ink-600'}`}>
          {step.count} {step.count === 1 ? 'User' : 'Users'}
        </span>
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Process Step</div>
      <div className="text-[15px] font-bold text-ink-900 mb-4">{step.label}</div>
      <div className="flex flex-wrap gap-1.5">
        {step.tcodes.map(t => <span key={t} className="px-1.5 py-0.5 rounded bg-ink-50 ring-1 ring-inset ring-ink-200 text-[10px] font-mono font-bold text-ink-700">{t}</span>)}
      </div>
    </div>
  );
};

const OtcTable = ({ activeStepFilter }) => {
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
    .filter(r => !activeStepFilter || r.steps.includes(activeStepFilter))
    .filter(r => !query || (r.user + r.name).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.steps.length - a.steps.length));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Section title="Full Control Violation Set" action={<ExportButton label="Download Dataset" size="sm" />}>
      <FilterBar onClear={() => setQuery('')} hasFilters={!!query}>
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or ID…" />
      </FilterBar>

      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <Th></Th>
              <Th>User Identifier</Th>
              <Th>Process Path</Th>
              <Th>Auth Profile</Th>
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
                    <td className="px-4 py-3.5"><SeverityBadge value={r.severity} /></td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={5} className="px-12 py-5">
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
   
  </div>
);

const Sod09Page = ({ onNavigate, inline }) => {
  const [activeStepFilter, setActiveStepFilter] = useState(null);

  const handleStepClick = (stepKey) => {
    setActiveStepFilter(prev => prev === stepKey ? null : stepKey);
  };

  return (
    <div data-screen-label="09 OTC Control" className={inline ? "space-y-6 text-left animate-fade-in" : "space-y-6 px-7 py-6 text-left"}>
      {!inline && (
        <DetailHeader
          code="SOD-09 · Revenue Stream"
          title="OTC Lifecycle Control"
          subtitle="End-to-end monitoring of the Order-to-Cash process to detect high-risk ownership consolidation."
        />
      )}
      <Sod09Kpis />
      <OTCStepper activeStepFilter={activeStepFilter} onStepClick={handleStepClick} />
      <OtcTable activeStepFilter={activeStepFilter} />
    </div>
  );
};

window.Sod09Page = Sod09Page;
