const {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip: RcTooltip, Legend,
  ResponsiveContainer, ReferenceLine, Area, AreaChart, ComposedChart,
  PieChart, Pie, Cell
} = Recharts;

const { useState, useEffect, useMemo } = React;

/* ============================================================ */
/* 1. Metric Banner — Executive Pulse                           */
/* ============================================================ */

function MetricBanner() {
  const { KPIS } = window.MOCK;
  const { severityBreakdown } = KPIS;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <window.StatCard label="Compliance Index" value={`${KPIS.complianceScore}`} sub="Maturity" delta={4} severity="Good" icon="shield" />
       
        <window.StatCard label="Violation Inventory" value={KPIS.totalViolations.toLocaleString()} sub="Total Sets" delta={24} deltaInvertGood icon="table" />
        <window.StatCard label="Immediate Triage" value={KPIS.critical} sub="Actionable" delta={-3} deltaInvertGood severity="High" icon="flame" />
        <div className="hidden xl:block">
          <window.StatCard label="Analytic Scope" value="4,287" sub="Identities" delta={12} icon="user" />
        </div>
      </div>
      
      {/* Severity Breakdown & Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col justify-center">
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SeverityCard label="Critical" count={severityBreakdown.critical} color="text-rose-600" bg="bg-rose-50" border="border-rose-100" />
              <SeverityCard label="High" count={severityBreakdown.high} color="text-orange-600" bg="bg-orange-50" border="border-orange-100" />
              <SeverityCard label="Medium" count={severityBreakdown.medium} color="text-amber-600" bg="bg-amber-50" border="border-amber-100" />
              <SeverityCard label="Low" count={severityBreakdown.low} color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
           </div>
        </div>
        <div className="lg:col-span-4 h-28 flex items-center justify-center bg-white rounded-xl ring-1 ring-ink-200 p-4 shadow-sm">
           <ResponsiveContainer width="40%" height="100%">
             <PieChart>
               <Pie
                 data={[
                   { name: 'Critical', value: severityBreakdown.critical, fill: '#E11D48' },
                   { name: 'High', value: severityBreakdown.high, fill: '#EA580C' },
                   { name: 'Medium', value: severityBreakdown.medium, fill: '#D97706' },
                   { name: 'Low', value: severityBreakdown.low, fill: '#2563EB' }
                 ]}
                 cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" stroke="none"
               />
               <RcTooltip content={<DonutTooltip />} />
             </PieChart>
           </ResponsiveContainer>
           <div className="ml-4 flex-1">
              <div className="text-[11px] font-bold text-ink-500 uppercase tracking-widest">Risk Distribution</div>
              <div className="text-[10px] text-ink-400 mt-1">Based on {KPIS.totalViolations} violations</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function SeverityCard({ label, count, color, bg, border }) {
  return (
    <div className={`p-4 rounded-xl border ${border} ${bg} flex flex-col shadow-sm`}>
       <span className={`text-[11px] font-bold uppercase tracking-widest ${color}`}>{label}</span>
       <span className={`text-[24px] font-bold font-mono tracking-tighter ${color} mt-1`}>{count}</span>
    </div>
  );
}

/* ============================================================ */
/* 2. Compliance Engine — Trend & Weakness                      */
/* ============================================================ */

function ComplianceEngine() {
  const { RUN_TREND, COMPLIANCE } = window.MOCK;
  return (
    <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200 shadow-sm flex items-center justify-between">
           <div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Current Score</div>
             <div className="text-[32px] font-bold font-mono tracking-tighter text-brand-600">{COMPLIANCE.maturityScore}%</div>
           </div>
           <div className="h-12 w-px bg-ink-200 mx-4" />
           <div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">SAP GRC Baseline</div>
             <div className="text-[32px] font-bold font-mono tracking-tighter text-emerald-600">{COMPLIANCE.benchmarkSAPGRC}%</div>
           </div>
        </div>

        <div className="flex-1 rounded-2xl bg-[#0B0F19] p-6 text-white shadow-xl ring-1 ring-white/10 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
             <window.Icon name="bot" className="h-4 w-4 text-brand-400" />
             <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Systemic Vulnerabilities</div>
          </div>
          <div className="flex-1 space-y-6">
            {(COMPLIANCE?.systemicWeaknesses || []).slice(0,4).map((title, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[13px] font-bold text-white group-hover:text-brand-400 transition-colors leading-snug">{title}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full transition-all duration-1000" style={{ width: `${85 - (i * 12)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-xl bg-brand-600 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/20">Execute Remediation Strategy</button>
        </div>
    </div>
  );
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
      <div className="font-bold text-ink-900">{data.name || 'Score'}: {data.value}{data.name ? '' : '%'}</div>
    </div>
  );
}

/* ============================================================ */
/* 3. Risk Radar — Top Priority Findings                         */
/* ============================================================ */

function RiskRadar() {
  const { CRITICAL_FINDINGS } = window.MOCK;
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = CRITICAL_FINDINGS.filter(f => filterSeverity === 'All' || f.severity === filterSeverity).slice(0, 8);

  return (
    <window.Section 
      title="Material Risk Inventory" 
      subtitle="High-exposure violations consolidated by financial and operational impact."
      action={
        <div className="flex items-center gap-2">
          <select 
            value={filterSeverity} 
            onChange={e => setFilterSeverity(e.target.value)}
            className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
          <window.ExportButton label="Export" size="sm" />
        </div>
      }
    >
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-50/50">
            <tr>
              <window.Th className="w-8"></window.Th>
              <window.Th>Identity</window.Th>
              <window.Th>Context</window.Th>
              <window.Th>Violation Signature</window.Th>
              <window.Th>Recommended Action</window.Th>
              <window.Th align="right">Scope</window.Th>
              <window.Th>Criticality</window.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((f, i) => (
              <React.Fragment key={i}>
                <tr className="row-hover cursor-pointer group" onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}>
                  <td className="px-4 py-3.5 w-8">
                     <window.Icon name="chevron" className={`w-4 h-4 text-ink-400 transition-transform ${expandedId === f.id ? 'rotate-90' : ''}`} />
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{f.user || f.id}</td>
                  <td className="px-4 py-3.5">
                     <span className="font-bold text-[10px] uppercase text-ink-500 tracking-wider bg-ink-100 px-2 py-0.5 rounded ring-1 ring-inset ring-ink-200">{f.area}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-ink-800">{f.desc}</td>
                  <td className="px-4 py-3.5 text-ink-600 max-w-[200px] truncate" title={f.action}>{f.action}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-ink-900">{f.users} IDs</td>
                  <td className="px-4 py-3.5">
                     <window.SeverityBadge value={f.severity} />
                  </td>
                </tr>
                {expandedId === f.id && (
                  <tr className="bg-ink-50/30 border-b border-ink-200">
                    <td colSpan={7} className="px-12 py-4 text-ink-700 text-[12px]">
                      <div className="flex flex-col gap-2">
                        <div><strong className="text-ink-900 mr-2">Detailed Action:</strong> {f.action}</div>
                        <div><strong className="text-ink-900 mr-2">Violation ID:</strong> <span className="font-mono">{f.id}</span></div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </window.Section>
  );
}

/* ============================================================ */
/* 4. Stream Grid — Category Navigation                         */
/* ============================================================ */

function StreamOverview({ onNavigate }) {
  const { CATEGORY_CARDS } = window.MOCK;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {CATEGORY_CARDS.map(c => (
        <button 
          key={c.key} 
          onClick={() => onNavigate(c.key)}
          className="group flex flex-col p-6 bg-white rounded-2xl ring-1 ring-ink-200 shadow-sm hover:ring-brand-500 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
             <window.Icon name="arrow" className="h-4 w-4 text-brand-500" />
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink-50 text-ink-600 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm ring-1 ring-inset ring-ink-200 group-hover:ring-brand-400">
              <window.Icon name={c.icon} className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
               <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">{c.code}</div>
               <window.SeverityBadge value={c.severity} />
            </div>
          </div>
          
          <h3 className="text-[16px] font-bold text-ink-900 tracking-tight mb-2 group-hover:text-brand-700 transition-colors">{c.title}</h3>
          <p className="text-[12px] text-ink-500 leading-relaxed mb-6 line-clamp-2">{c.blurb}</p>
          
          <div className="mt-auto pt-4 border-t border-ink-100 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
               <span className="text-[20px] font-bold text-ink-900 font-mono tracking-tighter">{c.count.toLocaleString()}</span>
               <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Sets</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-ink-50 flex items-center justify-center text-ink-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
               <window.Icon name="chevron" className="h-3 w-3" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ============================================================ */
/* 5. Main Page — Layout Assembly                                */
/* ============================================================ */

window.LaunchPage = function({ onNavigate }) {
  const [showCreateRunModal, setShowCreateRunModal] = React.useState(false);

  return (
    <div data-screen-label="01 Launch Dashboard" className="space-y-6 px-4 md:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Header Context */}
      <div className="flex flex-wrap items-end justify-between gap-6 pb-2 border-b border-ink-100">
         <div>
            <h1 className="text-[28px] font-bold text-ink-900 tracking-tight">Enterprise Security Assessment</h1>
            <div className="mt-1 flex items-center gap-2 text-[14px] text-ink-500">
               <span>Lotte Chemical PRD Run</span>
               <span className="h-1 w-1 rounded-full bg-ink-300" />
               <span className="font-mono font-bold text-brand-600 tracking-tight">{window.MOCK.RUN.id}</span>
            </div>
         </div>
       
      </div>

      <MetricBanner />
      
      <ComplianceEngine />

      <RiskRadar />

      <div className="pt-4">
        <div className="flex items-center justify-between mb-6 px-1">
           <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-400">Analysis Streams</div>
           <button className="text-[11px] font-bold text-brand-600 hover:underline uppercase tracking-widest">Advanced Filter</button>
        </div>
        <StreamOverview onNavigate={onNavigate} />
      </div>

      <footer className="pt-12 pb-6 text-center border-t border-ink-100">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
          KTern.AI SoD Agent · Intelligence Engine v2.0.4 · May 2026 Assessment Cycle
        </div>
      </footer>

      {/* Create Run Modal */}
      {showCreateRunModal && (
        <window.CreateRunModal 
          onClose={() => setShowCreateRunModal(false)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
