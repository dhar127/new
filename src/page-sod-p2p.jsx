const {
  BarChart: P2P_BarChart, Bar: P2P_Bar, XAxis: P2P_XAxis, YAxis: P2P_YAxis,
  CartesianGrid: P2P_CartesianGrid, Tooltip: P2P_Tooltip, Cell: P2P_Cell,
  ResponsiveContainer: P2P_ResponsiveContainer, LabelList: P2P_LabelList,
} = Recharts;

const { useState } = React;

window.SodP2pPage = function() {
  const { P2P_KPIS, P2P_VIOLATIONS, VENDOR_RISK_HEATMAP, P2P_REMEDIATION } = window.MOCK;
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredViolations = selectedStatus === 'All' 
    ? P2P_VIOLATIONS 
    : P2P_VIOLATIONS.filter(v => v.status === selectedStatus);

  return (
    <div data-screen-label="P2P Violations" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="SoD Analysis · P2P"
        title="Procure-to-Pay Violations"
        subtitle="High-risk authorization combinations in the vendor master and payment processes."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <window.StatCard label="Total P2P Violations" value={P2P_KPIS.totalViolations} delta={P2P_KPIS.deltas.totalViolations} deltaInvertGood icon="split" />
        <window.StatCard severity="Critical" label="High-Risk Combos" value={P2P_KPIS.highRiskCombos} delta={P2P_KPIS.deltas.highRiskCombos} deltaInvertGood icon="flame" />
        <window.StatCard label="Affected Vendors" value={P2P_KPIS.affectedVendors} delta={P2P_KPIS.deltas.affectedVendors} deltaInvertGood icon="user" />
        <window.StatCard severity="Critical" label="Estimated Exposure" value={'$' + (P2P_KPIS.estimatedExposure / 1_000_000).toFixed(1) + 'M'} delta={P2P_KPIS.deltas.estimatedExposure / 1_000_000} deltaSuffix="M" deltaInvertGood icon="impact" />
      </div>

      {/* Violation Combo Table */}
      <window.Section 
        title="P2P Violation Combinations"
        subtitle="Detailed breakdown of authorization overlaps across the Procure-to-Pay cycle."
        action={
          <div className="flex items-center gap-2">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-ink-200 bg-white text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">ID</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">T-Code Pair</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Risk Description</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Users Affected</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Severity</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredViolations.map(violation => (
                <tr key={violation.id} className="border-b border-ink-50 hover:bg-ink-50 transition-colors">
                  <td className="px-5 py-3 text-xs font-mono font-bold text-ink-900">{violation.id}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink-900">{violation.pair}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-ink-700">{violation.desc}</td>
                  <td className="px-5 py-3 text-xs font-bold text-ink-900">{violation.users} users</td>
                  <td className="px-5 py-3">
                    <window.SeverityBadge value={violation.severity} size="sm" />
                  </td>
                  <td className="px-5 py-3">
                    <window.StatusBadge value={violation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </window.Section>

      {/* Vendor Risk Heatmap */}
      <window.Section 
        title="Vendor Risk Concentration"
        subtitle="Top vendors with highest violation density across P2P processes."
      >
        <div className="h-[320px] p-6">
          <P2P_ResponsiveContainer width="100%" height="100%">
            <P2P_BarChart 
              data={VENDOR_RISK_HEATMAP.slice(0, 10)} 
              layout="vertical" 
              margin={{ top: 0, right: 60, bottom: 0, left: 140 }}
            >
              <P2P_CartesianGrid stroke="#F1F5F9" horizontal={false} />
              <P2P_XAxis type="number" hide />
              <P2P_YAxis 
                type="category" 
                dataKey="vendor" 
                width={140}
                tick={{ fill: '#0F172A', fontSize: 11, fontWeight: 600, fontFamily: 'JetBrains Mono' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <P2P_Tooltip 
                cursor={{ fill: '#F8FAFC' }} 
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                      <div className="font-bold text-ink-900 mb-1">{payload[0].payload.vendor}</div>
                      <div className="text-ink-600 flex justify-between gap-4">
                        <span>Violations:</span>
                        <b className="font-mono text-ink-900">{payload[0].value}</b>
                      </div>
                      <div className="text-ink-600 flex justify-between gap-4 mt-1">
                        <span>Exposure:</span>
                        <b className="font-mono text-ink-900">{payload[0].payload.exposure}</b>
                      </div>
                    </div>
                  );
                }}
              />
              <P2P_Bar dataKey="violations" radius={[0, 4, 4, 0]} barSize={18} fill="#3B82F6">
                {VENDOR_RISK_HEATMAP.slice(0, 10).map((d, i) => (
                  <P2P_Cell key={i} fill={d.violations > 8 ? '#EF4444' : d.violations > 5 ? '#F97316' : '#3B82F6'} />
                ))}
                <P2P_LabelList dataKey="violations" position="right" fill="#0F172A" style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono' }} />
              </P2P_Bar>
            </P2P_BarChart>
          </P2P_ResponsiveContainer>
        </div>
      </window.Section>

      {/* Remediation Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {P2P_REMEDIATION.map((rec, idx) => (
          <div key={idx} className="rounded-2xl bg-ink-900 text-white shadow-card ring-1 ring-ink-700 p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">{rec.type}</div>
                <h3 className="text-sm font-bold mt-1">{rec.title}</h3>
              </div>
              <span className={`shrink-0 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ring-1 ring-inset ${
                rec.priority === 'P1' ? 'bg-rose-500/20 text-rose-300 ring-rose-500/30' :
                'bg-blue-500/20 text-blue-300 ring-blue-500/30'
              }`}>
                {rec.priority}
              </span>
            </div>
            <p className="text-xs text-ink-300 mb-3">{rec.description}</p>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-ink-400">Timeline: <b className="text-ink-100">{rec.timeline}</b></span>
              <span className={`font-bold ${rec.impact === 'High' ? 'text-rose-300' : 'text-amber-300'}`}>{rec.impact} Impact</span>
            </div>
          </div>
        ))}
      </div>

      {/* Related Findings */}
      <window.Section 
        title="Related Findings & Context"
        subtitle="Cross-referenced violations from the broader SoD analysis."
      >
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-ink-100">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold shrink-0">1</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-ink-900">Procurement-Finance Axis</div>
              <p className="text-xs text-ink-500 mt-0.5">
                P2P violations often manifest as dual-process conflicts between Procurement (vendor/PO) and Finance (payments). Refer to SOD-07 Dual Control Violations for cross-process view.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-ink-100">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold shrink-0">2</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-ink-900">Super-Admin Impact</div>
              <p className="text-xs text-ink-500 mt-0.5">
                Users BCARRIER, BGILL, and KPARK_LC (from SOD-06) hold super-admin or multi-process authority exacerbating P2P risks. Revoke/redesign strategies should address these users first.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold shrink-0">3</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-ink-900">Baseline Controls</div>
              <p className="text-xs text-ink-500 mt-0.5">
                Implement 3-way match (PO → GR → Invoice) enforced in MM/FI configuration. Requires MIRO control matrix to block over-invoicing and MIGO trace enforcement.
              </p>
            </div>
          </div>
        </div>
      </window.Section>
    </div>
  );
};

window.DetailHeader = function({ code, title, subtitle }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">{code}</div>
      <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
      <p className="text-sm text-ink-500">{subtitle}</p>
    </div>
  );
};

window.StatCard = function({ label, value, delta, deltaInvertGood, deltaSuffix = '', severity, icon }) {
  const tones = {
    default: 'bg-white',
    Critical: 'bg-gradient-to-br from-rose-50/70 to-white',
    High: 'bg-gradient-to-br from-orange-50/70 to-white',
    Medium: 'bg-gradient-to-br from-amber-50/70 to-white',
    Low: 'bg-gradient-to-br from-blue-50/70 to-white',
    Good: 'bg-gradient-to-br from-emerald-50/70 to-white',
  };
  const ring = {
    default: 'ring-ink-200',
    Critical: 'ring-rose-200',
    High: 'ring-orange-200',
    Medium: 'ring-amber-200',
    Low: 'ring-blue-200',
    Good: 'ring-emerald-200',
  };
  return (
    <div className={`rounded-xl ${tones[severity] || tones.default} px-4 py-3.5 shadow-card ring-1 ring-inset ${ring[severity] || ring.default}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500">{label}</div>
        {icon && <window.Icon name={icon} className="w-4 h-4 text-ink-400" />}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums text-ink-900">{value}</span>
      </div>
      {delta !== undefined && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
          <window.Delta value={delta} invertGood={deltaInvertGood} suffix={deltaSuffix} />
          <span className="text-ink-300">vs last run</span>
        </div>
      )}
    </div>
  );
};
