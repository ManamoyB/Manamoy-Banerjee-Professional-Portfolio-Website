import type { Metadata } from "next";

import { SkillsExplorer } from "@/components/sections/skills-explorer";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description:
    "Explore Manamoy's categorized technical skills across frontend, backend, AI, data science, databases, DevOps, and tools.",
  path: "/skills",
});

export default function SkillsPage() {
  return <SkillsExplorer />;
}
