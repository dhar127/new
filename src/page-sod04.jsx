const { useState, useMemo } = React;

window.Sod04Page = function() {
  const { IMMEDIATE_ACTIONS } = window.MOCK;
  const [actions, setActions] = useState(IMMEDIATE_ACTIONS);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredActions = useMemo(() => {
    if (statusFilter === 'All') return actions;
    return actions.filter(a => a.status === statusFilter);
  }, [actions, statusFilter]);

  const updateStatus = (id, newStatus) => {
    setActions(actions.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };
  
  const updateAssignee = (id, newAssignee) => {
    setActions(actions.map(a => a.id === id ? { ...a, assignee: newAssignee } : a));
  };

  const getUrgencyClass = (urgency) => {
    if (urgency.includes('P1')) return 'bg-rose-100 text-rose-700 ring-rose-200';
    if (urgency.includes('P2')) return 'bg-orange-100 text-orange-700 ring-orange-200';
    return 'bg-amber-100 text-amber-700 ring-amber-200';
  };

  const statusOptions = ['Open', 'In Progress', 'Resolved'];

  return (
    <div data-screen-label="SOD-04 Immediate Actions" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        code="SOD-04 · Triage"
        title="Immediate Actions"
        subtitle="High-priority violations requiring remediation within 24-48 hours to prevent material exposure or audit failure."
      />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <window.StatCard label="Total Urgent" value={actions.length} icon="flame" />
        <window.StatCard severity="Critical" label="P1 · 24h" value={actions.filter(a => a.urgency.includes('P1')).length} deltaInvertGood icon="bell" />
        <window.StatCard severity="High" label="Open" value={actions.filter(a => a.status === 'Open').length} deltaInvertGood icon="x" />
        <window.StatCard severity="Good" label="Resolved" value={actions.filter(a => a.status === 'Resolved').length} icon="check" />
      </div>

      <window.Section 
        title="Action Queue" 
        action={
          <div className="flex items-center gap-3">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="rounded border border-ink-200 text-[11px] font-bold uppercase text-ink-600 p-1.5 bg-ink-50 focus:ring-brand-500 focus:border-brand-500 outline-none"
             >
               <option value="All">All Statuses</option>
               {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
             <window.ExportButton label="Export Queue" size="sm" />
          </div>
        }
      >
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-[13px]">
            <thead className="bg-ink-50/50">
              <tr>
                <window.Th>ID & Urgency</window.Th>
                <window.Th>Violation Description</window.Th>
                <window.Th>Business Risk</window.Th>
                <window.Th>Required Action</window.Th>
                <window.Th>Status</window.Th>
                <window.Th>Assignee</window.Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredActions.map((action) => (
                <tr key={action.id} className="row-hover">
                  <td className="px-4 py-3.5 align-top">
                     <div className="font-mono font-bold text-ink-900 mb-1">{action.id}</div>
                     <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${getUrgencyClass(action.urgency)}`}>
                        {action.urgency}
                     </span>
                  </td>
                  <td className="px-4 py-3.5 align-top max-w-xs">
                     <div className="font-bold text-ink-900 mb-1">{action.desc}</div>
                     <div className="text-[11px] font-mono text-ink-500">Identity: {action.user}</div>
                  </td>
                  <td className="px-4 py-3.5 align-top">
                     <span className="text-ink-600 leading-snug">{action.risk}</span>
                  </td>
                  <td className="px-4 py-3.5 align-top max-w-xs">
                     <div className="text-ink-800 leading-snug">{action.action}</div>
                  </td>
                  <td className="px-4 py-3.5 align-top">
                     <select
                       value={action.status}
                       onChange={(e) => updateStatus(action.id, e.target.value)}
                       className={`text-[11px] font-bold uppercase tracking-widest p-1.5 rounded ring-1 ring-inset border-none outline-none focus:ring-2 ${
                         action.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                         action.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
                         'bg-rose-50 text-rose-700 ring-rose-200'
                       }`}
                     >
                       {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                  </td>
                  <td className="px-4 py-3.5 align-top">
                     <select
                       value={action.assignee || ''}
                       onChange={(e) => updateAssignee(action.id, e.target.value || null)}
                       className="text-[12px] p-1.5 rounded border border-ink-200 bg-white text-ink-700 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 w-full"
                     >
                       <option value="">Unassigned</option>
                       {window.MOCK.TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                     </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-ink-400 font-bold uppercase tracking-widest text-[12px]">
              No actions found for the selected filter.
            </div>
          )}
        </div>
      </window.Section>

    </div>
  );
};
