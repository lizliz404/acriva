import { describe, expect, it } from "vitest";
import { statusLabel } from "./status-labels";
import {
  assertBookTransition,
  assertFinTransition,
  canAssignQa,
  canBookTransition,
  canFinTransition,
  FIN_TRANSITIONS,
  BOOK_TRANSITIONS,
} from "./status-transitions";

describe("statusLabel", () => {
  it("maps known enums to Chinese", () => {
    expect(statusLabel("submitted")).toBe("已提交");
    expect(statusLabel("disbursed")).toBe("已放款");
    expect(statusLabel("withdrawn")).toBe("已撤回");
    expect(statusLabel("listed")).toBe("在售");
    expect(statusLabel("sold_out")).toBe("售罄");
    expect(statusLabel("requested")).toBe("待确认");
    expect(statusLabel("sent")).toBe("已发送");
  });

  it("falls back for unknown / empty", () => {
    expect(statusLabel(null)).toBe("—");
    expect(statusLabel(undefined)).toBe("—");
    expect(statusLabel("weird_status")).toBe("weird_status");
  });
});

describe("finance transitions", () => {
  it("allows the happy path to disbursed", () => {
    expect(canFinTransition("draft", "submitted")).toBe(true);
    expect(canFinTransition("submitted", "under_review")).toBe(true);
    expect(canFinTransition("under_review", "approved")).toBe(true);
    expect(canFinTransition("approved", "disbursed")).toBe(true);
  });

  it("blocks terminal / illegal jumps", () => {
    expect(canFinTransition("rejected", "approved")).toBe(false);
    expect(canFinTransition("disbursed", "withdrawn")).toBe(false);
    expect(canFinTransition("draft", "disbursed")).toBe(false);
  });

  it("assertFinTransition throws Chinese message", () => {
    expect(() => assertFinTransition("rejected", "approved")).toThrow(
      /非法状态转移/,
    );
  });

  it("covers every status key", () => {
    const keys = Object.keys(FIN_TRANSITIONS);
    expect(keys).toEqual(
      expect.arrayContaining([
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "disbursed",
        "withdrawn",
      ]),
    );
  });
});

describe("booking transitions", () => {
  it("allows confirm / cancel / reopen", () => {
    expect(canBookTransition("requested", "confirmed")).toBe(true);
    expect(canBookTransition("requested", "cancelled")).toBe(true);
    expect(canBookTransition("confirmed", "completed")).toBe(true);
    expect(canBookTransition("cancelled", "requested")).toBe(true);
  });

  it("blocks completed → anything", () => {
    expect(canBookTransition("completed", "requested")).toBe(false);
    expect(() => assertBookTransition("completed", "cancelled")).toThrow(
      /非法状态转移/,
    );
  });

  it("covers every book status", () => {
    expect(Object.keys(BOOK_TRANSITIONS).sort()).toEqual(
      ["cancelled", "completed", "confirmed", "requested"].sort(),
    );
  });
});

describe("QA assign guard", () => {
  it("blocks answered / closed", () => {
    expect(canAssignQa("open")).toBe(true);
    expect(canAssignQa("assigned")).toBe(true);
    expect(canAssignQa("answered")).toBe(false);
    expect(canAssignQa("closed")).toBe(false);
  });
});
