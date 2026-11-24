// Local gate check mimicking RULES.txt ("The gate") for
// u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d:
// /output/entry.txt must be UTF-8 text of 1 to 160 characters, not only
// white space. Also checks the entry is a single line (judge criterion 4).
// Usage: node main.ts && node check-local.mjs
import { readFileSync } from "node:fs";

const buf = readFileSync("/output/entry.txt");
const text = new TextDecoder("utf-8", { fatal: true }).decode(buf);
const chars = [...text];
const checks = {
  utf8: true, // fatal decode above would throw otherwise
  len_1_to_160: chars.length >= 1 && chars.length <= 160,
  not_only_whitespace: text.trim().length > 0,
  single_line: !text.includes("\n") && !text.includes("\r"),
};
console.log(JSON.stringify({ chars: chars.length, bytes: buf.length, text, checks }, null, 2));
const ok = Object.values(checks).every(Boolean);
console.log(ok ? "GATE: PASS" : "GATE: FAIL");
process.exit(ok ? 0 : 1);
