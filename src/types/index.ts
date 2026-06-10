import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

export type NavItem = {
  title: string;
  href: Route;
  description?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

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

export type Skill = {
  name: string;
  category: SkillCategory;
  proficiency: number;
  signal: "Core" | "Strong" | "Growing";
  description: string;
};

export type TimelineItem = {
  title: string;
  eyebrow: string;
  description: string;
  period: string;
};

export type RouteShellContent = {
  title: string;
  eyebrow: string;
  description: string;
  primaryAction?: string;
};

export type ProjectCategory =
  | "AI"
  | "Machine Learning"
  | "Deep Learning"
  | "Data Science"
  | "Data Analytics"
  | "Web Development"
  | "Cloud Computing"
  | "Cybersecurity"
  | "Research"
  | "Open Source"
  | "Database Systems"
  | "Product Concept"
  | "IoT / Automation"
  | "AI / Computer Vision";

export type PortfolioSettings = {
  id?: string;
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  codeforces?: string;
  hackerrank?: string;
  resumeUrl?: string;
  profileImage?: string;
  profileBanner?: string;
  recruiterMessage: string;
};

export type PortfolioProject = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory | string;
  status: "Built" | "Concept" | "Academic";
  techStack: string[];
  achievements: string[];
  imageUrl?: string;
  featured: boolean;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Certification = {
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  skills: string[];
  focus: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Achievement = {
  id?: string;
  title: string;
  description: string;
  organization?: string;
  date?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Education = {
  id?: string;
  institution: string;
  degree: string;
  cgpa?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Experience = {
  id?: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  body: string[];
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ResumeFile = {
  id?: string;
  title: string;
  fileUrl?: string;
  version: string;
  isActive: boolean;
  createdAt?: string;
};

export type PortfolioData = {
  settings: PortfolioSettings;
  projects: PortfolioProject[];
  certifications: Certification[];
  achievements: Achievement[];
  skills: Skill[];
  skillCategories: SkillCategory[];
  education: Education[];
  experience: Experience[];
  socialLinks: SocialLink[];
  blogs: BlogPost[];
  resumeFiles: ResumeFile[];
  journey: TimelineItem[];
  galleryItems: string[];
  values: string[];
  currentlyLearning: string[];
  funFacts: string[];
};
