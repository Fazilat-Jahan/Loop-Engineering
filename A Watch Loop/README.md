# A Watch Loop

A small practice project based on **Project 1: A Watch Loop** from the Loop Engineering Crash Course.

## What I Practiced

I practiced using Claude Code's **in-session `/loop`** to repeatedly watch a task while the session remained open.

The loop checked `status.txt` every minute and detected when the status changed from:

```text
STATUS=BUILDING
```

to:

```text
STATUS=DONE
```

When the change was detected, the result was recorded in `log.txt`.

## How It Works

```text
STATUS=BUILDING
       ↓
   /loop checks
       ↓
   Wait 1 minute
       ↓
   Check again
       ↓
 STATUS=DONE
       ↓
  Detection logged
       ↓
   Stop the loop
```

The loop was run multiple times to practice the same workflow.

## Files

### `status.txt`

Stores the current task status.

```text
STATUS=DONE
```

### `log.txt`

Records when the loop detected the status transition.

Example:

```text
2026-08-07 22:09:11: status changed from BUILDING to DONE
2026-08-07 22:35:59: status changed from BUILDING to DONE
2026-08-07 22:59:51: status changed from BUILDING to DONE
```

### `.claude/`

Contains the Claude Code configuration/scheduled-task information used during the `/loop` practice.

## Key Concept

An **in-session loop** repeats a prompt on a timer while the Claude Code session is open.

For example:

```text
 /loop 1m read status.txt and if it says BUILDING change it to DONE and write an entry in log.txt
```

The important part is that I do not have to manually ask Claude to check again after every minute. The `/loop` provides the heartbeat that triggers each check.

## What I Learned

* How an in-session loop works.
* How `/loop` creates a repeated heartbeat.
* How a loop can monitor a changing state.
* How to define a simple stopping condition.
* How to stop the loop when the task is complete.
* An in-session loop depends on the active session; closing the session stops the watching.

## Result

**Project 1 — A Watch Loop: Completed ✅**
