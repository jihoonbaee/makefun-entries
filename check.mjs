// Local gate checker for One-Line Robot Wedding Vows.
// Gate (RULES.txt): /output/entry.txt is UTF-8 text of 1 to 160 characters,
// not only white space.
import * as fs from "node:fs";

const p = "/output/entry.txt";
let ok = true;
const fail = (msg) => { ok = false; console.log(`FAIL: ${msg}`); };

if (!fs.existsSync(p)) {
  fail(`${p} does not exist`);
} else {
  const buf = fs.readFileSync(p);
  const text = buf.toString("utf8");
  // Round-trip check: invalid UTF-8 would not survive the decode/encode.
  if (!Buffer.from(text, "utf8").equals(buf)) fail("not valid UTF-8");
  const chars = [...text].length;
  console.log(`characters: ${chars}`);
  console.log(`bytes: ${buf.length}`);
  console.log(`text: ${JSON.stringify(text)}`);
  if (chars < 1 || chars > 160) fail(`character count ${chars} outside 1-160`);
  if (text.trim().length === 0) fail("entry is only white space");
  if (text.includes("\n")) fail("entry spans more than one line");
}
console.log(ok ? "GATE: PASS" : "GATE: FAIL");
process.exit(ok ? 0 : 1);
