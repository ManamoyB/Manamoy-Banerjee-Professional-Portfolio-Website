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
