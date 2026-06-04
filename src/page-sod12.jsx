const {
  LineChart: P12_LineChart, Line: P12_Line, XAxis: P12_XAxis, YAxis: P12_YAxis,
  CartesianGrid: P12_CartesianGrid, Tooltip: P12_Tooltip, ResponsiveContainer: P12_ResponsiveContainer,
  Legend: P12_Legend,
} = Recharts;

const { useState } = React;

const SOD12_KPIS = window.MOCK.SOD12_KPIS;
const RULES_LOG = window.MOCK.RULES_LOG;

const RULE_TYPE_STYLE = {
  Custom:   'bg-blue-50 text-blue-700 ring-blue-200',
  Standard: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Legacy:   'bg-amber-50 text-amber-700 ring-amber-200',
};

const COMPLIANCE_TREND_DATA = window.MOCK.COMPLIANCE_TREND_DATA;

const Sod12Kpis = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
    <window.StatCard label="Total Checks Run" value={SOD12_KPIS.automatedChecks.toLocaleString()} />
    <window.StatCard severity="Good" label="Pass Rate" value={`${SOD12_KPIS.passRate}%`} delta={2.1} />
    <window.StatCard label="Rules Active" value={SOD12_KPIS.rulesActive} />
    <window.StatCard severity="Critical" label="New Violations" value={SOD12_KPIS.newViolationsThisRun} delta={-11} deltaInvertGood />
    <window.StatCard severity="Good" label="Resolved" value={SOD12_KPIS.resolvedThisRun} delta={17} />
  </div>
);

const ComplianceTrends = () => (
  <window.Section
    title="Compliance Trend Over Runs"
    subtitle="Pass rate improvement and violation/resolution trajectory across successive assessment runs."
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-3">Pass Rate (%)</div>
        <div className="h-[220px]">
          <P12_ResponsiveContainer width="100%" height="100%">
            <P12_LineChart data={COMPLIANCE_TREND_DATA} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <P12_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <P12_XAxis dataKey="run" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <P12_YAxis domain={[85, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <P12_Tooltip content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                    <div className="font-bold text-ink-900 mb-1">{label}</div>
                    <div className="text-ink-600 flex justify-between gap-4">
                      <span>Pass Rate:</span>
                      <b className="font-mono text-emerald-600">{payload[0].value}%</b>
                    </div>
                  </div>
                );
              }} />
              <P12_Line type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </P12_LineChart>
          </P12_ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-3">Violations vs Resolved</div>
        <div className="h-[220px]">
          <P12_ResponsiveContainer width="100%" height="100%">
            <P12_LineChart data={COMPLIANCE_TREND_DATA} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <P12_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <P12_XAxis dataKey="run" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <P12_YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <P12_Tooltip content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                    <div className="font-bold text-ink-900 mb-1">{label}</div>
                    {payload.map((p, i) => (
                      <div key={i} className="flex justify-between gap-4" style={{ color: p.color }}>
                        <span className="text-ink-600">{p.name}:</span>
                        <b className="font-mono">{p.value}</b>
                      </div>
                    ))}
                  </div>
                );
              }} />
              <P12_Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
              <P12_Line type="monotone" dataKey="violations" name="Violations" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <P12_Line type="monotone" dataKey="resolved"   name="Resolved"   stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3, fill: '#3B82F6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </P12_LineChart>
          </P12_ResponsiveContainer>
        </div>
      </div>
    </div>
  </window.Section>
);

const RuleDeploymentLog = () => (
  <window.Section
    title="Rule Deployment Log"
    subtitle="SoD control rules active in the system — custom-built, SAP standard, or migrated legacy rules."
    action={<window.ExportButton label="Export Log" size="sm" />}
  >
    <div className="overflow-auto max-h-[480px]">
      <table className="w-full text-[13px]">
        <thead className="sticky top-0 z-10 bg-white">
          <tr>
            <window.Th>Rule ID</window.Th>
            <window.Th>Technical Code</window.Th>
            <window.Th>Description</window.Th>
            <window.Th>Type</window.Th>
            <window.Th>Deployed On</window.Th>
            <window.Th>Author</window.Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {RULES_LOG.map(r => (
            <tr key={r.id} className="row-hover">
              <td className="px-4 py-3.5 font-mono font-bold text-ink-900">{r.id}</td>
              <td className="px-4 py-3.5 font-mono text-[11px] text-brand-600 font-bold">{r.code}</td>
              <td className="px-4 py-3.5 text-ink-800 font-semibold">{r.desc}</td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${RULE_TYPE_STYLE[r.type]}`}>
                  {r.type}
                </span>
              </td>
              <td className="px-4 py-3.5 font-mono text-ink-500 text-[11px]">{r.deployed}</td>
              <td className="px-4 py-3.5 text-ink-600">{r.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </window.Section>
);

const Sod12Page = () => (
  <div data-screen-label="12 Continuous Compliance" className="space-y-6 px-4 md:px-7 py-6">
    <window.DetailHeader
      code="SOD-12 · Continuous Compliance"
      title="Continuous Compliance Monitoring"
      subtitle="Periodic SoD scans, violation trends, and compliance score tracking across assessment runs — up to 90 runs per year."
    />
    <Sod12Kpis />
    <ComplianceTrends />
    <RuleDeploymentLog />
  </div>
);

window.Sod12Page = Sod12Page;