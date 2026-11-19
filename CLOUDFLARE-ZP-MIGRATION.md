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
