# SOD Pages — Quick Reference & PRD Traceability Matrix
## KTern.AI SoD Analysis Module | 9-Page UI Architecture

---

## QUICK PAGE REFERENCE

### **SOD-04: Immediate Actions (TRIAGE)**
**Who Sees It**: Compliance Manager, SAP Basis Lead  
**When Used**: Daily triage of P1/P2 violations  
**Data Freshness**: Real-time  
**Key Metric**: # of P1 violations (should trend to 0)  
**Action**: Assign remediation tasks to team members  
**PRD Requirement**: "Immediate Actions (24–48 hrs)" ✓

---

### **SOD-05: Risk Impact Analysis (QUANTIFY)**
**Who Sees It**: CFO, Risk Officer, Audit Committee  
**When Used**: Executive briefing; board reporting  
**Data Freshness**: Assessment run cycle (quarterly)  
**Key Metric**: $ Money at Risk (financial exposure)  
**Action**: Approve remediation roadmap & budget allocation  
**PRD Requirement**: "Critical Findings Summary" + Risk Scoring ✓

---

### **SOD-06: Super Administrators (HIGHEST RISK)**
**Who Sees It**: IT Director, Basis Team, Auditor  
**When Used**: Super-admin governance audit  
**Data Freshness**: Monthly scan  
**Key Metric**: # of super-admin accounts (should be <3)  
**Action**: Reduce super-admin scope; implement segregation  
**PRD Requirement**: "Super Administrators Detection" ✓

---

### **SOD-07: Dual Process Control (FRAUD PAIRS)**
**Who Sees It**: Process Owner (Procurement, Finance, OTC, HR)  
**When Used**: Department-level compliance review  
**Data Freshness**: Quarterly assessment  
**Key Metric**: # of users with conflicting process access  
**Action**: Role redesign; user access reallocation  
**PRD Requirement**: "Dual Process Control Violations" ✓

---

### **SOD-08: Emergency Access (FIREFIGHTERS)**
**Who Sees It**: Production Support Manager, Compliance  
**When Used**: Firefighter ID governance audit  
**Data Freshness**: Daily monitoring  
**Key Metric**: # of approved vs. unapproved firefighter IDs >30 days  
**Action**: Re-approve or revoke firefighter assignments  
**PRD Requirement**: "Emergency Access Analysis" ✓

---

### **SOD-09: OTC Control (REVENUE CYCLE)**
**Who Sees It**: Finance Controller, AR Manager, Auditor  
**When Used**: Revenue cycle control audit  
**Data Freshness**: Quarterly assessment  
**Key Metric**: $ Money at Risk (OTC full-cycle controllers)  
**Action**: Segregate OTC step ownership across users  
**PRD Requirement**: "OTC Control Violations" ✓

---

### **SOD-10: Service Accounts (TECHNICAL DEBT)**
**Who Sees It**: Basis Team, Information Security  
**When Used**: Technical account lifecycle review  
**Data Freshness**: Weekly scan  
**Key Metric**: # of dormant service accounts; # over-privileged  
**Action**: Retire dormant accounts; reduce privilege of active ones  
**PRD Requirement**: "High-Risk Service Accounts" ✓

---

### **SOD-11: Remediation (ACTION EXECUTION)**
**Who Sees It**: All Stakeholders (task owner view)  
**When Used**: Daily remediation status tracking  
**Data Freshness**: Real-time (task updates)  
**Key Metric**: % of tasks overdue; % complete this quarter  
**Action**: Execute remediation steps; close tasks  
**PRD Requirement**: "Remediation Recommendations" ✓

---

### **SOD-12: Continuous Compliance (GOVERNANCE ENGINE)**
**Who Sees It**: Compliance Officer, SOC (Security Operations Center)  
**When Used**: Real-time monitoring; quarterly trend review  
**Data Freshness**: Daily automated checks  
**Key Metric**: Compliance pass rate % (trend toward 95%+)  
**Action**: Tune rules; deploy new compliance checks  
**PRD Requirement**: "Continuous Compliance Enablement" ✓

