# Doorbell Loop Test

This file was created to test the event-driven Doorbell Loop workflow.

## Test Details

- **Purpose**: Trigger `pull_request.opened` event
- **Expected**: GitHub Actions workflow should fire and post a heartbeat comment
- **Pattern**: Event-driven (no polling, no timer, no cron)

## What Should Happen

1. When this branch is pushed and a PR is opened, the workflow triggers
2. A heartbeat comment appears on the PR within seconds
3. If additional commits are pushed, the workflow triggers again (synchronize event)

This demonstrates the Doorbell Loop pattern in action! 🔔
