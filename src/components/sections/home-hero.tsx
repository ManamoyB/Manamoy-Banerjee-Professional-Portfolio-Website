import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";

import { AnimatedText } from "@/components/motion/animated-text";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSettings, Skill } from "@/types";

const heroStats = [
  { label: "Core Disciplines", value: "3", detail: "AI, full-stack, data" },
  { label: "Build Mode", value: "24/7", detail: "Learning and shipping" },
  { label: "Focus", value: "10x", detail: "Practical product impact" },
];

export function HomeHero({
  settings,
  skills,
}: {
  settings: PortfolioSettings;
  skills: Skill[];
}) {
  const featuredTechnologies = skills.slice(0, 10).map((skill) => skill.name);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-cyan/20 via-transparent to-transparent blur-3xl opacity-20" />
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-glow-violet blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-glow-cyan blur-3xl opacity-5" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <FadeIn>
            <Badge variant="subtle" className="mb-6">
              <MapPin className="size-3" />
              {settings.location}
            </Badge>
          </FadeIn>
          <h1 className="max-w-5xl text-6xl font-bold tracking-tight text-balance sm:text-7xl lg:text-8xl leading-none">
            <AnimatedText text="Building intelligent products with" />{" "}
            <span className="bg-gradient-cyan-violet bg-clip-text text-transparent">
              full-stack precision
            </span>
            <AnimatedText text="." />
          </h1>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {settings.name} is an {settings.headline.toLowerCase()} focused on turning
              complex ideas into clean, useful, production-ready digital systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="gradient">
                <Link href="/projects">
                  View work
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link href="/resume">
                  <Download />
                  Resume
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                {settings.github ? (
                  <a href={settings.github} target="_blank" rel="noopener noreferrer">
                    <ArrowRight />
                    View Code
                  </a>
                ) : (
                  <Link href="/contact">
                    <ArrowRight />
                    View Code
                  </Link>
                )}
              </Button>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="border-cyan/20 bg-card/50 backdrop-blur-xl hover:border-cyan/40 hover:bg-card/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <p className="font-mono text-3xl font-bold text-cyan">{stat.value}</p>
                    <p className="mt-2 text-sm font-semibold">{stat.label}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.15} className="relative">
          <div className="absolute -inset-12 -z-10 rounded-[2rem] bg-gradient-cyan-violet opacity-20 blur-3xl" />
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border border-cyan/30 bg-card/50 p-1 shadow-2xl shadow-cyan/20 backdrop-blur-xl hover:border-cyan/60 hover:shadow-cyan/30 transition-all duration-300">
            <div className="relative rounded-[1.3rem] overflow-hidden">
              <Image
                src="/profile-placeholder.svg"
                alt="Stylized profile placeholder for Manamoy"
                width={720}
                height={720}
                priority
                className="aspect-square rounded-[1.3rem] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-[1.3rem]" />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/20 bg-background/60 p-4 shadow-xl backdrop-blur-2xl">
              <p className="text-sm font-bold text-foreground">{settings.name}</p>
              <p className="mt-1 text-xs text-muted-foreground font-medium">
                {settings.headline}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.35} className="mx-auto mt-20 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {featuredTechnologies.map((technology) => (
            <span
              className="rounded-full border border-cyan/30 bg-card/50 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur hover:border-cyan/60 hover:bg-card/70 transition-all duration-200 cursor-default"
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
