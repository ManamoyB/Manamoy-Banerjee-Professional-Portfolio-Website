import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { BlogBrowser } from "@/components/sections/blog-browser";
import { getBlogs } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Technical writing from Manamoy on AI engineering, full-stack systems, projects, and career growth.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <>
      <SectionWrapper className="py-20">
        <PageHeader
          eyebrow="Technical writing"
          title="Notes on AI, full-stack building, and proof of work."
          description="Professional placeholder posts for V1, structured so future MDX articles can drop into the same content architecture."
        />
      </SectionWrapper>
      <SectionWrapper className="py-8">
        <BlogBrowser posts={posts} />
      </SectionWrapper>
    </>
  );
}
