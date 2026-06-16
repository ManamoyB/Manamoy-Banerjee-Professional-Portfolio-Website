import { unstable_cache } from "next/cache";
import { Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { googleSheetsConfig } from "@/config/content";
import { fallbackData } from "@/data/fallbackData";
import type {
  Achievement,
  Certification,
  PortfolioProject,
  PortfolioSettings,
  Skill,
  SocialLink,
} from "@/types";

type Row = Record<string, unknown>;

type SheetsPayload = {
  portfolio_settings?: Row[];
  projects?: Row[];
  certifications?: Row[];
  achievements?: Row[];
  skills?: Row[];
  social_links?: Row[];
};

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "yes", "1"].includes(normalized)) {
      return true;
    }
    if (["false", "no", "0"].includes(normalized)) {
      return false;
    }
  }

  return fallback;
}

function asArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

const iconByPlatform = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  leetcode: Code2,
  india: MapPin,
  location: MapPin,
} as const;

function getSocialIcon(label: string) {
  const normalized = label.trim().toLowerCase() as keyof typeof iconByPlatform;
  return iconByPlatform[normalized] ?? Github;
}

async function fetchSheetsPayload(): Promise<SheetsPayload | null> {
  if (!googleSheetsConfig.endpoint) {
    return null;
  }

  try {
    const url = new URL(googleSheetsConfig.endpoint);
    if (googleSheetsConfig.apiKey) {
      url.searchParams.set("key", googleSheetsConfig.apiKey);
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: googleSheetsConfig.revalidateSeconds },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as SheetsPayload;
  } catch {
    return null;
  }
}

const getCachedSheetsPayload = unstable_cache(
  async () => fetchSheetsPayload(),
  ["google-sheets-content"],
  { revalidate: googleSheetsConfig.revalidateSeconds },
);

function mapPortfolioSettings(rows?: Row[]): PortfolioSettings {
  const columns = googleSheetsConfig.columns.portfolioSettings;
  const row = rows?.[0];

  if (!row) {
    return fallbackData.settings;
  }

  return {
    name: asString(row[columns.name], fallbackData.settings.name),
    headline: asString(row[columns.headline], fallbackData.settings.headline),
    bio: asString(row[columns.bio], fallbackData.settings.bio),
    email: asString(row[columns.email], fallbackData.settings.email),
    phone: asString(row[columns.phone], fallbackData.settings.phone),
    location: asString(row[columns.location], fallbackData.settings.location),
    github: asString(row[columns.github], fallbackData.settings.github),
    linkedin: asString(row[columns.linkedin], fallbackData.settings.linkedin),
    leetcode: asString(row[columns.leetcode], fallbackData.settings.leetcode),
    codeforces: asString(row[columns.codeforces], fallbackData.settings.codeforces),
    hackerrank: asString(row[columns.hackerrank], fallbackData.settings.hackerrank),
    resumeUrl: asString(row[columns.resumeUrl], fallbackData.settings.resumeUrl),
    profileImage: asString(
      row[columns.profileImage],
      fallbackData.settings.profileImage,
    ),
    profileBanner: asString(
      row[columns.profileBanner],
      fallbackData.settings.profileBanner,
    ),
    recruiterMessage: asString(
      row[columns.recruiterMessage],
      fallbackData.settings.recruiterMessage,
    ),
  };
}

function mapProjects(rows?: Row[]): PortfolioProject[] {
  const columns = googleSheetsConfig.columns.projects;

  if (!rows?.length) {
    return fallbackData.projects;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.projects[index] ?? fallbackData.projects[0];

    return {
      slug: asString(row[columns.slug], fallback.slug),
      title: asString(row[columns.title], fallback.title),
      summary: asString(row[columns.summary], fallback.summary),
      description: asString(row[columns.description], fallback.description),
      problem: asString(row[columns.problem], fallback.problem),
      outcome: asString(row[columns.outcome], fallback.outcome),
      githubUrl: asString(row[columns.githubUrl], fallback.githubUrl),
      liveUrl: asString(row[columns.liveUrl], fallback.liveUrl),
      category: asString(row[columns.category], fallback.category),
      status:
        (asString(row[columns.status], fallback.status) as PortfolioProject["status"]) ??
        fallback.status,
      techStack: asArray(row[columns.techStack]).length
        ? asArray(row[columns.techStack])
        : fallback.techStack,
      achievements: asArray(row[columns.achievements]).length
        ? asArray(row[columns.achievements])
        : fallback.achievements,
      imageUrl: asString(row[columns.imageUrl], fallback.imageUrl),
      featured: asBoolean(row[columns.featured], fallback.featured),
      startDate: asString(row[columns.startDate], fallback.startDate),
      endDate: asString(row[columns.endDate], fallback.endDate),
    };
  });
}

