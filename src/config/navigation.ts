import type { NavItem } from "@/types";

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
  { title: "Admin", href: "/admin", description: "Authenticated content management" },
];

export const primaryNavItems = navigationItems.slice(0, 6);
