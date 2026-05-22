import type { ReactNode } from "react";

import { CinematicIntro } from "@/components/motion/cinematic-intro";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CinematicIntro />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
