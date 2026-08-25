import type { SkillGroup } from "@/types/about";

export default function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div>
      <h3 className="text-sm font-medium tracking-tight">{group.name}</h3>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
        {group.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
