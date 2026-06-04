const { useState, useRef, useEffect } = React;

const PAGE_TITLES = {
  'runs':    ['Runs', 'Analysis Runs'],
  'home':    ['Dashboard', 'Executive Overview'],
  'sod-04':  ['Immediate Actions', 'Critical Violations requiring urgent remediation'],
  'sod-05':  ['Compliance Impact', 'Compliance impact assessment across user population'],
  'sod-06':  ['Super Administrators', 'Privileged account monitoring and control'],
  'sod-07':  ['Cross-Process Conflicts', 'Dual process control and conflict analysis'],
  'sod-08':  ['Emergency Access', 'Firefighter ID lifecycle and usage monitoring'],
  'sod-p2p': ['Procure-to-Pay', 'High-risk authorization combinations in P2P cycle'],
  'sod-09':  ['Order-to-Cash', 'OTC lifecycle control and ownership violations'],
  'sod-10':  ['Service Accounts', 'High-risk service account detection and governance'],
  'sod-11':  ['Remediation', 'Execution tracking and remediation governance'],
  'sod-12':  ['Continuous Compliance', 'Periodic scan trends and rule deployment log'],
};

const STREAM_PAGES = [
  { key: 'sod-04',  label: 'Immediate Actions'      },
  { key: 'sod-05',  label: 'Compliance Impact'       },
  { key: 'sod-06',  label: 'Super Administrators'    },
  { key: 'sod-07',  label: 'Cross-Process Conflicts' },
  { key: 'sod-08',  label: 'Emergency Access'        },
  { key: 'sod-p2p', label: 'Procure-to-Pay'          },
  { key: 'sod-09',  label: 'Order-to-Cash'           },
  { key: 'sod-10',  label: 'Service Accounts'        },
  { key: 'sod-11',  label: 'Remediation'             },
  { key: 'sod-12',  label: 'Continuous Compliance'   },
];

const MOCK_RUNS = window.MOCK.ANALYSIS_RUNS.map(r => ({
  id: r.id,
  label: `${r.id} · ${r.date.split(' · ')[0]}`
}));

