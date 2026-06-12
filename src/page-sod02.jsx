const {
  LineChart: P2_LineChart, Line: P2_Line, XAxis: P2_XAxis, YAxis: P2_YAxis,
  CartesianGrid: P2_CartesianGrid, Tooltip: P2_Tooltip, ResponsiveContainer: P2_ResponsiveContainer,
  BarChart: P2_BarChart, Bar: P2_Bar, Cell: P2_Cell
} = Recharts;

const { useState } = React;

window.Sod02Page = function({ onNavigate, inline }) {
  const { COMPLIANCE, RUN_TREND } = window.MOCK;

  // Set the score statically to the worked example percentage (61.25%)
  const currentScore = 61.25;

  return (
    <div data-screen-label="Overall Compliance Assessment" className={inline ? "space-y-6 text-left animate-fade-in" : "space-y-6 px-4 md:px-7 py-6 text-left"}>
      
      {/* Header */}
      {!inline && (
        <window.DetailHeader
          code="SOD-02 · Compliance Assessment"
          title="Overall Compliance Assessment"
          subtitle="Maturity benchmarks, sector peer scoring, and calculated risk coverage scores for active analysis cycles."
        />
      )}

      {/* Compliance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <window.StatCard label="Compliance Score" value={`${currentScore}%`} tone="good" metricKey="complianceScore" />
        <window.StatCard label="Industry Peer Average" value="78.0%" metricKey="sapGrcBaseline" />
        <window.StatCard severity="High" label="Risk Maturity Level" value="Managed" icon="shield" />
        <window.StatCard severity="Critical" label="Unmitigated Violations" value="46 Risks" metricKey="totalViolations" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formula Card */}
        <div className="lg:col-span-1">
          <window.Section title="Scoring Transparency Matrix">
            <div className="p-5 space-y-4 text-xs text-ink-700 leading-relaxed">
              <div className="bg-white rounded-xl p-5 border border-ink-200 space-y-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Scoring Formula</span>
                <div className="font-mono text-[11px] font-bold bg-ink-50 p-2.5 rounded-lg border border-ink-150 text-center">
                  Compliance Score = ( (Total Scanned - Violators) / Total Scanned ) * 100
                </div>
                <p className="text-ink-600 leading-snug">
                  Where <b className="text-ink-900">Total Scanned</b> represents active dialogue users, and <b className="text-ink-900">Violators</b> is the unique count of accounts carrying one or more unmitigated SoD conflicts.
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-ink-900 text-sm">SAP Fields Used</h4>
                <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                  <div className="p-2 bg-ink-50 rounded border border-ink-150">
                    <span className="font-bold block text-ink-500">USER MASTER</span>
                    USR02 (User Lock Status)
                  </div>
                  <div className="p-2 bg-ink-50 rounded border border-ink-150">
                    <span className="font-bold block text-ink-500">ASSIGNMENTS</span>
                    AGR_USERS (User Roles)
                  </div>
                  <div className="p-2 bg-ink-50 rounded border border-ink-150">
                    <span className="font-bold block text-ink-500">PROFILE OBJECTS</span>
                    AGR_1251 (Auth Objects)
                  </div>
                </div>
              </div>
            </div>
          </window.Section>
        </div>

        {/* Charts Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trend Graph */}
            <window.Section title="Compliance Progression Trend">
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-4">Pass Rate Progression (%)</div>
                <div className="h-[200px]">
                  <P2_ResponsiveContainer width="100%" height="100%">
                    <P2_LineChart data={RUN_TREND} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                      <P2_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                      <P2_XAxis dataKey="run" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <P2_YAxis domain={[60, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                      <P2_Tooltip content={({ active, payload, label }) => {
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
                      <P2_Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </P2_LineChart>
                  </P2_ResponsiveContainer>
                </div>
              </div>
            </window.Section>

            {/* Severity Breakdown Bar Chart */}
            <window.Section title="Unmitigated Risk Severity Breakdown">
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-4">Active Violations by Severity</div>
                <div className="h-[200px]">
                  <P2_ResponsiveContainer width="100%" height="100%">
                    <P2_BarChart data={[
                      { name: 'Critical', count: 18, color: '#EF4444' },
                      { name: 'High', count: 19, color: '#F97316' },
                      { name: 'Medium', count: 9, color: '#EAB308' },
                      { name: 'Low', count: 0, color: '#3B82F6' },
                    ]} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                      <P2_CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                      <P2_XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <P2_YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <P2_Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-pop text-[11px]">
                            <div className="font-bold text-ink-900 mb-1">{data.name} Severity</div>
                            <div className="text-ink-600 flex justify-between gap-4">
                              <span>Active:</span>
                              <b className="font-mono" style={{ color: data.color }}>{data.count} Violations</b>
                            </div>
                          </div>
                        );
                      }} />
                      <P2_Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        <P2_Cell fill="#EF4444" />
                        <P2_Cell fill="#F97316" />
                        <P2_Cell fill="#EAB308" />
                        <P2_Cell fill="#3B82F6" />
                      </P2_Bar>
                    </P2_BarChart>
                  </P2_ResponsiveContainer>
                </div>
              </div>
            </window.Section>
          </div>
        </div>

      </div>
    </div>
  );
};
