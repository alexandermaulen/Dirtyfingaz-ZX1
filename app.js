(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const utilityButton = $("BTN_UTILITY");
  const utilityMenu = $("UTILITY_MENU");
  const message = $("SYSTEM_MESSAGE");
  let bpm = 120;
  let selectedBank = "A";
  let playing = false;
  let recording = false;
  let value = 0;

  function announce(text) { message.textContent = text; }
  function setUtility(open) {
    utilityMenu.classList.toggle("open", open);
    utilityButton.setAttribute("aria-expanded", String(open));
    utilityMenu.setAttribute("aria-hidden", String(!open));
  }
  utilityButton.addEventListener("click", () => {
    setUtility(utilityButton.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("click", (event) => {
    if (!utilityMenu.contains(event.target) && !utilityButton.contains(event.target)) setUtility(false);
  });
  $("BTN_UTILITY_PROJECT").addEventListener("click", () => {
    document.querySelectorAll(".pad").forEach((pad) => pad.classList.remove("triggered"));
    announce("NEW EMPTY PROJECT");
    setUtility(false);
  });
  $("BTN_UTILITY_LAYOUT").addEventListener("click", () => {
    document.body.classList.toggle("edit-layout");
    announce(document.body.classList.contains("edit-layout") ? "EDIT LAYOUT / IDS VISIBLE" : "EDIT LAYOUT / OFF");
    setUtility(false);
  });
  $("BTN_UTILITY_ABOUT").addEventListener("click", () => { announce("DIRTYFINGAZ ZX1 2.0"); setUtility(false); });

  document.querySelectorAll(".pad").forEach((pad) => {
    pad.addEventListener("click", () => {
      document.querySelectorAll(".pad").forEach((item) => item.classList.remove("triggered"));
      pad.classList.add("triggered");
      announce("SELECTED " + pad.id + " · EMPTY SLOT");
    });
  });
  function chooseBank(bank) {
    selectedBank = bank;
    $("BTN_BANK_A").classList.toggle("active", bank === "A");
    $("BTN_BANK_B").classList.toggle("active", bank === "B");
    announce("BANK " + bank + " SELECTED");
  }
  $("BTN_BANK_A").addEventListener("click", () => chooseBank("A"));
  $("BTN_BANK_B").addEventListener("click", () => chooseBank("B"));

  $("BTN_BPM_DOWN").addEventListener("click", () => { bpm = Math.max(40, bpm - 1); $("BPM_VALUE").textContent = bpm; });
  $("BTN_BPM_UP").addEventListener("click", () => { bpm = Math.min(300, bpm + 1); $("BPM_VALUE").textContent = bpm; });
  $("BTN_VALUE").addEventListener("click", () => {
    value = (value + 1) % 1000;
    $("VALUE_READOUT").textContent = String(value).padStart(3, "0");
    announce("VALUE " + String(value).padStart(3, "0"));
  });
  $("BTN_PLAY").addEventListener("click", () => {
    playing = !playing;
    $("BTN_PLAY").classList.toggle("active", playing);
    announce(playing ? "PLAY REQUEST · ENGINE NOT CONNECTED" : "PLAYBACK STOPPED");
  });
  $("BTN_STOP").addEventListener("click", () => {
    playing = false; recording = false;
    $("BTN_PLAY").classList.remove("active"); $("BTN_REC").classList.remove("active");
    announce("STOP · ENGINE NOT CONNECTED");
  });
  $("BTN_REC").addEventListener("click", () => {
    recording = !recording;
    $("BTN_REC").classList.toggle("active", recording);
    announce(recording ? "REC ARMED · ENGINE NOT CONNECTED" : "REC DISARMED");
  });

  document.querySelectorAll(".quick-button,.module-tab").forEach((button) => {
    button.addEventListener("click", () => {
      announce(button.textContent.trim().replace(/\s+/g, " ") + " · MODULE PENDING");
    });
  });
  document.querySelectorAll(".module-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".module-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
    });
  });
  document.body.dataset.bank = selectedBank;
  // Deliberately no audio context, autoplay, library, modal or background process.
})();