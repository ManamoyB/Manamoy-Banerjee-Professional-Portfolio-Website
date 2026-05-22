import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/constants/blog";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Technical writing from Manamoy on AI engineering, full-stack systems, projects, and career growth.",
  path: "/blog",
});

export default function BlogPage() {
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
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              className="h-full border-border/70 bg-card/80 backdrop-blur"
              key={post.slug}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge variant="outline" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="mt-5 font-mono text-xs text-muted-foreground">
                  {post.date} / {post.readingTime}
                </p>
                <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {post.excerpt}
                </p>
                <Button asChild variant="outline" className="mt-6 w-fit">
                  <Link href={`/blog/${post.slug}` as Route}>
                    Read post
                    <ArrowRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
