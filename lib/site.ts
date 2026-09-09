// Read during `next build`, not just at runtime: the metadata objects,
// `sitemap.ts` and `robots.ts` are all evaluated at build time, so a deploy that
// sets SITE_URL only in the runtime environment ships localhost URLs.
export const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Mahir Yoldaş Gazeloğlu";
export const SITE_ROLE = "Senior Frontend Engineer";
export const SITE_TITLE = `${SITE_NAME} - ${SITE_ROLE}`;
export const SITE_DESCRIPTION =
  "Portfolio and case studies from five years building production frontends in fintech.";
