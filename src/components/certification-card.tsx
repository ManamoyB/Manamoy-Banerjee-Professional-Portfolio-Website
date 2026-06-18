import { Award } from "lucide-react";

import type { Certification } from "@/types";
import { Badge, Card } from "@/components/ui";

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <Card className="h-full p-6 hover:border-primary/40 hover:bg-card/90">
      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Award className="size-5" />
      </div>
      <p className="mt-5 text-sm font-semibold text-primary">{certification.issuer}</p>
      <h3 className="mt-2 text-lg font-semibold">{certification.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {certification.focus}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {certification.skills.map((skill) => (
          <Badge variant="outline" key={skill}>
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
