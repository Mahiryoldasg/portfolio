import type { ExperienceEntry } from "@/types/about";

export default function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  return (
    <ol className="flex flex-col">
      {entries.map((entry) => (
        <li
          key={entry.period}
          className="grid gap-x-8 gap-y-2 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]"
        >
          <p className="font-mono text-xs text-muted">{entry.period}</p>
          <div>
            <h3 className="text-xl font-medium tracking-tight">{entry.role}</h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {entry.employer}
            </p>
            <p className="mt-3 max-w-[65ch] text-[0.95rem] leading-relaxed text-muted">
              {entry.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
