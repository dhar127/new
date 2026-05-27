const RUN = {
  id: 'LCSOD-2026-Q2-007',
  name: 'Q2 2026 — Enterprise SoD Assessment',
  date: 'May 19, 2026 · 04:12 GMT+9',
  system: 'PRD · S/4HANA 2023 · LCKR-PRD-01',
  status: 'Completed',
  duration: '2h 47m',
  scope: '4,287 users · 18,492 role assignments',
};

const KPIS = {
  totalUsers: 4287,
  totalViolations: 1243,
  critical: 47,
  high: 186,
  medium: 412,
  low: 598,
  complianceScore: 72,
  severityBreakdown: {
    critical: 47,
    high: 186,
    medium: 412,
    low: 598
  },
  deltas: {
    totalUsers: +63,
    totalViolations: -94,
    critical: -8,
    high: -21,
    medium: +14,
    low: -79,
    complianceScore: +4,
  },
};

const COMPLIANCE = {
  maturityScore: 72,           // out of 100
  benchmarkSAPGRC: 81,         // SAP GRC industry baseline
  industryPeer: 68,            // chemicals sector median
  maturityLevel: 'Managed',    // Initial / Repeatable / Defined / Managed / Optimized
  trend: [58, 61, 60, 63, 66, 68, 70, 72],
  systemicWeaknesses: [
    'Concentration of admin authority in IT Compliance group',
    'Firefighter access lacking expiry policy',
    'OTC role boundaries blurred across SD + FI',
    'Service accounts without owner attestation',
  ],
};

