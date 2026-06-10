import type { Metadata } from "next";

import { AboutContent } from "@/components/sections/about-content";
import { getPortfolioData } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about Manamoy's background, mission, values, philosophy, and growth as an AI-minded full-stack developer.",
  path: "/about",
});

export default async function AboutPage() {
  const { currentlyLearning, education, funFacts, settings, values } =
    await getPortfolioData();

  return (
    <AboutContent
      currentlyLearning={currentlyLearning}
      education={education}
      funFacts={funFacts}
      settings={settings}
      values={values}
    />
  );
}
