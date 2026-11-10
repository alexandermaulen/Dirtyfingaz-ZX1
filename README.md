# DIRTYFINGAZ ZX1

Mobile-first sampler workstation for Safari on iPhone. This branch ports the actual DIRTYFINGAZ ZP Creator hardware GUI and its Creator audio engine into ZX1.

## Creator interface
- ZP Creator hardware shell, LCD display, control layout, button styling, interaction states and mobile scaling.
- Nine touch pads in a 3 × 3 matrix, with stable IDs `PAD_01` through `PAD_09`.
- Hardware controls, rotary encoders, sample display, waveform view, trim markers, transport, pattern controls and project menu.
- Original Creator GUI-to-engine message bridge retained.

## Audio engine and actions
- Independent ZX1 copy of the Creator engine, isolated from ZP project storage.
- Nine sample slots; tap a pad to trigger its sample.
- Sample browsing/import, preview, waveform display and IN/OUT trimming.
- Pattern sequencer and pattern editing controls, with sample banks A–E. BANK_ID is independent from PATTERN_ID; MIDI data and steps belong to patterns, while samples belong to PADs.
- Pattern IDs (`PATTERN_01`, etc.) are stored independently from sample banks A–E. The pattern manager supports create, select, loop, duplicate, MIDI copy/paste and delete; clone remains disabled until its semantics are defined.
- Creator starts with a fresh empty project. Existing saved projects are opened explicitly from Project Manager.
- Transport, recording controls, BPM adjustment, pad settings, effects controls and project manager are retained from the source Creator.
- Local project/sample storage uses ZX1-specific IndexedDB and localStorage keys.
- Project import/export and local persistence are handled by the copied Creator engine.

## Files
- `index.html`: Creator interface adapted and branded as ZX1.
- `creator-engine.html`: isolated Creator audio engine.
- `zp-storage.js`, `zp-core.js`, `zp-ui-system.css`, `vendor/lame.min.js`: engine dependencies.
- `zp-agent.js`, `zp-agent.css`, `zp-agent-registry.json`: contextual agent UI and registry.
- `zp-layout.js`, `zp-layout.css`: Creator layout controls and panel docking.

The previous standalone sampler files `app.js` and `style.css` are removed because the Creator now owns the interface and engine integration.

## Validation
- Static integration and JavaScript syntax checks are performed before commit.
- Physical Safari/iPhone validation remains a separate device test.
- GitHub Pages deployment must be checked after the commit.

## Development flow
Work directly on `main` as the single development line. Keep the repository references synchronized; do not create feature or test branches.
