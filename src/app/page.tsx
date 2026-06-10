import { CapabilityGrid } from "@/components/sections/capability-grid";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { HomeHero } from "@/components/sections/home-hero";
import { CtaStrip } from "@/components/common/cta-strip";
import { getPortfolioData } from "@/lib/portfolio-data";
import { personSchema } from "@/lib/schema";

export default async function HomePage() {
  const { settings, skills } = await getPortfolioData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(settings)) }}
      />
      <HomeHero settings={settings} skills={skills} />
      <CapabilityGrid />
      <HighlightsSection />
      <CtaStrip
        title="Recruiter-ready, product-minded, and built for the long game."
        description="Explore the platform foundation, review capabilities, and use the contact path when there is a meaningful opportunity to discuss."
        href="/contact"
        action="Start a conversation"
      />
    </>
  );
}