const PROCESS_AREAS = ['Finance', 'Procurement', 'OTC', 'HR', 'IT'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
const TEAMS = ['SAP Basis Team', 'IT Compliance', 'Finance Risk', 'SAP Security Team'];

const CRITICAL_FINDINGS = [
  { id: 'V-1042', desc: 'User holds Create Vendor + Approve Payment authority', users: 7, severity: 'Critical', area: 'Procurement', action: 'Revoke ZFI_BR_AP_PAYMENT from BCARRIER, APOCHE, BGILL' },
  { id: 'V-1058', desc: 'Full OTC cycle control (Order → Bill → Collect) by single user', users: 4, severity: 'Critical', area: 'OTC', action: 'Split SD billing authority — redesign role ZSD_BR_BILLING_CREATE' },
  { id: 'V-1063', desc: 'GL Posting + Bank Reconciliation conflict via ZFI_BR_GL_POSTING', users: 11, severity: 'Critical', area: 'Finance', action: 'Implement mitigating control · daily reviewer log' },
  { id: 'V-1071', desc: 'PFCG role-admin combined with end-user transaction access', users: 3, severity: 'Critical', area: 'IT', action: 'Revoke PFCG from JSMITH_LC, KPARK_LC, HSCHRODE' },
  { id: 'V-1082', desc: 'HR Payroll Maintain + Approve assigned to same user', users: 2, severity: 'High', area: 'HR', action: 'Reassign approval to HR Compliance group' },
  { id: 'V-1090', desc: 'Firefighter ID active >180 days without re-attestation', users: 14, severity: 'High', area: 'IT', action: 'Force expiry — set 30-day max per Lotte policy' },
  { id: 'V-1094', desc: 'PO Create + PO Release threshold exceeds user grade authority', users: 9, severity: 'High', area: 'Procurement', action: 'Redesign ZPM_BR_PROCUREMENT_1720 release strategy' },
  { id: 'V-1101', desc: 'F110 Auto-Payment Run runnable by 5 non-treasury users', users: 5, severity: 'High', area: 'Finance', action: 'Restrict F110 to Treasury role pool' },
  { id: 'V-1112', desc: 'Customer Master Maintain + Sales Order Release', users: 6, severity: 'Medium', area: 'OTC', action: 'Monitor — flag for quarterly review' },
  { id: 'V-1124', desc: 'Background user RFC_BATCH_PI holds SAP_ALL equivalent', users: 1, severity: 'Critical', area: 'IT', action: 'Replace with scoped profile, rotate credentials' },
  { id: 'V-1131', desc: 'Goods Receipt + Invoice Verification by same user', users: 18, severity: 'Medium', area: 'Procurement', action: 'Enable three-way match enforcement in MIRO' },
  { id: 'V-1144', desc: 'Vendor Bank Detail edit + Payment Block remove', users: 4, severity: 'High', area: 'Finance', action: 'Move bank-detail edit to Vendor Master team only' },
];

const IMMEDIATE_ACTIONS = [
  { id: 'IA-204', desc: 'BCARRIER holds Create Vendor + Approve Payment in PRD', urgency: 'P1 · 24h', user: 'BCARRIER', action: 'Revoke ZFI_BR_AP_PAYMENT, force re-attestation', risk: '$2.4M payment fraud exposure', status: 'Open', assignee: null },
  { id: 'IA-205', desc: 'Background user RFC_BATCH_PI runs with SAP_ALL equivalent', urgency: 'P1 · 24h', user: 'RFC_BATCH_PI', action: 'Rotate credentials, replace with scoped profile', risk: 'Full-system compromise vector', status: 'In Progress', assignee: 'SAP Basis Team' },
  { id: 'IA-206', desc: 'Firefighter FF_FIN_03 assigned 214 days, last used 11d ago', urgency: 'P1 · 48h', user: 'APOCHE', action: 'Terminate assignment, require ticket-based re-issue', risk: 'Audit material weakness — SOX 302', status: 'Open', assignee: 'IT Compliance' },
  { id: 'IA-207', desc: '5 non-treasury users authorized to run F110 in PRD', urgency: 'P1 · 48h', user: 'JSMITH_LC +4', action: 'Strip F110 authorization, route to Treasury role', risk: 'Unauthorized payment run · $5M+ exposure', status: 'Open', assignee: 'Finance Risk' },
  { id: 'IA-208', desc: 'KPARK_LC granted PFCG + ME21N + FB60 simultaneously', urgency: 'P1 · 48h', user: 'KPARK_LC', action: 'Revoke PFCG, audit role changes last 90 days', risk: 'Privilege escalation + procurement abuse', status: 'Open', assignee: null },
  { id: 'IA-209', desc: 'Vendor bank-detail edit accessible to 4 AP clerks', urgency: 'P2 · 48h', user: 'BHOOPER +3', action: 'Move FK02 bank-tab to Vendor Master team only', risk: 'Vendor-bank-redirect fraud — high industry trend', status: 'Resolved', assignee: 'SAP Security Team' },
  { id: 'IA-210', desc: 'YKIM holds full OTC cycle (VA01 → VL01N → VF01 → F-28)', urgency: 'P1 · 24h', user: 'YKIM', action: 'Split SD billing — emergency role redesign', risk: 'Revenue manipulation · $1.8M exposure', status: 'In Progress', assignee: 'Finance Risk' },
];

/* SOD-12 Trend — last 8 runs */
const RUN_TREND = [
  { run: 'Q2-2025', date: '2025-05', new: 412, resolved: 0,   persisting: 1672, score: 58 },
  { run: 'Q3-2025', date: '2025-08', new: 198, resolved: 286, persisting: 1584, score: 61 },
  { run: 'Q4-2025', date: '2025-11', new: 142, resolved: 218, persisting: 1508, score: 60 },
  { run: 'Q1-2026', date: '2026-02', new: 121, resolved: 264, persisting: 1365, score: 63 },
  { run: 'M01-26', date: '2026-03', new: 87,  resolved: 198, persisting: 1254, score: 66 },
  { run: 'M02-26', date: '2026-04', new: 64,  resolved: 152, persisting: 1166, score: 68 },
  { run: 'M03-26', date: '2026-04', new: 52,  resolved: 138, persisting: 1080, score: 70 },
  { run: 'Q2-2026', date: '2026-05', new: 41,  resolved: 121, persisting: 1000, score: 72 },
];

/* Violation Category Navigation Cards — ordered per PRD SOD-04 → SOD-12 */
const CATEGORY_CARDS = [
  { key: 'sod-04', code: 'SOD-04', title: 'Immediate Actions',        count: 7,   severity: 'Critical', blurb: 'P1/P2 violations needing remediation within 24-48 hours', icon: 'flame' },
  { key: 'sod-05', code: 'SOD-05', title: 'Risk Exposure & Impact',   count: 15,  severity: 'Critical', blurb: 'Financial, operational & regulatory exposure assessment', icon: 'impact' },
  { key: 'sod-06', code: 'SOD-06', title: 'Super Administrators',     count: 23,  severity: 'Critical', blurb: 'Concentration-of-power risk · least-privilege gaps', icon: 'shield' },
  { key: 'sod-07', code: 'SOD-07', title: 'Dual Process Control',     count: 184, severity: 'Critical', blurb: 'Cross-process authority · Vendor / AP / OTC conflicts', icon: 'split' },
  { key: 'sod-08', code: 'SOD-08', title: 'Emergency Access',         count: 31,  severity: 'High',     blurb: 'Firefighter usage · approvals + anomaly detection', icon: 'flame' },
  { key: 'sod-09', code: 'SOD-09', title: 'OTC Control Violations',   count: 47,  severity: 'Critical', blurb: 'End-to-end Order-to-Cash control by single user', icon: 'cycle' },
  { key: 'sod-10', code: 'SOD-10', title: 'High-Risk Service Accounts', count: 62, severity: 'High',   blurb: 'Background, RFC, integration users · privilege drift', icon: 'bot' },
  { key: 'sod-11', code: 'SOD-11', title: 'Remediation & Governance', count: 312, severity: 'Medium',   blurb: 'Open recommendations · policy + role redesign', icon: 'wrench' },
  { key: 'sod-12', code: 'SOD-12', title: 'Continuous Compliance',    count: 847, severity: 'Low',      blurb: 'Automated GRC checks · rule deployment tracking', icon: 'shield' },
];

window.MOCK = {
  RUN, KPIS, COMPLIANCE,
  PROCESS_AREAS, SEVERITIES, TEAMS,
  CRITICAL_FINDINGS, IMMEDIATE_ACTIONS,
  RUN_TREND, CATEGORY_CARDS,
};

/* ============================================================ */
/* SOD-05 — Compliance Impact Assessment                         */
/* ============================================================ */

const IMPACT_CATEGORIES = ['Financial', 'Operational', 'Regulatory'];
const EXPOSURE_LEVELS = ['High', 'Medium', 'Low'];
const FRAMEWORKS = ['SOX', 'GDPR', 'ISO 27001', 'SAP GRC', 'K-SOX'];

/* Impact split for the donut */
const IMPACT_SPLIT = [
  { category: 'Financial',   count: 487, dollars: 12_400_000, color: '#EF4444' },
  { category: 'Operational', count: 412, dollars: 6_200_000,  color: '#475569' },
  { category: 'Regulatory',  count: 344, dollars: 9_800_000,  color: '#94A3B8' },
];

const FRAMEWORK_BREAKDOWN = [
  { framework: 'SOX',        count: 412, criticality: 'Critical' },
  { framework: 'K-SOX',      count: 387, criticality: 'Critical' },
  { framework: 'SAP GRC',    count: 1243, criticality: 'High' },
  { framework: 'GDPR',       count: 168, criticality: 'High' },
  { framework: 'ISO 27001',  count: 241, criticality: 'Medium' },
];

const IMPACT_ROWS = [
  { id: 'V-1042', desc: 'Create Vendor + Approve Payment authority', category: 'Financial',   exposure: 'High',   dollars: 2_400_000, areas: ['Procurement', 'Finance'], frameworks: ['SOX', 'K-SOX'],            users: 7,  linked: ['V-1054', 'V-1086'] },
  { id: 'V-1058', desc: 'Full OTC cycle controlled by single user', category: 'Financial',   exposure: 'High',   dollars: 1_800_000, areas: ['OTC'],                    frameworks: ['SOX', 'SAP GRC'],         users: 4,  linked: ['V-1112', 'V-1133'] },
  { id: 'V-1063', desc: 'GL Posting + Bank Reconciliation conflict',  category: 'Financial',   exposure: 'High',   dollars: 3_200_000, areas: ['Finance'],                frameworks: ['SOX', 'K-SOX', 'SAP GRC'],  users: 11, linked: ['V-1101', 'V-1144'] },
  { id: 'V-1071', desc: 'PFCG + end-user transaction access',         category: 'Operational', exposure: 'High',   dollars: null,      areas: ['IT'],                     frameworks: ['SAP GRC', 'ISO 27001'],     users: 3,  linked: ['V-1124'] },
  { id: 'V-1082', desc: 'HR Payroll Maintain + Approve same user',    category: 'Regulatory',  exposure: 'Medium', dollars: null,      areas: ['HR'],                     frameworks: ['GDPR', 'K-SOX'],           users: 2,  linked: [] },
  { id: 'V-1090', desc: 'Firefighter ID active >180 days',            category: 'Regulatory',  exposure: 'High',   dollars: null,      areas: ['IT'],                     frameworks: ['SOX', 'SAP GRC'],          users: 14, linked: ['V-1124'] },
  { id: 'V-1094', desc: 'PO Create + PO Release threshold mismatch',  category: 'Operational', exposure: 'Medium', dollars: 640_000,   areas: ['Procurement'],            frameworks: ['SAP GRC'],                 users: 9,  linked: ['V-1131'] },
  { id: 'V-1101', desc: 'F110 Auto-Payment Run misassigned',          category: 'Financial',   exposure: 'High',   dollars: 5_100_000, areas: ['Finance'],                frameworks: ['SOX', 'K-SOX'],            users: 5,  linked: ['V-1063'] },
  { id: 'V-1112', desc: 'Customer Master + Sales Order Release',      category: 'Financial',   exposure: 'Medium', dollars: 480_000,   areas: ['OTC'],                    frameworks: ['SOX'],                     users: 6,  linked: ['V-1058'] },
  { id: 'V-1124', desc: 'Background user RFC_BATCH_PI with SAP_ALL',  category: 'Operational', exposure: 'High',   dollars: null,      areas: ['IT'],                     frameworks: ['SAP GRC', 'ISO 27001'],     users: 1,  linked: ['V-1071'] },
  { id: 'V-1131', desc: 'GR + Invoice Verification same user',        category: 'Financial',   exposure: 'Medium', dollars: 820_000,   areas: ['Procurement', 'Finance'], frameworks: ['SOX', 'SAP GRC'],          users: 18, linked: ['V-1094'] },
  { id: 'V-1144', desc: 'Vendor Bank Edit + Payment Block remove',    category: 'Financial',   exposure: 'High',   dollars: 1_300_000, areas: ['Finance'],                frameworks: ['SOX', 'K-SOX', 'GDPR'],     users: 4,  linked: ['V-1063'] },
  { id: 'V-1152', desc: 'Personnel data export without retention',    category: 'Regulatory',  exposure: 'Medium', dollars: null,      areas: ['HR'],                     frameworks: ['GDPR'],                    users: 7,  linked: [] },
  { id: 'V-1167', desc: 'Audit log table write access — non-IT',      category: 'Regulatory',  exposure: 'High',   dollars: null,      areas: ['IT', 'Finance'],          frameworks: ['SOX', 'ISO 27001'],         users: 3,  linked: ['V-1071'] },
  { id: 'V-1174', desc: 'Production change deploy without approval',  category: 'Operational', exposure: 'High',   dollars: null,      areas: ['IT'],                     frameworks: ['SAP GRC', 'ISO 27001'],     users: 6,  linked: ['V-1071', 'V-1124'] },
];

const IMPACT_KPIS = {
  totalMapped: 1243,
  financialExposureHigh: 312,
  financialExposureMed: 487,
  financialExposureLow: 444,
  totalDollarExposure: 28_400_000,
  frameworksAffected: 5,
  deltas: {
    totalMapped: -94,
    financialExposureHigh: -18,
    totalDollarExposure: -4_200_000,
  },
};

Object.assign(window.MOCK, {
  IMPACT_CATEGORIES, EXPOSURE_LEVELS, FRAMEWORKS,
  IMPACT_SPLIT, FRAMEWORK_BREAKDOWN, IMPACT_ROWS, IMPACT_KPIS,
});

/* ============================================================ */
/* SOD-06 — Super Administrators                                 */
/* ============================================================ */

const SUPER_ADMIN_RECOMMENDATIONS = ['Revoke', 'Redesign', 'Monitor'];

const SUPER_ADMIN_ROWS = [
  { user: 'BCARRIER', name: 'Brian Carrier',     userId: 'BC4087', indicator: 'SAP_ALL equivalent', score: 98, severity: 'Critical', recommendation: 'Revoke',   systems: ['LCKR-PRD-01', 'LCKR-DEV-01'], status: 'Open', assignee: null, lastChange: '2026-04-18',
    roles: [
      { role: 'SAP_ALL', desc: 'Unrestricted SAP system authorization — production profile' },
      { role: 'ZBC_BR_SYSTEM_ADMIN', desc: 'Basis admin · client maintenance, transports, RFC' },
      { role: 'ZFI_BR_GL_POSTING', desc: 'GL document posting · all company codes' },
      { role: 'ZFI_BR_AP_PAYMENT', desc: 'Vendor payment approval up to $10M' },
    ] },
  { user: 'JSMITH_LC', name: 'Jane Smith',       userId: 'JS2104', indicator: 'PFCG + SU01 combo',   score: 94, severity: 'Critical', recommendation: 'Revoke',   systems: ['LCKR-PRD-01'], status: 'In Progress', assignee: 'SAP Security Team', lastChange: '2026-04-22',
    roles: [
      { role: 'PFCG_ROLE_MAINTAIN', desc: 'Role maintenance · can grant any authorization' },
      { role: 'SU01_USER_MAINTAIN', desc: 'User master maintenance · can create/delete users' },
      { role: 'ZIT_BR_ALL_EMPLOYEES', desc: 'IT admin role · cross-system' },
    ] },
  { user: 'APOCHE',    name: 'Alain Poche',      userId: 'AP1872', indicator: 'Cross-module admin',  score: 91, severity: 'Critical', recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-05-02',
    roles: [
      { role: 'ZFI_BR_GL_POSTING', desc: 'Finance · GL posting' },
      { role: 'ZMM_BR_PO_DISPLAY_PRO', desc: 'Procurement · PO display + change' },
      { role: 'ZSD_BR_BILLING_CREATE', desc: 'OTC · billing document creation' },
      { role: 'ZBC_BR_TRANSPORT', desc: 'Basis · transport release' },
    ] },
  { user: 'KPARK_LC',  name: 'Kyung-soo Park',   userId: 'KP5530', indicator: 'PFCG + business txns',score: 88, severity: 'Critical', recommendation: 'Revoke',   systems: ['LCKR-PRD-01', 'LCKR-QAS-01'], status: 'Open', assignee: null, lastChange: '2026-05-09',
    roles: [
      { role: 'PFCG_ROLE_MAINTAIN', desc: 'Role admin' },
      { role: 'ZMM_BR_PO_RELEASE', desc: 'PO release strategy bypass' },
      { role: 'ZFI_BR_AP_INVOICE', desc: 'Invoice posting' },
    ] },
  { user: 'HSCHRODE',  name: 'Helga Schroder',   userId: 'HS3041', indicator: 'Basis + Finance',     score: 85, severity: 'High',     recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'Open', assignee: 'SAP Basis Team', lastChange: '2026-04-14',
    roles: [
      { role: 'ZBC_BR_SYSTEM_ADMIN', desc: 'Basis admin' },
      { role: 'ZFI_BR_TREASURY', desc: 'Treasury access · F110, bank transfers' },
    ] },
  { user: 'YKIM',      name: 'Yu-jin Kim',       userId: 'YK6712', indicator: 'OTC full cycle',      score: 82, severity: 'High',     recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'In Progress', assignee: 'Finance Risk', lastChange: '2026-05-07',
    roles: [
      { role: 'ZSD_BR_SO_CREATE', desc: 'Sales order create' },
      { role: 'ZSD_BR_DELIVERY', desc: 'Delivery doc maintain' },
      { role: 'ZSD_BR_BILLING_CREATE', desc: 'Billing document create' },
      { role: 'ZFI_BR_AR_CLEAR', desc: 'AR clearing · cash app' },
    ] },
  { user: 'BGILL',     name: 'Baljinder Gill',   userId: 'BG2299', indicator: 'P-cycle full power',  score: 79, severity: 'High',     recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-04-30',
    roles: [
      { role: 'ZMM_BR_VENDOR_CREATE', desc: 'Vendor master create' },
      { role: 'ZMM_BR_PO_CREATE', desc: 'PO create + change' },
      { role: 'ZFI_BR_AP_PAYMENT', desc: 'Payment approval' },
    ] },
  { user: 'BHOOPER',   name: 'Beth Hooper',      userId: 'BH4421', indicator: 'Vendor + Payment',    score: 76, severity: 'High',     recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-05-11',
    roles: [
      { role: 'ZMM_BR_VENDOR_CREATE', desc: 'Vendor master create' },
      { role: 'ZFI_BR_AP_PAYMENT', desc: 'AP payment approval' },
    ] },
  { user: 'MJONES',    name: 'Mary Jones',       userId: 'MJ8830', indicator: 'HR + Payroll',        score: 72, severity: 'High',     recommendation: 'Redesign', systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-04-25',
    roles: [
      { role: 'ZHR_BR_PAYROLL_PROCESS', desc: 'Payroll run · all employees' },
      { role: 'ZHR_BR_MASTER_DATA', desc: 'HR master data maintain' },
      { role: 'ZHR_BR_APPROVE', desc: 'HR approval override' },
    ] },
  { user: 'LBAKER',    name: 'Lisa Baker',       userId: 'LB6610', indicator: 'Multi-CC finance',    score: 69, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-05-03',
    roles: [
      { role: 'ZFI_BR_GL_POSTING', desc: 'Finance · GL posting · 4 company codes' },
      { role: 'ZFI_BR_AR_CLEAR',   desc: 'AR clearing' },
    ] },
  { user: 'RTHOMPSON', name: 'Ryan Thompson',    userId: 'RT9183', indicator: 'IT + Compliance',     score: 68, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01', 'LCKR-QAS-01'], status: 'Resolved', assignee: 'IT Compliance', lastChange: '2026-03-29',
    roles: [
      { role: 'ZIT_BR_ALL_EMPLOYEES', desc: 'IT compliance view' },
      { role: 'ZFI_BR_AUDIT_LOG', desc: 'Audit log read' },
    ] },
  { user: 'SCHEN_LC',  name: 'Shuhua Chen',      userId: 'SC1077', indicator: 'Basis + Transport',   score: 65, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01'], status: 'In Progress', assignee: 'SAP Basis Team', lastChange: '2026-05-06',
    roles: [
      { role: 'ZBC_BR_TRANSPORT', desc: 'Transport release' },
      { role: 'ZBC_BR_BACKGROUND', desc: 'Background job admin' },
    ] },
  { user: 'DMARTINEZ', name: 'Diego Martinez',   userId: 'DM4502', indicator: 'Multi-org procurement',score: 62, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-04-12',
    roles: [
      { role: 'ZMM_BR_PO_CREATE',   desc: 'PO create — 6 plants' },
      { role: 'ZMM_BR_VENDOR_CREATE', desc: 'Vendor create' },
    ] },
  { user: 'EWILSON',   name: 'Emma Wilson',      userId: 'EW7704', indicator: 'Treasury override',   score: 58, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-05-12',
    roles: [
      { role: 'ZFI_BR_TREASURY',  desc: 'Treasury bank' },
      { role: 'ZFI_BR_BANK_RECON', desc: 'Bank reconciliation' },
    ] },
  { user: 'FGARCIA',   name: 'Felipe Garcia',    userId: 'FG3318', indicator: 'Reporting + Posting', score: 54, severity: 'Medium',   recommendation: 'Monitor',  systems: ['LCKR-PRD-01'], status: 'Open', assignee: null, lastChange: '2026-04-08',
    roles: [
      { role: 'ZFI_BR_REPORTING', desc: 'Finance reporting cross-CC' },
      { role: 'ZFI_BR_GL_POSTING', desc: 'GL posting limited CC' },
    ] },
];

const SUPER_ADMIN_KPIS = {
  totalSuperAdmins: 23,
  critical: 4,
  rolesContributing: 28,
  systemsAffected: 3,
  deltas: {
    totalSuperAdmins: -3,
    critical: -2,
    rolesContributing: -4,
    systemsAffected: 0,
  },
};

/* Top 10 roles contributing to super-admin violations */
const ROLE_CONCENTRATION = [
  { role: 'SAP_ALL',               users: 4,  category: 'Basis' },
  { role: 'PFCG_ROLE_MAINTAIN',    users: 3,  category: 'Basis' },
  { role: 'ZBC_BR_SYSTEM_ADMIN',   users: 5,  category: 'Basis' },
  { role: 'ZFI_BR_AP_PAYMENT',     users: 7,  category: 'Finance' },
  { role: 'ZFI_BR_GL_POSTING',     users: 9,  category: 'Finance' },
  { role: 'ZMM_BR_VENDOR_CREATE',  users: 6,  category: 'Procurement' },
  { role: 'ZMM_BR_PO_CREATE',      users: 5,  category: 'Procurement' },
  { role: 'ZSD_BR_BILLING_CREATE', users: 4,  category: 'OTC' },
  { role: 'ZFI_BR_TREASURY',       users: 4,  category: 'Finance' },
  { role: 'ZHR_BR_PAYROLL_PROCESS',users: 3,  category: 'HR' },
];

Object.assign(window.MOCK, {
  SUPER_ADMIN_RECOMMENDATIONS, SUPER_ADMIN_ROWS, SUPER_ADMIN_KPIS, ROLE_CONCENTRATION,
});

/* ============================================================ */
/* SOD-07 — Dual Process Control                                 */
/* ============================================================ */

const DUAL_PROCESSES = [
  { key: 'CV', label: 'Create Vendor',      short: 'Vendor',   area: 'Procurement' },
  { key: 'AP', label: 'Approve PO',         short: 'PO Apv',   area: 'Procurement' },
  { key: 'GR', label: 'Goods Receipt',      short: 'GR',       area: 'Procurement' },
  { key: 'IV', label: 'Invoice Verify',     short: 'IV',       area: 'Procurement' },
  { key: 'PM', label: 'Approve Payment',    short: 'Payment',  area: 'Finance' },
  { key: 'SO', label: 'Create Sales Order', short: 'Sales',    area: 'OTC' },
  { key: 'BL', label: 'Create Billing',     short: 'Billing',  area: 'OTC' },
  { key: 'GL', label: 'GL Posting',         short: 'GL Post',  area: 'Finance' },
];

/* Upper-triangle conflict matrix · counts per process pair */
const CONFLICT_MATRIX = {
  CV: { AP: 12, GR: 8,  IV: 4,  PM: 9,  SO: 2,  BL: 1,  GL: 3 },
  AP: {         GR: 4,  IV: 15, PM: 10, SO: 3,  BL: 2,  GL: 6 },
  GR: {                 IV: 18, PM: 3,  SO: 1,  BL: 0,  GL: 2 },
  IV: {                         PM: 14, SO: 2,  BL: 1,  GL: 7 },
  PM: {                                 SO: 3,  BL: 2,  GL: 17 },
  SO: {                                         BL: 22, GL: 5 },
  BL: {                                                 GL: 8 },
};

const DUAL_PROCESS_ROWS = [
  { id: 'DP-3041', user: 'BCARRIER',  name: 'Brian Carrier',   p1: 'CV', p2: 'PM', tcodes: ['FK01','F110','FB60'],     severity: 'Critical', status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-14', tcode: 'FK01',  doc: 'Vendor 4500091224 · Acme Steel KR', amount: null },
      { date: '2026-05-15', tcode: 'F110',  doc: 'Payment run · Run-2026-051501',     amount: 2_140_000 },
      { date: '2026-05-15', tcode: 'FB60',  doc: '1800012881 · Invoice posting',      amount: 487_300 },
    ] },
  { id: 'DP-3042', user: 'JSMITH_LC', name: 'Jane Smith',      p1: 'AP', p2: 'IV', tcodes: ['ME29N','MIRO','ME23N'],   severity: 'Critical', status: 'In Progress', assignee: 'SAP Security Team',
    execHistory: [
      { date: '2026-05-12', tcode: 'ME29N', doc: 'PO 4500083471 · release strategy override', amount: 1_640_000 },
      { date: '2026-05-13', tcode: 'MIRO',  doc: 'Invoice receipt · 5105000812',              amount: 1_640_000 },
    ] },
  { id: 'DP-3043', user: 'APOCHE',    name: 'Alain Poche',     p1: 'PM', p2: 'GL', tcodes: ['F110','FB50','FBL1N'],    severity: 'Critical', status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-10', tcode: 'F110',  doc: 'Payment run · Run-2026-051001',   amount: 3_120_000 },
      { date: '2026-05-10', tcode: 'FB50',  doc: 'GL document 100001245 · reclass', amount: 78_400 },
    ] },
  { id: 'DP-3044', user: 'YKIM',      name: 'Yu-jin Kim',      p1: 'SO', p2: 'BL', tcodes: ['VA01','VL01N','VF01'],    severity: 'Critical', status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-16', tcode: 'VA01', doc: 'Sales order 0030049817 · KR-East', amount: 940_000 },
      { date: '2026-05-16', tcode: 'VL01N',doc: 'Delivery 0080091203 · same day',   amount: 940_000 },
      { date: '2026-05-16', tcode: 'VF01', doc: 'Billing 0090055521',               amount: 940_000 },
    ] },
  { id: 'DP-3045', user: 'KPARK_LC',  name: 'Kyung-soo Park',  p1: 'AP', p2: 'GR', tcodes: ['ME29N','MIGO'],           severity: 'High',     status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-04-29', tcode: 'ME29N', doc: 'PO 4500082109 · release',    amount: 740_000 },
      { date: '2026-04-30', tcode: 'MIGO',  doc: 'Goods receipt 5000812441',   amount: 740_000 },
    ] },
  { id: 'DP-3046', user: 'BHOOPER',   name: 'Beth Hooper',     p1: 'CV', p2: 'PM', tcodes: ['FK01','F110'],            severity: 'Critical', status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-03', tcode: 'FK01', doc: 'Vendor 4500091811 created',          amount: null },
      { date: '2026-05-05', tcode: 'F110', doc: 'Payment run includes 4500091811',   amount: 218_000 },
    ] },
  { id: 'DP-3047', user: 'BGILL',     name: 'Baljinder Gill',  p1: 'GR', p2: 'IV', tcodes: ['MIGO','MIRO'],            severity: 'High',     status: 'In Progress', assignee: 'Finance Risk',
    execHistory: [
      { date: '2026-05-08', tcode: 'MIGO', doc: 'GR 5000813099 · Plant 1100',  amount: 412_000 },
      { date: '2026-05-08', tcode: 'MIRO', doc: 'IV 5105001884 · same vendor', amount: 412_000 },
    ] },
  { id: 'DP-3048', user: 'MJONES',    name: 'Mary Jones',      p1: 'PM', p2: 'GL', tcodes: ['F110','FB50'],            severity: 'High',     status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-11', tcode: 'F110', doc: 'Payment run · Run-2026-051101', amount: 1_180_000 },
      { date: '2026-05-11', tcode: 'FB50', doc: 'GL reclass 100001331',          amount: 56_200 },
    ] },
  { id: 'DP-3049', user: 'HSCHRODE',  name: 'Helga Schroder',  p1: 'PM', p2: 'GL', tcodes: ['F110','FB50','FF67'],     severity: 'High',     status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-04-25', tcode: 'F110', doc: 'Payment run · Run-2026-042501', amount: 980_000 },
      { date: '2026-04-25', tcode: 'FF67', doc: 'Bank statement upload',          amount: null },
    ] },
  { id: 'DP-3050', user: 'LBAKER',    name: 'Lisa Baker',      p1: 'SO', p2: 'GL', tcodes: ['VA01','FB50'],            severity: 'High',     status: 'Resolved',    assignee: 'Finance Risk',
    execHistory: [
      { date: '2026-03-18', tcode: 'VA01', doc: 'Sales order 0030047012',    amount: 220_000 },
      { date: '2026-03-19', tcode: 'FB50', doc: 'Revenue posting 100001098', amount: 220_000 },
    ] },
  { id: 'DP-3051', user: 'DMARTINEZ', name: 'Diego Martinez',  p1: 'CV', p2: 'AP', tcodes: ['FK01','ME29N'],           severity: 'Medium',   status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-02', tcode: 'FK01',  doc: 'Vendor 4500091990 created', amount: null },
      { date: '2026-05-04', tcode: 'ME29N', doc: 'PO 4500083880 release',     amount: 132_000 },
    ] },
  { id: 'DP-3052', user: 'RTHOMPSON', name: 'Ryan Thompson',   p1: 'PM', p2: 'GL', tcodes: ['F110','FB50'],            severity: 'High',     status: 'Open',        assignee: null,
    execHistory: [
      { date: '2026-05-06', tcode: 'F110', doc: 'Payment run · Run-2026-050601', amount: 1_540_000 },
      { date: '2026-05-06', tcode: 'FB50', doc: 'GL adjustment 100001288',       amount: 88_400 },
    ] },
];

