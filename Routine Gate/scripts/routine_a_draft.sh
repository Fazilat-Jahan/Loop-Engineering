#!/usr/bin/env bash
set -euo pipefail

# Path variables
DRAFT_DIR="drafts"
DRAFT_FILE="${DRAFT_DIR}/release_notes.md"
STATE_FILE="${DRAFT_DIR}/state.json"

# Ensure draft directory exists
mkdir -p "$DRAFT_DIR"

# Generate draft content
cat > "$DRAFT_FILE" <<'EOF'
# Release Notes

## Summary

- Feature A added
- Bugfix B applied

**Status:** PENDING_HUMAN_APPROVAL
EOF

# Write state file
cat > "$STATE_FILE" <<'EOF'
{
  "status": "PENDING_HUMAN_APPROVAL",
  "timestamp": "$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")"
}
EOF

echo "Routine A: Draft created at $DRAFT_FILE with status PENDING_HUMAN_APPROVAL"
