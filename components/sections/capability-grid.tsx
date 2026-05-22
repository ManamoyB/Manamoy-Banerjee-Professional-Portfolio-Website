import { Brain, Database, Layers3, Rocket } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    title: "AI Product Thinking",
    description:
      "Frames AI as a product capability: useful workflows, measurable outcomes, and readable user experiences.",
    icon: Brain,
  },
  {
    title: "Full-Stack Delivery",
    description:
      "Builds across interface, server logic, data modeling, and deployment paths with production constraints in mind.",
    icon: Layers3,
  },
  {
    title: "Data Fluency",
    description:
      "Turns messy data into patterns, decisions, and visual explanations that teams can act on.",
    icon: Database,
  },
  {
    title: "Launch Discipline",
    description:
      "Values performance, SEO, accessibility, maintainability, and the small details that make products credible.",
    icon: Rocket,
  },
];

export function CapabilityGrid() {
  return (
    <SectionWrapper>
      <FadeIn className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-primary">Featured capabilities</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          A builder profile shaped for modern product teams.
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          The platform is designed to show not only tools, but judgment: how Manamoy
          scopes, builds, explains, and improves technical products.
        </p>
      </FadeIn>
      <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((capability) => {
          const Icon = capability.icon;

          return (
            <StaggerItem key={capability.title}>
              <Card className="h-full border-border/70 bg-card/75 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>
  );
}
