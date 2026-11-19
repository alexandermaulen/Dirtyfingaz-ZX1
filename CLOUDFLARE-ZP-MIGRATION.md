# DIRTYFINGAZ ZX1 · Cloudflare ZP reference migration

Date: 2026-11-19

## Product direction

The user requests that development continue in `alexandermaulen/Dirtyfingaz-ZX1`, using the published Cloudflare preview as the primary product and visual reference:

- Reference: https://dirtyfingaz-zp-preview.alexandermaulen.workers.dev/
- Target repository: https://github.com/alexandermaulen/Dirtyfingaz-ZX1
- Canonical coordination record: Notion page https://app.notion.com/p/41348df94c488065b575ed6c0fafb024

The Cloudflare publication is a reference snapshot, not proof that its source code is available from that URL. Do not assume that the deployed HTML is the editable source repository.

## Initial reference inventory

The inspected Cloudflare page presents a neon-green, retro 8-bit audio-console identity, mobile-oriented layout, LED status, horizontal tab navigation, and six main areas:

1. Home/dashboard
2. Creator
3. Three-channel mixer
4. Music/catalog
5. Stations/Radio Grid
6. Community mixes

The visible reference itself labels some content as demonstration or future integration. In particular, the catalog lacks real audio sources, community mixes depend on authentication/database, and collaborative radio depends on signaling, presence, and WebRTC. Treat UI presence separately from verified functionality.

## ZX1 baseline observed

At the time of this record:

- `main`: `58dfe20a946d2737e2ed496ec65b890d49090c7f`
- `auxiliary`: same SHA as `main`
- `test`: `a1286bed7487d78b01f8f32d756bb4963a9da6b1` (out of scope; do not modify)
- `index.html` already contains an earlier mobile shell; `creator-zx1.html` preserves the former Creator UI.
- Do not mistake the earlier shell for a faithful migration of the Cloudflare reference.

Preserve the ZX1 Creator and its engine, including nine PADs, PATTERN EDIT/Piano Roll, banks A–E, sample assignments and persistence, transport, BPM, REC, MIDI, audio, UTILITY, ADSR, Sample Edit, and existing project data.

## Migration principles

- Recreate the Cloudflare reference's visual identity, layout, navigation, responsive behavior, and interaction model in ZX1 with high visual fidelity.
- Integrate the complete experience progressively into ZX1; do not replace its audio engine or copy deployed HTML blindly.
- Keep the Creator integrated as a first-class module. Preserve its session and storage when navigating between modules.
- Audit every reference module and distinguish working functionality from demo UI and backend-dependent features.
- Keep ZX1 storage isolated. Do not merge ZP and ZX1 local-storage/IndexedDB namespaces or user data without a separately approved migration.
- Work one independently verifiable change at a time. Inspect, implement, validate, review diff, record commit, synchronize `auxiliary` fast-forward to `main`, verify Actions/Pages, then perform required iPhone/Safari QA.
- Leave `test` untouched.

## Acceptance criteria

- Main UI closely matches the Cloudflare reference in colors, typography, spacing, hierarchy, navigation, cards, and mobile behavior.
- All six areas are reachable and clearly labeled as implemented, demo, or pending.
- Creator retains all existing controls and musical behavior; entering and leaving it does not reset its session.
- No demo catalog, mixer, community, or radio feature is represented as production-ready without reproducible evidence and its required backend/audio services.
- Each delivery records changed files, automated tests, commit SHA, branch synchronization, Actions/Pages result, and physical device QA status.

## First deliverable: migration map (no functional edits yet)

Inspect the accessible source/repository behind the Cloudflare reference and the current ZX1 tree. Map:

- shell structure, styles, assets, breakpoints, and navigation
- Creator entry/exit, iframe contracts, postMessage origins, and session continuity
- audio engine, autoplay/user-gesture requirements, and audio routing
- localStorage/IndexedDB namespaces, sample persistence, and project import/export
- mixer, catalog, radio, and community modules and their real service dependencies
- mobile safe areas, viewport/fullscreen behavior, and Safari compatibility

Then propose the smallest safe first implementation slice. No module should be replaced until its dependencies and acceptance tests are understood.

## Status

Direction and initial Cloudflare page inventory recorded. No new functional migration from the Cloudflare reference has been implemented or device-tested in this record.


