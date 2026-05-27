# SAP SOD Analysis — Expert Design Documentation
## KTern.AI Agentic AI-driven License Optimization & SoD Analysis
### For Lotte Chemical | Version 2.0 | May 2026

---

## Executive Summary

This document provides a comprehensive analysis of the **9 SOD (Segregation of Duties) UI design pages**, explaining each module's purpose, functionality, and alignment with the KTern.AI PRD requirements. Each page addresses critical compliance, risk mitigation, and governance aspects of SAP access control.

**Key Principle:** SOD violations occur when a single user has conflicting access rights that, if misused or compromised, could lead to unauthorized or fraudulent transactions without detection.

---

## SOD Page Architecture Overview

The 9 SOD pages follow a **progressive risk disclosure model**:

1. **Entry Points (SOD-04)**: Urgent triage and action planning
2. **Risk Quantification (SOD-05)**: Financial and operational impact
3. **Violation Categories (SOD-06 to SOD-10)**: Specific risk areas
4. **Remediation & Governance (SOD-11 to SOD-12)**: Resolution and compliance

---

## DETAILED SOD ANALYSIS

---

## **SOD-04: Immediate Actions (Triage & Urgent Remediation)**

### **Business Purpose**
Provides **immediate visibility into high-priority violations requiring remediation within 24-48 hours** to prevent material exposure or audit failure.

### **PRD Alignment**
Directly implements: **"Immediate Actions (24–48 hrs)"** requirement from PRD Section 7.1
- AI-backed urgent remediation recommendations
- Step-by-step guidance for remediation
- P1 & P2 priority classification

### **Key Design Components**

#### **KPI Dashboard**
```
├── Total Urgent Actions
├── P1 (24h) — Critical Priority
├── Open Actions (Awaiting Resolution)
└── Resolved (Closed Actions)
```

#### **Action Queue Functionality**
- **Filtering**: Filter by Status (Open, In Progress, Resolved)
- **Status Updates**: Real-time tracking of remediation progress
- **Assignee Management**: Distribute tasks across SAP Basis/Security team
- **Urgency Severity**: Visual coding (P1=Red, P2=Orange, P3=Yellow)

#### **Action Attributes per Violation**
```
├── Violation ID
├── Category (e.g., "Dual Process Control", "Emergency Access")
├── Description (Concise SAP GRC violation)
├── Urgency Level (P1, P2, P3)
├── Current Status (Open, In Progress, Resolved)
├── Assigned To (Team member responsible)
├── Due Date (Within 24-48 hours for P1)
└── Remediation Step (Specific action required)
```

### **Design Rationale**
- **Speed First**: Executives see blockers immediately without drilling into complexity
- **Accountability**: Assignment tracking ensures no violation falls through cracks
- **Audit Trail**: Status transitions create governance documentation
- **Progressive Disclosure**: Detailed violation context available via drill-down

### **SAP Context**
In SAP GRC, these would correspond to violations detected via:
- PFCG (Profile Generator) conflicts
- Role-based SOD matrix violations
- Authorization object overlaps
- Transaction code pairing conflicts

---

## **SOD-05: Risk Impact Analysis (Financial & Operational Quantification)**

### **Business Purpose**
**Translates abstract SOD violations into quantifiable business risk** by calculating financial exposure, operational impact, and compliance framework alignment.

### **PRD Alignment**
Implements: **"Critical Findings Summary"** and risk scoring requirements from PRD Section 7.1
- Risk scoring methodology
- Financial exposure quantification
- Compliance framework benchmarking

### **Key Design Components**

#### **Impact KPIs**
```
├── MAPPED VIOLATIONS — Total detected conflicts
├── HIGH EXPOSURE ($) — Financial loss if violated
├── MEDIUM EXPOSURE ($) — Moderate business impact
├── LOW EXPOSURE ($) — Informational findings
└── MONEY AT RISK — Total aggregate financial exposure
```

#### **Quantitative Impact Analysis Section**

**Risk Distribution by Category (Donut Chart)**
- Shows % breakdown across violation types:
  - Unauthorized Financial Transactions (Highest Risk)
  - Data Access Violations (Medium Risk)
  - System Admin Conflicts (Critical Risk)
  - Compliance Gaps (Audit Risk)

**Framework Breakdown Matrix**
```
Framework Compliance      | Current State | Target State | Gap
─────────────────────────────────────────────────────────────
SAP GRC Best Practices    | 68%           | 95%          | 27%
SOX Compliance            | 72%           | 100%         | 28%
COSO Framework            | 65%           | 95%          | 30%
ISO 27001                 | 70%           | 100%         | 30%
```

