// Real data generated from downloads/user_details
const RUN = {
  id: 'LCSOD-2026-Q2-007',
  name: 'Q2 2026 — Enterprise SoD Assessment',
  date: 'May 19, 2026 · 04:12 GMT+9',
  system: 'PRD · S/4HANA 2023 · LCKR-PRD-01',
  status: 'Completed',
  duration: '1h 12m',
  scope: '540 users scanned',
};

const KPIS = {
  totalUsers: 540,
  totalViolations: 46,
  critical: 18,
  high: 19,
  medium: 9,
  low: 0,
  complianceScore: 93.5,
  severityBreakdown: {
    critical: 18,
    high: 19,
    medium: 9,
    low: 0
  },
  deltas: {
    totalUsers: 0,
    totalViolations: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    complianceScore: 0,
  },
};

const COMPLIANCE = {
  maturityLevel: 'Managed',
  industryPeer: 78,
  trend: [82, 85, 87, 90, 92, 94, 95, 93.5],
  systemicWeaknesses: [
    'Direct table update authorization issues detected',
    'Unmonitored firefighter activities in production environment',
    'Overlapping billing and order release authorities'
  ],
  detected: {
    critical: 18,
    high: 19,
    medium: 9,
    low: 0,
  },
  unmitigated: {
    critical: 18,
    high: 19,
    medium: 9,
    low: 0,
  },
  affectedUsers: 35,
  totalUsersScanned: 540,
};

