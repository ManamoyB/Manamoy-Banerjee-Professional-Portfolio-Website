import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { CertificationsBrowser } from "@/components/sections/certifications-browser";
import { getPortfolioData } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Certifications",
  description:
    "Placeholder certification gallery for Manamoy's machine learning, full-stack, data science, and cloud learning tracks.",
  path: "/certifications",
});

export default async function CertificationsPage() {
  const { certifications } = await getPortfolioData();

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Credentials"
          title="A clean gallery for learning milestones."
          description="Certification placeholders are structured for V1 and ready to be replaced with verified credentials as they are published."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <CertificationsBrowser certifications={certifications} />
      </SectionWrapper>
    </>
  );
}