const DUAL_PROCESS_KPIS = {
  total: 184,
  critical: 47,
  high: 96,
  uniqueUsers: 78,
  processAreas: 4,
  deltas: {
    total: -21,
    critical: -8,
    high: -11,
    uniqueUsers: -7,
    processAreas: 0,
  },
};

Object.assign(window.MOCK, {
  DUAL_PROCESSES, CONFLICT_MATRIX, DUAL_PROCESS_ROWS, DUAL_PROCESS_KPIS,
});

/* ============================================================ */
/* SOD-08 — Emergency Access                                     */
/* ============================================================ */

const FIREFIGHTER_TIMELINE_START = '2026-03-01';
const FIREFIGHTER_TIMELINE_END   = '2026-05-22';

const APPROVAL_STATUSES = ['Approved', 'Pending', 'Missing'];

const EMERGENCY_ACCESS_ROWS = [
  { id: 'EA-7012', user: 'BCARRIER',  name: 'Brian Carrier',
    ffId: 'FF_BAS_01', role: 'Basis Emergency · Production',
    start: '2026-04-02', end: '2026-05-22', usage: 32,
    approval: 'Missing', anomalyFlag: true, anomalyReason: 'Unapproved + assignment >30d threshold',
    recommendation: 'Terminate assignment · revoke role · open ticket',
    status: 'Open', assignee: null,
    log: [
      { date: '2026-04-04 02:11', tcode: 'SE38', desc: 'ABAP report execution · Z_BANK_EXPORT' },
      { date: '2026-04-19 23:47', tcode: 'SU01', desc: 'User SAP_USER_2294 password reset · after-hours' },
      { date: '2026-05-07 11:30', tcode: 'SM30', desc: 'Table maintenance · T001 company codes' },
      { date: '2026-05-19 03:22', tcode: 'SE16', desc: 'Direct table query · BSEG · 14K rows exported' },
    ] },
  { id: 'EA-7013', user: 'APOCHE',    name: 'Alain Poche',
    ffId: 'FF_FIN_03', role: 'Finance Emergency · Treasury',
    start: '2025-10-15', end: '2026-05-22', usage: 87,
    approval: 'Missing', anomalyFlag: true, anomalyReason: 'Active 214 days · no re-attestation · last approval expired Q4-2025',
    recommendation: 'Hard terminate — require new ticket per session',
    status: 'In Progress', assignee: 'IT Compliance',
    log: [
      { date: '2026-05-01 09:20', tcode: 'F110', desc: 'Off-cycle payment run · $1.8M' },
      { date: '2026-05-15 14:02', tcode: 'F-58', desc: 'Manual outgoing payment · vendor 4500091900' },
      { date: '2026-05-20 18:55', tcode: 'FF67', desc: 'Bank statement post · after-hours' },
    ] },
  { id: 'EA-7014', user: 'JSMITH_LC', name: 'Jane Smith',
    ffId: 'FF_BAS_02', role: 'Basis Emergency · Transport',
    start: '2026-03-10', end: '2026-03-24', usage: 8,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'SAP Basis Team',
    log: [
      { date: '2026-03-12 11:04', tcode: 'STMS', desc: 'Transport TR4500982 release · ticket INC-44102' },
      { date: '2026-03-20 15:18', tcode: 'STMS', desc: 'Transport TR4500999 release · ticket INC-44211' },
    ] },
  { id: 'EA-7015', user: 'KPARK_LC',  name: 'Kyung-soo Park',
    ffId: 'FF_BAS_01', role: 'Basis Emergency · Production',
    start: '2026-05-02', end: '2026-05-12', usage: 4,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'SAP Basis Team',
    log: [
      { date: '2026-05-04 10:15', tcode: 'SM37', desc: 'Background job recovery · ticket INC-44801' },
    ] },
  { id: 'EA-7016', user: 'YKIM',      name: 'Yu-jin Kim',
    ffId: 'FF_SD_01', role: 'OTC Emergency · Billing',
    start: '2026-04-12', end: '2026-05-04', usage: 5,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'Finance Risk',
    log: [
      { date: '2026-04-14 09:22', tcode: 'VF02', desc: 'Billing doc correction · ticket INC-44511' },
    ] },
  { id: 'EA-7017', user: 'MJONES',    name: 'Mary Jones',
    ffId: 'FF_HR_01', role: 'HR Emergency · Payroll',
    start: '2026-03-14', end: '2026-05-22', usage: 31,
    approval: 'Approved', anomalyFlag: true, anomalyReason: '68% of usage outside business hours · spike in PA30',
    recommendation: 'Re-attest · monitor after-hours pattern',
    status: 'Open', assignee: null,
    log: [
      { date: '2026-04-08 22:14', tcode: 'PA30', desc: 'HR master update · employee 1004471' },
      { date: '2026-05-02 23:02', tcode: 'PC00', desc: 'Off-cycle payroll · region KR-West' },
      { date: '2026-05-18 21:35', tcode: 'PA30', desc: 'HR master update · employee 1004503' },
    ] },
  { id: 'EA-7018', user: 'BHOOPER',   name: 'Beth Hooper',
    ffId: 'FF_FIN_02', role: 'Finance Emergency · AP',
    start: '2026-04-28', end: '2026-05-18', usage: 9,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'Finance Risk',
    log: [
      { date: '2026-05-02 11:08', tcode: 'F-58', desc: 'Manual payment · vendor 4500091700' },
    ] },
  { id: 'EA-7019', user: 'BGILL',     name: 'Baljinder Gill',
    ffId: 'FF_MM_01', role: 'MM Emergency · PO',
    start: '2026-03-18', end: '2026-04-02', usage: 6,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'SAP Security Team',
    log: [
      { date: '2026-03-22 14:12', tcode: 'ME22N', desc: 'PO 4500082011 emergency change · ticket INC-43911' },
    ] },
  { id: 'EA-7020', user: 'HSCHRODE',  name: 'Helga Schroder',
    ffId: 'FF_BAS_02', role: 'Basis Emergency · Transport',
    start: '2026-04-22', end: '2026-05-22', usage: 12,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'Renewal review due in 7 days',
    status: 'In Progress', assignee: 'SAP Basis Team',
    log: [
      { date: '2026-05-05 09:45', tcode: 'STMS', desc: 'Transport release · weekly cadence' },
    ] },
  { id: 'EA-7021', user: 'DMARTINEZ', name: 'Diego Martinez',
    ffId: 'FF_MM_01', role: 'MM Emergency · PO',
    start: '2026-05-06', end: '2026-05-22', usage: 3,
    approval: 'Pending', anomalyFlag: false, anomalyReason: null,
    recommendation: 'Awaiting approval ticket SR-22087 · escalate if >72h pending',
    status: 'Open', assignee: null,
    log: [
      { date: '2026-05-10 10:02', tcode: 'ME21N', desc: 'PO create · awaiting approval' },
    ] },
  { id: 'EA-7022', user: 'EWILSON',   name: 'Emma Wilson',
    ffId: 'FF_FIN_01', role: 'Finance Emergency · GL',
    start: '2026-03-02', end: '2026-03-20', usage: 7,
    approval: 'Approved', anomalyFlag: false, anomalyReason: null,
    recommendation: 'No action — within policy',
    status: 'Resolved', assignee: 'Finance Risk',
    log: [
      { date: '2026-03-08 16:30', tcode: 'FB50', desc: 'GL adjustment · period close · ticket INC-43788' },
    ] },
  { id: 'EA-7023', user: 'RTHOMPSON', name: 'Ryan Thompson',
    ffId: 'FF_BAS_02', role: 'Basis Emergency · Transport',
    start: '2026-03-28', end: '2026-04-30', usage: 18,
    approval: 'Approved', anomalyFlag: true, anomalyReason: 'Used SE38 outside ticket scope · 3 occurrences',
    recommendation: 'Investigate · review SE38 execution log',
    status: 'Open', assignee: null,
    log: [
      { date: '2026-04-04 13:11', tcode: 'STMS', desc: 'Transport release · ticket INC-44109' },
      { date: '2026-04-15 17:42', tcode: 'SE38', desc: 'ABAP report run · NO TICKET LINKED' },
      { date: '2026-04-22 14:08', tcode: 'SE38', desc: 'ABAP report run · NO TICKET LINKED' },
    ] },
];

