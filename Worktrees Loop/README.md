# Project 5: Codify the Body

A small practice project based on **Project 5: Codify the Body** from the Loop Engineering Crash Course.

## What I Practiced

I practiced creating a **reusable dynamic workflow** that orchestrates multiple agents in parallel using Claude Code's Workflow tool.

The workflow processes three coding bugs simultaneously:
1. Off-by-one error in `getLastElement()`
2. Missing null check in `getUserEmail()`
3. Incorrect calculation in `calculateAverage()`

Each bug flows through two stages:
- **Draft Stage**: A "maker" agent fixes the bug in an isolated git worktree
- **Review Stage**: A "checker" agent runs tests and returns a PASS/FAIL verdict

## How It Works

```text
Three bugs in parallel
       ↓
Maker agents (isolated worktrees)
       ↓
Checker agents (test execution)
       ↓
PASS/FAIL verdicts
       ↓
Final report
```

All three issues are processed concurrently. Each maker works in its own git worktree, and each checker independently verifies the fix by running actual tests.

## Files

### `utils.js`
Contains three intentionally broken functions that the workflow fixes.

### `test.js`
Tests that verify each function works correctly.

### `.claude/workflows/parallel-maker-checker.js`
The reusable workflow definition that orchestrates the maker-checker pattern.

## Key Concept: Workflow vs Loop

A **workflow** is a one-shot orchestration engine. When invoked, it runs once and stops.

A **loop** runs repeatedly on a schedule. It has:
- A heartbeat/timer (CronCreate or ScheduleWakeup)
- A persistent state file tracking progress
- Logic to skip already-completed work

The workflow I created is an **engine**, not a loop. It has no memory between runs. To make it a true loop, I would need to add:
- Automatic recurring triggers
- A state file (e.g., `maker-checker-state.json`)
- Logic to read state and only process pending/failed issues

## What I Learned

* How to create a reusable dynamic workflow
* How to orchestrate multiple agents in parallel
* How to use isolated git worktrees for concurrent work
* How pipeline stages process items independently
* How to structure PASS/FAIL verification with typed schemas
* The difference between a workflow engine and a loop
* That workflows are stateless unless you add explicit persistence

## Result

**Project 5 — Codify the Body: Completed ✅**