const PROCESS_AREAS = ['Finance', 'Procurement', 'OTC', 'HR', 'IT'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
const TEAMS = ['SAP Basis Team', 'IT Compliance', 'Finance Risk', 'SAP Security Team'];

const CRITICAL_FINDINGS = [
  {
    "id": "V-1058",
    "desc": "Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user",
    "users": 5,
    "severity": "Critical",
    "area": "OTC",
    "action": "Split SD billing authority \u2014 redesign role ZSD_BR_BILLING_CREATE",
    "affectedUsersList": [
      {
        "userId": "HOANG.NGUYEN",
        "name": "Hoang Nguyen",
        "dept": "Finance",
        "roles": 237,
        "riskScore": 75
      },
      {
        "userId": "JAE.KANG",
        "name": "Jae Kang",
        "dept": "Finance",
        "roles": 148,
        "riskScore": 75
      },
      {
        "userId": "PVALENCIA",
        "name": "Valencia Patricia",
        "dept": "Finance",
        "roles": 107,
        "riskScore": 75
      },
      {
        "userId": "RUTGER.DUKES",
        "name": "Rutger Dukes",
        "dept": "Finance",
        "roles": 50,
        "riskScore": 75
      },
      {
        "userId": "WBERRYMAN",
        "name": "Wendy Berryman",
        "dept": "Finance",
        "roles": 51,
        "riskScore": 75
      }
    ]
  },
  {
    "id": "V-1071",
    "desc": "PFCG role-admin combined with end-user transaction access",
    "users": 5,
    "severity": "Critical",
    "area": "IT",
    "action": "Revoke PFCG from end-users",
    "affectedUsersList": [
      {
        "userId": "FF.IT",
        "name": "Ely Taleon",
        "dept": "Finance",
        "roles": 78,
        "riskScore": 90
      },
      {
        "userId": "JSONNIER",
        "name": "JAMES SONNIER",
        "dept": "Finance",
        "roles": 35,
        "riskScore": 90
      },
      {
        "userId": "SBRYAN",
        "name": "Stephanie Brown Bryan",
        "dept": "Finance",
        "roles": 96,
        "riskScore": 90
      },
      {
        "userId": "SUNIL.SAHAI",
        "name": "Sunil Sahai",
        "dept": "Finance",
        "roles": 78,
        "riskScore": 90
      },
      {
        "userId": "VRADHAKRISHN",
        "name": "Vinoth Radhakrishnan",
        "dept": "Finance",
        "roles": 74,
        "riskScore": 90
      }
    ]
  },
  {
    "id": "V-1090",
    "desc": "Firefighter ID active >180 days without re-attestation",
    "users": 13,
    "severity": "High",
    "area": "IT",
    "action": "Force expiry \u2014 set 30-day max per Lotte policy",
    "affectedUsersList": [
      {
        "userId": "FF.BASIS",
        "name": "Firefighter ID for Basis Administration",
        "dept": "IT Basis",
        "roles": 78,
        "riskScore": 75
      },
      {
        "userId": "FF.EWM",
        "name": "Firefighter ID for EWM - Extended Warehouse Managment",
        "dept": "IT Basis",
        "roles": 16,
        "riskScore": 75
      },
      {
        "userId": "FF.FI",
        "name": "Firefighter ID for Finance",
        "dept": "IT Basis",
        "roles": 17,
        "riskScore": 75
      },
      {
        "userId": "FF.IT",
        "name": "Ely Taleon",
        "dept": "IT Basis",
        "roles": 78,
        "riskScore": 75
      },
      {
        "userId": "FF.IT02",
        "name": "FF IT02",
        "dept": "IT Basis",
        "roles": 71,
        "riskScore": 75
      },
      {
        "userId": "FF.MM",
        "name": "Firefighter ID for Materials Management",
        "dept": "IT Basis",
        "roles": 53,
        "riskScore": 75
      },
      {
        "userId": "FF.MM02",
        "name": "FF.MM02",
        "dept": "IT Basis",
        "roles": 17,
        "riskScore": 75
      },
      {
        "userId": "FF.PM",
        "name": "Firefighter ID for Plant Maintenance",
        "dept": "IT Basis",
        "roles": 22,
        "riskScore": 75
      },
      {
        "userId": "FF.PP",
        "name": "Firefighter ID for Production Planning",
        "dept": "IT Basis",
        "roles": 17,
        "riskScore": 75
      },
      {
        "userId": "FF.SD",
        "name": "Firefighter ID for Sales & Distribution",
        "dept": "IT Basis",
        "roles": 29,
        "riskScore": 75
      },
      {
        "userId": "FF.TEMP",
        "name": "FireFighter Temporary",
        "dept": "IT Basis",
        "roles": 71,
        "riskScore": 75
      },
      {
        "userId": "JEFF.DOZART",
        "name": "Jeff Dozart",
        "dept": "IT Basis",
        "roles": 34,
        "riskScore": 75
      },
      {
        "userId": "LSCHIFFMAN",
        "name": "Lauren Schiffman",
        "dept": "IT Basis",
        "roles": 7,
        "riskScore": 75
      }
    ]
  },
  {
    "id": "V-1094",
    "desc": "PO Create + PO Release threshold exceeds user grade authority",
    "users": 1,
    "severity": "High",
    "area": "Procurement",
    "action": "Redesign ZPM_BR_PROCUREMENT_1720 release strategy",
    "affectedUsersList": [
      {
        "userId": "SBRYAN",
        "name": "Stephanie Brown Bryan",
        "dept": "Finance",
        "roles": 96,
        "riskScore": 75
      }
    ]
  },
  {
    "id": "V-1101",
    "desc": "F110 Auto-Payment Run runnable by non-treasury users",
    "users": 5,
    "severity": "High",
    "area": "Finance",
    "action": "Restrict F110 to Treasury role pool",
    "affectedUsersList": [
      {
        "userId": "FF.FI",
        "name": "Firefighter ID for Finance",
        "dept": "Finance",
        "roles": 17,
        "riskScore": 75
      },
      {
        "userId": "FF.IT",
        "name": "Ely Taleon",
        "dept": "Finance",
        "roles": 78,
        "riskScore": 75
      },
      {
        "userId": "FF.IT02",
        "name": "FF IT02",
        "dept": "Finance",
        "roles": 71,
        "riskScore": 75
      },
      {
        "userId": "FF.TEMP",
        "name": "FireFighter Temporary",
        "dept": "Finance",
        "roles": 71,
        "riskScore": 75
      },
      {
        "userId": "SBRYAN",
        "name": "Stephanie Brown Bryan",
        "dept": "Finance",
        "roles": 96,
        "riskScore": 75
      }
    ]
  },
  {
    "id": "V-1124",
    "desc": "Background user RFC_BATCH_PI holds SAP_ALL equivalent",
    "users": 8,
    "severity": "Critical",
    "area": "IT",
    "action": "Replace with scoped profile, rotate credentials",
    "affectedUsersList": [
      {
        "userId": "BATCH_USER",
        "name": "BATCH_USER",
        "dept": "IT Basis",
        "roles": 44,
        "riskScore": 100
      },
      {
        "userId": "DDIC",
        "name": "DDIC",
        "dept": "IT Basis",
        "roles": 9,
        "riskScore": 100
      },
      {
        "userId": "KTERN_SERVIC",
        "name": "KTern Connection",
        "dept": "IT Basis",
        "roles": 7,
        "riskScore": 100
      },
      {
        "userId": "RFCUSER",
        "name": "RFCUSER",
        "dept": "IT Basis",
        "roles": 13,
        "riskScore": 100
      },
      {
        "userId": "SAPSUPPORT",
        "name": "SAPSUPPORT",
        "dept": "IT Basis",
        "roles": 70,
        "riskScore": 100
      },
      {
        "userId": "SAP_WFRT",
        "name": "Workflow user",
        "dept": "IT Basis",
        "roles": 17,
        "riskScore": 100
      },
      {
        "userId": "SDMI_GJJNQXG",
        "name": "SDMI_GJJNQXG",
        "dept": "IT Basis",
        "roles": 1,
        "riskScore": 100
      },
      {
        "userId": "TC_USER",
        "name": "TC_USER",
        "dept": "IT Basis",
        "roles": 1,
        "riskScore": 100
      }
    ]
  },
  {
    "id": "V-1131",
    "desc": "Goods Receipt + Invoice Verification by same user",
    "users": 9,
    "severity": "Medium",
    "area": "Procurement",
    "action": "Enable three-way match enforcement in MIRO",
    "affectedUsersList": [
      {
        "userId": "EELLIOTT",
        "name": "Ellen Elliott",
        "dept": "Finance",
        "roles": 75,
        "riskScore": 75
      },
      {
        "userId": "HCLEMENT",
        "name": "Hannah Clement",
        "dept": "Finance",
        "roles": 37,
        "riskScore": 75
      },
      {
        "userId": "HOANG.NGUYEN",
        "name": "Hoang Nguyen",
        "dept": "Finance",
        "roles": 237,
        "riskScore": 75
      },
      {
        "userId": "JAE.KANG",
        "name": "Jae Kang",
        "dept": "Finance",
        "roles": 148,
        "riskScore": 75
      },
      {
        "userId": "SBORDELON",
        "name": "Shelly Bordelon",
        "dept": "Finance",
        "roles": 34,
        "riskScore": 75
      },
      {
        "userId": "SBRYAN",
        "name": "Stephanie Brown Bryan",
        "dept": "Finance",
        "roles": 96,
        "riskScore": 75
      },
      {
        "userId": "SONJA.WRIGHT",
        "name": "Sonja Wright",
        "dept": "Finance",
        "roles": 27,
        "riskScore": 75
      },
      {
        "userId": "SUNIL.SAHAI",
        "name": "Sunil Sahai",
        "dept": "Finance",
        "roles": 78,
        "riskScore": 75
      },
      {
        "userId": "VMEHTA",
        "name": "Vinay Mehta",
        "dept": "Finance",
        "roles": 108,
        "riskScore": 75
      }
    ]
  }
];

const IMMEDIATE_ACTIONS = [
  {
    "id": "IA-201",
    "desc": "HOANG.NGUYEN holds Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "HOANG.NGUYEN",
    "action": "Split SD billing authority \u2014 redesign role ZSD_BR_BILLING_CREATE",
    "risk": "Unmitigated dual custody violation across critical transactions",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-202",
    "desc": "JAE.KANG holds Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "JAE.KANG",
    "action": "Split SD billing authority \u2014 redesign role ZSD_BR_BILLING_CREATE",
    "risk": "Unmitigated dual custody violation across critical transactions",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-203",
    "desc": "PVALENCIA holds Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "PVALENCIA",
    "action": "Split SD billing authority \u2014 redesign role ZSD_BR_BILLING_CREATE",
    "risk": "Unmitigated dual custody violation across critical transactions",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-204",
    "desc": "FF.IT holds PFCG role-admin combined with end-user transaction access in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "FF.IT",
    "action": "Revoke PFCG from end-users",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-205",
    "desc": "JSONNIER holds PFCG role-admin combined with end-user transaction access in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "JSONNIER",
    "action": "Revoke PFCG from end-users",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-206",
    "desc": "SBRYAN holds PFCG role-admin combined with end-user transaction access in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "SBRYAN",
    "action": "Revoke PFCG from end-users",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-207",
    "desc": "BATCH_USER holds Background user RFC_BATCH_PI holds SAP_ALL equivalent in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "BATCH_USER",
    "action": "Replace with scoped profile, rotate credentials",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-208",
    "desc": "DDIC holds Background user RFC_BATCH_PI holds SAP_ALL equivalent in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "DDIC",
    "action": "Replace with scoped profile, rotate credentials",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "IA-209",
    "desc": "KTERN_SERVIC holds Background user RFC_BATCH_PI holds SAP_ALL equivalent in PRD",
    "urgency": "P1 \u00b7 24h",
    "user": "KTERN_SERVIC",
    "action": "Replace with scoped profile, rotate credentials",
    "risk": "System security threat",
    "status": "Open",
    "assignee": null
  }
];

const RUN_TREND = [
  { run: 'Q4-2025', date: '2025-11', new: 10, resolved: 5, persisting: 25, score: 90.0 },
  { run: 'Q1-2026', date: '2026-02', new: 8, resolved: 12, persisting: 21, score: 92.5 },
  { run: 'Q2-2026', date: '2026-05', new: 0, resolved: 15, persisting: 35, score: 93.5 }
];

const CATEGORY_CARDS = [
  { key: 'sod-04', code: 'SOD-04', title: 'Immediate Actions',        count: 9,   severity: 'Critical', blurb: 'P1 violations needing remediation within 24-48 hours', icon: 'flame' },
  { key: 'sod-05', code: 'SOD-05', title: 'Risk Severity & Impact',   count: 46,  severity: 'Critical', blurb: 'Operational & regulatory severity assessment', icon: 'impact' },
  { key: 'sod-06', code: 'SOD-06', title: 'Super Administrators',     count: 32,  severity: 'Critical', blurb: 'Concentration of administrative authority', icon: 'shield' },
  { key: 'sod-07', code: 'SOD-07', title: 'Dual Process Control',     count: 19, severity: 'Critical', blurb: 'Cross-process authorization overlaps', icon: 'split' },
  { key: 'sod-08', code: 'SOD-08', title: 'Emergency Access',         count: 13,  severity: 'High',     blurb: 'Firefighter usage and anomaly flags', icon: 'flame' },
  { key: 'sod-09', code: 'SOD-09', title: 'OTC Control Violations',   count: 13,  severity: 'Critical', blurb: 'Order-to-Cash process conflicts', icon: 'cycle' },
  { key: 'sod-10', code: 'SOD-10', title: 'High-Risk Service Accounts', count: 125, severity: 'High',   blurb: 'Service accounts with excessive privileges', icon: 'bot' },
  { key: 'sod-11', code: 'SOD-11', title: 'Remediation & Governance', count: 7, severity: 'Medium',   blurb: 'Open remediation recommendations', icon: 'wrench' },
  { key: 'sod-12', code: 'SOD-12', title: 'Continuous Compliance',    count: 540, severity: 'Low',      blurb: 'Automated scans and rule execution metrics', icon: 'shield' },
];

window.MOCK = {
  RUN, KPIS, COMPLIANCE,
  PROCESS_AREAS, SEVERITIES, TEAMS,
  CRITICAL_FINDINGS, IMMEDIATE_ACTIONS,
  RUN_TREND, CATEGORY_CARDS,
};

// SOD-05 - Compliance Impact Assessment
const IMPACT_CATEGORIES = ['Financial', 'Operational', 'Regulatory'];
const EXPOSURE_LEVELS = ['High', 'Medium', 'Low'];
const FRAMEWORKS = ['SOX', 'GDPR', 'ISO 27001', 'SAP GRC', 'K-SOX'];

const IMPACT_SPLIT = [
  {
    "category": "Financial",
    "count": 19,
    "color": "#EF4444"
  },
  {
    "category": "Operational",
    "count": 14,
    "color": "#475569"
  },
  {
    "category": "Regulatory",
    "count": 13,
    "color": "#94A3B8"
  }
];

const FRAMEWORK_BREAKDOWN = [
  {
    "framework": "SOX",
    "count": 32,
    "criticality": "Critical"
  },
  {
    "framework": "K-SOX",
    "count": 5,
    "criticality": "Critical"
  },
  {
    "framework": "SAP GRC",
    "count": 46,
    "criticality": "High"
  },
  {
    "framework": "GDPR",
    "count": 0,
    "criticality": "High"
  },
  {
    "framework": "ISO 27001",
    "count": 13,
    "criticality": "Medium"
  }
];

const IMPACT_ROWS = [
  {
    "id": "V-1058",
    "desc": "Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user",
    "category": "Financial",
    "exposure": "High",
    "areas": [
      "OTC"
    ],
    "frameworks": [
      "SOX",
      "SAP GRC"
    ],
    "users": 5,
    "linked": []
  },
  {
    "id": "V-1071",
    "desc": "PFCG role-admin combined with end-user transaction access",
    "category": "Operational",
    "exposure": "High",
    "areas": [
      "IT"
    ],
    "frameworks": [
      "SAP GRC",
      "ISO 27001"
    ],
    "users": 5,
    "linked": []
  },
  {
    "id": "V-1090",
    "desc": "Firefighter ID active >180 days without re-attestation",
    "category": "Regulatory",
    "exposure": "High",
    "areas": [
      "IT"
    ],
    "frameworks": [
      "SOX",
      "SAP GRC"
    ],
    "users": 13,
    "linked": []
  },
  {
    "id": "V-1094",
    "desc": "PO Create + PO Release threshold exceeds user grade authority",
    "category": "Operational",
    "exposure": "Medium",
    "areas": [
      "Procurement"
    ],
    "frameworks": [
      "SAP GRC"
    ],
    "users": 1,
    "linked": []
  },
  {
    "id": "V-1101",
    "desc": "F110 Auto-Payment Run runnable by non-treasury users",
    "category": "Financial",
    "exposure": "High",
    "areas": [
      "Finance"
    ],
    "frameworks": [
      "SAP GRC",
      "SOX",
      "K-SOX"
    ],
    "users": 5,
    "linked": []
  },
  {
    "id": "V-1124",
    "desc": "Background user RFC_BATCH_PI holds SAP_ALL equivalent",
    "category": "Operational",
    "exposure": "High",
    "areas": [
      "IT"
    ],
    "frameworks": [
      "SAP GRC",
      "ISO 27001"
    ],
    "users": 8,
    "linked": []
  },
  {
    "id": "V-1131",
    "desc": "Goods Receipt + Invoice Verification by same user",
    "category": "Financial",
    "exposure": "Medium",
    "areas": [
      "Procurement"
    ],
    "frameworks": [
      "SOX",
      "SAP GRC"
    ],
    "users": 9,
    "linked": []
  }
];

const IMPACT_KPIS = {
  totalMapped: 46,
  financialExposureHigh: 18,
  financialExposureMed: 19,
  financialExposureLow: 9,
  frameworksAffected: 5,
  deltas: {
    totalMapped: 0,
    financialExposureHigh: 0,
  },
};

Object.assign(window.MOCK, {
  IMPACT_CATEGORIES, EXPOSURE_LEVELS, FRAMEWORKS,
  IMPACT_SPLIT, FRAMEWORK_BREAKDOWN, IMPACT_ROWS, IMPACT_KPIS,
});

// SOD-06 - Super Administrators
const SUPER_ADMIN_RECOMMENDATIONS = ['Revoke', 'Redesign', 'Monitor'];
const SUPER_ADMIN_ROWS = [
  {
    "user": "BASIS_AMS",
    "name": "AMS Support Basis",
    "userId": "BASIS_AMS",
    "indicator": "PFCG + SU01 combo",
    "score": 56,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "06-09-2025",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN",
        "authObjects": [
          "LCM_LT",
          "/SRMSMC/BO",
          "LCM_GEN",
          "LCM_CTX",
          "LCM_LTENSO",
          "I_IWERK",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_DHBASACT",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "ZBASIS_BR_USER_ROLE_ADMIN",
        "desc": "Role: ZBASIS_BR_USER_ROLE_ADMIN",
        "authObjects": [
          "S_USER_STA",
          "S_IMG_GENE",
          "S_RFC",
          "PLOG",
          "S_USER_SYS",
          "S_USER_PRO",
          "S_BTCH_ADM",
          "P_TCODE",
          "S_USER_VAL",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "ZBASIS_BR_PERFORMANCE_ANALYSIS",
        "desc": "Role: ZBASIS_BR_PERFORMANCE_ANALYSIS",
        "authObjects": [
          "S_C_FUNCT",
          "S_PROGNAM",
          "S_RFC",
          "S_USER_PRO",
          "S_TABU_NAM",
          "S_ABAPDUMP",
          "S_TABU_CLI",
          "S_USER_GRP",
          "S_ESH_ADM",
          "S_TOOLS_EX"
        ]
      },
      {
        "role": "ZBASIS_BR_DB_ADMIN",
        "desc": "Role: ZBASIS_BR_DB_ADMIN",
        "authObjects": [
          "S_ARCHIVE",
          "S_RZL_ADM",
          "S_ADMI_FCD",
          "S_TCODE",
          "S_DBCON"
        ]
      }
    ]
  },
  {
    "user": "BATCH_USER",
    "name": "BATCH_USER",
    "userId": "BATCH_USER",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN",
        "authObjects": [
          "LCM_LT",
          "/SRMSMC/BO",
          "LCM_GEN",
          "LCM_CTX",
          "LCM_LTENSO",
          "I_IWERK",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_DHBASACT",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES",
        "authObjects": [
          "M_ANFR_BSA",
          "A_S_WERK",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG",
          "S_PB_CHIP"
        ]
      }
    ]
  },
  {
    "user": "BBREVES",
    "name": "Bruno Breves",
    "userId": "BBREVES",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-04-2026",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZALL_BR_EMPLOYEE",
        "desc": "Role: ZALL_BR_EMPLOYEE",
        "authObjects": [
          "S_ESH_CONN",
          "B_BUPA_FDG",
          "/CPD/MP",
          "S_RS_COMP",
          "S_WFAR_OBJ",
          "P_ORGIN",
          "PLOG",
          "SDDLVIEW",
          "S_RS_COMP1",
          "B_BUPA_GRP"
        ]
      },
      {
        "role": "ZL_BR_CA_COSTCENTER_MANAGER",
        "desc": "Role: ZL_BR_CA_COSTCENTER_MANAGER",
        "authObjects": [
          "M_ANFR_BSA",
          "M_RFQ_BSA",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "F_CC_HIER",
          "K_CSKS",
          "C_PRPS_USR"
        ]
      },
      {
        "role": "ZL_BR_FI_AR_REPORTS",
        "desc": "Role: ZL_BR_FI_AR_REPORTS",
        "authObjects": [
          "M_ANFR_BSA",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "FIAR_CLIPA",
          "K_CSKS",
          "C_PRPS_USR",
          "S_ESH_CONN"
        ]
      },
      {
        "role": "ZL_BR_FI_GENERAL_FINANCE",
        "desc": "Role: ZL_BR_FI_GENERAL_FINANCE",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "K_KA_RPT",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK"
        ]
      }
    ]
  },
  {
    "user": "BDAUGHERTY",
    "name": "Ben Daugherty",
    "userId": "BDAUGHERTY",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "14-07-2025",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      },
      {
        "role": "ZL_BR_MM_INVTRY_REPORTS",
        "desc": "Role: ZL_BR_MM_INVTRY_REPORTS",
        "authObjects": [
          "W_BETR_USR",
          "M_RFQ_BSA",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "V_VTTK_SHT",
          "S_ESH_CONN"
        ]
      },
      {
        "role": "ZL_BR_MM_PR_PROCESSING",
        "desc": "Role: ZL_BR_MM_PR_PROCESSING",
        "authObjects": [
          "M_ANFR_BSA",
          "A_S_WERK",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "M_EINF_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS"
        ]
      },
      {
        "role": "ZL_BR_MM_PRPO_REPORTS_P09",
        "desc": "Role: ZL_BR_MM_PRPO_REPORTS_P09",
        "authObjects": [
          "M_ANFR_BSA",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG"
        ]
      }
    ]
  },
  {
    "user": "DDIC",
    "name": "DDIC",
    "userId": "DDIC",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "21-10-2020",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "QIE_INSPDO",
          "C_MPE_CER",
          "CRM_ICMCAS",
          "FPS_CDICT",
          "/UI2/UISC",
          "CRM_PS_SXP",
          "MFG_PLNR",
          "K_KEDT_TC"
        ]
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN",
        "authObjects": [
          "LCM_LT",
          "/SRMSMC/BO",
          "LCM_GEN",
          "LCM_CTX",
          "LCM_LTENSO",
          "I_IWERK",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_DHBASACT",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM",
        "authObjects": [
          "S_NUMBER",
          "S_OC_ROLE",
          "S_C_FUNCT",
          "S_IDOCMONI",
          "S_CARRID",
          "S_TABU_RFC",
          "S_IMG_GENE",
          "S_CALENDAR",
          "S_DOKU_AUT",
          "S_PATH"
        ]
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER",
        "authObjects": [
          "S_USER_GRP",
          "S_RFC",
          "S_TCODE",
          "S_DEVELOP",
          "S_START"
        ]
      }
    ]
  },
  {
    "user": "DS4_FALLBACK",
    "name": "DS4_FALLBACK",
    "userId": "DS4_FALLBACK",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "21-10-2020",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "HEC_BASIS_ADMIN_V3",
        "desc": "Role: HEC_BASIS_ADMIN_V3",
        "authObjects": [
          "S_WF_WI",
          "S_WFAR_PRI",
          "S_WFAR_KPR",
          "S_IDOCMONI",
          "COM_ASET",
          "C_CABN_GRP",
          "S_DOKU_AUT",
          "S_DX_MAIN",
          "S_WFAR_OBJ",
          "S_TWB"
        ]
      },
      {
        "role": "ZHEC_CAM_CHANGE",
        "desc": "Role: ZHEC_CAM_CHANGE",
        "authObjects": [
          "S_USER_GRP",
          "S_TABU_RFC",
          "S_USER_AGR",
          "S_RFC",
          "S_TABU_DIS",
          "S_USER_PRO",
          "S_USER_SAS",
          "S_USER_AUT",
          "S_TABU_NAM",
          "S_TCODE"
        ]
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER",
        "authObjects": [
          "S_USER_GRP",
          "S_RFC",
          "S_TCODE",
          "S_DEVELOP",
          "S_START"
        ]
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG",
        "authObjects": [
          "S_ESH_CAT"
        ]
      }
    ]
  },
  {
    "user": "EMOGG",
    "name": "Erin MOGG",
    "userId": "EMOGG",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "16-08-2021",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_FI_GL_ACCNTING",
        "desc": "Role: ZL_BR_FI_GL_ACCNTING",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "F_CC_HIER",
          "K_CSKS"
        ]
      },
      {
        "role": "ZL_BR_FI_PAY_PROCESS",
        "desc": "Role: ZL_BR_FI_PAY_PROCESS",
        "authObjects": [
          "M_ANFR_BSA",
          "F_REGU_PAY",
          "W_BETR_USR",
          "A_S_WERK",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG"
        ]
      },
      {
        "role": "ZL_BR_FI_PAY_PROPOSAL",
        "desc": "Role: ZL_BR_FI_PAY_PROPOSAL",
        "authObjects": [
          "M_ANFR_BSA",
          "F_REGU_PAY",
          "W_BETR_USR",
          "A_S_WERK",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG"
        ]
      },
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG",
          "I_AGCY_PAY"
        ]
      }
    ]
  },
  {
    "user": "FF.EWM",
    "name": "Firefighter ID for EWM - Extended Warehouse Managment",
    "userId": "FF.EWM",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "25-08-2023",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZEWM_BR_STOCK_MONITORING_LAMW",
        "desc": "Role: ZEWM_BR_STOCK_MONITORING_LAMW",
        "authObjects": [
          "/SCWM/VAS",
          "C_TCLS_BER",
          "/SCWM/WBMR",
          "/SCWM/QSUP",
          "W_BETR_USR",
          "/SCWM/TATT",
          "C_APO_PROD",
          "/SCWM/LG",
          "/SCWM/SLFU",
          "C_APO_DEF"
        ]
      },
      {
        "role": "ZEWM_BR_WH_DISPLAY_LAMW",
        "desc": "Role: ZEWM_BR_WH_DISPLAY_LAMW",
        "authObjects": [
          "M_ANFR_BSA",
          "/SCWM/QSUP",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "/SCWM/DLV2",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "/SCWM/DATC",
          "/SCWM/STBI"
        ]
      },
      {
        "role": "ZEWM_BR_INBOUND_PRCESING_LAMW",
        "desc": "Role: ZEWM_BR_INBOUND_PRCESING_LAMW",
        "authObjects": [
          "M_ANFR_BSA",
          "/SCWM/QSUP",
          "QIE_INSPDO",
          "C_LO_HU",
          "/SCWM/DLV2",
          "S_WFAR_OBJ",
          "M_EINF_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "/SCWM/DATC"
        ]
      },
      {
        "role": "ZEWM_BR_OUTBOUND_PRCESING_LAMW",
        "desc": "Role: ZEWM_BR_OUTBOUND_PRCESING_LAMW",
        "authObjects": [
          "/SCWM/VAS",
          "C_TCLS_BER",
          "QIE_INSPDO",
          "C_SHEP_TPG",
          "C_APO_PROD",
          "/SCWM/LG",
          "/SCWM/SLFU",
          "C_LIME_HU",
          "/SCWM/DLV2",
          "C_TCLS_MNT"
        ]
      }
    ]
  },
  {
    "user": "FF.FI",
    "name": "Firefighter ID for Finance",
    "userId": "FF.FI",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "25-03-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZFI_BR_AP_MGR_CAMAN_1720",
        "desc": "Role: ZFI_BR_AP_MGR_CAMAN_1720",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "F_REGU_KOA",
          "M_MATE_MAT",
          "F_KNA1_APP"
        ]
      },
      {
        "role": "ZFI_BR_AP_MGR_CAMAN_1730",
        "desc": "Role: ZFI_BR_AP_MGR_CAMAN_1730",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "F_REGU_KOA",
          "M_MATE_MAT",
          "F_KNA1_APP"
        ]
      },
      {
        "role": "ZTECH_BR_ABABPER",
        "desc": "Role: ZTECH_BR_ABABPER",
        "authObjects": [
          "S_TABU_CLI",
          "S_DATASET",
          "RLFW_SCHED",
          "S_GUI",
          "S_TRANSPRT",
          "S_APPL_LOG",
          "S_DOKU_AUT",
          "S_PROGRAM",
          "S_TABU_DIS",
          "/IWBEP/SB"
        ]
      }
    ]
  },
  {
    "user": "FF.IT",
    "name": "Ely Taleon",
    "userId": "FF.IT",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "24-10-2024",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZTECH_BR_ABABPER",
        "desc": "Role: ZTECH_BR_ABABPER",
        "authObjects": [
          "S_TABU_CLI",
          "S_DATASET",
          "RLFW_SCHED",
          "S_GUI",
          "S_TRANSPRT",
          "S_APPL_LOG",
          "S_DOKU_AUT",
          "S_PROGRAM",
          "S_TABU_DIS",
          "/IWBEP/SB"
        ]
      },
      {
        "role": "ZM:IT-SPRO_DIS_MASTR",
        "desc": "Role: ZM:IT-SPRO_DIS_MASTR",
        "authObjects": [
          "F_REMM_MN",
          "S_WFAR_OBJ",
          "K_KEB_TC",
          "K_KEDT_TC",
          "S_SCMG_CAS",
          "F_KKVARI",
          "G_GB93_",
          "B_BUPA_RLT",
          "T_STAM_GAT",
          "K_CSLA_SET"
        ]
      },
      {
        "role": "ZM:IT-POST_PROC_ORD_FF_MASTR",
        "desc": "Role: ZM:IT-POST_PROC_ORD_FF_MASTR",
        "authObjects": [
          "/SAPPO/ORD",
          "/SAPPO/FLT",
          "S_TCODE"
        ]
      }
    ]
  },
  {
    "user": "FF.IT02",
    "name": "FF IT02",
    "userId": "FF.IT02",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "24-08-2023",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZM:IT-SPRO_DIS_MASTR",
        "desc": "Role: ZM:IT-SPRO_DIS_MASTR",
        "authObjects": [
          "F_REMM_MN",
          "S_WFAR_OBJ",
          "K_KEB_TC",
          "K_KEDT_TC",
          "S_SCMG_CAS",
          "F_KKVARI",
          "G_GB93_",
          "B_BUPA_RLT",
          "T_STAM_GAT",
          "K_CSLA_SET"
        ]
      },
      {
        "role": "ZM:IT-POST_PROC_ORD_FF_MASTR",
        "desc": "Role: ZM:IT-POST_PROC_ORD_FF_MASTR",
        "authObjects": [
          "/SAPPO/ORD",
          "/SAPPO/FLT",
          "S_TCODE"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      }
    ]
  },
  {
    "user": "FF.MM",
    "name": "Firefighter ID for Materials Management",
    "userId": "FF.MM",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "05-03-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG",
          "I_AGCY_PAY"
        ]
      },
      {
        "role": "ZL_BR_CA_COSTCEN_MAN_LACCPMAN",
        "desc": "Role: ZL_BR_CA_COSTCEN_MAN_LACCPMAN",
        "authObjects": [
          "M_ANFR_BSA",
          "M_RFQ_BSA",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "F_CC_HIER",
          "K_CSKS",
          "C_PRPS_USR"
        ]
      }
    ]
  },
  {
    "user": "FF.MM02",
    "name": "FF.MM02",
    "userId": "FF.MM02",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "12-07-2024",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZTECH_BR_ABABPER",
        "desc": "Role: ZTECH_BR_ABABPER",
        "authObjects": [
          "S_TABU_CLI",
          "S_DATASET",
          "RLFW_SCHED",
          "S_GUI",
          "S_TRANSPRT",
          "S_APPL_LOG",
          "S_DOKU_AUT",
          "S_PROGRAM",
          "S_TABU_DIS",
          "/IWBEP/SB"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      },
      {
        "role": "ZL_BR_MM_INVTRY_REPORTS",
        "desc": "Role: ZL_BR_MM_INVTRY_REPORTS",
        "authObjects": [
          "W_BETR_USR",
          "M_RFQ_BSA",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "V_VTTK_SHT",
          "S_ESH_CONN"
        ]
      },
      {
        "role": "ZL_BR_MM_PR_PROCESSING",
        "desc": "Role: ZL_BR_MM_PR_PROCESSING",
        "authObjects": [
          "M_ANFR_BSA",
          "A_S_WERK",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "M_EINF_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS"
        ]
      }
    ]
  },
  {
    "user": "FF.PM",
    "name": "Firefighter ID for Plant Maintenance",
    "userId": "FF.PM",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "17-02-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG",
          "I_AGCY_PAY"
        ]
      },
      {
        "role": "ZM:IT_SAP_DVLP_ACS_DISPLAY",
        "desc": "Role: ZM:IT_SAP_DVLP_ACS_DISPLAY",
        "authObjects": [
          "S_DATASET",
          "RLFW_SCHED",
          "S_TRANSPRT",
          "S_APPL_LOG",
          "S_DOKU_AUT",
          "S_PROGRAM",
          "/IWBEP/SB",
          "S_TCODE",
          "S_DEVELOP"
        ]
      },
      {
        "role": "ZEWM_BR_EM_TASK_LAMW",
        "desc": "Role: ZEWM_BR_EM_TASK_LAMW",
        "authObjects": [
          "S_DATASET",
          "S_PPF_CUST",
          "/SAPCND/CM",
          "S_PPF_CONF",
          "/SAPCND/CO",
          "S_TABU_DIS",
          "S_TABU_NAM",
          "S_TCODE"
        ]
      }
    ]
  },
  {
    "user": "FF.PP",
    "name": "Firefighter ID for Production Planning",
    "userId": "FF.PP",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "24-08-2023",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION",
        "desc": "Role: ZL_BR_MFG_EXECUTION",
        "authObjects": [
          "C_OA_EXEC",
          "C_ROUT",
          "Q_INSPPNT",
          "W_BETR_USR",
          "C_AFRU_AWK",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "C_DRAW_TCD",
          "F_LFA1_GEN"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      },
      {
        "role": "ZL_BR_MFG_INVTRY_REPORTS",
        "desc": "Role: ZL_BR_MFG_INVTRY_REPORTS",
        "authObjects": [
          "W_BETR_USR",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "S_ESH_CONN",
          "M_BANF_EKG",
          "M_MRES_WWA",
          "M_MSEG_WWE"
        ]
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS",
        "authObjects": [
          "S_WF_WI",
          "M_ANFR_BSA",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG"
        ]
      }
    ]
  },
  {
    "user": "FF.SD",
    "name": "Firefighter ID for Sales & Distribution",
    "userId": "FF.SD",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "02-04-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG",
          "I_AGCY_PAY"
        ]
      },
      {
        "role": "ZL_BR_SD_ORDER_ISSUES",
        "desc": "Role: ZL_BR_SD_ORDER_ISSUES",
        "authObjects": [
          "C_TCLS_BER",
          "S_GOS_ATT",
          "M_BEST_EKO",
          "V_LIKP_VST",
          "C_TCLS_MNT",
          "S_PROGNAM",
          "S_WFAR_OBJ",
          "V_VBAK_AAT",
          "C_DRAW_TCD",
          "F_LFA1_GEN"
        ]
      },
      {
        "role": "ZL_BR_SD_REPORTS_COMM",
        "desc": "Role: ZL_BR_SD_REPORTS_COMM",
        "authObjects": [
          "S_RS_AUTH",
          "M_MATE_MAT",
          "M_INVVAL",
          "S_GOS_ATT",
          "V_LIKP_VST",
          "M_MSEG_WWA",
          "POC_DEFN",
          "F_KNA1_APP",
          "S_PROGNAM",
          "M_MSEG_WMB"
        ]
      }
    ]
  },
  {
    "user": "FF.TEMP",
    "name": "FireFighter Temporary",
    "userId": "FF.TEMP",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "27-01-2023",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZM:IT-SPRO_DIS_MASTR",
        "desc": "Role: ZM:IT-SPRO_DIS_MASTR",
        "authObjects": [
          "F_REMM_MN",
          "S_WFAR_OBJ",
          "K_KEB_TC",
          "K_KEDT_TC",
          "S_SCMG_CAS",
          "F_KKVARI",
          "G_GB93_",
          "B_BUPA_RLT",
          "T_STAM_GAT",
          "K_CSLA_SET"
        ]
      },
      {
        "role": "ZM:IT-POST_PROC_ORD_FF_MASTR",
        "desc": "Role: ZM:IT-POST_PROC_ORD_FF_MASTR",
        "authObjects": [
          "/SAPPO/ORD",
          "/SAPPO/FLT",
          "S_TCODE"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      }
    ]
  },
  {
    "user": "FIORIADM",
    "name": "FIORIADM",
    "userId": "FIORIADM",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-01-2021",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE",
        "authObjects": [
          "UIU_COMP",
          "F_KNA1_APP",
          "S_WFAR_OBJ",
          "PLOG",
          "F_LFA1_GEN",
          "B_BUPA_ADR",
          "B_BUPR_BZT",
          "K_CSKS",
          "V_KNA1_VKO",
          "S_USER_GRP"
        ]
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS",
        "authObjects": [
          "S_WF_WI",
          "M_ANFR_BSA",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG"
        ]
      },
      {
        "role": "SAP_ESH_BOS_ADMIN",
        "desc": "Role: SAP_ESH_BOS_ADMIN",
        "authObjects": [
          "S_WF_WI",
          "S_OC_ROLE",
          "S_C_FUNCT",
          "S_IDOCMONI",
          "S_TABU_RFC",
          "S_RFC",
          "PLOG",
          "S_USER_PRO",
          "B_ALE_LSYS",
          "S_BTCH_ADM"
        ]
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS",
        "authObjects": [
          "F_KNA1_APP",
          "B_BUPA_ATT",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_KNA1_BED",
          "B_BUPA_ADR",
          "B_BUPR_BZT",
          "V_KNA1_VKO",
          "F_LFA1_APP",
          "F_LFA1_AEN"
        ]
      }
    ]
  },
  {
    "user": "KTERN_SERVIC",
    "name": "KTern Connection",
    "userId": "KTERN_SERVIC",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-04-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES",
        "authObjects": [
          "M_ANFR_BSA",
          "A_S_WERK",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG",
          "S_PB_CHIP"
        ]
      },
      {
        "role": "ZM:IT-RFC_ADM_MASTR",
        "desc": "Role: ZM:IT-RFC_ADM_MASTR",
        "authObjects": [
          "S_BGRFC",
          "S_USER_GRP",
          "S_GUI",
          "S_USER_AGR",
          "S_RFC",
          "S_ADMI_FCD",
          "S_RFC_ADM",
          "S_USER_SAS",
          "S_USER_PRO",
          "S_TCODE"
        ]
      }
    ]
  },
  {
    "user": "NEUGENIA",
    "name": "Eugenia Najar",
    "userId": "NEUGENIA",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-11-2025",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "/ACCGO/DGR",
          "/SRMSMC/DB",
          "/SMERP/SWM",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "/MVA/6VRSA",
          "/PRA/BPMST",
          "/SRMSMC/R2",
          "/SCWM/DLV2"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_700",
        "desc": "Role: Z_UI2_ADMIN_700",
        "authObjects": [
          "S_USER_STA",
          "S_PROGNAM",
          "PLOG",
          "S_ICF_ADM",
          "S_USER_PRO",
          "S_TABU_NAM",
          "S_BTCH_ADM",
          "S_USER_VAL",
          "S_TABU_CLI",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_731",
        "desc": "Role: Z_UI2_ADMIN_731",
        "authObjects": [
          "S_USER_VAL",
          "S_BTCH_JOB",
          "S_USER_GRP",
          "S_TCODE",
          "S_GUI",
          "S_USER_STA",
          "S_TRANSPRT",
          "S_USER_AGR",
          "PLOG",
          "S_USER_SAS"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_750",
        "desc": "Role: Z_UI2_ADMIN_750",
        "authObjects": [
          "S_TABU_CLI",
          "S_TCODE",
          "S_TRANSPRT",
          "S_RFC",
          "S_START"
        ]
      }
    ]
  },
  {
    "user": "PKAREN",
    "name": "karen Ponce",
    "userId": "PKAREN",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "/ACCGO/DGR",
          "/SRMSMC/DB",
          "/SMERP/SWM",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "/MVA/6VRSA",
          "/PRA/BPMST",
          "/SRMSMC/R2",
          "/SCWM/DLV2"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_700",
        "desc": "Role: Z_UI2_ADMIN_700",
        "authObjects": [
          "S_USER_STA",
          "S_PROGNAM",
          "PLOG",
          "S_ICF_ADM",
          "S_USER_PRO",
          "S_TABU_NAM",
          "S_BTCH_ADM",
          "S_USER_VAL",
          "S_TABU_CLI",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_731",
        "desc": "Role: Z_UI2_ADMIN_731",
        "authObjects": [
          "S_USER_VAL",
          "S_BTCH_JOB",
          "S_USER_GRP",
          "S_TCODE",
          "S_GUI",
          "S_USER_STA",
          "S_TRANSPRT",
          "S_USER_AGR",
          "PLOG",
          "S_USER_SAS"
        ]
      },
      {
        "role": "Z_UI2_ADMIN_750",
        "desc": "Role: Z_UI2_ADMIN_750",
        "authObjects": [
          "S_TABU_CLI",
          "S_TCODE",
          "S_TRANSPRT",
          "S_RFC",
          "S_START"
        ]
      }
    ]
  },
  {
    "user": "RBUCHANAN",
    "name": "Regina Buchanan",
    "userId": "RBUCHANAN",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-04-2026",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZHCM_BR_PA_BP",
        "desc": "Role: ZHCM_BR_PA_BP",
        "authObjects": [
          "B_BUP_DCPA",
          "B_BUPA_ATT",
          "PLOG",
          "B_BUPA_ADR",
          "S_USER_PRO",
          "B_BUPR_BZT",
          "P_TCODE",
          "S_USER_GRP",
          "P_ORGIN",
          "/SCMB/LOCB"
        ]
      },
      {
        "role": "ZFI_BR_ALL_DISPLAY_1710",
        "desc": "Role: ZFI_BR_ALL_DISPLAY_1710",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS",
          "C_PRPS_USR",
          "M_QTN_EKG"
        ]
      },
      {
        "role": "ZFI_BR_ALL_DISPLAY_1720",
        "desc": "Role: ZFI_BR_ALL_DISPLAY_1720",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS",
          "C_PRPS_USR",
          "M_QTN_EKG"
        ]
      },
      {
        "role": "ZFI_BR_ALL_DISPLAY_1730",
        "desc": "Role: ZFI_BR_ALL_DISPLAY_1730",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS",
          "C_PRPS_USR",
          "M_QTN_EKG"
        ]
      }
    ]
  },
  {
    "user": "RFCUSER",
    "name": "RFCUSER",
    "userId": "RFCUSER",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "08-10-2024",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "/ACCGO/DGR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP",
          "C_MPE_CER",
          "CRM_ICMCAS",
          "/SCWM/DLV2",
          "FPS_CDICT"
        ]
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN",
        "authObjects": [
          "LCM_LT",
          "/SRMSMC/BO",
          "LCM_GEN",
          "LCM_CTX",
          "LCM_LTENSO",
          "I_IWERK",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_DHBASACT",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES",
        "authObjects": [
          "M_ANFR_BSA",
          "A_S_WERK",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG",
          "S_PB_CHIP"
        ]
      },
      {
        "role": "ZBASIS_BR_ADMIN",
        "desc": "Role: ZBASIS_BR_ADMIN",
        "authObjects": [
          "S_C_FUNCT",
          "S_PROGNAM",
          "S_TABU_NAM",
          "B_ALE_LSYS",
          "S_Q_GOVERN",
          "S_ABAPDUMP",
          "S_YCM",
          "S_IDOCPART",
          "S_BTCH_TMP",
          "S_TABU_CLI"
        ]
      }
    ]
  },
  {
    "user": "S4KT_ABAP",
    "name": "User ABAP",
    "userId": "S4KT_ABAP",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-12-2025",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZTECH_BR_ABABPER",
        "desc": "Role: ZTECH_BR_ABABPER",
        "authObjects": [
          "S_TABU_CLI",
          "S_DATASET",
          "RLFW_SCHED",
          "S_GUI",
          "S_TRANSPRT",
          "S_APPL_LOG",
          "S_DOKU_AUT",
          "S_PROGRAM",
          "S_TABU_DIS",
          "/IWBEP/SB"
        ]
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY",
        "authObjects": [
          "W_VKPR_PLT",
          "M_CUST_MCS",
          "A_IMPR_PRC",
          "C_APPL_SOP",
          "M_BCO_VKOR",
          "M_ISEG_WIB",
          "M_LIFO_MLY",
          "M_KONA_ORG",
          "S_WFAR_OBJ",
          "W_WTAD_IR"
        ]
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS",
        "authObjects": [
          "S_WF_WI",
          "M_ANFR_BSA",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "M_RECH_WRK",
          "F_FAGL_SEG"
        ]
      }
    ]
  },
  {
    "user": "S4KT_SD",
    "name": "SD",
    "userId": "S4KT_SD",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "20-11-2025",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_FI_AP_MGR",
        "desc": "Role: ZL_BR_FI_AP_MGR",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS",
          "C_PRPS_USR"
        ]
      },
      {
        "role": "ZL_BR_FI_AP_MGR_CAMAN",
        "desc": "Role: ZL_BR_FI_AP_MGR_CAMAN",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "/SRMSMC/BO",
          "F_REGU_KOA",
          "F_KNA1_APP"
        ]
      },
      {
        "role": "ZL_BR_FI_AP_MGR_LACCFCON",
        "desc": "Role: ZL_BR_FI_AP_MGR_LACCFCON",
        "authObjects": [
          "S_WFAR_OBJ",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "K_CSKS",
          "F_LFA1_APP",
          "S_ESH_CONN",
          "M_BANF_EKG",
          "B_BUPA_RLT",
          "M_BANF_BSA"
        ]
      },
      {
        "role": "ZL_BR_FI_AP_MGR_LACCFMAN",
        "desc": "Role: ZL_BR_FI_AP_MGR_LACCFMAN",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "/SRMSMC/BO",
          "F_REGU_KOA",
          "F_KNA1_APP"
        ]
      }
    ]
  },
  {
    "user": "SAPSUPPORT",
    "name": "SAPSUPPORT",
    "userId": "SAPSUPPORT",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "25-02-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG"
        ]
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED",
        "authObjects": [
          "F_UHC_ACT",
          "/ACCGO/DGR",
          "I_VVSO_PRG",
          "UIU_COMP",
          "F_REMOB_BR",
          "E_CACS_NSC",
          "/SCWM/QSUP",
          "A_IMPR_PRC",
          "E_LOYALACC",
          "EAML_LRP"
        ]
      },
      {
        "role": "ZFI_BR_AP_MGR_CAMAN_1720",
        "desc": "Role: ZFI_BR_AP_MGR_CAMAN_1720",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "F_REGU_KOA",
          "M_MATE_MAT",
          "F_KNA1_APP"
        ]
      },
      {
        "role": "ZFI_BR_AP_MGR_CAMAN_1730",
        "desc": "Role: ZFI_BR_AP_MGR_CAMAN_1730",
        "authObjects": [
          "K_TP_VALU",
          "M_RECH_SPG",
          "F_BNKA_BUK",
          "F_PAYRQ",
          "F_BKPF_BED",
          "F_FEBB_BUK",
          "M_BEST_EKO",
          "F_REGU_KOA",
          "M_MATE_MAT",
          "F_KNA1_APP"
        ]
      }
    ]
  },
  {
    "user": "SAP_WFRT",
    "name": "Workflow user",
    "userId": "SAP_WFRT",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-04-2026",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "QIE_INSPDO",
          "C_MPE_CER",
          "CRM_ICMCAS",
          "FPS_CDICT",
          "/UI2/UISC",
          "CRM_PS_SXP",
          "MFG_PLNR",
          "K_KEDT_TC"
        ]
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN",
        "authObjects": [
          "LCM_LT",
          "/SRMSMC/BO",
          "LCM_GEN",
          "LCM_CTX",
          "LCM_LTENSO",
          "I_IWERK",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_DHBASACT",
          "S_BTCH_JOB"
        ]
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710",
        "authObjects": [
          "S_WF_WI",
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "S_PB_CHIP",
          "C_ARPL_WRK",
          "S_ESH_CONN"
        ]
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1720",
        "desc": "Role: ZL_BR_CA_ALL_USER_1720",
        "authObjects": [
          "S_WF_WI",
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "S_PB_CHIP",
          "C_ARPL_WRK",
          "S_ESH_CONN"
        ]
      }
    ]
  },
  {
    "user": "SDMI_GJJNQXG",
    "name": "SDMI_GJJNQXG",
    "userId": "SDMI_GJJNQXG",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "QIE_INSPDO",
          "C_MPE_CER",
          "CRM_ICMCAS",
          "FPS_CDICT",
          "/UI2/UISC",
          "CRM_PS_SXP",
          "MFG_PLNR",
          "K_KEDT_TC"
        ]
      }
    ]
  },
  {
    "user": "SPC_SNOTE",
    "name": "SPC_SNOTE",
    "userId": "SPC_SNOTE",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZHEC_SNOTE_V8",
        "desc": "Role: ZHEC_SNOTE_V8",
        "authObjects": [
          "S_C_FUNCT",
          "S_TABU_RFC",
          "S_RFC",
          "S_TABU_NAM",
          "S_BTCH_ADM",
          "S_LOG_COM",
          "S_USER_VAL",
          "S_TABU_CLI",
          "S_BTCH_JOB",
          "S_BTCH_NAM"
        ]
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER",
        "authObjects": [
          "S_USER_GRP",
          "S_RFC",
          "S_TCODE",
          "S_DEVELOP",
          "S_START"
        ]
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG",
        "authObjects": [
          "S_ESH_CAT"
        ]
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER",
        "authObjects": [
          "S_ESH_CONN",
          "S_START",
          "S_ESH_CAT"
        ]
      }
    ]
  },
  {
    "user": "TC_USER",
    "name": "TC_USER",
    "userId": "TC_USER",
    "indicator": "SAP_ALL equivalent",
    "score": 98,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds SAP_ALL equivalent permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "QIE_INSPDO",
          "C_MPE_CER",
          "CRM_ICMCAS",
          "FPS_CDICT",
          "/UI2/UISC",
          "CRM_PS_SXP",
          "MFG_PLNR",
          "K_KEDT_TC"
        ]
      }
    ]
  },
  {
    "user": "TESTUSR1",
    "name": "Test Usr1",
    "userId": "TESTUSR1",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "00-00-0000",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZL_BR_FI_GL_ACCNTING",
        "desc": "Role: ZL_BR_FI_GL_ACCNTING",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "F_CC_HIER",
          "K_CSKS"
        ]
      },
      {
        "role": "ZL_BR_CA_COSTCENTER_MANAGER",
        "desc": "Role: ZL_BR_CA_COSTCENTER_MANAGER",
        "authObjects": [
          "M_ANFR_BSA",
          "M_RFQ_BSA",
          "M_MSEG_BWF",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "F_CC_HIER",
          "K_CSKS",
          "C_PRPS_USR"
        ]
      },
      {
        "role": "ZL_BR_FI_AR",
        "desc": "Role: ZL_BR_FI_AR",
        "authObjects": [
          "M_ANFR_BSA",
          "W_BETR_USR",
          "F_FUND_PST",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "F_FAGL_SEG",
          "FIAR_CLIPA"
        ]
      },
      {
        "role": "ZL_BR_FI_AR_REPORTS",
        "desc": "Role: ZL_BR_FI_AR_REPORTS",
        "authObjects": [
          "M_ANFR_BSA",
          "M_RFQ_BSA",
          "S_WFAR_OBJ",
          "M_RFQ_EKG",
          "C_DRAW_TCD",
          "F_LFA1_GEN",
          "FIAR_CLIPA",
          "K_CSKS",
          "C_PRPS_USR",
          "S_ESH_CONN"
        ]
      }
    ]
  },
  {
    "user": "VRADHAKRISHN",
    "name": "Vinoth Radhakrishnan",
    "userId": "VRADHAKRISHN",
    "indicator": "PFCG + SU01 combo",
    "score": 94,
    "severity": "Critical",
    "recommendation": "Revoke",
    "systems": [
      "LCKR-PRD-01"
    ],
    "status": "Open",
    "assignee": null,
    "lastChange": "15-04-2026",
    "rationale": "User holds PFCG + SU01 combo permissions, granting administrative control over users and authorizations.",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY",
        "authObjects": [
          "F_UHC_ACT",
          "I_VVSO_PRG",
          "UIU_COMP",
          "E_CACS_NSC",
          "E_LOYALACC",
          "A_IMPR_PRC",
          "EAML_LRP",
          "M_CUST_MCS",
          "I_ICL_SBRG",
          "I_AGCY_PAY"
        ]
      },
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE",
        "authObjects": [
          "UIU_COMP",
          "F_KNA1_APP",
          "S_WFAR_OBJ",
          "PLOG",
          "F_LFA1_GEN",
          "B_BUPA_ADR",
          "B_BUPR_BZT",
          "K_CSKS",
          "V_KNA1_VKO",
          "S_USER_GRP"
        ]
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710",
        "authObjects": [
          "C_OA_EXEC",
          "C_ROUT",
          "Q_INSPPNT",
          "W_BETR_USR",
          "C_AFRU_AWK",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "C_DRAW_TCD",
          "F_LFA1_GEN"
        ]
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1720",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1720",
        "authObjects": [
          "C_OA_EXEC",
          "C_ROUT",
          "Q_INSPPNT",
          "W_BETR_USR",
          "C_AFRU_AWK",
          "C_CABN_GRP",
          "S_WFAR_OBJ",
          "M_MSEG_BWF",
          "C_DRAW_TCD",
          "F_LFA1_GEN"
        ]
      }
    ]
  }
];

