# Intent, Progress, And Recovery

Use this reference when changing intent capture, ongoing-work records, recovery,
or terminal cleanup. Use the repository's existing documents; these are roles,
not mandatory filenames, platform objects, tools, schemas, or a new task system.

## Capture And Keep Work Recoverable

Preserve new governing input before backward investigation or execution.
Product-specific intent, corrections, and open questions go verbatim into the
existing wording/recovery evidence; general work instructions go into existing
progress control, ahead of the next start unless they change the current route.
Keep interpretation, adopted decisions, run facts, and exact user words distinct.
If no such roles exist, use the smallest suitable existing artifact rather than
creating a parallel authority for one request.

Keep the current authorized work, actual position, next action, stopping
boundary, and key evidence recoverable. Persist a concise stage conclusion when
losing it would change the route or repeat substantial work, especially before
long work or handoff. Do not log private reasoning, every command, or ordinary
local checks. Keep stable policy and completed history out of the hot path.
Use existing status conventions; no required Goal API, active-task object,
transition enum, fixed queue, or line-count limit is introduced by this Skill.

## Resume Without Replaying

After genuine context loss, compaction, handoff, or an uncertain interruption:

1. Identify the latest explicit, still-unfinished user instruction. Read the
   relevant current progress/plan and completion evidence before writing.
   A summary is a locator, not authority to revive an old task.
2. Preserve the current scope, limits, and completed steps. A newer explicit
   instruction may change the route; a recent file, tool checkpoint, paused
   obligation, or missing detail cannot silently do so. Where the environment
   already has relevant work records, reconcile them rather than create or
   depend on any particular tool. Ask only if a material conflict remains.
3. Any credible completion report, persisted terminal result, or documented
   successful cleanup prohibits replay of the same instruction instance.
   Missing records alone are unknown, not proof of completion or failure.
   Reopen only on explicit user reissue or verifiable evidence invalidating the
   old result; preserve the prior result and explain the new scope.
4. If the action already succeeded and only documentation lags, do only that
   writeback. Do not rerun tests, business actions, publication, or release just
   because an older document still says in progress.
5. Read further history or exact wording only to resolve a real inconsistency.
   If no previous work remains and a clear new request exists, begin that request
   using only the authorities it needs; do not reconstruct the whole session.

An ordinary synchronous failure with a clear outcome and intact task context
is handled locally. For an ambiguous stateful outcome, inspect the affected
real state before retrying. Run full recovery only when context or governing
work identity may actually be lost. “Continue” resumes the governing unfinished
work; it does not select the latest incidental subtopic.

## Shared Writing

Before changing shared files, reread their relevant latest content and existing
assignment/ownership information. Change only the authorized scope; preserve
other writers' work. Without concurrent writers, no roster or coordination
protocol is required.

With concurrent writers, use the project's existing coordination mechanism and
an execution identity that distinguishes live writers. A forked copy of context
or an inherited identifier is not proof of unique identity or ownership; confirm
or obtain a fresh instance identity before relying on it. A small shared list is
not an atomic lock. On overlap, drift, or unclear ownership, stop the affected
write and reconcile it rather than overwrite or claim another writer's scope.

## Terminal Maintenance

First place durable decisions, changed requirements, results, failure context,
and unresolved obligations at their proper authority. Mark the work terminal
with evidence, or delete a successful temporary read-only/task anchor when no
obligation or unique audit/recovery evidence is lost. Preserve exact wording,
adopted decisions, completion evidence, failures, and handoff information that
remain necessary. Do not accumulate temporary anchors as a shadow backlog.

Continue only the next already-authorized work. A held or paused item remains
held until its stated resume condition is met; an empty current-work slot is
valid. A blocker records a blocker, not permission to replace the user's task.
