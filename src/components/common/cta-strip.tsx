import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/common/section-wrapper";

type CtaStripProps = {
  title: string;
  description: string;
  href: Route;
  action: string;
};

export function CtaStrip({ title, description, href, action }: CtaStripProps) {
  return (
    <SectionWrapper className="py-16">
      <div className="relative overflow-hidden rounded-lg border bg-foreground px-6 py-10 text-background shadow-2xl sm:px-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,oklch(0.68_0.16_174/0.35),transparent_60%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-normal">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-background/75 sm:text-base">
              {description}
            </p>
          </div>
          <Button asChild variant="secondary" size="lg" className="w-fit">
            <Link href={href}>
              {action}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
