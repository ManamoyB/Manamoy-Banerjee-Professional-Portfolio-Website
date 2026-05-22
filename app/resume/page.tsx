import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/constants/projects";
import { profile } from "@/lib/constants/profile";
import { skills } from "@/lib/constants/skills";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description: "A web-native resume for Manamoy, AI engineer and full-stack developer.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Resume"
          title={`${profile.name} / ${profile.role}`}
          description={`${profile.education.degree}, ${profile.education.institution}. CGPA ${profile.education.cgpa}.`}
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Snapshot</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {profile.summary}
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <p>
                  <span className="text-muted-foreground">Education:</span>{" "}
                  {profile.education.degree}
                </p>
                <p>
                  <span className="text-muted-foreground">Institution:</span>{" "}
                  {profile.education.institution}
                </p>
                <p>
                  <span className="text-muted-foreground">CGPA:</span>{" "}
                  {profile.education.cgpa}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/contact">
                    Contact
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={`mailto:${profile.email}?subject=Resume request for Manamoy`}>
                    <Download />
                    Request PDF
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            <Card className="border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Core skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.slice(0, 16).map((skill) => (
                    <Badge variant="outline" key={skill.name}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Selected projects</h2>
                <div className="mt-4 grid gap-4">
                  {projects.slice(0, 3).map((project) => (
                    <Link
                      className="rounded-lg border p-4 transition-colors hover:bg-muted/60"
                      href={`/projects/${project.slug}` as Route}
                      key={project.slug}
                    >
                      <p className="font-semibold">{project.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
