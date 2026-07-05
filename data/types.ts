export interface ExperienceItem {
  slug: string;
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  images?: string[];
  tech?: string[];
  website?: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  period: string;
  description: string;
  bullets: string[];
  tech: string[];
  images?: string[];
  website?: string;
}
