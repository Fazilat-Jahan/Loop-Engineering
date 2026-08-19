#!/usr/bin/env bash
set -e
# Checker script: verifies that output/docs-report.md exists and is non‑empty.
REPORT="output/docs-report.md"
if [[ -f "$REPORT" && -s "$REPORT" ]]; then
  echo "PASS"
else
  echo "FAIL"
fi
