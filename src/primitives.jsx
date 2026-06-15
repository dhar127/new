/* Global SoD Agent Primitives
   Direct window assignment to bypass browser-transpiler scope issues. */

window.SEV_HEX = {
  Critical: '#EF4444',
  High:     '#F97316',
  Medium:   '#EAB308',
  Low:      '#3B82F6',
  Good:     '#22C55E',
};

window.SEV_STYLE = {
  Critical: 'bg-rose-50 text-rose-700 ring-rose-200',
  High:     'bg-orange-50 text-orange-700 ring-orange-200',
  Medium:   'bg-amber-50 text-amber-700 ring-amber-200',
  Low:      'bg-blue-50 text-blue-700 ring-blue-200',
};

window.SEV_DOT = {
  Critical: 'bg-sev-critical',
  High:     'bg-sev-high',
  Medium:   'bg-sev-medium',
  Low:      'bg-sev-low',
};

window.STATUS_STYLE = {
  Open:          'bg-ink-100 text-ink-700 ring-ink-200',
  'In Progress': 'bg-blue-50 text-blue-700 ring-blue-200',
  Resolved:      'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

window.SAP_GLOSSARY = {
  'FB60':  'Post incoming vendor invoice',
  'FB50':  'Post a manual general-ledger entry',
  'F-28':  'Apply incoming customer payment',
  'F-58':  'Post a manual outgoing payment',
  'F110':  'Run the automatic payment program',
  'FBL1N': 'Display vendor line items',
  'FBL5N': 'Display customer line items',
  'FF67':  'Process / post bank statements',
  'ME21N': 'Create a purchase order',
  'ME22N': 'Change a purchase order',
  'ME23N': 'Display a purchase order',
  'ME29N': 'Release a purchase order',
  'MIGO':  'Post a goods receipt',
  'MIRO':  'Post an incoming logistics invoice',
  'VA01':  'Create a sales order',
  'VA02':  'Change a sales order',
  'VL01N': 'Create an outbound delivery',
  'VL02N': 'Change an outbound delivery',
  'VF01':  'Create a billing document (invoice the customer)',
  'VF02':  'Change a billing document',
  'VF04':  'Process the billing due list',
  'FK01':  'Create a vendor master record',
  'FK02':  'Change a vendor master record',
  'PA30':  'Maintain employee master data',
  'PC00':  'Run the payroll',
  'PFCG':  'Maintain authorization roles',
  'SU01':  'Create / change user master records',
  'SE38':  'Run any ABAP program',
  'SE16':  'Browse data tables directly',
  'SM30':  'Maintain configuration tables',
  'SM37':  'View / manage background jobs',
  'STMS':  'Release transports to production',
  'OBYC':  'Configure automatic GL account assignment',
  'SAP_ALL':                'Unrestricted access to every SAP function',
  'SAP_NEW':                'Access to all newly-shipped SAP authorizations',
  'PFCG_ROLE_MAINTAIN':     'Authority to create or change any SAP role',
  'SU01_USER_MAINTAIN':     'Authority to create / delete any SAP user',
  'ZFI_BR_GL_POSTING':      'Post documents to the general ledger',
  'ZFI_BR_AP_PAYMENT':      'Approve and release vendor payments',
  'ZFI_BR_AP_INVOICE':      'Post incoming vendor invoices',
  'ZFI_BR_TREASURY':        'Treasury functions · bank, payments, transfers',
  'ZFI_BR_BANK_RECON':      'Reconcile bank statements',
  'ZFI_BR_PERIOD_CLOSE':    'Period-close postings',
  'ZFI_BR_AR_CLEAR':        'Apply customer payments · AR clearing',
  'ZFI_BR_TAX_REPORT':      'Run tax extraction reports',
  'ZFI_BR_REPORTING':       'Run finance reports across company codes',
  'ZFI_BR_EXPENSE_POST':    'Post expense reports',
  'ZFI_BR_AUDIT_LOG':       'Read access to financial audit logs',
  'ZIT_BR_AUDIT_READ':      'Read-only access to audit logs',
  'ZIT_BR_ALL_EMPLOYEES':   'Cross-system IT employee role',
  'ZMM_BR_PO_DISPLAY_PRO':  'Display and change purchase orders',
  'ZMM_BR_PO_CREATE':       'Create purchase orders',
  'ZMM_BR_PO_RELEASE':      'Release / approve purchase orders',
  'ZMM_BR_VENDOR_CREATE':   'Create vendor master records',
  'ZMM_BR_VENDOR_SYNC':     'Inbound integration · vendor master sync',
  'ZMM_BR_GR_AUTO':         'Auto-post goods receipts for EDI POs',
  'ZSD_BR_BILLING_CREATE':  'Create billing documents (invoices)',
  'ZSD_BR_BILLING_RELEASE': 'Release billing documents to AR',
  'ZSD_BR_SO_CREATE':       'Create sales orders',
  'ZSD_BR_DELIVERY':        'Maintain outbound deliveries',
  'ZSD_BR_CUSTOMER_SYNC':   'Inbound integration · customer master sync',
  'ZHR_BR_PAYROLL_PROCESS': 'Run the payroll for all employees',
  'ZHR_BR_PAYROLL_POST':    'Post payroll results to finance',
  'ZHR_BR_MASTER_DATA':     'Maintain HR master records',
  'ZHR_BR_MASTER_SYNC':     'Inbound integration · HR master sync',
  'ZHR_BR_APPROVE':         'HR approval authority',
  'ZBC_BR_SYSTEM_ADMIN':    'Basis · full system administration',
  'ZBC_BR_TRANSPORT':       'Basis · release transports to production',
  'ZBC_BR_BACKGROUND':      'Basis · background job administration',
  'ZBC_BR_REPORTING':       'Basis · ABAP report execution',
  'ZBC_BR_RFC_GATEWAY':     'Basis · remote function gateway',
  'ZPM_BR_PROCUREMENT_1720':'Procurement role · plant 1720',
  'S_DATASET_FULL':         'OS-level file dataset access',
};

window.explain = function(code) {
  return window.SAP_GLOSSARY[code] || null;
};

/* -------------------- Components -------------------- */

window.Icon = function({ name, className = "w-4 h-4", strokeWidth = 2 }) {
  const paths = {
    home:       <><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></>,
    impact:     <><path d="M3 12h4l3-8 4 16 3-8h4"/></>,
    shield:     <><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></>,
    split:      <><path d="M6 4v4l-3 4 3 4v4"/><path d="M18 4v4l3 4-3 4v4"/><path d="M9 12h6"/></>,
    flame:      <><path d="M12 3c2 4 5 5 5 9a5 5 0 1 1-10 0c0-2 1.5-3 2-5 2 2 3 1 3-4z"/></>,
    cycle:      <><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></>,
    bot:        <><rect x="4" y="8" width="16" height="11" rx="2"/><path d="M12 8V4"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></>,
    wrench:     <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2 2-2-2 2-2z"/></>,
    download:   <><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></>,
    filter:     <><path d="M4 5h16"/><path d="M7 12h10"/><path d="M10 19h4"/></>,
    search:     <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    chevron:    <><path d="m9 6 6 6-6 6"/></>,
    chevronDown:<><path d="m6 9 6 6 6-6"/></>,
    arrow:      <><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></>,
    plus:       <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    x:          <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
    bell:       <><path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    user:       <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    check:      <><path d="m5 12 5 5 9-11"/></>,
    dot:        <circle cx="12" cy="12" r="3" fill="currentColor"/>,
    info:       <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/></>,
    spark:      <><path d="M12 3v4"/><path d="m6 8 3 2"/><path d="m18 8-3 2"/><path d="M12 14v7"/></>,
    clock:      <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    play:       <path d="M8 5v14l11-7z"/>,
    package:    <><path d="M12 2L3 6v6l9 5 9-5V6l-9-4z"/><path d="M12 12v8"/><path d="m5.5 9.5 6.5 3.5 6.5-3.5"/></>,
    file:       <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></>,
    table:      <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 4v16"/></>,
    sort:       <><path d="M7 4v16"/><path d="m4 8 3-4 3 4"/><path d="M17 20V4"/><path d="m14 16 3 4 3-4"/></>,
  };
  const p = paths[name];
  if (!p) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {p}
    </svg>
  );
};

