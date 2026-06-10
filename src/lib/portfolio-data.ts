import type {
  Achievement,
  BlogPost,
  Certification,
  Education,
  Experience,
  PortfolioData,
  PortfolioProject,
  PortfolioSettings,
  ResumeFile,
  Skill,
} from "@/types";

import { fallbackData } from "@/data/fallbackData";
import { getSupabaseServerClient } from "@/lib/supabase";

type Row = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

async function selectRows(table: string) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      return null;
    }

    return (data ?? []) as Row[];
  } catch {
    return null;
  }
}

function mapSettings(rows: Row[] | null): PortfolioSettings {
  const row = rows?.[0];

  if (!row) {
    return fallbackData.settings;
  }

  return {
    id: asString(row.id),
    name: asString(row.name, fallbackData.settings.name),
    headline: asString(row.headline, fallbackData.settings.headline),
    bio: asString(row.bio, fallbackData.settings.bio),
    email: asString(row.email, fallbackData.settings.email),
    phone: asString(row.phone),
    location: asString(row.location, fallbackData.settings.location),
    github: asString(row.github, fallbackData.settings.github),
    linkedin: asString(row.linkedin, fallbackData.settings.linkedin),
    leetcode: asString(row.leetcode),
    codeforces: asString(row.codeforces),
    hackerrank: asString(row.hackerrank),
    resumeUrl: asString(row.resume_url, fallbackData.settings.resumeUrl),
    profileImage: asString(row.profile_image, fallbackData.settings.profileImage),
    profileBanner: asString(row.profile_banner, fallbackData.settings.profileBanner),
    recruiterMessage: asString(
      row.recruiter_message,
      fallbackData.settings.recruiterMessage,
    ),
  };
}

function mapProjects(rows: Row[] | null): PortfolioProject[] {
  if (!rows?.length) {
    return fallbackData.projects;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.projects[index] ?? fallbackData.projects[0];

    return {
      id: asString(row.id),
      slug: asString(row.slug, fallback.slug),
      title: asString(row.title, fallback.title),
      summary: asString(row.summary, asString(row.description, fallback.summary)),
      description: asString(row.description, fallback.description),
      problem: asString(row.problem, fallback.problem),
      outcome: asString(row.outcome, fallback.outcome),
      githubUrl: asString(row.github_url, fallback.githubUrl),
      liveUrl: asString(row.live_url, fallback.liveUrl),
      category: asString(row.category, fallback.category),
      status: fallback.status,
      techStack: asArray(row.tech_stack).length ? asArray(row.tech_stack) : fallback.techStack,
      achievements: asArray(row.achievements).length
        ? asArray(row.achievements)
        : fallback.achievements,
      imageUrl: asString(row.image_url, fallback.imageUrl),
      featured: asBoolean(row.featured, fallback.featured),
      startDate: asString(row.start_date, fallback.startDate),
      endDate: asString(row.end_date, fallback.endDate),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at),
    };
  });
}

function mapCertifications(rows: Row[] | null): Certification[] {
  if (!rows?.length) {
    return fallbackData.certifications;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.certifications[index] ?? fallbackData.certifications[0];

    return {
      id: asString(row.id),
      title: asString(row.title, fallback.title),
      issuer: asString(row.issuer, fallback.issuer),
      issueDate: asString(row.issue_date, fallback.issueDate),
      credentialId: asString(row.credential_id, fallback.credentialId),
      credentialUrl: asString(row.credential_url, fallback.credentialUrl),
      imageUrl: asString(row.image_url, fallback.imageUrl),
      skills: asArray(row.skills).length ? asArray(row.skills) : fallback.skills,
      focus: asString(row.focus, fallback.focus),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at),
    };
  });
}

function mapAchievements(rows: Row[] | null): Achievement[] {
  if (!rows?.length) {
    return fallbackData.achievements;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.achievements[index] ?? fallbackData.achievements[0];

    return {
      id: asString(row.id),
      title: asString(row.title, fallback.title),
      description: asString(row.description, fallback.description),
      organization: asString(row.organization, fallback.organization),
      date: asString(row.date, fallback.date),
      imageUrl: asString(row.image_url, fallback.imageUrl),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at),
    };
  });
}

