# Dirtyfingaz ZX1 2.0

Mobile-first sampler workstation prototype, optimized for Safari on iPhone.

## Current build

- Creator opens directly into a new empty project.
- 16 empty pads with stable IDs: `PAD_01` through `PAD_16`.
- Named controls with stable IDs.
- Utility menu is a tap-to-open / tap-to-close toggle.
- Transport and BPM controls are visual interaction prototypes.
- No library, file browser, modal, audio playback or automatic process starts on entry.
- Audio engine is intentionally not connected yet.

## Development flow

- `main`: stable production.
- `test`: integration and validation.
- `auxiliary`: active development.

Promote changes only through `auxiliary → test → main`, after validation and explicit approval.

## Files

- `index.html`: semantic GUI structure and control IDs.
- `style.css`: LCD/neon responsive interface.
- `app.js`: GUI state and interactions; no audio engine.

## Next

Audit the interface on iPhone Safari, then define the GUI ↔ engine event contract before implementing audio behavior.
