const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip: RcTooltip,
  ResponsiveContainer, Cell
} = Recharts;

const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================ */
/* AI Assistance Hook — calls Claude API for expanded row       */
/* ============================================================ */
function useAIAnalysis(finding, enabled) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const fetchedRef              = useRef(false);

  useEffect(() => {
    if (!enabled || !finding || fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    setAnalysis(null);
    setError(null);

    setTimeout(() => {
      try {
        const mockAnalyses = {
          'Immediate': {
            rootCause: 'User has accumulated conflicting role assignments during organizational restructuring. Combined authorities create unauthorized transaction paths that bypass system controls.',
            riskRationale: 'This pattern enables fraudulent transactions with high financial impact. Potential for unauthorized approvals, creation, and payment without proper segregation.',
            remediationSteps: [
              'Immediately revoke conflicting role from user in production system',
              'Audit all transactions by this user in past 90 days for anomalies',
              'Implement compensating controls until role reassignment is complete'
            ],
            urgency: 'Immediate',
            estimatedImpact: 'High fraud exposure'
          },
          'Within 30 days': {
            rootCause: 'Account retains legacy system access after system migration. Dual account maintaining outdated authorization paths.',
            riskRationale: 'Redundant access increases attack surface and creates compliance gaps. Audit trails may be incomplete across systems.',
            remediationSteps: [
              'Validate business need for dual account maintenance',
              'Document justified access requirements in compliance system',
              'Schedule decommissioning of legacy account within 30 days'
            ],
            urgency: 'Within 30 days',
            estimatedImpact: 'Moderate audit risk'
          },
          'Within 90 days': {
            rootCause: 'Manager-level permission creep occurred through incremental access grants. No periodic access review detected the accumulation.',
            riskRationale: 'Over-privileged accounts increase security incident risk. Complicate disaster recovery and segregation of duties validation.',
            remediationSteps: [
              'Conduct full access review for this role category',
              'Remove non-essential permissions using least-privilege principle',
              'Implement quarterly access certification process'
            ],
            urgency: 'Within 90 days',
            estimatedImpact: 'Lower priority remediation'
          }
        };

        const severityMap = {
          'CRITICAL': mockAnalyses['Immediate'],
          'HIGH': mockAnalyses['Within 30 days'],
          'MEDIUM': mockAnalyses['Within 90 days']
        };

        const analysisData = severityMap[finding.severity] || mockAnalyses['Within 30 days'];
        setAnalysis(analysisData);
        setLoading(false);
      } catch (err) {
        setError('Failed to generate analysis.');
        setLoading(false);
      }
    }, 400);
  }, [enabled, finding]);

  return { analysis, loading, error };
}

/* ============================================================ */
/* SOD Feature Badge — small inline chip                        */
/* ============================================================ */
function SodBadge({ id }) {
  const colors = {
    'SOD-01': 'bg-violet-100 text-violet-700 ring-violet-200',
    'SOD-02': 'bg-sky-100 text-sky-700 ring-sky-200',
    'SOD-03': 'bg-teal-100 text-teal-700 ring-teal-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ring-1 ring-inset ${colors[id] || 'bg-ink-100 text-ink-500 ring-ink-200'}`}>
      <span className="w-1 h-1 rounded-full bg-current opacity-70" />
      {id}
    </span>
  );
}


  

