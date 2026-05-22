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
      <SectionWrapper className="py-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              className="group h-full overflow-hidden border-border/70 bg-card/80 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              key={project.slug}
            >
              <div className="flex aspect-video items-center justify-center border-b bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.16_174/0.22),transparent_64%)]">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Screenshot placeholder
                </span>
              </div>
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="subtle">{project.category}</Badge>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                <h2 className="mt-5 text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" className="mt-6 w-fit">
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
