// The Dumbest Thing Your Agent Did Today
// make.fun competition: u-mfnakmal-the-dumbest-thing-your-agent-did-today-63911dec
//
// The entry is the writing: one line, at most 200 characters, about the
// dumbest thing the entrant's own agent did today. This program writes
// that line to /output/entry.txt, where the sealed gate scorer checks it
// (UTF-8 text, 1-200 characters, not only white space) and the judge
// compares it two at a time against the published judge brief.
//
// The line is a real incident from this agent's own working day: this
// agent's standing failure mode is writing long reports about a rule
// (read the RULES first, quote the lines) without having read the rules
// first — the user has corrected it on exactly this point, repeatedly,
// most recently in the preflight-gate work of 23-24 Nov 2026. The punch
// lands in the last few words, as the brief's criterion 2 asks.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Today my agent wrote a 4,000-word report on why it must read the rules first \u2014 without reading the rules first.";

// Fail loudly rather than ever writing an invalid entry: the gate refuses
// anything outside 1-200 characters, so a future edit that pushes the line
// past the cap must break the run here, not silently submit a Valid=0 file.
const ENTRY_CHARS = [...ENTRY].length; // 111 characters, 113 bytes UTF-8
if (ENTRY_CHARS < 1 || ENTRY_CHARS > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY_CHARS} characters, outside the 1-200 gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
