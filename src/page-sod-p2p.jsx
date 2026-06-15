const { useState, useMemo } = React;

const MOCK_AFFECTED_USERS = {
  'P2P-001': [
    { userId: 'USR-1042', name: 'Ravi Kumar',    role: 'AP Clerk'       },
    { userId: 'USR-1087', name: 'Priya Nair',    role: 'Vendor Admin'   },
    { userId: 'USR-1103', name: 'Arjun Mehta',   role: 'Finance Lead'   },
  ],
  'P2P-002': [
    { userId: 'USR-1055', name: 'Sunita Rao',    role: 'AP Clerk'       },
    { userId: 'USR-1061', name: 'Deepak Singh',  role: 'Buyer'          },
  ],
  'P2P-003': [
    { userId: 'USR-1012', name: 'Meena Pillai',  role: 'Treasury Lead'  },
    { userId: 'USR-1034', name: 'Karthik Iyer',  role: 'Finance Exec'   },
    { userId: 'USR-1078', name: 'Anita Sharma',  role: 'AP Clerk'       },
    { userId: 'USR-1091', name: 'Rahul Verma',   role: 'Controller'     },
  ],
  'P2P-004': [
    { userId: 'USR-1023', name: 'Vijay Pandey',  role: 'Vendor Admin'   },
    { userId: 'USR-1045', name: 'Lakshmi Das',   role: 'Procurement'    },
  ],
  'P2P-005': [
    { userId: 'USR-1067', name: 'Suresh Babu',   role: 'AP Supervisor'  },
    { userId: 'USR-1082', name: 'Nisha Menon',   role: 'Finance Exec'   },
    { userId: 'USR-1094', name: 'Arun Krishnan', role: 'Buyer'          },
  ],
};

const getFallbackUsers = (violationId) => [
  { userId: `USR-${1000 + Math.abs(violationId.charCodeAt(4) * 7)}`, name: 'System User A', role: 'AP Clerk'     },
  { userId: `USR-${1100 + Math.abs(violationId.charCodeAt(5) * 3)}`, name: 'System User B', role: 'Finance Exec' },
];

const ViolationRow = ({ violation }) => {
  const [open, setOpen] = useState(false);
  const users = MOCK_AFFECTED_USERS[violation.id] || getFallbackUsers(violation.id);

  return (
    <React.Fragment>
      <tr
        className="border-b border-ink-50 hover:bg-ink-50 transition-colors cursor-pointer group"
        onClick={() => setOpen(o => !o)}
      >
        <td className="px-5 py-3">
          <div className="flex items-center gap-2">
            <window.Icon
              name="chevron"
              className={`w-3.5 h-3.5 text-ink-400 transition-transform ${open ? 'rotate-90' : ''}`}
            />
            <span className="text-xs font-mono font-bold text-ink-900">{violation.id}</span>
          </div>
        </td>
        <td className="px-5 py-3 text-xs font-bold text-ink-900">{violation.pair}</td>
        <td className="px-5 py-3 text-xs text-ink-700">{violation.desc}</td>
        <td className="px-5 py-3">
          <window.SeverityBadge value={violation.severity} size="sm" />
        </td>
        <td className="px-5 py-3">
          <window.StatusBadge value={violation.status} />
        </td>
      </tr>
      {open && (
        <tr className="bg-ink-50/40">
          <td colSpan={5} className="px-8 py-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">
              Affected Users — {violation.pair}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {users.map((u, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 ring-1 ring-ink-100 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono font-bold text-ink-900">{u.userId}</span>
                    <span className="text-ink-500">{u.name}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-ink-500 bg-ink-50 px-1.5 py-0.5 rounded ring-1 ring-ink-200">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

window.SodP2pPage = function() {
  const { P2P_KPIS, P2P_VIOLATIONS } = window.MOCK;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredViolations = useMemo(() => {
    let filtered = selectedStatus === 'All'
      ? P2P_VIOLATIONS
      : P2P_VIOLATIONS.filter(v => v.status === selectedStatus);

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, selectedStatus, P2P_VIOLATIONS]);

  return (
    <div data-screen-label="P2P Violations" className="space-y-6 px-4 md:px-7 py-6">
      <window.DetailHeader
        icon="package"
        code="SoD Analysis · P2P"
        title="Procure-to-Pay Violations"
        subtitle="High-risk authorization combinations in the vendor master and payment processes."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <window.StatCard label="Total P2P Violations" value={P2P_KPIS.totalViolations} delta={P2P_KPIS.deltas?.totalViolations || 0} deltaInvertGood />
        <window.StatCard severity="Critical" label="High-Risk Combos" value={P2P_KPIS.highRiskCombos} delta={P2P_KPIS.deltas?.highRiskCombos || 0} deltaInvertGood />
        <window.StatCard label="Affected Users" value={P2P_KPIS.affectedVendors} delta={P2P_KPIS.deltas?.affectedVendors || 0} deltaInvertGood />
      </div>

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <window.Icon name="search" className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search by ID, T-code pair, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ink-400">Filter:</span>
          {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {status}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-ink-400 font-medium">
            {filteredViolations.length} violation{filteredViolations.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Violation Combo Table */}
      <window.Section
        title="P2P Violation Combinations"
        subtitle="Detailed breakdown of authorization overlaps across the Procure-to-Pay cycle. Click a row to see affected users."
      >
        <div className="overflow-auto max-h-[480px]">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-white">
  <tr className="border-b border-ink-100">
    <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">ID</th>
    <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">T-Code Pair</th>
    <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Risk Description</th>
    <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Severity</th>
    <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">Status</th>
  </tr>
</thead>
            <tbody>
              {filteredViolations.map(violation => (
                <ViolationRow key={violation.id} violation={violation} />
              ))}
            </tbody>
          </table>
        </div>
      </window.Section>
    </div>
  );
};