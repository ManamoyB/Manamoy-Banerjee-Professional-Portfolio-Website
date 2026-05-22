"use client";

import { useEffect } from "react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SectionWrapper className="py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-sm text-primary">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal">
          The page could not load.
        </h1>
        <p className="mt-4 text-muted-foreground">
          This is a recoverable application error. Please try again.
        </p>
        <Button className="mt-8" onClick={reset}>
          Try again
        </Button>
      </div>
    </SectionWrapper>
  );
}
