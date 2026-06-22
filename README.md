# mathkit

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

> Tiny, type-safe **scalar math** utilities — `clamp`, `lerp`, `remap`, `smoothstep`, precise `round`, `wrap`, `gcd`/`lcm`, and more. **Zero dependencies**.

[![CI](https://github.com/trananhtung/mathkit/actions/workflows/ci.yml/badge.svg)](https://github.com/trananhtung/mathkit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@billdaddy/mathkit.svg)](https://www.npmjs.com/package/@billdaddy/mathkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@billdaddy/mathkit)](https://bundlephobia.com/package/@billdaddy/mathkit)
[![types](https://img.shields.io/npm/types/@billdaddy/mathkit.svg)](https://www.npmjs.com/package/@billdaddy/mathkit)
[![license](https://img.shields.io/npm/l/@billdaddy/mathkit.svg)](./LICENSE)

`Math` gives you `min`, `max`, and `round` — but every UI, chart, game, and
animation also needs `clamp`, `lerp`, a `remap` between ranges, and a `round`
that doesn't trip on `1.005`. `mathkit` is that missing scalar toolbox, fully
typed and **tree-shakeable**.

```ts
import { clamp, lerp, remap } from "@billdaddy/mathkit";

clamp(volume, 0, 1);                 // keep in range
lerp(start, end, t);                 // animate
remap(scrollY, 0, 800, 1, 0.4);      // map scroll → opacity
```

## Why mathkit?

- **The everyday helpers.** `clamp`, `clamp01`, `lerp`, `inverseLerp`, `remap`,
  `smoothstep`, `smootherstep`.
- **Rounding done right.** `round(1.005, 2) === 1.01` (the naive `* 100` trick
  gives `1`); plus `roundTo` for nearest-multiple snapping.
- **Float-safe comparisons.** `isClose` uses combined absolute + relative
  tolerance, so `0.1 + 0.2 ≈ 0.3` and large numbers compare sanely.
- **Angles & wrapping.** `degToRad`/`radToDeg` and a `wrap` that handles negatives
  and arbitrary ranges (great for angles and looping indices).
- **Number theory.** `gcd`, `lcm`.
- **Tree-shakeable.** `sideEffects: false`, ESM + CJS, zero dependencies.

## Install

```bash
npm install @billdaddy/mathkit
# or: pnpm add @billdaddy/mathkit  /  yarn add @billdaddy/mathkit  /  bun add @billdaddy/mathkit
```

## Interpolation

```ts
import { clamp, clamp01, lerp, inverseLerp, remap, smoothstep } from "@billdaddy/mathkit";

clamp(15, 0, 10);          // 10   (swapped bounds are tolerated)
clamp01(1.5);              // 1
lerp(0, 100, 0.25);        // 25   (t is not clamped)
inverseLerp(0, 100, 25);   // 0.25
remap(5, 0, 10, 0, 100);   // 50
smoothstep(0, 1, 0.25);    // 0.15625 (eased, clamped)
```

## Rounding & comparison

```ts
import { round, roundTo, isClose } from "@billdaddy/mathkit";

round(1.005, 2);     // 1.01
round(1234.5678, -2); // 1200
roundTo(0.27, 0.05); // 0.25
isClose(0.1 + 0.2, 0.3); // true
isClose(1, 1.05, 0.1);   // true (custom tolerance)
```

## Angles, wrapping, number theory

```ts
import { degToRad, radToDeg, wrap, gcd, lcm } from "@billdaddy/mathkit";

degToRad(180);        // 3.14159…
wrap(370, 0, 360);    // 10
wrap(-30, 0, 360);    // 330
gcd(12, 18);          // 6
lcm(4, 6);            // 12
```

## Pairs well with

| Need | Use |
| --- | --- |
| Reduce arrays (`sum`, `mean`, `minBy`…) | [`@billdaddy/arraykit`](https://www.npmjs.com/package/@billdaddy/arraykit) |
| Human-format numbers (`1.2K`, bytes) | [`humankit`](https://www.npmjs.com/package/humankit) |

## Contributors ✨

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome — code, docs, bug reports, ideas, reviews! See the [emoji key](https://allcontributors.org/docs/en/emoji-key) for how each contribution is recognized, and open a PR or issue to get involved.

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/trananhtung"><img src="https://avatars.githubusercontent.com/u/30992229?v=4?s=100" width="100px;" alt="Tung Tran"/><br /><sub><b>Tung Tran</b></sub></a><br /><a href="https://github.com/trananhtung/mathkit/commits?author=trananhtung" title="Code">💻</a> <a href="#maintenance-trananhtung" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](./LICENSE) © Tung Tran
