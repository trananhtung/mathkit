const DEG_PER_RAD = 180 / Math.PI;
const RAD_PER_DEG = Math.PI / 180;

/** Degrees → radians. */
export function degToRad(degrees: number): number {
  return degrees * RAD_PER_DEG;
}

/** Radians → degrees. */
export function radToDeg(radians: number): number {
  return radians * DEG_PER_RAD;
}

/**
 * Wrap `value` into the half-open range `[min, max)`, like a modulo that handles
 * negatives and arbitrary ranges. Useful for angles and looping indices.
 *
 * ```ts
 * wrap(370, 0, 360); // 10
 * wrap(-30, 0, 360); // 330
 * wrap(7, 0, 5);     // 2
 * ```
 */
export function wrap(value: number, min: number, max: number): number {
  const span = max - min;
  if (span <= 0) throw new RangeError("wrap: max must be greater than min");
  return ((((value - min) % span) + span) % span) + min;
}

/** Greatest common divisor (always non-negative). */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/** Least common multiple (always non-negative; `0` if either input is `0`). */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.trunc(a) / gcd(a, b) * Math.trunc(b));
}
