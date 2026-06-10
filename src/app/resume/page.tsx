import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioData } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";
import { isUsableExternalLink } from "@/utils/links";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description: "A web-native resume for Manamoy, AI engineer and full-stack developer.",
  path: "/resume",
});

export default async function ResumePage() {
  const { education, projects, resumeFiles, settings, skills } = await getPortfolioData();
  const primaryEducation = education[0];
  const activeResume = resumeFiles.find((resume) => resume.isActive);

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Resume"
          title={`${settings.name} / ${settings.headline}`}
          description={`${primaryEducation?.degree ?? "Computer Science"}${primaryEducation?.institution ? `, ${primaryEducation.institution}` : ""}${primaryEducation?.cgpa ? `. CGPA ${primaryEducation.cgpa}.` : "."}`}
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Snapshot</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {settings.bio}
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <p>
                  <span className="text-muted-foreground">Education:</span>{" "}
                  {primaryEducation?.degree ?? "BTech CSE"}
                </p>
                <p>
                  <span className="text-muted-foreground">Institution:</span>{" "}
                  {primaryEducation?.institution ?? "SRM University"}
                </p>
                <p>
                  <span className="text-muted-foreground">CGPA:</span>{" "}
                  {primaryEducation?.cgpa ?? "8.04"}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/contact">
                    Contact
                    <ArrowRight />
                  </Link>
                </Button>
                {isUsableExternalLink(activeResume?.fileUrl) ? (
                  <Button asChild variant="outline">
                    <a
                      href={activeResume?.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      Download resume
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <a
                      href={`mailto:${settings.email}?subject=Resume request for Manamoy`}
                    >
                      <Download />
                      Request PDF
                    </a>
                  </Button>
                )}
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
