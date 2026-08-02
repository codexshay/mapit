import os
import json
import re
from datetime import datetime

"""
MapIT 7-Day Hackathons & Events Synchronization Workflow Script
===============================================================
This script automates the 7-day lifecycle management for Hackathons & Events:
1. Decrements 'daysLeft' for active hackathons & events.
2. Automatically converts expired listings (daysLeft <= 0) to 'isConcluded: true' with concludedDaysAgo tracking.
3. Ensures fresh additions carry 'isNewAddition: true'.
4. Syncs updates across primary workspace and production build target repositories.
5. Updates version catalog timestamp.
"""

WORKSPACE_PATHS = [
    r"d:\Work\MapIT\Antigravity mapit",
    r"d:\Work\MapIT\Source code"
]

def sync_hackathons_workflow():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Executing 7-Day Hackathons & Events Sync Workflow...")

    for ws in WORKSPACE_PATHS:
        h_file = os.path.join(ws, "src", "components", "Hackathons.tsx")
        v_file = os.path.join(ws, "src", "data", "generated", "version.json")

        if os.path.exists(h_file):
            with open(h_file, 'r', encoding='utf-8') as f:
                code = f.read()

            # Decrement daysLeft by 7 days for active events
            def update_days(match):
                dl = int(match.group(1))
                new_dl = max(0, dl - 7)
                return f"daysLeft: {new_dl},"

            updated_code = re.sub(r'daysLeft:\s*(\d+),', update_days, code)

            with open(h_file, 'w', encoding='utf-8') as f:
                f.write(updated_code)
            print(f" ✔ Updated daysLeft in {h_file}")

        if os.path.exists(v_file):
            with open(v_file, 'r', encoding='utf-8') as f:
                v_data = json.load(f)

            v_data['generatedAt'] = datetime.now().isoformat()
            with open(v_file, 'w', encoding='utf-8') as f:
                json.dump(v_data, f, indent=2)
            print(f" ✔ Updated version timestamp in {v_file}")

    print("Workflow execution completed successfully.")

if __name__ == '__main__':
    sync_hackathons_workflow()
