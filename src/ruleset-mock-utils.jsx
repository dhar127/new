/* Ruleset-derived mock shaping for design approval.
   The backend will later replace riskViolations with live SAP engine output. */
const DEFAULT_RULESET_RISK_CATALOG = [
  { riskId: 'B001', functionIds: ['BS02', 'BS11'], functionNames: ['BS02 - Basis Development', 'BS11 - System Administration'], businessProcess: 'Basis', riskLevel: 0, riskType: '1', scenario: 'Basis Development & System Administration', businessImpact: 'A developer could modify an existing program in production, perform traces to the program, and configure the production environment to run the program. This may affect system performance, data integrity and inappropriate program modification.', conflictingTransactions: 'CMOD, DMCWB, DMWB, DSA, /SAPDMC/LSMW, CFS2, LSMW, OBR1', authObjects: 'S_DEVELOP, S_ADMI_FCD, B_LSMW, S_PROGRAM', assignee: 'P000004' },
  { riskId: 'B012', functionIds: ['BS10', 'BS12'], functionNames: ['BS10 - Security Administration', 'BS12 - Transport Administration'], businessProcess: 'Basis', riskLevel: 1, riskType: '1', scenario: 'Security Administration & Transport Administration', businessImpact: 'A security administrator could make inappropriate changes to unauthorized security roles, transport them, and assign them to a fictitious user for execution.', conflictingTransactions: 'GCE1, LICENSE_ATTRIBUTES, OMDL, OMEH, SCWB, SE01, SE03, SE06', authObjects: 'P_TCODE, S_ADDRESS1, S_TRANSPRT, S_CTS_ADMI', assignee: 'P000006' },
  { riskId: 'B017', functionIds: ['BS07', 'BS09'], functionNames: ['BS07 - Create Transport', 'BS09 - Perform Transport'], businessProcess: 'Basis', riskLevel: 1, riskType: '1', scenario: 'Create Transport & Perform Transport', businessImpact: 'Can create transports, add objects to the transport, and move the transport: Can put unauthorized object changes into production, bypassing the Change Control process.', conflictingTransactions: 'SE01, SE03, SE06, SE09, STMS', authObjects: 'S_CTS_ADMI, S_C_FUNCT, S_BTCH_ADM, S_BTCH_JOB', assignee: null },
  { riskId: 'F002', functionIds: ['CC03', 'CC06'], functionNames: ['CC03 - Maintain Cost Centers', 'CC06 - Cost Transfer Processing'], businessProcess: 'Finance', riskLevel: 0, riskType: '1', scenario: 'Alter a cost center and process unauthorized cost transfers', businessImpact: 'Alter a cost center without authorization and process unauthorized cost transfers to this center, possibly distorting CO reporting.', conflictingTransactions: 'KS01, KS02, KS12, OKEON, KB11, KB11N, KB14, KB14N', authObjects: 'A_S_ANLKL, C_PROJ_KOK, K_VRGNG, K_PVARIANT', assignee: null },
  { riskId: 'F009', functionIds: ['CC01', 'CC04'], functionNames: ['CC01 - Maintain Cost Center Distributions', 'CC04 - Execute Cost Center Distributions'], businessProcess: 'Finance', riskLevel: 2, riskType: '1', scenario: 'Allocate costs to unauthorized cost centers', businessImpact: 'Allocate costs to unauthorized cost centers thereby distorting financial reporting.', conflictingTransactions: 'FCOEX, KSV1, KSV2, KSV5', authObjects: 'K_VRGNG', assignee: null },
  { riskId: 'F010', functionIds: ['CC05', 'CC07'], functionNames: ['CC05 - Maintain Internal CO Order', 'CC07 - Internal Order Settlement'], businessProcess: 'Finance', riskLevel: 2, riskType: '1', scenario: 'Settle expenses from an unauthorized order', businessImpact: 'Settle expenses from an unauthorized order and distort CO reporting.', conflictingTransactions: 'KO01, KO02, KO12, KO14, KO88, KO8G', authObjects: 'K_AUFK_ART, K_ORDER, K_TP_VALU, K_VRGNG', assignee: null },
  { riskId: 'P004', functionIds: ['AP02', 'PR02'], functionNames: ['AP02 - Process Vendor Invoices', 'PR02 - Maintain Purchase Order'], businessProcess: 'Procure to Pay', riskLevel: 1, riskType: '1', scenario: 'Purch unauthorized items and initiate payment by invoicing', businessImpact: 'Purchase unauthorized items and initiate payment by invoicing', conflictingTransactions: 'ACACACT, ACEREV, F-02, F-41, ME21, ME21N, ME22, ME22N', authObjects: 'F_ACE_DST, M_BEST_BSA', assignee: null },
  { riskId: 'P005', functionIds: ['MM05', 'PR02'], functionNames: ['MM05 - Goods Receipts to PO', 'PR02 - Maintain Purchase Order'], businessProcess: 'Procure to Pay', riskLevel: 1, riskType: '1', scenario: 'Purch unauth items and hide by not fully receiving order', businessImpact: 'Enter fictitious purchase orders for personal use and accept the goods through goods receipt', conflictingTransactions: 'COWBHUWE, MB01, MB0A, MIGO, ME21, ME21N, ME22, ME22N', authObjects: 'B_USERSTAT, M_BEST_BSA', assignee: null },
  { riskId: 'P007', functionIds: ['AP01', 'PR02'], functionNames: ['AP01 - AP Payments', 'PR02 - Maintain Purchase Order'], businessProcess: 'Procure to Pay', riskLevel: 1, riskType: '1', scenario: 'Purch unauthorized items and enact payment for them', businessImpact: 'Enter a fictitious purchase order and enter the covering payment', conflictingTransactions: 'F-04, F-06, F-07, F-18, ME21, ME21N, ME22, ME22N', authObjects: 'F_REGU_BUK, M_BEST_BSA', assignee: null },
  { riskId: 'P010', functionIds: ['AP03', 'PR02'], functionNames: ['AP03 - Release Blocked Invoices', 'PR02 - Maintain Purchase Order'], businessProcess: 'Procure to Pay', riskLevel: 0, riskType: '1', scenario: 'Maintain PO and release a previously blocked Invoice', businessImpact: 'Enter unauthorized purchase order and release a previously blocked Invoice to offset the purchase order', conflictingTransactions: 'MR02, MR11, MR11SHOW, MRBR, ME21, ME21N, ME22, ME22N', authObjects: 'S_BTCH_JOB, M_BEST_BSA', assignee: null },
  { riskId: 'P020', functionIds: ['AP01', 'PR04'], functionNames: ['AP01 - AP Payments', 'PR04 - PO Approval'], businessProcess: 'Procure to Pay', riskLevel: 1, riskType: '1', scenario: 'Approve purchase of unauthorized items and enact payment', businessImpact: 'Commit the company to fraudulent purchase contracts and initiate payment for unauthorized goods and services.', conflictingTransactions: 'F-04, F-06, F-07, F-18, ME28, ME29N, ME45', authObjects: 'F_REGU_BUK, M_BEST_BSA', assignee: null },
  { riskId: 'S004', functionIds: ['AR07', 'SD01'], functionNames: ['AR07 - Process Customer Invoices', 'SD01 - Maintain Customer Master Data'], businessProcess: 'Order to Cash', riskLevel: 1, riskType: '1', scenario: 'Change customer master and enter inappropriate invoice', businessImpact: 'Make an unauthorized change to the master record (payment terms, tolerance level) in favor of the customer and enter an inappropriate invoice.', conflictingTransactions: '/SAPNEA/JSCR30, ACACACT, ACEREV, F-02, FD01, FD02, FD05, FD06', authObjects: 'F_ACE_DST, F_KNA1_APP, F_KNA1_BED', assignee: null },
  { riskId: 'S011', functionIds: ['AR01', 'SD01'], functionNames: ['AR01 - AR Payments', 'SD01 - Maintain Customer Master Data'], businessProcess: 'Order to Cash', riskLevel: 1, riskType: '1', scenario: 'Maintain a fictitious customer and initiate a payment', businessImpact: 'Create a fictitious customer and initiate payment to the unauthorized customer.', conflictingTransactions: 'F-04, F-06, F-07, F-18, FD01, FD02, FD05, FD06', authObjects: 'F_BKPF_BUK, F_BKPF_KOA, F_KNA1_APP, F_KNA1_BED', assignee: null },
  { riskId: 'S012', functionIds: ['AR01', 'AR06'], functionNames: ['AR01 - AR Payments', 'AR06 - Process Customer Credit Memos'], businessProcess: 'Order to Cash', riskLevel: 1, riskType: '1', scenario: 'Initiate a payment by creating fictitious credit memos', businessImpact: 'Initiate an unauthorized payment to the customer by entering fictitious credit memos.', conflictingTransactions: 'F-04, F-06, F-07, F-18, F-27, F-67, FB75', authObjects: 'F_BKPF_BUK, F_BKPF_KOA, F_BKPF_BED, F_BKPF_BEK', assignee: null },
  { riskId: 'S017', functionIds: ['AR02', 'AR04'], functionNames: ['AR02 - Cash Application', 'AR04 - Credit Management'], businessProcess: 'Order to Cash', riskLevel: 1, riskType: '1', scenario: 'Approve credit and modify the amount of cash received', businessImpact: 'Perform credit approval function and modify cash received for fraudulent purposes.', conflictingTransactions: 'F-04, F-06, F-26, F-28, F.28, F.34, FD32, FD37', authObjects: 'F_BKPF_BED, F_BKPF_BEK, F_KNKA_KKB, S_PROGRAM', assignee: null },
  { riskId: 'H002', functionIds: ['HR01', 'PY04'], functionNames: ['HR01 - HR Benefits', 'PY04 - Process Payroll'], businessProcess: 'Human Resources', riskLevel: 1, riskType: '1', scenario: 'Change HR Benefits and process payroll without authorization', businessImpact: 'Change employee HR Benefits then process payroll without authorization. Potential for fraudulent activity.', conflictingTransactions: 'HRBEN, HRBEN0003, HRBEN0006, HRBEN0012, PA03, PA04, PAKG, PAKY', authObjects: 'P_ORGIN, P_PCR, P_TCODE', assignee: null },
  { riskId: 'H005', functionIds: ['HR04', 'PY04'], functionNames: ['HR04 - Maintain Time Data', 'PY04 - Process Payroll'], businessProcess: 'Human Resources', riskLevel: 1, riskType: '1', scenario: 'Modify time data and process payroll without authority', businessImpact: 'Modify time data and process payroll resulting in fraudulent payments', conflictingTransactions: 'CAT2, CAT2_ISCR, CAT6, PA61, PA03, PA04, PAKG, PAKY', authObjects: 'P_ORGIN, P_PCR, P_TCODE', assignee: null }
];

