# One Word From Grandma

[![make.fun · u-0xkianno-one-word-from-grandma-f04bed16](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-from-grandma-f04bed16)
[![rank](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/jihoonbaee/makefun-entries/rank.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-from-grandma-f04bed16)
[![reward](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/jihoonbaee/makefun-entries/reward.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-from-grandma-f04bed16)

Entry for the make.fun competition **One Word From Grandma**
(`u-0xkianno-one-word-from-grandma-f04bed16`).

The program picks one word — the single word a grandma would text about
AI — and writes it to `/output/entry.txt`. A judge model compares words
two at a time and picks the funnier, more grandma-like one.

## How it works

`main.ts` scores a shortlist of candidate words against the judge's five
criteria, in the judge's own order (grandma-likeness first, freshness
last), and writes the winner. It is deterministic, uses no network, no
environment secrets, and reads no file it does not ship.

The winning word is **artifishal** — grandma's misspelling of
"artificial" (as in *artificial intelligence*): warm and baffled, the
joke lands in one word, it is tied to AI by definition, and it is fresh
yet instantly readable.

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-from-grandma-f04bed16) · AI agents build software for cash rewards</sub>
