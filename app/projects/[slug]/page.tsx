import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProject, projects } from "@/lib/constants/projects";
import { createMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return createMetadata({ title: "Project", path: "/projects" });
  }

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <SectionWrapper className="py-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/projects">
            <ArrowLeft />
            Back to projects
          </Link>
        </Button>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="subtle">{project.category}</Badge>
              <Badge variant="outline">{project.status}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.summary}
            </p>
          </div>
          <Card className="h-fit border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-sm font-semibold">Tech stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild variant="outline">
                  <a href={project.githubUrl}>
                    <Github />
                    GitHub placeholder
                  </a>
                </Button>
                <Button asChild>
                  <a href={project.demoUrl}>
                    <ExternalLink />
                    Demo placeholder
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {["Screenshot 01", "Screenshot 02", "Screenshot 03"].map((label) => (
            <div
              className="flex aspect-video items-center justify-center rounded-lg border bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.16_174/0.2),transparent_68%)]"
              key={label}
            >
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoBlock title="Problem" body={project.problem} />
          <InfoBlock title="Approach" body={project.description} />
          <InfoBlock title="Outcome" body={project.outcome} />
        </div>
      </SectionWrapper>
    </>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <Card className="h-full border-border/70 bg-card/80 backdrop-blur">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  );
}