const EMERGENCY_ACCESS_KPIS = {
  totalUsers: 31,
  unapprovedAccess: 2,
  prolongedAssignments: 4,
  anomalyFlags: 5,
  deltas: {
    totalUsers: -4,
    unapprovedAccess: -1,
    prolongedAssignments: -2,
    anomalyFlags: +1,
  },
};

Object.assign(window.MOCK, {
  FIREFIGHTER_TIMELINE_START, FIREFIGHTER_TIMELINE_END,
  APPROVAL_STATUSES, EMERGENCY_ACCESS_ROWS, EMERGENCY_ACCESS_KPIS,
});

/* ============================================================ */
/* SOD-09 — OTC Control                                          */
/* ============================================================ */

const OTC_STEPS = [
  { key: 'order',     label: 'Order Entry',  short: 'Order',    tcodes: ['VA01', 'VA02'],         icon: 'plus' },
  { key: 'delivery',  label: 'Delivery',     short: 'Delivery', tcodes: ['VL01N', 'VL02N'],       icon: 'arrow' },
  { key: 'billing',   label: 'Billing',      short: 'Billing',  tcodes: ['VF01', 'VF02', 'VF04'], icon: 'file' },
  { key: 'collection',label: 'Collection',   short: 'Cash App', tcodes: ['F-28', 'FB05', 'FBL5N'],icon: 'check' },
];

