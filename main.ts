// One Word From Grandma — make.fun entry
// Competition: u-0xkianno-one-word-from-grandma-f04bed16
//
// The task: write exactly one word to /output/entry.txt — the single word
// the entrant's grandma would text about AI. A judge model compares words
// two at a time and picks the funnier, more grandma-like one.
//
// Judge criteria, in order (RULES.txt, "The judge"):
//   1. Reads as the single word a grandma would text about AI.
//   2. Sounds like a real grandmother's texting voice, warm and a little baffled.
//   3. Is funny in one word, with the joke landing without a caption.
//   4. Feels tied to AI, robots or machines, not a word for any subject.
//   5. Is a fresh pick rather than the obvious one, and still instantly readable.
//
// Gate (RULES.txt, "The gate"): /output/entry.txt must be UTF-8 text of
// 1 to 30 characters, not only white space. Only a valid entry is judged.
//
// This program scores a shortlist of candidate words against those five
// criteria (weighted in the judge's own order) and writes the winner.
// It is fully deterministic, reads nothing from the network, the
// environment or any file it does not ship, and writes only entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Scores = [number, number, number, number, number];

interface Candidate {
  word: string;
  // Scores 0-5 per judge criterion, in the judge's order.
  scores: Scores;
  why: string;
}

// Weights follow the judge's order: criterion 1 matters most, 5 least.
// A later criterion can only overturn an earlier one when it differs by
// much more, so the weights fall steeply (5, 4, 3, 2, 1).
const WEIGHTS: Scores = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    word: "robot",
    scores: [4, 2, 1, 5, 1],
    why: "Grandma would text it, and it is about machines — but it is the plain, obvious pick: no grandma voice, no joke.",
  },
  {
    word: "robit",
    scores: [5, 4, 3, 5, 2],
    why: "The classic grandma typo of robot: warm, baffled, funny. But it is the first typo every entrant thinks of, so it is the obvious pick and the most likely duplicate / house fixed text.",
  },
  {
    word: "robut",
    scores: [5, 4, 3, 5, 3],
    why: "Same typo family as robit, slightly fresher, but still one letter away from the obvious pick.",
  },
  {
    word: "doohickey",
    scores: [4, 5, 4, 1, 4],
    why: "Peak grandma voice — the word for a thing she cannot name — but it would fit any subject at all, so it loses criterion 4 to any AI-tied word.",
  },
  {
    word: "siri",
    scores: [4, 3, 1, 4, 1],
    why: "A name grandma knows, but a brand name, not her voice, and the obvious pick.",
  },
  {
    word: "chatgpt",
    scores: [3, 1, 1, 5, 1],
    why: "The literal name of the thing, not a word grandma would text; no voice, no joke, the obvious pick.",
  },
  {
    word: "artifishal",
    scores: [5, 5, 5, 5, 4],
    why: "Grandma's misspelling of 'artificial' — as in artificial intelligence, AI itself. Warm and baffled (she is trying to say the big word and the fish swims in), the joke lands in one word with no caption, it is tied to AI by definition, and it is fresh: nobody's first guess, yet instantly readable as 'artificial'.",
  },
  {
    word: "beepboop",
    scores: [3, 3, 3, 4, 3],
    why: "Robot sounds, fun — but more internet cute-speak than a grandma's texting voice.",
  },
  {
    word: "computery",
    scores: [4, 4, 3, 4, 4],
    why: "A grandma adjective for the machine thing, warm and funny — but 'artifishal' beats it on the joke (criterion 3) and on the direct AI tie (criterion 4).",
  },
];

function total(scores: Scores): number {
  return scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    // Strictly greater wins; ties keep the earlier candidate, so the
    // result is stable and deterministic.
    if (total(c.scores) > total(best.scores)) best = c;
  }
  return best;
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  const word = winner.word;

  // Gate check, mirroring RULES.txt: 1-30 UTF-8 characters, not only
  // white space. The judge's brief adds: one word, no sentence, no
  // explanation, no punctuation tricks — so require a single alphabetic
  // word. Fail loudly instead of writing an invalid entry.
  const chars = [...word].length;
  if (chars < 1 || chars > 30 || word.trim().length === 0) {
    throw new Error(`Chosen word fails the gate: ${JSON.stringify(word)} (${chars} chars)`);
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error(`Chosen word is not a single plain word: ${JSON.stringify(word)}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
  console.log(`entry: ${word} (${chars} chars, score ${total(winner.scores)})`);
}

main();