## Detailed source-to-target map · audit 2026-11-19

### Repositories and source confidence

- ZX1 target `main` currently points to `dbd9490c38018b0a0678ce6f27af72d4685f1edb`. Its GitHub Pages workflow run `44501825454` completed with `success` for that SHA.
- ZP reference repository `main` currently points to `959e253afec5be0f3047067c6da3071a770f151b`.
- The Cloudflare Worker URL could not be fetched through the available page-fetch path during this audit. Therefore the repository is an inspectable source candidate, not yet proven byte-for-byte identical to the deployed preview. The deployed page was previously inspected visually; compare again against the live preview during implementation and device QA.
- ZP has its own deploy and runtime architecture. Do not move its Cloudflare deployment configuration, secrets, Durable Object namespace, or service bindings into ZX1 as a side effect of copying UI.

### Module-by-module map

| Reference area | ZP source evidence | ZX1 current state | Target treatment |
| --- | --- | --- | --- |
| Global shell / Home | `index.html` lines 1–55; inline CSS; `zp-ui-system.css` | `index.html` has a simpler 560px mobile shell, tabs, dashboard and status card | Rebuild the ZX1 shell to match the Cloudflare composition, typography, neon palette, cards, spacing, status LED and responsive behavior. Keep ZX1-owned navigation and iframe contract. |
| Creator | ZP `creator.html`, `creator-engine.html`, `zp-core.js`, `zp-storage.js`, `zp-layout.js`, `zp-layout.css`, `zp-agent*.js/css/json` | ZX1 `creator-zx1.html` + `creator-engine.html`; original Creator is preserved in its own document | Keep ZX1 Creator and engine. Adapt its frame/container only where required for visual fit. Never replace with ZP Creator or merge their storage namespaces. |
| Three-channel mixer | ZP `index.html` inline mixer markup and script | ZX1 `index.html` currently shows an integration placeholder | Rebuild as a real three-channel mixer connected to ZX1 audio graph/outputs after inspecting engine routing. Do not copy ZP demo sliders as if they mix three independent audio inputs. |
| Music/catalog | ZP `index.html` static release cards and `data-play` handlers | ZX1 `index.html` currently shows an integration placeholder | Recreate the catalog UI and define real track sources/import/local playback. ZP current handlers explicitly report that no audio source is connected; cards are demo data. |
| Stations / Radio Grid | ZP `index.html` room UI + WebSocket/WebRTC client; `radio-worker.mjs`; `wrangler.jsonc`; `wrangler.preview.jsonc` | ZX1 `index.html` currently shows an integration placeholder | Port the experience only after defining ZX1-owned service endpoint, origin policy, presence, signaling, permissions and failure states. ZP Worker has a Durable Object `RadioRoom`; production Wrangler binds `RADIO_ROOMS`, but `wrangler.preview.jsonc` has no Durable Object binding, while the Worker returns `RADIO_ROOMS_BINDING_MISSING` if absent. ZP client config defaults to same-origin; do not assume it works from ZX1 Pages. |
| Community | ZP `index.html` empty-state panel | ZX1 `index.html` currently shows an integration placeholder | Recreate the reference's visual card/feed structure and clearly label as preview/coming soon until identity, profile, database, upload and moderation services exist. Do not fabricate users or published mixes. |

### Functional evidence and limits in ZP source

- **Mixer:** three sliders update labels/meters, but the audible test uses one sawtooth oscillator at 110 Hz. Only channel 1's value is applied to that oscillator gain; it is not a three-input mixer. The UI itself says mixing multiple files is a future iteration.
- **Music:** track buttons update the player label/state and then report `NO HAY UNA FUENTE DE AUDIO CONECTADA`. Catalog cards are demonstration content, not playable catalog entries.
- **Radio:** client code implements room WebSocket, presence, chat, WebRTC peer signaling and Creator-state broadcast. The Worker defines a Durable Object room with WebSocket support and SQLite storage in production configuration. The preview config omits the Durable Object binding; verify actual deployed binding before advertising rooms as online. STUN servers are configured in the client; no TURN configuration was found in the inspected source.
- **Community:** current panel is an explicit empty-state placeholder and states that authentication/database are required.
- **Creator:** ZP Creator is a different implementation and data contract. ZX1's own `creator-zx1.html` and `creator-engine.html` are authoritative for this target.

