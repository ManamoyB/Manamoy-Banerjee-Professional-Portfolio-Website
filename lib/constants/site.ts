import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Manamoy",
  role: "AI Engineer | Full Stack Developer | Data Science Enthusiast",
  location: "India",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "A premium personal branding platform for Manamoy, an AI engineer and full-stack product builder focused on useful intelligent systems.",
  email: "hello@manamoy.dev",
  keywords: [
    "Manamoy",
    "AI Engineer",
    "Full Stack Developer",
    "Data Science",
    "Product Builder",
    "India",
    "Next.js",
    "Machine Learning",
  ],
};

export const navigationItems: NavItem[] = [
  { title: "Home", href: "/", description: "Brand overview and highlights" },
  { title: "About", href: "/about", description: "Biography, mission, values" },
  { title: "Skills", href: "/skills", description: "Technical capability map" },
  { title: "Projects", href: "/projects", description: "Selected product work" },
  {
    title: "Certifications",
    href: "/certifications",
    description: "Credentials and learning milestones",
  },
  { title: "Blog", href: "/blog", description: "Essays and engineering notes" },
  { title: "Journey", href: "/journey", description: "Career and learning arc" },
  { title: "Gallery", href: "/gallery", description: "Visual proof of work" },
  {
    title: "Achievements",
    href: "/achievements",
    description: "Awards, outcomes, and recognition",
  },
  { title: "Recruiter", href: "/recruiter", description: "Hiring-ready snapshot" },
  { title: "Resume", href: "/resume", description: "Resume and role fit" },
  { title: "Contact", href: "/contact", description: "Start a conversation" },
];

export const primaryNavItems = navigationItems.slice(0, 6);

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ManamoyB",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manamoyb/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "India",
    href: "/contact",
    icon: MapPin,
  },
];

export const heroStats = [
  { label: "Core Disciplines", value: "3", detail: "AI, full-stack, data" },
  { label: "Build Mode", value: "24/7", detail: "Learning and shipping" },
  { label: "Focus", value: "10x", detail: "Practical product impact" },
];

export const featuredTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "TensorFlow",
  "Scikit-learn",
  "Docker",
  "Vercel",
  "Tailwind CSS",
];

export const siteHighlights = [
  "Transforms ambiguous product ideas into useful, measurable systems.",
  "Comfortable across frontend craft, backend architecture, AI workflows, and data storytelling.",
  "Optimizes for recruiter clarity: proof of skill, credible trajectory, and clean presentation.",
];
