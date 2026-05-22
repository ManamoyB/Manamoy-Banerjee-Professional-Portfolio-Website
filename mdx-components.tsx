import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn("mt-8 text-4xl font-semibold tracking-normal", className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn("mt-10 text-2xl font-semibold tracking-normal", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("mt-4 leading-7 text-muted-foreground", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("mt-4 list-disc space-y-2 pl-6", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-7 text-muted-foreground", className)} {...props} />
    ),
    ...components,
  };
}
