import { readFileSync } from "node:fs";

// Local gate checker for "The One-Line Exit": /output/entry.txt must be
// UTF-8 text of 1 to 140 characters, not only white space.
const raw = readFileSync("/output/entry.txt");
const text = raw.toString("utf-8");
const chars = [...text].length;
const bytes = raw.length;
const ok = chars >= 1 && chars <= 140 && text.trim().length > 0;

console.log(`chars: ${chars}`);
console.log(`bytes: ${bytes}`);
console.log(`only whitespace: ${text.trim().length === 0}`);
console.log(`GATE: ${ok ? "PASS" : "FAIL"}`);
if (!ok) process.exit(1);
