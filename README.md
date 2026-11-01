# Codex Skills

Personal Codex skills maintained by `jadelaglace`.

<!-- workspace-recovery:start -->
## Workspace recovery

1. After context loss or interruption, identify the latest unfinished explicit user request and check existing progress and completion evidence.
2. Read the [current plan](docs/skill-replication-plan.md), which links the governing work; no particular task API or platform object is required.
3. Preserve completed instruction instances; held follow-ups need their explicit resume condition. An ordinary synchronous command failure with intact context is handled locally, not as a full recovery.

This block is a shallow entry point; the linked plan owns current progress.
<!-- workspace-recovery:end -->

## Skills

See the [skill lineage, design style, versions and distribution index](SKILLS-INDEX.md)
for the maintained registry of mainlines, strict variants, private corpus, and
observed installation state. This is not an activation or installation switch.

- `product-docs` (`1.0.5`): maintain intent, acceptance, progress, and evidence with tool-neutral recovery and minimal shared-write protection.
- `handoff-context` (`1.0.3`): create concise, evidence-backed, tool-neutral handoffs with an optional outline, minimal shared-write protection, and no replay of terminal work.
- `architecture` (`1.1.1`): define technical contracts and verify functional-unit and integration evidence.
- `code-quality` (`1.1.1`): implement and review code against adopted contracts, tests, and quality gates.
- `design-standards` (`1.1.1`): create reusable design standards and verify actual rendered outputs.
- `report-render` (`1.0.0`): render existing HTML reports to long or paginated PNGs and record visual QC without changing report facts.
- `research-report` (`1.1.0`): orchestrate traceable research from question and evidence through Markdown, adversarial review, rendered delivery, and archival.

Publication scope (2026-11-01): `handoff-context` 1.0.3 now refines the accepted
1.0.1 baseline without the halted #16 tool/identity-table binding and is synced
locally. The independent strict `handoff-note` 1.0.0 remains disabled and uninstalled.
The old #16 mechanism is not resumed; historical version identities are preserved.
The four local Skills above were restored from pre-absorption commit e43c0cb,
then selectively refined and installed locally. These versions are included in
this publication round; Git delivery is tracked in the [publication record](docs/validation/2026-11-01-publication/REVIEW.md). See the [three-line plan](docs/four-skills-three-line-plan.md)
and [implementation evidence](docs/four-skills-three-line-evidence.md).
The [original 1028 corpus](corpus/1028-original/TRANSCRIPTION-NOTES.md) is private
local text plus a public-safe manifest; the [strict project-* variants](variants/1028-strict/COVERAGE.md)
use disabled source files and are not installed or activated. The handoff corpus
and strict derivative have independent manifests/coverage linked from the index. Neither is part
of the active local four-Skill line.

The screenshot-derived replication boundary and current validation status are recorded in
[`docs/skill-replication-plan.md`](docs/skill-replication-plan.md). The two skills are
portable workflow contracts; no source screenshot credentials, private endpoints, or
project-specific scripts are included. They do not bundle renderer scripts or HTML
templates, and their end-to-end research/rendering paths have not yet been proven.

For the whole workspace, see the [conversation history, rules, and pitfalls](docs/workspace-history-and-rules.md).
Detailed source, installation, and validation evidence is in
[`docs/replication-evidence.md`](docs/replication-evidence.md). These records do not
replace each Skill's own contract or authorize queued work.

Skill versions are independent from repository release versions. Each Skill's
`metadata.version` records that Skill's own public contract version. Repository
publication tags use the date-based form `repo-YYYY.MM.DD` with a same-day
revision suffix when needed; the previous publication is `repo-2026.10.25.3`. This
round targets `repo-2026.11.01`; delivery status and exact commit identity are in the publication record. A repository tag identifies the coordinated contents of
the repository and must not be interpreted as a Skill version. Historical
numeric tags such as `1.0.0`–`1.0.2` are retained for compatibility and are not
reused for new publications.

The initial commit preserves the pre-optimization baseline of `product-docs`.

No repository-wide license is granted unless one is added explicitly later.
