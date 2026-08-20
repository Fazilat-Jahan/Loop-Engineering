#!/usr/bin/env bash
set -euo pipefail

# Expected Bearer token (hardcoded secret)
EXPECTED_TOKEN="gate_secret_token_9988"

# Retrieve Authorization header (environment variable in CGI-like context)
# When called via curl with -H "Authorization: Bearer <token>", you can simulate by setting HTTP_AUTHORIZATION env var.
AUTH_HEADER="${HTTP_AUTHORIZATION:-}"  # default empty if not set

if [[ -z "$AUTH_HEADER" ]]; then
  echo "Routine B: No Authorization header provided. Action aborted."
  exit 1
fi

# Extract token (strip "Bearer " prefix, case-insensitive)
TOKEN=$(echo "$AUTH_HEADER" | sed -E 's/^Bearer[[:space:]]+//I')

if [[ "$TOKEN" != "$EXPECTED_TOKEN" ]]; then
  echo "Routine B: Invalid token. Action aborted."
  exit 1
fi

echo "Routine B: Authorization successful. Token verified."

# Paths
DRAFT_FILE="drafts/release_notes.md"
STATE_FILE="drafts/state.json"
PUBLISHED_DIR="published"
PUBLISHED_FILE="${PUBLISHED_DIR}/release_notes.md"

# Ensure published directory exists
mkdir -p "$PUBLISHED_DIR"

# Update draft status line
if grep -q "\*\*Status:\*\* PENDING_HUMAN_APPROVAL" "$DRAFT_FILE"; then
  sed -i 's/\*\*Status:\*\* PENDING_HUMAN_APPROVAL/**Status:** APPROVED_AND_PUBLISHED/' "$DRAFT_FILE"
  echo "Routine B: Draft status updated to APPROVED_AND_PUBLISHED."
else
  echo "Routine B: Draft status line not found or already updated."
fi

# Update state file status
if [[ -f "$STATE_FILE" ]]; then
  # Update the JSON status field (simple replace)
  sed -i "s/\"status\": \"PENDING_HUMAN_APPROVAL\"/\"status\": \"APPROVED_AND_PUBLISHED\"/" "$STATE_FILE"
  # Update timestamp
  NEW_TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  sed -i "s/\"timestamp\": .*/\"timestamp\": \"${NEW_TS}\"/" "$STATE_FILE"
  echo "Routine B: State file updated."
fi

# Publish the release notes (copy draft to published location)
cp "$DRAFT_FILE" "$PUBLISHED_FILE"

echo "Routine B: Published release notes to $PUBLISHED_FILE."
