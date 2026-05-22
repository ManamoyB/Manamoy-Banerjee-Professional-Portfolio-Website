import { SectionWrapper } from "@/components/common/section-wrapper";

export default function Loading() {
  return (
    <SectionWrapper className="py-24">
      <div className="mx-auto max-w-3xl">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-12 w-full animate-pulse rounded bg-muted" />
        <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div className="h-32 animate-pulse rounded-lg border bg-card" key={item} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
