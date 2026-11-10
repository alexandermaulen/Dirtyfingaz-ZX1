import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(path, "utf8");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const file of ["index.html", "creator-engine.html"]) {
  const html = read(file);
  const tags = [...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)];
  let parsed = 0;
  for (const [, attrs, source] of tags) {
    if (/\\bsrc\\s*=/.test(attrs)) continue;
    const type = attrs.match(/\\btype\\s*=\\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
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

check(Array.isArray(registry.utilitySystem?.groups) && registry.utilitySystem.groups.length === 8,
  "UTILITY must declare the eight survey-defined groups");
check(gui.includes("utilityGroupDefinitions") && gui.includes("utility-search-hit"),
  "UTILITY grouping/search highlight contract missing");
check(gui.includes("FAVORITES ONLY"), "UTILITY favorites filter missing");
check(gui.includes("1/16T"), "Triplet quantization UI missing");
check(engine.includes('"1/16T":2/3'), "Triplet quantization engine mapping missing");
check(engine.includes('runtime.register("creator.metronome.accent.set"'), "Metronome accent command missing");
check(engine.includes('runtime.register("creator.metronome.signature.set"'), "Time-signature command missing");
check(survey.includes("CM-ZX1-01") && survey.includes("CM-ZX1-58"),
  "Versioned master survey is incomplete");

for (const command of registry.utilitySystem?.engineCommands || []) {
  check(engine.includes('runtime.register("' + command + '"'), "Registry command not registered in engine: " + command);
}

if (errors.length) {
  console.error("\\nVALIDATION FAILED");
  for (const error of errors) console.error(" -", error);
  process.exitCode = 1;
} else {
  console.log("ZX1 survey contracts OK:", registry.utilitySystem.groups.length, "UTILITY groups");
}
