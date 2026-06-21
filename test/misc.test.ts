import { describe, it, expect } from "vitest";
import { degToRad, radToDeg, wrap, gcd, lcm } from "../src/index.js";

describe("angles", () => {
  it("converts degrees and radians", () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI, 12);
    expect(radToDeg(Math.PI)).toBeCloseTo(180, 12);
    expect(radToDeg(degToRad(57))).toBeCloseTo(57, 12);
  });
});

describe("wrap", () => {
  it("wraps into [min, max)", () => {
    expect(wrap(370, 0, 360)).toBe(10);
    expect(wrap(-30, 0, 360)).toBe(330);
    expect(wrap(7, 0, 5)).toBe(2);
    expect(wrap(5, 0, 5)).toBe(0); // upper bound wraps to min
    expect(wrap(3, 0, 5)).toBe(3);
  });

  it("works with non-zero min", () => {
    expect(wrap(11, 1, 11)).toBe(1);
    expect(wrap(0, 1, 11)).toBe(10);
  });

  it("throws on a non-positive span", () => {
    expect(() => wrap(1, 5, 5)).toThrow(RangeError);
    expect(() => wrap(1, 5, 0)).toThrow(RangeError);
  });
});

describe("gcd / lcm", () => {
  it("gcd", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(17, 5)).toBe(1);
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(-12, 18)).toBe(6); // sign-independent
  });

  it("lcm", () => {
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(21, 6)).toBe(42);
    expect(lcm(0, 5)).toBe(0);
    expect(lcm(-4, 6)).toBe(12);
  });
});
