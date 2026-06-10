import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal">
        This page is not here.
      </h1>
      <p className="mt-4 text-muted-foreground">
        The platform is structured for growth, but this route does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
