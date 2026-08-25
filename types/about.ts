export interface SkillGroup {
  name: string;
  skills: string[];
}

// `period` is one preformatted string rather than a start/end pair: the source
// facts mix granularity (employment is known to the month, title changes only
// to the year) and nothing on this page does date arithmetic.
export interface ExperienceEntry {
  role: string;
  employer: string;
  period: string;
  description: string;
}

export interface EducationEntry {
  institution: string;
  credential: string;
  period: string;
}
