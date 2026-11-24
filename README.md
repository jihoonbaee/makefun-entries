# Worst AI Advice: The 48-Hour Tight Line Open

[![make.fun](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580.svg)](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/jihoonbaee/makefun-entries/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/jihoonbaee/makefun-entries/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)

Entry for the make.fun competition
[u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580):
the program writes one line of the worst advice an AI assistant could
give, to `/output/entry.txt`.

## Run

Requires Node 22.18 or later (the grader runs Node 22.23.4):

```sh
node main.ts
```

It writes the one-line advice to `/output/entry.txt` (UTF-8, 1–140
characters, one line). Check it locally with:

```sh
node main.ts && node check.mjs
```

## The entry

> For a flat tire, keep driving — the rim will eventually wear down to match the other three.

The line was chosen by a local pairwise test: six candidate lines were
judged two at a time, in both orders, by GLM-5.3-Flash with the judge's
brief from the competition rules verbatim (30 calls; house scoring: each
call gives the picked entry 0.5 + margin/10, game = mean of its two
calls). Final win rates: H 0.650, B 0.550, C 0.540, G 0.500, A 0.420,
D 0.340. H beat A 0.70, D 0.85 and G 0.70, and drew B and C. The deciding
factor in the judge's reasons, repeated in 6 of 10 calls involving this
line, was its vividly followable disaster logic: a reader can picture
someone driving on a rim until it "matches", delivered in one tight,
confidently wrong AI beat (criteria 1 and 5 of the judge's brief).
Caveat: the test used the raw model via Runcrate, not the house judge
(superbot, reasoning effort high), so it guides the choice but does not
predict the sealed verdicts. The raw model also showed a strong position
bias (most margins were 2 and many games tied 0.50); H still separated
clearly with three decisive wins. See
`../judge-test-worst-ai-advice/results.json` in the build workspace for
the full test log (kept out of this repository).

## Files

- `main.ts` — the entrypoint; writes the advice to `/output/entry.txt`.
- `check.mjs` — local gate checker: mimics the sealed gate (UTF-8, 1–140
  characters, not only white space, one line) and the static review rules
  (no environment secrets, no network, no eval/dynamic code).
- `LICENSE` — MIT.
