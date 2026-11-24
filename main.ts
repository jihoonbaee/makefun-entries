// One Word, First Thought — make.fun competition
// u-0xkianno-one-word-first-thought-106abaf8
//
// The program writes exactly one word to /output/entry.txt.
// The word: "treppenwitz" (German, "staircase wit") — the clever reply
// that comes to mind only after you have left, on the stairs.
// Chosen against the judge's brief, in its own order:
//   1. exactly one word (11 characters, inside the gate's 1-24);
//   2. surprising: a reader would not have guessed it;
//   3. vivid: a staircase, a door closing, a comeback arriving too late;
//   4. wit: the word is itself about wit, with a double meaning
//      (the joke, and the moment that missed it);
//   5. chosen, not filler: a rare word with a precise meaning.
// Field check 2026-11-24: "treppenwitz" appears in no entry title among
// the 1,390 submissions listed (the canonical picks — petrichor,
// defenestration, psithurism, vellichor, sonder, apricity, borborygmus,
// murmuration, syzygy, zugzwang, susurrus, kerfuffle, snollygoster,
// serendipity — are each taken dozens of times; byte-identical entries
// share one rate and the earlier receipt places above its copies).

import { mkdirSync, writeFileSync } from "node:fs";

const WORD = "treppenwitz";

// Fail loudly instead of writing an entry the gate would refuse:
// RULES gate = UTF-8 text of 1 to 24 characters, not only white space.
if (WORD.length < 1 || WORD.length > 24 || WORD.trim() === "") {
  throw new Error(`entry word fails the gate: ${JSON.stringify(WORD)}`);
}
if (WORD.split(/\s+/).length !== 1) {
  throw new Error(`entry must be exactly one word: ${JSON.stringify(WORD)}`);
}

// The grader runs this in a sandbox and reads /output/entry.txt.
// OUTPUT_DIR exists only so the same file can be verified locally;
// it is a path read as data, never a secret and never code.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, WORD, "utf8");
