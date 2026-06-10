"use client";

import { track } from "@vercel/analytics";

import type { AnalyticsEvent } from "@/config/analytics";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string>) {
  track(event, properties);
}
