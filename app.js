(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const message = $("SYSTEM_MESSAGE");
  const pads = [...document.querySelectorAll(".pad")];
  const fileInput = $("AUDIO_FILE_INPUT");
  const samples = new Map();
  let selectedPad = null;
  let bpm = 120, value = 0, audioContext = null;
  const activeSources = new Map();

  function announce(text) { message.textContent = text; }
  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) throw new Error("Web Audio API no disponible en este navegador");
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }
  function setUtility(open) {
    $("UTILITY_MENU").classList.toggle("open", open);
    $("BTN_UTILITY").setAttribute("aria-expanded", String(open));
    $("UTILITY_MENU").setAttribute("aria-hidden", String(!open));
  }
  $("BTN_UTILITY").addEventListener("click", () => setUtility($("BTN_UTILITY").getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", (event) => {
    if (!$("UTILITY_MENU").contains(event.target) && !$("BTN_UTILITY").contains(event.target)) setUtility(false);
  });
  $("BTN_UTILITY_PROJECT").addEventListener("click", () => {
    stopAll();
    samples.clear();
    pads.forEach((pad) => { pad.classList.remove("triggered","loaded"); pad.querySelector(".pad-state").textContent = "EMPTY"; pad.querySelector(".pad-name").textContent = "PAD " + pad.dataset.pad.padStart(2,"0"); });
    announce("NEW EMPTY PROJECT");
    setUtility(false);
  });
  $("BTN_UTILITY_LAYOUT").addEventListener("click", () => {
    document.body.classList.toggle("edit-layout");
    announce(document.body.classList.contains("edit-layout") ? "EDIT LAYOUT / IDS VISIBLE" : "EDIT LAYOUT / OFF");
    setUtility(false);
  });
  $("BTN_UTILITY_ABOUT").addEventListener("click", () => { announce("DIRTYFINGAZ ZX1 2.0 · WEB AUDIO"); setUtility(false); });

  function importFiles(files, startAt = 0) {
    const list = [...files].filter(file => file.type.startsWith("audio/") || /\.(wav|mp3|aiff|aif|m4a|aac|ogg|flac)$/i.test(file.name));
    if (!list.length) { announce("NO AUDIO FILES SELECTED"); return; }
    list.forEach((file, offset) => {
      const pad = pads[startAt + offset];
      if (!pad) return;
      samples.set(pad.id, { file, buffer: null, loading: true });
      pad.classList.add("loaded");
      pad.querySelector(".pad-name").textContent = file.name.replace(/\.[^.]+$/, "").slice(0, 12).toUpperCase();
      pad.querySelector(".pad-state").textContent = "LOADING";
    });
    announce("IMPORTING " + Math.min(list.length, pads.length - startAt) + " SAMPLE(S)...");
    let pending = 0;
    list.forEach((file, offset) => {
      const pad = pads[startAt + offset];
      if (!pad) return;
      pending++;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const ctx = getAudioContext();
          const buffer = await ctx.decodeAudioData(reader.result.slice(0));
          const item = samples.get(pad.id);
          if (!item || item.file !== file) return;
          item.buffer = buffer;
          item.loading = false;
          pad.querySelector(".pad-state").textContent = "READY";
          pending--;
          if (pending === 0) announce("SAMPLES READY · TAP A PAD");
        } catch (error) {
          samples.delete(pad.id);
          pad.classList.remove("loaded");
          pad.querySelector(".pad-state").textContent = "ERROR";
          pending--;
          announce("AUDIO DECODE ERROR · " + file.name.slice(0, 18));
        }
      };
      reader.onerror = () => { pending--; pad.querySelector(".pad-state").textContent = "ERROR"; announce("FILE READ ERROR"); };
      reader.readAsArrayBuffer(file);
    });
  }

  function playPad(pad) {
    const item = samples.get(pad.id);
    if (!item) {
      selectedPad = pad;
      fileInput.multiple = false;
      fileInput.value = "";
      fileInput.click();
      announce("SELECT AUDIO FILE FOR " + pad.id);
      return;
    }
    if (item.loading || !item.buffer) { announce("SAMPLE LOADING · WAIT"); return; }
    try {
      const ctx = getAudioContext();
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = item.buffer;
      gain.gain.value = 0.9;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.onended = () => { if (activeSources.get(pad.id) === source) activeSources.delete(pad.id); };
      activeSources.set(pad.id, source);
      source.start();
      pads.forEach(p => p.classList.remove("triggered"));
      pad.classList.add("triggered");
      announce("PLAYING " + pad.id + " · " + item.file.name.slice(0, 20).toUpperCase());
    } catch (error) { announce("AUDIO ERROR · " + error.message.slice(0, 28)); }
  }
  function stopAll() {
    activeSources.forEach(source => { try { source.stop(); } catch (_) {} });
    activeSources.clear();
    pads.forEach(pad => pad.classList.remove("triggered"));
  }
  pads.forEach(pad => pad.addEventListener("click", () => playPad(pad)));
  fileInput.addEventListener("change", () => {
    if (!fileInput.files || !fileInput.files.length) return;
    if (fileInput.multiple) {
      const firstEmpty = pads.findIndex(pad => !samples.has(pad.id));
      importFiles(fileInput.files, firstEmpty < 0 ? 0 : firstEmpty);
    } else if (selectedPad) {
      const index = pads.indexOf(selectedPad);
      importFiles(fileInput.files, index);
      selectedPad = null;
    }
  });
  $("BTN_SAMPLES").addEventListener("click", () => {
    selectedPad = null;
    fileInput.multiple = true;
    fileInput.value = "";
    fileInput.click();
    announce("IMPORT SAMPLES · SELECT AUDIO FILES");
  });
  $("BTN_BANK_A").addEventListener("click", () => {
    $("BTN_BANK_A").classList.add("active"); $("BTN_BANK_B").classList.remove("active");
    announce("BANK A · PAD SLOTS 01-16");
  });
  $("BTN_BANK_B").addEventListener("click", () => {
    $("BTN_BANK_B").classList.add("active"); $("BTN_BANK_A").classList.remove("active");
    announce("BANK B · SECOND BANK PENDING");
  });
  $("BTN_BPM_DOWN").addEventListener("click", () => { bpm = Math.max(40,bpm-1); $("BPM_VALUE").textContent = bpm; });
  $("BTN_BPM_UP").addEventListener("click", () => { bpm = Math.min(300,bpm+1); $("BPM_VALUE").textContent = bpm; });
  $("BTN_VALUE").addEventListener("click", () => { value=(value+1)%1000; $("VALUE_READOUT").textContent=String(value).padStart(3,"0"); announce("VALUE "+String(value).padStart(3,"0")); });
  $("BTN_STOP").addEventListener("click", () => { stopAll(); announce("ALL SAMPLES STOPPED"); });
  $("BTN_PLAY").addEventListener("click", () => announce("TAP ANY LOADED PAD TO PLAY"));
  $("BTN_REC").addEventListener("click", () => announce("PAD RECORDING · NOT IMPLEMENTED"));
  ["BTN_MIXER","BTN_SEQUENCER","TAB_SEQUENCER","TAB_MIXER"].forEach(id => $(id).addEventListener("click", () => announce(id.replace("BTN_","").replace("TAB_","")+" MODULE · PENDING")));
  $("TAB_CREATOR").addEventListener("click", () => announce("CREATOR READY"));
  document.querySelectorAll(".module-tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".module-tab").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
  }));
  window.addEventListener("pagehide", stopAll);
  announce("SYSTEM READY · AUDIO ENGINE STANDBY");
})();