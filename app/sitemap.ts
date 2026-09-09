import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

// No `lastModified`: the only honest source would be the MDX file's mtime, and
// `new Date()` would stamp every deploy with a fresh timestamp, telling crawlers
// content changed when it did not.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/case-studies",
    "/about",
    ...caseStudies.map((caseStudy) => `/case-studies/${caseStudy.slug}`),
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
