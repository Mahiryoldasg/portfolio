import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import CaseStudyListItem from "../components/case-studies/CaseStudyListItem";

const PAGE_TITLE = "Case Studies";
const PAGE_DESCRIPTION =
  "Four case studies from the Kredim BNPL platform: an embeddable checkout, a member panel, a merchant panel, and a 29-module internal admin platform.";

// No `openGraph` block on purpose. Next derives og:title and og:description
// from the fields below, and any openGraph object here would replace the root
// layout's wholesale, taking the inherited opengraph-image with it.
export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">
          Case Studies
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work from five years in fintech
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Four projects from the Kredim platform, covering internal tooling,
          checkout, member-facing product, and merchant systems.
        </p>
      </div>

      <div className="mt-12 flex flex-col">
        {caseStudies.map((caseStudy) => (
          <CaseStudyListItem key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </div>
  );
}
