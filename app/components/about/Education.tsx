import type { EducationEntry } from "@/types/about";

export default function Education({
  entries,
}: {
  entries: EducationEntry[];
}) {
  return (
    <ol className="flex flex-col">
      {entries.map((entry) => (
        <li
          key={entry.period}
          className="grid gap-x-8 gap-y-1 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]"
        >
          <p className="font-mono text-xs text-muted">{entry.period}</p>
          <div>
            <h3 className="text-[0.95rem] font-medium tracking-tight">
              {entry.credential}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {entry.institution}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
