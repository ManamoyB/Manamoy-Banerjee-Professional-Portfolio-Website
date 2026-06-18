import type { TimelineItem } from "@/types";
import { Card } from "@/components/ui";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative grid gap-4 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border sm:before:left-5">
      {items.map((item) => (
        <div className="relative pl-12 sm:pl-16" key={item.title}>
          <span className="absolute left-2.5 top-6 size-3 rounded-full bg-primary shadow-glow-cyan sm:left-3.5" />
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {item.eyebrow}
            </p>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.description}
            </p>
          </Card>
        </div>
      ))}
    </div>
  );
}
