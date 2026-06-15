import os
import json
import glob
import re

USER_DETAILS_DIR = os.environ.get("USER_DETAILS_DIR", os.path.join(os.path.dirname(os.path.abspath(__file__)), "user_details"))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MOCK_DATA_JSX = os.path.join(BASE_DIR, "src", "mock-data.jsx")
RUNS_MOCK_DATA_JSX = os.path.join(BASE_DIR, "src", "runs-mock-data.jsx")

# Rule Definitions
RULES_DEF = [
    {
        "id": "V-1042",
        "desc": "Create Vendor + Approve Payment authority",
        "p1": ["FK01", "FK02", "XK01", "XK02"],
        "p2": ["F110"],
        "severity": "Critical",
        "category": "Financial",
        "exposure": "High",
        "dollars": 2400000,
        "frameworks": ["SAP GRC", "SOX", "K-SOX"],
        "area": "Procurement",
        "action": "Revoke F110 or separate vendor creation"
    },
    {
        "id": "V-1058",
        "desc": "Full OTC cycle control (Order → Bill → Collect) by single user",
        "p1": ["VA01", "VA02"],
        "p2": ["VF01", "VF04"],
        "p3": ["F-28", "FB05"], # Checked via the 3-step or 4-step logic
        "severity": "Critical",
        "category": "Financial",
        "exposure": "High",
        "dollars": 1800000,
        "frameworks": ["SOX", "SAP GRC"],
        "area": "OTC",
        "action": "Split SD billing authority — redesign role ZSD_BR_BILLING_CREATE"
    },
    {
        "id": "V-1063",
        "desc": "GL Posting + Bank Reconciliation conflict via ZFI_BR_GL_POSTING",
        "p1": ["FB50", "FB01"],
        "p2": ["FF67", "FEBAN"],
        "severity": "Critical",
        "category": "Financial",
        "exposure": "High",
        "dollars": 3200000,
        "frameworks": ["SOX", "K-SOX", "SAP GRC"],
        "area": "Finance",
        "action": "Implement mitigating control · daily reviewer log"
    },
    {
        "id": "V-1071",
        "desc": "PFCG role-admin combined with end-user transaction access",
        "p1": ["PFCG", "SU01"],
        "p2": ["ME21N", "MIRO", "VA01", "VF01", "FB50", "F110"],
        "severity": "Critical",
        "category": "Operational",
        "exposure": "High",
        "dollars": 0,
        "frameworks": ["SAP GRC", "ISO 27001"],
        "area": "IT",
        "action": "Revoke PFCG from end-users"
    },
    {
        "id": "V-1082",
        "desc": "HR Payroll Maintain + Approve assigned to same user",
        "p1": ["PA30", "PA40"],
        "p2": ["PC00"],
        "severity": "High",
        "category": "Regulatory",
        "exposure": "Medium",
        "dollars": 0,
        "frameworks": ["SAP GRC", "GDPR", "K-SOX"],
        "area": "HR",
        "action": "Reassign approval to HR Compliance group"
    },
    {
        "id": "V-1090",
        "desc": "Firefighter ID active >180 days without re-attestation",
        # Custom logic for firefighter duration
        "severity": "High",
        "category": "Regulatory",
        "exposure": "High",
        "dollars": 0,
        "frameworks": ["SOX", "SAP GRC"],
        "area": "IT",
        "action": "Force expiry — set 30-day max per Lotte policy"
    },
    {
        "id": "V-1094",
        "desc": "PO Create + PO Release threshold exceeds user grade authority",
        "p1": ["ME21N", "ME22N"],
        "p2": ["ME29N", "ME28"],
        "severity": "High",
        "category": "Operational",
        "exposure": "Medium",
        "dollars": 640000,
        "frameworks": ["SAP GRC"],
        "area": "Procurement",
        "action": "Redesign ZPM_BR_PROCUREMENT_1720 release strategy"
    },
    {
        "id": "V-1101",
        "desc": "F110 Auto-Payment Run runnable by non-treasury users",
        # F110 is present but user has no treasury roles/dep
        "severity": "High",
        "category": "Financial",
        "exposure": "High",
        "dollars": 5100000,
        "frameworks": ["SAP GRC", "SOX", "K-SOX"],
        "area": "Finance",
        "action": "Restrict F110 to Treasury role pool"
    },
    {
        "id": "V-1112",
        "desc": "Customer Master Maintain + Sales Order Release",
        "p1": ["XD01", "XD02", "FD01", "FD02"],
        "p2": ["VA02"],
        "severity": "Medium",
        "category": "Financial",
        "exposure": "Medium",
        "dollars": 480000,
        "frameworks": ["SAP GRC", "SOX"],
        "area": "OTC",
        "action": "Monitor — flag for quarterly review"
    },
    {
        "id": "V-1124",
        "desc": "Background user RFC_BATCH_PI holds SAP_ALL equivalent",
        # Non-Dialog user with SAP_ALL
        "severity": "Critical",
        "category": "Operational",
        "exposure": "High",
        "dollars": 0,
        "frameworks": ["SAP GRC", "ISO 27001"],
        "area": "IT",
        "action": "Replace with scoped profile, rotate credentials"
    },
    {
        "id": "V-1131",
        "desc": "Goods Receipt + Invoice Verification by same user",
        "p1": ["MIGO"],
        "p2": ["MIRO"],
        "severity": "Medium",
        "category": "Financial",
        "exposure": "Medium",
        "dollars": 820000,
        "frameworks": ["SOX", "SAP GRC"],
        "area": "Procurement",
        "action": "Enable three-way match enforcement in MIRO"
    },
    {
        "id": "V-1144",
        "desc": "Vendor Bank Edit + Payment Block remove",
        "p1": ["FK02", "XK02"],
        "p2": ["FB02"],
        "severity": "High",
        "category": "Financial",
        "exposure": "High",
        "dollars": 1300000,
        "frameworks": ["SAP GRC", "SOX", "K-SOX", "GDPR"],
        "area": "Finance",
        "action": "Move bank-detail edit to Vendor Master team only"
    },
    {
        "id": "V-1152",
        "desc": "Personnel data export without retention",
        "p1": ["PA30", "PA40", "PA20"],
        "p2": ["S_DATASET"],
        "severity": "Medium",
        "category": "Regulatory",
        "exposure": "Medium",
        "dollars": 0,
        "frameworks": ["SAP GRC", "GDPR"],
        "area": "HR",
        "action": "Implement HR data masking"
    },
    {
        "id": "V-1167",
        "desc": "Audit log table write access — non-IT",
        "p1": ["SM18", "SM19", "SM20"],
        "severity": "High",
        "category": "Regulatory",
        "exposure": "High",
        "dollars": 0,
        "frameworks": ["SAP GRC", "SOX", "ISO 27001"],
        "area": "IT",
        "action": "Revoke audit log write from non-IT users"
    },
    {
        "id": "V-1174",
        "desc": "Production change deploy without approval",
        "p1": ["STMS"],
        "severity": "High",
        "category": "Operational",
        "exposure": "High",
        "dollars": 0,
        "frameworks": ["SAP GRC", "ISO 27001"],
        "area": "IT",
        "action": "Implement transport approval workflow"
    }
]

OWNER_NAME_MAP = {
    "P000004": "Seo-yeon Kim (Basis Admin)",
    "P000095": "Min-woo Lee (Compliance Lead)",
    "P000006": "Ji-hun Park (Security Analyst)",
    "P000022": "Yeon-hee Choi (Finance Controller)",
    "P001268": "Ravi Sharma (Basis Architect)",
    "P004088": "Sarah Jenkins (AP Manager)"
}

def resolve_assignee(val, process):
    if val and val in OWNER_NAME_MAP:
        return OWNER_NAME_MAP[val]
    if val and val.startswith("P") and val[1:].isdigit():
        return f"IT Compliance ({val})"
    if not val:
        return "SAP Security Team" if "basis" in str(process).lower() else "IT Compliance"
    return val

