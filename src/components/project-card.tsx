import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import type { Project } from "@/types";
import { Badge, Button, Card } from "@/components/ui";

function hasUsefulUrl(value?: string) {
  return Boolean(value && value !== "https://github.com/" && value.trim().length > 0);
}

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <Card className="group h-full overflow-hidden hover:border-primary/40 hover:bg-card/90">
      <div className="flex h-full flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.category}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <Link href={`/projects/${project.slug}`} className="mt-5 block">
          <h3 className="text-xl font-semibold tracking-normal transition-colors group-hover:text-primary">
            {project.title}
          </h3>
        </Link>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.summary}</p>
        {!compact && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <Button href={`/projects/${project.slug}`} variant="glass" size="sm">
            Details
            <ArrowUpRight />
          </Button>
          {hasUsefulUrl(project.githubUrl) && (
            <Button href={project.githubUrl} external variant="outline" size="sm">
              <Github />
              Code
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
