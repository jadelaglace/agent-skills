---
name: handoff-context
description: >
  Create a continuation-ready stage handoff when the user asks to hand off,
  summarize the current stage, or prepare context for a new conversation.
  Preserve intent, actual progress, evidence, unresolved work, and boundaries;
  do not turn it into a transcript or restart completed work.
metadata:
  short-description: "Generate continuation-ready handoff context"
  version: "1.0.3"
---

# Handoff Context

Create one self-contained handoff in the user's language that lets another
Agent continue the current work safely. Lead with the current state and the
first useful next action. Include enough background to explain why that action
is right, but omit transcript detail that cannot change it. An outline is
guidance, not a required template.

## Build the handoff

- Reconcile the latest user intent and corrections with the current plan,
  relevant project documents, and available evidence. Keep user decisions,
  suggestions, external claims, implementation details, and observed results
  distinct.
- State what is complete, active, paused, waiting for a decision, blocked, or
  unknown. Give evidence for consequential claims and name evidence gaps.
- Capture only identifiers needed to resume: project or repository, branch and
  revision, relevant paths, release state, run or session identifiers. Verify
  mutable disk or remote facts before reporting them; a snapshot cannot prove
  current state. Disk observations do not override user intent, authorization,
  or acceptance.
- Preserve unresolved user choices, constraints, known defects, failed routes
  that matter, rollback or data-loss risks, and actions explicitly not
  authorized. Omit routine noise and completed attempts that do not affect
  continuation.
- Distinguish finished work from the next authorized action. Explicitly warn
  against replaying completed operations. Do not claim acceptance, testing,
  installation, synchronization, or publication beyond its evidence.
  If only documentation lags a proven result, hand off the missing writeback,
  not another execution or test run. Paused work stays paused until resumed.
- Return the handoff in chat. Create or update a project document only when
  the user asks or the governing project process requires it.

## Shared workspaces

For one Agent, use the existing task and repository context; no coordination
record or platform-specific task API is required. When multiple Agents may
write in the same workspace, reread the relevant plan and current files before
editing. Keep each change narrow, avoid overlapping ownership, and stop to
coordinate if another active change conflicts or ownership is unclear. Read-only
handoffs do not need a registry or identity protocol.

## Suggested outline

Choose only the sections useful for this handoff:

1. Goal and important user decisions
2. Current state and completed results
3. Evidence and discrepancies
4. Active or waiting work and the next safe action
5. Risks, caveats, and protected boundaries
6. Relevant paths and identifiers

For simple work, a short paragraph is enough. End with the first concrete
action the next Agent should take, or say that no work should resume without a
new user instruction.
