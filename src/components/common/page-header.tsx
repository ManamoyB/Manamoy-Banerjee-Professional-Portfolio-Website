import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <Badge variant="subtle">{eyebrow}</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}
