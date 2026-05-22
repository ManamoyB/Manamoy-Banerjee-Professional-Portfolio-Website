"use client";

import { useMemo, useState } from "react";
import { Activity, Blocks, Gauge, Grid3X3 } from "lucide-react";

import type { SkillCategory } from "@/types";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SkillCard } from "@/components/common/skill-card";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillCategories, skillHeatmap, skills } from "@/lib/constants/skills";
import { cn } from "@/lib/utils";

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend");
  const activeSkills = useMemo(
    () => skills.filter((skill) => skill.category === activeCategory),
    [activeCategory],
  );
  const average = Math.round(
    activeSkills.reduce((total, skill) => total + skill.proficiency, 0) /
      activeSkills.length,
  );

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Skills matrix"
          title="A categorized view of technical capability."
          description="Explore Manamoy's current strengths across frontend, backend, AI, data, databases, DevOps, and tools."
        />
      </SectionWrapper>

      <SectionWrapper className="py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <MetricCard
            icon={Blocks}
            label="Categories"
            value={`${skillCategories.length}`}
          />
          <MetricCard icon={Activity} label="Tracked skills" value={`${skills.length}`} />
          <MetricCard icon={Gauge} label="Active average" value={`${average}%`} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-10">
        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as SkillCategory)}
          className="gap-8"
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="min-w-max">
              {skillCategories.map((category) => (
                <TabsTrigger value={category} key={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {skillCategories.map((category) => (
            <TabsContent value={category} key={category}>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <SkillCard skill={skill} key={skill.name} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionWrapper>

      <SectionWrapper className="py-16">
        <FadeIn>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="subtle">
                <Grid3X3 className="size-3" />
                Heatmap
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal">
                Skill distribution by category
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Each tile represents relative proficiency. The goal is to make strengths
              scannable without reducing the profile to a generic keyword wall.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-4 lg:grid-cols-7">
          {skillHeatmap.map((group) => (
            <Card
              className="border-cyan/20 bg-card/50 backdrop-blur hover:border-cyan/40 hover:bg-card/70 transition-all duration-300"
              key={group.category}
            >
              <CardContent className="p-5">
                <h3 className="text-sm font-bold text-foreground">{group.category}</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {group.skills.map((skill) => (
                    <div
                      className={cn(
                        "rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200",
                        skill.proficiency >= 84 &&
                          "border-cyan/50 bg-cyan/25 text-cyan hover:border-cyan/70 hover:bg-cyan/35",
                        skill.proficiency >= 74 &&
                          skill.proficiency < 84 &&
                          "border-violet/40 bg-violet/15 text-violet hover:border-violet/60 hover:bg-violet/25",
                        skill.proficiency < 74 &&
                          "border-border/50 bg-muted/40 text-muted-foreground hover:border-border hover:bg-muted/60",
                      )}
                      key={skill.name}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

type MetricCardProps = {
  icon: typeof Blocks;
  label: string;
  value: string;
};

function MetricCard({ icon: Icon, label, value }: MetricCardProps) {
  return (
    <Card className="border-cyan/20 bg-card/50 backdrop-blur hover:border-cyan/40 hover:bg-card/70 transition-all duration-300">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-cyan-violet/20 text-cyan">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="font-mono text-3xl font-bold text-foreground">{value}</p>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
