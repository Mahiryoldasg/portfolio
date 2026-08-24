import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

// Every case study is known at build time, so an unlisted slug is a 404 rather
// than a runtime lookup.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} - Mahir Yoldaş`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  return (
    <div className="py-16 sm:py-24">
      <Link
        href="/case-studies"
        className="inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; All case studies
      </Link>

      <div className="mt-6 max-w-[65ch]">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">
          Case Study
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {caseStudy.title}
        </h1>
      </div>

      <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-border py-4 text-sm">
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
            Role
          </dt>
          <dd className="mt-1">{caseStudy.role}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
            Timeline
          </dt>
          <dd className="mt-1">{caseStudy.timeline}</dd>
        </div>
        <div className="sm:ml-auto">
          <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
            Stack
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5 font-mono text-xs">
            {caseStudy.techStack.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded bg-accent-subtle px-1.5 py-0.5 text-accent"
              >
                {tag}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <article className="mt-12 max-w-[65ch]">
        <Body />
      </article>
    </div>
  );
}
