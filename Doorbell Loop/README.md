# Project 6: The Doorbell Loop

An event-driven loop implementation where GitHub pull request events trigger automated responses.

## Concept

The **Doorbell Loop** pattern demonstrates event-driven execution where external events (like a doorbell ring) trigger the loop rather than running on a timer.

```
PR Event (Doorbell Ring) → GitHub Webhook → GitHub Actions → Heartbeat Response
```

## How It Works

### Event-Driven Trigger

The workflow is triggered by GitHub webhook events:

1. **`pull_request.opened`** - When a new PR is created
2. **`pull_request.synchronize`** - When new commits are pushed to an existing PR

These events act as the "doorbell rings" that wake up the system.

### Workflow Execution

When a PR event occurs:

```yaml
on:
  pull_request:
    types:
      - opened       # Initial doorbell ring
      - synchronize  # Follow-up ring
```

The workflow then:

1. **Logs** the event details (PR number, event type, timestamp)
2. **Posts** a heartbeat comment to the PR confirming the event was received

### Key Characteristics

- ✅ **Event-driven**: Only runs when PR events occur (not on a schedule)
- ✅ **No polling**: GitHub webhooks push events to Actions
- ✅ **Stateless**: Each run is independent, no persistent state needed
- ✅ **Instant response**: Workflow triggered within seconds of PR activity
- ✅ **No external dependencies**: No API keys or third-party services required

## Setup Requirements

**No setup required!** The workflow runs with GitHub's default permissions.

The workflow only needs:
- `pull-requests: write` - To post heartbeat comments

This is already configured in the workflow file. GitHub Actions must be enabled for the repository (default for most repos).

## Testing the Doorbell Loop

1. Create a new branch:
   ```bash
   git checkout -b test-doorbell-loop
   ```

2. Make a code change and commit:
   ```bash
   echo "# Test file" > test.md
   git add test.md
   git commit -m "Test doorbell loop trigger"
   ```

3. Push and create a PR:
   ```bash
   git push -u origin test-doorbell-loop
   ```
   Then create a PR on GitHub (or use `gh pr create` if you have GitHub CLI installed)

4. **🔔 First doorbell ring**: The `opened` event triggers the workflow immediately
   - Check the PR - you'll see a heartbeat comment within seconds

5. Push additional commits to the same PR:
   ```bash
   echo "# More changes" >> test.md
   git add test.md
   git commit -m "Additional changes"
   git push
   ```

6. **🔔 Second doorbell ring**: The `synchronize` event triggers the workflow again
   - Another heartbeat comment appears on the PR

## What Makes This a "Doorbell" Loop?

| Traditional Timer Loop | Doorbell Loop (This Project) |
|------------------------|------------------------------|
| Runs on schedule (cron) | Runs on external events |
| Polls for changes | Reacts to webhooks |
| Wastes cycles checking | Only runs when needed |
| Requires state tracking | Stateless, event contains context |

The "doorbell" metaphor: Just like you don't continuously check if someone is at your door—you wait for the doorbell to ring—this loop doesn't poll for PRs, it waits for GitHub to notify it.

## Files

- `.github/workflows/pr-review.yml` - GitHub Actions workflow (simplified event heartbeat)
- `README.md` - This documentation

## Workflow Structure

```yaml
name: Doorbell Loop - Event Heartbeat

on:
  pull_request:
    types: [opened, synchronize]  # The doorbell triggers

jobs:
  doorbell-heartbeat:
    runs-on: ubuntu-latest
    steps:
      - Log event details
      - Post heartbeat comment to PR
```

That's it! No dependencies, no API keys, just pure event-driven demonstration.

## Event Flow Diagram

```
Developer creates/updates PR
         ↓
GitHub webhook fires (doorbell rings!)
         ↓
GitHub Actions runner starts
         ↓
Log event details
         ↓
Post heartbeat comment to PR
         ↓
Workflow completes (runner stops)
```

**Key Point**: The runner doesn't stay running. It spins up only when the doorbell rings, does its work, then shuts down. No continuous process, no polling, no wasted resources.

## No Cron, No Polling, No Manual Triggers

This implementation strictly follows the event-driven pattern:
- ❌ No `schedule` triggers
- ❌ No `/loop` command
- ❌ No cron jobs
- ❌ No manual workflow dispatch
- ✅ Pure event-driven execution

## Monitoring

View workflow runs:
- GitHub Repository → Actions tab
- Click on "Doorbell Loop - Event Heartbeat" workflow
- See all triggered runs with their PR event context
- Each PR comment includes a link to the workflow run logs

## What This Demonstrates

This project shows the **Doorbell Loop pattern** in its purest form:

1. **No continuous process** - The workflow doesn't run until triggered
2. **Event-driven** - External events (PR webhooks) drive execution
3. **Stateless** - Each run is independent
4. **Immediate response** - Triggers within seconds of the event
5. **Resource efficient** - Only consumes resources when needed

This is the foundation pattern for building event-driven systems. You could extend this to:
- Trigger deployments on merge
- Run tests on PR updates
- Notify team channels
- Update project management tools
- Any action driven by repository events
