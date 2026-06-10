"use client";

import { Award, Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { Certification } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function CertificationsBrowser({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return certifications.filter((certificate) =>
      [certificate.title, certificate.issuer, certificate.focus]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [certifications, query]);

  return (
    <div className="grid gap-5">
      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <span className="sr-only">Search certifications</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or issuer"
          className="h-11 w-full rounded-md border bg-background px-10 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((certificate) => (
            <Card className="border-border/70 bg-card/80 backdrop-blur" key={certificate.title}>
              <CardContent className="p-6">
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="size-5" />
                </div>
                <Badge variant="outline" className="mt-5">
                  {certificate.issuer}
                </Badge>
                <h2 className="mt-4 text-xl font-semibold">{certificate.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {certificate.focus}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No certifications match that search yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
