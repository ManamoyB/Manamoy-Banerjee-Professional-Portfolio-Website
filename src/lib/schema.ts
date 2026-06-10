import { siteConfig } from "@/config/site";
import type { BlogPost, PortfolioProject, PortfolioSettings } from "@/types";

export function personSchema(settings: PortfolioSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    jobTitle: settings.headline,
    email: settings.email,
    address: settings.location,
    url: siteConfig.url,
    sameAs: [settings.github, settings.linkedin].filter(Boolean),
  };
}

export function projectSchema(project: PortfolioProject) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    keywords: project.techStack.join(", "),
    url: `${siteConfig.url}/projects/${project.slug}`,
  };
}

export function blogArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt ?? post.date,
    keywords: post.tags.join(", "),
    url: `${siteConfig.url}/blog/${post.slug}`,
  };
}
