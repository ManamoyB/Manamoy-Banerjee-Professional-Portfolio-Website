"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { BlogPost } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BlogBrowser({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) =>
      [post.title, post.excerpt, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [posts, query]);

  return (
    <div className="grid gap-5">
      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <span className="sr-only">Search blog posts</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or tag"
          className="h-11 w-full rounded-md border bg-background px-10 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      {filtered.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {filtered.map((post) => (
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
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No blog posts match that search yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
