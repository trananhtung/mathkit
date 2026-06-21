# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-22

### Added

- Interpolation: `clamp` (tolerates swapped bounds), `clamp01`, `lerp`,
  `inverseLerp`, `remap`, `smoothstep`, `smootherstep`.
- Rounding: `round` (float-correct, supports negative decimals), `roundTo`
  (nearest multiple), `isClose` (absolute + relative tolerance).
- Angles & misc: `degToRad`, `radToDeg`, `wrap` (range modulo), `gcd`, `lcm`.
- All functions pure and tree-shakeable.
- ESM + CJS builds, types, and CI across Node 18 / 20 / 22.
