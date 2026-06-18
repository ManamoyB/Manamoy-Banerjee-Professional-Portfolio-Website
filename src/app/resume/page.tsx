import type { Metadata } from "next";

import { ResumeSections } from "@/components/sections";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "A web-native resume for Manamoy Banerjee, AI engineer, data analyst, and software developer.",
};

export default function ResumePage() {
  return <ResumeSections />;
}