/* ============================================================ */
/* 1. Unified Compliance Overview Card          [SOD-02]        */
/* ============================================================ */
function ComplianceOverviewCard() {
  const { KPIS, COMPLIANCE } = window.MOCK;
  const current  = COMPLIANCE.maturityScore;
  const baseline = COMPLIANCE.benchmarkSAPGRC;
  const delta    = current - baseline;
  const isAbove  = delta >= 0;
  const isAtRisk = current < 60;
  const isWarn   = current >= 60 && current < 75;

  const status = isAtRisk
    ? { ring: 'ring-rose-300',    bg: 'bg-rose-50',    text: 'text-rose-700',    bar: 'bg-rose-500',    label: 'At Risk',         labelBg: 'bg-rose-100 text-rose-700'    }
    : isWarn
    ? { ring: 'ring-amber-300',   bg: 'bg-amber-50',   text: 'text-amber-700',   bar: 'bg-amber-500',   label: 'Needs Attention', labelBg: 'bg-amber-100 text-amber-700'  }
    : { ring: 'ring-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', label: 'Healthy',         labelBg: 'bg-emerald-100 text-emerald-700' };

  return (
    <div className={`rounded-2xl bg-white ring-2 ${status.ring} shadow-sm p-5 flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <window.Icon name="shield" className="w-4 h-4 text-ink-500" strokeWidth={1.5} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-500">Compliance Index</span>
          <SodBadge id="SOD-02" />
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.labelBg}`}>{status.label}</span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-ink-100">
        <div className={`flex flex-col items-center py-3 px-3 rounded-l-xl ${status.bg}`}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Current Score</span>
          <span className={`text-[32px] font-bold font-mono tracking-tighter ${status.text}`}>{current}%</span>
        </div>
        <div className="flex flex-col items-center py-3 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">Analytic Scope</span>
          <span className="text-[32px] font-bold font-mono tracking-tighter text-ink-800">4,287</span>
          <span className="text-[10px] text-ink-400 font-medium">Identities</span>
        </div>
        <div className="flex flex-col items-center py-3 px-3 rounded-r-xl bg-emerald-50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">SAP GRC Baseline</span>
          <span className="text-[32px] font-bold font-mono tracking-tighter text-emerald-600">{baseline}%</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1.5">
          <span>Score vs Baseline</span>
          <span className={isAbove ? 'text-emerald-600' : 'text-rose-600'}>
            {isAbove ? '+' : ''}{delta}% vs SAP GRC
          </span>
        </div>
        <div className="relative h-3 bg-ink-100 rounded-full overflow-hidden">
          <div className="absolute top-0 bottom-0 w-0.5 bg-emerald-500 z-10" style={{ left: `${baseline}%` }} />
          <div className={`h-full rounded-full transition-all duration-700 ${status.bar}`} style={{ width: `${current}%` }} />
        </div>
        <div className="flex justify-between text-[9px] text-ink-400 mt-1">
          <span>0%</span>
          <span className="text-emerald-600 font-bold">▲ Baseline {baseline}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 2. Single Risk Distribution Panel            [SOD-01]        */
/* ============================================================ */
function RiskDistributionPanel() {
  const { KPIS } = window.MOCK;
  const { severityBreakdown } = KPIS;
  const total = KPIS.totalViolations;

  const levels = [
    { label: 'Critical', count: severityBreakdown.critical, color: '#E11D48', bg: 'bg-rose-50',   border: 'border-rose-200',   text: 'text-rose-700'   },
    { label: 'High',     count: severityBreakdown.high,     color: '#EA580C', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
    { label: 'Medium',   count: severityBreakdown.medium,   color: '#D97706', bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700'  },
    { label: 'Low',      count: severityBreakdown.low,      color: '#2563EB', bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700'   },
  ];

  return (
    <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <window.Icon name="table" className="w-4 h-4 text-ink-500" strokeWidth={1.5} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-500">Risk Distribution</span>
          <SodBadge id="SOD-01" />
        </div>
        <span className="text-[11px] font-bold text-ink-400">{total.toLocaleString()} total violations</span>
      </div>

      <div className="flex h-4 rounded-full overflow-hidden gap-px">
        {levels.map(l => (
          <div
            key={l.label}
            className="h-full transition-all duration-700"
            style={{ width: `${(l.count / total) * 100}%`, backgroundColor: l.color }}
            title={`${l.label}: ${l.count}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {levels.map(l => (
          <div key={l.label} className={`flex flex-col p-3 rounded-xl border ${l.border} ${l.bg}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${l.text}`}>{l.label}</span>
            </div>
            <span className={`text-[22px] font-bold font-mono ${l.text}`}>{l.count}</span>
            <span className="text-[10px] text-ink-400 mt-0.5">{((l.count / total) * 100).toFixed(1)}% of total</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* 3. Systemic Vulnerabilities                  [SOD-02]        */
/* ============================================================ */
function ComplianceEngine() {
  const { COMPLIANCE } = window.MOCK;

  return (
    <div className="rounded-2xl bg-[#0B0F19] p-6 text-white shadow-xl ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <window.Icon name="bot" className="h-4 w-4 text-brand-400" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Systemic Vulnerabilities</div>
          <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ring-1 ring-inset bg-sky-900/60 text-sky-300 ring-sky-700">SOD-02</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
          <span className="inline-block w-8 h-1 rounded-full bg-brand-600" />
          Exposure Coverage %
        </div>
      </div>
      <p className="text-[11px] text-white/40 mb-6 ml-6">
        Bar shows what % of your user population is exposed to this vulnerability pattern. Marker at 50% = alert threshold.
      </p>

      <div className="space-y-5">
        {(COMPLIANCE?.systemicWeaknesses || []).slice(0, 4).map((title, i) => {
          const pct = 85 - i * 12;
          const risk = pct >= 75 ? { text: 'Severe', color: 'text-rose-400' }
                     : pct >= 55 ? { text: 'High',   color: 'text-orange-400' }
                     :             { text: 'Medium', color: 'text-amber-400' };
          return (
            <div key={i} className="group cursor-default">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] font-bold text-white group-hover:text-brand-400 transition-colors leading-snug flex-1 pr-4">{title}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold uppercase ${risk.color}`}>{risk.text}</span>
                  <span className="text-[13px] font-bold font-mono text-white/70">{pct}%</span>
                </div>
              </div>
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
                <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '50%' }} />
              </div>
              <div className="flex justify-between text-[9px] text-white/20 mt-0.5">
                <span>0%</span>
                <span>▲ 50% alert threshold</span>
                <span>100% users exposed</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-8 w-full rounded-xl bg-brand-600 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/20">
        Execute Remediation Strategy
      </button>
    </div>
  );
}

/* ============================================================ */
/* 4. AI-Assisted Expanded Row                                  */
/* ============================================================ */
function AIExpandedRow({ finding }) {
  const { analysis, loading, error } = useAIAnalysis(finding, true);

  if (loading) return (
    <tr className="bg-ink-50/30 border-b border-ink-200">
      <td colSpan={7} className="px-12 py-6">
        <div className="flex items-center gap-3 text-ink-400">
          <span className="inline-block w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-[12px] font-medium">AI is analysing this violation…</span>
        </div>
      </td>
    </tr>
  );

  if (error || !analysis) return (
    <tr className="bg-ink-50/30 border-b border-ink-200">
      <td colSpan={7} className="px-12 py-4 text-[12px] text-ink-500">
        <div className="flex flex-col gap-2">
          <div><strong className="text-ink-900 mr-2">Action:</strong>{finding.action}</div>
          <div><strong className="text-ink-900 mr-2">Violation ID:</strong><span className="font-mono">{finding.id}</span></div>
          {error && <div className="text-rose-500 text-[11px]">{error}</div>}
        </div>
      </td>
    </tr>
  );

  const urgencyColor = analysis.urgency === 'Immediate'
    ? 'bg-rose-100 text-rose-700 ring-rose-200'
    : analysis.urgency === 'Within 30 days'
    ? 'bg-amber-100 text-amber-700 ring-amber-200'
    : 'bg-blue-100 text-blue-700 ring-blue-200';

  return (
    <tr className="border-b border-ink-200">
      <td colSpan={7} className="px-8 py-5 bg-gradient-to-b from-ink-50/60 to-white">
        <div className="flex items-center gap-2 mb-4">
          <window.Icon name="bot" className="w-4 h-4 text-brand-600" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">AI-Assisted Analysis</span>
          <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ring-1 ring-inset ${urgencyColor}`}>
            {analysis.urgency}
          </span>
          <span className="text-[10px] font-semibold text-ink-500 bg-ink-100 px-2 py-0.5 rounded-full">
            {analysis.estimatedImpact}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white ring-1 ring-ink-200 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-2">Root Cause</div>
            <p className="text-[12px] text-ink-700 leading-relaxed">{analysis.rootCause}</p>
          </div>
          <div className="rounded-xl bg-rose-50 ring-1 ring-rose-100 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-2">Risk Rationale</div>
            <p className="text-[12px] text-ink-700 leading-relaxed">{analysis.riskRationale}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 ring-1 ring-emerald-100 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">Remediation Steps</div>
            <ol className="space-y-1.5">
              {(analysis.remediationSteps || []).map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-ink-700">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-3 flex gap-6 text-[11px] text-ink-400">
          <span><strong className="text-ink-600">Violation ID:</strong> <span className="font-mono">{finding.id}</span></span>
          <span><strong className="text-ink-600">Affected Users:</strong> {finding.users} identities in scope</span>
          <span><strong className="text-ink-600">Area:</strong> {finding.area}</span>
        </div>
      </td>
    </tr>
  );
}

/* ============================================================ */
/* 5. Risk Radar — Material Risk Inventory      [SOD-03]        */
/* ============================================================ */
function RiskRadar() {
  const { CRITICAL_FINDINGS } = window.MOCK;
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [expandedId, setExpandedId]         = useState(null);

  const filtered = CRITICAL_FINDINGS
    .filter(f => filterSeverity === 'All' || f.severity === filterSeverity)
    .slice(0, 8);

  return (
    <window.Section
      title={
        <span className="flex items-center gap-2">
          Material Risk Inventory
          <SodBadge id="SOD-03" />
        </span>
      }
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
              <window.Th>User / Identity</window.Th>
              <window.Th>Area</window.Th>
              <window.Th>Violation Description</window.Th>
              <window.Th>Recommended Action</window.Th>
              <window.Th align="right">
                <span>Affected Users</span>
              </window.Th>
              <window.Th>Severity</window.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((f) => (
              <React.Fragment key={f.id}>
                <tr
                  className="row-hover cursor-pointer group"
                  onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
                >
                  <td className="px-4 py-3.5 w-8">
                    <div className="flex items-center gap-1">
                      <window.Icon
                        name="chevron"
                        className={`w-4 h-4 text-ink-400 transition-transform ${expandedId === f.id ? 'rotate-90' : ''}`}
                      />
                      {expandedId !== f.id && (
                        <span className="text-[8px] font-bold text-brand-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">AI ▸</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{f.user || f.id}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-[10px] uppercase text-ink-500 tracking-wider bg-ink-100 px-2 py-0.5 rounded ring-1 ring-inset ring-ink-200">{f.area}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-ink-800">{f.desc}</td>
                  <td className="px-4 py-3.5 text-ink-600 max-w-[200px] truncate" title={f.action}>{f.action}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-mono font-bold text-ink-900">{f.users}</span>
                    <span className="text-[10px] text-ink-400 ml-1">users</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <window.SeverityBadge value={f.severity} />
                  </td>
                </tr>
                {expandedId === f.id && <AIExpandedRow finding={f} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </window.Section>
  );
}

/* ============================================================ */
/* 6. Stream Overview — with P2P card injected after O2C        */
/* ============================================================ */
/* ============================================================ */
/* 6. Stream Overview — with P2P card injected after O2C        */
/* ============================================================ */

// Hardcoded P2P stream card definition
const P2P_STREAM_CARD = {
  key: 'sod-p2p',
  code: 'SoD · P2P',
  severity: 'Critical',

  icon: 'package',

  title: 'Procure-to-Pay Violations',

  blurb:
    'High-risk authorization combinations in vendor master, purchase orders, invoice processing, and vendor payment workflows.',
};

function StreamOverview({ onNavigate }) {
  const { CATEGORY_CARDS } = window.MOCK;

  // Inject P2P card after O2C card
  const allCards = useMemo(() => {
    const cards = [...CATEGORY_CARDS];

    const o2cIdx = cards.findIndex(
      c =>
        c.key === 'o2c' ||
        (c.title || '').toLowerCase().includes('order') ||
        (c.code || '').toLowerCase().includes('o2c')
    );

    const alreadyHasP2P = cards.some(c => c.key === 'p2p' || c.key === 'sod-p2p');

    if (!alreadyHasP2P) {
      if (o2cIdx >= 0) {
        cards.splice(o2cIdx + 1, 0, P2P_STREAM_CARD);
      } else {
        cards.push(P2P_STREAM_CARD);
      }
    }

    return cards;
  }, [CATEGORY_CARDS]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {allCards.map(c => (
        <button
          key={c.key}
          onClick={() => onNavigate(c.key)}
          className="group flex flex-col p-6 bg-white rounded-2xl ring-1 ring-ink-200 shadow-sm hover:ring-brand-500 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
        >
          {/* Hover Arrow */}
          <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <window.Icon
              name="arrow"
              className="h-4 w-4 text-brand-500"
            />
          </div>

          {/* Top Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink-50 text-ink-600 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm ring-1 ring-inset ring-ink-200 group-hover:ring-brand-400">

              {/* Dynamic Card Icon */}
              <window.Icon
                name={c.icon}
                className="h-6 w-6"
                strokeWidth={1.7}
              />
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                {c.code}
              </div>

              <window.SeverityBadge value={c.severity} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[16px] font-bold text-ink-900 tracking-tight mb-2 group-hover:text-brand-700 transition-colors">
            {c.title}
          </h3>

          {/* Description */}
          <p className="text-[12px] text-ink-500 leading-relaxed line-clamp-3">
            {c.blurb}
          </p>

          {/* Bottom Arrow */}
          <div className="mt-auto pt-4 flex justify-end">
            <div className="h-6 w-6 rounded-full bg-ink-50 flex items-center justify-center text-ink-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
              <window.Icon
                name="chevron"
                className="h-3 w-3"
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
/* ============================================================ */
/* 7. Main Page Assembly                                        */
/* ============================================================ */
window.LaunchPage = function ({ onNavigate }) {
  return (
    <div data-screen-label="01 Launch Dashboard" className="space-y-6 px-4 md:px-8 py-8 animate-in fade-in duration-500">

      {/* ── Header ── */}
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

     

      {/* ── Analysis Streams ── */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-400">Analysis Streams</div>
          <button className="text-[11px] font-bold text-brand-600 hover:underline uppercase tracking-widest">Advanced Filter</button>
        </div>
        <StreamOverview onNavigate={onNavigate} />
      </div>

      {/* ── Compliance Overview + Risk Distribution ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceOverviewCard />
        <RiskDistributionPanel />
      </div>

      {/* ── Systemic Vulnerabilities ── */}
      <ComplianceEngine />

      {/* ── Material Risk Inventory ── */}
      <RiskRadar />

      <footer className="pt-12 pb-6 text-center border-t border-ink-100">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
          KTern.AI SoD Agent · Intelligence Engine v2.0.4 · May 2026 Assessment Cycle
        </div>
      </footer>
    </div>
  );
};