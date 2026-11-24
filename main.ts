import * as fs from "node:fs";
import * as path from "node:path";

// Winning entry: candidate A, winner of the 6-candidate proxy-judge
// round-robin tournament (GLM-5.3-Flash, brief verbatim, 15 games / 30 calls),
// win rate 0.68. See BUILD-REPORT.md for the full table.
const entry =
  "I promise to love you in sickness and in health, in low battery and in full charge, until a firmware update do us part.";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync(path.join("/output", "entry.txt"), entry, "utf8");
console.log(`wrote /output/entry.txt (${entry.length} characters)`);
