const FALLBACK_ORIGIN = "http://localhost:3000";

// A value typed into a hosting dashboard is as likely to be "example.com" as a
// full origin, and `new URL()` rejects the bare host with a TypeError naming
// neither the variable it came from nor the file that threw.
function normalizeOrigin(value: string, source: string): string {
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;

  // Callers append paths as `${SITE_URL}${path}`, so a typed trailing slash
  // would produce `https://site.com//about`.
  const origin = withScheme.replace(/\/+$/, "");

  if (!URL.canParse(origin)) {
    throw new Error(
      `${source} is not a valid origin: "${value}". Expected a value like https://example.com`,
    );
  }

  return origin;
}

// Only the two vars this reads, not the whole `NodeJS.ProcessEnv`: Next declares
// NODE_ENV as required there, which a caller passing a couple of values cannot
// satisfy. The index signature is what keeps `process.env` itself assignable.
interface SiteUrlEnv {
  SITE_URL?: string;
  RENDER_EXTERNAL_URL?: string;
  [key: string]: string | undefined;
}

// Read during `next build`, not just at runtime: the metadata objects,
// `sitemap.ts` and `robots.ts` are all evaluated at build time, so a deploy that
// sets the origin only in the runtime environment ships localhost URLs.
//
// RENDER_EXTERNAL_URL is Render's own URL for the service, supplied at build
// time too, so a first deploy is correct before anyone opens the dashboard.
// SITE_URL outranks it so a custom domain can override it later.
export function resolveSiteUrl(env: SiteUrlEnv = process.env): string {
  // Ordered by precedence. An env var that exists but was left empty arrives as
  // "", which `??` would accept and turn into a protocol-relative URL, so blank
  // means unset. The name travels with the value to make an error attributable.
  const candidates: Array<[string, string | undefined]> = [
    ["SITE_URL", env.SITE_URL],
    ["RENDER_EXTERNAL_URL", env.RENDER_EXTERNAL_URL],
  ];

  for (const [source, raw] of candidates) {
    const value = raw?.trim();
    if (value) return normalizeOrigin(value, source);
  }

  return FALLBACK_ORIGIN;
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Mahir Yoldaş Gazeloğlu";
export const SITE_ROLE = "Senior Frontend Engineer";
export const SITE_TITLE = `${SITE_NAME} - ${SITE_ROLE}`;
export const SITE_DESCRIPTION =
  "Portfolio and case studies from five years building production frontends in fintech.";
