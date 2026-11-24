#!/usr/bin/env node
// Local gate check that mirrors RULES.txt for
// u-0xkianno-one-word-first-thought-106abaf8:
// "A sealed scorer checks that /output/entry.txt is UTF-8 text of 1 to 24
//  characters, not only white space, and gives the entry a Valid column
//  of 1 or 0. Only a valid entry goes before the judge."
// Plus: exactly one word (judge criterion 1: a multi-word entry
// "loses to any one word entry"), and determinism across the grader's
// two runs (the final phase runs every entry twice).
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";

const runs = [];
for (const dir of ["/tmp/ow-gate-1", "/tmp/ow-gate-2"]) {
  rmSync(dir, { recursive: true, force: true });
  execFileSync(process.execPath, ["main.ts"], {
    cwd: new URL(".", import.meta.url).pathname,
    env: { ...process.env, OUTPUT_DIR: dir },
    stdio: "pipe",
  });
  runs.push(readFileSync(`${dir}/entry.txt`));
}

const [a, b] = runs;
let ok = true;
const fail = (m) => { ok = false; console.log(`FAIL: ${m}`); };

let text;
try { text = a.toString("utf-8"); } catch { fail("not valid UTF-8"); }
if (text !== undefined) {
  if (text.length < 1 || text.length > 24) fail(`length ${text.length} outside 1-24`);
  if (text.trim() === "") fail("only white space");
  if (text.split(/\s+/).length !== 1) fail("not exactly one word");
  console.log(`entry: ${JSON.stringify(text)} | bytes: ${a.length} | chars: ${text.length}`);
}
if (!a.equals(b)) fail("two runs differ (grader runs the program twice)");
else console.log("determinism: run 1 == run 2");

console.log(ok ? "GATE: VALID (1)" : "GATE: INVALID (0)");
process.exit(ok ? 0 : 1);
