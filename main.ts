// One Emoji, One Smile — make.fun bounty u-0xkianno-one-emoji-one-smile-5470751f
//
// The program writes exactly one emoji to /output/entry.txt. That text is
// the whole entry: the judge (z-ai/glm-5.3-flash) shows entries two at a time
// and picks the warmer, against the brief's five criteria in order.
//
// WHY 🤗 U+1F917 HUGGING FACE — the choice, criterion by criterion:
// 1. Single warm emoji: a smiling face with open arms is an active offer of
//    warmth — it "plainly aims to warm a stranger" more than a bare smile.
// 2. Warmth at first glance: face + hug reads as kind and friendly with no
//    context needed; a smile is contagious, a hug is the gesture of it.
// 3. Universality: a hug means friendship in every culture and age group;
//    no irony, no in-joke, nothing that can land wrong.
// 4. Chosen rather than default: the field will be full of 🙂 😊 😀 😄 —
//    the default smileys. 😊 is the warmest of them but IS the first smiley
//    that comes to mind, so it loses criterion 4 whenever 1–3 tie. 🤗 is
//    clearly picked for the moment while staying instantly readable.
// 5. Right for a stranger: a virtual hug is friendly, not intimate — unlike
//    🥰 (hearts = affectionate) or 🫶 (reads as "I love you"), and unlike a
//    bare ❤️/💛, which is a symbol, not a smile, and reads more intimate
//    from someone unknown. 🌞 is cheerful but its warmth is metaphorical;
//    a face beats a sun on criterion 2.
//
// WHY NO TEXT: the brief says twice "exactly one emoji and nothing else,
// with no words, no explanation". The generic "text addressed to the judge
// is allowed" clause cannot outweigh criterion 1 — the most important one —
// which scores "a single emoji". Any added words risk losing criterion 1
// against every pure emoji. So: one emoji, nothing else.
//
// WHY A FIXED OUTPUT: the text is what is judged, not the code. Any
// selection logic could only add failure modes (env reads, time, network).
// The program is deterministic: same bytes on every run.
//
// RULES COMPLIANCE (no env secrets, no dynamic code):
// - reads no environment variable, no file, no network;
// - no eval / Function / vm / dynamic import / child process;
// - writes only /output/entry.txt (or the argv[2] override, local tests only).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: exactly one emoji, U+1F917 HUGGING FACE.
const EMOJI = "🤗";

// The gate allows 1–8 characters; we write exactly 1 code point (4 bytes).
// Count code points, not UTF-16 units: "🤗".length is 2 in JS.
if ([...EMOJI].length !== 1 || EMOJI.trim() === "") {
  throw new Error("entry must be exactly one non-whitespace character");
}

const outPath = process.argv[2] ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EMOJI, "utf8");