const OTC_ROWS = [
  { id: 'OTC-501', user: 'YKIM',      name: 'Yu-jin Kim',      steps: ['order','delivery','billing','collection'],
    tcodes: ['VA01','VL01N','VF01','F-28'], exposure: 'High',   amount: 1_840_000, severity: 'Critical', status: 'Open', assignee: null,
    recommendation: 'Split SD billing authority · separate Collection role · enforce 4-eyes on VF01',
    transactions: [
      { date: '2026-05-16 08:42', tcode: 'VA01', doc: 'SO 0030049817 · Customer Lotte Retail · $940K' },
      { date: '2026-05-16 10:11', tcode: 'VL01N', doc: 'Delivery 0080091203 · same SO' },
      { date: '2026-05-16 14:33', tcode: 'VF01', doc: 'Billing 0090055521 · invoice $940K' },
      { date: '2026-05-19 09:08', tcode: 'F-28', doc: 'Customer payment apply · $900K (95% received)' },
    ] },
  { id: 'OTC-502', user: 'BCARRIER',  name: 'Brian Carrier',   steps: ['order','billing','collection'],
    tcodes: ['VA01','VF01','F-28'], exposure: 'High',   amount: 1_240_000, severity: 'Critical', status: 'Open', assignee: null,
    recommendation: 'Revoke Collection authority · keep Order + Billing only',
    transactions: [
      { date: '2026-05-12 11:20', tcode: 'VA01', doc: 'SO 0030049544 · Customer HyundaiP · $620K' },
      { date: '2026-05-13 16:02', tcode: 'VF01', doc: 'Billing 0090055412 · invoice $620K' },
      { date: '2026-05-15 13:51', tcode: 'F-28', doc: 'Payment received · $620K — no AR clerk review' },
    ] },
  { id: 'OTC-503', user: 'APOCHE',    name: 'Alain Poche',     steps: ['delivery','billing','collection'],
    tcodes: ['VL01N','VF01','F-28'], exposure: 'High',  amount: 980_000, severity: 'Critical', status: 'In Progress', assignee: 'Finance Risk',
    recommendation: 'Revoke Billing · downstream Collection access requires SO Order owner',
    transactions: [
      { date: '2026-05-10 09:14', tcode: 'VL01N', doc: 'Delivery 0080090981 · Customer SK Chem' },
      { date: '2026-05-11 12:43', tcode: 'VF01', doc: 'Billing 0090055291 · $980K' },
    ] },
  { id: 'OTC-504', user: 'KPARK_LC',  name: 'Kyung-soo Park',  steps: ['order','delivery','billing'],
    tcodes: ['VA01','VL01N','VF01'], exposure: 'High', amount: 740_000, severity: 'High',     status: 'Open', assignee: null,
    recommendation: 'Reassign Delivery to logistics ops · monitor closely',
    transactions: [
      { date: '2026-05-09 10:01', tcode: 'VA01', doc: 'SO 0030049412 · $740K' },
      { date: '2026-05-09 14:30', tcode: 'VL01N', doc: 'Delivery 0080090822 · same day' },
    ] },
  { id: 'OTC-505', user: 'HSCHRODE',  name: 'Helga Schroder',  steps: ['billing','collection'],
    tcodes: ['VF01','F-28','FB05'], exposure: 'Medium', amount: 520_000, severity: 'High',     status: 'Open', assignee: null,
    recommendation: 'Split Billing and Collection · enforce manager review on F-28',
    transactions: [
      { date: '2026-05-05 13:18', tcode: 'VF01', doc: 'Billing 0090055122 · $520K' },
      { date: '2026-05-08 11:02', tcode: 'F-28', doc: 'Payment apply · $520K' },
    ] },
  { id: 'OTC-506', user: 'BGILL',     name: 'Baljinder Gill',  steps: ['order','billing'],
    tcodes: ['VA01','VF01'], exposure: 'Medium', amount: 380_000, severity: 'Medium',   status: 'Open', assignee: null,
    recommendation: 'Maintain · low risk pair · quarterly review',
    transactions: [
      { date: '2026-04-28 09:42', tcode: 'VA01', doc: 'SO 0030049178 · $380K' },
    ] },
  { id: 'OTC-507', user: 'DMARTINEZ', name: 'Diego Martinez',  steps: ['delivery','collection'],
    tcodes: ['VL01N','F-28'], exposure: 'Medium', amount: 290_000, severity: 'Medium',   status: 'Open', assignee: null,
    recommendation: 'Maintain · monitor for upstream order creation',
    transactions: [
      { date: '2026-05-02 14:18', tcode: 'VL01N', doc: 'Delivery 0080090701' },
    ] },
  { id: 'OTC-508', user: 'LBAKER',    name: 'Lisa Baker',      steps: ['order','collection'],
    tcodes: ['VA01','F-28'], exposure: 'Medium', amount: 410_000, severity: 'Medium',   status: 'Resolved', assignee: 'Finance Risk',
    recommendation: 'Resolved · Collection authority removed 2026-04-22',
    transactions: [
      { date: '2026-04-20 11:05', tcode: 'VA01', doc: 'SO 0030049022 · $410K' },
    ] },
  { id: 'OTC-509', user: 'BHOOPER',   name: 'Beth Hooper',     steps: ['order','delivery'],
    tcodes: ['VA01','VL01N'], exposure: 'Low', amount: 180_000, severity: 'Medium',   status: 'Open', assignee: null,
    recommendation: 'Low risk · maintain · quarterly review',
    transactions: [
      { date: '2026-04-25 13:08', tcode: 'VA01', doc: 'SO 0030049077 · $180K' },
    ] },
  { id: 'OTC-510', user: 'MJONES',    name: 'Mary Jones',      steps: ['billing','collection'],
    tcodes: ['VF01','F-28'], exposure: 'Medium', amount: 480_000, severity: 'High',     status: 'Open', assignee: null,
    recommendation: 'Split Billing and Collection · 4-eyes on F-28',
    transactions: [
      { date: '2026-05-04 10:32', tcode: 'VF01', doc: 'Billing 0090055041 · $480K' },
    ] },
  { id: 'OTC-511', user: 'EWILSON',   name: 'Emma Wilson',     steps: ['delivery','billing'],
    tcodes: ['VL01N','VF01'], exposure: 'Low', amount: 220_000, severity: 'Medium',   status: 'Open', assignee: null,
    recommendation: 'Low risk pair · monitor monthly',
    transactions: [
      { date: '2026-04-30 09:14', tcode: 'VL01N', doc: 'Delivery 0080090580' },
    ] },
  { id: 'OTC-512', user: 'FGARCIA',   name: 'Felipe Garcia',   steps: ['order','delivery','collection'],
    tcodes: ['VA01','VL01N','F-28'], exposure: 'High', amount: 620_000, severity: 'High',     status: 'Open', assignee: null,
    recommendation: 'Add Billing reviewer · or revoke Collection authority',
    transactions: [
      { date: '2026-05-01 10:18', tcode: 'VA01', doc: 'SO 0030049311 · $620K' },
      { date: '2026-05-01 15:42', tcode: 'VL01N', doc: 'Delivery 0080090711 · same day' },
      { date: '2026-05-08 09:51', tcode: 'F-28', doc: 'Payment apply · $620K' },
    ] },
];

