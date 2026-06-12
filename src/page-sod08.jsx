const { useState, useEffect, useRef } = React;

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

const APPROVAL_STYLE_08 = {
  Approved: { bar: '#22C55E' },
  Pending:  { bar: '#3B82F6' },
  Missing:  { bar: '#EF4444' },
};

const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86_400_000);

const Sod08Kpis = () => {
  const k = window.MOCK.EMERGENCY_ACCESS_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="Active Firefighters" value={k.totalUsers} delta={k.deltas.totalUsers} deltaInvertGood metricKey="emergencyAccess" />
      <StatCard severity="Critical" label="Unapproved Access" value={k.unapprovedAccess} delta={k.deltas.unapprovedAccess} deltaInvertGood metricKey="criticalViolations" />
      <StatCard severity="High" label="Over 30 Days" value={k.prolongedAssignments} delta={k.deltas.prolongedAssignments} deltaInvertGood metricKey="highViolations" />
      <StatCard severity="Medium" label="AI Anomaly Flags" value={k.anomalyFlags} delta={k.deltas.anomalyFlags} deltaInvertGood metricKey="mediumViolations" />
    </div>
  );
};

const UsageTimeline = () => {
  const { EMERGENCY_ACCESS_ROWS, FIREFIGHTER_TIMELINE_START, FIREFIGHTER_TIMELINE_END } = window.MOCK;
  const totalDays = daysBetween(FIREFIGHTER_TIMELINE_START, FIREFIGHTER_TIMELINE_END);
  const [hover, setHover] = useState(null);

  const rows = EMERGENCY_ACCESS_ROWS.slice().sort((a, b) => {
    const score = r => (r.approval === 'Missing' ? 2 : r.anomalyFlag ? 1 : 0);
    return score(b) - score(a);
  });

  // Build month tick marks between start and end
  const monthTicks = (() => {
    const ticks = [];
    const start = new Date(FIREFIGHTER_TIMELINE_START);
    const end = new Date(FIREFIGHTER_TIMELINE_END);
    // Start from the 1st of the month after (or equal to) the start date
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cursor <= end) {
      const dayOffset = daysBetween(FIREFIGHTER_TIMELINE_START, cursor.toISOString().slice(0, 10));
      const pct = Math.max(0, Math.min(100, (dayOffset / totalDays) * 100));
      ticks.push({
        label: cursor.toLocaleString('default', { month: 'short', year: '2-digit' }),
        pct,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return ticks;
  })();

  return (
    <Section
      title={
        <span className="inline-flex items-center">
          Emergency Usage Chronology
          <InfoTooltip content={
            <div className="space-y-1.5">
              <div className="font-bold text-ink-900 mb-1 text-[10px] uppercase tracking-wider">Bar Color = Access Duration:</div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span><b>Green</b>: &le;15 days — within policy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span><b>Amber</b>: 16–30 days — review required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span><b>Red</b>: &gt;30 days — policy breach</span>
              </div>
            </div>
          } maxWidth={240} />
        </span>
      }
      subtitle="Time-series visualization of firefighter ID activation windows."
    >
      <div className="px-6 py-8">
        {/* Always-visible legend */}
        <div className="flex items-center gap-4 mb-4 text-[11px] text-ink-600">
          <span className="font-bold uppercase tracking-widest text-ink-400 text-[10px]">Access Duration:</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-emerald-500 shrink-0" /> &le;15 days (Acceptable)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-amber-400 shrink-0" /> 16–30 days (Warning)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-rose-500 shrink-0" /> &gt;30 days (Policy Breach)</span>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="relative min-w-[800px]">
            {/* Month header */}
            <div className="flex border-b border-ink-100 pb-2 mb-4">
              <div className="w-40 shrink-0 text-[10px] font-bold uppercase tracking-widest text-ink-400" />
              <div className="relative flex-1 h-5">
                {monthTicks.map((tick, i) => (
                  <span
                    key={i}
                    className="absolute text-[10px] font-bold uppercase tracking-widest text-ink-400 -translate-x-1/2"
                    style={{ left: tick.pct + '%' }}
                  >
                    {tick.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Gridlines behind bars */}
            <div className="relative">
              <div className="absolute inset-0 flex pointer-events-none" style={{ left: '10rem' }}>
                {monthTicks.map((tick, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-ink-100"
                    style={{ left: tick.pct + '%' }}
                  />
                ))}
              </div>

              <div className="space-y-2">
                {rows.map(r => (
                  <TimelineRow
                    key={r.id}
                    row={r}
                    totalDays={totalDays}
                    timelineStart={FIREFIGHTER_TIMELINE_START}
                    onHover={setHover}
                  />
                ))}
              </div>
            </div>

            {hover && (
              <div className="pointer-events-none fixed z-[9999] rounded-xl border border-ink-200 bg-white p-3 shadow-pop text-[11px]"
                style={{ top: hover.y - 10, left: hover.x, transform: 'translate(-50%, -100%)' }}>
                <div className="font-bold text-ink-900 mb-1">{hover.row.user} · {hover.row.ffId}</div>
                <div className="text-ink-600 font-mono mb-2">{hover.row.start} to {hover.row.end}</div>
                <div className="flex gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-ink-900 text-white font-bold">{hover.duration} Days</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold ring-1 ring-inset ring-blue-200">{hover.row.approval}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
const TimelineRow = ({ row, totalDays, timelineStart, onHover }) => {
  const startDay = Math.max(0, daysBetween(timelineStart, row.start));
  const endDay = daysBetween(timelineStart, row.end);
  const duration = daysBetween(row.start, row.end);
  const left = (startDay / totalDays) * 100;
  const width = Math.max(2, ((endDay - startDay) / totalDays) * 100);
  const barColor = duration > 30 ? '#EF4444' : duration > 15 ? '#F59E0B' : '#22C55E';

  return (
    <div className="flex items-center group h-10 hover:bg-ink-50/50 rounded-lg transition-colors px-2">
      <div className="w-40 shrink-0 pr-4">
        <div className="font-mono text-[11px] font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{row.user}</div>
        <div className="text-[10px] font-bold text-ink-400 uppercase tracking-tighter">{row.ffId}</div>
      </div>
      <div className="relative flex-1 h-full flex items-center">
        <div
          className="h-2 rounded-full cursor-pointer transition-all hover:h-4 hover:shadow-md"
          style={{ left: left + '%', width: width + '%', background: barColor, position: 'absolute' }}
          onMouseMove={e => {
             onHover({ row, duration: daysBetween(row.start, row.end), x: e.clientX, y: e.clientY });
          }}
          onMouseLeave={() => onHover(null)}
        />
      </div>
    </div>
  );
};

const EmergencyAccessTable = () => {
  const { EMERGENCY_ACCESS_ROWS, APPROVAL_STATUSES } = window.MOCK;
  const [rows, setRows] = useState(EMERGENCY_ACCESS_ROWS);
  const [query, setQuery] = useState('');
  const [approvalFilter, setApprovalFilter] = useState(null);
  const [anomalyFilter, setAnomalyFilter] = useState(null);
  const [sort, setSort] = useState({ key: 'duration', dir: 'desc' });
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
    .filter(r => !query || (r.user + r.ffId).toLowerCase().includes(query.toLowerCase()))
    .filter(r => !approvalFilter || r.approval === approvalFilter)
    .filter(r => anomalyFilter === null || (anomalyFilter === 'Flagged' ? r.anomalyFlag : !r.anomalyFlag))
    .sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      return (daysBetween(a.start, a.end) - daysBetween(b.start, b.end)) * dir;
    });
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const clear = () => { setQuery(''); setApprovalFilter(null); setAnomalyFilter(null); };

  return (
    <Section title="Firefighter Activation Log" action={<ExportButton label="Export Usage Data" size="sm" />}>
      <FilterBar onClear={clear} hasFilters={!!(query || approvalFilter || anomalyFilter)}>
        <Select value={approvalFilter} onChange={setApprovalFilter} options={APPROVAL_STATUSES} placeholder="All Approval Statuses" />
        <Select value={anomalyFilter} onChange={setAnomalyFilter} options={['Flagged', 'Nominal']} placeholder="All Anomaly Flags" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search by User or FFID..." />
      </FilterBar>

      <div className="overflow-auto max-h-[480px]">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <Th></Th>
              <Th>User Identifier</Th>
              <Th>Firefighter Object</Th>
              <Th align="right">
                <span className="inline-flex items-center justify-end">
                  Window (Days)
                  <InfoTooltip content={
                    <div className="space-y-1.5">
                      <div className="font-bold text-ink-900 mb-1 text-[10px] uppercase tracking-wider">Access Duration Policy:</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <span><b>Green (Nominal)</b>: &le;15 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <span><b>Yellow (Warning)</b>: 16–30 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                        <span><b>Red (Critical)</b>: &gt;30 days</span>
                      </div>
                    </div>
                  } maxWidth={220} />
                </span>
              </Th>
              <Th align="right">Log Volume</Th>
              <Th>Approval Status</Th>
              <Th>Anomaly Flag</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {paged.map(r => {
              const dur = daysBetween(r.start, r.end);
              const isOpen = expanded.has(r.id);
              return (
                <React.Fragment key={r.id}>
                  <tr onClick={() => toggle(r.id)} className="row-hover cursor-pointer group">
                    <td className="pl-4">
                      <Icon name="chevron" className={`w-3.5 h-3.5 text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{r.user}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-ink-700">{r.ffId}</div>
                      <div className="text-[10px] font-bold text-ink-400 uppercase">{r.role}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono font-bold text-ink-900">{dur}d</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${dur > 30 ? 'bg-red-600' : dur > 15 ? 'bg-yellow-500' : 'bg-green-600'}`}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-ink-600">{r.usage}</td>
                    <td className="px-4 py-3.5">
                       <span className="font-bold text-[10px] uppercase text-ink-700 px-2 py-0.5 rounded bg-ink-100 ring-1 ring-inset ring-ink-200">{r.approval}</span>
                    </td>
                    <td className="px-4 py-3.5">
                       {r.anomalyFlag ? <span className="text-rose-600 font-bold uppercase text-[9px] tracking-widest ring-1 ring-rose-200 bg-rose-50 px-1.5 py-0.5 rounded">Anomaly</span> : <span className="text-ink-300 font-bold text-[9px] uppercase tracking-widest">Nominal</span>}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-ink-50/30">
                      <td colSpan={8} className="px-12 py-5">
                        <UsageLog row={r} />
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

const getStatusColor = (duration) => {
  if (duration > 30) return { bg: 'bg-red-50', ring: 'ring-red-200', dot: 'bg-red-600', label: 'Critical', text: 'text-red-700' };
  if (duration > 15) return { bg: 'bg-yellow-50', ring: 'ring-yellow-200', dot: 'bg-yellow-500', label: 'Warning', text: 'text-yellow-700' };
  return { bg: 'bg-green-50', ring: 'ring-green-200', dot: 'bg-green-600', label: 'Approved', text: 'text-green-700' };
};

const UsageLog = ({ row }) => {
  const duration = daysBetween(row.start, row.end);
  const status = getStatusColor(duration);
  
  return (
    <div className="grid grid-cols-12 gap-8 border-l-4 border-ink-200 pl-6">
      <div className="col-span-12 lg:col-span-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Activation Sequence ({row.log.length} Entries)</div>
        <div className="space-y-1.5">
          {row.log.slice(0,5).map((l, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-2 rounded ring-1 ring-ink-100 text-xs">
              <span className="font-mono font-bold text-ink-900">{l.date}</span>
              <TCode code={l.tcode} size="sm" />
              <span className="text-ink-600 truncate">{l.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
         <div className="rounded-xl bg-white p-4 ring-1 ring-ink-200 shadow-sm">
           <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Policy Rationale</div>
           <p className="text-xs font-semibold text-ink-700">Account usage detected outside standard maintenance window. Requires immediate re-attestation.</p>
         </div>
         <div className={`rounded-lg ${status.bg} px-4 py-3 ring-1 ring-inset ${status.ring} flex items-center gap-3`}>
           <div className={`w-3 h-3 rounded-full ${status.dot}`}></div>
           <div>
             <div className={`text-[10px] font-bold uppercase tracking-widest ${status.text}`}>{status.label}</div>
             <div className={`text-xs font-semibold ${status.text}`}>{duration}d Window</div>
           </div>
         </div>
      </div>
    </div>
  );
};

const Sod08Page = ({ onNavigate, inline }) => {
  return (
    <div data-screen-label="08 Emergency Access" className={inline ? "space-y-6 text-left animate-fade-in" : "space-y-6 px-7 py-6 text-left"}>
      {!inline && (
        <DetailHeader
          code="SOD-08 · Emergency Stream"
          title="Privileged Access Monitoring"
          subtitle="Tracking the lifecycle and behavioral integrity of Firefighter ID assignments."
        />
      )}
      <Sod08Kpis />
      <UsageTimeline />
      <EmergencyAccessTable />
    </div>
  );
};

window.Sod08Page = Sod08Page;