window.SeverityBadge = function({ value, size = 'sm' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md font-bold ring-1 ring-inset uppercase tracking-wider ${window.SEV_STYLE[value] || 'bg-ink-100 text-ink-600 ring-ink-200'} ${size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 text-[10px]'}`}>
      <span className={`h-1 w-1 rounded-full ${window.SEV_DOT[value] || 'bg-ink-400'}`} />
      {value}
    </span>
  );
};

window.StatusBadge = function({ value, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset ${window.STATUS_STYLE[value] || 'bg-ink-100 text-ink-700 ring-ink-200'} ${className}`}>
      {value}
    </span>
  );
};

window.Button = function({ children, variant = 'secondary', size = 'md', icon, iconRight, className = '', ...rest }) {
  const variants = {
    primary:   'bg-ink-900 text-white hover:bg-ink-800',
    secondary: 'bg-white text-ink-700 ring-1 ring-inset ring-ink-200 hover:bg-ink-50',
    ghost:     'text-ink-600 hover:bg-ink-100',
    danger:    'bg-rose-600 text-white hover:bg-rose-500',
  };
  const sizes = { sm: 'px-2.5 py-1.5 text-xs', md: 'px-3 py-2 text-sm', lg: 'px-4 py-2.5 text-sm' };
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}>
      {icon && <window.Icon name={icon} className="w-4 h-4" />}
      {children}
      {iconRight && <window.Icon name={iconRight} className="w-4 h-4" />}
    </button>
  );
};

window.ExportButton = function({ label = 'Export', size = 'md' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <window.Button size={size} icon="download" iconRight="chevronDown" onClick={() => setOpen(o => !o)}>{label}</window.Button>
      {open && (
        <div className="absolute right-0 z-30 mt-1.5 w-40 overflow-hidden rounded-lg border border-ink-200 bg-white shadow-pop">
          <button 
            onClick={() => {
              setOpen(false);
              if (window.exportGrcExcel && window.MOCK && window.MOCK.RUN) {
                const runId = window.MOCK.RUN.id;
                const runData = window.getMockDataForRun(runId);
                window.exportGrcExcel(runId, runData.users, runData.risks);
              } else {
                alert("Excel export is not available for this run.");
              }
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
          >
            <span className="grid h-6 w-6 place-items-center rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">XLSX</span>
            Excel
          </button>
          <button onClick={() => setOpen(false)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50">
            <span className="grid h-6 w-6 place-items-center rounded bg-rose-50 text-rose-700 text-[10px] font-bold">PDF</span>
            PDF
          </button>
        </div>
      )}
    </div>
  );
};

window.AssignButton = function({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-1 text-xs font-medium transition ${value ? 'border-ink-200 bg-white text-ink-700 hover:bg-ink-50' : 'border-ink-300 text-ink-500 hover:bg-ink-50 hover:text-ink-700'}`}>
        {value ? (
          <>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-ink-800 text-[9px] font-semibold text-white">
              {value.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </span>
            {value}
          </>
        ) : (
          <>
            <window.Icon name="plus" className="w-3 h-3" />
            Assign
          </>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-48 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-pop">
          {window.MOCK.TEAMS.map(t => (
            <button key={t}
              onClick={() => { onChange(t); setOpen(false); }}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-xs text-ink-700 hover:bg-ink-50">
              <span className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-800 text-[9px] font-semibold text-white">
                  {t.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </span>
                {t}
              </span>
              {t === value && <window.Icon name="check" className="w-3 h-3 text-ink-500" />}
            </button>
          ))}
          {value && (
            <button onClick={() => { onChange(null); setOpen(false); }}
              className="flex w-full items-center gap-2 border-t border-ink-100 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50">
              <window.Icon name="x" className="w-3 h-3" /> Unassign
            </button>
          )}
        </div>
      )}
    </div>
  );
};

window.Delta = function({ value, invertGood = false, suffix = '' }) {
  if (value == null) return null;
  const positive = value > 0;
  const good = invertGood ? !positive : positive;
  if (value === 0) return <span className="text-xs text-ink-400">no change</span>;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${good ? 'text-emerald-600' : 'text-rose-600'}`}>
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
        {positive ? <path d="M2 8l4-4 4 4z"/> : <path d="M2 4l4 4 4-4z"/>}
      </svg>
      {Math.abs(value).toLocaleString()}{suffix}
    </span>
  );
};

window.KPICard = function({ label, value, delta, deltaInvertGood = false, deltaSuffix = '', tone = 'default', icon, sublabel, children, className = '' }) {
  const tones = {
    default:  'bg-white',
    critical: 'bg-gradient-to-br from-rose-50/70 to-white',
    high:     'bg-gradient-to-br from-orange-50/70 to-white',
    medium:   'bg-gradient-to-br from-amber-50/70 to-white',
    low:      'bg-gradient-to-br from-blue-50/70 to-white',
    good:     'bg-gradient-to-br from-emerald-50/70 to-white',
  };
  const ring = {
    default:  'ring-ink-200',
    critical: 'ring-rose-200',
    high:     'ring-orange-200',
    medium:   'ring-amber-200',
    low:      'ring-blue-200',
    good:     'ring-emerald-200',
  };
  return (
    <div className={`rounded-xl ${tones[tone]} px-4 py-3.5 shadow-card ring-1 ring-inset ${ring[tone]} ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500">{label}</div>
        {icon && <window.Icon name={icon} className="w-4 h-4 text-ink-400" />}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums text-ink-900 pop-in">{value}</span>
        {sublabel && <span className="text-xs text-ink-400">{sublabel}</span>}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
        {delta !== undefined && <window.Delta value={delta} invertGood={deltaInvertGood} suffix={deltaSuffix} />}
        {delta !== undefined && <span className="text-ink-300">vs last run</span>}
      </div>
      {children}
    </div>
  );
};

window.ComplianceGauge = function({ value, size = 168, stroke = 14, label = 'Compliance' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const off = c - (v / 100) * c;
  const color = v >= 80 ? '#22C55E' : v >= 65 ? '#EAB308' : v >= 50 ? '#F97316' : '#EF4444';
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 700ms ease' }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-semibold tabular-nums text-ink-900">{v}<span className="text-base font-medium text-ink-400">/100</span></div>
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">{label}</div>
        </div>
      </div>
    </div>
  );
};

window.Sparkline = function({ data, height = 38, width = 120, color = '#2563EB' }) {
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 4) + 2;
    const y = height - 2 - ((d - min) / range) * (height - 8);
    return [x, y];
  });
  const path = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  const area = `${path} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={area} fill={color} fillOpacity={0.08} />
      <path d={path} stroke={color} strokeWidth="1.75" fill="none" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 2.4 : 1.4} fill={color} />)}
    </svg>
  );
};

window.Section = function({ id, eyebrow, title, subtitle, action, children, className = '' }) {
  return (
    <section id={id} className={`rounded-2xl bg-white shadow-card ring-1 ring-ink-200 ${className}`}>
      <header className="flex items-end justify-between gap-3 border-b border-ink-100 px-5 py-4">
        <div>
          {eyebrow && <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">{eyebrow}</div>}
          <h2 className="mt-0.5 text-[18px] font-semibold text-ink-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </header>
      {children}
    </section>
  );
};

window.DetailHeader = function({ code, title, subtitle, frameworks }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 pb-4">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">{code}</div>
        <h1 className="mt-0.5 text-[24px] font-semibold leading-tight text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500 max-w-2xl">{subtitle}</p>}
      </div>
      {frameworks && (
        <div className="flex items-center gap-1.5">
          {frameworks.map(f => <span key={f} className="rounded-md bg-ink-100 px-2 py-1 text-[11px] font-medium text-ink-700 ring-1 ring-inset ring-ink-200">{f}</span>)}
        </div>
      )}
    </header>
  );
};

window.SectionLabel = function({ code, title, sub, action }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">{code}</div>
        <h2 className="mt-0.5 text-[18px] font-semibold text-ink-900">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-ink-500 max-w-2xl">{sub}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
};

window.PageNarrative = function({ headline, body, stats }) {
  return (
    <div className="rounded-2xl bg-white px-6 py-5 ring-1 ring-ink-200">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="text-[18px] font-semibold leading-snug text-ink-900 text-wrap-pretty" style={{textWrap: 'pretty'}}>{headline}</h2>
          {body && <p className="mt-2 text-sm text-ink-600 max-w-2xl">{body}</p>}
        </div>
        {stats && stats.length > 0 && (
          <div className="col-span-12 lg:col-span-4 grid" style={{gridTemplateColumns: `repeat(${stats.length}, minmax(0,1fr))`}}>
            {stats.map((s, i) => (
              <div key={i} className={`px-4 ${i > 0 ? 'border-l border-ink-200' : ''}`}>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{s.label}</div>
                <div className="mt-1 text-[22px] font-semibold leading-none tabular-nums" style={{color: s.color || '#0F172A'}}>{s.value}</div>
                {s.sub && <div className="mt-1 text-[11px] text-ink-500">{s.sub}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

window.Select = function({ value, onChange, options, placeholder = 'All' }) {
  return (
    <div className="relative">
      <select value={value || ''} onChange={e => onChange(e.target.value || null)} className="appearance-none rounded-lg border border-ink-200 bg-white py-1.5 pl-3 pr-8 text-sm text-ink-700 hover:bg-ink-50 focus:border-brand-500 focus:outline-none">
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <window.Icon name="chevronDown" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
    </div>
  );
};

window.SearchInput = function({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative">
      <window.Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-56 rounded-lg border border-ink-200 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-ink-400 focus:border-brand-500 focus:outline-none" />
    </div>
  );
};

window.FilterBar = function({ children, onClear, hasFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-ink-100 bg-ink-50/60 px-5 py-3">
      <window.Icon name="filter" className="w-4 h-4 text-ink-400" />
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-ink-500">Filter</span>
      {children}
      {hasFilters && <button onClick={onClear} className="ml-1 text-xs font-medium text-ink-500 hover:text-ink-800 underline-offset-2 hover:underline">Clear filters</button>}
    </div>
  );
};

window.Th = function({ children, sortKey, sort, onSort, align = 'left', className = '' }) {
  const active = sort && sort.key === sortKey;
  const dir = active ? sort.dir : null;
  return (
    <th onClick={sortKey ? () => onSort(sortKey) : undefined} className={`px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-ink-500 border-b border-ink-100 ${align === 'right' ? 'text-right' : 'text-left'} ${sortKey ? 'cursor-pointer select-none hover:bg-ink-50 transition-colors hover:text-ink-800' : ''} ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        {children}
        {sortKey && <span className={`text-[10px] transition-transform ${active ? 'text-ink-900 scale-110' : 'text-ink-300'}`}>{dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : '↕'}</span>}
      </span>
    </th>
  );
};

