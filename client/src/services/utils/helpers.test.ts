import { getInitials, getStartAndEnd } from "./helpers";
import { IMeta } from "../../types/api";

describe("getInitials", () => {
  it("should return the first letter capitalized for a single name", () => {
    expect(getInitials("muazam")).toBe("M");
  });

  it("should return the initials of the first and last name capitalized", () => {
    expect(getInitials("john doe")).toBe("JD");
  });

  it("should return the initials of the first two words in a multi-word name", () => {
    expect(getInitials("john michael doe")).toBe("JM");
  });
});

describe("getStartAndEnd", () => {
  it("should return '0' if meta is undefined", () => {
    expect(getStartAndEnd(undefined)).toBe("0");
  });

  it("should return correct range when total_count is 0", () => {
    const meta: IMeta = { total_count: 0, limit: 10, offset: 0, total_pages: 0 };
    expect(getStartAndEnd(meta)).toBe("0-0");
  });

  it("should return correct start and end values", () => {
    const meta: IMeta = { total_count: 100, limit: 10, offset: 20, total_pages: 10 };
    expect(getStartAndEnd(meta)).toBe("21-30");
  });

  it("should handle cases where end exceeds total_count", () => {
    const meta: IMeta = { total_count: 25, limit: 10, offset: 20, total_pages: 3 };
    expect(getStartAndEnd(meta)).toBe("21-25");
  });
});