const OTC_KPIS = {
  totalViolators: 47,
  fullCycleControllers: 1,
  partialControllers: 46,
  totalDollarExposure: 8_400_000,
  deltas: {
    totalViolators: -6,
    fullCycleControllers: -1,
    partialControllers: -5,
    totalDollarExposure: -2_100_000,
  },
};

Object.assign(window.MOCK, {
  OTC_STEPS, OTC_ROWS, OTC_KPIS,
});

/* ============================================================ */
/* SOD-10 — High-Risk Service Accounts                           */
/* ============================================================ */

const SERVICE_ACCOUNT_TYPES = ['Service', 'Background', 'Integration'];
const PRIVILEGE_LEVELS = ['Critical', 'High', 'Medium', 'Low'];
const INACTIVITY_OPTIONS = ['Inactive', 'Active'];

const SERVICE_ACCOUNTS = [
  { id: 'SA-9001', account: 'RFC_BATCH_PI',     type: 'Background',  privilege: 'Critical', lastActivity: '2026-05-21', daysSince: 1,   inactive: false, owner: null,                 unmanaged: true,  risk: 'Critical · SAP_ALL equivalent · unowned',
    roles: [
      { role: 'SAP_ALL', desc: 'Unrestricted SAP authorization · production profile' },
      { role: 'ZBC_BR_BACKGROUND', desc: 'Background job admin' },
    ],
    log: [
      { date: '2026-05-21 02:00', desc: 'Job ZRPT_NIGHT_001 · RC=0 · 1.2M rows processed' },
      { date: '2026-05-20 02:00', desc: 'Job ZRPT_NIGHT_001 · RC=0' },
      { date: '2026-05-19 02:00', desc: 'Job ZRPT_NIGHT_001 · RC=0' },
    ],
    recommendation: 'Replace SAP_ALL with scoped profile · assign owner · rotate credentials',
    status: 'Open', assignee: null },
  { id: 'SA-9002', account: 'SVC_BANK_API',     type: 'Service',     privilege: 'Critical', lastActivity: '2026-05-22', daysSince: 0,   inactive: false, owner: 'SAP Basis Team',     unmanaged: false, risk: 'Critical · Bank statement post + payment release',
    roles: [
      { role: 'ZFI_BR_TREASURY', desc: 'Treasury bank · F110, FF67' },
      { role: 'ZFI_BR_BANK_RECON', desc: 'Bank reconciliation' },
    ],
    log: [
      { date: '2026-05-22 08:15', desc: 'F110 auto-payment run · RC=0' },
      { date: '2026-05-22 13:42', desc: 'FF67 bank statement post · KR-Bank-001' },
    ],
    recommendation: 'Maintain · enforce vault-managed credential rotation every 90d',
    status: 'In Progress', assignee: 'SAP Basis Team' },
  { id: 'SA-9003', account: 'INT_CONCUR_INTG',  type: 'Integration', privilege: 'High',     lastActivity: '2026-05-20', daysSince: 2,   inactive: false, owner: 'IT Compliance',      unmanaged: false, risk: 'High · expense post + GL posting access',
    roles: [
      { role: 'ZFI_BR_EXPENSE_POST', desc: 'Expense report posting' },
      { role: 'ZFI_BR_GL_POSTING', desc: 'GL posting · limited CC' },
    ],
    log: [
      { date: '2026-05-20 16:00', desc: 'Inbound expense batch · 412 reports posted' },
    ],
    recommendation: 'Maintain · review GL posting scope quarterly',
    status: 'Open', assignee: null },
  { id: 'SA-9004', account: 'INT_ARIBA',        type: 'Integration', privilege: 'High',     lastActivity: '2026-05-19', daysSince: 3,   inactive: false, owner: 'SAP Basis Team',     unmanaged: false, risk: 'High · PO create + vendor master sync',
    roles: [
      { role: 'ZMM_BR_PO_CREATE', desc: 'PO create' },
      { role: 'ZMM_BR_VENDOR_SYNC', desc: 'Vendor master inbound' },
    ],
    log: [
      { date: '2026-05-19 11:32', desc: 'Inbound PO batch · 87 POs created' },
    ],
    recommendation: 'Maintain · separate vendor-sync into dedicated user',
    status: 'Open', assignee: null },
  { id: 'SA-9005', account: 'BG_FIN_CLOSE',     type: 'Background',  privilege: 'High',     lastActivity: '2026-05-01', daysSince: 21,  inactive: false, owner: 'Finance Risk',       unmanaged: false, risk: 'High · period-close posting authority',
    roles: [
      { role: 'ZFI_BR_PERIOD_CLOSE', desc: 'Period-close postings' },
      { role: 'ZFI_BR_GL_POSTING', desc: 'GL posting · all CC' },
    ],
    log: [
      { date: '2026-05-01 23:30', desc: 'Period 04/2026 close · RC=0' },
      { date: '2026-04-01 23:30', desc: 'Period 03/2026 close · RC=0' },
    ],
    recommendation: 'Maintain · runs once per period',
    status: 'Resolved', assignee: 'Finance Risk' },
  { id: 'SA-9006', account: 'SVC_PAYROLL_SYNC', type: 'Service',     privilege: 'High',     lastActivity: '2026-05-15', daysSince: 7,   inactive: false, owner: 'IT Compliance',      unmanaged: false, risk: 'High · HR master + payroll write',
    roles: [
      { role: 'ZHR_BR_MASTER_SYNC', desc: 'HR master inbound' },
      { role: 'ZHR_BR_PAYROLL_POST', desc: 'Payroll posting' },
    ],
    log: [
      { date: '2026-05-15 06:00', desc: 'Payroll inbound sync · 2814 records' },
    ],
    recommendation: 'Maintain · split master-sync and payroll-post',
    status: 'Open', assignee: null },
  { id: 'SA-9007', account: 'SVC_VENDOR_INTEG', type: 'Service',     privilege: 'Medium',   lastActivity: '2026-03-12', daysSince: 71,  inactive: true,  owner: 'SAP Security Team',  unmanaged: false, risk: 'Medium · inactive >60d · vendor master sync',
    roles: [{ role: 'ZMM_BR_VENDOR_SYNC', desc: 'Vendor master inbound' }],
    log: [
      { date: '2026-03-12 14:18', desc: 'Last vendor inbound · 12 records · then silent' },
    ],
    recommendation: 'Investigate · deactivate if no longer in use',
    status: 'Open', assignee: 'SAP Security Team' },
  { id: 'SA-9008', account: 'BG_OLD_REPORTING', type: 'Background',  privilege: 'High',     lastActivity: '2025-11-08', daysSince: 195, inactive: true,  owner: null,                 unmanaged: true,  risk: 'High · inactive 195d · unowned · holds SE38 + S_DATASET',
    roles: [
      { role: 'ZBC_BR_REPORTING', desc: 'ABAP report execution' },
      { role: 'S_DATASET_FULL', desc: 'OS-level file dataset access' },
    ],
    log: [
      { date: '2025-11-08 03:00', desc: 'Job ZREPORT_LEGACY · last run · RC=0' },
    ],
    recommendation: 'Revoke immediately · deactivate · audit trail before delete',
    status: 'Open', assignee: null },
  { id: 'SA-9009', account: 'INT_SF_INTEG',     type: 'Integration', privilege: 'Medium',   lastActivity: '2026-05-17', daysSince: 5,   inactive: false, owner: 'IT Compliance',      unmanaged: false, risk: 'Medium · CRM customer sync',
    roles: [{ role: 'ZSD_BR_CUSTOMER_SYNC', desc: 'Customer master inbound' }],
    log: [
      { date: '2026-05-17 09:42', desc: 'CRM customer sync · 142 records' },
    ],
    recommendation: 'Maintain · low risk',
    status: 'Open', assignee: null },
  { id: 'SA-9010', account: 'INT_SAP_TOSAP',    type: 'Integration', privilege: 'High',     lastActivity: '2026-05-21', daysSince: 1,   inactive: false, owner: null,                 unmanaged: true,  risk: 'High · cross-system RFC · no owner',
    roles: [{ role: 'ZBC_BR_RFC_GATEWAY', desc: 'RFC gateway to LCKR-PRD-02' }],
    log: [
      { date: '2026-05-21 22:14', desc: 'RFC inbound · 4528 calls in 24h' },
    ],
    recommendation: 'Assign owner · review RFC trust relationships',
    status: 'Open', assignee: null },
  { id: 'SA-9011', account: 'BG_TAX_REPORT',    type: 'Background',  privilege: 'Medium',   lastActivity: '2026-05-18', daysSince: 4,   inactive: false, owner: 'Finance Risk',       unmanaged: false, risk: 'Medium · tax filing batch',
    roles: [{ role: 'ZFI_BR_TAX_REPORT', desc: 'Tax report extract' }],
    log: [
      { date: '2026-05-18 04:00', desc: 'Monthly VAT extract · RC=0' },
    ],
    recommendation: 'Maintain · monthly cadence',
    status: 'Resolved', assignee: 'Finance Risk' },
  { id: 'SA-9012', account: 'SVC_LEGACY_FTP',   type: 'Service',     privilege: 'Critical', lastActivity: '2025-09-22', daysSince: 242, inactive: true,  owner: null,                 unmanaged: true,  risk: 'Critical · inactive 242d · unowned · holds payment release',
    roles: [
      { role: 'ZFI_BR_AP_PAYMENT', desc: 'Payment release' },
      { role: 'S_DATASET_FULL', desc: 'OS-level FTP dataset' },
    ],
    log: [
      { date: '2025-09-22 03:00', desc: 'Last FTP push · vendor file' },
    ],
    recommendation: 'Revoke + delete · former integration · confirmed not in use',
    status: 'In Progress', assignee: 'SAP Security Team' },
  { id: 'SA-9013', account: 'BG_GR_AUTO',       type: 'Background',  privilege: 'Medium',   lastActivity: '2026-05-21', daysSince: 1,   inactive: false, owner: 'SAP Security Team',  unmanaged: false, risk: 'Medium · auto goods-receipt',
    roles: [{ role: 'ZMM_BR_GR_AUTO', desc: 'Auto goods receipt for EDI POs' }],
    log: [
      { date: '2026-05-21 12:00', desc: 'EDI GR batch · 88 GRs posted' },
    ],
    recommendation: 'Maintain · standard EDI flow',
    status: 'Open', assignee: null },
  { id: 'SA-9014', account: 'SVC_AUDIT_READ',   type: 'Service',     privilege: 'Low',      lastActivity: '2026-05-22', daysSince: 0,   inactive: false, owner: 'IT Compliance',      unmanaged: false, risk: 'Low · read-only audit · external auditor',
    roles: [{ role: 'ZIT_BR_AUDIT_READ', desc: 'Read-only audit log access' }],
    log: [
      { date: '2026-05-22 10:00', desc: 'Auditor pull · BSEG sample' },
    ],
    recommendation: 'Maintain · external audit window expires Q3-26',
    status: 'Open', assignee: null },
];

