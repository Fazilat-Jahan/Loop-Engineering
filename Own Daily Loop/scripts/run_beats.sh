#!/usr/bin/env bash
set -e
# Simple runner that triggers the heartbeat once per minute for up to 7 beats.
# It relies on the heartbeat's own budget guard (MAX_BEATS=7).

while true; do
  # Execute a single beat
  bash "$(dirname "$0")/heartbeat.sh"

  # Read current beat count
  if [[ -f .heartbeat_counter ]]; then
    COUNT=$(cat .heartbeat_counter)
  else
    COUNT=0
  fi

  if (( COUNT >= 7 )); then
    echo "Reached 7 beats – stopping loop."
    break
  fi

  echo "Sleeping 60 seconds before next beat..."
  sleep 60
done
