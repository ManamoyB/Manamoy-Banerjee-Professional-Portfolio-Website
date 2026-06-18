import type { Metadata } from "next";

import { AboutSections } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Manamoy Banerjee's background, values, education, and growth as an AI-minded full-stack developer.",
};

export default function AboutPage() {
  return <AboutSections />;
}