---

## VIOLATION TYPES COVERED BY EACH PAGE

```
SOD-04: All P1/P2 urgency violations
├─ High-priority status (24-48h SLA)
├─ Cross-references all violation types
└─ Acts as "single pane of glass" for urgent action

SOD-05: Impact quantification (all types)
├─ Financial exposure calculation
├─ Operational impact assessment
├─ Framework compliance benchmarking
└─ Affects all violation types

SOD-06: Super-Admin Violations
├─ Unrestricted system access (SAP_ALL)
├─ Admin-equivalent roles
└─ Super-user concentrations

SOD-07: Cross-Process Conflicts
├─ Vendor Create + AP Payment (Procurement ↔ Finance)
├─ Goods Receipt + Invoice (MM ↔ FI)
├─ OTC partial overlap (multi-step control)
├─ System Admin + Transaction Execute (IT ↔ Business)
└─ Service Account + Master Data Change (IT ↔ All)

SOD-08: Emergency Access Violations
├─ Unapproved firefighter assignments
├─ Overly prolonged assignments (>30 days)
├─ Anomalous usage patterns (unusual timing/frequency)
└─ Lack of business justification

SOD-09: OTC Cycle Violations
├─ Full-cycle single user (Sales → Delivery → Invoice → Payment → Collection)
├─ Adjacent step overlap (e.g., Invoice + Payment)
├─ Partial cycle concentration
└─ Revenue recognition fraud risk

SOD-10: Service Account Violations
├─ Over-privileged non-human accounts (SAP_ALL equivalent)
├─ Dormant accounts (>60 days, not cleaned up)
├─ Unmanaged service account lifecycle
├─ Shared credentials across teams
└─ RFC/integration account backdoors

SOD-11: Remediation Task Status
├─ Role redesign actions
├─ Access removal actions
├─ Mitigating control implementations
├─ Policy enforcement
└─ Task SLA compliance

SOD-12: Continuous Monitoring
├─ Real-time rule violations
├─ Trending compliance metrics
├─ Rule deployment governance
├─ Exception management
└─ Compliance maturity trajectory
```

---

## REMEDIATION PATH FLOW

```
Step 1: Detection
├─ SOD-04: Identify P1/P2 violations
├─ SOD-05: Quantify impact
└─ (SOD-06 through SOD-10): Categorize by type

Step 2: Severity Assessment
├─ Financial impact? → SOD-05
├─ Process risk? → SOD-07
├─ Approval urgency? → SOD-04
└─ Timeline? → (SLA depends on type)

Step 3: Remediation Planning
├─ SOD-11: Create tasks by type
│   ├─ Role Redesign (typical 2-4 weeks)
│   ├─ Access Removal (immediate 1 day)
│   ├─ Mitigating Control (5-10 days)
│   └─ Policy (governance, varies)
└─ Assign to responsible team

Step 4: Execution & Tracking
├─ Team executes per SOD-11 task steps
├─ Status updates in real-time
├─ Audit trail documented
└─ Close task upon completion

Step 5: Validation & Monitoring
├─ SOD-12: Continuous rule checks for regression
├─ Quarterly assessment repeats
├─ Compliance maturity trending
└─ Feedback loop for rule tuning
```

---

## STAKEHOLDER VIEW MAPPING

