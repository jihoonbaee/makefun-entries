// Local checker for u-0xkianno-one-emoji-smile — mimics the RULES gate plus
// the code rules that would reject an entry at review. Run: node check-local.mjs
// It runs main.ts twice (default path /output/entry.txt and a temp path) and
// checks: gate (UTF-8, 1-8 chars, not only whitespace), determinism, and that
// main.ts reads no env / network / files and uses no dynamic code execution.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const REPO = new URL(".", import.meta.url).pathname;
let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
};

// 1. main.ts runs cleanly, twice, to two different paths (determinism).
execFileSync("node", [`${REPO}main.ts`, "/tmp/emoji-check/a/entry.txt"], { stdio: "pipe" });
execFileSync("node", [`${REPO}main.ts`, "/tmp/emoji-check/b/entry.txt"], { stdio: "pipe" });
const a = readFileSync("/tmp/emoji-check/a/entry.txt");
const b = readFileSync("/tmp/emoji-check/b/entry.txt");
check("program runs twice without error", true);
check("deterministic output (identical bytes)", a.equals(b), `${a.length} bytes each`);

// 2. The gate, exactly as RULES.txt states it: "/output/entry.txt is UTF-8
//    text of 1 to 8 characters, not only white space".
const text = a.toString("utf8");
const codePoints = [...text].length;
check("valid UTF-8 round-trip", Buffer.from(text, "utf8").equals(a));
check("1 to 8 characters", codePoints >= 1 && codePoints <= 8, `${codePoints} char(s)`);
check("not only white space", text.trim() !== "");
check("exactly one emoji, U+1F917", text === "🤗", JSON.stringify(text));
check("size 4 bytes (tie-break: smaller text wins ties)", a.length === 4, `${a.length} bytes`);

// 3. Default path: run with no argument, writes /output/entry.txt.
execFileSync("node", [`${REPO}main.ts`], { stdio: "pipe" });
check("default run writes /output/entry.txt", existsSync("/output/entry.txt"));
check(
  "default output identical",
  readFileSync("/output/entry.txt").equals(a),
);

// 4. Code rules (RULES: env secrets / dynamic code reject entries received
//    from 2026-11-23): no process.env, no eval/Function/vm, no dynamic
//    import, no network/fetch, no child_process, no file reads.
const src = readFileSync(`${REPO}main.ts`, "utf8");
for (const [name, re] of [
  ["no process.env", /process\.env/],
  ["no eval", /\beval\s*\(/],
  ["no Function constructor", /\bFunction\s*\(/],
  ["no vm module", /\bfrom\s+["']node:vm["']/],
  ["no dynamic import", /\bimport\s*\(/],
  ["no fetch/http", /\bfetch\s*\(|node:https?["']/],
  ["no child_process", /child_process/],
  ["no file reads (only writes)", /\breadFileSync|createReadStream/],
]) {
  check(name, !re.test(src));
}

// 5. Required repo files.
check("LICENSE present (OSI, MIT)", existsSync(`${REPO}LICENSE`));
check("README present", existsSync(`${REPO}README.md`));
check("main.ts at repo root", existsSync(`${REPO}main.ts`));

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
