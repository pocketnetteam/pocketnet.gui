# PocketNet / Bastyon Agent Guide

This file is the project-specific operating guide for AI coding agents working in this repository. Keep changes small, evidence-based, and aligned with the existing PocketNet/Bastyon code style.

## Project Map

- This repository is the Bastyon/PocketNet GUI: a web, Electron, and Cordova/mobile application for the PocketNet blockchain social network.
- The frontend uses a custom legacy JavaScript module system. Most UI features live under `components/<module>/` with `index.js`, `index.less`, compiled `index.css`, and `templates/*.html`.
- `js/_map.js` is the module registry and build map. New or newly exposed modules usually need entries there.
- Core client behavior lives in `js/lib/client/`, `js/satolist.js`, `js/kit.js`, `js/app.js`, and `js/user.js`.
- Localization strings live in `localization/*.js`. User-facing text should be localized instead of hardcoded in templates or modules.
- `proxy16/` is a separate Node proxy/backend layer. RPC allowlists, signatures, node management, notifications, cache, and server behavior are maintained there.
- Build and packaging are driven by `package.json`, `minimize.js`, `tpls/`, `config/*.json`, Electron Builder config, and Cordova templates/resources.

## Before Changing Behavior

- Inspect the local implementation before editing. For UI work, read the module's `index.js`, templates, styles, related localization, and call sites.
- For navigation or page exposure, check `js/_map.js`, `js/app.js`, menu modules, and the relevant container such as `components/userpage`.
- For feed, post, wallet, transaction, or account behavior, inspect `components/lenta`, `components/post`, `components/pkoin`, `components/wallet`, `components/transactionslist`, and `components/transactionview` as applicable.
- For blockchain/RPC-facing work, inspect `js/lib/client/sdk.js`, `js/lib/client/api.js`, `js/satolist.js`, `proxy16/node/rpc.js`, `proxy16/node/manager.js`, and relevant proxy cache/server files.
- Prefer `rg` and targeted reads. Avoid broad searches through `node_modules`, generated bundles, build output, or release artifacts unless there is a specific reason.

## Coding Rules

- Follow the existing ES5/legacy JavaScript style in the touched area: `var`, function expressions, underscore helpers, `deep(...)`, `self`, `essenses`, `renders`, `actions`, and `events` patterns are common.
- Keep module changes scoped. Do not introduce broad refactors, new frameworks, or new architectural patterns for narrow fixes.
- Avoid mutating shared objects and arrays when a small copy is reasonable. Be especially careful with SDK state, cached objects, user info, shares, comments, wallet data, and transaction objects.
- Do not edit generated or minified bundles such as `js/join.min.js`, `chat/matrix-element*`, `dist/`, or compiled release artifacts unless the task explicitly requires generated output.
- If editing styles, prefer source `index.less` and update compiled `index.css` only if this repo's current workflow expects checked-in CSS for that component.
- Keep functions small when adding new code. Use early returns to avoid deep nesting.
- Preserve existing public names and URL shapes unless the task explicitly changes them.

## Frontend Rules

- UI modules should update behavior, templates, localization, and styles together when the visible interface changes.
- Preserve desktop, mobile, Electron, Cordova, and web behavior. Check `self.app.mobileview`, `window.cordova`, `_Electron`, `inWnd`, `inTooltip`, and anonymous/authenticated states before changing flow.
- For `userpage` changes, keep left-menu reports, mobile report behavior, history parameters, and embedded module loading consistent with existing reports.
- Do not hardcode English labels in templates. Add localization keys to the relevant `localization/*.js` files.
- Treat user-generated content as untrusted. Preserve existing XSS/sanitization helpers and escaped template output.
- For interactive UI, verify that loading, empty, error, and permission states are handled.

## Data, RPC, And Blockchain Rules

- Blockchain actions and RPC calls are sensitive. Confirm method availability, parameter order, auth requirements, caching, and response shape before wiring UI.
- Public node RPC exposure is controlled in `proxy16/node/rpc.js` and related manager/cache code. Keep allowlists and method signatures in sync.
- Client RPC wrappers often pass through `js/lib/client/sdk.js`, `js/lib/client/api.js`, and `js/satolist.js`. Reuse existing wrappers and cache patterns when possible.
- Wallet, private key, account, transaction, and signing flows require extra care. Never log secrets, private keys, mnemonics, auth tokens, or raw credentials.
- When displaying blockchain data, prefer explicit empty and pagination states. Do not assume every node response field is present.

## Security Rules

- Never expose or persist private keys, mnemonics, passwords, tokens, or signing material outside existing secure flows.
- Validate and sanitize external inputs, URL parameters, miniapp messages, RPC payloads, and user-generated text.
- Keep error messages user-safe. Avoid leaking implementation details, secrets, request headers, or private node data.
- For miniapps and iframe communication, preserve origin checks, sandbox assumptions, and postMessage boundaries.
- For moderation, auth, payments, donations, boosts, staking, and wallet flows, review surrounding code and similar call sites before editing.

## Verification

- For docs-only changes, run `git diff --check` and read the final Markdown.
- For frontend module changes, run a targeted build such as `npm run dev:bastyon` or the relevant `minimize.js` command, then manually verify the affected route in browser/Electron when practical.
- For full GUI build verification, use `npm run build`.
- For proxy changes, run `npm run build:proxy16` from the repository root or `npm run build` inside `proxy16`.
- For Electron runtime checks, use `npm start` or `npm run start:test` when the task needs the desktop shell.
- If a command is unavailable or too expensive for the current task, state exactly what was not run and why.

## Git And Generated State

- The working tree may contain user changes. Do not revert unrelated files.
- Before summarizing work, inspect `git diff --check` and the relevant diff.
- Do not commit, push, publish, deploy, or change third-party services unless explicitly asked.
- Avoid changing lockfiles, generated assets, or platform packaging files unless dependency/build work requires it.

## Current Boost Context

- Boost is a content advertising action, not just a generic wallet transaction.
- The boost action is represented by `ContentBoost` in `js/kit.js`, triggered from post/feed flows as `liftUpThePost`, and sent through action handling in `js/lib/client/actions.js`.
- Boosted content is injected into feeds through `getboostfeed` and related client/proxy RPC paths.
- Existing advertising and monetization UI lives in `components/advertising`, `components/earnings`, `components/monetization`, and `components/userpage`.
- For future boost history work, treat sent and received boosts as public content/advertising history tied to an address, with wallet implications but a primary home in advertising/profile context.