const ACCOUNT_TYPE_SPLIT = [
  { type: 'Service',     count: SERVICE_ACCOUNTS.filter(s => s.type === 'Service').length,     color: '#0F172A' },
  { type: 'Background',  count: SERVICE_ACCOUNTS.filter(s => s.type === 'Background').length,  color: '#475569' },
  { type: 'Integration', count: SERVICE_ACCOUNTS.filter(s => s.type === 'Integration').length, color: '#94A3B8' },
];

const SERVICE_ACCOUNT_KPIS = {
  totalAccounts: 62,
  highPrivilege: 18,
  inactiveAccounts: 9,
  unmanagedAccounts: 7,
  deltas: {
    totalAccounts: +3,
    highPrivilege: -2,
    inactiveAccounts: +1,
    unmanagedAccounts: -2,
  },
};

Object.assign(window.MOCK, {
  SERVICE_ACCOUNT_TYPES, PRIVILEGE_LEVELS, INACTIVITY_OPTIONS,
  SERVICE_ACCOUNTS, ACCOUNT_TYPE_SPLIT, SERVICE_ACCOUNT_KPIS,
});

/* ============================================================ */
/* SOD-11 — Remediation & Governance                             */
/* ============================================================ */

const REMEDIATION_TYPES = ['Role Redesign', 'Access Removal', 'Mitigating Control', 'Policy'];
const PRIORITIES = ['P1', 'P2', 'P3', 'P4'];

