import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { galleryItems } from "@/lib/constants/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "A placeholder media gallery for Manamoy's projects, demos, and visual proof of work.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Media"
          title="Visual proof-of-work placeholders for demos and project assets."
          description="The gallery is ready for future screenshots, walkthroughs, diagrams, and product visuals."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Card
              className="overflow-hidden border-border/70 bg-card/80 backdrop-blur"
              key={item}
            >
              <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.16_174/0.24),transparent_66%)]">
                <ImageIcon className="size-8 text-primary" />
              </div>
              <CardContent className="p-5">
                <h2 className="font-semibold">{item}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Media placeholder ready for a future screenshot or demo asset.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
