// Frontmatter only. The narrative (problem, architecture, decisions, outcome)
// and its images live in the MDX body, not here.
export interface CaseStudy {
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
  role: string;
  timeline: string;
}
