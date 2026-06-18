import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { projects } from "@/data/portfolio";
import { Badge, Button, Card, Section } from "@/components/ui";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function hasUsefulUrl(value?: string) {
  return Boolean(value && value !== "https://github.com/" && value.trim().length > 0);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Section className="py-16">
        <Button href="/projects" variant="ghost" className="mb-8">
          <ArrowLeft />
          Back to projects
        </Button>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              <Badge variant="outline">{project.status}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.summary}
            </p>
          </div>
          <Card className="h-fit p-5">
            <p className="text-sm font-semibold">Tech stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span className="rounded-md bg-muted px-2.5 py-1 text-xs" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {hasUsefulUrl(project.githubUrl) ? (
                <Button href={project.githubUrl} external variant="outline">
                  <Github />
                  GitHub
                </Button>
              ) : (
                <Button disabled variant="outline">
                  <Github />
                  Code coming soon
                </Button>
              )}
              {hasUsefulUrl(project.liveUrl) ? (
                <Button href={project.liveUrl} external>
                  <ExternalLink />
                  Live demo
                </Button>
              ) : (
                <Button disabled>
                  <ExternalLink />
                  Demo coming soon
                </Button>
              )}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {["Screenshot 01", "Screenshot 02", "Screenshot 03"].map((label) => (
            <div
              className="flex aspect-video items-center justify-center rounded-lg border border-border bg-muted"
              key={label}
            >
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoBlock title="Problem" body={project.problem} />
          <InfoBlock title="Approach" body={project.description} />
          <InfoBlock title="Outcome" body={project.outcome} />
        </div>
      </Section>

      <Section className="py-8">
        <div className="flex justify-center">
          <Link
            className="text-sm font-semibold text-primary transition-colors hover:text-foreground"
            href="/projects"
          >
            View all projects
          </Link>
        </div>
      </Section>
    </>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <Card className="h-full p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
    </Card>
  );
}
