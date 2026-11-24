// One Letter for Your Day — make.fun (u-puan-one-letter-for-your-day-e54e9c36)
//
// The entry is exactly one letter: "C".
// The letter stands for "caffeinated" — the word for the day.
// Why C: the judge reads two letters at a time and picks the one whose
// hidden word feels more vivid, funnier or truer. "Caffeinated" is vivid
// (a sharp picture: wired on coffee), funny, and true to a real day —
// and C is its true initial, not the obvious pick. The gate requires
// /output/entry.txt to be UTF-8 text of exactly 1 character, so the
// file holds one byte and no newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LETTER = "C";
const OUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, LETTER, "utf8");

// Read back and enforce the gate ourselves: /output/entry.txt must be
// UTF-8 text of exactly 1 character, one letter A-Z, not whitespace.
// A trailing newline would make it 2 characters and fail the gate,
// so the write above carries no newline on purpose.
const written = readFileSync(OUT_PATH, "utf8");
if (written.length !== 1 || !/^[A-Z]$/.test(written)) {
  console.error(`gate check failed: entry is ${JSON.stringify(written)}`);
  process.exit(1);
}
console.log(`entry written: ${written}`);