window.Pagination = function({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between border-t border-ink-100 bg-white px-5 py-3 text-xs text-ink-500">
      <span>Showing <b className="text-ink-700">{from}–{to}</b> of <b className="text-ink-700">{total.toLocaleString()}</b></span>
      <div className="flex items-center gap-1">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="rounded-md border border-ink-200 bg-white px-2 py-1 disabled:opacity-40 hover:bg-ink-50">‹ Prev</button>
        <span className="px-2 font-medium text-ink-700">Page {page} / {pages}</span>
        <button disabled={page >= pages} onClick={() => onPage(page + 1)} className="rounded-md border border-ink-200 bg-white px-2 py-1 disabled:opacity-40 hover:bg-ink-50">Next ›</button>
      </div>
    </div>
  );
};

window.Tooltip = function({ tip, children, align = 'top', className = '', tooltipClassName = '' }) {
  if (!tip) return <>{children}</>;
  const placement = { 
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5', 
    'top-left': 'bottom-full left-0 mb-1.5',
    'top-right': 'bottom-full right-0 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5', 
    'bottom-left': 'top-full left-0 mt-1.5',
    'bottom-right': 'top-full right-0 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5', 
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5' 
  };
  return (
    <span className={`group/tt relative inline-flex ${className}`}>
      {children}
      <span className={`pointer-events-none absolute z-50 ${placement[align]} shadow-pop opacity-0 transition-opacity duration-150 group-hover/tt:opacity-100 rounded-lg p-2.5 text-[11px] leading-snug ${tooltipClassName || 'w-max max-w-[340px] bg-ink-800 text-white border border-ink-700/50 rounded-xl px-3 py-2 font-medium normal-case'}`}>{tip}</span>
    </span>
  );
};