### ZX1 file ownership and integration boundaries

| ZX1 path | Responsibility | Migration rule |
| --- | --- | --- |
| `index.html` | Target shell, six views, navigation and host-to-Creator bridge | Main visual integration surface; retain validated message origin/source checks and persistent Creator iframe. |
| `creator-zx1.html` | Preserved ZX1 Creator GUI and controls | Preserve behavior and storage; change only after focused audit and regression test. |
| `creator-engine.html` | ZX1 audio engine, scheduler, project/sample state and command registry | No replacement or bulk copy from ZP. Mixer integration must use explicit engine-owned audio ports. |
| `scripts/validate-zx1.mjs` | Automated structural/contract regression checks | Extend tests for each module and host/engine contract before claiming completion. |
| `vendor/lame.min.js` | Existing audio export dependency | Keep local dependency and existing export flow. |
| `CLOUDFLARE-ZP-MIGRATION.md`, `CM-ZX1-SURVEY.md` | Migration decision and project record | Update with each verified change and limitation. |

The current ZX1 tree also contains `zp-agent*.js/css/json`, `zp-core.js`, `zp-layout*.js/css`, and `zp-storage.js`. Their names and shared code lineage do not prove that they are drop-in replacements for ZP modules. Audit each import, storage key, message contract and validator before reuse.

### Safe implementation order

1. **Visual shell fidelity:** reproduce reference shell and Home layout in ZX1 `index.html`, while keeping the current Creator iframe and its host-return message. Add screenshot/DOM checks for six tabs, safe-area sizing, scrolling and creator-mode fullscreen.
2. **Creator continuity:** test enter/exit and re-entry without reload; preserve samples, project state and active session. Run existing validator before and after shell changes.
3. **Mixer architecture:** inspect ZX1 engine graph and add three explicit source buses/controls with mute/solo/level and master routing; add audio graph tests. If three independent inputs cannot be safely exposed, state that limitation instead of presenting dummy faders.
4. **Music:** implement catalog data model and a real playback source (user-imported local audio first is a possible no-backend slice); distinguish sample/demo metadata from playable files.
5. **Radio:** decide whether ZX1 will use a separate Worker or a separately approved shared service. Verify Durable Object binding, allowed origins, WebSocket endpoint, TURN needs, microphone permissions and iOS Safari autoplay/ICE behavior before enabling collaboration.
6. **Community:** implement a truthful public read-only/local preview first; defer accounts, profiles, uploads and likes until an approved identity/database service and moderation model exist.
7. After each slice: run `node scripts/validate-zx1.mjs`, inspect diff, confirm Actions/Pages for exact SHA, synchronize `auxiliary` fast-forward, then guide iPhone Safari QA. Do not touch `test`.

### Audit conclusion

The current ZX1 shell has all six navigation destinations, but Mixer, Music, Stations and Community are placeholders. ZP's source provides the closest implementation reference for the shell and Radio UI, but its Mixer and Music are demonstrators and Community is a placeholder. The safest route is a high-fidelity shell first, ZX1 Creator preservation second, then real module implementations against ZX1-owned audio/storage/services. No functional code was changed as part of this audit.


## First implementation slice · Cloudflare shell applied to ZX1

Commit: `ff86f03c11d962f2f814a51893ca39cbc0fac46a` — `feat: align ZX1 shell with Cloudflare ZP reference`.

- Replaced the earlier minimal shell presentation with the ZP reference shell styling and section composition in ZX1 `index.html`.
- Kept all six destinations: Home, Creator, Mixer, Music, Stations/Radio, Community.
- Creator iframe now explicitly loads `./creator-zx1.html`; ZX1 Creator and engine files were not replaced.
- Preserved the host return contract: same-origin message, expected iframe source, protocol version 1 and source `dirtyfingaz.zx1`.
- Mixer faders/test controls, catalog play actions and Radio room actions are visibly present as reference UI but disabled until real ZX1 audio/services are integrated. This is intentional; the slice is visual, not a claim that these modules are complete.
- `auxiliary` was fast-forwarded to the same SHA; `test` remains unchanged at `a1286bed7487d78b01f8f32d756bb4963a9da6b1`.
- Actions/Pages run `44502557385` for the implementation SHA was `in_progress` when recorded. Await result before acceptance.
- iPhone/Safari visual and interaction QA remains pending.

