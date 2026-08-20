# Project 12 – Dreaming Loop

## Overview
The *Dreaming Loop* is a capstone improvement loop that analyzes past progress logs, extracts concrete failure evidence, and automatically drafts rule adjustments in the form of a pull‑request‑style proposal. All changes are gated by a human‑gate, ensuring that the active `rules.md` file is never modified without explicit review.

## Core Architecture
- **`progress.md`** – Chronological log of daily runs and events.
- **`rules.md`** – Current execution rules that drive the system (treated as immutable by the loop).
- **`dreaming-state.md`** – Stores the timestamp of the last analysis, preventing re‑processing of old logs.
- **`scripts/dreaming_loop.sh`** – Bash script that reads the state file, parses new log entries, detects repeated failures, proposes a minimal rule addition, suggests removal of an obsolete rule, writes the PR proposal, and updates the state file.
- **`proposals/improvement_pr.md`** – Generated proposal documenting the analysis, evidence, and rule changes.

## Execution Summary
| Item | Details |
|------|---------|
| **Planted Failure Detected** | `API rate limit exceeded` – 2 occurrences on **2026‑08‑14**, **2026‑08‑18** |
| **Proposed Rule Addition** | `RateLimitBackoff` – retry with exponential backoff up to 5 times |
| **Proposed Rule Deletion** | `ObsoleteEmailSummary` – obsolete daily‑summary email rule |
| **Human Gate Safety Check** | **PASS** – `rules.md` remained unchanged |
| **State File Updated** | **PASS** – `dreaming-state.md` updated to the current UTC timestamp |

## Key Takeaway
Grounding rule proposals in explicitly cited historical log evidence eliminates hallucinations and ensures autonomous loops only act on verified, reproducible failures.
