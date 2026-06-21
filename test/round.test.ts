import { describe, it, expect } from "vitest";
import { round, roundTo, isClose } from "../src/index.js";

describe("round", () => {
  it("rounds to decimals without float surprises", () => {
    expect(round(1.005, 2)).toBe(1.01); // naive gives 1
    expect(round(1.255, 2)).toBe(1.26);
    expect(round(2.5)).toBe(3);
    expect(round(1234.5678)).toBe(1235);
  });

  it("supports negative decimals", () => {
    expect(round(1234.5678, -2)).toBe(1200);
    expect(round(1250, -2)).toBe(1300);
  });

  it("passes through non-finite values", () => {
    expect(round(Infinity)).toBe(Infinity);
    expect(round(NaN)).toBeNaN();
  });
});

describe("roundTo", () => {
  it("rounds to a multiple of step", () => {
    expect(roundTo(7, 5)).toBe(5);
    expect(roundTo(8, 5)).toBe(10);
    expect(roundTo(0.27, 0.05)).toBe(0.25);
    expect(roundTo(0.28, 0.05)).toBe(0.3);
  });

  it("throws on a zero step", () => {
    expect(() => roundTo(1, 0)).toThrow(RangeError);
  });
});

describe("isClose", () => {
  it("treats floating sums as equal", () => {
    expect(isClose(0.1 + 0.2, 0.3)).toBe(true);
    expect(isClose(1, 1)).toBe(true);
  });

  it("uses relative tolerance at large magnitudes", () => {
    expect(isClose(1e9, 1e9 + 1)).toBe(true);
    expect(isClose(1, 1.5)).toBe(false);
  });

  it("respects a custom tolerance", () => {
    expect(isClose(1, 1.05, 0.1)).toBe(true);
    expect(isClose(1, 1.2, 0.1)).toBe(false);
  });
});