Next: confirm automated validation and deployment, then verify the published page and Creator continuity on iPhone before moving to a real ZX1 mixer integration.


## Coordinated release protocol · 2026-11-19

The user requests that Notion, GitHub and Cloudflare be managed in a coherent, ordered workflow. This protocol is now authoritative for changes across the three systems.

### Order of operations

1. **Notion — decision and change record:** record the objective, scope, dependencies, risks, acceptance checks and current state before implementation. Notion is the coordination/source-of-decisions layer; checklist completion means a decision is ready, not that code is shipped.
2. **GitHub — source of truth:** inspect current branch heads and files; implement the smallest independently testable change; review the diff; run repository validators and Actions; commit the verified result. Keep `main` and `auxiliary` aligned as required by the deployment configuration; leave `test` untouched.
3. **Cloudflare — deployment only:** deploy only the reviewed GitHub commit/branch intended for the Worker. Verify build settings, Wrangler config, Worker entry point, bindings, Durable Object migrations/exports, routes and environment before retrying. Do not use a generated default static configuration as a substitute for the source Worker's runtime configuration.
4. **Verification — exact SHA:** confirm the Cloudflare deployment references the intended commit, inspect its live URL, then perform iPhone/Safari QA. Record success, failure and remaining device checks in both Notion and this file.

### Current Cloudflare blocker — confirmed from logs and source

- Cloudflare build authentication is now working: the build initialized, cloned the repository and ran `npx wrangler deploy`.
- Wrangler detected Worker name `dirtyfingaz-zp-preview`, framework Static and output directory `.`; no Wrangler project config was present in the ZX1 repository path, so Wrangler generated a basic static `wrangler.jsonc`.
- Upload of static assets succeeded, then deployment failed during Durable Object exports reconciliation:
  `orphaned_provisioned_namespace` for class `RadioRoom`, provisioned namespace ID `64333bad04b84057b155f15da1e67a3e`.
- ZX1 currently has no `wrangler.jsonc`, `package.json` or `radio-worker.mjs` at the inspected `auxiliary` ref (GitHub Contents API returned 404 for those paths).
- The ZP source repository does contain `radio-worker.mjs` exporting `RadioRoom`, and its `wrangler.jsonc` declares `main: ./radio-worker.mjs`, binding `RADIO_ROOMS` to class `RadioRoom`, and a live Durable Object export with SQLite storage.
- Therefore this is not a token failure or a frontend CSS problem. It is a deployment-architecture mismatch: the existing Cloudflare Worker has a provisioned RadioRoom Durable Object, while the ZX1 deployment is being treated as a static-only Worker with no matching class/export.
- **Safety rule:** do not add a `deleted` tombstone, delete/recreate the namespace, reset storage, or overwrite the existing Worker until the intended ownership and preservation plan for RadioRoom is explicit and tested. Do not blindly copy the ZP Wrangler config or Worker into ZX1; first audit class compatibility, namespace binding, migration history, storage format, allowed origins, WebSocket routes and the exact Cloudflare environment.

### Next safe work sequence

1. Inspect Cloudflare Worker settings and identify which GitHub repository/branch, build command and production/preview environment are connected to `dirtyfingaz-zp-preview`.
2. Compare the ZP Worker configuration and RadioRoom implementation with the actual Cloudflare Worker deployment/migrations. Confirm whether the provisioned namespace is the existing live radio service and whether it contains data.
3. Decide the target architecture: preserve the existing ZP RadioRoom service as a separate service consumed by ZX1, or deliberately migrate the Worker/runtime into a ZX1-owned deployment while preserving the same Durable Object class and namespace. Prefer keeping the existing radio service separate until migration compatibility is proven.
4. Only after that audit, make the smallest GitHub change: either keep Cloudflare deployment attached to the ZP service/repository while ZX1 deploys separately, or add an explicitly reviewed Worker entry/configuration to ZX1 with a safe namespace binding. Do not change the UI or audio engine as part of this infrastructure repair.
5. Deploy the exact reviewed commit to Cloudflare and verify both the Worker health endpoint and RadioRoom WebSocket behavior. Then test the ZX1 site and record iPhone QA.

### Verified release state at this checkpoint

