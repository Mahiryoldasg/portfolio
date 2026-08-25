import { bio, education, experience, skillGroups } from "@/lib/about";
import SkillGroupCard from "../components/about/SkillGroupCard";
import ExperienceTimeline from "../components/about/ExperienceTimeline";
import Education from "../components/about/Education";
import CvDownloadLink from "../components/cv/CvDownloadLink";

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">
          About
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          The five years behind the case studies
        </h1>
      </div>

      <div className="mt-6 max-w-[65ch] space-y-4 text-muted">
        {bio.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed first:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <CvDownloadLink className="inline-block" />
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-accent">
          Skills
        </h2>
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillGroupCard key={group.name} group={group} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-accent">
          Experience
        </h2>
        <div className="mt-8">
          <ExperienceTimeline entries={experience} />
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-accent">
          Education
        </h2>
        <div className="mt-8">
          <Education entries={education} />
        </div>
      </section>
    </div>
  );
}