const rulesetSeverity = level => Number(level) === 2 ? 'High' : Number(level) === 1 ? 'Medium' : 'Low';
const rulesetRiskScore = level => Number(level) === 2 ? 90 : Number(level) === 1 ? 70 : 40;
const rulesetPriority = level => Number(level) === 2 ? 'P1' : Number(level) === 1 ? 'P2' : 'P3';
const rulesetCategory = process => {
  const p = String(process || '').toLowerCase();
  if (p.includes('finance') || p.includes('cash') || p.includes('order to cash')) return 'Financial';
  if (p.includes('procure')) return 'Procurement';
  if (p.includes('human')) return 'Regulatory';
  if (p.includes('basis')) return 'Technical';
  return 'Operational';
};

const OWNER_NAME_MAP = {
  'P000004': 'Basis Admin',
  'P000095': 'Compliance Lead',
  'P000006': 'Security Analyst',
  'P000022': 'Finance Controller',
  'P001268': 'Basis Architect',
  'P004088': 'AP Manager'
};

const resolveAssignee = (val, process) => {
  if (val && OWNER_NAME_MAP[val]) return OWNER_NAME_MAP[val];
  if (val && String(val).startsWith('P') && String(val).slice(1).match(/^\d+$/)) {
    return 'IT Compliance';
  }
  return val || (String(process || '').includes('Basis') ? 'SAP Security Team' : 'IT Compliance');
};

