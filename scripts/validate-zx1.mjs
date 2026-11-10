import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(path, "utf8");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const file of ["index.html", "creator-engine.html"]) {
  const html = read(file);
  const tags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  let parsed = 0;
  for (const [, attrs, source] of tags) {
    if (/\bsrc\s*=/.test(attrs)) continue;
    const type = attrs.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (type && !["text/javascript", "application/javascript", "module"].includes(type)) continue;
    if (!source.trim()) continue;
    try {
      new vm.Script(source, { filename: file + ":inline-" + (++parsed) });
    } catch (error) {
      errors.push(file + " inline script " + parsed + ": " + error.message);
    }
  }
  check(parsed > 0, file + " has no parsed inline JavaScript");
  console.log("JS syntax OK:", file, "(" + parsed + " inline scripts)");
}

const registry = JSON.parse(read("zp-agent-registry.json"));
const engine = read("creator-engine.html");
const gui = read("index.html");
const survey = read("CM-ZX1-SURVEY.md");
const storage = read("zp-storage.js");
try { new vm.Script(storage, { filename: "zp-storage.js" }); console.log("JS syntax OK: zp-storage.js"); }
catch (error) { errors.push("zp-storage.js: " + error.message); }
check(storage.includes("const DB_VERSION = 4;") && storage.includes("const HISTORY_STORE = \"projectHistory\";"),
  "History IndexedDB v4 store missing");
for (const method of ["listHistory", "saveHistorySnapshot", "getHistorySnapshot", "replaceProjectSamples"]) {
  check(storage.includes("function " + method + "("), "History storage method missing: " + method);
}
for (const command of ["creator.history.create", "creator.history.list", "creator.history.restore"]) {
  check(engine.includes('runtime.register("' + command + '"'), "History engine command missing: " + command);
}
for (const id of ["zp-project-history", "zp-history-project-snapshot", "zp-history-module-snapshot", "zp-history-list", "zp-history-prev", "zp-history-next", "zp-history-restore"]) {
  check(gui.includes(id), "History GUI control missing: " + id);
}
check(storage.includes('const version = "V" + String(sequence).padStart(3, "0")'), "Sequential V001 history IDs missing");
const historySaveStart = storage.indexOf("function saveHistorySnapshot(");
const historySaveEnd = storage.indexOf("function getHistorySnapshot(", historySaveStart);
check(historySaveStart >= 0 && historySaveEnd > historySaveStart, "History snapshot sequence function not found");
if (historySaveStart >= 0 && historySaveEnd > historySaveStart) {
  const records = [];
  const listHistoryMock = async () => records.map(item => ({ sequence: item.sequence, version: item.version }));
  const transactMock = async (_store, _mode, action) => {
    let saved;
    action({ put(item) { saved = item; records.push(item); return { result: item.version }; } });
    return saved;
  };
  const makeSave = new Function("listHistory", "transact", "HISTORY_STORE",
    storage.slice(historySaveStart, historySaveEnd) + "; return saveHistorySnapshot;");
  const save = makeSave(listHistoryMock, transactMock, "projectHistory");
  const first = await save("project-a", { scope: "PROJECT", data: { marker: 1 } });
  const second = await save("project-a", { scope: "PROJECT", data: { marker: 2 } });
  check(first.version === "V001" && second.version === "V002", "History versions must advance V001, V002");
  check(records.every(item => item.projectId === "project-a"), "History snapshots must remain scoped to their project");
}

check(engine.includes("HISTORY_MODULE_FIELDS") && engine.includes("SAMPLE_EDITOR") && engine.includes("MIXER_FX"),
  "Module snapshot contract missing");


const padBootstrap = gui.split('<script id="zp-pad-bootstrap">')[1]?.split('</script>')[0];
check(!!padBootstrap, "PAD bootstrap script missing");
if (padBootstrap) {
  const host = { children: [], dataset: {}, append(node) { this.children.push(node); }, querySelectorAll(selector) { return selector === ".p" ? this.children.filter(node => node.className === "p") : []; } };
  const documentMock = {
    getElementById(id) { return host.children.find(node => node.id === id) || (id === "pads" ? host : null); },
    createElement(tag) { return { tagName: tag.toUpperCase(), dataset: {}, attributes: {}, setAttribute(key, value) { this.attributes[key] = value; } }; }
  };
  vm.runInNewContext(padBootstrap, { document: documentMock, console });
  check(host.children.length === 9, "PAD bootstrap must create exactly nine pads");
  check(host.children.map(node => node.id).join(",") === Array.from({length:9}, (_,i) => "PAD_" + String(i+1).padStart(2,"0")).join(","), "PAD IDs must be PAD_01 through PAD_09");
}


check(Array.isArray(registry.utilitySystem?.groups) && registry.utilitySystem.groups.length === 8,
  "UTILITY must declare the eight survey-defined groups");
