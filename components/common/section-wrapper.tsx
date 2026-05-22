import * as React from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = React.ComponentProps<"section"> & {
  innerClassName?: string;
};

export function SectionWrapper({
  className,
  innerClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn("px-4 py-20 sm:px-6 lg:px-8", className)} {...props}>
      <div className={cn("mx-auto w-full max-w-7xl", innerClassName)}>{children}</div>
    </section>
  );
}
