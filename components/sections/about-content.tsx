import { BookOpen, Compass, GraduationCap, Lightbulb, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { TimelineCard } from "@/components/common/timeline-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  currentlyLearning,
  educationTimeline,
  funFacts,
  values,
} from "@/lib/constants/about";

export function AboutContent() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="About Manamoy"
          title="An AI-minded full-stack builder with product instincts."
          description="Manamoy is shaping a career around intelligent web products, clear technical communication, and the discipline to turn learning into shipped work."
        />
      </SectionWrapper>

      <SectionWrapper className="py-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <Card className="h-full border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <Badge variant="outline">Biography</Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-normal">
                  Building a career at the intersection of AI, software, and data.
                </h2>
                <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
                  <p>
                    Manamoy is a software engineer and AI-focused builder from India,
                    developing the ability to move from product ambiguity to deployed
                    systems. His work centers on full-stack applications, data-informed
                    thinking, and intelligent features that are useful in the hands of
                    real people.
                  </p>
                  <p>
                    This platform is designed as a long-term professional surface:
                    recruiter clarity today, deeper project proof tomorrow, and a content
                    system that can grow with his work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="grid gap-6">
            <FadeIn delay={0.08}>
              <Card className="border-border/70 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <Compass className="size-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">Mission</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Build intelligent products that reduce friction, improve decisions,
                    and make complex systems easier to use.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.14}>
              <Card className="border-border/70 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <Lightbulb className="size-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">Philosophy</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Great engineering profiles are built through clarity, taste, steady
                    execution, and proof that the person can keep learning while shipping.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <div className="sticky top-24">
              <GraduationCap className="size-7 text-primary" />
              <h2 className="mt-4 text-3xl font-semibold tracking-normal">
                Education and growth timeline
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                A compact view of the learning path behind the platform foundation.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4">
            {educationTimeline.map((item, index) => (
              <FadeIn delay={index * 0.06} key={item.title}>
                <TimelineCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoPanel
            icon={BookOpen}
            title="Currently learning"
            items={currentlyLearning}
          />
          <InfoPanel icon={Sparkles} title="Values" items={values} />
          <InfoPanel icon={Lightbulb} title="Fun facts" items={funFacts} />
        </div>
      </SectionWrapper>
    </>
  );
}

type InfoPanelProps = {
  icon: typeof BookOpen;
  title: string;
  items: string[];
};

function InfoPanel({ icon: Icon, title, items }: InfoPanelProps) {
  return (
    <FadeIn>
      <Card className="h-full border-border/70 bg-card/80 backdrop-blur">
        <CardContent className="p-6">
          <Icon className="size-5 text-primary" />
          <h2 className="mt-4 text-xl font-semibold">{title}</h2>
          <StaggerContainer className="mt-5 grid gap-3">
            {items.map((item) => (
              <StaggerItem
                className="rounded-md border bg-background/60 px-4 py-3 text-sm leading-6 text-muted-foreground"
                key={item}
              >
                {item}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
