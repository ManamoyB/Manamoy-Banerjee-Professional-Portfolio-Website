import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

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
  title: "Recruiter",
  description:
    "Recruiter quick-view for Manamoy: bio, skills summary, best projects, resume CTA, and contact CTA.",
  path: "/recruiter",
});

export default function RecruiterPage() {
  const coreSkills = skills.filter((skill) => skill.signal === "Core").slice(0, 8);

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Recruiter quick-view"
          title="AI-minded full-stack developer ready to grow with product teams."
          description={`${profile.name} is a ${profile.education.degree} student from ${profile.education.institution} with a CGPA of ${profile.education.cgpa}, focused on AI, full-stack development, and data science.`}
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <BriefcaseBusiness className="size-6 text-primary" />
              <h2 className="mt-5 text-xl font-semibold">Quick bio</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {profile.summary} Strong fit for teams looking for a junior builder who
                can learn quickly, communicate clearly, and connect AI concepts with
                usable product interfaces.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/resume">
                    View resume
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Manamoy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            <Card className="border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Skills summary</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <Badge variant="subtle" key={skill.name}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Best projects</h2>
                <div className="mt-4 grid gap-3">
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