function mapCertifications(rows?: Row[]): Certification[] {
  const columns = googleSheetsConfig.columns.certifications;

  if (!rows?.length) {
    return fallbackData.certifications;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.certifications[index] ?? fallbackData.certifications[0];

    return {
      title: asString(row[columns.title], fallback.title),
      issuer: asString(row[columns.issuer], fallback.issuer),
      issueDate: asString(row[columns.issueDate], fallback.issueDate),
      credentialId: asString(row[columns.credentialId], fallback.credentialId),
      credentialUrl: asString(row[columns.credentialUrl], fallback.credentialUrl),
      imageUrl: asString(row[columns.imageUrl], fallback.imageUrl),
      skills: asArray(row[columns.skills]).length
        ? asArray(row[columns.skills])
        : fallback.skills,
      focus: asString(row[columns.focus], fallback.focus),
    };
  });
}

function mapAchievements(rows?: Row[]): Achievement[] {
  const columns = googleSheetsConfig.columns.achievements;

  if (!rows?.length) {
    return fallbackData.achievements;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.achievements[index] ?? fallbackData.achievements[0];

    return {
      title: asString(row[columns.title], fallback.title),
      description: asString(row[columns.description], fallback.description),
      organization: asString(row[columns.organization], fallback.organization),
      date: asString(row[columns.date], fallback.date),
      imageUrl: asString(row[columns.imageUrl], fallback.imageUrl),
    };
  });
}

function mapSkills(rows?: Row[]): Skill[] {
  const columns = googleSheetsConfig.columns.skills;

  if (!rows?.length) {
    return fallbackData.skills;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.skills[index] ?? fallbackData.skills[0];
    const proficiency = asNumber(row[columns.proficiency], fallback.proficiency);

    return {
      name: asString(row[columns.name], fallback.name),
      category: asString(row[columns.category], fallback.category) as Skill["category"],
      proficiency,
      signal: proficiency >= 84 ? "Core" : proficiency >= 74 ? "Strong" : "Growing",
      description: asString(row[columns.description], fallback.description),
    };
  });
}

function mapSocialLinks(rows?: Row[]): SocialLink[] {
  const columns = googleSheetsConfig.columns.socialLinks;

  if (!rows?.length) {
    return fallbackData.socialLinks;
  }

  return rows
    .map((row) => {
      const label = asString(row[columns.label]);
      const href = asString(row[columns.href]);

      if (!label || !href) {
        return null;
      }

      return {
        label,
        href,
        icon: getSocialIcon(label),
      };
    })
    .filter((link): link is SocialLink => Boolean(link));
}

export async function getContentData() {
  const payload = await getCachedSheetsPayload();

  return {
    settings: mapPortfolioSettings(payload?.portfolio_settings),
    projects: mapProjects(payload?.projects),
    certifications: mapCertifications(payload?.certifications),
    achievements: mapAchievements(payload?.achievements),
    skills: mapSkills(payload?.skills),
    socialLinks: mapSocialLinks(payload?.social_links),
  };
}

export async function getPortfolioSettings() {
  return (await getContentData()).settings;
}

export async function getProjects() {
  return (await getContentData()).projects;
}

export async function getCertifications() {
  return (await getContentData()).certifications;
}

export async function getAchievements() {
  return (await getContentData()).achievements;
}

export async function getSkills() {
  return (await getContentData()).skills;
}

export async function getSocialLinks() {
  return (await getContentData()).socialLinks;
}
