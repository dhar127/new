const { useState } = React;

const PageStub = ({ active, code, title }) => (
  <div className="px-4 md:px-7 py-10">
    <div className="rounded-2xl bg-white shadow-card ring-1 ring-ink-200 p-8 md:p-12 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-ink-50 text-ink-400 ring-1 ring-ink-200">
        <Icon name="file" className="w-7 h-7" />
      </div>
      <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">{code}</div>
      <h2 className="mt-1 text-[20px] font-semibold text-ink-900">{title}</h2>
      <p className="mt-1 text-sm text-ink-500 max-w-md mx-auto">
        Detail page scaffolding will land here next. Page 1 (Launch) is the only page built so far —
        confirm it before moving on.
      </p>
    </div>
  </div>
);

const PAGE_TITLES = {
  'runs':   ['Analysis Runs', 'Completed Analysis Runs'],
  'home':   ['Dashboard', 'SoD Analysis Executive Overview'],
  'sod-04': ['SOD-04', 'Immediate Actions'],
  'sod-05': ['SOD-05', 'Compliance Impact Assessment'],
  'sod-06': ['SOD-06', 'Super Administrators'],
  'sod-07': ['SOD-07', 'Dual Process Control'],
  'sod-08': ['SOD-08', 'Emergency Access'],
  'sod-p2p': ['SoD Analysis · P2P', 'Procure-to-Pay Violations'],
  'sod-09': ['SOD-09', 'Order-to-Cash Control Violations'],
  'sod-10': ['SOD-10', 'High-Risk Service Accounts'],
  'sod-11': ['SOD-11', 'Remediation & Governance'],
  'sod-12': ['SOD-12', 'Continuous Compliance'],
};

const App = () => {
  const [active, setActive] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    if (active === 'runs') return <window.RunsPage onNavigate={setActive} />;
    if (active === 'home') return <LaunchPage onNavigate={setActive} />;
    if (active === 'sod-04') return <Sod04Page />;
    if (active === 'sod-05') return <Sod05Page />;
    if (active === 'sod-06') return <Sod06Page />;
    if (active === 'sod-07') return <Sod07Page />;
    if (active === 'sod-08') return <Sod08Page />;
    if (active === 'sod-p2p') return <window.SodP2pPage />;
    if (active === 'sod-09') return <Sod09Page />;
    if (active === 'sod-10') return <Sod10Page />;
    if (active === 'sod-11') return <Sod11Page />;
    if (active === 'sod-12') return <Sod12Page />;
    const [code, title] = PAGE_TITLES[active] || ['', 'Page'];
    return <PageStub active={active} code={code} title={title} />;
  };

  const handleNavigate = (key) => {
    setActive(key);
    setSidebarOpen(false); // Close drawer on navigation (mobile)
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 overflow-x-hidden">
      {/* Sidebar - Drawer on mobile, fixed on desktop */}
      <Sidebar 
        active={active} 
        onNavigate={handleNavigate} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-ink-900/50 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col min-h-screen lg:ml-[252px] transition-all duration-300">
        <TopBar 
          active={active} 
          onNavigate={handleNavigate} 
          onToggleSidebar={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden">{renderPage()}</main>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
