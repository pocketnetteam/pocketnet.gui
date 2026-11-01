---
name: next-step-local-node-proxy
description: >-
  Advances Local Node Proxy work one phase at a time: if a detailed phase plan
  is missing, writes it under docs/local-node-proxy/plans/; if it exists,
  executes the next unchecked step and enforces tests/localnode gates (no
  silent skip after code lands). Use when the user says next-step-local-node-proxy,
  /next-step-local-node-proxy, next Local Node Proxy step/phase, or asks to
  continue the localnode / Cordova direct-proxy roadmap.
---

# next-step-local-node-proxy

## Goal

One invocation = either **write** the missing detailed plan for the current phase, or **execute** the next unchecked item in that plan and **pass test gates**. Do not invent a parallel roadmap; stay aligned with `docs/local-node-proxy/`.

## Paths

| Role | Path |
|------|------|
| Roadmap | `docs/local-node-proxy/ROADMAP.md` |
| Phase briefs | `docs/local-node-proxy/phases/NN-*.md` |
| Architecture | `docs/local-node-proxy/ARCHITECTURE.md` |
| Agent rules | `docs/local-node-proxy/AGENT_CHECKLIST.md` |
| Testing | `docs/local-node-proxy/TESTING.md` |
| Detailed plans | `docs/local-node-proxy/plans/phase-NN.md` |
| Plan template | `.cursor/skills/next-step-local-node-proxy/plan-template.md` |
| Phase tests | `tests/localnode/phase-NN*.test.js` |
| Code root | `js/lib/client/localnode/` |

Phase number `NN` is zero-padded: `00` … `06`, then `08` (PeerTube), `09` (rpc-ex scenarios). **Phase 7 (WebSocket) is cancelled** — never create or execute it.

## Testing discipline (non-negotiable)

1. **T-tests early in every plan** (not docs-only): place **T-tests immediately after the first code task** (T1 → T-tests → T2…). Never leave T-tests last.
2. **No silent skip after code exists.** If this phase already added/changed `js/lib/client/localnode/*` (or phase scripts) and `tests/localnode/phase-NN*.test.js` is missing or T-tests is still `[ ]`, the **next execute must be T-tests** — even if another task appears first in the file.
3. **Do not mark ROADMAP `X.Y` done** unless step Verify passed **and** either:
   - `node --test "tests/localnode/phase-NN*.test.js"` passes, or
   - this is still the very first code task of the phase **and** T-tests is the immediate next plan item (only then Progress may say `tests: deferred to T-tests` — **once**).
4. **Never** write `tests: skipped (none yet)` after a second code task in the same phase.
5. Failed tests → leave the plan checkbox unchecked; fix or stop and report. No “land code, skip tests, continue”.
6. Phase is not complete until T-tests is `[x]` and **phase exit tests** pass.

## Workflow (follow in order)

### 1. Locate current phase

1. Read `docs/local-node-proxy/ROADMAP.md`.
2. Find the **first phase** that still has any unchecked `- [ ]` step (ignore done phases).
3. If phases 0–6, 8, and 9 are all done, tell the user Local Node Proxy roadmap is complete (Phase 7 cancelled) and stop. Skip Phase 7 always.
4. Note phase id `NN` and open `docs/local-node-proxy/phases/` matching file for that phase.

### 2. Branch: plan missing vs plan exists

Check for `docs/local-node-proxy/plans/phase-NN.md`.

#### A. Plan file missing → CREATE PLAN (do not code)

1. Read:
   - matching `phases/NN-*.md`
   - relevant sections of `ARCHITECTURE.md` and `TESTING.md`
   - listed **Context files** in the phase brief (targeted reads / `rg` only)
2. Copy structure from `plan-template.md`.
3. Write `docs/local-node-proxy/plans/phase-NN.md` with:
   - concrete files to add/edit
   - ordered checkboxes; **T1 (first code) → T-tests → remaining tasks**
   - T-tests covering the minimum for phase `NN` from `TESTING.md`
   - exact Verify + test commands on every task
   - **Do not** list from phase brief + architecture
