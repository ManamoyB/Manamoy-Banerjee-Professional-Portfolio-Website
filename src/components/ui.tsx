import Link from "next/link";
import type { Route } from "next";
import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  external?: boolean;
};

const buttonVariants = {
  primary:
    "bg-gradient-cyan-violet text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-background/60 text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  glass:
    "border border-border/70 bg-card/60 text-foreground shadow-sm backdrop-blur-xl hover:border-primary/40 hover:bg-card/80",
};

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "size-10 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          className={classes}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href as Route}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Badge({
  className,
  children,
  variant = "soft",
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "soft" | "outline" | "solid";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variant === "soft" && "border border-primary/20 bg-primary/10 text-primary",
        variant === "outline" && "border border-border bg-background/60 text-foreground",
        variant === "solid" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/70 bg-card/75 shadow-sm backdrop-blur-xl transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({ className, children, id }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}
