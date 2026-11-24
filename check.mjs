// Local gate checker: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space (RULES.txt, "The gate").
import { readFileSync } from "node:fs";

const text = readFileSync("/output/entry.txt", "utf8");
const chars = [...text].length;
const bytes = Buffer.byteLength(text, "utf8");
const valid = chars >= 1 && chars <= 200 && text.trim().length > 0;

console.log(`chars: ${chars}`);
console.log(`bytes: ${bytes}`);
console.log(`text: ${JSON.stringify(text)}`);
console.log(valid ? "GATE: PASS" : "GATE: FAIL");
process.exit(valid ? 0 : 1);
