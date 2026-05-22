import type { Metadata } from "next";

import { AboutContent } from "@/components/sections/about-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about Manamoy's background, mission, values, philosophy, and growth as an AI-minded full-stack developer.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
