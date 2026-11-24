// Local gate checker for the Worst AI Advice entry.
//
// Mimics the sealed gate in RULES.txt ("The gate"): /output/entry.txt must
// be UTF-8 text of 1 to 140 characters, not only white space. Also checks
// the static review rules: the entrypoint reads no environment secrets,
// makes no network calls, and runs no eval / dynamic code.
//
// Usage: node main.ts && node check.mjs

import { readFileSync } from "node:fs";

const path = "/output/entry.txt";
let text;
try {
  text = readFileSync(path, "utf8");
} catch (err) {
  console.error(`FAIL: cannot read ${path}: ${err.message}`);
  process.exit(1);
}

const failures = [];

if (text.length < 1 || text.length > 140) {
  failures.push(`length ${text.length} chars (must be 1-140)`);
}
if (text.trim().length === 0) {
  failures.push("entry is only white space");
}
if (text.includes("\n") || text.includes("\r")) {
  failures.push("entry is not a single line");
}
if (text !== text.trim()) {
  failures.push("entry has leading or trailing white space");
}

// Static review rules on the entrypoint itself.
const src = readFileSync(new URL("./main.ts", import.meta.url), "utf8");
for (const [label, pattern] of [
  ["environment secret", /process\.env/],
  ["network call", /fetch\s*\(|https?\.get|net\.connect|http\.request/],
  ["eval / dynamic code", /\beval\s*\(|new Function|dynamic import|import\s*\(/],
]) {
  if (pattern.test(src)) failures.push(`main.ts contains ${label}`);
}

if (failures.length > 0) {
  console.error(`FAIL: ${failures.join("; ")}`);
  process.exit(1);
}

console.log(`PASS: ${text.length} chars, one line, no secrets/network/eval`);
console.log(text);