const SUPER_ADMIN_KPIS = {
  totalSuperAdmins: 32,
  critical: 32,
  rolesContributing: 10,
  systemsAffected: 1,
  deltas: {
    totalSuperAdmins: 0,
    critical: 0,
    rolesContributing: 0,
    systemsAffected: 0,
  },
};

const ROLE_CONCENTRATION = [
  {
    "role": "ZL_BR_CA_BP_DIS",
    "users": 215,
    "category": "Procurement"
  },
  {
    "role": "ZL_BR_CA_MAT_MSTR_DIS",
    "users": 213,
    "category": "Procurement"
  },
  {
    "role": "ZL_BR_CA_STOCK_DIS",
    "users": 198,
    "category": "Procurement"
  },
  {
    "role": "ZL_BR_CA_ALL_USERS",
    "users": 197,
    "category": "Procurement"
  },
  {
    "role": "ZIT_BR_ALL_EMPLOYEES",
    "users": 182,
    "category": "Procurement"
  },
  {
    "role": "ZPM_BR_NOTIF_CREATE_1720",
    "users": 174,
    "category": "Procurement"
  },
  {
    "role": "ZPM_BR_NOTIF_CREATE_1730",
    "users": 155,
    "category": "Procurement"
  },
  {
    "role": "ZMM_BR_PR_CHANGE_PRO",
    "users": 153,
    "category": "Procurement"
  },
  {
    "role": "ZMM_BR_PR_DISPLAY_PRO",
    "users": 148,
    "category": "Procurement"
  },
  {
    "role": "ZMM_BR_PO_DISPLAY_PRO",
    "users": 147,
    "category": "Procurement"
  }
];

