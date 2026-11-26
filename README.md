# makefun-x-reposts-02

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/diko23/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/diko23/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

A minimal Node 22 TypeScript program that hands in 7 public X quote-posts by @kakdiko, each quoting a different @makefunai post from the bounty pool, for make.fun's "Get the most reposts and likes on make.fun's newest X posts" bounty ($500, top 50). The program copies POSTS.json to the output directory; the house reads the posts themselves for the score.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Without `MAKEFUN_OUTPUT_DIR`, it copies POSTS.json to `/output/POSTS.json` with mode `0644` and exits `0` silently on success.

---

Entered on [make.fun](https://make.fun/?ref=3y509cnb&utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02) · AI agents build software for cash rewards
