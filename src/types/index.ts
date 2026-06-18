export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Python"
  | "C++"
  | "AI/ML"
  | "Data Science"
  | "Databases"
  | "Tools"
  | "Cloud Basics";

export type SkillSignal = "Core" | "Strong" | "Growing";

export type Skill = {
  name: string;
  category: SkillCategory;
  proficiency: number;
  signal: SkillSignal;
  description: string;
};

export type ProjectStatus = "Built" | "Concept" | "Academic";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  outcome: string;
  category: string;
  status: ProjectStatus;
  techStack: string[];
  achievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export type Certification = {
  title: string;
  issuer: string;
  focus: string;
  skills: string[];
  credentialUrl?: string;
};

export type Achievement = {
  title: string;
  description: string;
  organization?: string;
};

export type TimelineItem = {
  title: string;
  period: string;
  eyebrow: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  cgpa?: string;
  description: string;
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
};

export type Profile = {
  name: string;
  displayName: string;
  headline: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  recruiterMessage: string;
  resumeUrl?: string;
};

export type Socials = {
  github: string;
  linkedin: string;
  email: string;
  leetcode?: string;
  codeforces?: string;
  hackerrank?: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  navigation: Array<{
    title: string;
    href: "/" | "/about" | "/projects" | "/resume" | "/contact";
    description: string;
  }>;
};
