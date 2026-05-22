import { CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { siteHighlights } from "@/lib/constants/site";

export function HighlightsSection() {
  return (
    <SectionWrapper className="py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <FadeIn>
          <p className="text-sm font-medium text-primary">Selected highlights</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            A portfolio architecture that can grow into a brand platform.
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Phase 1 establishes the public narrative, design system, routing, SEO, content
            architecture, and data foundations needed for a much larger personal brand
            product.
          </p>
        </FadeIn>
        <div className="grid gap-3">
          {siteHighlights.map((highlight, index) => (
            <FadeIn delay={index * 0.07} key={highlight}>
              <Card className="border-border/70 bg-card/75 backdrop-blur">
                <CardContent className="flex gap-4 p-5">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{highlight}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