- GitHub Pages workflow run `44504158957` for commit `d1e2ce9a3cf1d1ecaa93d4f4f9b4393a5871f350` completed with conclusion `success` (GitHub Pages only).
- This does **not** prove Cloudflare deployment succeeded.
- Cloudflare build log at 2026-11-19 10:28 UTC: token accepted; assets uploaded; final deploy failed at Durable Object reconciliation.
- Cloudflare remains blocked. No Worker namespace was deleted or retired by this work.
- User requests ongoing coordination across Notion, GitHub and Cloudflare in the order defined above.


## Branch reconciliation · 2026-11-19

The documentation update originally committed independently on `auxiliary` (a64bfdb08edc1030407e9d62968c6f08e1d3f146) is reconciled here with the coordinated release protocol originally committed on `main` (bd2204d43f0e8dd37a52495dad30c7d695c29109). Both changes concern only this migration record; no application source, audio engine, Creator, Worker code, or persistent data was changed by the reconciliation. The RadioRoom preservation guardrails and the deployment blocker recorded above remain in force.


## Execution checkpoint · 2026-11-19

### Step 1 — branch reconciliation: complete

- Original divergent documentation commits: `bd2204d43f0e8dd37a52495dad30c7d695c29109` on `main` and `a64bfdb08edc1030407e9d62968c6f08e1d3f146` on `auxiliary`.
- Both changed only `CLOUDFLARE-ZP-MIGRATION.md` and shared base `d1e2ce9a3cf1d1ecaa93d4f4f9b4393a5871f350`.
- Created a two-parent merge commit `0ca5bead9fc0ce75151d47486fe778002e3d9e04` preserving both documentation updates.
- Verified `main` and `auxiliary` are identical at `0ca5bea`; `test` remains exactly `a1286bed7487d78b01f8f32d756bb4963a9da6b1`.
- GitHub Pages workflow run `44507052722` is running for the merge commit; result not yet known.

### Step 2 — RadioRoom audit: source review complete, deployment ownership unresolved

- ZP `radio-worker.mjs` exports `RadioRoom`; the Durable Object accepts WebSockets, broadcasts presence, relays WebRTC signaling, handles collaborator chat and persists `roomState` using `this.state.storage.get/put`.
- Worker routes include `/api/radio/health`, `/api/radio/rooms/:name`, `/api/agent/*`; unknown API routes return JSON 404 and non-API requests go to `env.ASSETS.fetch(request)`.
- `RADIO_ALLOWED_ORIGINS` currently contains only `https://alexandermaulen.github.io` plus same-origin. The ZX1 Cloudflare hostname is not yet authorized by this source. Do not enable cross-origin Radio from ZX1 until this is deliberately reviewed.
- ZP production `wrangler.jsonc` binds `RADIO_ROOMS` to `RadioRoom` and declares SQLite storage. ZP `wrangler.preview.jsonc` does not declare `durable_objects` or `exports`; it is not a safe drop-in config for a Worker with an already provisioned RadioRoom namespace.
- No `migrations/` directory is present in the ZP root tree. The current config's class export/storage declaration and Cloudflare's provisioned namespace history therefore need dashboard-side verification before any Wrangler change.
- ZX1 repository has no root `wrangler.jsonc`, `radio-worker.mjs`, or `package.json` at the inspected ref. The failed Cloudflare build ran `npx wrangler deploy` from ZX1 branch `auxiliary` and auto-generated a static-only config for Worker `dirtyfingaz-zp-preview`; this conflicts with the existing provisioned RadioRoom class.
- This is a deployment ownership/architecture risk, not a frontend defect. Do not add Wrangler config, copy ZP Worker code, delete/recreate a namespace, or retry deploy until the target Worker ownership and namespace history are confirmed.

### Stop point — user decision / Cloudflare dashboard evidence required

Before Step 3, confirm whether the intended architecture is:
A. Keep `dirtyfingaz-zp-preview` as the original ZP RadioRoom service and create a separate ZX1 preview Worker (recommended safest separation); later connect ZX1 Radio to ZP via a reviewed API/origin change; or
B. Intentionally combine ZX1 assets and the ZP RadioRoom runtime into the existing `dirtyfingaz-zp-preview` Worker after verifying its exact deployed bindings, namespace ID, class history and configuration in Cloudflare.

No Wrangler configuration or Cloudflare deployment has been changed in this checkpoint. RadioRoom data and namespace have not been deleted, reset, renamed or migrated.
