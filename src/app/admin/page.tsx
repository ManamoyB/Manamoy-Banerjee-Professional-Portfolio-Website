import type { Metadata } from "next";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Admin",
  description: "Authenticated portfolio content management for Manamoy.",
  path: "/admin",
});

export default function AdminPage() {
  return (
    <SectionWrapper className="py-10">
      <AdminDashboard />
    </SectionWrapper>
  );
}
