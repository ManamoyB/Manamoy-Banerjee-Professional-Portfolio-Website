import type { Metadata } from "next";

import { ProjectsSections } from "@/components/sections";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Manamoy Banerjee's AI, machine learning, database, browser extension, and automation project showcase.",
};

export default function ProjectsPage() {
  return <ProjectsSections />;
}
