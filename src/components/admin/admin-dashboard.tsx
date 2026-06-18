import Link from "next/link";
import { ExternalLink, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AdminDashboard() {
  return (
    <Card className="mx-auto max-w-3xl border-border/70 bg-card/80 backdrop-blur">
      <CardContent className="p-8">
        <FileSpreadsheet className="size-8 text-primary" />
        <h1 className="mt-5 text-3xl font-semibold">
          Content is currently managed through Google Sheets.
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The portfolio content source has been simplified to a read-only Google
          Sheets integration. Update projects, certifications, achievements, skills,
          social links, and portfolio settings directly in the configured sheet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">Review public content</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Setup support
              <ExternalLink />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
