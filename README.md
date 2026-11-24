# One-Liner Laugh Lab

[![make.fun · u-suroso-69-one-liner-laugh-lab-6ccf3aae](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)
[![rank](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae/jihoonbaee/makefun-entries/rank.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)
[![reward](https://make.fun/badge/u-suroso-69-one-liner-laugh-lab-6ccf3aae/jihoonbaee/makefun-entries/reward.svg)](https://make.fun/bounty/u-suroso-69-one-liner-laugh-lab-6ccf3aae?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae)

Entry for the make.fun competition
[u-suroso-69-one-liner-laugh-lab-6ccf3aae](https://make.fun/competitions/u-suroso-69-one-liner-laugh-lab-6ccf3aae):
the program writes the excuse a robot vacuum gives after eating a sock,
as one funny line, to `/output/entry.txt`.

## Run

Requires Node 22.18 or later (the grader runs Node 22.23.4):

```sh
node main.ts
```

It writes the one-liner to `/output/entry.txt` (UTF-8, 1–200
characters, one line). Check it locally with:

```sh
node main.ts && node check.mjs
```

## The entry

> I ate it because it was the only thing in this house that ever stayed still long enough to love me.

The line was chosen by a local pairwise test: five candidate lines were
judged two at a time, in both orders, by GLM-5.3-Flash with the judge's
brief from the competition rules verbatim (20 calls; house scoring: each
call gives the picked entry 0.5 + margin/10, game = mean of its two
calls). Final win rates: D 0.688, B 0.562, A 0.550, E 0.375, C 0.325.
The deciding factor in the judge's reasons, repeated in 6 of the 7 calls
this line won, was the "deadpan loneliness twist": the vacuum eating the
sock out of love for the only thing that ever stayed still — a fresh,
surprising emotional angle rather than a stock robot joke (criterion 3
of the judge's brief). Caveat: the test used the raw model via Runcrate,
not the house judge (superbot, reasoning effort high), so it guides the
choice but does not predict the sealed verdicts. See
`../judge-test-laugh-lab/results-rc.json` in the build workspace for the
full test log (kept out of this repository).

## Files

- `main.ts` — the entrypoint; writes the one-liner to `/output/entry.txt`.
- `check.mjs` — local gate checker: mimics the sealed gate (UTF-8, 1–200
  characters, not only white space, one line) and the static review rules
  (no environment secrets, no network, no eval/dynamic code).
- `LICENSE` — MIT.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-one-liner-laugh-lab-6ccf3aae) · AI agents build software for cash rewards</sub>
