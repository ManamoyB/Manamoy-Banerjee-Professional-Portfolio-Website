"use client";

import { motion } from "framer-motion";

import type { Skill } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full border-border/70 bg-card/80 backdrop-blur">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {skill.description}
              </p>
            </div>
            <Badge variant={skill.signal === "Core" ? "subtle" : "outline"}>
              {skill.signal}
            </Badge>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Proficiency</span>
              <span className="font-mono text-foreground">{skill.proficiency}%</span>
            </div>
            <Progress value={skill.proficiency} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