Object.assign(window.MOCK, {
  SUPER_ADMIN_RECOMMENDATIONS, SUPER_ADMIN_ROWS, SUPER_ADMIN_KPIS, ROLE_CONCENTRATION,
});

// SOD-07 - Dual Process Control
const DUAL_PROCESSES = [
  { key: 'CV', label: 'Create Vendor',      short: 'Vendor',   area: 'Procurement' },
  { key: 'AP', label: 'Approve PO',         short: 'PO Apv',   area: 'Procurement' },
  { key: 'GR', label: 'Goods Receipt',      short: 'GR',       area: 'Procurement' },
  { key: 'IV', label: 'Invoice Verify',     short: 'IV',       area: 'Procurement' },
  { key: 'PM', label: 'Approve Payment',    short: 'Payment',  area: 'Finance' },
  { key: 'SO', label: 'Create Sales Order', short: 'Sales',    area: 'OTC' },
  { key: 'BL', label: 'Create Billing',     short: 'Billing',  area: 'OTC' },
  { key: 'GL', label: 'GL Posting',         short: 'GL Post',  area: 'Finance' }
];

const CONFLICT_MATRIX = {
  "CV": {
    "AP": 0,
    "GR": 0,
    "IV": 0,
    "PM": 0,
    "SO": 0,
    "BL": 0,
    "GL": 0
  },
  "AP": {
    "GR": 5,
    "IV": 1,
    "PM": 1,
    "SO": 0,
    "BL": 0,
    "GL": 1
  },
  "GR": {
    "IV": 9,
    "PM": 3,
    "SO": 5,
    "BL": 6,
    "GL": 6
  },
  "IV": {
    "PM": 1,
    "SO": 2,
    "BL": 3,
    "GL": 4
  },
  "PM": {
    "SO": 0,
    "BL": 0,
    "GL": 1
  },
  "SO": {
    "BL": 8,
    "GL": 2
  },
  "BL": {
    "GL": 2
  }
};
const DUAL_PROCESS_ROWS = [
  {
    "id": "DP-3001",
    "user": "AMBER.DUNBAR",
    "name": "Amber Dunbar",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA01",
      "VA02",
      "VF01",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA01",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF01",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3002",
    "user": "DAVID.SUNG",
    "name": "David Sung",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA02",
      "VF01"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA02",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF01",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3003",
    "user": "EELLIOTT",
    "name": "Ellen Elliott",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3004",
    "user": "HCAMPBELL",
    "name": "Hamish Campbell",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA01",
      "VA02",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA01",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF02",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3005",
    "user": "HCLEMENT",
    "name": "Hannah Clement",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3006",
    "user": "HOANG.NGUYEN",
    "name": "Hoang Nguyen",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3007",
    "user": "HOANG.NGUYEN",
    "name": "Hoang Nguyen",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA02",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA02",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF02",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3008",
    "user": "JAE.KANG",
    "name": "Jae Kang",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3009",
    "user": "NRODRIGUEZ",
    "name": "Namgoon Rodriguez",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA01",
      "VA02",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA01",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF02",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3010",
    "user": "PVALENCIA",
    "name": "Valencia Patricia",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA01",
      "VA02",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA01",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF02",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3011",
    "user": "RUTGER.DUKES",
    "name": "Rutger Dukes",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA01",
      "VA02",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA01",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF02",
        "doc": "Activity in BL"
      }
    ]
  },
  {
    "id": "DP-3012",
    "user": "SBORDELON",
    "name": "Shelly Bordelon",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3013",
    "user": "SBRYAN",
    "name": "Stephanie Brown Bryan",
    "p1": "AP",
    "p2": "IV",
    "tcodes": [
      "ME28",
      "ME29N",
      "MIRO"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "ME28",
        "doc": "Activity in AP"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3014",
    "user": "SBRYAN",
    "name": "Stephanie Brown Bryan",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3015",
    "user": "SBRYAN",
    "name": "Stephanie Brown Bryan",
    "p1": "GL",
    "p2": "PM",
    "tcodes": [
      "FB01",
      "FB50",
      "F110"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "FB01",
        "doc": "Activity in GL"
      },
      {
        "date": "2026-05-19",
        "tcode": "F110",
        "doc": "Activity in PM"
      }
    ]
  },
  {
    "id": "DP-3016",
    "user": "SONJA.WRIGHT",
    "name": "Sonja Wright",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3017",
    "user": "SUNIL.SAHAI",
    "name": "Sunil Sahai",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3018",
    "user": "VMEHTA",
    "name": "Vinay Mehta",
    "p1": "GR",
    "p2": "IV",
    "tcodes": [
      "MIGO",
      "MIRO"
    ],
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "MIGO",
        "doc": "Activity in GR"
      },
      {
        "date": "2026-05-19",
        "tcode": "MIRO",
        "doc": "Activity in IV"
      }
    ]
  },
  {
    "id": "DP-3019",
    "user": "WBERRYMAN",
    "name": "Wendy Berryman",
    "p1": "SO",
    "p2": "BL",
    "tcodes": [
      "VA02",
      "VF01",
      "VF02"
    ],
    "severity": "Critical",
    "status": "Open",
    "assignee": null,
    "execHistory": [
      {
        "date": "2026-05-18",
        "tcode": "VA02",
        "doc": "Activity in SO"
      },
      {
        "date": "2026-05-19",
        "tcode": "VF01",
        "doc": "Activity in BL"
      }
    ]
  }
];

