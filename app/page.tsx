import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">
        Senior Frontend Engineer
      </p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Frontend systems for fintech products people trust with their money.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        5 years building and scaling production frontends in the BNPL/fintech
        space - checkout flows, merchant tooling, and internal platforms used
        by real customers and operations teams every day.
      </p>
      <p className="mt-4 font-mono text-sm text-faint">
        next.js · typescript · react · redux · tanstack query
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/case-studies"
          className="rounded bg-accent px-5 py-3 text-sm font-medium text-accent-ink"
        >
          View case studies
        </Link>
        <Link
          href="/cv.pdf"
          className="rounded border border-border px-5 py-3 text-sm font-medium"
        >
          Download CV
        </Link>
      </div>

      <section id="contact" className="mt-20 border-t border-border pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium">Let&apos;s talk</h2>
            <p className="mt-1 text-muted">
              Open to senior frontend roles - reach out directly.
            </p>
          </div>
          <a
            href="mailto:mahiryoldas95@gmail.com"
            className="rounded border border-border px-5 py-3 text-sm font-medium"
          >
            mahiryoldas95@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
