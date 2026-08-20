# Loop Engineering Practice

Hands-on practice with **Loop Engineering** using Claude Code.

This repository contains my practical implementations from the **Loop Engineering: A Crash Course** by Panaversity.

## 📚 Course

**Loop Engineering: A Crash Course — The AI Agent Factory**

[Open Loop Engineering Crash Course](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)

## 🚀 Practice Projects

### Project 1 — A Watch Loop

**Concept:** In-session loop

A loop watches a task while the session is open and tells me when the task finishes.

### Project 2 — Make the Tests Pass, Then Stop

**Concept:** Conditional loop + Maker-Checker

A loop keeps working until actual tests pass, allowing the test runner—not the agent—to decide when the work is complete.

### Project 3 — The Morning Brief with a Memory

**Concept:** Scheduled loop + Spine

A scheduled loop runs repeatedly, reads `progress.md`, gathers information, creates a summary, and updates its saved state.

### Project 4 — A Fix Loop with a Real Checker

**Concept:** Worktrees + Skills + Maker-Checker

An implementer creates a fix, a separate reviewer checks it, and only a `PASS` allows the workflow to move forward.

### Project 5 — Codify the Body

**Concept:** Dynamic Workflows

Turn the body of Project 4 into a re-runnable workflow and understand the difference between an execution engine and a real loop.

### Project 6 — The Doorbell Loop

**Concept:** Event-driven loop + Connectors

Build a loop that reacts to a GitHub pull request without requiring a manually typed prompt.

### Project 7 — Break It on Purpose

**Concept:** Observability + Cost + Failure Diagnosis

Intentionally break a loop and diagnose what went wrong using its saved state and logs.

### Project 8 — Your Own Daily Loop

**Concept:** Full six-part loop — Capstone

Build a real recurring workflow using the complete loop architecture: heartbeat, worktree, skill, maker-checker, connector, and spine/state.

### Project 9 — The Skill / Tool Drill

**Concept:** Skills + Tool Definition

Demonstrate how agents utilize explicit custom tools and skills to execute structured tasks deterministically.

### Project 10 — The Secrets Drill

**Concept:** A4 (Secrets) + A2 (The Environment)

Prove why gitignored `.env` files fail in fresh cloud runners and demonstrate credential injection via system environment variables.

### Project 11 — Build the Two-Routine Gate

**Concept:** A3 (API trigger) + A4 (The gate) + A6 (The checklist)

Build a two-routine Human Gate system where drafting happens automatically, but execution/publishing requires an explicit, authenticated API trigger.

### Project 12 — Build a Dreaming Loop

**Concept:** Concept 12 (Spine & Improvement Loop) + Capstone

Build a weekly self-improvement loop that analyzes historical logs, cites concrete failure evidence, and proposes rule changes via PR behind a human gate.

## 🧠 Concepts

* Loop Engineering
* Agentic AI
* AI Agents
* AI Automation
* Agentic Coding
* Claude Code
* OpenCode
* In-session Loops
* Conditional Loops
* Scheduled Loops
* Event-driven Loops
* Maker-Checker Architecture
* Worktrees
* Agent Skills
* Subagents
* MCP / Connectors
* State & Memory
* Autonomous AI Workflows
* AI Coding Agents
* Agentic Engineering

## 🎯 Goal

The goal is to learn how to design systems where AI agents can **work, verify, remember, and continue** with less step-by-step human prompting.

**Prompting → Context Engineering → Harness Engineering → Loop Engineering**