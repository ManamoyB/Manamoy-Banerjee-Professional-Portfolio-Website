import { Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";

import type { SocialLink } from "@/types";

import { siteConfig } from "@/config/site";

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "LeetCode",
    href: siteConfig.leetcode,
    icon: Code2,
  },
  {
    label: "India",
    href: "/contact",
    icon: MapPin,
  },
];