/* ── Dropdown primitive ─────────────────────────────────────── */
function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(o => !o)}>{trigger(open)}</div>
      {open && (
        <div
          className="absolute left-0 top-full mt-1.5 z-50 min-w-[220px] rounded-xl border border-ink-200 bg-white shadow-pop py-1 overflow-hidden"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Top Bar ────────────────────────────────────────────────── */
function TopBar({ active, onNavigate, selectedRun, onRunChange }) {
  const isStream = STREAM_PAGES.some(p => p.key === active);
  const currentStream = STREAM_PAGES.find(p => p.key === active);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ink-100 shadow-sm">
      <div className="flex items-center gap-3 px-4 md:px-6 h-14">

        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 shrink-0 mr-2"
        >
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-red-600 text-white">
            <Icon name="shield" className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[13px] font-bold text-ink-900 tracking-tight hidden sm:block">
            KTern SoD
          </span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-ink-200 hidden sm:block" />

        {/* Run selector */}
        <Dropdown trigger={open => (
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors ${open ? 'bg-ink-100 text-ink-900' : 'bg-ink-50 text-ink-700 hover:bg-ink-100'}`}>
            <Icon name="file" className="w-3.5 h-3.5 text-ink-400" />
            <span className="hidden md:block">{selectedRun.label}</span>
            <span className="md:hidden">{selectedRun.id}</span>
            <Icon name="chevronDown" className="w-3 h-3 text-ink-400" />
          </button>
        )}>
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-400">Analysis Runs</div>
          {MOCK_RUNS.map(r => (
            <button
              key={r.id}
              onClick={() => onRunChange(r)}
              className={`w-full text-left px-3 py-2 text-[12px] transition-colors flex items-center justify-between gap-3 ${r.id === selectedRun.id ? 'bg-red-50 text-red-700 font-bold' : 'text-ink-700 hover:bg-ink-50 font-medium'}`}
            >
              <span>{r.label}</span>
              {r.id === selectedRun.id && <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">Active</span>}
            </button>
          ))}
          <div className="border-t border-ink-100 mt-1 pt-1">
            <button
              onClick={() => onNavigate('runs')}
              className="w-full text-left px-3 py-2 text-[12px] text-brand-600 font-bold hover:bg-ink-50 transition-colors"
            >
              View all runs →
            </button>
          </div>
        </Dropdown>

        {/* Violation Streams dropdown */}
        <Dropdown trigger={open => (
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors ${isStream ? 'bg-red-600 text-white' : open ? 'bg-ink-100 text-ink-900' : 'bg-ink-50 text-ink-700 hover:bg-ink-100'}`}>
            <Icon name="table" className="w-3.5 h-3.5" />
            <span className="hidden md:block">{isStream ? currentStream.label : 'Violation Streams'}</span>
            <Icon name="chevronDown" className={`w-3 h-3 ${isStream ? 'text-white/70' : 'text-ink-400'}`} />
          </button>
        )}>
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-400">Analysis Streams</div>
          {STREAM_PAGES.map(p => (
            <button
              key={p.key}
              onClick={() => onNavigate(p.key)}
              className={`w-full text-left px-3 py-2 text-[12px] transition-colors font-medium ${active === p.key ? 'bg-red-50 text-red-700 font-bold' : 'text-ink-700 hover:bg-ink-50'}`}
            >
              {p.label}
            </button>
          ))}
        </Dropdown>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav pills */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors ${active === 'home' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('runs')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors ${active === 'runs' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
          >
            Runs
          </button>
        </nav>
      </div>

      {/* Breadcrumb strip for stream pages */}
      {isStream && (
        <div className="flex items-center gap-2 px-4 md:px-6 py-2 bg-ink-50 border-t border-ink-100 text-[11px]">
          <button onClick={() => onNavigate('home')} className="text-ink-400 hover:text-ink-700 font-medium transition-colors">Dashboard</button>
          <span className="text-ink-300">/</span>
          <span className="font-bold text-ink-700">{currentStream?.label}</span>
        </div>
      )}
    </header>
  );
}

/* ── Page Stub ──────────────────────────────────────────────── */
const PageStub = ({ active }) => {
  const [, title] = PAGE_TITLES[active] || ['', 'Page'];
  return (
    <div className="px-4 md:px-7 py-10">
      <div className="rounded-2xl bg-white shadow-card ring-1 ring-ink-200 p-8 md:p-12 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-ink-50 text-ink-400 ring-1 ring-ink-200">
          <Icon name="file" className="w-7 h-7" />
        </div>
        <h2 className="mt-4 text-[20px] font-semibold text-ink-900">{title}</h2>
        <p className="mt-1 text-sm text-ink-500 max-w-md mx-auto">This page is under construction.</p>
      </div>
    </div>
  );
};

/* ── App ────────────────────────────────────────────────────── */
const App = () => {
  const [active, setActive]         = useState('runs');
  const [selectedRun, setSelectedRun] = useState(MOCK_RUNS[0]);

  const handleNavigate = key => {
    setActive(key);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (active === 'runs')    return <window.RunsPage onNavigate={handleNavigate} />;
    if (active === 'home')    return <window.LaunchPage onNavigate={handleNavigate} />;
    if (active === 'sod-04')  return <Sod04Page />;
    if (active === 'sod-05')  return <Sod05Page />;
    if (active === 'sod-06')  return <Sod06Page />;
    if (active === 'sod-07')  return <Sod07Page />;
    if (active === 'sod-08')  return <Sod08Page />;
    if (active === 'sod-p2p') return <window.SodP2pPage />;
    if (active === 'sod-09')  return <Sod09Page />;
    if (active === 'sod-10')  return <Sod10Page />;
    if (active === 'sod-11')  return <Sod11Page />;
    if (active === 'sod-12')  return <Sod12Page />;
    return <PageStub active={active} />;
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 overflow-x-hidden">
      <TopBar
        active={active}
        onNavigate={handleNavigate}
        selectedRun={selectedRun}
        onRunChange={setSelectedRun}
      />
      <main className="flex-1 overflow-x-hidden">{renderPage()}</main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);