const normalizeRulesetRisk = row => ({
  ...row,
  riskId: row.riskId,
  title: row.scenario,
  status: 'Active',
  level: rulesetSeverity(row.riskLevel),
  severity: rulesetSeverity(row.riskLevel),
  riskScore: rulesetRiskScore(row.riskLevel),
  priority: rulesetPriority(row.riskLevel),
  category: rulesetCategory(row.businessProcess),
  riskCategory: rulesetCategory(row.businessProcess),
  process: row.businessProcess,
  roleType: row.riskType === '2' ? 'Critical Action' : 'SoD Conflict',
  standardsViolated: 'SAP GRC Global Ruleset, SOX, Internal Access Control',
  recommendedAction: `Separate access for ${String((row.functionNames || [])[0] || 'Function A')} and ${String((row.functionNames || [])[1] || 'Function B')}; remove conflicting action or authorization object from one role.`,
  recommendations: `Separate access for ${String((row.functionNames || [])[0] || 'Function A')} and ${String((row.functionNames || [])[1] || 'Function B')}; remove conflicting action or authorization object from one role.`,
  assignee: resolveAssignee(row.assignee, row.businessProcess)
});

window.getRiskViolationsForUser = user => Array.isArray(user?.riskViolations) ? user.riskViolations : [];
window.getRiskCountForUser = user => window.getRiskViolationsForUser(user).length;
window.getViolationCountForUser = user => window.getRiskViolationsForUser(user).length;
window.getUsersForRisk = (risk, users) => (users || []).filter(user =>
  window.getRiskViolationsForUser(user).some(item => item.riskId === risk.riskId)
);