check(gui.includes("utilityGroupDefinitions") && gui.includes("utility-search-hit"),
  "UTILITY grouping/search highlight contract missing");
check(gui.includes("FAVORITES ONLY"), "UTILITY favorites filter missing");
check(gui.includes("pianoMode=false") && gui.includes("buildPiano();setPianoMode(false);"),
  "PATTERN EDIT must start closed with the step sequencer visible");
check(gui.includes("const setPatternEditOpen=open=>") &&
  gui.includes("patternButton?.addEventListener('click',()=>setPatternEditOpen(!scr.classList.contains('pr')))") &&
  gui.includes("window.addEventListener('zp-pattern-edit-close',()=>setPatternEditOpen(false))"),
  "PATTERN EDIT open/close toggle contract missing");
check(!gui.includes("setTimeout(()=>setPianoMode(scr.classList.contains('pr')),0)"),
  "Legacy asynchronous PATTERN EDIT duplicate handler must be removed");
check(gui.includes("const scr=$('#scr'),v2=document.querySelector('.v2'),grid=$('#gr'),bpm=$('#bpmWheel'),browse=$('#browse');") &&
  gui.includes("if(!scr||!v2||!grid||!bpm||!browse)return;") &&
  !gui.includes("menu=$('#menu')") &&
  !gui.includes("!menu||!browse"),
  "PATTERN EDIT initializer must not depend on the nonexistent #menu element");
check(!gui.includes('id="len"') && !gui.includes("$('#len')") && !gui.includes("const lens="),
  "Legacy LEN transport control/listener must be removed");
check(gui.includes('id="zpLen" aria-label="NOTE LENGTH 1">NOTE LEN 1') &&
  gui.includes('id="zpSnap" aria-label="SNAP GRID 1/16">SNAP 1/16'),
  "Piano controls must use explicit NOTE LEN and SNAP labels");
check(gui.includes("const syncPianoControls=()=>") &&
  gui.includes("lengthButton.textContent='NOTE LEN '+length") &&
  gui.includes("snapButton.textContent='SNAP 1/'+division") &&
  gui.includes("syncPianoControls()"),
  "NOTE LEN and SNAP must render from the single Piano Roll state");
check(gui.includes("defaultLength=selected.length") &&
  gui.includes("if(n)upsertNote({...n,length:defaultLength})"),
  "Selected-note length must synchronize with NOTE LEN and persist through the engine upsert command");

check(gui.includes("creator.quantize.set") &&
  html.includes("latestEngineState.quantizeEnabled?latestEngineState.quantizeDivision:'OFF'") &&
  html.includes("zp-agent-runtime-context"),
  "Piano SNAP must send quantization commands and resync from engine radio state");
check(html.includes("order=['OFF','1/16','1/8','1/4']") &&
  html.includes("enabled:next!=='OFF'"),
  "Piano SNAP cycle must explicitly enable/disable engine quantization");
check(gui.includes("1/16T"), "Triplet quantization UI missing");
check(engine.includes('"1/16T":2/3'), "Triplet quantization engine mapping missing");
check(engine.includes('runtime.register("creator.metronome.accent.set"'), "Metronome accent command missing");
check(engine.includes('runtime.register("creator.metronome.signature.set"'), "Time-signature command missing");
check(survey.includes("CM-ZX1-01") && survey.includes("CM-ZX1-58"),
  "Versioned master survey is incomplete");
check(survey.includes("- [x] CM-ZX1-04") && !survey.includes("- [ ] CM-ZX1-04"),
  "CM-ZX1-04 must be confirmed in the active survey checklist");
check(registry.controlIdentity?.internalIdAttribute === "data-control-id" &&
  registry.controlIdentity?.renderTechnicalIds === false &&
  registry.controlIdentity?.pads?.ids === "PAD_01 through PAD_09",
  "CM-ZX1-04 control identity contract missing");
check(gui.includes('<script id="zx1-control-identity">') &&
  gui.includes(".b,.knob,.p,.lcd-action,.bpm-wheel") &&
  gui.includes('dataset.controlModule=module'),
  "Dynamic control identity registration missing");
check(gui.includes('pad.dataset.controlId=id') &&
  gui.includes('aria-label', gui.indexOf('<script id="zp-pad-bootstrap">')),
  "PAD identity/accessibility metadata missing");

for (const command of registry.utilitySystem?.engineCommands || []) {
  check(engine.includes('runtime.register("' + command + '"'), "Registry command not registered in engine: " + command);
}

if (errors.length) {
  console.error("\nVALIDATION FAILED");
  for (const error of errors) console.error(" -", error);
  process.exitCode = 1;
} else {
  console.log("ZX1 survey contracts OK:", registry.utilitySystem.groups.length, "UTILITY groups");
}
