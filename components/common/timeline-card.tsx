import type { TimelineItem } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <Card className="relative overflow-hidden border-border/70 bg-card/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="outline">{item.eyebrow}</Badge>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
          </div>
          <span className="rounded-md bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            {item.period}
          </span>
        </div>
        <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}