```
CFO / Risk Officer (Board Visibility)
├─ SOD-05: Risk Impact Analysis
│   └─ $ Money at Risk (key metric)
└─ SOD-12: Compliance Maturity Trend
    └─ % Pass Rate trending toward 95%

IT Director / CIO
├─ SOD-06: Super Administrators (control scope)
├─ SOD-10: Service Accounts (technical debt)
└─ SOD-12: Continuous Monitoring (governance engine)

SAP Basis Lead / Security Team
├─ SOD-04: Immediate Actions (daily triage)
├─ SOD-06, SOD-07, SOD-08, SOD-09, SOD-10 (all violation types)
├─ SOD-11: Remediation Tasks (execution steps)
└─ SOD-12: Rules Deployment (continuous monitoring)

Compliance Officer / Internal Auditor
├─ SOD-04: Urgent violations (audit red flags)
├─ SOD-05: Risk Scoring (compliance exposure)
├─ SOD-11: Remediation evidence trail (audit trail)
└─ SOD-12: Continuous monitoring & compliance evidence

Process Owner (Procurement, Finance, OTC, HR)
├─ SOD-07: Their process conflicts (e.g., Procurement conflicts)
├─ SOD-09: OTC full-cycle analysis (finance process)
└─ SOD-11: Remediation impact (who loses access?)

Business User (Affected by Access Changes)
├─ SOD-11: Task notification (your access changing)
├─ Justification (why this is being revoked/changed)
└─ Timeline (when it happens)
```

---

## DATA FLOW & TECHNICAL ARCHITECTURE

```
SAP System Data Ingestion
├─ User master (USR02)
├─ Role assignments (AGR_USERS)
├─ Authorization objects (AGR_1250)
├─ User trace data (TCODE execution logs)
├─ Service accounts (BGD users, integrations)
└─ Transaction activity

KTern.AI AI Engine Processing
├─ SoD Violation Detection (rule matrix)
├─ Risk Scoring (financial + operational)
├─ Pattern Recognition (anomalies)
└─ Remediation Suggestion (AI-backed)

UI Rendering (9 SOD Pages)
├─ SOD-04: Urgent triage
├─ SOD-05: Executive risk summary
├─ SOD-06 through SOD-10: Violation categorization
├─ SOD-11: Remediation task execution
└─ SOD-12: Continuous monitoring dashboard

Output & Reporting
├─ Executive dashboards (PDF/Email)
├─ Audit evidence exports (Excel/PDF)
├─ API feeds (downstream systems)
└─ Continuous monitoring alerts (daily digest)
```

---

## KEY METRICS BY PAGE (EXECUTIVE SCORECARD)

| Page | KPI | Healthy State | Alert State | Trend |
|------|-----|---------------|-------------|-------|
| SOD-04 | P1 violations | <5 | >10 | ⬇ (declining = good) |
| SOD-05 | $ Money at Risk | <$2M | >$10M | ⬇ (declining = good) |
| SOD-06 | Super-admin count | 1-3 | >5 | ⬇ (consolidating = good) |
| SOD-07 | Fraud pairings | <10 | >50 | ⬇ (declining = good) |
| SOD-08 | Overdue firefighters | 0 | >3 | ⬇ (declining = good) |
| SOD-09 | Full-cycle users | 0 | >5 | ⬇ (declining = good) |
| SOD-10 | Over-privileged services | <5% | >20% | ⬇ (declining = good) |
| SOD-11 | Overdue tasks | <10% | >30% | ⬇ (declining = good) |
| SOD-12 | Compliance pass rate | 90%+ | <70% | ⬆ (increasing = good) |

---

## ASSESSMENT FREQUENCY & SLA

```
SOD-04: Immediate Actions
├─ Frequency: Real-time (continuous generation)
├─ Data Freshness: <1 hour
├─ SLA: P1 tasks within 24h, P2 within 5d
└─ Owner: Compliance Manager

SOD-05: Risk Impact Analysis
├─ Frequency: Per assessment run (quarterly)
├─ Data Freshness: Point-in-time snapshot
├─ SLA: Available within 48h of assessment completion
└─ Owner: Audit & Risk

SOD-06 through SOD-10: Violation Categories
├─ Frequency: Per assessment run (quarterly)
├─ Data Freshness: Point-in-time snapshot
├─ SLA: Available within 48h of assessment completion
└─ Owner: Basis Team (implementation) + Compliance (oversight)

SOD-11: Remediation Tasks
├─ Frequency: Continuous (new tasks as violations created)
├─ Data Freshness: Real-time task updates
├─ SLA: Task completion per priority (P1:24h, P2:5d, P3:12d, P4:14d)
└─ Owner: Assigned remediation owners

SOD-12: Continuous Compliance
├─ Frequency: Daily automated rule execution
├─ Data Freshness: Real-time (rule violations logged as they occur)
├─ SLA: Alert generated <1 hour of violation detection
└─ Owner: SOC (Security Operations Center)
```

