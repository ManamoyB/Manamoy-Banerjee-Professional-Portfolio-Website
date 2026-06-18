import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { profile, siteConfig, socials } from "@/data/portfolio";
import { Button } from "@/components/ui";

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: Github },
  { label: "LinkedIn", href: socials.linkedin, icon: Linkedin },
  { label: "Email", href: socials.email, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="group flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-cyan-violet text-sm font-bold text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/40">
                M
              </span>
              <span>
                <span className="block font-semibold">{profile.displayName}</span>
                <span className="block text-sm text-muted-foreground">
                  {profile.location}
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
                  <Button
                    aria-label={link.label}
                    external={!link.href.startsWith("mailto:")}
                    href={link.href}
                    key={link.label}
                    size="icon"
                    variant="glass"
                  >
                    <Icon />
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Navigation</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {siteConfig.navigation.map((item) => (
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href={item.href}
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
              {profile.recruiterMessage}
            </p>
            <Button href="/contact" className="mt-5 w-fit">
              Start a conversation
              <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.displayName}. All rights reserved.
          </p>
          <p>Built for clarity, credibility, and long-term growth.</p>
        </div>
      </div>
    </footer>
  );
}
