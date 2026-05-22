import type { Metadata } from "next";
import { Trophy } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { achievements } from "@/lib/constants/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Achievements",
  description:
    "Academic, project, and professional positioning achievements for Manamoy's portfolio V1.",
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Achievements"
          title="Signals of progress, consistency, and builder momentum."
          description="A concise achievement section for V1, designed to become a verified results archive over time."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="mx-auto grid max-w-4xl gap-4">
          {achievements.map((achievement) => (
            <Card className="border-border/70 bg-card/80 backdrop-blur" key={achievement}>
              <CardContent className="flex gap-4 p-5">
                <Trophy className="mt-1 size-5 shrink-0 text-primary" />
                <p className="leading-7 text-muted-foreground">{achievement}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
