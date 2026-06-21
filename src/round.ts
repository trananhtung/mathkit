/**
 * Round to a number of decimal places, avoiding the binary-float surprises of
 * `Math.round(x * 100) / 100` (e.g. `1.005`).
 *
 * ```ts
 * round(1.005, 2); // 1.01   (naive approach gives 1)
 * round(1234.5678); // 1235
 * round(1234.5678, -2); // 1200
 * ```
 */
export function round(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) return value;
  // Shift via exponent string to dodge float error, then shift back.
  const shifted = Number(`${value}e${decimals}`);
  const rounded = Math.round(shifted);
  return Number(`${rounded}e${-decimals}`);
}

/**
 * Round to the nearest multiple of `step`.
 *
 * ```ts
 * roundTo(7, 5);    // 5
 * roundTo(8, 5);    // 10
 * roundTo(0.27, 0.05); // 0.25
 * ```
 */
export function roundTo(value: number, step: number): number {
  if (step === 0) throw new RangeError("roundTo: step must not be 0");
  // Round the multiplier with `round` so 0.05-style steps stay clean.
  return round(Math.round(value / step) * step, 12);
}

/**
 * Compare two floats for approximate equality. Uses a combined absolute and
 * relative tolerance so it works near zero and at large magnitudes.
 *
 * ```ts
 * isClose(0.1 + 0.2, 0.3); // true
 * isClose(1e9, 1e9 + 1);   // true (relative)
 * ```
 */
export function isClose(a: number, b: number, tolerance = 1e-9): boolean {
  if (a === b) return true;
  const diff = Math.abs(a - b);
  return diff <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
}