### **Design Rationale**
- **Executive Language**: Finance & Risk leadership understand dollar exposure
- **Benchmark Context**: Shows how company compares to SAP GRC best practices
- **Multi-stakeholder Appeal**: Different metrics for different audience needs
- **Trend Tracking**: Enables monitoring of compliance improvement trajectory

### **SAP Context**
Financial quantification based on:
- Transaction volumes × Average transaction value
- Risk probability (e.g., 10% probability of fraud detection failure)
- Regulatory penalties (SOX, audit failure costs)
- Operational impact (revenue cycle disruption)

---

## **SOD-06: Super Administrators Detection (Unrestricted Access)**

### **Business Purpose**
**Identifies users with near-unrestricted system access** across SAP environments, representing the highest organizational risk.

### **PRD Alignment**
Implements: **"Super Administrators Detection"** — Unrestricted access detection across SAP systems (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Total Super-Admins — Count of unrestricted users
├── Critical Severity — P1 violations needing immediate remediation
├── Source Roles — How many distinct roles grant super-admin access
└── Affected Systems — Cross-system scope (ECC, S/4HANA, etc.)
```

#### **Role Authority Concentration Chart**
- **Horizontal bar chart** showing role names vs. user count distribution
- **Color coding**: Red bars (>60% user concentration) vs. Gray (lower risk)
- **Enables identification**: Which roles are "super-role" candidates

#### **User Drill-Down Detail**
For each super-admin user:
```
├── User Name (ID)
├── System(s) Affected
├── Effective Authorization Objects (e.g., "SAP_ALL", "SUPER_USER")
├── Last Activity (Login date, transaction)
├── Business Justification (Why do they need this?)
├── Remediation Options:
│   ├── Split into role hierarchy
│   ├── Implement segregated duties
│   └── Apply mitigating controls (e.g., 4-eye approval)
└── Audit Ready? (Yes/No — compliance status)
```

### **Design Rationale**
- **Risk Concentration**: Super-admins are single points of failure
- **Regulatory Red Flag**: Auditors always flag these first
- **Clear Remediaton Path**: Visual role structure shows decomposition strategy
- **Justification Requirement**: Ensures business case is documented

### **SAP Context**
In SAP, super-admin access typically granted via:
- **SAP_ALL** object (grants all system access)
- **SUPER_USER** roles (platform-specific super-roles)
- **PFCG_ALL** (Profile Generator full access)
- **Dictionary roles** with unrestricted access to SE11, SE37, SE80

**Critical Control**: Should be <2-3 users organization-wide in mature environments.

---

## **SOD-07: Dual Process Control Violations (Cross-Role Conflicts)**

### **Business Purpose**
**Identifies users with conflicting access across different business processes** (Procurement, Finance, OTC, HR, IT) that could enable unauthorized financial transactions.

### **PRD Alignment**
Implements: **"Dual Process Control Violations"** — Cross-role, cross-transaction SoD conflict identification (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Cross-Process Sets — Total violation pairs detected
├── Fraud Pairings (P1) — Critical dual-control violations
├── High Priority (P2) — Requires governance review
├── Unique Users — Users with conflicting access
└── Impacted Areas — Business process scope (Procurement, Finance, etc.)
```

#### **Interaction Heatmap (Conflict Matrix)**
- **Matrix structure**: Rows = Business Processes, Columns = Business Processes
- **Cell values**: Count of users with both process permissions
- **Color intensity**: Red (high risk) → Yellow (medium) → Green (low)
- **Example conflicts**:
  ```
              Procurement  Finance  OTC   HR   IT
  Procurement      —         23      8    0    0
  Finance         23          —      45   0    1
  OTC              8         45      —    0    0
  HR               0          0      0    —    0
  IT               0          1      0    0    —
  ```

#### **Detailed Violation Breakdown**
For each detected dual-process conflict:
```
├── Conflict ID
├── Process Pair (e.g., "Procurement + Finance")
├── Specific SoD Rule (e.g., "Cannot have Vendor Create + AP Payment")
├── User Count Affected
├── Sample Users (First 5 showing violation)
├── Business Impact Scenario (e.g., "User could create vendor, bypass approval, process payment")
├── Severity (P1/P2/P3)
├── Remediation:
│   ├── Option A: Remove lower-privilege process access
│   ├── Option B: Implement compensating control (manager approval)
│   └── Option C: Role redesign (create separate roles)
└── Timeline (24h/5d/30d)
```

### **Design Rationale**
- **Process-Centric View**: Business people understand "Procurement" vs. technical "PFCG"
- **Visual Matrix**: Heat map shows systemic weaknesses instantly
- **Fraud Scenario Narrative**: Explains *why* it matters (not just "conflict exists")
- **Scalability**: Heatmap works for 20+ business processes

### **SAP Context**
Classic dual-process conflicts in SAP:

| Violation | Risk | SAP Objects |
|-----------|------|------------|
| Vendor Create + AP Payment | Unauthorized payment to fictitious vendor | F_LFA1, F_BLAT1, F110 |
| PO Creation + Receipt | Over-invoice fraud | ME91, MIGO, F401 |
| Goods Receipt + Invoice Approval | Three-way match bypass | MIGO, MIRO, FB50 |
| AR Credit + Collection | Revenue recognition fraud | VA01, FBUD, VF04 |
| Inventory Move + Warehouse Admin | Theft concealment | MIGO, LS02 |

---

## **SOD-08: Emergency Access Analysis (Firefighter ID Governance)**

### **Business Purpose**
**Monitors temporary emergency access ("firefighter" IDs) assigned for production support**, detecting misuse patterns and overly prolonged assignments.

### **PRD Alignment**
Implements: **"Emergency Access Analysis"** — Firefighter access pattern detection and misuse flags (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Active Firefighters — Count of active emergency accounts
├── Unapproved Access (P1) — Assignments without formal approval
├── Over 30 Days (P2) — Assignments exceeding temporary threshold
└── AI Anomaly Flags — Machine-learning detected suspicious patterns
```

#### **Emergency Usage Chronology (Timeline Visualization)**
- **Horizontal timeline view** for each firefighter ID
- **Time periods shown**: Q2 Start → Q3 Start (full quarter)
- **Visual blocks** indicate activation windows:
  - **Green**: Approved, within SLA
  - **Yellow**: Pending approval or nearing 30-day limit
  - **Red**: Unapproved or severely overdue
  - **Flagged**: AI-detected anomaly (unusual time of day, duration pattern)

#### **Detailed Firefighter Record**
For each emergency access user:
```
├── Firefighter ID (Temp User Name)
├── Business Justification (Production incident, batch restart, etc.)
├── Grant Date & Expiry Target
├── Days Active (calculated)
├── Approval Status (Approved / Pending / Missing)
├── Manager (Who approved)
├── Permissions Granted (e.g., TCODE:SM04 for session monitoring)
├── AI Anomaly Flag (Yes/No) — Suspicious pattern detected?
│   └── Example: "Multiple access attempts during off-hours"
├── Activity Log Sample:
│   ├── Last Access Time
│   ├── Transaction Codes Executed
│   └── Objects Modified (if any)
└── Action Required:
    ├── Re-approve (if justified)
    ├── Revoke (if SLA exceeded)
    └── Review anomaly
```

### **Design Rationale**
- **Governance Compliance**: Financial Audit requirement — firefighter access must be temporary & justified
- **Pattern Detection**: AI flags abnormal patterns (late-night access, duration abuse)
- **Timeline Clarity**: Visual "timeline stacking" shows which are overdue at a glance
- **Actionability**: Each anomaly flagged with specific recommendation

### **SAP Context**
Firefighter/Emergency access best practices:
- **Maximum Duration**: 30 days (industry standard)
- **Approval Required**: Manager + Basis lead sign-off
- **Audit Trail**: Monitored & logged separately
- **Common Justification**: OS-level access for batch job restart, database maintenance
- **Misuse Risk**: Attacker could compromise emergency account for extended backdoor access

---

## **SOD-09: OTC Control Violations (Order-to-Cash Cycle)**

### **Business Purpose**
**Maps the complete order-to-cash revenue cycle and identifies users with control over multiple steps**, creating audit trail gaps and fraud opportunities.

### **PRD Alignment**
Implements: **"OTC Control Violations"** — End-to-end Order-to-Cash control detection (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Cross-Step Users — Users spanning multiple OTC steps
├── Full-Cycle Control (P1) — User owns >3 steps (highest risk)
├── Partial Overlap (P2) — User owns 2 adjacent steps
└── Money at Risk ($) — Revenue amount exposed to risk
```

#### **OTC Pipeline Stepper Visualization**
- **Horizontal step cards** representing OTC flow:
  ```
  [Sales Order] → [Delivery] → [Invoice] → [Payment] → [Collection]
  ```
- **For each step**, shows:
  - Step name
  - Ownership count (how many unique users can execute)
  - User involvement % (highlight if <20% or >80%)
  - Dollar volume passing through this step

#### **Order-to-Cash Step Definitions** (SAP Context)

| OTC Step | SAP Transactions | Key Objects | Business Control |
|----------|------------------|-------------|------------------|
| **Sales Order** | VA01, VA02, VA03 | V_VBAK, V_VBAP | Customer credit limit, pricing authority |
| **Delivery** | VL01N, VL02N, VL31N | V_LIKP, V_LIPS | Goods movement authorization |
| **Goods Receipt** | MIGO, MB01, MB31 | M_MKPF, M_MSEG | Inventory update & 3-way match |
| **Invoicing** | VF01, VF04, VF22 | V_VBRK, V_VBRP | Revenue recognition, tax calculation |
| **A/R Collection** | F-32, F-33, F-28 | F_BKPF, F_BSEG | Cash receipt & matching |

#### **User-Level OTC Mapping**
For selected user (or aggregate view):
```
├── User Name
├── Total Orders Managed (count)
├── Steps Covered:
│   ├── ✓ Sales Order Creator
│   ├── ✓ Delivery Processor
│   ├── ✓ Invoicer
│   ├── ✗ AR Collector (cannot do this)
│   └── ✗ Payment Processor (cannot do this)
├── Audit Risk:
│   ├── Gap 1: Orders created + invoiced (2-step ownership)
│   ├── Gap 2: No delivery step = possible invoice without shipment
│   └── Recommendation: Assign delivery responsibility to different user
├── Sample Transactions (Last 10):
│   ├── SO-001234 | VA01 | $45,000 | ✓ Delivered | ✓ Invoiced | ✗ Collected
│   └── (etc.)
└── Risk Score: 7.2/10 (Moderate)
```

### **Design Rationale**
- **Revenue Cycle Focus**: CFO & Finance leadership primary audience
- **Dollar Quantification**: Shows financial impact, not just compliance
- **Step Transparency**: Enables proper segregation of duties planning
- **User Drill-Down**: Supports evidence for audit readiness

### **SAP Context**
OTC fraud scenarios enabled by SOD violations:
1. **Revenue Recognition Abuse**: Create order, skip delivery step, invoice, pocket revenue
2. **Inventory Theft**: Skip goods receipt confirmation, move inventory, cover with delivery docs
3. **Customer Fraud**: Modify customer master, create order with unauthorized terms, collect cash
4. **Write-off Abuse**: Deliver goods, fail to invoice, write off as bad debt

**Audit Control**: Each step should have segregation; ideally 5+ people involved in full cycle.

---

## **SOD-10: High-Risk Service Accounts (Non-Human Identity Management)**

### **Business Purpose**
**Governs service accounts (background batch jobs, technical integrations, system interfaces)** to prevent backdoor access and privilege escalation.

### **PRD Alignment**
Implements: **"High-Risk Service Accounts"** — Unmanaged service and technical account privilege analysis (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Total Service Identities — Count of all non-human accounts
├── Elevated Privilege (P1) — Service accounts with admin-level access
├── Dormant (60d+) (P2) — Inactive accounts not cleaned up
└── Unmanaged IDs — Accounts without owner/governance
```

#### **Identity Classification (Donut Chart)**
Breakdown by account type:
```
├── Service Accounts (System integrations: 35%)
├── Background Jobs (Batch operations: 40%)
├── Integration Accounts (EAI/middleware: 20%)
└── Other Technical (5%)
```

#### **Service Account Grid by Privilege × Type**

```
            Service    Background  Integration
Critical      15         8           2         [25 total — RED ALERT]
High          28        12           5         [45 total]
Medium        42        35          18         [95 total]
Low           65        48          32         [145 total]
─────────────────────────────────────────────
TOTAL        150        103          57        [310 accounts]
```

#### **Individual Account Record**
For each service account flagged:
```
├── Account ID (e.g., "BTC_INTER_01")
├── Account Type (Service / Background / Integration)
├── Business Owner (Batch process name, system, etc.)
├── Technical Owner (Basis team member responsible)
├── Privilege Level (Critical / High / Medium / Low)
├── Authorization Objects:
│   ├── SAP_ALL or equivalent (RED if present)
│   ├── DB_CONNECT (for RFC access)
│   ├── S_USER_GRP (User group access)
│   └── Other sensitive objects
├── Last Activity:
│   ├── Last Login (Date, time)
│   ├── Last Batch Execution
│   └── Transaction Activity
├── Password Status:
│   ├── Password age (days since change)
│   ├── Technical contact (who has password?)
│   └── Vault status (stored in password manager? Yes/No)
├── Risk Flags:
│   ├── ✓ Dormant (>60 days inactive)
│   ├── ✓ Over-privileged (has admin role)
│   ├── ✓ No documented business case
│   └── ✓ No manager oversight
├── Remediation Plan:
│   ├── Option A: Reduce privilege scope to minimum required
│   ├── Option B: Enable technical vault management
│   ├── Option C: Retire (if truly unused)
│   └── Option D: Implement monitoring/anomaly detection
└── Compliance Status: ⚠ Non-Compliant (needs action)
```

### **Design Rationale**
- **Hidden Risk**: Service accounts often overlooked but represent major breach vector
- **Business Context**: Must map to actual business process (what batch does this account run?)
- **Lifecycle Management**: Dormant accounts are liability; flag for retirement
- **Privilege Minimization**: Show which objects could be removed without impact

### **SAP Context**
Service account risks:
- **RFC System Accounts**: Used for middleware integrations; often over-privileged
- **Batch Background Jobs**: Run under service account; if compromised, enable unauthorized mass operations
- **Integration Users**: Bridge SAP to external systems; shared credentials across teams
- **Technical Debt**: Legacy accounts created for temporary fixes, never cleaned up
- **Audit Red Flag**: Service accounts with change access (TC39, SE11) enable backdoor code injection

**Best Practice**: Service accounts should have single-purpose privilege, no interactive login allowed, activity logged separately.

---

## **SOD-11: Remediation Recommendations (Action Planning & Execution)**

### **Business Purpose**
**Translates identified SoD violations into actionable remediation tasks** with clear ownership, priority, and progress tracking.

### **PRD Alignment**
Implements: **"Remediation Recommendations"** — AI-backed role redesign, access removal, and governance policies (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Total Tasks — All remediation actions across the platform
├── Overdue (P1) — Tasks past SLA deadline (requires escalation)
├── Awaiting Owner (P2) — Open tasks unassigned or awaiting action
├── In Progress — Active remediation work
└── Closed (Good) — Completed remediation, status improvement
```

#### **Remediation Task Types** (Color-coded)

| Type | Icon | Color | Purpose | Example |
|------|------|-------|---------|---------|
| **Role Redesign** | Wrench | Slate-700 | Restructure role architecture | Split SUPER_USER into ZFI_MANAGER + ZFI_USER |
| **Access Removal** | X | Red-600 | Immediately revoke dangerous access | Remove PFCG_ALL from USER_001 |
| **Mitigating Control** | Shield | Slate-600 | Implement compensating control | Add 4-eye approval for Payment TC F110 |
| **Policy** | File | Navy-900 | Create governance policy | "Emergency firefighter access expires in 30 days" |

#### **Task Record Detail**
For each remediation task:
```
├── Task ID (REM-4521)
├── Violation Reference (Links to: SOD-06, SOD-07, SOD-09, etc.)
├── Type (Role Redesign / Access Removal / Mitigating Control / Policy)
├── Priority (P1 / P2 / P3 / P4)
├── Status (Open / In Progress / Resolved)
├── Assigned To (Team member, team, or department)
├── Due Date (Calendar due date)
├── Description:
│   └── "Remove SUPER_USER role from USER_JOHN_SMITH; assign replacement role ZFI_MANAGER instead"
├── Remediation Steps:
│   ├── Step 1: Notify user of access change via email
│   ├── Step 2: Run PFCG user comparison (TC: PFCG, report SUBC)
│   ├── Step 3: Remove role in PFCG; save new profile
│   ├── Step 4: Assign ZFI_MANAGER via SE39
│   ├── Step 5: Test user login with new role
│   └── Step 6: Document in change ticket; notify Audit
├── Supporting Documentation:
│   ├── Risk assessment (why this matters)
│   ├── Business impact (who is affected?)
│   ├── Rollback plan (how to undo if issues)
│   └── Audit evidence (screenshots, logs)
├── Execution Tracking:
│   ├── Assigned Date
│   ├── Last Status Update
│   ├── % Complete
│   └── Actual Close Date (if complete)
└── Audit Trail:
    ├── Who created task?
    ├── Who approved?
    ├── Who executed?
    └── Evidence attachment
```

#### **Remediation Summary Chart** (Visual Progress)
- **Horizontal stacked bar** showing task breakdown by type:
  ```
  Role Redesign:      ████ (15 total: 3 done, 4 in progress, 8 open)
  Access Removal:     ███░░░░ (28 total: 10 done, 5 in progress, 13 open)
  Mitigating Control: ██░ (6 total: 2 done, 0 in progress, 4 open)
  Policy:             ░ (2 total: 0 done, 0 in progress, 2 open)
  ```

### **Design Rationale**
- **Accountability**: Assigned ownership prevents tasks from falling through cracks
- **Tooling Integration**: Steps include actual SAP transaction codes for ease of execution
- **Audit Ready**: Every step creates documentation trail for compliance
- **Flexibility**: Accommodates 4 different remediation approaches (not one-size-fits-all)
- **Progress Visibility**: Executive dashboard shows remediation velocity

### **SAP Context**
Remediation task examples from real SAP environments:

1. **Role Redesign Example** (from SOD-07 violation)
   - Current: ZFI_USER has F_LFA1 (vendor create) + F_BLAT1 (AP payment)
   - Problem: Dual control violation
   - Solution: Create ZFI_VENDOR (F_LFA1 only) and ZFI_PAYMENT (F_BLAT1 only)
   - Assign user to ZFI_VENDOR; reassign F_BLAT1 to Treasury team

2. **Access Removal Example** (from SOD-06 violation)
   - Current: USER_ADMIN has SAP_ALL + SUPER_USER + PFCG_ALL
   - Problem: Super-admin unrestricted access
   - Solution: Remove SAP_ALL; keep only necessary roles (ZFI_BASIS + ZFI_SECURE_ADMIN)
   - Implement approval workflow for future role changes

3. **Mitigating Control Example** (from OTC SOD-09 violation)
   - Current: USER_SALES handles full OTC cycle (VA01 + VF01 + F-32)
   - Problem: Segregation violation; user could create order, invoice, collect cash
   - Solution: Implement 4-eye approval in SPRO for invoices >$10K (DP_APPROVAL_WORKFLOW)

---

## **SOD-12: Continuous Compliance Enablement (Governance & Rule Engine)**

### **Business Purpose**
**Operationalizes SOD monitoring through automated rule engine**, enabling continuous real-time compliance checking between quarterly assessment runs.

### **PRD Alignment**
Implements: **"Continuous Compliance Enablement"** — Ongoing SoD monitoring via scans and dashboards (PRD Section 7.1)

### **Key Design Components**

#### **KPI Dashboard**
```
├── Automated Checks — Count of continuous monitoring rules executed
├── Pass Rate (%) — Compliance % (trend is key: improving or declining?)
├── Rules Active — Currently deployed compliance rules
├── Pending Review — New rules awaiting approval before deployment
├── New Violations (P1) — Violations detected this run (should trend down)
└── Resolved (Good) — Violations fixed this run (shows remediation velocity)
```

#### **Compliance Maturity Trend** (Line Chart)
- **X-axis**: Assessment run history (Run 1, Run 2, Run 3, etc.)
- **Y-axis**: Compliance pass rate percentage (0-100%)
- **Trend line**: Shows trajectory
  ```
  Run 1 (May):   71%  ⬆
  Run 2 (Jun):   76%  ⬆
  Run 3 (Jul):   82%  ⬆
  Run 4 (Aug):   87%  ⬆ [Improving! Remediation working]
  
  Goal: Reach 95%+ by year-end
  ```

#### **Rules Deployment Log**
Active compliance rules in production:

| Rule ID | Rule Code | Description | Deployed | Status | Author |
|---------|-----------|-------------|----------|--------|--------|
| RUL-904 | Z_SOD_01 | Prevent Vendor Create + AP Payment | 2026-05-20 | ✓ Active | J. Smith |
| RUL-903 | Z_SOD_02 | Enforce Firefighter Expiry < 30 days | 2026-05-18 | ✓ Active | A. Poche |
| RUL-902 | Z_SOD_03 | Flag F110 out of Treasury group | 2026-05-10 | ✓ Active | B. Carrier |
| RUL-901 | Z_SOD_04 | Restrict PFCG for non-Basis users | 2026-05-02 | ✓ Active | J. Smith |
| RUL-900 | Z_SOD_05 | Detect Bank Edit + Payment Block removal | 2026-04-25 | ✓ Active | H. Schroder |
| RUL-899 | Z_SOD_06 | Full OTC cycle by single user alert | 2026-04-10 | ⏳ Pending | Y. Kim |
| RUL-898 | Z_SOD_07 | Background RFC with SAP_ALL equivalent | 2026-04-05 | ⏳ Pending | S. Chen |

#### **Individual Rule Definition** (Detailed)
For each active rule:
```
├── Rule ID & Code (RUL-904 / Z_SOD_01)
├── Rule Name: "Vendor Master Access + Payment Execution Conflict"
├── Business Context:
│   └── "Prevents user from creating vendor master (F_LFA1) AND executing payment (F110)"
├── SAP Scope:
│   ├── Authorization Objects: F_LFA1, F110, F_BKPF
│   ├── Transaction Codes: XK01, XK02, XK05 (vendor), FB50, F-53 (payment)
│   ├── Modules: MM-PUR, FI-AP
│   └── Systems: ECC, S/4HANA
├── Detection Method:
│   ├── Data source: PFCG roles, user master (USR02), auth object trace (AGR_USERS)
│   ├── Query: SELECT user WHERE HAS(F_LFA1) AND HAS(F110) AND active = 1
│   └── Frequency: Real-time (continuous scanning)
├── Severity (if violated): P1 (Critical) — High fraud risk
├── False Positive Tolerance: <1% (high confidence required)
├── Remediation Path:
│   ├── Auto-action: Flag for review (no auto-revocation)
│   ├── Manual action: Implement role split or mitigating control
│   └── Approval: Required from SAP Basis lead
├── Performance:
│   ├── Execution time: <30 seconds (lightweight)
│   ├── User population: 5,200 users scanned
│   ├── Last run violations: 3 users flagged
│   └── Trend: Declining (good remediation velocity)
├── Audit Evidence:
│   ├── Rule validation date
│   ├── Approvers (compliance + business)
│   ├── Exception policy (are exceptions allowed?)
│   └── Change log (rule modifications)
└── Next Review: 2026-08-30
```

#### **Continuous Monitoring Architecture**
```
Daily Checks           Weekly Reviews       Quarterly Deep-Dive
└─ Real-time rules    └─ Trend analysis    └─ Full risk assessment
   - New violations   - Remediation pace   - AI augmented analysis
   - Firefighter      - Compliance        - Benchmark comparison
     expiry           - Rollback needs    - Stakeholder review
   - Dormant accounts - Anomaly detection
```

### **Design Rationale**
- **Continuous vs. Periodic**: Rules engine catches violations day 1, not in next quarterly scan
- **Rule Library**: Company builds intellectual property of compliance checks
- **Governance Workflow**: Rules deployed through approval process (no ad-hoc changes)
- **Trend Tracking**: Compliance trajectory visibility enables proactive intervention
- **Low False Positive**: High confidence threshold prevents alert fatigue

### **SAP Context**
KTern.AI continuous compliance rules map to SAP GRC regulatory controls:

**Framework Mapping**:
- **SOX Compliance**: Rules enforce segregation of financial transaction duties
- **COSO Internal Controls**: Rules validate authorization hierarchy
- **ISO 27001**: Rules govern access provisioning and removal
- **SAP GRC Governance**: Rules reference SAP-native control matrices (CMS, EMS, AGR)

**Rule Deployment Lifecycle**:
1. **Assessment**: AI identifies pattern in violation data
2. **Design**: Rule written (SQL-like logic)
3. **Testing**: Validated against 6 months historical data (precision/recall)
4. **Approval**: Compliance + Business review
5. **Deployment**: Rule enabled in continuous scanning engine
6. **Monitoring**: Daily violation detection & reporting
7. **Tuning**: False positive refinement over 30 days
8. **Operationalization**: Handed to Security Operations

---

## COMPREHENSIVE TRACEABILITY: SOD Pages ↔ PRD Requirements

### **PRD Section 7.1: SoD Analysis Features (In-Scope) → SOD Page Mapping**

| PRD Feature | Description | Implemented in SOD Page |
|------------|-------------|------------------------|
| **Executive Summary** | AI-generated compliance summary with risk scoring | SOD-05 (Risk Impact quantification) |
| **Overall Compliance Assessment** | Compliance posture benchmarked against SAP GRC best practices | SOD-05 (Framework breakdown) + SOD-12 (Trend maturity) |
| **Critical Findings Summary** | High-risk violation consolidation with severity scoring | SOD-04 (Urgent action queue) |
| **Immediate Actions (24–48 hrs)** | Urgent remediation recommendations with step-by-step guidance | SOD-04 (Full focus; action assignment; status tracking) |
| **Super Administrators Detection** | Unrestricted access detection across SAP systems | SOD-06 (Comprehensive super-admin module) |
| **Dual Process Control Violations** | Cross-role, cross-transaction SoD conflict identification | SOD-07 (Interaction heatmap; fraud pairing matrix) |
| **Emergency Access Analysis** | Firefighter access pattern detection and misuse flags | SOD-08 (Timeline anomaly detection; approval workflow) |
| **OTC Control Violations** | End-to-end Order-to-Cash control detection | SOD-09 (Full OTC pipeline stepper; user-level mapping) |
| **High-Risk Service Accounts** | Unmanaged service and technical account privilege analysis | SOD-10 (Identity classification; privilege matrix) |
| **Remediation Recommendations** | AI-backed role redesign, access removal, and governance policies | SOD-11 (Task execution; multi-approach remediation) |
| **Continuous Compliance Enablement** | Ongoing SoD monitoring via scans and dashboards | SOD-12 (Rule engine; compliance maturity trends) |

### **User Journey: From Violation Detection to Compliance Resolution**

```
Executive Dashboard (Summary)
    ↓
[SOD-05] Risk Quantification & Impact
    ↓ (Drill down to understand exposure)
    ├─→ [SOD-06] Which super-admins are at fault?
    ├─→ [SOD-07] What process conflicts exist?
    ├─→ [SOD-08] Are firefighters out of control?
    ├─→ [SOD-09] Who has full OTC cycle?
    └─→ [SOD-10] Which service accounts are at risk?
    ↓
[SOD-04] Immediate Actions Queue
    ↓ (Triage P1/P2 violations requiring urgent action)
    ↓
[SOD-11] Create Remediation Tasks & Assign Ownership
    ↓ (Execute remediation across teams)
    ↓
[SOD-12] Continuous Compliance Monitoring
    ↓ (Real-time rule enforcement; trend tracking)
    ↓
Executive Scorecard: Compliance Maturity Trending ✓
```

---

## DESIGN PRINCIPLES & SAP EXPERTISE

### **1. Risk-Based Prioritization**
- **P1 violations** identified in SOD-04, SOD-06 prioritized for immediate remediation
- **Financial exposure** quantified in SOD-05 drives executive decision-making
- **Audit readiness** tracked across all pages; compliance maturity in SOD-12

### **2. Role Segregation (SoD) vs. Role Authorization**
- **SoD Violation**: User has conflicting access (e.g., both create vendor + execute payment)
- **Solution**: Split roles or implement compensating control
- **SAP Implementation**: Use PFCG profiles, authorization groups, and role templates to enforce segregation

### **3. Continuous vs. Periodic Monitoring**
- **Quarterly Assessment** (SOD-04 through SOD-11): Deep-dive risk analysis, manual remediation
- **Continuous Monitoring** (SOD-12): Real-time rule engine catches new violations daily
- **Synergy**: Quarterly findings inform continuous rule design

### **4. Financial + Compliance Dual Language**
- **Finance Audience**: Understand dollar exposure, remediation ROI, risk tolerance
- **Compliance Audience**: Understand audit frameworks (SOX, COSO, ISO), regulatory readiness, evidence trails
- **Each page** speaks to both stakeholders with appropriate visualization

### **5. Technical Depth + Business Clarity**
- **Technical Detail**: SAP transaction codes, authorization objects, PFCG profiles
- **Business Translation**: "Vendor Create + AP Payment" not "F_LFA1 + F110"
- **Supports Execution**: Basis team can immediately act on recommendations

---

## CONCLUSION: SAP SOD Compliance Framework

The 9-page SOD analysis module provides **enterprise-grade segregation of duties governance** aligned with:
- ✅ **PRD Requirements**: Every feature mapped to PRD Section 7.1
- ✅ **SAP Best Practices**: Built on SAP GRC, PFCG, authorization architecture
- ✅ **Audit Standards**: SOX, COSO, ISO 27001, regulatory frameworks
- ✅ **Operational Reality**: Supports Basis, Security, Finance, Compliance teams

**Result**: Lotte Chemical transforms from manual, reactive SoD management → **continuous, AI-driven compliance intelligence** with measurable risk reduction and audit readiness.

---

**Document Prepared By**: [Expert SAP Architect + SOD Specialist]  
**Version**: 2.0  
**Date**: May 27, 2026  
**Classification**: Internal — Lotte Chemical
