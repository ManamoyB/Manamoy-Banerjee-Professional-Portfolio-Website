import type { BlogPost, PortfolioData } from "@/types";

import { fallbackData } from "@/data/fallbackData";
import {
  getAchievements as getGoogleSheetAchievements,
  getCertifications as getGoogleSheetCertifications,
  getContentData,
  getPortfolioSettings as getGoogleSheetPortfolioSettings,
  getProjects as getGoogleSheetProjects,
  getSkills as getGoogleSheetSkills,
  getSocialLinks as getGoogleSheetSocialLinks,
} from "@/lib/google-sheets";

export async function getPortfolioData(): Promise<PortfolioData> {
  const contentData = await getContentData();

  return {
    ...fallbackData,
    settings: contentData.settings,
    projects: contentData.projects,
    certifications: contentData.certifications,
    achievements: contentData.achievements,
    skills: contentData.skills,
    skillCategories: Array.from(
      new Set(contentData.skills.map((skill) => skill.category)),
    ),
    socialLinks: contentData.socialLinks,
  };
}

export async function getPortfolioSettings() {
  return getGoogleSheetPortfolioSettings();
}

export async function getProjects() {
  return getGoogleSheetProjects();
}

export async function getProject(slug: string) {
  return (await getProjects()).find((project) => project.slug === slug);
}

export async function getCertifications() {
  return getGoogleSheetCertifications();
}

export async function getAchievements() {
  return getGoogleSheetAchievements();
}

export async function getSkills() {
  return getGoogleSheetSkills();
}

export async function getSocialLinks() {
  return getGoogleSheetSocialLinks();
}

export async function getBlogs(): Promise<BlogPost[]> {
  return fallbackData.blogs;
}

export async function getBlogPost(slug: string) {
  return (await getBlogs()).find((post) => post.slug === slug);
}
