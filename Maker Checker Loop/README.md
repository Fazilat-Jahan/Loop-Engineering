# Project 4: A Fix Loop with a Real Checker

A hands-on Maker-Checker loop exercise demonstrating role separation, isolated worktrees, and deterministic verification.

## Core Concepts

- **Maker-Checker Pattern**: Separate roles for implementation and verification
- **Worktrees**: Isolated git environments for independent work
- **Skills**: Role-specific instructions via `.claude/skills/`

## How It Works

The project implements a bug-fix workflow with strict role separation:

1. **Maker** reads the task, identifies bugs, and implements fixes
2. **Checker** runs the automated test suite and reports PASS or FAIL
3. If FAIL → Maker iterates with another fix
4. If PASS → Workflow stops successfully

The Checker uses a real automated test suite (`npm test`) that returns deterministic exit codes, eliminating ambiguity.

## What I Practiced

- Separating Maker and Checker responsibilities (no role overlap)
- Using isolated worktrees for implementation work
- Defining role-specific behavior through Skills
- Relying on deterministic automated testing instead of subjective verification
- Clear PASS/FAIL verification with automated test suites

## Results

- **Task**: Fix intentional bugs in a calculator module
- **Bugs Fixed**: 2 (subtract and divide operations)
- **Tests Run**: 9 automated test cases
- **Outcome**: 9/9 tests passed ✅
- **Iterations**: Completed successfully on first attempt

The workflow demonstrated clean role separation: the Maker fixed bugs without running tests, and the Checker verified without modifying code.
