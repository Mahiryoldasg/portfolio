import { describe, expect, it } from "vitest";
import { MESSAGE_MIN_LENGTH, validateContactSubmission } from "./contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to talk about a senior frontend role.",
};

describe("validateContactSubmission", () => {
  it("accepts a valid submission and trims whitespace", () => {
    const result = validateContactSubmission({
      ...valid,
      name: "  Ada Lovelace  ",
    });

    expect(result).toEqual({ success: true, data: valid });
  });

  it("rejects a blank name", () => {
    const result = validateContactSubmission({ ...valid, name: "   " });

    expect(result.success).toBe(false);
    expect(result).toHaveProperty("fieldErrors.name");
  });

  it("rejects a message under the minimum length", () => {
    const result = validateContactSubmission({
      ...valid,
      message: "x".repeat(MESSAGE_MIN_LENGTH - 1),
    });

    expect(result.success).toBe(false);
    expect(result).toHaveProperty("fieldErrors.message");
  });

  // A Server Action is reachable by direct POST, so a missing field arrives as
  // null rather than a string. It must read as an error, not a crash.
  it("rejects a non-string field", () => {
    const result = validateContactSubmission({ ...valid, email: null });

    expect(result.success).toBe(false);
    expect(result).toHaveProperty("fieldErrors.email");
  });
});