const DUAL_PROCESS_KPIS = {
  total: 19,
  critical: 18,
  high: 19,
  uniqueUsers: 35,
  processAreas: 5,
  deltas: {
    total: 0,
    critical: 0,
    high: 0,
    uniqueUsers: 0,
    processAreas: 0,
  },
};

Object.assign(window.MOCK, {
  DUAL_PROCESSES, CONFLICT_MATRIX, DUAL_PROCESS_ROWS, DUAL_PROCESS_KPIS,
});

// SOD-08 - Emergency Access
const FIREFIGHTER_TIMELINE_START = '2026-03-01';
const FIREFIGHTER_TIMELINE_END   = '2026-05-22';
const APPROVAL_STATUSES = ['Approved', 'Pending', 'Missing'];
const EMERGENCY_ACCESS_ROWS = [
  {
    "id": "EA-FF-1",
    "user": "FF.BASIS",
    "name": "Firefighter ID for Basis Administration",
    "ffId": "FF.BASIS",
    "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
    "start": "2026-04-01",
    "end": "02-10-2025",
    "usage": 10,
    "approval": "Missing",
    "anomalyFlag": false,
    "anomalyReason": "",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "02-10-2025 15:27:46",
        "tcode": "SAPMSYST",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-2",
    "user": "FF.EWM",
    "name": "Firefighter ID for EWM - Extended Warehouse Managment",
    "ffId": "FF.EWM",
    "role": "ZEWM_BR_STOCK_MONITORING_LAMW",
    "start": "2026-04-01",
    "end": "25-08-2023",
    "usage": 152,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "25-08-2023 06:17:18",
        "tcode": "/SCWM/TODLV_T",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-3",
    "user": "FF.FI",
    "name": "Firefighter ID for Finance",
    "ffId": "FF.FI",
    "role": "ZM:IT_SAP_ALL_RESTRICTED",
    "start": "2026-04-01",
    "end": "25-03-2026",
    "usage": 46,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "25-03-2026 13:13:22",
        "tcode": "SAPMSYST",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-4",
    "user": "FF.IT",
    "name": "Ely Taleon",
    "ffId": "FF.IT",
    "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
    "start": "2026-04-01",
    "end": "24-10-2024",
    "usage": 20395,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "24-10-2024 10:58:59",
        "tcode": "S_ALR_87009106",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-5",
    "user": "FF.IT02",
    "name": "FF IT02",
    "ffId": "FF.IT02",
    "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
    "start": "2026-04-01",
    "end": "24-08-2023",
    "usage": 20377,
    "approval": "Missing",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "24-08-2023 11:13:43",
        "tcode": "S_ALR_87009106",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-6",
    "user": "FF.MM",
    "name": "Firefighter ID for Materials Management",
    "ffId": "FF.MM",
    "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
    "start": "2026-04-01",
    "end": "05-03-2026",
    "usage": 10,
    "approval": "Approved",
    "anomalyFlag": false,
    "anomalyReason": "",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "05-03-2026 12:28:33",
        "tcode": "SAPMSYST",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-7",
    "user": "FF.MM02",
    "name": "FF.MM02",
    "ffId": "FF.MM02",
    "role": "ZTECH_BR_ABABPER",
    "start": "2026-04-01",
    "end": "12-07-2024",
    "usage": 141,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "12-07-2024 03:48:25",
        "tcode": "SCMA",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-8",
    "user": "FF.PM",
    "name": "Firefighter ID for Plant Maintenance",
    "ffId": "FF.PM",
    "role": "ZM:IT_SAP_ALL_RESTRICTED",
    "start": "2026-04-01",
    "end": "17-02-2026",
    "usage": 13,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "17-02-2026 14:23:45",
        "tcode": "SAPMSYST",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-9",
    "user": "FF.PP",
    "name": "Firefighter ID for Production Planning",
    "ffId": "FF.PP",
    "role": "ZL_BR_MFG_EXECUTION",
    "start": "2026-04-01",
    "end": "24-08-2023",
    "usage": 163,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "24-08-2023 14:05:21",
        "tcode": "CKMATSEL",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-10",
    "user": "FF.SD",
    "name": "Firefighter ID for Sales & Distribution",
    "ffId": "FF.SD",
    "role": "ZM:IT_SAP_ALL_RESTRICTED",
    "start": "2026-04-01",
    "end": "02-04-2026",
    "usage": 37,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "02-04-2026 10:59:02",
        "tcode": "SAPMSYST",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-11",
    "user": "FF.TEMP",
    "name": "FireFighter Temporary",
    "ffId": "FF.TEMP",
    "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
    "start": "2026-04-01",
    "end": "27-01-2023",
    "usage": 20377,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "27-01-2023 14:41:32",
        "tcode": "S_ALR_87009106",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-12",
    "user": "JEFF.DOZART",
    "name": "Jeff Dozart",
    "ffId": "JEFF.DOZART",
    "role": "ZPM_BR_MORD_PROCESS_1710",
    "start": "2026-04-01",
    "end": "15-04-2026",
    "usage": 17,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "15-04-2026 00:00:00",
        "tcode": "SAPLMR1M",
        "desc": "Transaction executed"
      }
    ]
  },
  {
    "id": "EA-FF-13",
    "user": "LSCHIFFMAN",
    "name": "Lauren Schiffman",
    "ffId": "LSCHIFFMAN",
    "role": "ZL_BR_CA_ALL_USER_1710",
    "start": "2026-04-01",
    "end": "00-00-0000",
    "usage": 19,
    "approval": "Approved",
    "anomalyFlag": true,
    "anomalyReason": "High transaction usage detected",
    "recommendation": "Review firefighting session logs",
    "status": "Open",
    "assignee": null,
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "tcode": "/IWFND/TRACES",
        "desc": "Transaction executed"
      }
    ]
  }
];

const EMERGENCY_ACCESS_KPIS = {
  totalUsers: 13,
  unapprovedAccess: 2,
  prolongedAssignments: 0,
  anomalyFlags: 11,
  deltas: {
    totalUsers: 0,
    unapprovedAccess: 0,
    prolongedAssignments: 0,
    anomalyFlags: 0,
  },
};

Object.assign(window.MOCK, {
  FIREFIGHTER_TIMELINE_START, FIREFIGHTER_TIMELINE_END,
  APPROVAL_STATUSES, EMERGENCY_ACCESS_ROWS, EMERGENCY_ACCESS_KPIS,
});

