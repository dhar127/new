const {
  LineChart: P12_LineChart, Line: P12_Line, XAxis: P12_XAxis, YAxis: P12_YAxis,
  CartesianGrid: P12_CartesianGrid, Tooltip: P12_Tooltip, ResponsiveContainer: P12_ResponsiveContainer,
  Legend: P12_Legend,
} = Recharts;

const { useState } = React;

/* KPI constants for this page */
const SOD12_KPIS = {
  automatedChecks: 847,
  passRate: 94.2,
  newViolationsThisRun: 41,
  resolvedThisRun: 121,
  rulesActive: 5,
  rulesPending: 2,
};

const RULES_LOG = [
  { id: 'RUL-904', code: 'Z_SOD_01', desc: 'Prevent Vendor Create + AP Payment', deployed: '2026-05-20', status: 'Active', author: 'J. Smith' },
  { id: 'RUL-903', code: 'Z_SOD_02', desc: 'Enforce Firefighter Expiry < 30 days', deployed: '2026-05-18', status: 'Active', author: 'A. Poche' },
  { id: 'RUL-902', code: 'Z_SOD_03', desc: 'Flag F110 out of Treasury', deployed: '2026-05-10', status: 'Active', author: 'B. Carrier' },
  { id: 'RUL-901', code: 'Z_SOD_04', desc: 'Restrict PFCG for non-Basis users', deployed: '2026-05-02', status: 'Active', author: 'J. Smith' },
  { id: 'RUL-900', code: 'Z_SOD_05', desc: 'Detect Bank Edit + Payment Block removal', deployed: '2026-04-25', status: 'Active', author: 'H. Schroder' },
  { id: 'RUL-899', code: 'Z_SOD_06', desc: 'Full OTC cycle by single user alert', deployed: '2026-04-10', status: 'Pending Review', author: 'Y. Kim' },
  { id: 'RUL-898', code: 'Z_SOD_07', desc: 'Background RFC with SAP_ALL equivalent', deployed: '2026-04-05', status: 'Pending Review', author: 'S. Chen' },
];

const COMPLIANCE_TREND_DATA = [
  { run: 'Run 1',  passRate: 88.1, violations: 112, resolved: 45 },
  { run: 'Run 2',  passRate: 89.4, violations: 104, resolved: 58 },
  { run: 'Run 3',  passRate: 90.0, violations: 98,  resolved: 67 },
  { run: 'Run 4',  passRate: 90.8, violations: 89,  resolved: 79 },
  { run: 'Run 5',  passRate: 91.5, violations: 81,  resolved: 88 },
  { run: 'Run 6',  passRate: 92.1, violations: 74,  resolved: 97 },
  { run: 'Run 7',  passRate: 92.9, violations: 63,  resolved: 105 },
  { run: 'Run 8',  passRate: 93.4, violations: 55,  resolved: 112 },
  { run: 'Run 9',  passRate: 94.2, violations: 41,  resolved: 121 },
];

const ComplianceTrends = () => (
  <window.Section
    title="Compliance Trend Over Runs"
    subtitle="Pass rate improvement and violation/resolution trajectory across successive assessment runs."
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Pass Rate Trend */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-3">Pass Rate (%)</div>
        <div className="h-[220px]">
          <P12_ResponsiveContainer width="100%" height="100%">
            <P12_LineChart data={COMPLIANCE_TREND_DATA} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <P12_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <P12_XAxis
                dataKey="run"
                tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <P12_YAxis
                domain={[85, 100]}
                tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${v}%`}
              />
              <P12_Tooltip
                content={({ active, payload, label }) => {
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
                }}
              />
              <P12_Line
                type="monotone"
                dataKey="passRate"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </P12_LineChart>
          </P12_ResponsiveContainer>
        </div>
      </div>

      {/* Violations vs Resolved Trend */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-3">Violations vs Resolved</div>
        <div className="h-[220px]">
          <P12_ResponsiveContainer width="100%" height="100%">
            <P12_LineChart data={COMPLIANCE_TREND_DATA} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <P12_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
              <P12_XAxis
                dataKey="run"
                tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <P12_YAxis
                tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <P12_Tooltip
                content={({ active, payload, label }) => {
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
                }}
              />
              <P12_Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 10, fontFamily: 'JetBrains Mono', paddingTop: 8 }}
              />
              <P12_Line
                type="monotone"
                dataKey="violations"
                name="Violations"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <P12_Line
                type="monotone"
                dataKey="resolved"
                name="Resolved"
                stroke="#3B82F6"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#3B82F6', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </P12_LineChart>
          </P12_ResponsiveContainer>
        </div>
      </div>
    </div>
  </window.Section>
);

const Sod12Kpis = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
    <window.StatCard label="Automated Checks" value={SOD12_KPIS.automatedChecks.toLocaleString()} icon="shield" />
    <window.StatCard severity="Good" label="Pass Rate" value={`${SOD12_KPIS.passRate}%`} delta={2.1} icon="check" />
    <window.StatCard label="Rules Active" value={SOD12_KPIS.rulesActive} icon="file" />
    <window.StatCard severity="High" label="Pending Review" value={SOD12_KPIS.rulesPending} icon="clock" />
    <window.StatCard severity="Critical" label="New Violations" value={SOD12_KPIS.newViolationsThisRun} delta={-11} deltaInvertGood icon="flame" />
    <window.StatCard severity="Good" label="Resolved" value={SOD12_KPIS.resolvedThisRun} delta={17} icon="check" />
  </div>
);

const RuleDeploymentLog = () => (
  <window.Section
    title="Rule Deployment Log"
    subtitle="Control rules deployed to the GRC engine — actively enforcing SoD boundaries in real-time."
    action={<window.ExportButton label="Export Log" size="sm" />}
  >
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead className="bg-ink-50/50">
          <tr>
            <window.Th>Rule ID</window.Th>
            <window.Th>Technical Code</window.Th>
            <window.Th>Description</window.Th>
            <window.Th>Deployed On</window.Th>
            <window.Th>Author</window.Th>
            <window.Th>Status</window.Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {RULES_LOG.map(r => (
            <tr key={r.id} className="row-hover">
              <td className="px-4 py-3.5 font-mono font-bold text-ink-900">{r.id}</td>
              <td className="px-4 py-3.5 font-mono text-[11px] text-brand-600 font-bold">{r.code}</td>
              <td className="px-4 py-3.5 text-ink-800 font-semibold">{r.desc}</td>
              <td className="px-4 py-3.5 font-mono text-ink-500 text-[11px]">{r.deployed}</td>
              <td className="px-4 py-3.5 text-ink-600">{r.author}</td>
              <td className="px-4 py-3.5">
                {r.status === 'Active' ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                    <window.Icon name="check" className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                    <window.Icon name="clock" className="w-3 h-3" />
                    Pending Review
                  </span>
                )}
              </td>
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
      code="SOD-12 · GRC Automation"
      title="Continuous Compliance Monitoring"
      subtitle="Tracking the effectiveness of automated SoD controls, rule deployments, and overall compliance maturity across assessment runs."
    />
    <Sod12Kpis />
    <ComplianceTrends />
    <RuleDeploymentLog />
  </div>
);

window.Sod12Page = Sod12Page;