window.applyRulesetDerivedMock = function(mock) {
  if (!mock || !Array.isArray(mock.ALL_USERS)) return;
  const sourceCatalog = Array.isArray(mock.RULESET_RISK_CATALOG) && mock.RULESET_RISK_CATALOG.length
    ? mock.RULESET_RISK_CATALOG
    : DEFAULT_RULESET_RISK_CATALOG;
  const catalog = sourceCatalog.map(normalizeRulesetRisk);

  mock.ALL_USERS = mock.ALL_USERS.map((user, index) => {
    const riskTotal = index % 3 === 0 ? 4 : 3;
    const selected = Array.from({ length: riskTotal }, (_, offset) => {
      const risk = catalog[(index * 3 + offset * 5) % catalog.length];
      return {
        ...risk,
        roleType: user.roleType || risk.roleType,
        status: 'Active'
      };
    });
    const first = selected[0] || {};
    return {
      ...user,
      riskViolations: selected,
      riskId: first.riskId,
      violationId: first.riskId,
      violationDesc: first.scenario,
      riskViolation: selected.length ? 'Yes' : 'No',
      riskScore: selected.length ? Math.max(...selected.map(item => item.riskScore || 0)) : 0,
      severity: first.severity,
      processArea: first.businessProcess,
      riskCategory: first.riskCategory,
      conflictingTransactions: first.conflictingTransactions,
      businessImpact: first.businessImpact,
      standardsViolated: first.standardsViolated,
      recommendedAction: first.recommendedAction,
      priority: first.priority,
      assignee: first.assignee
    };
  });

  mock.ALL_RISKS = catalog.map(risk => {
    const affectedUsers = mock.ALL_USERS
      .filter(user => window.getRiskViolationsForUser(user).some(item => item.riskId === risk.riskId))
      .map(user => user.userId);
    return {
      ...risk,
      type: risk.roleType,
      ruleset: 'SAP GRC S4HANAOP Global Ruleset',
      func: risk.conflictingTransactions,
      funcDesc: risk.scenario,
      funcStatus: 'Enabled',
      userCount: affectedUsers.length,
      affectedUsers,
      group: `${risk.businessProcess} Control Pool`,
      lastRun: 'LCSOD-2026-Q2-007',
      lastDetected: 'May 19, 2026',
      roles: [],
      tcodes: String(risk.conflictingTransactions || '').split(',').map(v => v.trim()).filter(Boolean),
      businessImpact: risk.businessImpact,
      complianceImpact: 'Direct SAP GRC and SOX control impact.',
      grcMapping: risk.standardsViolated,
      auditNotes: 'Ruleset-derived mock row generated from local S4HANAOP content.'
    };
  });
};

window.MOCK = window.MOCK || {};
window.MOCK.RULESET_RISK_CATALOG = window.MOCK.RULESET_RISK_CATALOG || DEFAULT_RULESET_RISK_CATALOG;
window.applyRulesetDerivedMock(window.MOCK);
