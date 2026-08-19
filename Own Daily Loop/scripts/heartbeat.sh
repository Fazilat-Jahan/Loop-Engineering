#!/usr/bin/env bash
set -e
# Heartbeat script with budget guard (max 1 beat)
COUNTER_FILE=".heartbeat_counter"
MAX_BEATS=7

if [[ ! -f "$COUNTER_FILE" ]]; then
  echo 0 > "$COUNTER_FILE"
fi

COUNT=$(cat "$COUNTER_FILE")
if (( COUNT >= MAX_BEATS )); then
  echo "Heartbeat budget exhausted (max $MAX_BEATS beats)."
  exit 0
fi

# Increment counter
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

echo "Executing Beat #$COUNT..."

# Run Maker
bash "$(dirname "$0")/maker.sh"

# Run Checker and capture verdict
VERDICT=$(bash "$(dirname "$0")/checker.sh")
echo "Checker verdict: $VERDICT"

# Run Connector
bash "$(dirname "$0")/connector.sh"

# Update progress.md
PROGRESS_FILE="progress.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
cat >> "$PROGRESS_FILE" <<EOF

## Beat #$COUNT
- Timestamp: $TIMESTAMP
- Maker result: output/docs-report.md generated
- Checker verdict: $VERDICT
- Connector log: appended to output/connector.log
EOF

echo "Heartbeat complete."