---

## COMMON USE CASES BY ROLE

### **SAP License Manager (Lotte Chemical)**
1. **Monday Morning**: Review SOD-04 P1 violations (escalation check)
2. **Weekly**: Track SOD-11 remediation task progress (% complete)
3. **Monthly**: Check SOD-12 compliance pass rate trend (is it improving?)
4. **Quarterly**: Present SOD-05 executive summary to leadership (financial risk)

### **SAP Basis Team**
1. **Daily**: Triage SOD-04 actions; assign ownership
2. **As Needed**: Execute SOD-11 remediation steps (role changes, access removal)
3. **Weekly**: Monitor SOD-12 rule violations (adjust for false positives)
4. **Monthly**: Check SOD-06, SOD-10 for new super-admins or dormant accounts

### **IT Compliance / Auditor**
1. **Monthly**: SOD-04 executive summary (audit trail review)
2. **Quarterly**: Full assessment review (SOD-05 through SOD-12)
3. **Quarterly**: Validate SOD-11 remediation evidence (compliance proof)
4. **As Needed**: Export audit reports (Excel/PDF for regulatory filing)

### **CFO / Finance**
1. **Board Meeting**: SOD-05 financial risk summary (quarterly)
2. **Q-End Review**: SOD-09 OTC compliance (revenue cycle audit)
3. **Annual**: SOX control self-assessment (uses all pages for evidence)

### **IT Director / CIO**
1. **Strategic Review**: SOD-06 super-admin governance roadmap
2. **Monthly**: SOD-10 service account lifecycle (retirement planning)
3. **Executive Dashboard**: SOD-12 compliance maturity trend (KPI reporting)

---

## DEPLOYMENT SEQUENCE RECOMMENDATION

```
Phase 1: Foundation (Week 1-2)
├─ Deploy SOD-05 (Risk Impact Analysis)
├─ Deploy SOD-06 (Super Administrators) — highest organizational risk
└─ Deploy SOD-10 (Service Accounts) — high technical debt

Phase 2: Process Controls (Week 3-4)
├─ Deploy SOD-07 (Dual Process Controls)
├─ Deploy SOD-09 (OTC Controls) — if Finance is stakeholder
└─ Deploy SOD-08 (Emergency Access) — if firefighter usage is high

Phase 3: Execution & Monitoring (Week 5+)
├─ Deploy SOD-04 (Immediate Actions) — triage for all violations
├─ Deploy SOD-11 (Remediation) — task execution & tracking
└─ Deploy SOD-12 (Continuous Monitoring) — rules engine launch

Ongoing: Training & Refinement
├─ Monthly: Rule tuning based on false positives
├─ Quarterly: Assessment cycle refresh
└─ Annually: Framework update (new regulations, business changes)
```

---

## SUMMARY: 9 PAGES = COMPLETE SOD GOVERNANCE

| Stream | Focus | Pages | Outcome |
|--------|-------|-------|---------|
| **Detection** | What SoD violations exist? | SOD-04, SOD-05, SOD-06–10 | Risk inventory |
| **Quantification** | What is the business impact? | SOD-05 (financial), SOD-05 (framework) | Financial & compliance case for remediation |
| **Planning** | How do we fix it? | SOD-11 (task design & assignment) | Remediation roadmap + ownership |
| **Execution** | Who does what by when? | SOD-11 (task tracking + SLA) | Remediation velocity & accountability |
| **Monitoring** | How do we stay compliant? | SOD-12 (continuous rules engine) | Prevents regression; enables maturity |

✅ **Result**: Lotte Chemical achieves **audit-ready SoD compliance** with **measurable governance maturity**.

---

**For Questions**: Refer to SOD_DESIGN_ANALYSIS.md for detailed architecture & SAP context.
