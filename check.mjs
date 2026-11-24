// Local gate checker — mimics the sealed gate scorer in RULES.txt
// ("The gate": /output/entry.txt is UTF-8 text of 1 to 1 characters,
// not only white space) plus the static rules that would disqualify an
// entry at review: no environment secrets, no network, no eval/dynamic
// code (RULES.txt, "Everything your entry runs").
//
// Usage: node main.ts && node check.mjs
// Exit 0 = gate passes; exit 1 = gate fails (prints the fix).

import { readFileSync, existsSync } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";
let ok = true;
const fail = (msg) => {
  ok = false;
  console.log("FAIL:", msg);
};

if (!existsSync(ENTRY_PATH)) {
  fail("/output/entry.txt does not exist — run: node main.ts");
} else {
  const bytes = readFileSync(ENTRY_PATH);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    fail("entry.txt is not valid UTF-8");
    text = "";
  }
  if (text.length !== 1) {
    fail(`entry is ${text.length} characters (gate needs exactly 1)`);
  }
  if (!text.trim()) {
    fail("entry is only white space");
  }
  if (text !== "A" && text !== "B") {
    fail(
      `entry ${JSON.stringify(text)} is not A (coffee) or B (tea) — judge criterion 1: anything else loses to any letter that chooses coffee or tea`,
    );
  }
  console.log(
    `entry: ${text.length} chars, ${bytes.length} bytes, valid=${ok ? 1 : 0}`,
  );
  console.log("entry text:", JSON.stringify(text));
}

// Static review rules: the program must be self-contained.
const src = readFileSync(new URL("./main.ts", import.meta.url), "utf8");
for (const [pattern, why] of [
  ["process.env", "reads an environment value"],
  ["eval(", "runs code from a string"],
  ["new Function", "runs code from a string"],
  ["fetch(", "reads from the network"],
  ["http", "reads from the network"],
  ["dynamic import", "dynamic import"],
]) {
  if (src.includes(pattern)) fail(`main.ts contains ${pattern} (${why})`);
}

console.log(ok ? "GATE: PASS" : "GATE: FAIL");
process.exit(ok ? 0 : 1);
