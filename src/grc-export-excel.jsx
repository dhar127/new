// Multi-sheet Excel Export Utility using SheetJS (XLSX)
window.exportGrcExcel = function(runId, filteredUsers, filteredRisks, userColSeq, riskColSeq, exportSource, activeFilter) {
  if (typeof XLSX === 'undefined') {
    alert('SheetJS Excel library is not loaded. Please wait a moment or reload.');
    return;
  }

  const runData = window.getMockDataForRun(runId);
  const { kpis } = runData;
  const runIdClean = runId || 'LCSOD-2026-Q2-007';
  const risksForRun = runData.risks || [];
  const usersForRun = runData.users || [];
  const splitTcodes = value => String(value || '').split(',').map(v => v.trim()).filter(Boolean);
  
  const getRiskViolations = u => window.getRiskViolationsForUser ? window.getRiskViolationsForUser(u) : [];
  const getRiskCount = u => window.getRiskCountForUser ? window.getRiskCountForUser(u) : getRiskViolations(u).length;
  const getViolationCount = u => window.getViolationCountForUser ? window.getViolationCountForUser(u) : Math.max(1, splitTcodes(u.conflictingTransactions).length);
  const remediationSteps = u => [
    `Use PFCG to review ${u.role || 'affected SAP role'} and identify access granting ${u.conflictingTransactions || 'conflicting transactions'}.`,
    `${u.recommendedAction || 'Remove conflicting authorization access'}.`,
    'Create a separated least-privilege role so the conflicting functions are not held by the same user.',
    'Use SU10 or the access request workflow to remove the conflicting authorization from affected users.',
    'Re-run the SoD rule and keep the violation Active until the retest shows no conflict.'
  ].join('\n');

  // Determine active lists based on the export source
  let activeUsers = [...filteredUsers];
  let activeRisks = [...filteredRisks];
  const activeFilterClean = activeFilter || 'All';

  if (exportSource === 'users') {
    // Export triggered by Users Table
    // Filter risks to only include those violated by the filtered users
    const violatedRiskIds = new Set(filteredUsers.flatMap(u => getRiskViolations(u).map(v => v.riskId)));
    activeRisks = risksForRun.filter(r => violatedRiskIds.has(r.riskId));
  } else if (exportSource === 'risks') {
    // Export triggered by Risks Table
    // Filter users to only include those affected by the filtered risks
    const activeRiskIds = new Set(filteredRisks.map(r => r.riskId));
    activeUsers = usersForRun.filter(u => getRiskViolations(u).some(v => activeRiskIds.has(v.riskId)));
  }

  // 1. Executive Summary
  const execSummaryData = [
    { "Metric KPI Parameter": "Assessment Run ID", "Value": runIdClean },
    { "Metric KPI Parameter": "Run Status", "Value": "Completed" },
    { "Metric KPI Parameter": "Total SAP Users Scanned", "Value": kpis.totalUsers },
    { "Metric KPI Parameter": "Total Access Violations", "Value": kpis.totalViolations },
    { "Metric KPI Parameter": "Total SoD Risks", "Value": risksForRun.length },
    { "Metric KPI Parameter": "System Risk Score (Average)", "Value": kpis.riskScore },
    { "Metric KPI Parameter": "Risk Coverage Score (%)", "Value": kpis.complianceScore + "%" },
    { "Metric KPI Parameter": "Audit Framework Scope", "Value": "SOX / K-SOX / ISO 27001" }
  ];
  if (exportSource) {
    execSummaryData.push(
      { "Metric KPI Parameter": "Export Context", "Value": exportSource === 'users' ? "Filtered Users Table" : "Filtered Risks Ruleset Catalog" },
      { "Metric KPI Parameter": "Active SoD Stream Filter", "Value": activeFilterClean },
      { "Metric KPI Parameter": "Exported Users Count", "Value": activeUsers.length },
      { "Metric KPI Parameter": "Exported Risks Count", "Value": activeRisks.length }
    );
  }
  const ws1 = XLSX.utils.json_to_sheet(execSummaryData);

  // 2. User Wise Violations
  let userWiseData;
  if (userColSeq && userColSeq.length > 0) {
    userWiseData = activeUsers.map(u => {
      const row = {};
      userColSeq.forEach(col => {
        let val = typeof col.accessor === 'function' ? col.accessor(u) : u[col.id];
        row[col.label] = val !== undefined && val !== null ? val : '';
      });
      return row;
    });
  } else {
    userWiseData = activeUsers.map(u => ({
      "User ID": u.userId,
      "First Name": u.firstName,
      "Last Name": u.lastName,
      "Email": u.email,
      "Account Type": u.accountType,
      "Risk Count": getRiskCount(u),
      "Violation Count": getViolationCount(u)
    }));
  }
  const ws2 = XLSX.utils.json_to_sheet(userWiseData);

  // User Violation Details (only matching active users and active filter)
  const activeRiskIdsForDetails = new Set(activeRisks.map(r => r.riskId));
  const userViolationDetailsData = activeUsers.flatMap(u => getRiskViolations(u)
    .filter(risk => {
      // Must match active risks
      if (!activeRiskIdsForDetails.has(risk.riskId)) return false;
      // Must match stream filter if exporting from users and filter is active
      if (exportSource === 'users' && activeFilterClean !== 'All') {
        const streams = window.getSodStreamsForRisk ? window.getSodStreamsForRisk(risk) : [];
        return streams.includes(activeFilterClean);
      }
      return true;
    })
    .map(risk => ({
      "Risk ID": risk.riskId,
      "User ID": u.userId,
      "First Name": u.firstName,
      "Last Name": u.lastName,
      "Email": u.email,
      "Function IDs": (risk.functionIds || []).join(", "),
      "Function Names": (risk.functionNames || []).join(" | "),
      "Role Type": risk.roleType || 'SoD Conflict',
      "Business Process": risk.businessProcess,
      "Risk Category": risk.riskCategory,
      "Risk Score": risk.riskScore,
      "Severity": risk.severity,
      "Violation Scenario": risk.scenario,
      "Conflicting Transactions": risk.conflictingTransactions,
      "Auth Objects": risk.authObjects,
      "Business Impact": risk.businessImpact,
      "Standards Violated": risk.standardsViolated,
      "Recommended Action": risk.recommendedAction,
      "Remediation Priority": risk.priority,
      "Status": "Active",
      "Assignee": risk.assignee,
      "Step-by-step Recommendation": remediationSteps(risk)
    }))
  );
  const wsUserDetails = XLSX.utils.json_to_sheet(userViolationDetailsData);

  // 3. Risk Wise Violations
  let riskWiseData;
  if (riskColSeq && riskColSeq.length > 0) {
    riskWiseData = activeRisks.map(r => {
      const row = {};
      riskColSeq.forEach(col => {
        let val = typeof col.accessor === 'function' ? col.accessor(r) : r[col.id];
        row[col.label] = val !== undefined && val !== null ? val : '';
      });
      return row;
    });
  } else {
    riskWiseData = activeRisks.map(r => ({
      "Risk ID": r.riskId,
      "Function IDs": Array.isArray(r.functionIds) ? r.functionIds.join(", ") : '',
      "Risk Name": r.title,
      "Business Process": r.process,
      "Risk Category": r.category,
      "Risk Score": r.riskScore,
      "Severity Level": r.level,
      "Affected Users Count": r.userCount,
      "Conflicting Transactions": r.func,
      "Business Impact Summary": r.businessImpact,
      "Mitigation Recommendation": r.recommendations,
      "Standards Mapping": r.grcMapping,
      "Assignee": r.assignee
    }));
  }
  const ws3 = XLSX.utils.json_to_sheet(riskWiseData);

  // Risk User Details (only matching active risks and active users)
  const activeUserIdsForDetails = new Set(activeUsers.map(u => u.userId));
  const riskUserDetailsData = activeRisks.flatMap(r => {
    const affected = window.getUsersForRisk 
      ? window.getUsersForRisk(r, activeUsers) 
      : (r.affectedUsers || []).map(uid => activeUsers.find(user => user.userId === uid)).filter(Boolean);
    
    return affected.map(u => {
      const mappedRisk = getRiskViolations(u).find(item => item.riskId === r.riskId) || r;
      return {
        "Risk ID": r.riskId,
        "Risk Name": r.title,
        "Risk Category": r.category,
        "Risk Score": r.riskScore,
        "User ID": u.userId,
        "First Name": u.firstName || 'SAP',
        "Last Name": u.lastName || 'User',
        "Email": u.email,
        "Standards Violated": 'GRC Ruleset',
        "Violation Count": getViolationCount(u),
        "T-Codes": mappedRisk.conflictingTransactions || r.func,
        "Auth Objects": mappedRisk.authObjects || '',
        "Status": "Active",
        "Recommendation": mappedRisk.recommendedAction || r.recommendations,
        "Priority": mappedRisk.priority || '',
        "Assignee": mappedRisk.assignee || r.assignee
      };
    });
  });
  const wsRiskUsers = XLSX.utils.json_to_sheet(riskUserDetailsData);

  // 4. Severity Distribution (calculated based on active risks)
  const activeCritical = activeRisks.filter(r => r.severity === 'Critical').length;
  const activeHigh = activeRisks.filter(r => r.severity === 'High').length;
  const activeMedium = activeRisks.filter(r => r.severity === 'Medium').length;
  const activeLow = activeRisks.filter(r => r.severity === 'Low').length;
  const activeTotal = activeRisks.length || 1;

  const severityDistData = [
    { "Severity Tier": "Critical", "Violations Count": activeCritical, "Percentage Share": ((activeCritical / activeTotal) * 100).toFixed(1) + "%", "Business Impact Level": "High Risk (P1)" },
    { "Severity Tier": "High", "Violations Count": activeHigh, "Percentage Share": ((activeHigh / activeTotal) * 100).toFixed(1) + "%", "Business Impact Level": "Medium Risk (P2)" },
    { "Severity Tier": "Medium", "Violations Count": activeMedium, "Percentage Share": ((activeMedium / activeTotal) * 100).toFixed(1) + "%", "Business Impact Level": "Low Risk (P3)" },
    { "Severity Tier": "Low", "Violations Count": activeLow, "Percentage Share": ((activeLow / activeTotal) * 100).toFixed(1) + "%", "Business Impact Level": "Minimal Risk (P4)" },
    { "Severity Tier": "Total", "Violations Count": activeRisks.length, "Percentage Share": "100.0%", "Business Impact Level": "Aggregated Scan Result" }
  ];
  const ws4 = XLSX.utils.json_to_sheet(severityDistData);

  // 5. Business Impact
  const businessImpactData = [
    { "Business Process": "Finance", "Impact Domain": "Automatic Payments", "Risk Summary": "Unsegregated automatic payment executions (F110) can result in unauthorized cash disbursements.", "Severity": "High" },
    { "Business Process": "Procurement", "Impact Domain": "Supplier Master Data", "Risk Summary": "Enables creation of fictitious suppliers paired with payment releases (FK01 + F110).", "Severity": "Critical" },
    { "Business Process": "OTC", "Impact Domain": "Sales Order Billing", "Risk Summary": "A single individual can issue sales orders, invoice the customer, and clear payments (VA01 + VF01 + F-28), facilitating direct revenue leakage.", "Severity": "Critical" },
    { "Business Process": "IT Basis", "Impact Domain": "Security Administration", "Risk Summary": "Prolonged emergency access permissions (Firefighter) and PFCG role modification rights compromise audit accountability.", "Severity": "Critical" }
  ];
  const ws5 = XLSX.utils.json_to_sheet(businessImpactData);

  // 6. Violation Scenarios
  const scenariosData = [
    { "Scenario ID": "S-01", "Scenario Name": "Create Vendor + Approve Payment", "Conflicting T-Codes": "FK01, F110", "Business Process": "Procurement", "Criticality": "Critical" },
    { "Scenario ID": "S-02", "Scenario Name": "Full Order-to-Cash Cycle Control", "Conflicting T-Codes": "VA01, VF01, F-28", "Business Process": "OTC", "Criticality": "Critical" },
    { "Scenario ID": "S-03", "Scenario Name": "GL Posting + Bank Reconciliation", "Conflicting T-Codes": "FB50, FF67", "Business Process": "Finance", "Criticality": "Critical" },
    { "Scenario ID": "S-04", "Scenario Name": "Privileged PFCG Role Administration Overlap", "Conflicting T-Codes": "PFCG, MIRO", "Business Process": "IT Basis", "Criticality": "Critical" },
    { "Scenario ID": "S-05", "Scenario Name": "F110 Payment Exec by Non-Treasury", "Conflicting T-Codes": "F110", "Business Process": "Treasury", "Criticality": "High" },
    { "Scenario ID": "S-06", "Scenario Name": "Goods Receipt + Invoice Verification", "Conflicting T-Codes": "MIGO, MIRO", "Business Process": "Procurement", "Criticality": "Medium" }
  ];
  const ws6 = XLSX.utils.json_to_sheet(scenariosData);

  // 7. Standards / Controls Violated
  const standardsData = [
    { "Control Standard": "SOX §404", "Description": "Management assessment of internal controls. Requires segregation of incompatible transactional roles.", "Applicable Scenarios": "S-01, S-02, S-05, S-06" },
    { "Control Standard": "SOX §302", "Description": "Corporate responsibility for financial reports. Restricts unilateral entry and ledger clearing.", "Applicable Scenarios": "S-02, S-03" },
    { "Control Standard": "K-SOX Chapter 4", "Description": "Korean Internal Control Framework. Evaluates automatic journal posting parameters.", "Applicable Scenarios": "S-01, S-03" },
    { "Control Standard": "ISO 27001 A.9", "Description": "Information Security Access Control. Limits user registration and privilege management.", "Applicable Scenarios": "S-04" },
    { "Control Standard": "COBIT DSS05.04", "Description": "Manage User Identity and Logical Access. Regulates firefighter emergency profiles.", "Applicable Scenarios": "S-04" }
  ];
  const ws7 = XLSX.utils.json_to_sheet(standardsData);

  // 8. Remediation Recommendations
  const remediationData = [
    { "Action Type": "Access Removal", "Action Item": "Remove conflicting transaction access from the user.", "Rationale": "Restores single-activity focus and removes access overlap.", "Expected SLA": "48 Hours" },
    { "Action Type": "Role Splitting", "Action Item": "Split composite role into separate single roles.", "Rationale": "Divides incompatible responsibilities at the authorization profile level.", "Expected SLA": "1 Week" },
    { "Action Type": "Mitigation Assignment", "Action Item": "Assign mitigating control approval.", "Rationale": "Applies a supervisory monitoring control where access must remain.", "Expected SLA": "3 Days" },
    { "Action Type": "Access Restriction", "Action Item": "Restrict firefighter access duration.", "Rationale": "Limits firefighter ID assignment to a maximum of 30 days per policy.", "Expected SLA": "24 Hours" },
    { "Action Type": "Privilege Cleanup", "Action Item": "Remove unused high-risk service account privileges.", "Rationale": "Limits service account capability to direct batch jobs only.", "Expected SLA": "48 Hours" },
    { "Action Type": "System Redesign", "Action Item": "Redesign role to follow least privilege.", "Rationale": "Aligns the SAP custom role structure with corporate security policies.", "Expected SLA": "2 Weeks" }
  ];
  const ws8 = XLSX.utils.json_to_sheet(remediationData);

  // 9. Assessment Run Details
  const runDetailsData = [
    { "Configuration Parameter": "Target SAP System ID", "Value": "PRD" },
    { "Configuration Parameter": "System Release", "Value": "S/4HANA 2023" },
    { "Configuration Parameter": "SAP Client ID", "Value": "210" },
    { "Configuration Parameter": "Assessment Run Date", "Value": runDetailsDate(runIdClean) },
    { "Configuration Parameter": "Scoping Ruleset Version", "Value": "Global Matrix v4.2" },
    { "Configuration Parameter": "Scan Duration", "Value": "1h 12m" },
    { "Configuration Parameter": "Created By Auditor", "Value": "Seo-yeon Kim (Lead Audit)" },
    { "Configuration Parameter": "Server Host Address", "Value": "172.17.19.18" }
  ];
  const ws9 = XLSX.utils.json_to_sheet(runDetailsData);

  function runDetailsDate(rid) {
    if (rid === 'LCSOD-2026-Q1-006') return 'Feb 12, 2026';
    if (rid === 'LCSOD-2025-Q4-005') return 'Nov 15, 2025';
    return 'May 19, 2026';
  }

  // Create workbook and append all worksheets
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, "Executive Summary");
  XLSX.utils.book_append_sheet(wb, ws2, "User Wise Violations");
  XLSX.utils.book_append_sheet(wb, wsUserDetails, "User Violation Details");
  XLSX.utils.book_append_sheet(wb, ws3, "Risk Wise Violations");
  XLSX.utils.book_append_sheet(wb, wsRiskUsers, "Risk User Details");
  XLSX.utils.book_append_sheet(wb, ws4, "Severity Distribution");
  XLSX.utils.book_append_sheet(wb, ws5, "Business Impact");
  XLSX.utils.book_append_sheet(wb, ws6, "Violation Scenarios");
  XLSX.utils.book_append_sheet(wb, ws7, "Standards & Controls Violated");
  XLSX.utils.book_append_sheet(wb, ws8, "Remediation Recommendations");
  XLSX.utils.book_append_sheet(wb, ws9, "Assessment Run Details");

  // Trigger download file
  XLSX.writeFile(wb, `SoD_Audit_Report_${runIdClean}.xlsx`);
};