window.TCode = function({ code, size = 'sm', className = '' }) {
  return (
    <window.Tooltip tip={window.explain(code)}>
      <span className={`inline-flex items-center rounded font-mono font-medium tracking-tight cursor-help ${size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} bg-ink-900 text-white ${className}`}>{code}</span>
    </window.Tooltip>
  );
};

window.Role = function({ role, size = 'sm', className = '' }) {
  return (
    <window.Tooltip tip={window.explain(role)}>
      <span className={`inline-flex items-center font-mono font-medium cursor-help border-b border-dotted border-ink-400 ${size === 'sm' ? 'text-[11px]' : 'text-xs'} text-ink-800 ${className}`}>{role}</span>
    </window.Tooltip>
  );
};

window.CodeWithExplain = function({ code, type = 'tcode' }) {
  return (
    <div className="inline-flex items-baseline gap-1.5">
      {type === 'tcode' ? <window.TCode code={code} /> : <window.Role role={code} />}
      <span className="text-[11px] text-ink-500">{window.explain(code) || '—'}</span>
    </div>
  );
};

window.StatCard = function({ label, value, sub, delta, deltaInvertGood, severity, icon, footer, metricKey, onClick }) {
  const accent = severity ? window.SEV_HEX[severity] : null;
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-white px-4 py-4 ring-1 ring-ink-200 shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
    >
      {accent && <span className="absolute inset-y-0 left-0 w-1" style={{ background: accent }} />}
      <div className="flex items-start justify-between gap-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500 flex items-center gap-1">
          {label}
          {metricKey && <window.GRCInfoTooltip metricKey={metricKey} />}
        </div>
        {icon && <window.Icon name={icon} className="w-4 h-4 text-ink-400" />}
      </div>
      <div className="mt-2 flex items-baseline gap-2 text-wrap-balance">
        <span className="text-[28px] font-bold leading-none tabular-nums text-ink-900">{value}</span>
        {sub && <span className="text-[11px] font-medium text-ink-500 uppercase tracking-tight">{sub}</span>}
      </div>
      {delta !== undefined && delta !== null && (
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold">
          <window.Delta value={delta} invertGood={deltaInvertGood} />
          <span className="text-ink-400 font-normal">vs last run</span>
        </div>
      )}
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};

