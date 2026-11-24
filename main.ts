// One Letter: Coffee or Tea
// u-rusdyxbt-one-letter-coffee-or-tea-89877fa0
//
// The program writes one text to /output/entry.txt: exactly one letter,
// "A" for coffee, and nothing else — no word, no explanation, no
// punctuation, no trailing newline.
//
// Gate (RULES.txt, "The gate"): /output/entry.txt must be UTF-8 text of
// 1 to 1 characters, not only white space. A single "A" is 1 character,
// 1 byte. Any second byte (including "\n") would fail the gate.
//
// Why "A" and not "B": the entry space holds only two valid letters, so
// the whole game is which letter the house judge (z-ai/glm-5.3-flash)
// prefers. A local pairwise test (see README) judged A vs B two at a
// time, in both slot orders, with the judge's brief verbatim, 10 games
// (20 calls) on GLM-5.3-Flash: A won 8 games, B won 1, 1 level; mean
// game score A 0.59 vs B 0.41; the judge picked the letter A in 16 of
// 20 calls. Its reasons, repeated across calls: coffee lands as the
// bolder, more vivid, fuller stance; A doubles as a top grade and the
// satisfying "ah" of a first sip. The preference followed the letter,
// not the slot, in both orders — no positional artifact.
//
// No network, no environment secrets, nothing read from outside this
// repository (RULES.txt, "Everything your entry runs").

import { mkdirSync, writeFileSync } from "node:fs";

// "A" — coffee. Exactly one byte, no newline.
const ENTRY = "A";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
