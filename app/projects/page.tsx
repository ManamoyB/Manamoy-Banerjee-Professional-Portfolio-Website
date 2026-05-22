import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/constants/projects";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore Manamoy's AI, machine learning, database, browser extension, and automation project showcase.",
  path: "/projects",
});

export default function ProjectsPage() {
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              className="group h-full overflow-hidden border-cyan/20 bg-card/50 backdrop-blur transition-all duration-300 hover:border-cyan/40 hover:bg-card/70 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan/20"
              key={project.slug}
            >
              <div className="flex aspect-video items-center justify-center border-b border-cyan/10 bg-gradient-to-br from-cyan/10 via-transparent to-violet/5 group-hover:from-cyan/15 transition-colors duration-300">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Screenshot placeholder
                </span>
              </div>
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="subtle" className="border-cyan/30 bg-cyan/10 text-cyan">{project.category}</Badge>
                  <Badge variant="outline" className="border-violet/30">{project.status}</Badge>
                </div>
                <h2 className="mt-5 text-xl font-bold leading-tight">{project.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 text-xs font-medium text-muted-foreground hover:border-cyan/40 hover:bg-cyan/10 transition-colors duration-200"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button asChild variant="gradient" className="mt-6 w-fit" size="sm">
                  <Link href={`/projects/${project.slug}` as Route}>
                    View case study
                    <ArrowRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
