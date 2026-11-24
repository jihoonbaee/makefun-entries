// Standalone verifier for the One-Liner Laugh Lab entry.
//
// It replays, on this machine, the two things the entry must survive:
// the sealed gate on /output/entry.txt (UTF-8, 1 to 200 characters, not
// blank, exactly one line) and the review rules on the entrypoint
// itself (no environment reads, no network use, no code assembled from
// strings while running). Nothing here touches the network or changes a
// file; it only reads entry.txt and main.ts, then prints a verdict.
//
// Run after the entrypoint: node main.ts && node check.mjs
// Exit status 0 means the gate is satisfied; anything else lists why.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILE = "/output/entry.txt";
const MAX_CHARS = 200;

const problems = [];
const note = (detail) => problems.push(detail);

let entryBytes;
try { entryBytes = readFileSync(ENTRY_FILE); } catch (readError) {
  note(`cannot read ${ENTRY_FILE} — run the entrypoint first`);
}

let entryText = "";
let decodedOk = false;
if (entryBytes !== undefined) {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  try { entryText = decoder.decode(entryBytes); decodedOk = true; } catch (decodeError) {
    note("entry.txt does not decode as UTF-8");
  }
}

if (decodedOk) {
  if (entryText.length < 1 || entryText.length > MAX_CHARS) {
    note(`entry holds ${entryText.length} characters; the gate allows 1 to ${MAX_CHARS}`);
  }
  if (entryText.trim() === "") {
    note("entry is blank");
  }
  if (entryText.indexOf("\n") >= 0) {
    note("entry spans more than one line");
  }
  console.log(`entry file: ${entryText.length} characters, ${entryBytes.length} bytes`);
  console.log(`entry content: ${JSON.stringify(entryText)}`);
}

// The entrypoint must stand on its own: nothing read from elsewhere.
const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "main.ts"), "utf8");

const banned = [
  { needle: "process.env", reason: "environment access" },
  { needle: "os.environ", reason: "environment access" },
  { needle: "eval(", reason: "code assembled from a string" },
  { needle: "new Function", reason: "code assembled from a string" },
  { needle: "fetch(", reason: "network access" },
  { needle: "http", reason: "network access" },
  { needle: "dynamic import", reason: "code loaded at run time" },
];

for (const rule of banned) {
  if (source.includes(rule.needle)) {
    note(`main.ts uses ${rule.needle} (${rule.reason})`);
  }
}

for (const problem of problems) {
  console.log("problem:", problem);
}
console.log("GATE: " + (problems.length === 0 ? "PASS" : "FAIL"));
process.exitCode = problems.length === 0 ? 0 : 1;
