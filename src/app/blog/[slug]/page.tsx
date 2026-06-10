import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogs } from "@/lib/portfolio-data";
import { blogArticleSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogPosts = await getBlogs();

  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createMetadata({ title: "Blog", path: "/blog" });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionWrapper className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleSchema(post)) }}
      />
      <article className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft />
            Back to blog
          </Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge variant="outline" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {post.date} / {post.readingTime}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-10 space-y-6 border-t pt-10">
          {post.body.map((paragraph) => (
            <p className="text-base leading-8 text-muted-foreground" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </SectionWrapper>
  );
}