/* ── GRC Click-to-View Metadata Registry ────────────────────── */
window.GRC_METRIC_METADATA = {
  'complianceScore': {
    name: 'Compliance Score (Risk Coverage)',
    means: 'Measures the overall security coverage of defined segregation of duties checks against unmitigated risk exposure.',
    calculated: 'Calculates risk coverage based on weighted unmitigated risks against weighted defined risks.',
    fields: 'USR02 (User Master), AGR_USERS (User Role Assignments), AGR_TCODES (Transactions in Roles)',
    ruleset: 'SAP GRC Global SoD Matrix v4.2',
    filters: 'Active dialog users in client 100',
    exclusions: 'Locked and technical service accounts',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Risk Coverage Score = ( 1 - WUR / WDR ) * 100. SOD-01: Critical: 18 (Weight *1.0), High: 19 (Weight *0.6), Medium: 9 (Weight *0.3), Low: 0 (Weight *0.1)'
  },
  'totalUsers': {
    name: 'Total Users Scanned',
    means: 'The total count of dialogue and technical SAP users evaluated during this assessment run.',
    calculated: 'Select Count(*) from USR02 where Client = :selected_client.',
    fields: 'USR02 (SAP User Master Table)',
    ruleset: 'SAP Standard Rule Set',
    filters: 'All user types (Dialog, System, Service, Reference, Background)',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(unique UserIDs)'
  },
  'totalViolations': {
    name: 'Total Violations',
    means: 'Total count of active transaction-level or authorization-level conflicts flagged across the system.',
    calculated: 'Sum of all matched conflicting transaction codes present in user roles.',
    fields: 'AGR_USERS, AGR_1251 (Authorizations), UST04 (User Profiles)',
    ruleset: 'SAP GRC Global SoD Matrix v4.2',
    filters: 'Production client only',
    exclusions: 'Mitigated risks with active control assignments',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Sum(flagged conflicts)'
  },
  'criticalViolations': {
    name: 'Critical Violations',
    means: 'High-severity conflicts representing immediate financial threat or complete system control breakdown.',
    calculated: 'Violations where severity weight is flagged as CRITICAL.',
    fields: 'AGR_1251, USR02, SAP Rule Matrix Severity',
    ruleset: 'SOX Compliance Ruleset',
    filters: 'Active users only',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(violations where severity = Critical)'
  },
  'highViolations': {
    name: 'High Violations',
    means: 'Conflicts that bypass dual control or violate core segregation policies in procurement/finance.',
    calculated: 'Violations where severity weight is flagged as HIGH.',
    fields: 'AGR_1251, USR02, SAP Rule Matrix Severity',
    ruleset: 'SOX Compliance Ruleset',
    filters: 'Active users only',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(violations where severity = High)'
  },
  'mediumViolations': {
    name: 'Medium Violations',
    means: 'Minor authorization overlaps requiring periodic review or operational mitigation.',
    calculated: 'Violations where severity weight is flagged as MEDIUM.',
    fields: 'AGR_1251, USR02, SAP Rule Matrix Severity',
    ruleset: 'SAP GRC Standard ruleset',
    filters: 'None',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(violations where severity = Medium)'
  },
  'lowViolations': {
    name: 'Low Violations',
    means: 'Low-impact authorization overlaps representing procedural inefficiencies rather than audit failure.',
    calculated: 'Violations where severity weight is flagged as LOW.',
    fields: 'AGR_1251, USR02, SAP Rule Matrix Severity',
    ruleset: 'SAP GRC Standard ruleset',
    filters: 'None',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(violations where severity = Low)'
  },
  'sapGrcBaseline': {
    name: 'SAP GRC Baseline Score',
    means: 'The target baseline standard score defined by SAP GRC Best Practices for this industry sector.',
    calculated: 'Statistically aggregated compliance score from standard SAP audits.',
    fields: 'SAP GRC Standard Sector Reports',
    ruleset: 'SAP GRC Best Practice Benchmarks v10',
    filters: 'Chemical Manufacturing sector peer group',
    exclusions: 'None',
    run: 'Reference Baseline',
    date: 'Jan 2026',
    formula: 'Weighted average of peer compliance metrics'
  },
  'superAdmins': {
    name: 'Super Administrators (SOD-06)',
    means: 'Count of user accounts containing the SAP_ALL profile or combinations of SU01 and PFCG.',
    calculated: 'Accounts with SAP_ALL/SAP_NEW profiles or active transactions SU01 + PFCG.',
    fields: 'UST04 (User Profiles), AGR_TCODES (Role T-codes)',
    ruleset: 'SAP GRC Administrator Audit Rules',
    filters: 'Production systems only',
    exclusions: 'Temporary emergency IDs (tracked under SOD-08)',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(Users with SU01 & PFCG) + Count(Users with SAP_ALL)'
  },
  'dualControl': {
    name: 'Dual Process Control (SOD-07)',
    means: 'Violations involving cross-process overlaps such as vendor creation combined with payment approval.',
    calculated: 'Accounts holding both Process A and Process B transaction sets.',
    fields: 'AGR_USERS, AGR_TCODES',
    ruleset: 'Cross-Process Segregation Matrix',
    filters: 'Client 100 active dialogs',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Intersection(Users with Process A, Users with Process B)'
  },
  'emergencyAccess': {
    name: 'Emergency Access (SOD-08)',
    means: 'Privileged emergency firefighter sessions active or unapproved beyond the SLA window.',
    calculated: 'Sessions exceeding 15 days or lacking official manager signature approval.',
    fields: '/GRCPI/GRIA_FFLOG (Firefighter Session Log)',
    ruleset: 'Lotte Emergency Access Policy',
    filters: 'Production environment only',
    exclusions: 'Mitigated emergency accounts',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(Sessions > 15 days) + Count(Unapproved activations)'
  },
  'otcControl': {
    name: 'OTC Control (SOD-09)',
    means: 'Order-to-Cash cycle overlaps where a single identity controls multiple steps from order entry to payment collection.',
    calculated: 'Users holding combinations of VA01, VL01N, VF01, and F-28 authorizations.',
    fields: 'AGR_USERS, AGR_TCODES',
    ruleset: 'OTC Lifecycle Segregation Rules',
    filters: 'Production client only',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(Users with >=2 OTC steps)'
  },
  'serviceAccounts': {
    name: 'High-Risk Service Accounts (SOD-10)',
    means: 'Non-human technical accounts with excessive authorizations or dormant activity profiles.',
    calculated: 'System/Service accounts holding critical roles or inactive for more than 60 days.',
    fields: 'USR02 (User Type & Last Login)',
    ruleset: 'Service Account Governance Rule',
    filters: 'UserType != Dialog',
    exclusions: 'None',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(Technical accounts where Privilege = Critical OR Inactivity > 60d)'
  },
  'remediation': {
    name: 'Remediation Tasks (SOD-11)',
    means: 'Open roles or user mappings currently assigned for redesign or access removal.',
    calculated: 'Open tasks logged in the GRC remediation tracker.',
    fields: 'KTern Governance logs, Remediation master table',
    ruleset: 'Remediation Policy Rules',
    filters: 'Open and in-progress tasks',
    exclusions: 'Closed / verified tasks',
    run: 'LCSOD-2026-Q2-007',
    date: 'May 19, 2026',
    formula: 'Count(Remediation actions where Status != Resolved)'
  }
};

