import { CapabilityGrid } from "@/components/sections/capability-grid";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { HomeHero } from "@/components/sections/home-hero";
import { CtaStrip } from "@/components/common/cta-strip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
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
