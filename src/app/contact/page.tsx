import type { Metadata } from "next";

import { ContactSections } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Manamoy Banerjee for AI engineering, full-stack development, data science, and hiring conversations.",
};

export default function ContactPage() {
  return <ContactSections />;
}
