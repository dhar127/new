import os
import re

BASE_DIR = r"c:\SOD+LC\SOD_design_ui"
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

def parse():
    print("Parsing ruleset...")
    
    # 1. Business Processes
    bp_map = {}
    bp_file = os.path.join(ALL_DIR, "ALL_Business_Processes.txt")
    lines, enc = read_tsv(bp_file)
    print(f"BP File encoding: {enc}, lines: {len(lines)}")
    headers = lines[0].strip().split("\t")
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
    print(f"Functions File encoding: {enc}, lines: {len(lines)}")
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
    print(f"Actions File encoding: {enc}, lines: {len(lines)}")
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 2:
            func_id, action = parts[0], parts[1]
            func_actions.setdefault(func_id, []).append(action)

    # 4. Permissions (Auth Objects)
    func_auths = {}
    perm_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Function_Permission.txt")
    lines, enc = read_tsv(perm_file)
    print(f"Permissions File encoding: {enc}, lines: {len(lines)}")
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
    print(f"Owners File encoding: {enc}, lines: {len(lines)}")
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 2:
            risk_id, owner_id = parts[0], parts[1]
            owner_map.setdefault(risk_id, []).append(owner_id)

    # 6. Risk Descriptions
    risk_desc_map = {}
    desc_file = os.path.join(S4HANAOP_DIR, "S4HANAOP_Risks_Description.txt")
    lines, enc = read_tsv(desc_file)
    print(f"Risk Desc File encoding: {enc}, lines: {len(lines)}")
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
    print(f"Risks File encoding: {enc}, lines: {len(lines)}")
    for line in lines[1:]:
        parts = line.strip("\r\n").split("\t")
        if len(parts) >= 10:
            risk_id = parts[0]
            # Indices 1 to 5 are funct_ids
            funct_ids = [f for f in parts[1:6] if f.strip()]
            bp_id = parts[6]
            risk_level = parts[7]
            active = parts[8]
            risk_type = parts[9]
            
            # Resolve descriptions and maps
            desc_info = risk_desc_map.get(risk_id, {"scenario": f"SoD Conflict for Risk {risk_id}", "businessImpact": "Potential access control violation."})
            bp_name = bp_map.get(bp_id, bp_id)
            
            funct_names = []
            conflicting_tcodes = []
            auth_objects = set()
            for fid in funct_ids:
                fname = func_desc_map.get(fid, fid)
                funct_names.append(f"{fid} - {fname}")
                conflicting_tcodes.extend(func_actions.get(fid, []))
                auth_objects.update(func_auths.get(fid, []))
            
            owners = owner_map.get(risk_id, [])
            assignee = owners[0] if owners else None
            
            risks_catalog.append({
                "riskId": risk_id,
                "functionIds": funct_ids,
                "functionNames": funct_names,
                "businessProcess": bp_name,
                "riskLevel": int(risk_level) if risk_level.isdigit() else 1,
                "riskType": risk_type,
                "scenario": desc_info["scenario"],
                "businessImpact": desc_info["businessImpact"],
                "conflictingTransactions": ", ".join(sorted(list(set(conflicting_tcodes)))[:8]),
                "authObjects": ", ".join(sorted(list(auth_objects))[:6]),
                "assignee": assignee
            })

    print(f"Successfully loaded {len(risks_catalog)} risks.")
    if risks_catalog:
        print("Sample risk:", risks_catalog[0])

if __name__ == "__main__":
    parse()
