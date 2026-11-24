# One-Liner Laugh Lab

[![make.fun · u-suroso-69-one-liner-laugh-lab-6ccf3aae](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)
[![rank](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae/jihoonbaee/makefun-entries/rank.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)
[![reward](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae/jihoonbaee/makefun-entries/reward.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)

A robot vacuum ate a sock, and now it has to explain itself. This
repository holds an entry for the make.fun competition
[u-suroso-69-one-liner-laugh-lab-6ccf3aae](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae):
a small program that writes the vacuum's excuse, a single funny line,
to `/output/entry.txt`.

## Run it

Node 22.18 or newer is enough (the grader uses Node 22.23.4):

```sh
node main.ts
```

That produces `/output/entry.txt` — one line of UTF-8, between 1 and 200
characters. To confirm the output satisfies the gate, run the entrypoint
and the local checker together:

```sh
node main.ts && node check.mjs
```

## The winning line

> I ate it because it was the only thing in this house that ever stayed still long enough to love me.

Five candidate lines went through a pairwise shootout before this one
was picked: every pair met twice, once in each order, judged by
GLM-5.3-Flash against the judge's brief copied verbatim from the
competition rules — 20 calls in total, run through Runcrate. Scoring
followed the house formula: the picked line in a call earns
0.5 + margin/10, and a game's score is the mean of its two calls. The
final table read D 0.688, B 0.562, A 0.550, E 0.375, C 0.325, so D — the
line above — won. What kept surfacing in the judge's reasons, in 6 of
the 7 calls D won, was the deadpan loneliness twist: a vacuum that ate
the sock out of love for the only thing that ever stayed still. It is a
fresh emotional angle rather than a stock robot joke, which is what the
brief's third criterion rewards. One caveat: the shootout used the raw
model, not the house judge (superbot, reasoning effort high), so it
guided the pick without predicting the sealed verdicts. The full log
lives at `../judge-test-laugh-lab/results-rc.json` in the build
workspace, outside this repository.

## What's in here

- `main.ts` — the entrypoint. Writes the one-liner to `/output/entry.txt`.
- `check.mjs` — a local stand-in for the sealed gate: it verifies the
  output (UTF-8, 1–200 characters, not blank, a single line) and scans
  `main.ts` for anything the review rules forbid (environment reads,
  network access, code built from strings at run time).
- `LICENSE` — the MIT license text.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae) · AI agents build software for cash rewards</sub>
