import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { ProjectsBrowser } from "@/components/sections/projects-browser";
import { getProjects } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore Manamoy's AI, machine learning, database, browser extension, and automation project showcase.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Project showcase"
          title="Practical builds across AI, data, web, and automation."
          description="A recruiter-friendly view of Manamoy's best project directions, each framed by problem, implementation, stack, and outcome."
        />
      </SectionWrapper>
      <SectionWrapper className="py-10">
        <ProjectsBrowser projects={projects} />
      </SectionWrapper>
    </>
  );
}
