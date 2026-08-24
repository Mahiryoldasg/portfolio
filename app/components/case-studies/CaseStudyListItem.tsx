import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";

export default function CaseStudyListItem({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="grid gap-3 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-start"
    >
      <div>
        <p className="font-mono text-xs text-faint">{caseStudy.role}</p>
        <p className="mt-2 text-xl font-medium tracking-tight">
          {caseStudy.title}
        </p>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
          {caseStudy.summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 font-mono text-xs sm:max-w-48 sm:justify-end">
        {caseStudy.techStack.map((tag) => (
          <span
            key={tag}
            className="whitespace-nowrap rounded bg-accent-subtle px-1.5 py-0.5 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