4. Add Progress on the phase brief: `YYYY-MM-DD — plan created → plans/phase-NN.md`.
5. Tell the user the plan path; next invocation executes the first unchecked item.
6. **Stop** unless user said `plan and do` / `сразу делай`.

#### B. Plan file exists → EXECUTE next step

1. Read `plans/phase-NN.md`, `AGENT_CHECKLIST.md`, skim `TESTING.md`.
2. **Pick task (priority order):**
   1. If T-tests is `[ ]` **and** (`tests/localnode/phase-NN*.test.js` missing **or** any earlier code task in this plan is already `[x]`) → **select T-tests** (ignore later tasks until tests exist and pass).
   2. Else first unchecked `- [ ]` task in the plan.
3. If plan empty of unchecked items but ROADMAP still open: sync plan vs ROADMAP; stop and report if stuck.
4. If plan + ROADMAP phase both complete: run **phase exit tests**; stop (unless user continues to next phase this message).
5. Execute **only** the selected task:
   - Read its context files
   - Implement (T-tests = add/extend `tests/localnode/phase-NN*.test.js`; export pure helpers via `module.exports` if Node cannot load browser-only code)
   - Run its Verify
   - Run **step tests**
6. Mark plan `[x]` / ROADMAP `X.Y` **only if** Verify + step-test rules in **Testing discipline** pass.
7. If last plan task: run **phase exit tests** before claiming phase done.
8. Progress on plan + phase brief: include exact test command and `pass` / `fail` / `deferred to T-tests` (once only).
9. **Stop** unless user asked for multiple steps / `whole phase`.

### 2b. Test commands

```bash
# Step / after every execute once suite exists:
node --test "tests/localnode/phase-NN*.test.js"

# Phase exit (phase complete or whole phase finished):
node --test "tests/localnode/**/*.test.js"
```

Do not run `test:live` unless the plan task requires it and the CORS relay is running.

**Retroactive debt:** If you discover a prior phase marked done in ROADMAP but missing `phase-NN` tests, stop feature work and either add those tests in this turn (preferred when user asks for discipline/fixup) or report the gap before continuing a later phase.

### 3. Explicit user overrides

| User says | Behavior |
|-----------|----------|
| `next-step-local-node-proxy` / continue | Default workflow above |
| `plan only` / `только план` | Force branch A (rewrite only if `rewrite plan`) |
| `do` / `выполняй` / `plan and do` | Plan if missing, then execute first/priority task same turn |
| `whole phase` / `всю фазу` | Keep going until plan complete or blocked; exit tests at end; still force T-tests before further code if missing |
| `phase N` | Use phase `N` (still plan-or-execute + test priority) |

## Hard rules (always)

- Follow `AGENT_CHECKLIST.md` (no firebase/notifications; no `proxy16` server refactor; no generated bundles; no commit unless asked).
- Prefer ES5 / existing client style under `js/lib/client/localnode/`.
- Do not replace Electron System16 with Local Node Proxy.
- Do not put node wallet credentials in the client.
- Browser CORS work uses the Phase 1 relay; do not skip that dependency.
- Never edit `.cursor/plans/*` for this skill; touch `docs/local-node-proxy/**`, `tests/localnode/**`, `js/lib/client/localnode/**` (and listed scripts) as planned.

## Done response (every invocation)

Отчёт пользователю **на русском** (кратко, по пунктам):

1. Текущая фаза `NN` и режим (`план` / `выполнение` / `принудительные T-tests`)
2. **Что сделано** — какие файлы/чекбоксы закрыты, одной–тремя фразами
3. **Тесты** — команда и результат (`pass` / `fail` / `deferred to T-tests`)
4. **Сомнения / риски** — явно перечислить: неоднозначности в коде/доках, места где угадывали, что не проверили (браузер, Cordova, live RPC), долги; если сомнений нет — написать «сомнений нет»
5. **Дальше** — следующий рекомендуемый вызов скилла (текст задачи)
