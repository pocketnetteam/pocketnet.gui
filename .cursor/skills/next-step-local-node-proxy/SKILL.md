---
name: next-step-local-node-proxy
description: >-
  Advances Local Node Proxy work one phase at a time: if a detailed phase plan
  is missing, writes it under docs/local-node-proxy/plans/; if it exists,
  executes the next unchecked step. Use when the user says next-step-local-node-proxy,
  /next-step-local-node-proxy, next Local Node Proxy step/phase, or asks to continue
  the localnode / Cordova direct-proxy roadmap.
---

# next-step-local-node-proxy

## Goal

One invocation = either **write** the missing detailed plan for the current phase, or **execute** the next unchecked item in that plan. Do not invent a parallel roadmap; stay aligned with `docs/local-node-proxy/`.

## Paths

| Role | Path |
|------|------|
| Roadmap | `docs/local-node-proxy/ROADMAP.md` |
| Phase briefs | `docs/local-node-proxy/phases/NN-*.md` |
| Architecture | `docs/local-node-proxy/ARCHITECTURE.md` |
| Agent rules | `docs/local-node-proxy/AGENT_CHECKLIST.md` |
| Detailed plans | `docs/local-node-proxy/plans/phase-NN.md` |
| Plan template | `.cursor/skills/next-step-local-node-proxy/plan-template.md` |
| Code root | `js/lib/client/localnode/` |

Phase number `NN` is zero-padded: `00` … `07`.

## Workflow (follow in order)

### 1. Locate current phase

1. Read `docs/local-node-proxy/ROADMAP.md`.
2. Find the **first phase** that still has any unchecked `- [ ]` step (ignore done phases).
3. If all MVP phases 0–6 are done and 7 is open, current = 7. If everything is done, tell the user and stop.
4. Note phase id `NN` and open `docs/local-node-proxy/phases/` matching file for that phase.

### 2. Branch: plan missing vs plan exists

Check for `docs/local-node-proxy/plans/phase-NN.md`.

#### A. Plan file missing → CREATE PLAN (do not code)

1. Read:
   - matching `phases/NN-*.md`
   - relevant sections of `ARCHITECTURE.md`
   - listed **Context files** in the phase brief (targeted reads / `rg` only)
2. Copy structure from `plan-template.md`.
3. Write `docs/local-node-proxy/plans/phase-NN.md` with:
   - concrete files to add/edit
   - ordered checkboxes fine enough for a small-context agent (often one checkbox ≈ one ROADMAP `X.Y` step, split further if a step is large)
   - exact Verify commands / manual checks
   - **Do not** list copied from phase brief + architecture
4. Add a Progress line in the phase brief: `YYYY-MM-DD — plan created → plans/phase-NN.md`.
5. Reply to the user with: phase name, path to the new plan, and that the **next** invocation will execute the first unchecked plan item.
6. **Stop.** Do not implement code in the same turn as plan creation unless the user explicitly said "plan and do" / "сразу делай".

#### B. Plan file exists → EXECUTE next step

1. Read `docs/local-node-proxy/plans/phase-NN.md` and `AGENT_CHECKLIST.md`.
2. Find the **first unchecked** `- [ ]` in that plan (skip Overview / non-task lists).
3. If the plan has no unchecked items but ROADMAP phase still has open steps: sync — either mark ROADMAP done or add missing plan checkboxes; prefer fixing the plan first, then stop and report.
4. If the plan and ROADMAP phase are both complete: advance logic — treat next ROADMAP phase as current on a **future** invocation; this turn only confirm phase complete and stop (unless user asked to continue into the next phase in the same message).
5. Execute **only that one** unchecked plan item:
   - Read its listed context files
   - Implement
   - Run its Verify
6. Mark the item `[x]` in `plans/phase-NN.md`.
7. If that item maps to a ROADMAP `X.Y` step, mark the matching box in `ROADMAP.md`.
8. Append Progress on both the plan and the phase brief (one line each).
9. **Stop** unless the user explicitly asked for multiple steps or the whole phase in this message.

### 3. Explicit user overrides

| User says | Behavior |
|-----------|----------|
| `next-step-local-node-proxy` / continue | Default workflow above |
| `plan only` / `только план` | Force branch A for current phase (rewrite only if they say `rewrite plan`) |
| `do` / `выполняй` / `plan and do` | If plan missing: write plan, then execute first step in the **same** turn |
| `whole phase` / `всю фазу` | Keep executing unchecked plan items until phase plan is complete or blocked |
| `phase N` | Use phase `N` instead of auto-detect (still plan-or-execute) |

## Hard rules (always)

- Follow `AGENT_CHECKLIST.md` constraints (no firebase/notifications; no `proxy16` server refactor; no generated bundle edits; no commit unless asked).
- Prefer ES5 / existing client style under `js/lib/client/localnode/`.
- Do not replace Electron System16 with Local Node Proxy.
- Do not put node wallet credentials in the client.
- Browser CORS work uses the relay from Phase 1; do not skip that dependency.
- Never edit the Cursor plan file under `.cursor/plans/` for this skill; only `docs/local-node-proxy/**`.

## Done response (every invocation)

Short status:

1. Current phase `NN` + mode (`planned` | `executed`)
2. What was written or which checkbox was completed
3. Next recommended invocation (next plan item text, or next phase)
