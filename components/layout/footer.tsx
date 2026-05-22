import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { navigationItems, siteConfig, socialLinks } from "@/lib/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                M
              </span>
              <span>
                <span className="block font-semibold">{siteConfig.name}</span>
                <span className="block text-sm text-muted-foreground">
                  {siteConfig.location}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Button asChild variant="outline" size="icon" key={link.label}>
                    <a href={link.href} aria-label={link.label}>
                      <Icon />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Navigation</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navigationItems.slice(0, 10).map((item) => (
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  key={item.href}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Contact</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Open to thoughtful engineering opportunities, AI product work, and
              product-minded collaborations.
            </p>
            <Button asChild className="mt-5 w-fit">
              <Link href="/contact">
                Start a conversation
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for clarity, credibility, and long-term growth.</p>
        </div>
      </div>
    </footer>
  );
}
