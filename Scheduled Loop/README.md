# The Morning Brief with a Memory

A small practice project based on **Project 3: The Morning Brief with a Memory** from the Loop Engineering Crash Course.

## What I Practiced

I practiced using a **scheduled loop with persistent memory** to generate incremental morning briefs that build on previous runs.

The loop ran every 2 minutes and used `progress.md` as its memory spine. Each run read what had been covered before, briefed new tasks, and updated the memory file.

## How It Works

```text
Run 1: Brief tasks #1, #3
       ↓
  Append to progress.md
       ↓
Run 2: Read progress.md
       ↓
  Brief NEW tasks #2, #5, #4
       ↓
  Append to progress.md
       ↓
Run 3: Read progress.md
       ↓
  All tasks covered → completion
       ↓
  Loop stopped
```

The second run built on the first instead of repeating it. The third run detected completion.

## Files

### `tasks.json`

Contains 5 simple tasks with priorities. The data source for the morning brief.

### `progress.md`

The memory spine. Started empty, accumulated summaries from each run showing which tasks were covered.

### `loop-instructions.md`

The prompt executed by each scheduled loop iteration. Instructs the loop to read state, generate briefs, and update memory.

## Key Concept

A **scheduled loop with persistent memory** uses a file (progress.md) as its spine. Each run:
1. Reads the memory to understand past work
2. Does incremental work on new items
3. Writes back what it accomplished

This prevents repeating the same work and enables true progression across runs.

## What I Learned

* How scheduled loops work with CronCreate
* How to use a file as persistent memory between runs
* How each run can build on previous runs
* How to avoid repeated work by checking the memory
* How to detect completion when all items are covered
* How to stop a scheduled loop with CronDelete

## Result

**Project 3 — The Morning Brief with a Memory: Completed ✅**