def generate_fallback_users(risks_catalog):
    mock_users = []
    metadata_path = os.path.join(BASE_DIR, "src", "original_users_metadata.json")
    if not os.path.exists(metadata_path):
        print(f"Error: metadata file not found at {metadata_path}")
        return mock_users
        
    with open(metadata_path, "r", encoding="utf-8") as f:
        original_users = json.load(f)
        
    for idx, record in enumerate(original_users):
        username = record["userId"]
        first_name = record["firstName"]
        last_name = record["lastName"]
        email = record["email"]
        status = record["sapStatus"]
        user_type = record["accountType"]
        license_type = record["license"]
        
        # Select 3-4 deterministic risks from risks_catalog
        risk_total = 4 if idx % 3 == 0 else 3
        selected = []
        if risks_catalog:
            for offset in range(risk_total):
                risk_item = risks_catalog[(idx * 3 + offset * 5) % len(risks_catalog)]
                selected.append(risk_item)
                
        roles = []
        if record.get("role") and record["role"] != "NA":
            roles.append(record["role"])
            
        tx_codes = set()
        
        for risk in selected:
            r_id = risk["riskId"]
            tcodes_str = risk.get("conflictingTransactions", "")
            if tcodes_str:
                for t in tcodes_str.split(","):
                    t_clean = t.strip()
                    if t_clean:
                        tx_codes.add(t_clean)
                        
            for fid in risk.get("functionIds", []):
                roles.append(f"Z_{fid}")
                
            if r_id == "V-1090":
                roles.append("ZBC_BR_SPM_FIREFIGHTER")
                tx_codes.update(["STMS", "SU01", "PFCG", "SM20", "SE01"])
            if r_id == "V-1101":
                tx_codes.add("F110")
            if r_id == "V-1124":
                roles.append("SAP_ALL")
            if r_id == "V-1071":
                tx_codes.update(["PFCG", "SU01", "ME21N", "MIRO", "VA01", "VF01", "FB50", "F110"])
            if r_id == "V-1058":
                tx_codes.update(["VA01", "VA02", "VF01", "VF04", "F-28", "FB05"])
                
        if "FF" in username:
            roles.append("ZBC_BR_SPM_FIREFIGHTER")
            
        mock_users.append({
            "userInfo": {
                "username": username,
                "firstName": first_name,
                "lastName": last_name,
                "emailId": email,
                "status": status,
                "lastLogin": "2026-05-19 12:00:00",
                "userType": user_type,
                "license": license_type
            },
            "authSummary": {
                "totalRoles": max(record["rolesCount"], len(roles))
            },
            "roleBreakdown": [{"role": r, "authObjects": [{"authObj": "S_TCODE"}]} for r in list(set(roles))],
            "authorizedTransactions": [{"tCode": t} for t in tx_codes]
        })
    return mock_users

