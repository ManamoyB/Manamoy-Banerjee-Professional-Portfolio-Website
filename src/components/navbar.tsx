"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { profile, siteConfig } from "@/data/portfolio";
import { Button, cn } from "@/components/ui";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = stored ? stored === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/10 bg-background/55 shadow-sm shadow-background/10 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-cyan-violet text-sm font-bold text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/40">
            M
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-bold">{profile.displayName}</span>
            <span className="block text-xs text-muted-foreground">{profile.role}</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-background/60 hover:text-foreground",
                isActivePath(pathname, item.href) &&
                  "bg-primary/10 text-primary after:absolute after:inset-x-2 after:-bottom-[13px] after:h-0.5 after:bg-gradient-cyan-violet",
              )}
              href={item.href}
              key={item.href}
              title={item.description}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Sparkles />
            Contact
          </Button>
          <Button
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            onClick={toggleTheme}
            size="icon"
            variant="outline"
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            size="icon"
            variant="outline"
            className="lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {siteConfig.navigation.map((item) => (
              <Link
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActivePath(pathname, item.href) && "bg-muted text-foreground",
                )}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <span className="block">{item.title}</span>
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
