#!/usr/bin/env bash

# Check for DUMMY_API_KEY in environment variables
if [[ -z "$DUMMY_API_KEY" ]]; then
  echo "Error: DUMMY_API_KEY not set"
  exit 1
else
  echo "DUMMY_API_KEY is set: $DUMMY_API_KEY"
  exit 0
fi
