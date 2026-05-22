import type { Metadata } from "next";
import { Award } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { certifications } from "@/lib/constants/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Certifications",
  description:
    "Placeholder certification gallery for Manamoy's machine learning, full-stack, data science, and cloud learning tracks.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Credentials"
          title="A clean gallery for learning milestones."
          description="Certification placeholders are structured for V1 and ready to be replaced with verified credentials as they are published."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-5 md:grid-cols-2">
          {certifications.map((certificate) => (
            <Card
              className="border-border/70 bg-card/80 backdrop-blur"
              key={certificate.title}
            >
              <CardContent className="p-6">
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="size-5" />
                </div>
                <Badge variant="outline" className="mt-5">
                  {certificate.issuer}
                </Badge>
                <h2 className="mt-4 text-xl font-semibold">{certificate.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {certificate.focus}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
