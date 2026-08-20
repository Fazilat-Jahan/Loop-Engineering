# Project 8 – Own Daily Loop

This repository implements the **Loop Engineering Mini Capstone**, also referred to as **Project 8**. It demonstrates a simple loop‑engineered workflow that runs a series of scripted “beats”. Each beat:

1. Generates a documentation freshness report (`maker.sh`).
2. Verifies the report exists (`checker.sh`).
3. Logs a simulated pull‑request creation (`connector.sh`).
4. Appends a summary entry to `progress.md`.

The workflow is driven by `scripts/run_beats.sh`, which repeatedly invokes `scripts/heartbeat.sh`. A budget of **7 beats** is enforced via the hidden `.heartbeat_counter` file.

## Directory layout

- `docs/` – Holds project documentation (the main README lives here, but it has been consolidated into the root README for Project 8).
- `scripts/` – Bash utilities that implement the loop (`maker.sh`, `checker.sh`, `connector.sh`, `heartbeat.sh`, `run_beats.sh`).
- `output/` – Artifacts produced by the loop:
  - `docs-report.md` – Freshness report for `docs/README.md`.
  - `connector.log` – Log of simulated PR/issue creation.
- `progress.md` – Human‑readable log of each beat.
- `SKILL.md` – Definition of the “Documentation Freshness Inspection” skill used by the loop.


