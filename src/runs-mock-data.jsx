/* New Runs List Data */
const ANALYSIS_RUNS = [
  {
    id: '01',
    name: 'Q2 2026 SoD Audit — Lotte Chemical',
    date: 'May 19, 2026 · 04:12 GMT+9',
    createdBy: 'Seo-yeon Kim (Lead Audit)',
    status: 'Completed',
    users: '4,287',
    roles: '18,492',
    violations: '1,243',
    matchRate: 72,
    scopes: ['P2P', 'O2C', 'FI', 'HR', 'Basis'],
  },
  {
    id: '02',
    name: 'Q1 2026 SoD Assessment — Full Landscape',
    date: 'February 8, 2026 · 22:47 GMT+9',
    createdBy: 'Mohammed Singh (Compliance)',
    status: 'Completed',
    users: '4,156',
    roles: '17,821',
    violations: '1,337',
    matchRate: 68,
    scopes: ['P2P', 'O2C', 'FI', 'Basis'],
  },
  {
    id: '03',
    name: 'Q4 2025 Emergency SoD Scan — Post-Audit',
    date: 'November 12, 2025 · 15:33 GMT+9',
    createdBy: 'Laura Chen (Prod Support)',
    status: 'Completed',
    users: '4,098',
    roles: '17,140',
    violations: '1,508',
    matchRate: 60,
    scopes: ['P2P', 'O2C', 'FI'],
  },
  {
    id: '04',
    name: 'Q3 2025 Mid-Year SoD Review',
    date: 'August 25, 2025 · 11:22 GMT+9',
    createdBy: 'John Smith (SAP Basis)',
    status: 'Completed',
    users: '3,987',
    roles: '16,482',
    violations: '1,584',
    matchRate: 61,
    scopes: ['P2P', 'O2C', 'HR'],
  },
];

const SAP_SYSTEMS = [
  { id: 1, name: 'PRD', ashost: '172.17.19.18', sysnr: '00', client: '210', status: 'connected' },
  { id: 2, name: 'QAS', ashost: '172.17.19.19', sysnr: '01', client: '211', status: 'connected' },
  { id: 3, name: 'DEV', ashost: '172.17.19.20', sysnr: '02', client: '212', status: 'disconnected' },
];

/* P2P (Procure-to-Pay) Violations Data */
const P2P_VIOLATIONS = [
  { id: 'PTP-001', pair: 'ME21N + MIRO',  desc: 'PO Create + LIV Posting',           users: 34, severity: 'Critical', status: 'Open', exposure: 'High' },
  { id: 'PTP-002', pair: 'ME21N + ME29N', desc: 'PO Create + PO Approval',           users: 19, severity: 'Critical', status: 'Open', exposure: 'High' },
  { id: 'PTP-003', pair: 'FK01 + F110',   desc: 'Vendor Master + Payment Run',       users: 8,  severity: 'High',     status: 'In Progress', exposure: 'High' },
  { id: 'PTP-004', pair: 'MIGO + MIRO',   desc: 'Goods Receipt + Invoice Post',      users: 27, severity: 'High',     status: 'Open', exposure: 'Medium' },
  { id: 'PTP-005', pair: 'FK01 + FK02',   desc: 'Vendor Create + Vendor Modify',     users: 12, severity: 'Medium',   status: 'Resolved', exposure: 'Low' },
  { id: 'PTP-006', pair: 'F110 + FF67',   desc: 'Payment Run + Bank Reconcile',      users: 6,  severity: 'Medium',   status: 'Open', exposure: 'Low' },
  { id: 'PTP-007', pair: 'ME23N + MIRO',  desc: 'PO Display + Invoice Posting',      users: 14, severity: 'High',     status: 'Open', exposure: 'Medium' },
  { id: 'PTP-008', pair: 'FB60 + FB50',   desc: 'Invoice Post + GL Entry',           users: 9,  severity: 'High',     status: 'In Progress', exposure: 'High' },
];

const P2P_KPIS = {
  totalViolations: 129,
  highRiskCombos: 15,
  affectedVendors: 342,
  estimatedExposure: 8_740_000,
  deltas: {
    totalViolations: -12,
    highRiskCombos: -3,
    affectedVendors: -28,
    estimatedExposure: -1_200_000,
  },
};

const VENDOR_RISK_HEATMAP = [
  { vendor: 'Acme Steel KR', violations: 12, exposure: '$1.2M' },
  { vendor: 'Global Logistics Inc', violations: 9, exposure: '$890K' },
  { vendor: 'TechParts Asia', violations: 8, exposure: '$720K' },
  { vendor: 'ChemCorp Solutions', violations: 7, exposure: '$680K' },
  { vendor: 'EuroSupply GmbH', violations: 6, exposure: '$540K' },
  { vendor: 'AsiaElectronics Ltd', violations: 5, exposure: '$480K' },
  { vendor: 'PackageMasters', violations: 4, exposure: '$420K' },
  { vendor: 'RawMaterials Co', violations: 3, exposure: '$310K' },
  { vendor: 'ServicePartners LLC', violations: 3, exposure: '$280K' },
  { vendor: 'OtherVendors (239 remaining)', violations: 87, exposure: '$3.4M' },
];

const P2P_REMEDIATION = [
  {
    type: 'Role Redesign',
    title: 'Split ME21N + MIRO Role Cluster',
    description: 'Separate PO creation from invoice verification. Create ZMM_PO_CREATE (read-only invoice access) and ZFI_INVOICE_VERIFY (blind to PO creation). 34 users affected.',
    priority: 'P1',
    timeline: '2-3 weeks',
    impact: 'High',
  },
  {
    type: 'Mitigating Control',
    title: 'Implement 4-Eye Approval for Invoices >$100K',
    description: 'Enable SRM invoice matching enforcement: 3-way match required. System blocks invoice posting if variance >10% or missing delivery confirmation.',
    priority: 'P2',
    timeline: '1 week',
    impact: 'Medium',
  },
  {
    type: 'Access Removal',
    title: 'Restrict FK01 + F110 Pairing to Treasury Only',
    description: 'Move vendor master creation authority to Vendor Master team. Restrict F110 (payment run) to Treasury pool. 8 users lose payment authority.',
    priority: 'P2',
    timeline: 'Immediate',
    impact: 'High',
  },
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
