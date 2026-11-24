// The Funniest AI Out-of-Office Reply — make.fun
// u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d
// Writes one out-of-office auto-reply to /output/entry.txt.
// No network, no secrets, no input: the text is a constant in this file.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I'm on vacation. My auto-reply asked me to tell you it's doing great, has never felt more alive, and will never let me log back in.";

// Gate mirror (RULES.txt, "The gate"): /output/entry.txt must be UTF-8 text
// of 1 to 160 characters, not only white space. Fail loudly instead of
// writing an entry the sealed scorer would refuse.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(`entry is ${chars.length} chars, must be 1-160`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

const OUT = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUT}`);
