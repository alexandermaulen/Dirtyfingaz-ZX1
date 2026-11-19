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
