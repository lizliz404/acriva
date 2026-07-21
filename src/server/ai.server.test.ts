import { describe, expect, it } from "vitest";
import { jaccard, parseJsonArray, rankByContent, smaForecast } from "#/server/ai.server";

describe("parseJsonArray", () => {
  it("parses arrays and tolerates bad input", () => {
    expect(parseJsonArray('["a","b"]')).toEqual(["a", "b"]);
    expect(parseJsonArray("not-json")).toEqual([]);
    expect(parseJsonArray(null)).toEqual([]);
  });
});

describe("jaccard", () => {
  it("scores overlap", () => {
    expect(jaccard(["Tomato"], ["Tomato", "Cucumber"])).toBeCloseTo(0.5);
    expect(jaccard([], [])).toBe(0);
    expect(jaccard(["a"], ["b"])).toBe(0);
  });
});

describe("smaForecast", () => {
  it("returns zeros for empty series", () => {
    expect(smaForecast([], 3, 2)).toEqual([0, 0, 0]);
  });

  it("produces horizon-length positive series", () => {
    const out = smaForecast([10, 11, 12, 13], 4, 3);
    expect(out).toHaveLength(4);
    expect(out.every((n) => n > 0)).toBe(true);
  });
});

describe("rankByContent", () => {
  it("ranks peers and skips self", () => {
    const ranked = rankByContent({
      selfId: "f1",
      selfCrops: ["番茄"],
      selfRegion: "华东",
      selfTags: ["棚室"],
      peers: [
        {
          id: "f1",
          name: "自己",
          region: "华东",
          crops: ["番茄"],
          tags: ["棚室"],
        },
        {
          id: "f2",
          name: "邻社",
          region: "华东",
          crops: ["番茄", "黄瓜"],
          tags: ["棚室"],
        },
        {
          id: "f3",
          name: "远方",
          region: "西北",
          crops: ["小麦"],
          tags: [],
        },
      ],
    });
    expect(ranked.every((r) => r.id !== "f1")).toBe(true);
    expect(ranked[0]?.id).toBe("f2");
    expect(ranked[0]?.reason).toMatch(/作物|产区|标签/);
  });
});
