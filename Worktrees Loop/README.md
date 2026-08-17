# Project 5: Codify the Body

A parallel maker-checker workflow demonstration using Claude Code's dynamic workflow capabilities.

## Overview

This project demonstrates a workflow that processes three independent coding issues in parallel, each in its own isolated git worktree:

1. **Bug 1**: Off-by-one error in `getLastElement()` 
2. **Bug 2**: Missing null check in `getUserEmail()`
3. **Bug 3**: Incorrect calculation in `calculateAverage()`

## Workflow Structure

The workflow uses a **pipeline** pattern where each issue flows through two stages:

1. **Draft Stage**: A "maker" agent implements the fix in an isolated worktree
2. **Review Stage**: A "checker" agent verifies the fix by running tests

All three issues are processed in parallel, with each going through both stages independently.

## Running Tests

```bash
npm test
```

Currently, all tests should fail due to the intentional bugs.

## Workflow Execution

The workflow is defined in `.claude/workflows/parallel-maker-checker.js` and can be invoked via Claude Code.

Each issue gets:
- Its own git worktree for isolation
- An independent maker agent to draft the fix
- An independent checker agent to verify with tests
- A PASS/FAIL verdict based on actual test execution

## Key Features

- **Parallel Processing**: All three issues processed concurrently
- **Worktree Isolation**: Each fix is drafted in its own git worktree
- **Independent Verification**: Separate checker agents verify each fix
- **Real Test Execution**: Checkers run actual tests, not just code review
- **Structured Output**: Each checker returns a typed PASS/FAIL verdict

## Notes

This is a practice project demonstrating workflow orchestration patterns. It focuses on the engine/workflow structure rather than production code quality. The code is intentionally simple and may not follow best practices for production-level software.