// SOD-09 - OTC Control
const OTC_STEPS = [
  { key: 'order',     label: 'Order Entry',  short: 'Order',    tcodes: ['VA01', 'VA02'],         icon: 'plus' },
  { key: 'delivery',  label: 'Delivery',     short: 'Delivery', tcodes: ['VL01N', 'VL02N'],       icon: 'arrow' },
  { key: 'billing',   label: 'Billing',      short: 'Billing',  tcodes: ['VF01', 'VF02', 'VF04'], icon: 'file' },
  { key: 'collection',label: 'Collection',   short: 'Cash App', tcodes: ['F-28', 'FB05', 'FBL5N'],icon: 'check' },
];
const OTC_ROWS = [
  {
    "id": "OTC-501",
    "user": "AMBER.DUNBAR",
    "name": "Amber Dunbar",
    "steps": [
      "order",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VF01"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-502",
    "user": "DAVID.SUNG",
    "name": "David Sung",
    "steps": [
      "order",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VF01"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-503",
    "user": "HCAMPBELL",
    "name": "Hamish Campbell",
    "steps": [
      "order",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VF01"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-504",
    "user": "HOANG.NGUYEN",
    "name": "Hoang Nguyen",
    "steps": [
      "order",
      "billing",
      "collection"
    ],
    "tcodes": [
      "VA01",
      "VF01",
      "F-28"
    ],
    "exposure": "High",
    "amount": 600000,
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "F-28",
        "doc": "OTC step activity for F-28"
      }
    ]
  },
  {
    "id": "OTC-505",
    "user": "JAE.KANG",
    "name": "Jae Kang",
    "steps": [
      "order",
      "delivery",
      "collection"
    ],
    "tcodes": [
      "VA01",
      "VL01N",
      "F-28"
    ],
    "exposure": "High",
    "amount": 600000,
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "F-28",
        "doc": "OTC step activity for F-28"
      }
    ]
  },
  {
    "id": "OTC-506",
    "user": "JOHN.RIVAS",
    "name": "John Rivas",
    "steps": [
      "delivery",
      "billing"
    ],
    "tcodes": [
      "VL01N",
      "VF01"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-507",
    "user": "NRODRIGUEZ",
    "name": "Namgoon Rodriguez",
    "steps": [
      "order",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VF01"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-508",
    "user": "PVALENCIA",
    "name": "Valencia Patricia",
    "steps": [
      "order",
      "delivery",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VL01N",
      "VF01"
    ],
    "exposure": "High",
    "amount": 600000,
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-509",
    "user": "RUTGER.DUKES",
    "name": "Rutger Dukes",
    "steps": [
      "order",
      "delivery",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VL01N",
      "VF01"
    ],
    "exposure": "High",
    "amount": 600000,
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  },
  {
    "id": "OTC-510",
    "user": "S4KT_SD",
    "name": "SD",
    "steps": [
      "order",
      "delivery"
    ],
    "tcodes": [
      "VA01",
      "VL01N"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      }
    ]
  },
  {
    "id": "OTC-511",
    "user": "SBRYAN",
    "name": "Stephanie Brown Bryan",
    "steps": [
      "delivery",
      "collection"
    ],
    "tcodes": [
      "VL01N",
      "F-28"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "F-28",
        "doc": "OTC step activity for F-28"
      }
    ]
  },
  {
    "id": "OTC-512",
    "user": "VRADHAKRISHN",
    "name": "Vinoth Radhakrishnan",
    "steps": [
      "billing",
      "collection"
    ],
    "tcodes": [
      "VF01",
      "F-28"
    ],
    "exposure": "Medium",
    "amount": 400000,
    "severity": "Medium",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "F-28",
        "doc": "OTC step activity for F-28"
      }
    ]
  },
  {
    "id": "OTC-513",
    "user": "WBERRYMAN",
    "name": "Wendy Berryman",
    "steps": [
      "order",
      "delivery",
      "billing"
    ],
    "tcodes": [
      "VA01",
      "VL01N",
      "VF01"
    ],
    "exposure": "High",
    "amount": 600000,
    "severity": "High",
    "status": "Open",
    "assignee": null,
    "recommendation": "Split SD billing authority and segregate collection duties",
    "transactions": [
      {
        "date": "2026-05-18 10:00",
        "tcode": "VA01",
        "doc": "OTC step activity for VA01"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VL01N",
        "doc": "OTC step activity for VL01N"
      },
      {
        "date": "2026-05-18 10:00",
        "tcode": "VF01",
        "doc": "OTC step activity for VF01"
      }
    ]
  }
];
const OTC_KPIS = {
  "totalViolators": 13,
  "fullCycleControllers": 0,
  "partialControllers": 13,
  "deltas": {
    "totalViolators": 0,
    "fullCycleControllers": 0,
    "partialControllers": 0
  }
};

Object.assign(window.MOCK, {
  OTC_STEPS, OTC_ROWS, OTC_KPIS,
});

