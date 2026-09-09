import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import OgCard from "@/app/components/og/OgCard";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// An image route is its own route handler: it does not inherit the page's
// static params, and without these it is rendered on demand instead of at build.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  // Unreachable while `dynamicParams = false` on the page route, but the lookup
  // is still typed as optional, and this matches what the page itself does.
  if (!caseStudy) notFound();

  return new ImageResponse(
    (
      <OgCard
        eyebrow="CASE STUDY"
        headline={caseStudy.title}
        lede={caseStudy.summary}
        footerLeft={caseStudy.role}
        footerRight={caseStudy.timeline}
      />
    ),
    size,
  );
}
