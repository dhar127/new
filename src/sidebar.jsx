const { useState, useEffect } = React;

const NAV = [
  // Runs Section
  { section: 'Runs', divider: true },
  { key: 'runs',       label: 'Analysis Runs',         icon: 'play',    badge: null },

  // Violation Streams Section
  { section: 'Violation Streams', divider: true },
  { key: 'home',       label: 'Dashboard',             icon: 'home',    badge: null },
  { key: 'sod-04',     label: 'Immediate Actions',     icon: 'flame',   badge: '7',    severity: 'Critical' },
  { key: 'sod-05',     label: 'Risk Exposure',         icon: 'impact',  badge: '$28M' },
  { key: 'sod-06',     label: 'Super-Admins',          icon: 'shield',  badge: '23',   severity: 'Critical' },
  { key: 'sod-07',     label: 'Dual Control',          icon: 'split',   badge: '184'  },
  { key: 'sod-08',     label: 'Emergency Access',      icon: 'flame',   badge: '31',   severity: 'High' },
  { key: 'sod-p2p',    label: 'P2P Violations',        icon: 'package', badge: '89',   severity: 'Critical' },
  { key: 'sod-09',     label: 'O2C Violations',        icon: 'cycle',   badge: '47'   },
  { key: 'sod-10',     label: 'Service Accounts',      icon: 'bot',     badge: '62'   },
  { key: 'sod-11',     label: 'Remediation',           icon: 'wrench',  badge: '312'  },
  { key: 'sod-12',     label: 'Continuous Compliance', icon: 'shield',  badge: null   },
];

window.Sidebar = function({ active, onNavigate, isOpen, onClose }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col bg-[#F9FAFB] border-r border-ink-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* 1. System Branding */}
      <div className="flex h-16 items-center justify-between gap-3 px-5 border-b border-ink-100 bg-white">
        <div className="flex items-center gap-3">
          <img src="kternai.png" alt="KTern.AI Logo" className="h-8 w-auto object-contain" />
          <div className="h-6 w-px bg-ink-200" />
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500 leading-tight">SoD<br/>Agent</div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-ink-50 text-ink-400">
           <window.Icon name="x" className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Deployment Instance */}
      <div className="px-4 pt-5 pb-4">
        <div className="rounded-lg bg-white px-3.5 py-2.5 text-left ring-1 ring-ink-200 shadow-sm">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-ink-500">PRD Cluster</span>
            </div>
            <div className="truncate font-mono text-[12px] font-bold text-ink-900 tracking-tighter uppercase">LCKR-S4H-007</div>
          </div>
        </div>
      </div>

      {/* 3. Global Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scrollbar">
        {NAV.map((item, idx) => {
          if (item.divider) {
            return (
              <div key={item.section} className="px-3 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                {item.section}
              </div>
            );
          }
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150
                ${isActive
                  ? 'bg-brand-50 text-brand-700 font-semibold ring-1 ring-brand-100 shadow-sm'
                  : 'text-ink-600 hover:bg-ink-100/50 hover:text-ink-900'}`}>
              
              {isActive && <div className="absolute left-0 h-4 w-1 rounded-r-full bg-brand-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />}
              
              <window.Icon 
                name={item.icon} 
                className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-600' : 'text-ink-400 group-hover:text-ink-600'}`} 
                strokeWidth={1.5} 
              />
              
              <span className="flex-1 text-left text-[13px] tracking-tight">{item.label}</span>
              
              {item.badge && (
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ring-1 ring-inset
                  ${isActive 
                    ? 'bg-brand-100 text-brand-700 ring-brand-200' 
                    : item.severity === 'Critical' ? 'bg-rose-50 text-rose-600 ring-rose-100' : 'bg-ink-100 text-ink-500 ring-ink-200'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="px-3 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">Workspace</div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-ink-600 hover:bg-ink-100/50 hover:text-ink-900 transition-all">
          <window.Icon name="clock" className="w-4 h-4 text-ink-400" strokeWidth={1.5} />
          <span className="text-[13px] tracking-tight">History</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-ink-600 hover:bg-ink-100/50 hover:text-ink-900 transition-all">
          <window.Icon name="bell" className="w-4 h-4 text-ink-400" strokeWidth={1.5} />
          <span className="flex-1 text-left text-[13px] tracking-tight">Alerts</span>
          <span className="rounded-full bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">3</span>
        </button>
      </nav>

      {/* 4. Operator Information */}
      <div className="p-4 border-t border-ink-100 bg-white">
        <div className="flex w-full items-center gap-3 rounded-xl p-2">
          <div className="relative shrink-0">
            <div className="grid h-8 w-8 place-items-center rounded bg-ink-900 text-[11px] font-bold text-white shadow-sm">SK</div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-[13px] font-bold text-ink-900 tracking-tight">Seo-yeon Kim</div>
            <div className="truncate text-[10px] font-bold uppercase tracking-wider text-ink-400">Lead Audit</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

window.TopBar = function({ active, onNavigate, onToggleSidebar }) {
  const { RUN } = window.MOCK;
  const labels = {
    home: 'Dashboard',
    'sod-04': 'Immediate Actions',
    'sod-05': 'Risk Exposure',
    'sod-06': 'Super-Admins',
    'sod-07': 'Dual Control',
    'sod-08': 'Emergency Access',
    'sod-09': 'OTC Violations',
    'sod-10': 'Service Accounts',
    'sod-11': 'Remediation Plan',
    'sod-12': 'Continuous Compliance',
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-ink-200 bg-white/95 px-4 md:px-8 py-0 backdrop-blur flex items-center justify-between">
      {/* 1. Nav Toggle + Title */}
      <div className="flex items-center gap-3 md:gap-6">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-ink-50 text-ink-600">
           <window.Icon name="filter" className="w-5 h-5 rotate-90" />
        </button>
        <div className="flex items-center gap-3">
           <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-ink-400 bg-ink-50 px-2 py-0.5 rounded ring-1 ring-inset ring-ink-200 whitespace-nowrap">Session</div>
           <span className="font-mono text-[12px] font-bold text-brand-600 tracking-tight whitespace-nowrap">{RUN.id}</span>
        </div>
        <div className="h-4 w-px bg-ink-200 hidden sm:block" />
        <h1 className="text-[14px] md:text-[15px] font-bold text-ink-900 tracking-tight uppercase tracking-wider truncate">{labels[active]}</h1>
      </div>

      {/* 2. Operational Telemetry (Adaptive) */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 md:gap-3 md:pl-6 md:border-l border-ink-100">
          <window.ExportButton label={window.innerWidth < 640 ? 'Export' : 'Download Report'} size="md" />
        </div>
      </div>
    </header>
  );
};

function TelemetryItem({ label, value, color, isMono }) {
  return (
    <div className="shrink-0">
      <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink-400 mb-0.5 text-right">{label}</div>
      <div className="flex items-center justify-end gap-1.5">
        {color && <div className="h-1 w-1 rounded-full animate-pulse" style={{ background: color }} />}
        <span className={`text-[12px] font-bold text-ink-800 ${isMono ? 'font-mono' : ''} tracking-tight`}>{value}</span>
      </div>
    </div>
  );
}