/* ── GRC Click-to-View Info Tooltip Component ───────────────── */
window.GRCInfoTooltip = function({ metricKey }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const meta = window.GRC_METRIC_METADATA[metricKey];
  if (!meta) return null;

  return (
    <div className="relative inline-block ml-1" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="text-ink-400 hover:text-brand-600 transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
        title="View metric details"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="16.5" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="bold" fontSize="13" textAnchor="middle" fill="currentColor" stroke="none">i</text>
        </svg>
      </button>

      {open && (
        <div 
          className="absolute z-50 mt-2 p-4 bg-white border border-ink-200 rounded-xl shadow-pop text-left text-xs text-ink-800"
          style={{
            width: '320px',
            right: window.innerWidth - (ref.current?.getBoundingClientRect().right || 0) < 160 ? '0px' : 'auto',
            left: window.innerWidth - (ref.current?.getBoundingClientRect().right || 0) < 160 ? 'auto' : '0px',
            top: '100%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-bold text-ink-900 border-b border-ink-100 pb-1.5 mb-2 text-sm flex items-center justify-between">
            <span>{meta.name}</span>
            <span className="text-[9px] font-mono bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded">GRC Metric</span>
          </div>
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            <div>
              <span className="font-bold text-ink-500 block text-[9.5px] uppercase">Description</span>
              <p className="text-ink-700 leading-snug">{meta.means}</p>
            </div>
            <div>
              <span className="font-bold text-ink-500 block text-[9.5px] uppercase">How Calculated</span>
              <p className="text-ink-700 leading-snug">{meta.calculated}</p>
            </div>
            <div>
              <span className="font-bold text-ink-500 block text-[9.5px] uppercase">Formula</span>
              <code className="block bg-ink-50 p-1.5 rounded font-mono text-[10px] text-ink-800 border border-ink-150 leading-snug whitespace-pre-wrap">{meta.formula}</code>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink-100">
              <div>
                <span className="font-bold text-ink-500 block text-[9px] uppercase">SAP Fields</span>
                <span className="text-ink-700 text-[10px] leading-tight font-mono">{meta.fields}</span>
              </div>
              <div>
                <span className="font-bold text-ink-500 block text-[9px] uppercase">Rule Set</span>
                <span className="text-ink-700 text-[10px] leading-tight">{meta.ruleset}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink-100">
              <div>
                <span className="font-bold text-ink-500 block text-[9px] uppercase">Filters</span>
                <span className="text-ink-700 text-[10px] leading-tight">{meta.filters}</span>
              </div>
              <div>
                <span className="font-bold text-ink-500 block text-[9px] uppercase">Exclusions</span>
                <span className="text-ink-700 text-[10px] leading-tight">{meta.exclusions}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400">
              <span>Run: <b>{meta.run}</b></span>
              <span>Date: <b>{meta.date}</b></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.HeaderTooltip = function({ tip, align = 'bottom' }) {
  return (
    <window.Tooltip tip={tip} align={align} className="ml-1.5 shrink-0 select-none inline-flex items-center">
      <span className="inline-flex items-center justify-center text-ink-400 hover:text-ink-700 transition-colors cursor-help p-0.5 rounded focus:outline-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="16.5" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="bold" fontSize="13" textAnchor="middle" fill="currentColor" stroke="none">i</text>
        </svg>
      </span>
    </window.Tooltip>
  );
};

window.InteractiveGRCTable = function({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  exportLabel,
  onExport
}) {
  const [colOrder, setColOrder] = useState([]);
  const [visibleCols, setVisibleCols] = useState({});
  const [filters, setFilters] = useState({});
  const [filterSearch, setFilterSearch] = useState({});
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showColSettings, setShowColSettings] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (columns && columns.length > 0) {
      setColOrder(columns.map(c => c.id));
      setVisibleCols(columns.reduce((acc, c) => ({ ...acc, [c.id]: true }), {}));
    }
  }, [columns]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setShowColSettings(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const uniqueValues = useMemo(() => {
    const vals = {};
    columns.forEach(col => {
      const allVals = data.map(col.accessor).filter(v => v !== undefined && v !== null && v !== '');
      vals[col.id] = Array.from(new Set(allVals)).sort();
    });
    return vals;
  }, [data, columns]);

  const filteredData = useMemo(() => {
    let result = [...data];

    Object.keys(filters).forEach(colId => {
      const selectedVals = filters[colId];
      if (selectedVals && selectedVals.length > 0) {
        const colDef = columns.find(c => c.id === colId);
        if (colDef) {
          result = result.filter(row => {
            const val = String(colDef.accessor(row));
            return selectedVals.includes(val);
          });
        }
      }
    });

    if (sortCol) {
      const colDef = columns.find(c => c.id === sortCol);
      if (colDef) {
        result.sort((a, b) => {
          const valA = String(colDef.accessor(a) || '');
          const valB = String(colDef.accessor(b) || '');
          const compare = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
          return sortDir === 'asc' ? compare : -compare;
        });
      }
    }

    return result;
  }, [data, filters, sortCol, sortDir, columns]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const toggleColumnVisibility = (colId) => {
    setVisibleCols(prev => ({
      ...prev,
      [colId]: !prev[colId]
    }));
  };

  const handleSort = (colId) => {
    if (sortCol === colId) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(colId);
      setSortDir('asc');
    }
  };

  const toggleFilterValue = (colId, val) => {
    setFilters(prev => {
      const current = prev[colId] || [];
      const updated = current.includes(val) 
        ? current.filter(v => v !== val)
        : [...current, val];
      return { ...prev, [colId]: updated };
    });
  };

  const clearColumnFilter = (colId) => {
    setFilters(prev => {
      const updated = { ...prev };
      delete updated[colId];
      return updated;
    });
  };

  const selectAllColumnFilter = (colId) => {
    setFilters(prev => ({
      ...prev,
      [colId]: [...(uniqueValues[colId] || []).map(String)]
    }));
  };

  const hasAnyFilters = Object.keys(filters).some(k => filters[k] && filters[k].length > 0);

  const clearAllFilters = () => {
    setFilters({});
    setSortCol(null);
    setPage(1);
  };

  const handleDragStart = (e, colId) => {
    e.dataTransfer.setData('text/plain', colId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColId) => {
    const sourceColId = e.dataTransfer.getData('text/plain');
    if (sourceColId && sourceColId !== targetColId) {
      const newOrder = [...colOrder];
      const srcIdx = newOrder.indexOf(sourceColId);
      const tgtIdx = newOrder.indexOf(targetColId);
      newOrder.splice(srcIdx, 1);
      newOrder.splice(tgtIdx, 0, sourceColId);
      setColOrder(newOrder);
    }
  };

  const orderedVisibleColumns = colOrder
    .map(cid => columns.find(c => c.id === cid))
    .filter(c => c && visibleCols[c.id]);

  return (
    <div className="space-y-4" ref={dropdownRef}>
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-ink-200 shadow-sm text-left">
        <div className="flex items-center gap-2">
          {hasAnyFilters && (
            <button
              onClick={clearAllFilters}
              className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 ring-1 ring-inset ring-rose-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <window.Icon name="x" className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
          <span className="text-xs text-ink-500 font-semibold">
            Showing <b>{filteredData.length}</b> of <b>{data.length}</b> violations
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowColSettings(o => !o)}
            className="px-3 py-1.5 bg-white border border-ink-200 text-ink-700 hover:bg-ink-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <window.Icon name="filter" className="w-3.5 h-3.5" />
            <span>Show/Hide Columns</span>
          </button>

          {showColSettings && (
            <div className="absolute right-0 top-full mt-1.5 z-40 bg-white border border-ink-200 rounded-xl shadow-pop p-3 min-w-[200px] text-left max-h-[300px] overflow-y-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2 pb-1 border-b border-ink-100">Toggle Column Visibility</span>
              <div className="space-y-2">
                {columns.map(col => (
                  <label key={col.id} className="flex items-center gap-2 text-xs font-semibold text-ink-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!visibleCols[col.id]}
                      onChange={() => toggleColumnVisibility(col.id)}
                      className="rounded border-ink-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {onExport && (
            <button
              onClick={() => onExport(filteredData, orderedVisibleColumns)}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <window.Icon name="download" className="w-3.5 h-3.5" />
              <span>{exportLabel || 'Export Excel'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-ink-200 rounded-xl shadow-sm bg-white">
        <table className="w-full text-xs text-left border-collapse table-auto min-w-[1200px]">
          <thead className="bg-ink-50 border-b border-ink-200 text-ink-600 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              {orderedVisibleColumns.map(col => {
                const isFiltered = filters[col.id] && filters[col.id].length > 0;
                const isDropdownOpen = openDropdown === col.id;
                
                return (
                  <th
                    key={col.id}
                    className={`p-3 relative select-none hover:bg-ink-100/50 ${col.id === 'viewAction' ? 'w-28 min-w-[7rem] text-right' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, col.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col.id)}
                  >
                    <div className={`flex items-center justify-between gap-1.5 cursor-move ${col.id === 'viewAction' ? 'justify-end' : ''}`}>
                      <div className="flex items-center gap-1" onClick={() => handleSort(col.id)}>
                        <span className="truncate">{col.label}</span>
                        {col.tooltip && <window.HeaderTooltip tip={col.tooltip} />}
                        {sortCol === col.id && (
                          <span className="text-[9px] font-bold text-brand-600">
                            {sortDir === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(isDropdownOpen ? null : col.id);
                        }}
                        className={`p-1 rounded hover:bg-ink-200 transition-colors shrink-0 ${isFiltered ? 'text-brand-600' : 'text-ink-400'}`}
                      >
                        <window.Icon name="filter" className="w-3 h-3" />
                      </button>
                    </div>

                    {isDropdownOpen && (
                      <div
                        className="absolute left-0 mt-2 z-30 bg-white border border-ink-200 rounded-xl shadow-pop p-3 w-56 text-left normal-case font-medium text-ink-805"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-ink-450 uppercase">Filter values</span>
                          <button
                            onClick={() => clearColumnFilter(col.id)}
                            className="text-[9px] font-bold text-rose-600 hover:underline"
                          >
                            Clear
                          </button>
                        </div>

                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Search values..."
                            value={filterSearch[col.id] || ''}
                            onChange={(e) => setFilterSearch({ ...filterSearch, [col.id]: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-ink-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"
                          />
                        </div>

                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {uniqueValues[col.id]
                            ?.filter(val => {
                              const q = (filterSearch[col.id] || '').toLowerCase();
                              return String(val).toLowerCase().includes(q);
                            })
                            .map(val => {
                              const isChecked = (filters[col.id] || []).includes(String(val));
                              return (
                                <label key={String(val)} className="flex items-center gap-2 text-xs cursor-pointer select-none font-semibold text-ink-700">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleFilterValue(col.id, String(val))}
                                    className="rounded border-ink-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                                  />
                                  <span className="truncate">{String(val)}</span>
                                </label>
                              );
                            })}
                        </div>
                        
                        <div className="mt-2.5 pt-2.5 border-t border-ink-100 flex items-center justify-between">
                          <button
                            onClick={() => selectAllColumnFilter(col.id)}
                            className="text-[10px] font-bold text-ink-500 hover:underline"
                          >
                            Select All
                          </button>
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="px-2 py-1 bg-ink-900 hover:bg-ink-800 text-white rounded text-[10px] font-bold"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-150">
            {pagedData.map((row, idx) => {
              const trClasses = `row-hover transition-colors select-none ${onRowClick ? 'cursor-pointer' : ''}`;
              return (
                <tr
                  key={row.userId ? row.userId + '_' + idx : idx}
                  className={trClasses}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {orderedVisibleColumns.map(col => {
                    const val = col.accessor(row);
                    
                    let content = String(val);
                    if (col.renderCell) {
                      content = col.renderCell(row);
                    } else if (col.id === 'severity') {
                      content = <window.SeverityBadge value={val} />;
                    } else if (col.id === 'status') {
                      content = <window.StatusBadge value={val} className="px-2 py-0.5 text-[10px]" />;
                    } else if (col.isMono) {
                      content = <code className="font-mono text-brand-600 font-bold">{val}</code>;
                    } else if (col.id === 'viewAction') {
                      content = (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onRowClick) onRowClick(row);
                          }}
                          className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-[11px] rounded-lg transition-all inline-flex items-center gap-1 shadow-sm shrink-0"
                        >
                          <span>View</span>
                          <window.Icon name="arrow" className="w-3 h-3" />
                        </button>
                      );
                    }
                    
                    return (
                      <td
                        key={col.id}
                        className={`p-3 font-semibold text-ink-800 ${col.id === 'viewAction' ? 'w-28 min-w-[7rem] text-right whitespace-nowrap' : 'truncate max-w-xs'}`}
                        title={String(val)}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={orderedVisibleColumns.length} className="py-12 text-center text-sm font-bold text-ink-400 uppercase tracking-widest">
                  No records matching filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > pageSize && (
        <window.Pagination
          page={page}
          pageSize={pageSize}
          total={filteredData.length}
          onPage={setPage}
        />
      )}
    </div>
  );
};

window.RiskCoverageInfoPanel = function({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="bg-white border border-ink-200 rounded-xl p-5 shadow-sm animate-fade-in text-left mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-white border border-ink-200 flex items-center justify-center shrink-0 shadow-sm">
          <window.Icon name="info" className="w-4 h-4 text-brand-650" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-ink-500 uppercase tracking-wider">Calculation Methodology</h4>
          <div className="text-sm font-bold text-ink-900 mt-1 font-mono">
            Risk Coverage Score = ( 1 - WUR ÷ WDR ) × 100
          </div>
        </div>
      </div>
      <div className="text-xs text-ink-600 leading-relaxed max-w-xl flex-1 border-t md:border-t-0 md:border-l border-ink-150 pt-3 md:pt-0 md:pl-5">
        Where <b className="text-ink-900 font-bold">WDR</b> is Weighted Detected Risk and <b className="text-ink-900 font-bold">WUR</b> is Weighted Unmitigated Risk based on critical, high, medium, and low severity weight parameters.
      </div>
      <button onClick={onClose} className="text-ink-400 hover:text-ink-700 hover:bg-ink-100 p-1.5 rounded-lg transition-colors focus:outline-none self-start md:self-center">
        <window.Icon name="x" className="w-4 h-4" />
      </button>
    </div>
  );
};


