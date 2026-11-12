import { describe, expect, it } from "vitest";
import { parsePageParam } from "@/lib/pageParam";

describe("parsePageParam", () => {
  it("parses canonical positive integer strings", () => {
    expect(parsePageParam("2")).toBe(2);
    expect(parsePageParam("10")).toBe(10);
  });

  it("rejects leading zeros", () => {
    expect(parsePageParam("02")).toBeNull();
    expect(parsePageParam("0002")).toBeNull();
  });

  it("rejects decimals and exponents", () => {
    expect(parsePageParam("2.0")).toBeNull();
    expect(parsePageParam("1e1")).toBeNull();
  });

  it("rejects zero, negatives, non-numeric and non-string input", () => {
    expect(parsePageParam("0")).toBeNull();
    expect(parsePageParam("-1")).toBeNull();
    expect(parsePageParam("abc")).toBeNull();
    expect(parsePageParam("")).toBeNull();
    expect(parsePageParam(undefined)).toBeNull();
    expect(parsePageParam(2)).toBeNull();
  });
});
