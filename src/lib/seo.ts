import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: MetadataInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} personal brand platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
