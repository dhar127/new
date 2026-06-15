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
      "Violation Count": getRiskCount(u)
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
  // Create workbook and append all worksheets
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws2, "User Wise Violations");
  XLSX.utils.book_append_sheet(wb, wsUserDetails, "User Violation Details");
  XLSX.utils.book_append_sheet(wb, ws3, "Risk Wise Violations");
  XLSX.utils.book_append_sheet(wb, wsRiskUsers, "Risk User Details");

  // Trigger download file
  XLSX.writeFile(wb, `SoD_Audit_Report_${runIdClean}.xlsx`);
};
