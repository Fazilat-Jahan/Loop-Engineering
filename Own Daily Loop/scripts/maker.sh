#!/usr/bin/env bash
set -e
# Maker script: inspects docs/README.md using SKILL definition.
DOC="docs/README.md"
OUTPUT="output/docs-report.md"

# Extract the line with "Last updated:" (case‑insensitive)
DATE_LINE=$(grep -i "Last updated:" "$DOC" | head -n1 || true)
if [[ -z "$DATE_LINE" ]]; then
  STATUS="UNKNOWN"
  LAST_DATE="N/A"
else
  # Extract date after the colon
  LAST_DATE=$(echo "$DATE_LINE" | sed -E 's/.*Last updated:[[:space:]]*//')
  # Compute age in days
  TODAY=$(date +%Y-%m-%d)
  # Convert dates to seconds since epoch (GNU date)
  SEC_TODAY=$(date -d "$TODAY" +%s)
  SEC_LAST=$(date -d "$LAST_DATE" +%s)
  DAYS_DIFF=$(( (SEC_TODAY - SEC_LAST) / 86400 ))
  if (( DAYS_DIFF <= 30 )); then
    STATUS="Fresh"
  else
    STATUS="Stale"
  fi
fi

mkdir -p "$(dirname "$OUTPUT")"
cat > "$OUTPUT" <<EOF
# Documentation Freshness Report

- Document: $DOC
- Last updated: $LAST_DATE
- Status: $STATUS
EOF

echo "Maker generated $OUTPUT"
