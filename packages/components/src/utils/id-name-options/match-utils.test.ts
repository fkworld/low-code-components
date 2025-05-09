import { describe, expect, it } from "vitest";

import { isMatchId, isMatchIds } from "./match-utils";

describe(isMatchId.name, () => {
  it("should match", () => {
    expect(isMatchId(0, 0)).toBe(true);
    expect(isMatchId("0", 0)).toBe(true);
    expect(isMatchId(0, "0")).toBe(true);
    expect(isMatchId("0", "0")).toBe(true);
  });

  it("should not match", () => {
    expect(isMatchId(0, 1)).toBe(false);
    expect(isMatchId("0", 1)).toBe(false);
    expect(isMatchId("", 1)).toBe(false);
    expect(isMatchId(undefined, 1)).toBe(false);
    // @ts-expect-error 测试异常输入
    expect(isMatchId(false, 1)).toBe(false);
    // @ts-expect-error 测试异常输入
    expect(isMatchId(null, 1)).toBe(false);
    // @ts-expect-error 测试异常输入
    expect(isMatchId({}, undefined)).toBe(false);
  });
});

describe(isMatchIds.name, () => {
  it("should match", () => {
    expect(isMatchIds([0, "1"], 0)).toBe(true);
    expect(isMatchIds(["0", "1"], 0)).toBe(true);
    expect(isMatchIds([0, "1"], "0")).toBe(true);
    expect(isMatchIds(["0", "1"], "0")).toBe(true);
  });

  it("should not match", () => {
    expect(isMatchIds([], 0)).toBe(false);
    expect(isMatchIds(undefined, 2)).toBe(false);
  });
});
