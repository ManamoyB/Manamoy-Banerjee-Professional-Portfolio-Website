import type { Metadata } from "next";

import { SkillsExplorer } from "@/components/sections/skills-explorer";
import { getPortfolioData } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description:
    "Explore Manamoy's categorized technical skills across frontend, backend, AI, data science, databases, DevOps, and tools.",
  path: "/skills",
});

export default async function SkillsPage() {
  const { skills, skillCategories } = await getPortfolioData();

  return <SkillsExplorer skillCategories={skillCategories} skills={skills} />;
}
