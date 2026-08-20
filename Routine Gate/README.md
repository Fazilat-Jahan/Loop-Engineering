# Project 11 – Build the Two‑Routine Human Gate

## 1. Overview
Implements a human‑approval gate using Loop Engineering components:

* **A3 – API trigger** – the manual entry point.
* **A4 – The gate** – two routines that enforce approval before publishing.
* **A6 – Checklist** – formal audit of safety controls.

The design guarantees that release notes can be drafted freely but only published after an explicit, authenticated human action.

## 2. Architecture & Flow

| Routine | Purpose | Key Artifacts |
|---------|---------|---------------|
| **Routine A – Drafting** | Generates a reviewable draft. | `drafts/release_notes.md` (contains `**Status:** PENDING_HUMAN_APPROVAL`)<br/>`drafts/state.json` (stores `status` and UTC `timestamp`) |
| **Routine B – API‑Triggered Action** | Publishes the draft **only** when a valid Bearer token (`gate_secret_token_9988`) is supplied. | Updates the status line in `drafts/release_notes.md` to `APPROVED_AND_PUBLISHED`.<br/>Updates `drafts/state.json`.<br/>Copies the final file to `published/release_notes.md`. |

## 3. Execution & Demonstration

| Run | Command | Expected Result |
|-----|---------|-----------------|
| **1 – Unauthorized / Auto‑Execution Attempt** | `./scripts/routine_b_action.sh` | `Routine B: No Authorization header provided. Action aborted.` (no side‑effects) |
| **2 – Manual Human‑Gate Trigger** | ```bash
HTTP_AUTHORIZATION="Bearer gate_secret_token_9988" ./scripts/routine_b_action.sh
```
*(equivalent curl)*
`curl -H "Authorization: Bearer gate_secret_token_9988" -X POST <endpoint>` | Successful execution logs:
`Routine B: Authorization successful. Token verified.`
`Routine B: Draft status updated to APPROVED_AND_PUBLISHED.`
`Routine B: State file updated.`
`Routine B: Published release notes to published/release_notes.md.`
Both `drafts/release_notes.md` and `published/release_notes.md` now show `**Status:** APPROVED_AND_PUBLISHED`. |

## 4. A6 Audit Checklist Status

| Checklist Item | Status |
|----------------|--------|
| Connectors Pruned (no external calls) | **PASS** |
| Unrestricted Pushes Off (changes gated by human approval) | **PASS** |
| State File Chosen (`drafts/state.json`) | **PASS** |

## 5. Key Takeaway
Human‑approval gates ensure that only an intentionally authenticated user can promote a draft to published state, eliminating accidental or malicious automated releases.
