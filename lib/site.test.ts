import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveSiteUrl } from "./site";

const LOCALHOST = "http://localhost:3000";
const RENDER_URL = "https://portfolio.onrender.com";
const CUSTOM_URL = "https://mahirgazeloglu.com";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveSiteUrl", () => {
  it("falls back to localhost when nothing is set", () => {
    expect(resolveSiteUrl({})).toBe(LOCALHOST);
  });

  it("uses Render's own URL when only that is set", () => {
    expect(resolveSiteUrl({ RENDER_EXTERNAL_URL: RENDER_URL })).toBe(RENDER_URL);
  });

  // The contract with build-plan item 11: attaching a custom domain has to be
  // able to override Render's generated URL without a code change.
  it("prefers an explicit SITE_URL over Render's URL", () => {
    expect(
      resolveSiteUrl({
        SITE_URL: CUSTOM_URL,
        RENDER_EXTERNAL_URL: RENDER_URL,
      }),
    ).toBe(CUSTOM_URL);
  });

  it("treats a blank SITE_URL as unset", () => {
    expect(
      resolveSiteUrl({ SITE_URL: "", RENDER_EXTERNAL_URL: RENDER_URL }),
    ).toBe(RENDER_URL);
  });

  it("treats a whitespace-only SITE_URL as unset", () => {
    expect(
      resolveSiteUrl({ SITE_URL: "   ", RENDER_EXTERNAL_URL: RENDER_URL }),
    ).toBe(RENDER_URL);
  });

  it("falls all the way through to localhost when every value is blank", () => {
    expect(resolveSiteUrl({ SITE_URL: "", RENDER_EXTERNAL_URL: "  " })).toBe(
      LOCALHOST,
    );
  });

  it("strips a trailing slash so paths do not double up", () => {
    expect(resolveSiteUrl({ SITE_URL: `${CUSTOM_URL}/` })).toBe(CUSTOM_URL);
  });

  it("trims surrounding whitespace from a pasted value", () => {
    expect(resolveSiteUrl({ SITE_URL: `  ${CUSTOM_URL}  ` })).toBe(CUSTOM_URL);
  });

  // Pins the `env = process.env` default. Every other case passes an explicit
  // object, so without this one that default could be dropped and the suite
  // would stay green while the build silently resolved to localhost.
  it("reads the real process.env when called with no argument", () => {
    vi.stubEnv("SITE_URL", "");
    vi.stubEnv("RENDER_EXTERNAL_URL", RENDER_URL);

    expect(resolveSiteUrl()).toBe(RENDER_URL);
  });

  // A hosting dashboard field invites a bare hostname. Left alone it reaches
  // `new URL()` in the root layout and fails the build on a TypeError that
  // names neither the variable nor the file.
  it("adds https to a scheme-less hostname", () => {
    expect(resolveSiteUrl({ SITE_URL: "mahirgazeloglu.com" })).toBe(CUSTOM_URL);
  });

  it("leaves an explicit http origin alone rather than upgrading it", () => {
    expect(resolveSiteUrl({ SITE_URL: "http://staging.example.com" })).toBe(
      "http://staging.example.com",
    );
  });

  it("names the offending variable when a value cannot be an origin", () => {
    expect(() => resolveSiteUrl({ SITE_URL: "not a url" })).toThrow(/SITE_URL/);
  });

  it("names RENDER_EXTERNAL_URL when that is the bad value", () => {
    expect(() =>
      resolveSiteUrl({ RENDER_EXTERNAL_URL: "not a url" }),
    ).toThrow(/RENDER_EXTERNAL_URL/);
  });
});