function mapSkills(rows: Row[] | null): Skill[] {
  if (!rows?.length) {
    return fallbackData.skills;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.skills[index] ?? fallbackData.skills[0];
    const proficiency = asNumber(row.proficiency, fallback.proficiency);

    return {
      name: asString(row.name, fallback.name),
      category: asString(row.category, fallback.category) as Skill["category"],
      proficiency,
      signal: proficiency >= 84 ? "Core" : proficiency >= 74 ? "Strong" : "Growing",
      description: asString(row.description, fallback.description),
    };
  });
}

function mapEducation(rows: Row[] | null): Education[] {
  if (!rows?.length) {
    return fallbackData.education;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.education[index] ?? fallbackData.education[0];

    return {
      id: asString(row.id),
      institution: asString(row.institution, fallback.institution),
      degree: asString(row.degree, fallback.degree),
      cgpa: asString(row.cgpa, fallback.cgpa),
      startDate: asString(row.start_date, fallback.startDate),
      endDate: asString(row.end_date, fallback.endDate),
      description: asString(row.description, fallback.description),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at),
    };
  });
}

function mapExperience(rows: Row[] | null): Experience[] {
  if (!rows?.length) {
    return fallbackData.experience;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.experience[index] ?? fallbackData.experience[0];

    return {
      id: asString(row.id),
      company: asString(row.company, fallback.company),
      role: asString(row.role, fallback.role),
      duration: asString(row.duration, fallback.duration),
      description: asString(row.description, fallback.description),
      skills: asArray(row.skills).length ? asArray(row.skills) : fallback.skills,
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at),
    };
  });
}

function mapBlogs(rows: Row[] | null): BlogPost[] {
  if (!rows?.length) {
    return fallbackData.blogs;
  }

  return rows
    .filter((row) => row.published !== false)
    .map((row, index) => {
      const fallback = fallbackData.blogs[index] ?? fallbackData.blogs[0];
      const content = asString(row.content, fallback.content);

      return {
        id: asString(row.id),
        slug: asString(row.slug, fallback.slug),
        title: asString(row.title, fallback.title),
        excerpt: asString(row.excerpt, fallback.excerpt),
        content,
        body: content.split(/\n{2,}/).filter(Boolean),
        date: asString(row.created_at, fallback.date).slice(0, 10),
        readingTime: fallback.readingTime,
        tags: asArray(row.tags).length ? asArray(row.tags) : fallback.tags,
        coverImage: asString(row.cover_image, fallback.coverImage),
        published: asBoolean(row.published, true),
        createdAt: asString(row.created_at),
        updatedAt: asString(row.updated_at),
      };
    });
}

function mapResumeFiles(rows: Row[] | null): ResumeFile[] {
  if (!rows?.length) {
    return fallbackData.resumeFiles;
  }

  return rows.map((row, index) => {
    const fallback = fallbackData.resumeFiles[index] ?? fallbackData.resumeFiles[0];

    return {
      id: asString(row.id),
      title: asString(row.title, fallback.title),
      fileUrl: asString(row.file_url, fallback.fileUrl),
      version: asString(row.version, fallback.version),
      isActive: asBoolean(row.is_active, fallback.isActive),
      createdAt: asString(row.created_at),
    };
  });
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [
    settings,
    projects,
    certifications,
    achievements,
    skills,
    education,
    experience,
    blogs,
    resumeFiles,
  ] = await Promise.all([
    selectRows("portfolio_settings"),
    selectRows("projects"),
    selectRows("certifications"),
    selectRows("achievements"),
    selectRows("skills"),
    selectRows("education"),
    selectRows("experience"),
    selectRows("blogs"),
    selectRows("resume_files"),
  ]);

  const mappedSkills = mapSkills(skills);

  return {
    ...fallbackData,
    settings: mapSettings(settings),
    projects: mapProjects(projects),
    certifications: mapCertifications(certifications),
    achievements: mapAchievements(achievements),
    skills: mappedSkills,
    skillCategories: Array.from(new Set(mappedSkills.map((skill) => skill.category))),
    education: mapEducation(education),
    experience: mapExperience(experience),
    blogs: mapBlogs(blogs),
    resumeFiles: mapResumeFiles(resumeFiles),
  };
}

export async function getProjects() {
  return (await getPortfolioData()).projects;
}

export async function getProject(slug: string) {
  return (await getProjects()).find((project) => project.slug === slug);
}

export async function getBlogs() {
  return (await getPortfolioData()).blogs;
}

export async function getBlogPost(slug: string) {
  return (await getBlogs()).find((post) => post.slug === slug);
}
