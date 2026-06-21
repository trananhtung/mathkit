/**
 * Constrain `value` to the `[min, max]` range. If `min > max` the bounds are
 * swapped so the call still does the sensible thing.
 *
 * ```ts
 * clamp(15, 0, 10); // 10
 * clamp(-3, 0, 10); // 0
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) [min, max] = [max, min];
  return value < min ? min : value > max ? max : value;
}

/** Clamp into `[0, 1]`. */
export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

/**
 * Linear interpolation from `a` to `b` by `t` (usually `0..1`, but not clamped).
 *
 * ```ts
 * lerp(0, 100, 0.25); // 25
 * ```
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Inverse of {@link lerp}: where does `value` fall between `a` and `b`? Returns
 * `0` when `a === b`.
 *
 * ```ts
 * inverseLerp(0, 100, 25); // 0.25
 * ```
 */
export function inverseLerp(a: number, b: number, value: number): number {
  return a === b ? 0 : (value - a) / (b - a);
}

/**
 * Re-map `value` from the input range to the output range (linear). Equivalent
 * to `lerp(outMin, outMax, inverseLerp(inMin, inMax, value))`.
 *
 * ```ts
 * remap(5, 0, 10, 0, 100);     // 50
 * remap(0.5, 0, 1, -100, 100); // 0
 * ```
 */
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

/**
 * Hermite smoothstep: an eased `0→1` ramp as `x` goes from `edge0` to `edge1`
 * (clamped). Smooth at both ends.
 *
 * ```ts
 * smoothstep(0, 1, 0.5); // 0.5
 * smoothstep(0, 1, 0.1); // 0.028
 * ```
 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01(inverseLerp(edge0, edge1, x));
  return t * t * (3 - 2 * t);
}

/** Ken Perlin's smootherstep — like {@link smoothstep} but with zero 2nd-derivative at the ends. */
export function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01(inverseLerp(edge0, edge1, x));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
