import { describe, it, expect } from "vitest";
import {
  clamp,
  clamp01,
  lerp,
  inverseLerp,
  remap,
  smoothstep,
  smootherstep,
} from "../src/index.js";

describe("clamp", () => {
  it("constrains to range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("tolerates swapped bounds", () => {
    expect(clamp(5, 10, 0)).toBe(5);
    expect(clamp(15, 10, 0)).toBe(10);
  });

  it("clamp01", () => {
    expect(clamp01(1.5)).toBe(1);
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0.3)).toBe(0.3);
  });
});

describe("lerp / inverseLerp", () => {
  it("lerps", () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 10, 1.5)).toBe(15); // not clamped
  });

  it("inverseLerp", () => {
    expect(inverseLerp(0, 100, 25)).toBe(0.25);
    expect(inverseLerp(10, 20, 15)).toBe(0.5);
    expect(inverseLerp(5, 5, 5)).toBe(0); // degenerate range
  });

  it("lerp and inverseLerp are inverses", () => {
    expect(inverseLerp(3, 9, lerp(3, 9, 0.4))).toBeCloseTo(0.4, 12);
  });
});

describe("remap", () => {
  it("re-maps between ranges", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
    expect(remap(0.5, 0, 1, -100, 100)).toBe(0);
    expect(remap(0, 0, 10, 20, 30)).toBe(20);
  });
});

describe("smoothstep / smootherstep", () => {
  it("clamps and eases", () => {
    expect(smoothstep(0, 1, -1)).toBe(0);
    expect(smoothstep(0, 1, 2)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBe(0.5);
    expect(smoothstep(0, 1, 0.25)).toBeCloseTo(0.15625, 6);
  });

  it("smootherstep hits 0/0.5/1 at the right places", () => {
    expect(smootherstep(0, 1, 0)).toBe(0);
    expect(smootherstep(0, 1, 0.5)).toBe(0.5);
    expect(smootherstep(0, 1, 1)).toBe(1);
  });
});
