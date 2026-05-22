import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";

import { AnimatedText } from "@/components/motion/animated-text";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredTechnologies, heroStats, siteConfig } from "@/lib/constants/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,oklch(0.68_0.16_174/0.06),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <FadeIn>
            <Badge variant="subtle" className="mb-6">
              <MapPin className="size-3" />
              {siteConfig.location}
            </Badge>
          </FadeIn>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
            <AnimatedText text="Building intelligent products with full-stack precision." />
          </h1>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteConfig.name} is an {siteConfig.role.toLowerCase()} focused on turning
              complex ideas into clean, useful, production-ready digital systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="premium">
                <Link href="/projects">
                  View work
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/resume">
                  <Download />
                  Resume
                </Link>
              </Button>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="border-border/70 bg-card/75 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <p className="font-mono text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium">{stat.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.15} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.16_174/0.28),transparent_62%)]" />
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border bg-card/80 p-3 shadow-2xl shadow-foreground/10 backdrop-blur">
            <Image
              src="/profile-placeholder.svg"
              alt="Stylized profile placeholder for Manamoy"
              width={720}
              height={720}
              priority
              className="aspect-square rounded-[1.1rem] object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-lg border border-white/15 bg-background/80 p-4 shadow-lg backdrop-blur-xl">
              <p className="text-sm font-semibold">{siteConfig.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{siteConfig.role}</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.35} className="mx-auto mt-16 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {featuredTechnologies.map((technology) => (
            <span
              className="rounded-md border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