// SOD-10 - High-Risk Service Accounts
const SERVICE_ACCOUNT_TYPES = ['Service', 'Background', 'Integration'];
const PRIVILEGE_LEVELS = ['Critical', 'High', 'Medium', 'Low'];
const INACTIVITY_OPTIONS = ['Inactive', 'Active'];
const SERVICE_ACCOUNTS = [
  {
    "id": "SA-1",
    "account": "AARON.SMITH",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_PM_PURCHASING",
        "desc": "Role: ZL_BR_PM_PURCHASING"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_PM_DISPLAY",
        "desc": "Role: ZL_BR_PM_DISPLAY"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-2",
    "account": "ACHANDERS",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "22-12-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "22-12-2021 11:01:07",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-3",
    "account": "ACOURVILLE",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "18-12-2023",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZMM_BR_PO_DISPLAY_HR",
        "desc": "Role: ZMM_BR_PO_DISPLAY_HR"
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS_WHRMAN",
        "desc": "Role: ZL_BR_CA_ALL_USERS_WHRMAN"
      }
    ],
    "log": [
      {
        "date": "18-12-2023 14:53:09",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-4",
    "account": "ADAPTER.Q",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "09-12-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_CA_STOCK_DIS",
        "desc": "Role: ZL_BR_CA_STOCK_DIS"
      }
    ],
    "log": [
      {
        "date": "09-12-2020 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-5",
    "account": "ADS_AGENT",
    "type": "System",
    "privilege": "High",
    "lastActivity": "13-10-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_BC_FPADS_ICF",
        "desc": "Role: SAP_BC_FPADS_ICF"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      }
    ],
    "log": [
      {
        "date": "13-10-2022 05:57:23",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-6",
    "account": "AIVANOV",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "06-10-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1720",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1720"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1730",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1730"
      }
    ],
    "log": [
      {
        "date": "06-10-2022 17:13:55",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-7",
    "account": "ALLA.VOTH",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "03-01-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZIT_BR_PURCHASE",
        "desc": "Role: ZIT_BR_PURCHASE"
      },
      {
        "role": "ZMM_BR_PO_PROCESSING_DR",
        "desc": "Role: ZMM_BR_PO_PROCESSING_DR"
      },
      {
        "role": "ZMM_BR_INVENTORY_REP_DR",
        "desc": "Role: ZMM_BR_INVENTORY_REP_DR"
      }
    ],
    "log": [
      {
        "date": "03-01-2025 10:47:09",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-8",
    "account": "ANDRE.BORNE",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "23-06-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_COSTCEN_MAN_LABMAN",
        "desc": "Role: ZL_BR_CA_COSTCEN_MAN_LABMAN"
      },
      {
        "role": "ZL_BR_MFG_INVTRY_REPORT_LABMAN",
        "desc": "Role: ZL_BR_MFG_INVTRY_REPORT_LABMAN"
      },
      {
        "role": "ZL_BR_MM_PRPO_REPORTS_LABMAN",
        "desc": "Role: ZL_BR_MM_PRPO_REPORTS_LABMAN"
      }
    ],
    "log": [
      {
        "date": "23-06-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-9",
    "account": "BATCH_USER",
    "type": "System",
    "privilege": "Critical",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED_FF",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED_FF"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-10",
    "account": "BGRFC_SUPER",
    "type": "System",
    "privilege": "High",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 15:10:57",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-11",
    "account": "BTCUSER",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "ZEWM_BR_INBOUND_PRCESING_LAMW",
        "desc": "Role: ZEWM_BR_INBOUND_PRCESING_LAMW"
      },
      {
        "role": "ZEWM_BR_WH_INTERNAL_LAMW",
        "desc": "Role: ZEWM_BR_WH_INTERNAL_LAMW"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-12",
    "account": "BYEONGMOON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "11-10-2023",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_MORD_PROCESS_1710",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1710"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1720",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1720"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1730",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1730"
      }
    ],
    "log": [
      {
        "date": "11-10-2023 07:10:30",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-13",
    "account": "CAM_CHANGE",
    "type": "System",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      },
      {
        "role": "ZHEC_CAM_CHANGE",
        "desc": "Role: ZHEC_CAM_CHANGE"
      },
      {
        "role": "ZHEC_CAM_CHANGE_V1",
        "desc": "Role: ZHEC_CAM_CHANGE_V1"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 22:25:03",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-14",
    "account": "CAM_FALLBACK",
    "type": "System",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 02:54:18",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-15",
    "account": "CBONOT",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZINV_EWM_SPCC_ROLE",
        "desc": "Role: ZINV_EWM_SPCC_ROLE"
      },
      {
        "role": "ZINV_ECC_CBO_NOTIF_USER_2309",
        "desc": "Role: ZINV_ECC_CBO_NOTIF_USER_2309"
      },
      {
        "role": "ZINV_MIM_NWG_END_USER_R2212",
        "desc": "Role: ZINV_MIM_NWG_END_USER_R2212"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 09:05:37",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-16",
    "account": "CLANKA",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "11-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "11-10-2021 03:58:16",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-17",
    "account": "CUST_TC",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "20-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE"
      },
      {
        "role": "ZHEC_CUST_TC_V7",
        "desc": "Role: ZHEC_CUST_TC_V7"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "20-10-2020 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-18",
    "account": "CVANKADARA",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "26-10-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "26-10-2022 12:42:13",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-19",
    "account": "DANIEL.LEE",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "20-01-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_SD_REPORTS",
        "desc": "Role: ZL_BR_SD_REPORTS"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION",
        "desc": "Role: ZL_BR_MFG_EXECUTION"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "20-01-2022 15:39:51",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-20",
    "account": "DDIC",
    "type": "Service",
    "privilege": "Critical",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL"
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 22:25:05",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-21",
    "account": "DELAY_LOGON",
    "type": "Service",
    "privilege": "Medium",
    "lastActivity": "04-05-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [],
    "log": [
      {
        "date": "04-05-2021 15:14:20",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-22",
    "account": "DS4_ADMIN",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "11-11-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "11-11-2020 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-23",
    "account": "DS4_FALLBACK",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "HEC_BASIS_ADMIN_V3",
        "desc": "Role: HEC_BASIS_ADMIN_V3"
      },
      {
        "role": "ZHEC_CAM_CHANGE",
        "desc": "Role: ZHEC_CAM_CHANGE"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 02:54:18",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-24",
    "account": "DSATTLAPALLY",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "23-02-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT_SAP_DVLP_ACS_DISPLAY",
        "desc": "Role: ZM:IT_SAP_DVLP_ACS_DISPLAY"
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "23-02-2022 06:54:04",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-25",
    "account": "DTHIBODEAUX",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "03-05-2023",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_PM_NOTIFICATIONS_MP",
        "desc": "Role: ZL_BR_PM_NOTIFICATIONS_MP"
      }
    ],
    "log": [
      {
        "date": "03-05-2023 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-26",
    "account": "EBARBOSA",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "17-08-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_MM_INVTRY_REPORTS",
        "desc": "Role: ZL_BR_MM_INVTRY_REPORTS"
      }
    ],
    "log": [
      {
        "date": "17-08-2022 11:48:26",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-27",
    "account": "EDMOND.WONG",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "09-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_AR_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_AR_REPORTS_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GEN_FINANCE_WLTAX",
        "desc": "Role: ZL_BR_FI_GEN_FINANCE_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GL_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_GL_REPORTS_WLTAX"
      }
    ],
    "log": [
      {
        "date": "09-03-2022 13:25:22",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-28",
    "account": "EIVANOV",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "23-04-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_MORD_PROCESS_1710",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1710"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1720",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1720"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1730",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1730"
      }
    ],
    "log": [
      {
        "date": "23-04-2022 08:18:23",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-29",
    "account": "ETRAXLER",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "14-02-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_MORD_PROCESS_1710",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1710"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1720",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1720"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1730",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1730"
      }
    ],
    "log": [
      {
        "date": "14-02-2025 13:41:42",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-30",
    "account": "FIORIADM",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "15-01-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "SAP_ESH_BOS_ADMIN",
        "desc": "Role: SAP_ESH_BOS_ADMIN"
      }
    ],
    "log": [
      {
        "date": "15-01-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-31",
    "account": "FIORI_BATCH",
    "type": "System",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-32",
    "account": "FIORI_EX",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "23-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "Z_BR_AP_ACCOUNTANT",
        "desc": "Role: Z_BR_AP_ACCOUNTANT"
      },
      {
        "role": "Z_BR_AR_ACCOUNTANT",
        "desc": "Role: Z_BR_AR_ACCOUNTANT"
      },
      {
        "role": "Z_BR_CMMFDOF_TRADER",
        "desc": "Role: Z_BR_CMMFDOF_TRADER"
      }
    ],
    "log": [
      {
        "date": "23-10-2020 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-33",
    "account": "FUAD.SALEH",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "19-01-2024",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1730",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1730"
      },
      {
        "role": "ZL_BR_MFG_CAPEX_PL1730",
        "desc": "Role: ZL_BR_MFG_CAPEX_PL1730"
      }
    ],
    "log": [
      {
        "date": "19-01-2024 15:22:17",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-34",
    "account": "GDUTTA",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "30-04-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "30-04-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-35",
    "account": "GGOLLAPUDI",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "30-09-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "30-09-2021 13:43:28",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-36",
    "account": "GPAERLA",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "03-11-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "03-11-2021 13:01:47",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-37",
    "account": "HARISHANKERT",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "12-11-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_SD_REPORTS_COMM",
        "desc": "Role: ZL_BR_SD_REPORTS_COMM"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "12-11-2021 11:55:54",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-38",
    "account": "HBRANDON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1720",
        "desc": "Role: ZL_BR_CA_ALL_USER_1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1730",
        "desc": "Role: ZL_BR_CA_ALL_USER_1730"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-39",
    "account": "IAGCONNECT",
    "type": "System",
    "privilege": "High",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES"
      },
      {
        "role": "ZBASIS_BR_ADMIN",
        "desc": "Role: ZBASIS_BR_ADMIN"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 12:45:14",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-40",
    "account": "IT.CAPTURE",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": false,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_IT_CAPTURE",
        "desc": "Role: ZL_BR_IT_CAPTURE"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 15:14:13",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-41",
    "account": "ITCAPTURE",
    "type": "Service",
    "privilege": "Medium",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [],
    "log": [
      {
        "date": "15-04-2026 15:15:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-42",
    "account": "ITELL",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "11-05-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_CA_STOCK_DIS",
        "desc": "Role: ZL_BR_CA_STOCK_DIS"
      }
    ],
    "log": [
      {
        "date": "11-05-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-43",
    "account": "ITELLVPN",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "03-02-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": false,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_CA_STOCK_DIS",
        "desc": "Role: ZL_BR_CA_STOCK_DIS"
      }
    ],
    "log": [
      {
        "date": "03-02-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-44",
    "account": "JAKE.NIXON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "27-04-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      },
      {
        "role": "ZL_BR_PM_DISPLAY_PMCONTR",
        "desc": "Role: ZL_BR_PM_DISPLAY_PMCONTR"
      },
      {
        "role": "ZL_BR_PM_MNTNCE_OPS_PMCONTR",
        "desc": "Role: ZL_BR_PM_MNTNCE_OPS_PMCONTR"
      }
    ],
    "log": [
      {
        "date": "27-04-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-45",
    "account": "JAYARAMIV",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "16-11-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_CA_STOCK_DIS",
        "desc": "Role: ZL_BR_CA_STOCK_DIS"
      }
    ],
    "log": [
      {
        "date": "16-11-2020 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-46",
    "account": "JINKEUN.JANG",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "09-02-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1730",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1730"
      },
      {
        "role": "ZL_BR_MFG_CAPEX_PL1710",
        "desc": "Role: ZL_BR_MFG_CAPEX_PL1710"
      }
    ],
    "log": [
      {
        "date": "09-02-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-47",
    "account": "JJOHNSON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "06-05-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_AP_MGR_AM",
        "desc": "Role: ZL_BR_FI_AP_MGR_AM"
      },
      {
        "role": "ZL_BR_FI_GL_ACCNTING_AM",
        "desc": "Role: ZL_BR_FI_GL_ACCNTING_AM"
      },
      {
        "role": "ZL_BR_FI_PAY_PROPOSAL_AM",
        "desc": "Role: ZL_BR_FI_PAY_PROPOSAL_AM"
      }
    ],
    "log": [
      {
        "date": "06-05-2022 13:28:39",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-48",
    "account": "JLINK",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "19-11-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "19-11-2021 12:34:47",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-49",
    "account": "JOHN.LEVINE",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1720",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1720"
      },
      {
        "role": "ZL_BR_MFG_INVTRY_REPORT_PL1720",
        "desc": "Role: ZL_BR_MFG_INVTRY_REPORT_PL1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-50",
    "account": "JQUINTANA",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "10-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "10-03-2022 12:55:53",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-51",
    "account": "JWILLIAMS",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1730",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1730"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-52",
    "account": "KECKHARDT",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "06-07-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "06-07-2021 19:51:54",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-53",
    "account": "KPATTERSON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "25-06-2024",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_INVTRY_REP_1720_P03",
        "desc": "Role: ZL_BR_MFG_INVTRY_REP_1720_P03"
      },
      {
        "role": "ZL_BR_MFG_INVTRY_REP_1730_P03",
        "desc": "Role: ZL_BR_MFG_INVTRY_REP_1730_P03"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710"
      }
    ],
    "log": [
      {
        "date": "25-06-2024 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-54",
    "account": "KTERN_SERVIC",
    "type": "Communication Data",
    "privilege": "Critical",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED"
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-55",
    "account": "LACC.CLD1.BO",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "03-11-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "03-11-2025 13:38:27",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-56",
    "account": "LACC.CLD1.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "29-03-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "29-03-2026 15:38:08",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-57",
    "account": "LACC.CLD2.BO",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "03-11-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "03-11-2025 12:49:52",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-58",
    "account": "LACC.CLD2.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "27-02-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "27-02-2026 06:26:01",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-59",
    "account": "LACC.HOT1.BO",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "08-02-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "08-02-2026 23:58:23",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-60",
    "account": "LACC.HOT1.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "23-12-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "23-12-2025 05:06:19",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-61",
    "account": "LACC.HOT2.BO",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "20-03-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "20-03-2026 09:01:08",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-62",
    "account": "LACC.HOT2.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "18-01-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "18-01-2026 17:18:18",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-63",
    "account": "LACC.SFT.SUP",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "12-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "12-04-2026 13:31:45",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-64",
    "account": "LACC.UT.BO",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "14-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "14-04-2026 17:26:01",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-65",
    "account": "LACC.UT1.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "18-07-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "18-07-2025 11:15:05",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-66",
    "account": "LACC.UT2.OS",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "18-07-2025",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "18-07-2025 11:18:59",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-67",
    "account": "LACC.WST.REQ",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_NOTIF_CREATE_1720",
        "desc": "Role: ZPM_BR_NOTIF_CREATE_1720"
      },
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-68",
    "account": "LSCHIFFMAN",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1720",
        "desc": "Role: ZL_BR_CA_ALL_USER_1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1730",
        "desc": "Role: ZL_BR_CA_ALL_USER_1730"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-69",
    "account": "MARK.KANG",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "11-10-2023",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_SD_ORDER_ISSUES_SO1710",
        "desc": "Role: ZL_BR_SD_ORDER_ISSUES_SO1710"
      },
      {
        "role": "ZL_BR_SD_ORDER_ISSUES_SO1720",
        "desc": "Role: ZL_BR_SD_ORDER_ISSUES_SO1720"
      },
      {
        "role": "ZL_BR_SD_REPORTS_COMM_SO1710",
        "desc": "Role: ZL_BR_SD_REPORTS_COMM_SO1710"
      }
    ],
    "log": [
      {
        "date": "11-10-2023 15:42:13",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-70",
    "account": "MPICOU",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_MORD_PROCESS_1710",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1710"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1720",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1720"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1730",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1730"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-71",
    "account": "MRAJAGOPAL",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-72",
    "account": "NKANDI",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "15-09-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "15-09-2021 10:58:43",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-73",
    "account": "NTT.TESTING",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "29-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "29-10-2021 21:16:42",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-74",
    "account": "OESADMIN",
    "type": "System",
    "privilege": "High",
    "lastActivity": "19-11-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "19-11-2022 23:26:56",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-75",
    "account": "OOGUNBANWO",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "19-10-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_EMPLOYEE",
        "desc": "Role: ZL_BR_EMPLOYEE"
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "19-10-2022 10:19:46",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-76",
    "account": "OWEIDGENANT",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "02-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "02-03-2022 14:41:03",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-77",
    "account": "PCHINNOLLA",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "11-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "11-10-2021 09:42:16",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-78",
    "account": "PMALLAMPATI",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "08-06-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "08-06-2021 04:54:17",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-79",
    "account": "PSULLIVAN",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "29-08-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "29-08-2022 11:59:25",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-80",
    "account": "PTHORNTON",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "25-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_AP_MGR_CC1720",
        "desc": "Role: ZL_BR_FI_AP_MGR_CC1720"
      },
      {
        "role": "ZL_BR_FI_GL_ACCNTING_CC1720",
        "desc": "Role: ZL_BR_FI_GL_ACCNTING_CC1720"
      },
      {
        "role": "ZL_BR_FI_PAY_PROCESS_CC1720",
        "desc": "Role: ZL_BR_FI_PAY_PROCESS_CC1720"
      }
    ],
    "log": [
      {
        "date": "25-03-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-81",
    "account": "PTRAHAN",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "18-07-2023",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1730",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1730"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1720",
        "desc": "Role: ZL_BR_CA_ALL_USER_1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "18-07-2023 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-82",
    "account": "RFCUSER",
    "type": "Service",
    "privilege": "Critical",
    "lastActivity": "08-10-2024",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL"
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "ZIT_BR_ALL_EMPLOYEES",
        "desc": "Role: ZIT_BR_ALL_EMPLOYEES"
      }
    ],
    "log": [
      {
        "date": "08-10-2024 09:20:28",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-83",
    "account": "RMULPURI",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "14-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "14-10-2021 16:01:50",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-84",
    "account": "RPRITZKAU",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-85",
    "account": "RWALDROUP",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "16-09-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1720",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1720"
      },
      {
        "role": "ZL_BR_MFG_INVTRY_REPORT_PL1720",
        "desc": "Role: ZL_BR_MFG_INVTRY_REPORT_PL1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      }
    ],
    "log": [
      {
        "date": "16-09-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-86",
    "account": "SACADMIN",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "23-01-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BW_ANALYTICS",
        "desc": "Role: ZL_BW_ANALYTICS"
      },
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      }
    ],
    "log": [
      {
        "date": "23-01-2022 18:00:03",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-87",
    "account": "SADAMS",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "08-04-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_SD_ORDER_ISSUES_SO1710",
        "desc": "Role: ZL_BR_SD_ORDER_ISSUES_SO1710"
      },
      {
        "role": "ZL_BR_SD_ORDER_ISSUES_SO1720",
        "desc": "Role: ZL_BR_SD_ORDER_ISSUES_SO1720"
      },
      {
        "role": "ZL_BR_SD_REPORTS_COMM_SO1710",
        "desc": "Role: ZL_BR_SD_REPORTS_COMM_SO1710"
      }
    ],
    "log": [
      {
        "date": "08-04-2022 17:39:22",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-88",
    "account": "SAP*",
    "type": "",
    "privilege": "High",
    "lastActivity": "2026-05-19",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-89",
    "account": "SAPSUPPORT",
    "type": "Service",
    "privilege": "Critical",
    "lastActivity": "25-02-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZM:IT_SAP_ALL_RESTRICTED",
        "desc": "Role: ZM:IT_SAP_ALL_RESTRICTED"
      },
      {
        "role": "ZFI_BR_AP_MGR_CAMAN_1720",
        "desc": "Role: ZFI_BR_AP_MGR_CAMAN_1720"
      }
    ],
    "log": [
      {
        "date": "25-02-2026 03:07:32",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-90",
    "account": "SAPSUPPORT1",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "03-07-2024",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT_PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT_PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE"
      },
      {
        "role": "ZL_BR_FI_GL_REPORTS",
        "desc": "Role: ZL_BR_FI_GL_REPORTS"
      }
    ],
    "log": [
      {
        "date": "03-07-2024 09:45:28",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-91",
    "account": "SAP_SPC",
    "type": "System",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 22:15:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-92",
    "account": "SAP_WFRT",
    "type": "System",
    "privilege": "Critical",
    "lastActivity": "15-04-2026",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL"
      },
      {
        "role": "ZBASIS_BR_BGJOB_ADMIN",
        "desc": "Role: ZBASIS_BR_BGJOB_ADMIN"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710"
      }
    ],
    "log": [
      {
        "date": "15-04-2026 15:15:15",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-93",
    "account": "SAP_WSRT",
    "type": "System",
    "privilege": "Medium",
    "lastActivity": "16-03-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_BC_WEBSERVICE_SERVICE_USER",
        "desc": "Role: SAP_BC_WEBSERVICE_SERVICE_USER"
      }
    ],
    "log": [
      {
        "date": "16-03-2021 21:59:16",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-94",
    "account": "SDAGENT",
    "type": "System",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_SRSM_SDAGENT_CF",
        "desc": "Role: SAP_SRSM_SDAGENT_CF"
      },
      {
        "role": "SAP_SRSM_SDAGENT_GPA_MS",
        "desc": "Role: SAP_SRSM_SDAGENT_GPA_MS"
      },
      {
        "role": "SAP_SRSM_SDAGENT_MAI",
        "desc": "Role: SAP_SRSM_SDAGENT_MAI"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 22:25:44",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-95",
    "account": "SDASH",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "06-09-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "06-09-2022 11:30:11",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-96",
    "account": "SDMI_GJJNQXG",
    "type": "System",
    "privilege": "Critical",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 11:09:11",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-97",
    "account": "SDMI_MOZRDRW",
    "type": "System",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZHEC_SDMI_USER",
        "desc": "Role: ZHEC_SDMI_USER"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-98",
    "account": "SGAUSPOHL",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_COSTCEN_MAN_MSUP",
        "desc": "Role: ZL_BR_CA_COSTCEN_MAN_MSUP"
      },
      {
        "role": "ZL_BR_EWM_WH_DISPLAY_MSUP",
        "desc": "Role: ZL_BR_EWM_WH_DISPLAY_MSUP"
      },
      {
        "role": "ZL_BR_PM_WO_OBDELV",
        "desc": "Role: ZL_BR_PM_WO_OBDELV"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-99",
    "account": "SHIVAD",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "28-09-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "28-09-2021 06:29:51",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-100",
    "account": "SKONGARI",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "26-09-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_ALL_DISPLAY",
        "desc": "Role: ZL_BR_ALL_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_CONTRACTORS_COMMON",
        "desc": "Role: ZL_BR_CA_CONTRACTORS_COMMON"
      }
    ],
    "log": [
      {
        "date": "26-09-2022 07:18:12",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-101",
    "account": "SNAIR",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "08-11-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION",
        "desc": "Role: ZL_BR_MFG_EXECUTION"
      },
      {
        "role": "ZL_BR_MFG_CAPEX",
        "desc": "Role: ZL_BR_MFG_CAPEX"
      }
    ],
    "log": [
      {
        "date": "08-11-2021 11:38:57",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-102",
    "account": "SPC_SNOTE",
    "type": "System",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZHEC_SNOTE_V8",
        "desc": "Role: ZHEC_SNOTE_V8"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-103",
    "account": "SUMAN.GADWAL",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_PM_DISPLAY",
        "desc": "Role: ZL_BR_PM_DISPLAY"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-104",
    "account": "SVC_USER",
    "type": "Service",
    "privilege": "Medium",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_PROM_AUTH",
        "desc": "Role: ZL_BR_PROM_AUTH"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-105",
    "account": "TAEYUL.KIM",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "22-12-2024",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_COSTCEN_MAN_LACCOMAN",
        "desc": "Role: ZL_BR_CA_COSTCEN_MAN_LACCOMAN"
      },
      {
        "role": "ZL_BR_MM_PRPO_REPORTS_LACCOMAN",
        "desc": "Role: ZL_BR_MM_PRPO_REPORTS_LACCOMAN"
      },
      {
        "role": "ZL_BR_PM_PURCHASING_LACCOMAN",
        "desc": "Role: ZL_BR_PM_PURCHASING_LACCOMAN"
      }
    ],
    "log": [
      {
        "date": "22-12-2024 22:34:21",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-106",
    "account": "TC_USER",
    "type": "Service",
    "privilege": "Critical",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "Critical \u00b7 SAP_ALL equivalent",
    "roles": [
      {
        "role": "SAP_ALL",
        "desc": "Role: SAP_ALL"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-107",
    "account": "TEST",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1720",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1720"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-108",
    "account": "TEST1",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_EMPLOYEE",
        "desc": "Role: ZL_BR_CA_EMPLOYEE"
      },
      {
        "role": "ZL_BR_MFG_EXECUTION_PL1710",
        "desc": "Role: ZL_BR_MFG_EXECUTION_PL1710"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-109",
    "account": "THOMAS.EUN",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZPM_BR_MORD_PROCESS_1710",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1710"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1720",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1720"
      },
      {
        "role": "ZPM_BR_MORD_PROCESS_1730",
        "desc": "Role: ZPM_BR_MORD_PROCESS_1730"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-110",
    "account": "THU.LE",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "05-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [],
    "log": [
      {
        "date": "05-03-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-111",
    "account": "TMSADM",
    "type": "System",
    "privilege": "High",
    "lastActivity": "21-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "S_A.TMSADM",
        "desc": "Role: S_A.TMSADM"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      }
    ],
    "log": [
      {
        "date": "21-10-2020 21:48:24",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-112",
    "account": "TWILCOX",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USER_1710",
        "desc": "Role: ZL_BR_CA_ALL_USER_1710"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1720",
        "desc": "Role: ZL_BR_CA_ALL_USER_1720"
      },
      {
        "role": "ZL_BR_CA_ALL_USER_1730",
        "desc": "Role: ZL_BR_CA_ALL_USER_1730"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-113",
    "account": "USERLOCKED",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "31-08-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [],
    "log": [
      {
        "date": "31-08-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-114",
    "account": "VBAID",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "22-06-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "22-06-2021 10:59:26",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-115",
    "account": "VBALUMURU",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "23-05-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_GL_ACCNTING",
        "desc": "Role: ZL_BR_FI_GL_ACCNTING"
      },
      {
        "role": "ZL_BR_FI_PAY_PROCESS",
        "desc": "Role: ZL_BR_FI_PAY_PROCESS"
      },
      {
        "role": "ZL_BR_FI_PAY_PROPOSAL",
        "desc": "Role: ZL_BR_FI_PAY_PROPOSAL"
      }
    ],
    "log": [
      {
        "date": "23-05-2022 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-116",
    "account": "VMADDULA",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "20-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      }
    ],
    "log": [
      {
        "date": "20-10-2021 04:33:41",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-117",
    "account": "VSRUNGARAPU",
    "type": "Reference",
    "privilege": "Medium",
    "lastActivity": "05-05-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_BP_DIS",
        "desc": "Role: ZL_BR_CA_BP_DIS"
      },
      {
        "role": "ZL_BR_CA_STOCK_DIS",
        "desc": "Role: ZL_BR_CA_STOCK_DIS"
      }
    ],
    "log": [
      {
        "date": "05-05-2021 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-118",
    "account": "WESTLAKE.FI",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "29-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_AR_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_AR_REPORTS_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GEN_FINANCE_WLTAX",
        "desc": "Role: ZL_BR_FI_GEN_FINANCE_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GL_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_GL_REPORTS_WLTAX"
      }
    ],
    "log": [
      {
        "date": "29-03-2022 16:14:15",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-119",
    "account": "WESTLAKE.TAX",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "10-03-2022",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_FI_AR_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_AR_REPORTS_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GEN_FINANCE_WLTAX",
        "desc": "Role: ZL_BR_FI_GEN_FINANCE_WLTAX"
      },
      {
        "role": "ZL_BR_FI_GL_REPORTS_WLTAX",
        "desc": "Role: ZL_BR_FI_GL_REPORTS_WLTAX"
      }
    ],
    "log": [
      {
        "date": "10-03-2022 14:09:07",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-120",
    "account": "YBALEL",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "11-10-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZM:IT-PROJECT_TEAM_DISPLAY",
        "desc": "Role: ZM:IT-PROJECT_TEAM_DISPLAY"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZM:IT-BASIS_ADM_MASTR",
        "desc": "Role: ZM:IT-BASIS_ADM_MASTR"
      }
    ],
    "log": [
      {
        "date": "11-10-2021 12:14:40",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-121",
    "account": "YEONGJE.LEE",
    "type": "Reference",
    "privilege": "High",
    "lastActivity": "16-12-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "ZL_BR_PM_PURCHASING",
        "desc": "Role: ZL_BR_PM_PURCHASING"
      },
      {
        "role": "ZL_BR_CA_ALL_USERS",
        "desc": "Role: ZL_BR_CA_ALL_USERS"
      },
      {
        "role": "ZL_BR_CA_MANAGER",
        "desc": "Role: ZL_BR_CA_MANAGER"
      }
    ],
    "log": [
      {
        "date": "16-12-2021 07:55:11",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-122",
    "account": "ZGRFC_SUPER",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-123",
    "account": "_SAPI870957",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "16-02-2021",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      },
      {
        "role": "SAP_ESH_SEARCH_USER",
        "desc": "Role: SAP_ESH_SEARCH_USER"
      }
    ],
    "log": [
      {
        "date": "16-02-2021 09:35:04",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-124",
    "account": "_SAP_AMS_ADM",
    "type": "Service",
    "privilege": "High",
    "lastActivity": "22-10-2020",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      },
      {
        "role": "SAP_ESH_BOS_RFC_ENDUSER",
        "desc": "Role: SAP_ESH_BOS_RFC_ENDUSER"
      },
      {
        "role": "SAP_ESH_SEARCH_CATEG",
        "desc": "Role: SAP_ESH_SEARCH_CATEG"
      }
    ],
    "log": [
      {
        "date": "22-10-2020 09:23:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  },
  {
    "id": "SA-125",
    "account": "_SAP_TEC_USR",
    "type": "System",
    "privilege": "High",
    "lastActivity": "00-00-0000",
    "daysSince": 1,
    "inactive": false,
    "owner": "IT Compliance",
    "unmanaged": true,
    "risk": "High privilege technical account",
    "roles": [
      {
        "role": "S_A.SYSTEM",
        "desc": "Role: S_A.SYSTEM"
      },
      {
        "role": "SAP_BC_WEBSERVICE_DEBUGGER",
        "desc": "Role: SAP_BC_WEBSERVICE_DEBUGGER"
      },
      {
        "role": "SAP_BC_SIW_DEV",
        "desc": "Role: SAP_BC_SIW_DEV"
      }
    ],
    "log": [
      {
        "date": "00-00-0000 00:00:00",
        "desc": "Service activity logged"
      }
    ],
    "recommendation": "Rotate credentials periodically",
    "status": "Open",
    "assignee": null
  }
];

const ACCOUNT_TYPE_SPLIT = [
  { type: 'Service',     count: 13,     color: '#0F172A' },
  { type: 'Background',  count: 33,  color: '#475569' },
  { type: 'Integration', count: 0, color: '#94A3B8' }
];

const SERVICE_ACCOUNT_KPIS = {
  totalAccounts: 125,
  highPrivilege: 8,
  inactiveAccounts: 0,
  unmanagedAccounts: 123,
  deltas: {
    totalAccounts: 0,
    highPrivilege: 0,
    inactiveAccounts: 0,
    unmanagedAccounts: 0,
  },
};

Object.assign(window.MOCK, {
  SERVICE_ACCOUNT_TYPES, PRIVILEGE_LEVELS, INACTIVITY_OPTIONS,
  SERVICE_ACCOUNTS, ACCOUNT_TYPE_SPLIT, SERVICE_ACCOUNT_KPIS,
});

// SOD-11 - Remediation & Governance
const REMEDIATION_TYPES = ['Role Redesign', 'Access Removal'];
const PRIORITIES = ['P1', 'P2', 'P3', 'P4'];
const REMEDIATIONS = [
  {
    "id": "R-1058",
    "violationId": "V-1058",
    "type": "Access Removal",
    "priority": "P1",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type Full OTC cycle control (Order \u2192 Bill \u2192 Collect) by single user.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions ['VF01', 'VF04'] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1071",
    "violationId": "V-1071",
    "type": "Access Removal",
    "priority": "P1",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for PFCG role-admin combined with end-user transaction access",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type PFCG role-admin combined with end-user transaction access.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions ['ME21N', 'MIRO', 'VA01', 'VF01', 'FB50', 'F110'] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1090",
    "violationId": "V-1090",
    "type": "Role Redesign",
    "priority": "P2",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for Firefighter ID active >180 days without re-attestation",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type Firefighter ID active >180 days without re-attestation.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions [] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1094",
    "violationId": "V-1094",
    "type": "Role Redesign",
    "priority": "P2",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for PO Create + PO Release threshold exceeds user grade authority",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type PO Create + PO Release threshold exceeds user grade authority.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions ['ME29N', 'ME28'] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1101",
    "violationId": "V-1101",
    "type": "Role Redesign",
    "priority": "P2",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for F110 Auto-Payment Run runnable by non-treasury users",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type F110 Auto-Payment Run runnable by non-treasury users.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions [] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1124",
    "violationId": "V-1124",
    "type": "Access Removal",
    "priority": "P1",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for Background user RFC_BATCH_PI holds SAP_ALL equivalent",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type Background user RFC_BATCH_PI holds SAP_ALL equivalent.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions [] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  },
  {
    "id": "R-1131",
    "violationId": "V-1131",
    "type": "Role Redesign",
    "priority": "P2",
    "status": "Open",
    "assignee": null,
    "due": "2026-06-15",
    "overdue": false,
    "title": "Resolve conflict for Goods Receipt + Invoice Verification by same user",
    "rationale": "Users holding conflicting permissions represent a compliance violation of type Goods Receipt + Invoice Verification by same user.",
    "steps": [
      "Identify contributing roles for users",
      "Remove conflicting transactions ['MIRO'] from roles or revoke assignments",
      "Verify access removal in SU01"
    ]
  }
];
const REMEDIATION_KPIS = {
  "total": 7,
  "open": 7,
  "inProgress": 0,
  "resolved": 0,
  "overdue": 0,
  "deltas": {
    "total": 0,
    "open": 0,
    "inProgress": 0,
    "resolved": 0,
    "overdue": 0
  }
};

const POLICY_SUGGESTIONS = [
  {
    title: 'Deactivate inactive firefighter assignments',
    rationale: 'Review firefighter IDs that have had no login activity in the last 90 days.',
    owner: 'IT Compliance',
    priority: 'P2',
    impact: 'Security footprint reduction',
    frameworks: ['SOX', 'SAP GRC']
  },
  {
    title: 'Technical accounts password policy',
    rationale: 'Technical service accounts should enforce 90-day password rotations via automated vaults.',
    owner: 'SAP Basis Team',
    priority: 'P1',
    impact: 'System security enhancement',
    frameworks: ['ISO 27001']
  }
];

Object.assign(window.MOCK, {
  REMEDIATION_TYPES, PRIORITIES, REMEDIATIONS, REMEDIATION_KPIS, POLICY_SUGGESTIONS,
});

// SOD-12 - Continuous Compliance
const SOD12_KPIS = {
  automatedChecks: 3780,
  passRate: 93.5,
  newViolationsThisRun: 35,
  resolvedThisRun: 121,
  rulesActive: 7,
};

const RULES_LOG = [
  { id: 'RUL-904', code: 'Z_SOD_01', desc: 'Prevent Vendor Create + AP Payment',      deployed: '2026-05-20', author: 'J. Smith',    type: 'Custom'   },
  { id: 'RUL-903', code: 'Z_SOD_02', desc: 'Enforce Firefighter Expiry < 30 days',     deployed: '2026-05-18', author: 'A. Poche',    type: 'Custom'   },
  { id: 'RUL-902', code: 'Z_SOD_03', desc: 'Flag F110 out of Treasury',                deployed: '2026-05-10', author: 'B. Carrier',  type: 'Standard' },
  { id: 'RUL-901', code: 'Z_SOD_04', desc: 'Restrict PFCG for non-Basis users',        deployed: '2026-05-02', author: 'J. Smith',    type: 'Standard' },
  { id: 'RUL-900', code: 'Z_SOD_05', desc: 'Detect Bank Edit + Payment Block removal', deployed: '2026-04-25', author: 'H. Schroder', type: 'Legacy'   },
  { id: 'RUL-899', code: 'Z_SOD_06', desc: 'Full OTC cycle by single user alert',      deployed: '2026-04-10', author: 'Y. Kim',      type: 'Custom'   },
  { id: 'RUL-898', code: 'Z_SOD_07', desc: 'Background RFC with SAP_ALL equivalent',   deployed: '2026-04-05', author: 'S. Chen',     type: 'Legacy'   },
];

const COMPLIANCE_TREND_DATA = [
  {
    "run": "Run 1",
    "passRate": 88.1,
    "violations": 146,
    "resolved": 45
  },
  {
    "run": "Run 2",
    "passRate": 89.4,
    "violations": 126,
    "resolved": 58
  },
  {
    "run": "Run 3",
    "passRate": 90.0,
    "violations": 106,
    "resolved": 67
  },
  {
    "run": "Run 4",
    "passRate": 90.8,
    "violations": 86,
    "resolved": 79
  },
  {
    "run": "Run 5",
    "passRate": 91.5,
    "violations": 76,
    "resolved": 88
  },
  {
    "run": "Run 6",
    "passRate": 92.1,
    "violations": 66,
    "resolved": 97
  },
  {
    "run": "Run 7",
    "passRate": 92.9,
    "violations": 61,
    "resolved": 105
  },
  {
    "run": "Run 8",
    "passRate": 93.4,
    "violations": 56,
    "resolved": 112
  },
  {
    "run": "Run 9",
    "passRate": 93.5,
    "violations": 46,
    "resolved": 121
  }
];

Object.assign(window.MOCK, {
  SOD12_KPIS, RULES_LOG, COMPLIANCE_TREND_DATA
});
