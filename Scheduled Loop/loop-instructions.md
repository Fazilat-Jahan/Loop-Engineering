# Morning Brief Loop Instructions

## Task

Generate a morning brief that covers pending tasks, building on previous briefs.

## Steps

1. **Read the current state:**
   - Read `tasks.json` to see all available tasks
   - Read `progress.md` to see what was covered in previous briefs

2. **Identify what's new:**
   - Look at tasks that haven't been mentioned in progress.md yet
   - Prioritize high-priority tasks

3. **Generate the brief:**
   - Create a brief summary (3-5 sentences)
   - Focus on NEW or uncovered items from previous runs
   - Mention high-priority items first

4. **Update memory:**
   - Append today's brief summary to progress.md
   - Include the date/time and which task IDs were covered
   - Update task status in tasks.json if needed (mark as "briefed")

## Example Brief Format

```
Morning Brief - [DATE]
Covered tasks: #1, #3
High priority: Fix login bug (#3), Review pull requests (#1)
Medium priority: Update documentation (#2)
```

## Expected Behavior

- **First run:** Brief covers tasks #1, #3 (high priority items)
- **Second run:** Brief covers remaining tasks #2, #4, #5 (building on what was already briefed)
- **Third run:** Reports that all tasks have been covered, or covers any new tasks added

This demonstrates persistent memory across loop iterations.