const REMEDIATIONS = [
  { id: 'R-1042', violationId: 'V-1042', type: 'Access Removal',   priority: 'P1', status: 'Open',        assignee: null,                  due: '2026-05-24', overdue: false,
    title: 'Revoke vendor-payment combo from BCARRIER',
    rationale: 'BCARRIER holds Create Vendor + Approve Payment — Critical SoD breach.',
    steps: [
      'Remove role ZFI_BR_AP_PAYMENT from BCARRIER',
      'Verify removal in SU01 — confirm authorization buffer refresh',
      'Add BCARRIER to monitored-user list for 30 days',
      'Document remediation in JIRA ticket SOD-1042 and close',
    ] },
  { id: 'R-1058', violationId: 'V-1058', type: 'Role Redesign',    priority: 'P1', status: 'In Progress', assignee: 'SAP Security Team',   due: '2026-06-12', overdue: false,
    title: 'Split SD billing authority — break OTC full-cycle access',
    rationale: 'YKIM holds VA01 + VL01N + VF01 + F-28. Split billing into Billing-Create vs Billing-Release.',
    steps: [
      'Design new role ZSD_BR_BILLING_RELEASE',
      'Remove VF01 from existing ZSD_BR_BILLING_CREATE',
      'Reassign 8 affected users · communicate change window',
      'Test in QAS with finance sample · obtain Finance Risk sign-off',
      'Production transport on next change window 2026-06-12',
    ] },
  { id: 'R-1063', violationId: 'V-1063', type: 'Mitigating Control', priority: 'P1', status: 'Open',      assignee: null,                  due: '2026-05-30', overdue: false,
    title: 'Daily reviewer log for GL Posting + Bank Recon overlap',
    rationale: '11 users hold both ZFI_BR_GL_POSTING and bank-recon authority — split is operationally costly.',
    steps: [
      'Build daily exception report — GL postings by users with bank-recon role',
      'Route to Finance Risk inbox each business day 08:00',
      'Establish SLA — review within 24h, sign off in tool',
      'Quarterly metrics review',
    ] },
  { id: 'R-1071', violationId: 'V-1071', type: 'Access Removal',   priority: 'P1', status: 'Open',        assignee: null,                  due: '2026-05-23', overdue: true,
    title: 'Revoke PFCG from 3 non-Basis users',
    rationale: 'JSMITH_LC, KPARK_LC, HSCHRODE hold PFCG role-admin combined with business txns.',
    steps: [
      'Strip ZBC_BR_ROLE_MAINT from JSMITH_LC, KPARK_LC, HSCHRODE',
      'Audit role changes by these users in last 90 days',
      'Onboard to read-only role inspector if needed',
    ] },
  { id: 'R-1082', violationId: 'V-1082', type: 'Role Redesign',    priority: 'P2', status: 'Open',        assignee: 'IT Compliance',       due: '2026-07-01', overdue: false,
    title: 'Split HR Payroll Maintain + Approve',
    rationale: 'MJONES holds both roles. Approval must move to HR Compliance group.',
    steps: [
      'Create ZHR_BR_APPROVE_SEGREGATED · approver only',
      'Reassign approvers to HR Compliance group',
      'Test in QAS with cross-region sample',
    ] },
  { id: 'R-1090', violationId: 'V-1090', type: 'Policy',           priority: 'P1', status: 'In Progress', assignee: 'IT Compliance',       due: '2026-06-05', overdue: false,
    title: 'Firefighter expiry policy — 30 days max',
    rationale: '14 firefighter IDs active >180 days — current policy lacks expiry enforcement.',
    steps: [
      'Draft policy revision — 30-day max with re-attestation',
      'Approve in CAB · communicate to all process owners',
      'Configure ARM tooling to auto-expire',
      'Train approvers · go-live 2026-06-05',
    ] },
  { id: 'R-1094', violationId: 'V-1094', type: 'Role Redesign',    priority: 'P2', status: 'Open',        assignee: null,                  due: '2026-06-20', overdue: false,
    title: 'PO release strategy redesign · ZPM_BR_PROCUREMENT_1720',
    rationale: 'PO Create + PO Release authority exceeds user-grade limits for 9 users.',
    steps: [
      'Map current authorization to grade matrix',
      'Build value-band release strategy ($25K / $250K / $1M)',
      'Migrate users · 4 cutover waves',
    ] },
  { id: 'R-1101', violationId: 'V-1101', type: 'Access Removal',   priority: 'P1', status: 'Open',        assignee: 'Finance Risk',        due: '2026-05-25', overdue: false,
    title: 'Restrict F110 to Treasury role pool',
    rationale: '5 non-Treasury users can execute auto-payment runs — $5M+ exposure.',
    steps: [
      'Identify Treasury role pool · cross-check membership',
      'Strip F110 authorization from 5 outliers',
      'Re-route any in-flight payment requests',
    ] },
  { id: 'R-1112', violationId: 'V-1112', type: 'Mitigating Control', priority: 'P3', status: 'Open',      assignee: null,                  due: '2026-08-01', overdue: false,
    title: 'Quarterly review of Customer Master + Sales Order Release overlap',
    rationale: 'Low-risk pair — mitigating quarterly review acceptable.',
    steps: [
      'Add to quarterly compliance review pack',
      'Capture exceptions over 90 days · escalate if pattern',
    ] },
  { id: 'R-1124', violationId: 'V-1124', type: 'Access Removal',   priority: 'P1', status: 'In Progress', assignee: 'SAP Basis Team',      due: '2026-05-22', overdue: true,
    title: 'Replace SAP_ALL on RFC_BATCH_PI with scoped profile',
    rationale: 'Background user holds SAP_ALL — full-system compromise vector.',
    steps: [
      'Profile minimum-required authorizations from last 90d activity',
      'Create scoped profile · assign · test in QAS',
      'Rotate credentials · vault-managed',
      'Remove SAP_ALL · 24h shadow window',
    ] },
  { id: 'R-1131', violationId: 'V-1131', type: 'Mitigating Control', priority: 'P2', status: 'Resolved',  assignee: 'SAP Security Team',   due: '2026-04-30', overdue: false,
    title: 'Enable three-way match enforcement in MIRO',
    rationale: 'GR + IV by same user · enable system-enforced three-way match.',
    steps: ['Config OBYC three-way match · production'] },
  { id: 'R-1144', violationId: 'V-1144', type: 'Role Redesign',    priority: 'P2', status: 'Open',        assignee: null,                  due: '2026-07-15', overdue: false,
    title: 'Move FK02 bank-tab to Vendor Master team only',
    rationale: 'Vendor Bank Detail edit accessible to 4 AP clerks — vendor-bank-redirect fraud risk.',
    steps: [
      'Restrict bank tab via field auth in FK02',
      'Create Vendor Master Maintainer role · assign 2 users',
      'Communicate to AP team',
    ] },
  { id: 'R-1167', violationId: 'V-1167', type: 'Access Removal',   priority: 'P2', status: 'Open',        assignee: null,                  due: '2026-06-30', overdue: false,
    title: 'Revoke audit log write from non-IT users',
    rationale: '3 non-IT users have write access to audit log tables — SOX violation.',
    steps: [
      'Identify users via S_TABU auth check',
      'Strip write authorization · audit log only',
    ] },
  { id: 'R-1174', violationId: 'V-1174', type: 'Policy',           priority: 'P2', status: 'In Progress', assignee: 'IT Compliance',       due: '2026-06-30', overdue: false,
    title: 'Production change-deploy approval policy',
    rationale: '6 users can deploy to production without approval gate.',
    steps: [
      'Implement transport approval workflow in STMS',
      'Communicate freeze windows',
      'Train Basis team · go-live next quarter',
    ] },
];

const REMEDIATION_KPIS = {
  total: 312,
  open: 198,
  inProgress: 74,
  resolved: 40,
  overdue: 12,
  deltas: {
    total: +24,
    open: +14,
    inProgress: +6,
    resolved: +18,
    overdue: -3,
  },
};

const POLICY_SUGGESTIONS = [
  {
    title: 'Firefighter expiry & re-attestation',
    rationale: 'No SAP firefighter ID should remain active beyond 30 days without explicit re-attestation. Current run shows 14 IDs over 180 days.',
    owner: 'IT Compliance',
    priority: 'P1',
    impact: '14 prolonged assignments',
    frameworks: ['SOX', 'SAP GRC'],
  },
  {
    title: 'Service account ownership attestation',
    rationale: '7 technical accounts are unmanaged (no listed owner). Every service / background / integration ID must have a named owner reviewed quarterly.',
    owner: 'SAP Basis Team',
    priority: 'P1',
    impact: '7 unmanaged accounts',
    frameworks: ['ISO 27001', 'SAP GRC'],
  },
  {
    title: 'Vendor bank-detail change segregation',
    rationale: 'Move FK02 bank-tab maintenance into a dedicated Vendor Master Maintainer role. Block AP clerks from editing vendor bank coordinates.',
    owner: 'Finance Risk',
    priority: 'P2',
    impact: '$1.3M exposure',
    frameworks: ['SOX', 'K-SOX', 'GDPR'],
  },
  {
    title: 'Auto-payment run (F110) restriction',
    rationale: 'F110 execution must be limited to the Treasury role pool. Current run shows 5 non-Treasury users with execution authority.',
    owner: 'Finance Risk',
    priority: 'P1',
    impact: '$5M+ exposure',
    frameworks: ['SOX', 'SAP GRC'],
  },
  {
    title: 'Quarterly role-design review',
    rationale: 'Establish a quarterly cadence to review composite SAP roles spanning more than one functional area. Owned by a cross-functional council.',
    owner: 'IT Compliance',
    priority: 'P3',
    impact: 'Reduce new violations · estimated −18%',
    frameworks: ['SAP GRC'],
  },
];

Object.assign(window.MOCK, {
  REMEDIATION_TYPES, PRIORITIES, REMEDIATIONS, REMEDIATION_KPIS, POLICY_SUGGESTIONS,
});

