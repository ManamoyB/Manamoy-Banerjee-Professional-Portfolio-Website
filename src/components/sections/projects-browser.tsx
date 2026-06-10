"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { projectCategories } from "@/config/project-categories";
import type { PortfolioProject } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProjectsBrowserProps = {
  projects: PortfolioProject[];
};

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const searchable = [
        project.title,
        project.category,
        project.summary,
        ...project.techStack,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [category, projects, query]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-lg border bg-card/70 p-4 md:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <span className="sr-only">Search projects</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, technology, or category"
            className="h-11 w-full rounded-md border bg-background px-10 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          aria-label="Filter projects by category"
        >
          <option>All</option>
          {projectCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              className="group h-full overflow-hidden border-brand/20 bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
              key={project.slug}
            >
              <div className="flex aspect-video items-center justify-center border-b border-border bg-muted">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {project.imageUrl ? "Project image" : "Screenshot placeholder"}
                </span>
              </div>
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="subtle">{project.category}</Badge>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                <h2 className="mt-5 text-xl font-bold leading-tight">{project.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
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
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No projects match that search yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
