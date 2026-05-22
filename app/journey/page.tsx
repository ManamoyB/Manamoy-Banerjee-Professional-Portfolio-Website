import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { TimelineCard } from "@/components/common/timeline-card";
import { journey } from "@/lib/constants/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Journey",
  description: "Manamoy's academic, AI, full-stack, and portfolio-building timeline.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Journey"
          title="A focused timeline from CSE foundations to AI product building."
          description="A compact view of the learning and project path behind Manamoy's V1 brand platform."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="mx-auto grid max-w-4xl gap-4">
          {journey.map((item) => (
            <TimelineCard
              item={{
                eyebrow: item.period,
                title: item.title,
                description: item.description,
                period: item.period,
              }}
              key={item.title}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
