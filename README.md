# DIRTYFINGAZ ZX1 2.0

Mobile-first sampler prototype for Safari and modern browsers. No external dependencies.

## Current functional scope
- 16 visible pads per bank, with independent Bank A and Bank B sample slots (32 total).
- Tap an empty pad to assign one audio file.
- SAMPLES opens the multi-file picker and fills available slots in the active bank without overwriting occupied pads.
- Audio files are read as ArrayBuffers during import. AudioContext and decoding are deferred until the first playback gesture.
- Web Audio API playback with per-voice tracking; STOP stops every active voice, including overlapping triggers.
- NEW PROJECT aborts pending file reads, clears both banks and stops active voices.
- BPM display control (40–300), VALUE counter and UTILITY toggle.
- Responsive LCD/neon interface with EDIT LAYOUT IDs.

## Current limitations
- No sequencer, recording, mixer, project persistence, sample slicing, effects or MIDI.
- BPM is a display/control value and is not yet connected to a sequencer clock.
- Bank data and imported samples exist only in memory and are cleared on reload.
- Actual playback format support depends on the browser's Web Audio decoder. WAV/PCM is the safest interchange format.
- Validate on physical iPhone/Safari for device-specific audio and file-picker behavior.

## Development
Work on `auxiliary`, validate there, then integrate through `test`. Keep `main` stable.
