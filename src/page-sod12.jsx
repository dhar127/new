const {
  LineChart: P12_LineChart, Line: P12_Line, XAxis: P12_XAxis, YAxis: P12_YAxis,
  CartesianGrid: P12_CartesianGrid, Tooltip: P12_Tooltip, ResponsiveContainer: P12_ResponsiveContainer,
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

const ComplianceTrends = () => {
  const { RUN_TREND } = window.MOCK;
  return (
    <window.Section title="Compliance Maturity Trend" subtitle="Automated check pass rates tracked over all assessment runs in the current cycle.">
      <div className="h-[300px] p-6">
        <P12_ResponsiveContainer width="100%" height="100%">
          <P12_LineChart data={RUN_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <P12_CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <P12_XAxis dataKey="run" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <P12_YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <P12_Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0F172A', fontWeight: 600 }}
            />
            <P12_Line type="monotone" dataKey="score" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 4, fill: '#0EA5E9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Compliance Score" />
            <P12_Line type="monotone" dataKey="resolved" stroke="#22C55E" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Resolved" />
            <P12_Line type="monotone" dataKey="new" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 3" dot={false} name="New Violations" />
          </P12_LineChart>
        </P12_ResponsiveContainer>
      </div>
    </window.Section>
  );
};

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
