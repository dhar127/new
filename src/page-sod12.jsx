const {
  LineChart: P12_LineChart, Line: P12_Line, XAxis: P12_XAxis, YAxis: P12_YAxis,
  CartesianGrid: P12_CartesianGrid, Tooltip: P12_Tooltip, ResponsiveContainer: P12_ResponsiveContainer,
  Legend: P12_Legend,
} = Recharts;

const { useState, useMemo } = React;

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
    <window.StatCard label="Total Checks Run" value={SOD12_KPIS.automatedChecks.toLocaleString()} metricKey="totalUsers" />
    <window.StatCard severity="Good" label="Pass Rate" value={`${SOD12_KPIS.passRate}%`} delta={2.1} metricKey="continuousCompliance" />
    <window.StatCard label="Rules Active" value={SOD12_KPIS.rulesActive} metricKey="totalViolations" />
    <window.StatCard severity="Critical" label="New Violations" value={SOD12_KPIS.newViolationsThisRun} delta={-11} deltaInvertGood metricKey="criticalViolations" />
    <window.StatCard severity="Good" label="Resolved" value={SOD12_KPIS.resolvedThisRun} delta={17} metricKey="complianceScore" />
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

/* ─── Historical Runs Comparison Segment ──────────────────────── */
function HistoricalComparisonSection() {
  const runs = window.MOCK.ANALYSIS_RUNS;
  const [runA, setRunA] = useState('LCSOD-2026-Q2-007');
  const [runB, setRunB] = useState('LCSOD-2026-Q1-006');

  const comparisonData = useMemo(() => {
    const rA = runs.find(r => r.id === runA) || runs[0];
    const rB = runs.find(r => r.id === runB) || runs[1];

    const scoreDelta = (rA.matchRate - rB.matchRate).toFixed(1);
    const violationDelta = rA.violations - rB.violations;

    return {
      runAName: rA.name,
      runBName: rB.name,
      runAScore: rA.matchRate,
      runBScore: rB.matchRate,
      runAViolations: rA.violations,
      runBViolations: rB.violations,
      runAUsers: rA.users,
      runBUsers: rB.users,
      scoreDelta,
      violationDelta,
      newViolations: [
        { id: 'V-1071', desc: 'PFCG Role Administrator privilege escalation risk', severity: 'Critical' },
        { id: 'V-1124', desc: 'SAP_ALL configuration override on BATCH_USER', severity: 'Critical' }
      ],
      resolvedViolations: [
        { id: 'V-1042', desc: 'ME21N (Create PO) + F110 (Automatic payment) combination', severity: 'High' }
      ],
      persistentViolations: [
        { id: 'V-1058', desc: 'Full OTC lifecycle control (Order entry + Invoicing + Cash clearing)', severity: 'Critical' },
        { id: 'V-1101', desc: 'F110 execution rights allocated to non-treasury accounts', severity: 'High' },
        { id: 'V-1088', desc: 'Dormant technical firefighter account with active profiles', severity: 'High' }
      ]
    };
  }, [runA, runB, runs]);

  return (
    <window.Section
      title="Historical Run Drift & Comparison"
      subtitle="Select any two previous assessment runs to evaluate compliance progression and specific changes."
    >
      <div className="p-6 space-y-6">
        
        {/* Run Selectors */}
        <div className="flex flex-wrap gap-4 items-center bg-ink-50 p-4 rounded-xl border border-ink-200">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-ink-500 uppercase text-[10px]">Comparing Run:</span>
            <select
              value={runA}
              onChange={e => setRunA(e.target.value)}
              className="px-3 py-1.5 bg-white border border-ink-200 rounded-lg text-xs font-semibold focus:outline-none"
            >
              {runs.map(r => <option key={r.id} value={r.id}>{r.id} ({r.date.split(' · ')[0]})</option>)}
            </select>
          </div>

          <span className="text-ink-400 font-bold text-xs">VS</span>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-ink-500 uppercase text-[10px]">Reference Run:</span>
            <select
              value={runB}
              onChange={e => setRunB(e.target.value)}
              className="px-3 py-1.5 bg-white border border-ink-200 rounded-lg text-xs font-semibold focus:outline-none"
            >
              {runs.map(r => <option key={r.id} value={r.id}>{r.id} ({r.date.split(' · ')[0]})</option>)}
            </select>
          </div>
        </div>

        {/* Comparison Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Side-by-side matrix */}
          <div className="border border-ink-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-ink-50 border-b border-ink-200 text-[10px] font-bold text-ink-500 uppercase">
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3 text-right">{runA}</th>
                  <th className="px-4 py-3 text-right">{runB}</th>
                  <th className="px-4 py-3 text-right">Drift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-150">
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink-800">Compliance Score</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-emerald-600">{comparisonData.runAScore}%</td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-ink-700">{comparisonData.runBScore}%</td>
                  <td className="px-4 py-3 text-right font-mono">
                    <span className={`font-bold ${comparisonData.scoreDelta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {comparisonData.scoreDelta >= 0 ? '+' : ''}{comparisonData.scoreDelta}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink-800">Violations Found</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-rose-600">{comparisonData.runAViolations}</td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-ink-700">{comparisonData.runBViolations}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    <span className={`font-bold ${comparisonData.violationDelta <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {comparisonData.violationDelta > 0 ? '+' : ''}{comparisonData.violationDelta}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink-800">Users Analyzed</td>
                  <td className="px-4 py-3 text-right font-mono">{comparisonData.runAUsers}</td>
                  <td className="px-4 py-3 text-right font-mono">{comparisonData.runBUsers}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-400">
                    {comparisonData.runAUsers - comparisonData.runBUsers}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Changes Summary */}
          <div className="bg-white border border-ink-200 rounded-xl p-4 space-y-4 shadow-sm text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block border-b border-ink-100 pb-1.5">Run Drift Breakdown</span>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-center">
                <span className="text-[9px] font-bold uppercase text-rose-700">New</span>
                <div className="text-base font-bold font-mono text-rose-800 mt-0.5">{comparisonData.newViolations.length}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                <span className="text-[9px] font-bold uppercase text-emerald-700">Resolved</span>
                <div className="text-base font-bold font-mono text-emerald-800 mt-0.5">{comparisonData.resolvedViolations.length}</div>
              </div>
              <div className="bg-ink-50 border border-ink-250 rounded-lg p-2.5 text-center">
                <span className="text-[9px] font-bold uppercase text-ink-650">Persistent</span>
                <div className="text-base font-bold font-mono text-ink-800 mt-0.5">{comparisonData.persistentViolations.length}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Drift Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* New Violations */}
          <div className="bg-white border border-ink-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block border-b border-rose-100 pb-1.5">New Violations ({comparisonData.newViolations.length})</span>
              <div className="mt-3 space-y-3">
                {comparisonData.newViolations.map(v => (
                  <div key={v.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-ink-900 bg-rose-50 border border-rose-150 px-1.5 py-0.5 rounded">{v.id}</span>
                      <window.SeverityBadge value={v.severity} />
                    </div>
                    <p className="text-ink-600 leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resolved Violations */}
          <div className="bg-white border border-ink-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block border-b border-emerald-100 pb-1.5">Resolved Violations ({comparisonData.resolvedViolations.length})</span>
              <div className="mt-3 space-y-3">
                {comparisonData.resolvedViolations.map(v => (
                  <div key={v.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-ink-900 bg-emerald-50 border border-emerald-150 px-1.5 py-0.5 rounded">{v.id}</span>
                      <window.SeverityBadge value={v.severity} />
                    </div>
                    <p className="text-ink-600 leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Persistent Violations */}
          <div className="bg-white border border-ink-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block border-b border-ink-100 pb-1.5">Persistent Violations ({comparisonData.persistentViolations.length})</span>
              <div className="mt-3 space-y-3">
                {comparisonData.persistentViolations.map(v => (
                  <div key={v.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-ink-900 bg-ink-50 border border-ink-200 px-1.5 py-0.5 rounded">{v.id}</span>
                      <window.SeverityBadge value={v.severity} />
                    </div>
                    <p className="text-ink-650 leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </window.Section>
  );
}

const RuleDeploymentLog = () => (
  <window.Section
    title="Rule Deployment Log"
    subtitle="SoD control rules active in the system — custom-built, SAP standard, or migrated legacy rules."
    action={<window.ExportButton label="Export Log" size="sm" />}
  >
    <div className="overflow-auto max-h-[480px]">
      <table className="w-full text-[13px]">
        <thead className="sticky top-0 z-10 bg-white">
          <tr className="border-b border-ink-200 bg-ink-50/50">
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
    <HistoricalComparisonSection />
    <RuleDeploymentLog />
  </div>
);

window.Sod12Page = Sod12Page;