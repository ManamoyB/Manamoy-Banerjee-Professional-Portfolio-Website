import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/common/contact-form";
import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/lib/constants/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Manamoy for AI engineering, full-stack development, data science, and internship or hiring conversations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Contact"
          title="Start a focused conversation."
          description="Use the form for hiring, project discussions, collaboration, or recruiter outreach. If Formspree is not configured, it opens an email draft."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Direct details</h2>
              <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" />
                  {profile.email}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 text-primary" />
                  {profile.location}
                </p>
              </div>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Best for AI engineering, full-stack development, data science projects,
                internships, and junior engineer opportunities.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  );
}
