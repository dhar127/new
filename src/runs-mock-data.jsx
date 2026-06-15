/* Real Runs List Data */
const ANALYSIS_RUNS = [
  {
    id: 'LCSOD-2026-Q2-007',
    name: 'Q2 2026 — Enterprise SoD Assessment',
    date: 'May 19, 2026 · 04:12 GMT+9',
    createdBy: 'Seo-yeon Kim (Lead Audit)',
    status: 'Completed',
    users: '540',
    roles: '1620',
    violations: '44',
    matchRate: 91.9,
    scopes: ['P2P', 'O2C', 'FI', 'HR', 'Basis'],
  },
  {
    id: 'LCSOD-2026-Q1-006',
    name: 'Q1 2026 — Enterprise SoD Assessment',
    date: 'Feb 12, 2026 · 10:30 GMT+9',
    createdBy: 'Seo-yeon Kim (Lead Audit)',
    status: 'Completed',
    users: '535',
    roles: '1605',
    violations: '38',
    matchRate: 92.5,
    scopes: ['P2P', 'O2C', 'FI', 'Basis'],
  },
  {
    id: 'LCSOD-2025-Q4-005',
    name: 'Q4 2025 — Enterprise SoD Assessment',
    date: 'Nov 15, 2025 · 14:00 GMT+9',
    createdBy: 'Seo-yeon Kim (Lead Audit)',
    status: 'Completed',
    users: '520',
    roles: '1560',
    violations: '48',
    matchRate: 90.0,
    scopes: ['P2P', 'O2C', 'FI'],
  }
];

const SAP_SYSTEMS = [
  { id: 1, name: 'PRD', ashost: '172.17.19.18', sysnr: '00', client: '210', status: 'connected' }
];

/* P2P (Procure-to-Pay) Violations Data */
const P2P_VIOLATIONS = [
  { id: 'PTP-001', pair: 'ME21N + MIRO',  desc: 'PO Create + LIV Posting',           users: 26, severity: 'Critical', status: 'Open', exposure: 'High' },
  { id: 'PTP-002', pair: 'ME21N + ME29N', desc: 'PO Create + PO Approval',           users: 26, severity: 'Critical', status: 'In Progress', exposure: 'High' },
  { id: 'PTP-003', pair: 'MIGO + MIRO',   desc: 'Goods Receipt + Invoice Post',      users: 0, severity: 'High',     status: 'Resolved', exposure: 'High' }
];

const P2P_KPIS = {
  totalViolations: 26,
  highRiskCombos: 3,
  affectedVendors: 44,
  estimatedExposure: 16640000,
  deltas: {
    totalViolations: 0,
    highRiskCombos: 0,
    affectedVendors: 0,
    estimatedExposure: 0,
  },
};

const VENDOR_RISK_HEATMAP = [
  { vendor: 'Acme Steel KR', violations: 3, exposure: '$2.4M' }
];

const P2P_REMEDIATION = [
  {
    type: 'Role Redesign',
    title: 'Split PO Create + LIV Posting',
    description: 'Separate ME21N from MIRO roles globally to resolve Procurement risks.',
    priority: 'P1',
    timeline: '2 weeks',
    impact: 'High',
  }
];

window.ANALYSIS_RUNS = ANALYSIS_RUNS;
window.SAP_SYSTEMS = SAP_SYSTEMS;
window.P2P_VIOLATIONS = P2P_VIOLATIONS;
window.P2P_KPIS = P2P_KPIS;
window.VENDOR_RISK_HEATMAP = VENDOR_RISK_HEATMAP;
window.P2P_REMEDIATION = P2P_REMEDIATION;

Object.assign(window.MOCK, {
  ANALYSIS_RUNS, SAP_SYSTEMS, P2P_VIOLATIONS, P2P_KPIS, VENDOR_RISK_HEATMAP, P2P_REMEDIATION,
});
