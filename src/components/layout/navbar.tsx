"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { navigationItems, primaryNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan/10 bg-background/40 backdrop-blur-2xl shadow-sm shadow-background/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-cyan-violet text-sm font-bold text-background group-hover:shadow-lg group-hover:shadow-cyan/40 transition-all duration-300">
            M
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-bold text-foreground">{siteConfig.name}</span>
            <span className="block text-xs text-muted-foreground">
              Computer Engineer
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-background/50 relative",
                    isActivePath(pathname, item.href) &&
                      "text-cyan bg-gradient-to-r from-cyan/10 to-transparent shadow-sm after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-cyan-violet",
                  )}
                >
                  {item.title}
                </Link>
              </TooltipTrigger>
              <TooltipContent>{item.description}</TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="gradient" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">
              <Sparkles />
              Contact
            </Link>
          </Button>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(92vw,26rem)]">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
                <SheetDescription>{siteConfig.role}</SheetDescription>
              </SheetHeader>
              <Separator />
              <nav className="grid gap-1 px-4 pb-4" aria-label="Mobile navigation">
                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        isActivePath(pathname, item.href) && "bg-muted text-foreground",
                      )}
                    >
                      <span className="block">{item.title}</span>
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