def generate():
    files = glob.glob(os.path.join(USER_DETAILS_DIR, "user__*.json"))
    print(f"Parsing {len(files)} files...")
    
    users_data = []
    
    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                users_data.append(data)
            except Exception as e:
                print(f"Error loading {fpath}: {e}")
                
    # We will load users_data fallback after ruleset parsing to pass risks_catalog
    
    # Ruleset Parsing
    RULESET_BASE = os.path.join(BASE_DIR, "..", "sodruleset", "OneDrive_2026-06-02 1", "Standard RUleset deactivation")
    S4HANAOP_DIR = os.path.join(RULESET_BASE, "S4HANAOP")
    ALL_DIR = os.path.join(RULESET_BASE, "ALL")

    def read_tsv(filepath):
        encodings = ["utf-8", "utf-16", "cp1252", "iso-8859-1"]
        for enc in encodings:
            try:
                with open(filepath, "r", encoding=enc) as f:
                    lines = f.readlines()
                return lines, enc
            except UnicodeDecodeError:
                continue
        raise Exception(f"Failed to read {filepath} with any encoding")

    # 1. Business Processes
    bp_map = {}
    bp_file = os.path.join(ALL_DIR, "ALL_Business_Processes.txt")
    lines, enc = read_tsv(bp_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 3:
            bp_id, langu, desc = parts[0], parts[1], parts[2]
            if langu == "EN":
                bp_map[bp_id] = desc.strip()
                
    # 2. Functions
    func_desc_map = {}
    func_file = os.path.join(ALL_DIR, "ALL_Functions.txt")
    lines, enc = read_tsv(func_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 3:
            func_id, langu, desc = parts[0], parts[1], parts[2]
            if langu == "EN":
                func_desc_map[func_id] = desc.strip()

    # 3. Actions (T-codes)
    func_actions = {}
    action_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Function_Action.txt")
    lines, enc = read_tsv(action_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 2:
            func_id, action = parts[0], parts[1]
            func_actions.setdefault(func_id, []).append(action)

    # 4. Permissions (Auth Objects)
    func_auths = {}
    perm_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Function_Permission.txt")
    lines, enc = read_tsv(perm_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 3:
            func_id, _, auth_obj = parts[0], parts[1], parts[2]
            if auth_obj and auth_obj != "S_TCODE" and auth_obj != "S_SERVICE":
                func_auths.setdefault(func_id, set()).add(auth_obj)

    # 5. Owners
    owner_map = {}
    owner_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Risk_Owners.txt")
    lines, enc = read_tsv(owner_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 2:
            risk_id, owner_id = parts[0], parts[1]
            owner_map.setdefault(risk_id, []).append(owner_id)

    # 6. Risk Descriptions
    risk_desc_map = {}
    desc_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Risks_Description.txt")
    lines, enc = read_tsv(desc_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 4:
            risk_id, langu, desc, long_desc = parts[0], parts[1], parts[2], parts[3]
            if langu == "EN":
                risk_desc_map[risk_id] = {
                    "scenario": desc.strip('" '),
                    "businessImpact": long_desc.strip('" ')
                }

    # 7. Risks
    risks_catalog = []
    risks_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Risks.txt")
    lines, enc = read_tsv(risks_file)
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 10:
            risk_id = parts[0]
            funct_ids = [f for f in parts[1:6] if f.strip()]
            bp_id = parts[6]
            risk_level = parts[7]
            active = parts[8]
            risk_type = parts[9]
            
            desc_info = risk_desc_map.get(risk_id, {"scenario": f"SoD Conflict for Risk {risk_id}", "businessImpact": "Potential access control violation."})
            bp_name = bp_map.get(bp_id, bp_id)
            
            funct_names = []
            conflicting_tcodes = []
            auth_objects = set()
            for fid in funct_ids:
                fname = func_desc_map.get(fid, fid)
                clean_name = fname
                prefix_pattern = re.compile(rf'^{fid}\s*[:\-]?\s*', re.IGNORECASE)
                clean_name = prefix_pattern.sub('', fname).strip()
                funct_names.append(f"{fid} - {clean_name}")
                conflicting_tcodes.extend(func_actions.get(fid, []))
                auth_objects.update(func_auths.get(fid, []))
            
            owners = owner_map.get(risk_id, [])
            assignee_id = owners[0] if owners else None
            assignee = resolve_assignee(assignee_id, bp_name)
            
            level = int(risk_level) if risk_level.isdigit() else 1
            severity = "High" if level == 2 else "Medium" if level == 1 else "Low"
            score = 90 if level == 2 else 70 if level == 1 else 40
            priority = "P1" if level == 2 else "P2" if level == 1 else "P3"
            
            proc = str(bp_name).lower()
            if 'finance' in proc or 'cash' in proc or 'order to cash' in proc:
                category = "Financial"
            elif 'procure' in proc or 'pay' in proc:
                category = "Procurement"
            elif 'human' in proc or 'resource' in proc:
                category = "Regulatory"
            elif 'basis' in proc or 'it' in proc:
                category = "Technical"
            else:
                category = "Operational"
                
            role_type = "Critical Action" if risk_type == "2" else "SoD Conflict"
            rec_action = f"Separate access for {funct_names[0] if len(funct_names) > 0 else 'Function A'} and {funct_names[1] if len(funct_names) > 1 else 'Function B'}; remove conflicting action or authorization object from one role."
            
            risks_catalog.append({
                "riskId": risk_id,
                "functionIds": funct_ids,
                "functionNames": funct_names,
                "businessProcess": bp_name,
                "riskLevel": level,
                "riskType": risk_type,
                "scenario": desc_info["scenario"],
                "businessImpact": desc_info["businessImpact"],
                "conflictingTransactions": ", ".join(sorted(list(set(conflicting_tcodes)))[:8]),
                "authObjects": ", ".join(sorted(list(auth_objects))[:6]),
                "title": desc_info["scenario"],
                "status": "Active",
                "level": severity,
                "severity": severity,
                "riskScore": score,
                "priority": priority,
                "category": category,
                "riskCategory": category,
                "process": bp_name,
                "roleType": role_type,
                "standardsViolated": "SAP GRC Global Ruleset, SOX, Internal Access Control",
                "recommendedAction": rec_action,
                "recommendations": rec_action,
                "assignee": assignee
            })
    
    if not users_data:
        print("No user files found. Using fallback generator with original_users_metadata.json to create mock users.")
        users_data = generate_fallback_users(risks_catalog)
        
    total_users_count = len(users_data)
    
    # 1. Scanned Users & SoD Checks
    super_admins_detected = []
    firefighters_detected = []
    service_accounts_detected = []
    violators = set()
    
    # Track violations for each rule ID
    violations_by_rule = {r["id"]: [] for r in RULES_DEF}
    role_concentrations = {}
    
    for data in users_data:
        uinfo = data.get("userInfo", {})
        username = uinfo.get("username", "")
        first_name = uinfo.get("firstName", "")
        last_name = uinfo.get("lastName", "")
        fullname = f"{first_name} {last_name}".strip() or username
        email = uinfo.get("emailId", "")
        status = uinfo.get("status", "Not Locked")
        last_login = uinfo.get("lastLogin", "2026-05-19 12:00:00")
        user_type = uinfo.get("userType", "Dialog")
        
        auth_summary = data.get("authSummary", {})
        total_roles = auth_summary.get("totalRoles", 0)
        
        role_breakdown = data.get("roleBreakdown", [])
        roles = [r.get("role") for r in role_breakdown if r.get("role")]
        for r in roles:
            role_concentrations[r] = role_concentrations.get(r, 0) + 1
            
        auth_txs = data.get("authorizedTransactions", [])
        tx_codes = {t.get("tCode") for t in auth_txs if t.get("tCode")}
        
        # Super Admins check
        is_sap_all = any("SAP_ALL" in r or "SAP_NEW" in r for r in roles)
        has_su01_pfcg = "SU01" in tx_codes and "PFCG" in tx_codes
        
        user_roles_list = []
        for r_item in role_breakdown:
            rname = r_item.get("role")
            auth_objs_set = set()
            for obj in r_item.get("authObjects", []):
                if obj.get("authObj"):
                    auth_objs_set.add(obj.get("authObj"))
            user_roles_list.append({
                "role": rname,
                "desc": f"Role: {rname}",
                "authObjects": list(auth_objs_set)[:10]
            })
            
        if is_sap_all or has_su01_pfcg:
            indicator = "SAP_ALL equivalent" if is_sap_all else "PFCG + SU01 combo"
            super_admins_detected.append({
                "user": username,
                "name": fullname,
                "userId": username,
                "indicator": indicator,
                "score": 98 if is_sap_all else 94,
                "severity": "Critical",
                "recommendation": "Revoke",
                "systems": ["LCKR-PRD-01"],
                "status": "Open",
                "assignee": None,
                "lastChange": last_login.split(" ")[0] if last_login else "2026-05-19",
                "rationale": f"User holds {indicator} permissions, granting administrative control over users and authorizations.",
                "roles": user_roles_list[:4]
            })
            
        # Firefighter check
        is_ff = username.startswith("FF_") or "FF" in username or any("FIREFIGHTER" in r or "SPM" in r for r in roles)
        if is_ff:
            firefighters_detected.append({
                "id": f"EA-FF-{len(firefighters_detected)+1}",
                "user": username,
                "name": fullname,
                "ffId": username,
                "role": roles[0] if roles else "Basis Emergency",
                "start": "2026-04-01",
                "end": last_login.split(" ")[0] if last_login else "2026-05-19",
                "usage": len(tx_codes),
                "approval": "Missing" if "Basis" in fullname or "IT" in fullname else "Approved",
                "anomalyFlag": True if len(tx_codes) > 10 else False,
                "anomalyReason": "High transaction usage detected" if len(tx_codes) > 10 else "",
                "recommendation": "Review firefighting session logs",
                "status": "Open",
                "assignee": None,
                "log": [{"date": last_login, "tcode": list(tx_codes)[0] if tx_codes else "SU01", "desc": "Transaction executed"}]
            })
            
        # Service Account check
        if user_type != "Dialog":
            service_accounts_detected.append({
                "id": f"SA-{len(service_accounts_detected)+1}",
                "account": username,
                "type": user_type,
                "privilege": "Critical" if is_sap_all else "High" if len(roles) > 5 else "Medium",
                "lastActivity": last_login.split(" ")[0] if last_login else "2026-05-19",
                "daysSince": 1,
                "inactive": False,
                "owner": "SAP Basis Team" if "Basis" in fullname else "IT Compliance",
                "unmanaged": False if ("Basis" in fullname or "IT" in fullname) else True,
                "risk": "Critical · SAP_ALL equivalent" if is_sap_all else "High privilege technical account",
                "roles": [{"role": r, "desc": f"Role: {r}"} for r in roles[:3]],
                "log": [{"date": last_login, "desc": "Service activity logged"}],
                "recommendation": "Rotate credentials periodically",
                "status": "Open",
                "assignee": None
            })
            
        # SoD Rules Scan
        for rule in RULES_DEF:
            r_id = rule["id"]
            
            if r_id == "V-1090": # Firefighter rule
                if is_ff:
                    violators.add(username)
                    violations_by_rule[r_id].append({
                        "userId": username,
                        "name": fullname,
                        "dept": "IT Basis",
                        "roles": len(roles),
                        "riskScore": 75
                    })
                continue
                
            if r_id == "V-1101": # F110 runnable by non-treasury
                if "F110" in tx_codes and not any("TREASURY" in r.upper() or "TRM" in r.upper() for r in roles):
                    violators.add(username)
                    violations_by_rule[r_id].append({
                        "userId": username,
                        "name": fullname,
                        "dept": "Finance",
                        "roles": len(roles),
                        "riskScore": 75
                    })
                continue
                
            if r_id == "V-1124": # Non-dialog with SAP_ALL
                if user_type != "Dialog" and is_sap_all:
                    violators.add(username)
                    violations_by_rule[r_id].append({
                        "userId": username,
                        "name": fullname,
                        "dept": "IT Basis",
                        "roles": len(roles),
                        "riskScore": 100
                    })
                continue
                
            if r_id == "V-1058": # OTC Cycle check
                steps_owned = []
                if any(t in tx_codes for t in ["VA01", "VA02"]): steps_owned.append("order")
                if any(t in tx_codes for t in ["VL01N", "VL02N"]): steps_owned.append("delivery")
                if any(t in tx_codes for t in ["VF01", "VF02", "VF04"]): steps_owned.append("billing")
                if any(t in tx_codes for t in ["F-28", "FB05", "FBL5N"]): steps_owned.append("collection")
                
                if len(steps_owned) >= 3:
                    violators.add(username)
                    violations_by_rule[r_id].append({
                        "userId": username,
                        "name": fullname,
                        "dept": "Sales" if "Sales" in str(roles) else "Finance",
                        "roles": len(roles),
                        "riskScore": 90 if len(steps_owned) == 4 else 75
                    })
                continue
                
            # General p1 + p2 checks
            has_p1 = any(t in tx_codes for t in rule.get("p1", []))
            has_p2 = any(t in tx_codes for t in rule.get("p2", []))
            if has_p1 and has_p2:
                violators.add(username)
                violations_by_rule[r_id].append({
                    "userId": username,
                    "name": fullname,
                    "dept": "Finance" if "FI" in str(roles) else "Procurement" if "PM" in str(roles) else "Sales",
                    "roles": len(roles),
                    "riskScore": 90 if rule["severity"] == "Critical" else 75
                })

    # Prepare dashboard outputs
    total_violations_count = sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF)
    critical_violations_count = sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["severity"] == "Critical")
    high_violations_count = sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["severity"] == "High")
    medium_violations_count = sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["severity"] == "Medium")
    low_violations_count = sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["severity"] == "Low")
    compliance_score = (1.0 - (len(violators) / total_users_count)) * 100.0
    
    # Sort roles
    sorted_roles = sorted(role_concentrations.items(), key=lambda x: x[1], reverse=True)[:10]
    role_concentration_list = [{"role": r[0], "users": r[1], "category": "Basis" if "BASIS" in r[0] else "Finance" if "FI" in r[0] else "Procurement"} for r in sorted_roles]
    
    # 2. Critical Findings Summary
    critical_findings = []
    for r in RULES_DEF:
        viol = violations_by_rule[r["id"]]
        if len(viol) > 0:
            critical_findings.append({
                "id": r["id"],
                "desc": r["desc"],
                "users": len(viol),
                "severity": r["severity"],
                "area": r["area"],
                "action": r["action"],
                "affectedUsersList": viol
            })
            
    # 3. Immediate Actions (P1 urgency limit to 7)
    immediate_actions = []
    ia_idx = 1
    for r in RULES_DEF:
        if r["severity"] == "Critical":
            viol = violations_by_rule[r["id"]]
            for v in viol[:3]:
                immediate_actions.append({
                    "id": f"IA-2{ia_idx:02d}",
                    "desc": f"{v['userId']} holds {r['desc']} in PRD",
                    "urgency": "P1 · 24h",
                    "user": v["userId"],
                    "action": r["action"],
                    "risk": f"Potential {r['category'].lower()} exposure of ${r['dollars']:,}" if r["dollars"] > 0 else "System security threat",
                    "status": "Open",
                    "assignee": None
                })
                ia_idx += 1
                
    # 4. Impact split, frameworks & rows
    impact_split = [
        { "category": "Financial",   "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["category"] == "Financial"), "dollars": sum(r["dollars"] * len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["category"] == "Financial"), "color": "#EF4444" },
        { "category": "Operational", "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["category"] == "Operational"), "dollars": 0, "color": "#475569" },
        { "category": "Regulatory",  "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["category"] == "Regulatory"), "dollars": 0, "color": "#94A3B8" }
    ]
    
    framework_breakdown = [
        { "framework": "SOX",       "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if "SOX" in r["frameworks"]), "criticality": "Critical" },
        { "framework": "K-SOX",     "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if "K-SOX" in r["frameworks"]), "criticality": "Critical" },
        { "framework": "SAP GRC",   "count": total_violations_count, "criticality": "High" },
        { "framework": "GDPR",      "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if "GDPR" in r["frameworks"]), "criticality": "High" },
        { "framework": "ISO 27001", "count": sum(len(violations_by_rule[r["id"]]) for r in RULES_DEF if "ISO 27001" in r["frameworks"]), "criticality": "Medium" }
    ]
    
    impact_rows = []
    for r in RULES_DEF:
        viol = violations_by_rule[r["id"]]
        if len(viol) > 0:
            impact_rows.append({
                "id": r["id"],
                "desc": r["desc"],
                "category": r["category"],
                "exposure": r["exposure"],
                "dollars": r["dollars"] if r["dollars"] > 0 else None,
                "areas": [r["area"]],
                "frameworks": r["frameworks"],
                "users": len(viol),
                "linked": []
            })
            
    # 5. Dual Process Controls
    conflict_matrix_data = {
        "CV": {"AP": 0, "GR": 0, "IV": 0, "PM": 0, "SO": 0, "BL": 0, "GL": 0},
        "AP": {"GR": 0, "IV": 0, "PM": 0, "SO": 0, "BL": 0, "GL": 0},
        "GR": {"IV": 0, "PM": 0, "SO": 0, "BL": 0, "GL": 0},
        "IV": {"PM": 0, "SO": 0, "BL": 0, "GL": 0},
        "PM": {"SO": 0, "BL": 0, "GL": 0},
        "SO": {"BL": 0, "GL": 0},
        "BL": {"GL": 0}
    }
    
    # Compute conflict pairing matrix
    # P1/P2 conflict pairings mapping
    cv_set = {"FK01", "FK02", "XK01", "XK02"}
    ap_set = {"ME29N", "ME28"}
    gr_set = {"MIGO"}
    iv_set = {"MIRO"}
    pm_set = {"F110"}
    so_set = {"VA01", "VA02"}
    bl_set = {"VF01", "VF02", "VF04"}
    gl_set = {"FB50", "FB01"}
    
    dual_process_rows = []
    dp_idx = 1
    for data in users_data:
        uinfo = data.get("userInfo", {})
        username = uinfo.get("username", "")
        first_name = uinfo.get("firstName", "")
        last_name = uinfo.get("lastName", "")
        fullname = f"{first_name} {last_name}".strip() or username
        auth_txs = data.get("authorizedTransactions", [])
        tx_codes = {t.get("tCode") for t in auth_txs if t.get("tCode")}
        
        has_cv = any(t in tx_codes for t in cv_set)
        has_ap = any(t in tx_codes for t in ap_set)
        has_gr = any(t in tx_codes for t in gr_set)
        has_iv = any(t in tx_codes for t in iv_set)
        has_pm = any(t in tx_codes for t in pm_set)
        has_so = any(t in tx_codes for t in so_set)
        has_bl = any(t in tx_codes for t in bl_set)
        has_gl = any(t in tx_codes for t in gl_set)
        
        # Populate upper triangle conflict matrix
        if has_cv and has_ap: conflict_matrix_data["CV"]["AP"] += 1
        if has_cv and has_gr: conflict_matrix_data["CV"]["GR"] += 1
        if has_cv and has_iv: conflict_matrix_data["CV"]["IV"] += 1
        if has_cv and has_pm: conflict_matrix_data["CV"]["PM"] += 1
        if has_cv and has_so: conflict_matrix_data["CV"]["SO"] += 1
        if has_cv and has_bl: conflict_matrix_data["CV"]["BL"] += 1
        if has_cv and has_gl: conflict_matrix_data["CV"]["GL"] += 1
        
        if has_ap and has_gr: conflict_matrix_data["AP"]["GR"] += 1
        if has_ap and has_iv: conflict_matrix_data["AP"]["IV"] += 1
        if has_ap and has_pm: conflict_matrix_data["AP"]["PM"] += 1
        if has_ap and has_so: conflict_matrix_data["AP"]["SO"] += 1
        if has_ap and has_bl: conflict_matrix_data["AP"]["BL"] += 1
        if has_ap and has_gl: conflict_matrix_data["AP"]["GL"] += 1
        
        if has_gr and has_iv: conflict_matrix_data["GR"]["IV"] += 1
        if has_gr and has_pm: conflict_matrix_data["GR"]["PM"] += 1
        if has_gr and has_so: conflict_matrix_data["GR"]["SO"] += 1
        if has_gr and has_bl: conflict_matrix_data["GR"]["BL"] += 1
        if has_gr and has_gl: conflict_matrix_data["GR"]["GL"] += 1
        
        if has_iv and has_pm: conflict_matrix_data["IV"]["PM"] += 1
        if has_iv and has_so: conflict_matrix_data["IV"]["SO"] += 1
        if has_iv and has_bl: conflict_matrix_data["IV"]["BL"] += 1
        if has_iv and has_gl: conflict_matrix_data["IV"]["GL"] += 1
        
        if has_pm and has_so: conflict_matrix_data["PM"]["SO"] += 1
        if has_pm and has_bl: conflict_matrix_data["PM"]["BL"] += 1
        if has_pm and has_gl: conflict_matrix_data["PM"]["GL"] += 1
        
        if has_so and has_bl: conflict_matrix_data["SO"]["BL"] += 1
        if has_so and has_gl: conflict_matrix_data["SO"]["GL"] += 1
        
        if has_bl and has_gl: conflict_matrix_data["BL"]["GL"] += 1
        
        # Check specific pairings for dual process log rows
        pairs = [
            ("CV", "PM", cv_set, pm_set, "Critical", "Create Vendor + Payment Approval"),
            ("AP", "IV", ap_set, iv_set, "Critical", "Approve PO + Invoice Verify"),
            ("GR", "IV", gr_set, iv_set, "High", "Goods Receipt + Invoice Verify"),
            ("SO", "BL", so_set, bl_set, "Critical", "Sales Order + Billing Create"),
            ("GL", "PM", gl_set, pm_set, "High", "GL Posting + Payment Approval"),
        ]
        
        for k1, k2, s1, s2, sev, label in pairs:
            t1 = [t for t in s1 if t in tx_codes]
            t2 = [t for t in s2 if t in tx_codes]
            if t1 and t2:
                dual_process_rows.append({
                    "id": f"DP-{3000 + dp_idx}",
                    "user": username,
                    "name": fullname,
                    "p1": k1,
                    "p2": k2,
                    "tcodes": t1 + t2,
                    "severity": sev,
                    "status": "Open",
                    "assignee": None,
                    "execHistory": [
                        { "date": "2026-05-18", "tcode": t1[0], "doc": f"Activity in {k1}" },
                        { "date": "2026-05-19", "tcode": t2[0], "doc": f"Activity in {k2}" }
                    ]
                })
                dp_idx += 1
                
    # 6. OTC steps & rows
    otc_rows = []
    otc_idx = 1
    for data in users_data:
        uinfo = data.get("userInfo", {})
        username = uinfo.get("username", "")
        first_name = uinfo.get("firstName", "")
        last_name = uinfo.get("lastName", "")
        fullname = f"{first_name} {last_name}".strip() or username
        auth_txs = data.get("authorizedTransactions", [])
        tx_codes = {t.get("tCode") for t in auth_txs if t.get("tCode")}
        
        steps_owned = []
        tcodes_used = []
        
        if any(t in tx_codes for t in ["VA01", "VA02"]):
            steps_owned.append("order")
            tcodes_used.append("VA01")
        if any(t in tx_codes for t in ["VL01N", "VL02N"]):
            steps_owned.append("delivery")
            tcodes_used.append("VL01N")
        if any(t in tx_codes for t in ["VF01", "VF02", "VF04"]):
            steps_owned.append("billing")
            tcodes_used.append("VF01")
        if any(t in tx_codes for t in ["F-28", "FB05", "FBL5N"]):
            steps_owned.append("collection")
            tcodes_used.append("F-28")
            
        if len(steps_owned) >= 2:
            otc_rows.append({
                "id": f"OTC-{500 + otc_idx}",
                "user": username,
                "name": fullname,
                "steps": steps_owned,
                "tcodes": tcodes_used,
                "exposure": "High" if len(steps_owned) >= 3 else "Medium",
                "amount": len(steps_owned) * 200000,
                "severity": "Critical" if len(steps_owned) == 4 else "High" if len(steps_owned) == 3 else "Medium",
                "status": "Open",
                "assignee": None,
                "recommendation": "Split SD billing authority and segregate collection duties",
                "transactions": [
                    { "date": "2026-05-18 10:00", "tcode": t, "doc": f"OTC step activity for {t}" } for t in tcodes_used
                ]
            })
            otc_idx += 1
            
    otc_kpis = {
        "totalViolators": len(otc_rows),
        "fullCycleControllers": len([r for r in otc_rows if len(r["steps"]) == 4]),
        "partialControllers": len([r for r in otc_rows if len(r["steps"]) < 4]),
        "totalDollarExposure": sum(r["amount"] for r in otc_rows),
        "deltas": {
            "totalViolators": 0,
            "fullCycleControllers": 0,
            "partialControllers": 0,
            "totalDollarExposure": 0
        }
    }
    
    # 7. Remediations & Governance suggestions
    remediations = []
    rem_idx = 1
    for r in RULES_DEF:
        viol = violations_by_rule[r["id"]]
        if len(viol) > 0:
            remediations.append({
                "id": f"R-{r['id'].split('-')[1]}",
                "violationId": r["id"],
                "type": "Access Removal" if r["severity"] == "Critical" else "Role Redesign",
                "priority": "P1" if r["severity"] == "Critical" else "P2",
                "status": "Open",
                "assignee": None,
                "due": "2026-06-15",
                "overdue": False,
                "title": f"Resolve conflict for {r['desc']}",
                "rationale": f"Users holding conflicting permissions represent a compliance violation of type {r['desc']}.",
                "steps": [
                    "Identify contributing roles for users",
                    f"Remove conflicting transactions {r.get('p2', [])} from roles or revoke assignments",
                    "Verify access removal in SU01"
                ]
            })
            rem_idx += 1
            
    remediations_kpis = {
        "total": len(remediations),
        "open": len(remediations),
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
    }
    
    # Final trend details
    compliance_trend_data = [
        { "run": "Run 1", "passRate": 88.1, "violations": total_violations_count + 100, "resolved": 45  },
        { "run": "Run 2", "passRate": 89.4, "violations": total_violations_count + 80,  "resolved": 58  },
        { "run": "Run 3", "passRate": 90.0, "violations": total_violations_count + 60,  "resolved": 67  },
        { "run": "Run 4", "passRate": 90.8, "violations": total_violations_count + 40,  "resolved": 79  },
        { "run": "Run 5", "passRate": 91.5, "violations": total_violations_count + 30,  "resolved": 88  },
        { "run": "Run 6", "passRate": 92.1, "violations": total_violations_count + 20,  "resolved": 97  },
        { "run": "Run 7", "passRate": 92.9, "violations": total_violations_count + 15,  "resolved": 105 },
        { "run": "Run 8", "passRate": 93.4, "violations": total_violations_count + 10,  "resolved": 112 },
        { "run": "Run 9", "passRate": float(f"{compliance_score:.1f}"), "violations": total_violations_count, "resolved": 121 }
    ]

    violations_by_user_id = {}
    for rule in RULES_DEF:
        for idx, item in enumerate(violations_by_rule.get(rule["id"], [])):
            user_id = item["userId"]
            if user_id not in violations_by_user_id:
                if rule["severity"] == "Critical":
                    status = "Resolved" if idx % 5 == 0 else "In Progress" if idx % 3 == 0 else "Open"
                elif rule["severity"] == "High":
                    status = "Resolved" if idx % 4 == 0 else "In Progress" if idx % 2 == 0 else "Open"
                else:
                    status = "Resolved" if idx % 3 == 0 else "In Progress" if idx % 2 == 0 else "Open"
                is_financial = rule["area"] in ("Finance", "Procurement", "OTC")
                violation_desc = "Full OTC cycle control by single user" if rule["id"] == "V-1058" else "Create Vendor + Approve Payment"
                conflicting_transactions = "VA01, VF01, F-28" if violation_desc.startswith("Full OTC") else "FK01, F110"
                business_impact = (
                    "SOX §404 deficiency and revenue leakage potential. Bypasses dual controls."
                    if violation_desc.startswith("Full OTC")
                    else "Enables creation of fictitious suppliers paired with payment releases."
                )
                violations_by_user_id[user_id] = {
                    "violationId": rule["id"],
                    "violationDesc": violation_desc,
                    "riskCategory": "Financial" if is_financial else "Operational",
                    "severity": rule["severity"],
                    "riskScore": item.get("riskScore", 100 if rule["severity"] == "Critical" else 75 if rule["severity"] == "High" else 50),
                    "conflictingTransactions": conflicting_transactions,
                    "businessImpact": business_impact,
                    "standardsViolated": ", ".join(rule["frameworks"]),
                    "recommendedAction": rule["action"],
                    "priority": "P1" if rule["severity"] == "Critical" else "P2" if rule["severity"] == "High" else "P3",
                    "status": status,
                    "assignee": "SAP Security Team" if rule["area"] == "IT" else "IT Compliance",
                    "processArea": item.get("dept", rule["area"])
                }
    all_scanned_users = []
    for idx, data in enumerate(users_data):
        uinfo = data.get("userInfo", {})
        username = uinfo.get("username", "")
        first_name = uinfo.get("firstName", "")
        last_name = uinfo.get("lastName", "")
        auth_summary = data.get("authSummary", {})
        role_breakdown = data.get("roleBreakdown", [])
        roles = [r.get("role") for r in role_breakdown if r.get("role")]
        user_type = uinfo.get("userType", "Dialog")
        
        # Select 3-4 deterministic risks from risks_catalog
        risk_total = 4 if idx % 3 == 0 else 3
        selected = []
        for offset in range(risk_total):
            risk_item = risks_catalog[(idx * 3 + offset * 5) % len(risks_catalog)]
            selected.append(risk_item)
            
        first_risk = selected[0]
        role = roles[0] if roles else "Display Access Role"
        
        base = {
            "userId": username,
            "firstName": first_name or username.split(".")[0].title(),
            "lastName": last_name or (" ".join(username.split(".")[1:]).title() if "." in username else ""),
            "fullName": f"{first_name} {last_name}".strip() or username,
            "email": uinfo.get("emailId") or f"{username.lower().replace(' ', '.')}@lottechem.com",
            "sapStatus": uinfo.get("status") or "Not Locked",
            "license": uinfo.get("license", ""),
            "role": role,
            "roleType": "Composite" if len(roles) > 1 else "Single",
            "rolesCount": auth_summary.get("totalRoles", len(roles)),
            "riskViolations": selected,
            "riskId": first_risk["riskId"],
            "violationId": first_risk["riskId"],
            "violationDesc": first_risk["scenario"],
            "riskViolation": "Yes",
            "severity": first_risk["level"],
            "riskScore": max(item["riskScore"] for item in selected),
            "processArea": first_risk["businessProcess"],
            "riskCategory": first_risk["category"],
            "conflictingTransactions": first_risk["conflictingTransactions"],
            "businessImpact": first_risk["businessImpact"],
            "standardsViolated": first_risk["standardsViolated"],
            "recommendedAction": first_risk["recommendedAction"],
            "priority": first_risk["priority"],
            "status": "In Progress" if idx % 4 == 0 else "Open" if idx % 2 == 0 else "Resolved",
            "assignee": first_risk["assignee"],
            "lastAnalyzedDate": "2026-05-19",
            "lastActivity": uinfo.get("lastLogin") or "00-00-0000 00:00:00",
            "firefighterId": username if "FF" in username else "Standard Access",
            "accountType": "Service" if user_type != "Dialog" else "Dialog"
        }
        all_scanned_users.append(base)

    all_risks = []
    for risk in risks_catalog:
        affected_users = [
            user["userId"]
            for user in all_scanned_users
            if any(item["riskId"] == risk["riskId"] for item in user.get("riskViolations", []))
        ]
        
        tcodes_list = [v.strip() for v in str(risk["conflictingTransactions"] or '').split(',') if v.strip()]
        
        all_risks.append({
            "riskId": risk["riskId"],
            "title": risk["scenario"],
            "status": "Active",
            "level": risk["level"],
            "severity": risk["severity"],
            "category": risk["category"],
            "riskScore": risk["riskScore"],
            "process": risk["businessProcess"],
            "type": risk["roleType"],
            "ruleset": "SAP GRC S4HANAOP Global Ruleset",
            "func": risk["conflictingTransactions"],
            "funcDesc": risk["scenario"],
            "funcStatus": "Enabled",
            "userCount": len(affected_users),
            "affectedUsers": affected_users,
            "group": f"{risk['businessProcess']} Control Pool",
            "lastRun": "LCSOD-2026-Q2-007",
            "lastDetected": "May 19, 2026",
            "roles": [],
            "tcodes": tcodes_list,
            "businessImpact": risk["businessImpact"],
            "complianceImpact": "Direct SAP GRC and SOX control impact.",
            "grcMapping": risk["standardsViolated"],
            "auditNotes": "Ruleset-derived mock row generated from local S4HANAOP content.",
            "assignee": risk["assignee"],
            "functionIds": risk["functionIds"],
            "functionNames": risk["functionNames"],
            "standardsViolated": risk["standardsViolated"],
            "recommendedAction": risk["recommendedAction"],
            "recommendations": risk["recommendations"],
            "priority": risk["priority"]
        })

    # Generate javascript code contents
    js_content = f"""// Real data generated from downloads/user_details
const RUN = {{
  id: 'LCSOD-2026-Q2-007',
  name: 'Q2 2026 — Enterprise SoD Assessment',
  date: 'May 19, 2026 · 04:12 GMT+9',
  system: 'PRD · S/4HANA 2023 · LCKR-PRD-01',
  status: 'Completed',
  duration: '1h 12m',
  scope: '{total_users_count} users scanned',
}};

const KPIS = {{
  totalUsers: {total_users_count},
  totalViolations: {total_violations_count},
  critical: {critical_violations_count},
  high: {high_violations_count},
  medium: {medium_violations_count},
  low: {low_violations_count},
  complianceScore: {compliance_score:.1f},
  severityBreakdown: {{
    critical: {critical_violations_count},
    high: {high_violations_count},
    medium: {medium_violations_count},
    low: {low_violations_count}
  }},
  deltas: {{
    totalUsers: 0,
    totalViolations: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    complianceScore: 0,
  }},
}};

const COMPLIANCE = {{
  maturityLevel: 'Managed',
  industryPeer: 78,
  trend: [82, 85, 87, 90, 92, 94, 95, {compliance_score:.1f}],
  systemicWeaknesses: [
    'Direct table update authorization issues detected',
    'Unmonitored firefighter activities in production environment',
    'Overlapping billing and order release authorities'
  ],
  detected: {{
    critical: {critical_violations_count},
    high: {high_violations_count},
    medium: {medium_violations_count},
    low: {low_violations_count},
  }},
  unmitigated: {{
    critical: {max(0, round(critical_violations_count * 0.78))},
    high: {max(0, round(high_violations_count * 0.72))},
    medium: {max(0, round(medium_violations_count * 0.60))},
    low: {max(0, round(low_violations_count * 0.50))},
  }},
  affectedUsers: {len(violators)},
  totalUsersScanned: {total_users_count},
}};

const PROCESS_AREAS = ['Finance', 'Procurement', 'OTC', 'HR', 'IT'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
const TEAMS = ['SAP Basis Team', 'IT Compliance', 'Finance Risk', 'SAP Security Team'];

const CRITICAL_FINDINGS = {json.dumps(critical_findings, indent=2)};

const IMMEDIATE_ACTIONS = {json.dumps(immediate_actions, indent=2)};

const RUN_TREND = [
  {{ run: 'Q4-2025', date: '2025-11', new: 10, resolved: 5, persisting: 25, score: 90.0 }},
  {{ run: 'Q1-2026', date: '2026-02', new: 8, resolved: 12, persisting: 21, score: 92.5 }},
  {{ run: 'Q2-2026', date: '2026-05', new: 0, resolved: 15, persisting: {len(violators)}, score: {compliance_score:.1f} }}
];

const CATEGORY_CARDS = [
  {{ key: 'sod-04', code: 'SOD-04', title: 'Immediate Actions',        count: {len(immediate_actions)},   severity: 'Critical', blurb: 'P1 violations needing remediation within 24-48 hours', icon: 'flame' }},
  {{ key: 'sod-05', code: 'SOD-05', title: 'Risk Exposure & Impact',   count: {total_violations_count},  severity: 'Critical', blurb: 'Financial & regulatory exposure assessment', icon: 'impact' }},
  {{ key: 'sod-06', code: 'SOD-06', title: 'Super Administrators',     count: {len(super_admins_detected)},  severity: 'Critical', blurb: 'Concentration of administrative authority', icon: 'shield' }},
  {{ key: 'sod-07', code: 'SOD-07', title: 'Dual Process Control',     count: {len(dual_process_rows)}, severity: 'Critical', blurb: 'Cross-process authorization overlaps', icon: 'split' }},
  {{ key: 'sod-08', code: 'SOD-08', title: 'Emergency Access',         count: {len(firefighters_detected)},  severity: 'High',     blurb: 'Firefighter usage and anomaly flags', icon: 'flame' }},
  {{ key: 'sod-09', code: 'SOD-09', title: 'OTC Control Violations',   count: {len(otc_rows)},  severity: 'Critical', blurb: 'Order-to-Cash process conflicts', icon: 'cycle' }},
  {{ key: 'sod-10', code: 'SOD-10', title: 'High-Risk Service Accounts', count: {len(service_accounts_detected)}, severity: 'High',   blurb: 'Service accounts with excessive privileges', icon: 'bot' }},
  {{ key: 'sod-11', code: 'SOD-11', title: 'Remediation & Governance', count: {len(remediations)}, severity: 'Medium',   blurb: 'Open remediation recommendations', icon: 'wrench' }},
  {{ key: 'sod-12', code: 'SOD-12', title: 'Continuous Compliance',    count: {total_users_count}, severity: 'Low',      blurb: 'Automated scans and rule execution metrics', icon: 'shield' }},
];

window.MOCK = {{
  RUN, KPIS, COMPLIANCE,
  PROCESS_AREAS, SEVERITIES, TEAMS,
  CRITICAL_FINDINGS, IMMEDIATE_ACTIONS,
  RUN_TREND, CATEGORY_CARDS,
}};

// SOD-05 - Compliance Impact Assessment
const IMPACT_CATEGORIES = ['Financial', 'Operational', 'Regulatory'];
const EXPOSURE_LEVELS = ['High', 'Medium', 'Low'];
const FRAMEWORKS = ['SOX', 'GDPR', 'ISO 27001', 'SAP GRC', 'K-SOX'];

const IMPACT_SPLIT = {json.dumps(impact_split, indent=2)};

const FRAMEWORK_BREAKDOWN = {json.dumps(framework_breakdown, indent=2)};

const IMPACT_ROWS = {json.dumps(impact_rows, indent=2)};

const IMPACT_KPIS = {{
  totalMapped: {total_violations_count},
  financialExposureHigh: {critical_violations_count},
  financialExposureMed: {high_violations_count},
  financialExposureLow: {medium_violations_count + low_violations_count},
  totalDollarExposure: {sum(r.get("dollars", 0) * len(violations_by_rule[r["id"]]) for r in RULES_DEF if r.get("dollars"))},
  frameworksAffected: 5,
  deltas: {{
    totalMapped: 0,
    financialExposureHigh: 0,
    totalDollarExposure: 0,
  }},
}};

Object.assign(window.MOCK, {{
  IMPACT_CATEGORIES, EXPOSURE_LEVELS, FRAMEWORKS,
  IMPACT_SPLIT, FRAMEWORK_BREAKDOWN, IMPACT_ROWS, IMPACT_KPIS,
}});

// SOD-06 - Super Administrators
const SUPER_ADMIN_RECOMMENDATIONS = ['Revoke', 'Redesign', 'Monitor'];
const SUPER_ADMIN_ROWS = {json.dumps(super_admins_detected, indent=2)};

const SUPER_ADMIN_KPIS = {{
  totalSuperAdmins: {len(super_admins_detected)},
  critical: {len([sa for sa in super_admins_detected if sa["severity"] == "Critical"])},
  rolesContributing: {len(role_concentration_list)},
  systemsAffected: 1,
  deltas: {{
    totalSuperAdmins: 0,
    critical: 0,
    rolesContributing: 0,
    systemsAffected: 0,
  }},
}};

const ROLE_CONCENTRATION = {json.dumps(role_concentration_list, indent=2)};

Object.assign(window.MOCK, {{
  SUPER_ADMIN_RECOMMENDATIONS, SUPER_ADMIN_ROWS, SUPER_ADMIN_KPIS, ROLE_CONCENTRATION,
}});

// SOD-07 - Dual Process Control
const DUAL_PROCESSES = [
  {{ key: 'CV', label: 'Create Vendor',      short: 'Vendor',   area: 'Procurement' }},
  {{ key: 'AP', label: 'Approve PO',         short: 'PO Apv',   area: 'Procurement' }},
  {{ key: 'GR', label: 'Goods Receipt',      short: 'GR',       area: 'Procurement' }},
  {{ key: 'IV', label: 'Invoice Verify',     short: 'IV',       area: 'Procurement' }},
  {{ key: 'PM', label: 'Approve Payment',    short: 'Payment',  area: 'Finance' }},
  {{ key: 'SO', label: 'Create Sales Order', short: 'Sales',    area: 'OTC' }},
  {{ key: 'BL', label: 'Create Billing',     short: 'Billing',  area: 'OTC' }},
  {{ key: 'GL', label: 'GL Posting',         short: 'GL Post',  area: 'Finance' }}
];

const CONFLICT_MATRIX = {json.dumps(conflict_matrix_data, indent=2)};
const DUAL_PROCESS_ROWS = {json.dumps(dual_process_rows, indent=2)};

const DUAL_PROCESS_KPIS = {{
  total: {len(dual_process_rows)},
  critical: {critical_violations_count},
  high: {high_violations_count},
  uniqueUsers: {len(violators)},
  processAreas: {len(set(r["area"] for r in RULES_DEF))},
  deltas: {{
    total: 0,
    critical: 0,
    high: 0,
    uniqueUsers: 0,
    processAreas: 0,
  }},
}};

Object.assign(window.MOCK, {{
  DUAL_PROCESSES, CONFLICT_MATRIX, DUAL_PROCESS_ROWS, DUAL_PROCESS_KPIS,
}});

// SOD-08 - Emergency Access
const FIREFIGHTER_TIMELINE_START = '2026-03-01';
const FIREFIGHTER_TIMELINE_END   = '2026-05-22';
const APPROVAL_STATUSES = ['Approved', 'Pending', 'Missing'];
const EMERGENCY_ACCESS_ROWS = {json.dumps(firefighters_detected, indent=2)};

const EMERGENCY_ACCESS_KPIS = {{
  totalUsers: {len(firefighters_detected)},
  unapprovedAccess: {len([ff for ff in firefighters_detected if ff["approval"] == "Missing"])},
  prolongedAssignments: 0,
  anomalyFlags: {len([ff for ff in firefighters_detected if ff["anomalyFlag"]])},
  deltas: {{
    totalUsers: 0,
    unapprovedAccess: 0,
    prolongedAssignments: 0,
    anomalyFlags: 0,
  }},
}};

Object.assign(window.MOCK, {{
  FIREFIGHTER_TIMELINE_START, FIREFIGHTER_TIMELINE_END,
  APPROVAL_STATUSES, EMERGENCY_ACCESS_ROWS, EMERGENCY_ACCESS_KPIS,
}});

// SOD-09 - OTC Control
const OTC_STEPS = [
  {{ key: 'order',     label: 'Order Entry',  short: 'Order',    tcodes: ['VA01', 'VA02'],         icon: 'plus' }},
  {{ key: 'delivery',  label: 'Delivery',     short: 'Delivery', tcodes: ['VL01N', 'VL02N'],       icon: 'arrow' }},
  {{ key: 'billing',   label: 'Billing',      short: 'Billing',  tcodes: ['VF01', 'VF02', 'VF04'], icon: 'file' }},
  {{ key: 'collection',label: 'Collection',   short: 'Cash App', tcodes: ['F-28', 'FB05', 'FBL5N'],icon: 'check' }},
];
const OTC_ROWS = {json.dumps(otc_rows, indent=2)};
const OTC_KPIS = {json.dumps(otc_kpis, indent=2)};

Object.assign(window.MOCK, {{
  OTC_STEPS, OTC_ROWS, OTC_KPIS,
}});

// SOD-10 - High-Risk Service Accounts
const SERVICE_ACCOUNT_TYPES = ['Service', 'Background', 'Integration'];
const PRIVILEGE_LEVELS = ['Critical', 'High', 'Medium', 'Low'];
const INACTIVITY_OPTIONS = ['Inactive', 'Active'];
const SERVICE_ACCOUNTS = {json.dumps(service_accounts_detected, indent=2)};

const ACCOUNT_TYPE_SPLIT = [
  {{ type: 'Service',     count: {len([sa for sa in service_accounts_detected if sa["type"] == "Service"])},     color: '#0F172A' }},
  {{ type: 'Background',  count: {len([sa for sa in service_accounts_detected if sa["type"] in ("System", "Background")])},  color: '#475569' }},
  {{ type: 'Integration', count: 0, color: '#94A3B8' }}
];

const SERVICE_ACCOUNT_KPIS = {{
  totalAccounts: {len(service_accounts_detected)},
  highPrivilege: {len([sa for sa in service_accounts_detected if sa["privilege"] == "Critical"])},
  inactiveAccounts: 0,
  unmanagedAccounts: {len([sa for sa in service_accounts_detected if sa["unmanaged"]])},
  deltas: {{
    totalAccounts: 0,
    highPrivilege: 0,
    inactiveAccounts: 0,
    unmanagedAccounts: 0,
  }},
}};

Object.assign(window.MOCK, {{
  SERVICE_ACCOUNT_TYPES, PRIVILEGE_LEVELS, INACTIVITY_OPTIONS,
  SERVICE_ACCOUNTS, ACCOUNT_TYPE_SPLIT, SERVICE_ACCOUNT_KPIS,
}});

// SOD-11 - Remediation & Governance
const REMEDIATION_TYPES = ['Role Redesign', 'Access Removal', 'Mitigating Control', 'Policy'];
const PRIORITIES = ['P1', 'P2', 'P3', 'P4'];
const REMEDIATIONS = {json.dumps(remediations, indent=2)};
const REMEDIATION_KPIS = {json.dumps(remediations_kpis, indent=2)};

const POLICY_SUGGESTIONS = [
  {{
    title: 'Deactivate inactive firefighter assignments',
    rationale: 'Review firefighter IDs that have had no login activity in the last 90 days.',
    owner: 'IT Compliance',
    priority: 'P2',
    impact: 'Security footprint reduction',
    frameworks: ['SOX', 'SAP GRC']
  }},
  {{
    title: 'Technical accounts password policy',
    rationale: 'Technical service accounts should enforce 90-day password rotations via automated vaults.',
    owner: 'SAP Basis Team',
    priority: 'P1',
    impact: 'System security enhancement',
    frameworks: ['ISO 27001']
  }}
];

Object.assign(window.MOCK, {{
  REMEDIATION_TYPES, PRIORITIES, REMEDIATIONS, REMEDIATION_KPIS, POLICY_SUGGESTIONS,
}});

// SOD-12 - Continuous Compliance
const SOD12_KPIS = {{
  automatedChecks: {total_users_count * 7},
  passRate: {compliance_score:.1f},
  newViolationsThisRun: {len(violators)},
  resolvedThisRun: 121,
  rulesActive: 7,
}};

const RULES_LOG = [
  {{ id: 'RUL-904', code: 'Z_SOD_01', desc: 'Prevent Vendor Create + AP Payment',      deployed: '2026-05-20', author: 'J. Smith',    type: 'Custom'   }},
  {{ id: 'RUL-903', code: 'Z_SOD_02', desc: 'Enforce Firefighter Expiry < 30 days',     deployed: '2026-05-18', author: 'A. Poche',    type: 'Custom'   }},
  {{ id: 'RUL-902', code: 'Z_SOD_03', desc: 'Flag F110 out of Treasury',                deployed: '2026-05-10', author: 'B. Carrier',  type: 'Standard' }},
  {{ id: 'RUL-901', code: 'Z_SOD_04', desc: 'Restrict PFCG for non-Basis users',        deployed: '2026-05-02', author: 'J. Smith',    type: 'Standard' }},
  {{ id: 'RUL-900', code: 'Z_SOD_05', desc: 'Detect Bank Edit + Payment Block removal', deployed: '2026-04-25', author: 'H. Schroder', type: 'Legacy'   }},
  {{ id: 'RUL-899', code: 'Z_SOD_06', desc: 'Full OTC cycle by single user alert',      deployed: '2026-04-10', author: 'Y. Kim',      type: 'Custom'   }},
  {{ id: 'RUL-898', code: 'Z_SOD_07', desc: 'Background RFC with SAP_ALL equivalent',   deployed: '2026-04-05', author: 'S. Chen',     type: 'Legacy'   }},
];

const COMPLIANCE_TREND_DATA = {json.dumps(compliance_trend_data, indent=2)};

Object.assign(window.MOCK, {{
  SOD12_KPIS, RULES_LOG, COMPLIANCE_TREND_DATA
}});

const ALL_USERS = {json.dumps(all_scanned_users, indent=2)};
const ALL_RISKS = {json.dumps(all_risks, indent=2)};

Object.assign(window.MOCK, {{ ALL_USERS, ALL_RISKS }});

(() => {{
  const normalizeStatus = (row, idx) => ({{
    ...row,
    status: idx % 5 === 0 ? 'Resolved' : idx % 3 === 0 ? 'In Progress' : 'Open'
  }});

  [
    'IMMEDIATE_ACTIONS',
    'SUPER_ADMIN_ROWS',
    'DUAL_PROCESS_ROWS',
    'EMERGENCY_ACCESS_ROWS',
    'OTC_ROWS',
    'SERVICE_ACCOUNTS',
    'REMEDIATIONS'
  ].forEach(key => {{
    if (Array.isArray(window.MOCK[key])) {{
      window.MOCK[key] = window.MOCK[key].map(normalizeStatus);
    }}
  }});

  if (Array.isArray(window.MOCK.CATEGORY_CARDS) && !window.MOCK.CATEGORY_CARDS.some(card => card.key === 'sod-p2p')) {{
    window.MOCK.CATEGORY_CARDS.splice(6, 0, {{
      key: 'sod-p2p',
      code: 'SOD-P2P',
      title: 'Procure-to-Pay',
      count: 10,
      severity: 'Critical',
      blurb: 'High-risk authorization combinations in P2P cycle',
      icon: 'package'
    }});
  }}

  const rows = window.MOCK.REMEDIATIONS || [];
  window.MOCK.REMEDIATION_KPIS = {{
    ...(window.MOCK.REMEDIATION_KPIS || {{}}),
    total: rows.length,
    overdue: rows.filter(r => r.overdue).length,
    open: rows.filter(r => r.status === 'Open').length,
    inProgress: rows.filter(r => r.status === 'In Progress').length,
    resolved: rows.filter(r => r.status === 'Resolved').length,
    totalRecommendations: rows.length,
    mitigatedViolations: rows.filter(r => r.status === 'Resolved').length,
    pendingRemediations: rows.filter(r => r.status === 'Open' || r.status === 'In Progress').length,
    progressPercentage: Math.round((rows.filter(r => r.status === 'Resolved').length / Math.max(rows.length, 1)) * 100),
    deltas: {{ total: 0, overdue: 0, open: 0, inProgress: 0, resolved: 0 }}
  }};

  window.getMockDataForRun = function(runId) {{
    const runObj = (window.MOCK.ANALYSIS_RUNS || []).find(r => r.id === runId) || window.MOCK.RUN;
    return {{
      users: window.MOCK.ALL_USERS || [],
      risks: window.MOCK.ALL_RISKS || [],
      kpis: {{
        totalUsers: Number(runObj?.users || window.MOCK.KPIS.totalUsers || 0),
        totalRoles: Number(runObj?.roles || 0),
        totalViolations: Number(runObj?.violations || window.MOCK.KPIS.totalViolations || 0),
        critical: window.MOCK.KPIS.critical,
        high: window.MOCK.KPIS.high,
        medium: window.MOCK.KPIS.medium,
        low: window.MOCK.KPIS.low,
        complianceScore: Number(runObj?.matchRate || window.MOCK.KPIS.complianceScore || 0),
        riskScore: Math.round((window.MOCK.ALL_USERS || []).reduce((sum, u) => sum + (u.riskScore || 0), 0) / Math.max((window.MOCK.ALL_USERS || []).length, 1))
      }}
    }};
  }};

  window.updateMockGlobalsForRun = function(runId) {{
    const runObj = (window.MOCK.ANALYSIS_RUNS || []).find(r => r.id === runId);
    if (runObj) {{
      window.MOCK.RUN = {{
        ...window.MOCK.RUN,
        id: runObj.id,
        name: runObj.name,
        date: runObj.date,
        status: runObj.status,
        scope: `${{runObj.users}} users scanned`
      }};
      window.MOCK.KPIS = {{
        ...window.MOCK.KPIS,
        totalUsers: Number(runObj.users),
        totalViolations: Number(runObj.violations),
        complianceScore: Number(runObj.matchRate)
      }};
    }}
    return window.getMockDataForRun(runId);
  }};
}})();
"""

    runs_content = f"""/* Real Runs List Data */
const ANALYSIS_RUNS = [
  {{
    id: 'LCSOD-2026-Q2-007',
    name: 'Q2 2026 — Enterprise SoD Assessment',
    date: 'May 19, 2026 · 04:12 GMT+9',
    createdBy: 'Seo-yeon Kim (Lead Audit)',
    status: 'Completed',
    users: '{total_users_count}',
    roles: '{total_users_count * 3}',
    violations: '{total_violations_count}',
    matchRate: {compliance_score:.1f},
    scopes: ['P2P', 'O2C', 'FI', 'HR', 'Basis'],
  }},
  {{
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
  }},
  {{
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
  }}
];

const SAP_SYSTEMS = [
  {{ id: 1, name: 'PRD', ashost: '172.17.19.18', sysnr: '00', client: '210', status: 'connected' }}
];

/* P2P (Procure-to-Pay) Violations Data */
const P2P_VIOLATIONS = [
  {{ id: 'PTP-001', pair: 'ME21N + MIRO',  desc: 'PO Create + LIV Posting',           users: {len(violations_by_rule["V-1094"])}, severity: 'Critical', status: 'Open', exposure: 'High' }},
  {{ id: 'PTP-002', pair: 'ME21N + ME29N', desc: 'PO Create + PO Approval',           users: {len(violations_by_rule["V-1094"])}, severity: 'Critical', status: 'In Progress', exposure: 'High' }},
  {{ id: 'PTP-003', pair: 'MIGO + MIRO',   desc: 'Goods Receipt + Invoice Post',      users: {len(violations_by_rule["V-1131"])}, severity: 'High',     status: 'Resolved', exposure: 'High' }}
];

const P2P_KPIS = {{
  totalViolations: {len(violations_by_rule["V-1094"]) + len(violations_by_rule["V-1131"])},
  highRiskCombos: 3,
  affectedVendors: {len(violators)},
  estimatedExposure: {sum(r["dollars"] * len(violations_by_rule[r["id"]]) for r in RULES_DEF if r["area"] == "Procurement")},
  deltas: {{
    totalViolations: 0,
    highRiskCombos: 0,
    affectedVendors: 0,
    estimatedExposure: 0,
  }},
}};

const VENDOR_RISK_HEATMAP = [
  {{ vendor: 'Acme Steel KR', violations: 3, exposure: '$2.4M' }}
];

const P2P_REMEDIATION = [
  {{
    type: 'Role Redesign',
    title: 'Split PO Create + LIV Posting',
    description: 'Separate ME21N from MIRO roles globally to resolve Procurement risks.',
    priority: 'P1',
    timeline: '2 weeks',
    impact: 'High',
  }}
];

window.ANALYSIS_RUNS = ANALYSIS_RUNS;
window.SAP_SYSTEMS = SAP_SYSTEMS;
window.P2P_VIOLATIONS = P2P_VIOLATIONS;
window.P2P_KPIS = P2P_KPIS;
window.VENDOR_RISK_HEATMAP = VENDOR_RISK_HEATMAP;
window.P2P_REMEDIATION = P2P_REMEDIATION;

Object.assign(window.MOCK, {{
  ANALYSIS_RUNS, SAP_SYSTEMS, P2P_VIOLATIONS, P2P_KPIS, VENDOR_RISK_HEATMAP, P2P_REMEDIATION,
}});
"""

    with open(MOCK_DATA_JSX, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Generated {MOCK_DATA_JSX} successfully.")
    
    with open(RUNS_MOCK_DATA_JSX, "w", encoding="utf-8") as f:
        f.write(runs_content)
    print(f"Generated {RUNS_MOCK_DATA_JSX} successfully.")

if __name__ == "__main__":
    generate()
