const { useState, useMemo } = React;

window.Sod04Page = function({ onNavigate, inline }) {
  const { IMMEDIATE_ACTIONS, CRITICAL_FINDINGS } = window.MOCK;

  // Enhance immediate actions to map back to their source rule IDs (e.g. V-1058, V-1071)
  const enrichedActions = useMemo(() => {
    return (IMMEDIATE_ACTIONS || []).map(action => {
      // Find matching rule ID by description prefix or name match
      let matchedRuleId = 'V-1058';
      if (action.desc.includes('PFCG') || action.desc.includes('role-admin')) matchedRuleId = 'V-1071';
      else if (action.desc.includes('Background') || action.desc.includes('BATCH')) matchedRuleId = 'V-1124';
      else if (action.desc.includes('F110') || action.desc.includes('Payment')) matchedRuleId = 'V-1101';
      else if (action.desc.includes('Goods') || action.desc.includes('MIGO')) matchedRuleId = 'V-1131';

      // Find severity from critical findings
      const finding = CRITICAL_FINDINGS.find(f => f.id === matchedRuleId);
      const severity = finding ? finding.severity : (action.urgency.includes('P1') ? 'Critical' : 'High');

      return {
        ...action,
        ruleId: matchedRuleId,
        severity,
        businessImpact: action.risk || 'System security threat'
      };
    });
  }, [IMMEDIATE_ACTIONS, CRITICAL_FINDINGS]);

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  const filteredActions = useMemo(() => {
    return enrichedActions.filter(action => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = action.ruleId.toLowerCase().includes(q) ||
        action.desc.toLowerCase().includes(q) ||
        action.user.toLowerCase().includes(q) ||
        action.action.toLowerCase().includes(q);

      const matchesSeverity = !severityFilter || action.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [enrichedActions, searchTerm, severityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSeverityFilter('');
  };

  return (
    <div data-screen-label="Immediate Actions Required" className={inline ? "space-y-6 text-left animate-fade-in" : "space-y-6 px-4 md:px-7 py-6 text-left"}>
      
      {/* Header */}
      {!inline && (
        <window.DetailHeader
          code="SOD-04 · Urgent Mitigations"
          title="Immediate Actions Required"
          subtitle="Critical and High severity Segregation of Duties conflicts requiring urgent action. Status columns and editable workflow states have been removed for compliance audit transparency."
        />
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <window.StatCard severity="Critical" label="Priority 1 Actions" value={enrichedActions.filter(a => a.severity === 'Critical').length} metricKey="criticalViolations" />
        <window.StatCard severity="High" label="High Priority Actions" value={enrichedActions.filter(a => a.severity === 'High').length} metricKey="highViolations" />
        <window.StatCard label="Affected Users" value={new Set(enrichedActions.map(a => a.user)).size} metricKey="totalUsers" />
        <window.StatCard severity="Good" label="Defined SLA Window" value="24 - 48h" icon="clock" />
      </div>

      {/* Filter and Search Bar */}
      <window.FilterBar onClear={clearFilters} hasFilters={!!(searchTerm || severityFilter)}>
        <window.Select
          value={severityFilter}
          onChange={setSeverityFilter}
          options={['Critical', 'High']}
          placeholder="All Severities"
        />
        <window.SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by User, Risk ID..."
        />
        <span className="ml-auto text-[11px] text-ink-400 font-semibold uppercase tracking-wider">
          {filteredActions.length} action{filteredActions.length !== 1 ? 's' : ''} found
        </span>
      </window.FilterBar>

      {/* Main Table Grid */}
      <window.Section
        title="Triage Mitigation queue"
        subtitle="Master audit list of active, unmitigated user risk conflicts. Clicks navigate directly to User profiles or Violation details."
        action={<window.ExportButton label="Export Actions" size="sm" />}
      >
        <div className="overflow-auto max-h-[500px]">
          <table className="w-full text-[13px] table-fixed">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-ink-200">
                <window.Th className="w-32">Risk ID</window.Th>
                <window.Th className="w-36">Affected User</window.Th>
                <window.Th className="w-64">Risk Description</window.Th>
                <window.Th className="w-28">Severity</window.Th>
                <window.Th className="w-56">Business Impact</window.Th>
                <window.Th className="w-64">Recommended Action</window.Th>
                <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 w-36">Navigate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredActions.map(action => {
                return (
                  <tr key={action.id} className="row-hover align-middle">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onNavigate('risk-detail', action.ruleId)}
                        className="font-mono font-bold text-brand-600 hover:underline hover:text-brand-700"
                      >
                        {action.ruleId}
                      </button>
                      <div className="text-[10px] text-ink-400 font-mono mt-0.5">{action.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onNavigate('user-profile', action.user)}
                        className="font-mono font-bold text-ink-900 hover:text-brand-600 hover:underline truncate block"
                      >
                        {action.user}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-800 leading-snug truncate" title={action.desc}>
                      {action.desc}
                    </td>
                    <td className="px-4 py-3">
                      <window.SeverityBadge value={action.severity} />
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-600 leading-snug truncate" title={action.businessImpact}>
                      {action.businessImpact}
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-800 leading-snug truncate" title={action.action}>
                      {action.action}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onNavigate('violation-detail', action.ruleId)}
                        className="px-2.5 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-800 text-white font-bold text-[10.5px] transition-colors whitespace-nowrap"
                      >
                        Violation Details
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredActions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                    No immediate actions found matching criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </window.Section>
    </div>
  );
};