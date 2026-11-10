# Dirtyfingaz ZX1 2.0

Mobile-first sampler workstation prototype for Safari on iPhone.

## Current demo build

- Creator opens directly into an empty project.
- 16 touch pads with stable IDs: `PAD_01` through `PAD_16`.
- Load one audio file into an individual pad by tapping an empty pad.
- Import multiple audio files from the **SAMPLES** control; files fill the first available slots.
- Tap a loaded pad to play its decoded sample through the Web Audio API.
- **STOP** stops active sample voices.
- UTILITY opens and closes as a toggle.
- No audio starts automatically. The audio context is created only after a user action.
- Supported formats depend on Safari's native decoder; WAV/PCM is the recommended test format.

## Current limitations

- This is a first functional sampler demo, not a complete DAW.
- Sequencer, recording, mixer, bank B sample slots, project persistence and cloud sync are not implemented.
- Sample assignments live only in the current page session and are cleared by NEW PROJECT.
- Safari/iPhone 11 physical validation is still pending.

## Development flow

- `main`: stable production.
- `test`: integration and validation.
- `auxiliary`: active demo development.

Promote changes only through `auxiliary → test → main`, after validation and explicit approval.

## Files

- `index.html`: GUI structure, controls and audio file input.
- `style.css`: LCD/neon responsive interface.
- `app.js`: sampler interaction and Web Audio playback.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow for `auxiliary`.
