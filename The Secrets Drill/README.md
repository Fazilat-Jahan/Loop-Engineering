# Project 10: The Secrets Drill

## Overview
This project demonstrates the core architectural principles of **A4 (Secrets)** and **A2 (The Environment)** within the Loop Engineering framework. It illustrates why relying on local `.env` files in automated pipelines or cloud environments leads to failure, and proves how credentials must be properly supplied as system environment variables.

## Core Concept & Architecture
* **The Problem:** Sensitive `.env` files are listed in `.gitignore` to prevent leaking credentials to source control. Because of this, fresh cloud clones, CI/CD runners, and remote execution agents never contain the `.env` file.
* **The Solution:** System processes must receive credentials directly from the execution environment (`export KEY=VALUE` or cloud secret managers) rather than reading from a local file.

## Execution Breakdown

### Run 1: Failure Case (Local `.env` Reliance)
* **Condition:** `.env` exists locally with `DUMMY_API_KEY`, but is ignored by git and not exported to the OS environment.
* **Command:** `bash scripts/check_secret.sh`
* **Output:** `Error: DUMMY_API_KEY not set` (Exit Code: `1`)
* **Takeaway:** Un-sourced `.env` files do not exist inside process memory during execution.

### Run 2: Success Case (Environment Variable Injection)
* **Condition:** `DUMMY_API_KEY` is exported into the shell environment, following the standard instruction: *"credentials are available as environment variables; do not look for a .env file."*
* **Command:** `export DUMMY_API_KEY=secret_env_12345 && bash scripts/check_secret.sh`
* **Output:** `DUMMY_API_KEY is set: secret_env_12345` (Exit Code: `0`)
* **Takeaway:** Runtime processes directly access environment variables regardless of repository clone state.

## Key Takeaways
1. **Gitignored files never reach cloud runners:** Never assume a `.env` file exists on remote environments.
2. **Environment Injection:** Always pass keys via system environment variables.
3. **Prompt Guardrails:** Explicitly inform AI agents to look for system environment variables instead of searching for `.env` files.