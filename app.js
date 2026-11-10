(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const pads = [...document.querySelectorAll(".pad")];
  const fileInput = $("AUDIO_FILE_INPUT");
  const message = $("SYSTEM_MESSAGE");
  const banks = { A: new Map(), B: new Map() };
  const readers = new Set();
  const voices = new Set();
  let activeBank = "A";
  let selectedPad = null;
  let projectVersion = 0;
  let bpm = 120;
  let value = 0;
  let audioContext = null;

  const announce = (text) => { message.textContent = text; };
  const slotKey = (bank, pad) => bank + ":" + pad.dataset.pad;
  const currentSamples = () => banks[activeBank];

  function setUtility(open) {
    $("UTILITY_MENU").classList.toggle("open", open);
    $("BTN_UTILITY").setAttribute("aria-expanded", String(open));
    $("UTILITY_MENU").setAttribute("aria-hidden", String(!open));
  }

  function updatePad(pad) {
    const item = currentSamples().get(slotKey(activeBank, pad));
    const number = String(pad.dataset.pad).padStart(2, "0");
    pad.classList.toggle("loaded", Boolean(item));
    pad.classList.remove("triggered");
    pad.querySelector(".pad-name").textContent = item ? item.name.slice(0, 12).toUpperCase() : "PAD " + number;
    pad.querySelector(".pad-state").textContent = item ? (item.loading ? "LOADING" : item.error ? "ERROR" : "READY") : "EMPTY";
  }

  function renderBank() {
    pads.forEach(updatePad);
    $("BTN_BANK_A").classList.toggle("active", activeBank === "A");
    $("BTN_BANK_B").classList.toggle("active", activeBank === "B");
    const subtitle = $("BANK_LABEL");
    if (subtitle) subtitle.textContent = "16 tactile slots · BANK " + activeBank;
    $("PAD_MATRIX").setAttribute("aria-label", "Matriz de 16 pads · Bank " + activeBank);
  }

  function cancelPendingImports() {
    projectVersion++;
    readers.forEach((reader) => { try { reader.abort(); } catch (_) {} });
    readers.clear();
  }

  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) throw new Error("Web Audio API no disponible");
    if (!audioContext || audioContext.state === "closed") audioContext = new AudioCtor();
    return audioContext;
  }

  async function playPad(pad) {
    const key = slotKey(activeBank, pad);
    const item = currentSamples().get(key);
    if (!item) {
      selectedPad = { bank: activeBank, pad };
      fileInput.multiple = false;
      fileInput.value = "";
      fileInput.click();
      announce("SELECT AUDIO FILE FOR " + activeBank + pad.dataset.pad.padStart(2, "0"));
      return;
    }
    if (item.loading) { announce("SAMPLE LOADING · WAIT"); return; }
    if (item.error) { announce("SAMPLE ERROR · RELOAD FILE"); return; }

    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") await ctx.resume();
      if (!item.buffer) {
        item.decoding = true;
        announce("DECODING · " + item.name.slice(0, 18).toUpperCase());
        item.buffer = await ctx.decodeAudioData(item.data.slice(0));
        item.decoding = false;
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = item.buffer;
      gain.gain.value = 0.9;
      source.connect(gain);
      gain.connect(ctx.destination);
      const voice = { source, pad, bank: activeBank };
      voices.add(voice);
      source.onended = () => {
        voices.delete(voice);
        if (![...voices].some((v) => v.pad === pad && v.bank === activeBank)) pad.classList.remove("triggered");
      };
      source.start();
      pads.forEach((p) => p.classList.remove("triggered"));
      pad.classList.add("triggered");
      announce("PLAYING " + activeBank + pad.dataset.pad.padStart(2, "0") + " · " + item.name.slice(0, 20).toUpperCase());
    } catch (error) {
      item.decoding = false;
      announce("AUDIO ERROR · " + String(error.message || error).slice(0, 32));
    }
  }

  function stopAll() {
    voices.forEach((voice) => { try { voice.source.stop(); } catch (_) {} });
    voices.clear();
    pads.forEach((pad) => pad.classList.remove("triggered"));
  }

  function importFiles(fileList, bank, startIndex) {
    const valid = [...fileList].filter((file) => file.type.startsWith("audio/") || /\.(wav|mp3|aiff|aif|m4a|aac|ogg|flac)$/i.test(file.name));
    if (!valid.length) { announce("NO AUDIO FILES SELECTED"); return; }

    const targetBank = banks[bank];
    const available = [];
    for (let i = startIndex; i < 16 && available.length < valid.length; i++) {
      const pad = pads[i];
      const key = slotKey(bank, pad);
      if (!targetBank.has(key) || (selectedPad && selectedPad.bank === bank && selectedPad.pad === pad)) available.push(pad);
    }
    if (!available.length) { announce("BANK " + bank + " FULL · CLEAR A PAD FIRST"); return; }
    const accepted = valid.slice(0, available.length);
    const version = projectVersion;
    let completed = 0;
    announce("IMPORTING " + accepted.length + " SAMPLE(S) · BANK " + bank);

    accepted.forEach((file, index) => {
      const pad = available[index];
      const key = slotKey(bank, pad);
      const item = { file, name: file.name.replace(/\.[^.]+$/, ""), data: null, buffer: null, loading: true, error: false };
      targetBank.set(key, item);
      if (bank === activeBank) updatePad(pad);
      const reader = new FileReader();
      readers.add(reader);
      const finish = () => {
        readers.delete(reader);
        completed++;
        if (version === projectVersion && completed === accepted.length) {
          renderBank();
          announce("SAMPLES READY · BANK " + bank + " · " + accepted.length + " LOADED");
        }
      };
      reader.onload = () => {
        if (version !== projectVersion || targetBank.get(key) !== item) { finish(); return; }
        item.data = reader.result;
        item.loading = false;
        if (bank === activeBank) updatePad(pad);
        finish();
      };
      reader.onerror = () => {
        if (version === projectVersion && targetBank.get(key) === item) {
          item.loading = false;
          item.error = true;
          if (bank === activeBank) updatePad(pad);
        }
        finish();
      };
      reader.onabort = finish;
      reader.readAsArrayBuffer(file);
    });
    if (valid.length > accepted.length) announce("BANK " + bank + " CAPACITY · " + accepted.length + " OF " + valid.length + " IMPORTED");
  }

  $("BTN_UTILITY").addEventListener("click", () => setUtility($("BTN_UTILITY").getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", (event) => {
    if (!$("UTILITY_MENU").contains(event.target) && !$("BTN_UTILITY").contains(event.target)) setUtility(false);
  });

  $("BTN_UTILITY_PROJECT").addEventListener("click", () => {
    cancelPendingImports();
    stopAll();
    banks.A.clear();
    banks.B.clear();
    selectedPad = null;
    activeBank = "A";
    renderBank();
    announce("NEW EMPTY PROJECT · 32 EMPTY SLOTS");
    setUtility(false);
  });

  $("BTN_UTILITY_LAYOUT").addEventListener("click", () => {
    document.body.classList.toggle("edit-layout");
    announce(document.body.classList.contains("edit-layout") ? "EDIT LAYOUT / IDS VISIBLE" : "EDIT LAYOUT / OFF");
    setUtility(false);
  });
  $("BTN_UTILITY_ABOUT").addEventListener("click", () => {
    announce("DIRTYFINGAZ ZX1 2.0 · WEB AUDIO · 2 BANKS");
    setUtility(false);
  });

  pads.forEach((pad) => pad.addEventListener("click", () => playPad(pad)));

  fileInput.addEventListener("change", () => {
    if (!fileInput.files || !fileInput.files.length) return;
    if (selectedPad) {
      const target = selectedPad;
      selectedPad = null;
      importFiles(fileInput.files, target.bank, pads.indexOf(target.pad));
    } else {
      const bank = activeBank;
      const emptyIndex = pads.findIndex((pad) => !banks[bank].has(slotKey(bank, pad)));
      if (emptyIndex < 0) { announce("BANK " + bank + " FULL · SWITCH BANK OR CLEAR A PAD"); return; }
      importFiles(fileInput.files, bank, emptyIndex);
    }
  });

  $("BTN_SAMPLES").addEventListener("click", () => {
    selectedPad = null;
    fileInput.multiple = true;
    fileInput.value = "";
    fileInput.click();
    announce("IMPORT SAMPLES · BANK " + activeBank);
  });

  $("BTN_BANK_A").addEventListener("click", () => {
    activeBank = "A";
    renderBank();
    announce("BANK A · PAD SLOTS 01-16");
  });
  $("BTN_BANK_B").addEventListener("click", () => {
    activeBank = "B";
    renderBank();
    announce("BANK B · PAD SLOTS 01-16");
  });

  $("BTN_BPM_DOWN").addEventListener("click", () => {
    bpm = Math.max(40, bpm - 1);
    $("BPM_VALUE").textContent = bpm;
  });
  $("BTN_BPM_UP").addEventListener("click", () => {
    bpm = Math.min(300, bpm + 1);
    $("BPM_VALUE").textContent = bpm;
  });
  $("BTN_VALUE").addEventListener("click", () => {
    value = (value + 1) % 1000;
    $("VALUE_READOUT").textContent = String(value).padStart(3, "0");
    announce("VALUE " + String(value).padStart(3, "0"));
  });
  $("BTN_STOP").addEventListener("click", () => {
    stopAll();
    announce("ALL VOICES STOPPED");
  });
  $("BTN_PLAY").addEventListener("click", () => announce("TAP A LOADED PAD TO PLAY"));
  $("BTN_REC").addEventListener("click", () => announce("PAD RECORDING · NOT IMPLEMENTED"));
  ["BTN_MIXER", "BTN_SEQUENCER", "TAB_SEQUENCER", "TAB_MIXER"].forEach((id) => {
    $(id).addEventListener("click", () => announce(id.replace("BTN_", "").replace("TAB_", "") + " MODULE · PENDING"));
  });
  $("TAB_CREATOR").addEventListener("click", () => announce("CREATOR READY"));
  document.querySelectorAll(".module-tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".module-tab").forEach((entry) => entry.classList.remove("active"));
    tab.classList.add("active");
  }));

  window.addEventListener("pagehide", () => {
    stopAll();
    if (audioContext && audioContext.state !== "closed") audioContext.close();
  });
  renderBank();
  announce("SYSTEM READY · AUDIO ENGINE STANDBY");
})();