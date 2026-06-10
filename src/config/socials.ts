import { Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";

import type { SocialLink } from "@/types";

import { siteConfig } from "@/config/site";

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
    label: "LeetCode",
    href: "",
    icon: Code2,
  },
  {
    label: "India",
    href: "/contact",
    icon: MapPin,
  },
];
