import type {
  Achievement,
  BlogPost,
  Certification,
  Education,
  Experience,
  PortfolioData,
  PortfolioProject,
  Skill,
} from "@/types";

export type SearchableContent =
  | PortfolioProject
  | BlogPost
  | Skill
  | Certification
  | Achievement
  | Education
  | Experience;

export type SearchCategory = "projects" | "blogs" | "skills" | "certifications" | "all";

export interface SearchResult {
  item: SearchableContent;
  category: "projects" | "blogs" | "skills";
  relevance: number;
  matchedFields: string[];
}

export interface SearchFilters {
  category?: SearchCategory;
  skill?: string;
  year?: number;
  status?: string;
  featured?: boolean;
}

/**
 * Normalize string for search by converting to lowercase and removing special characters
 */
function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Calculate relevance score based on search term position and field type
 */
function calculateRelevance(
  text: string,
  searchTerm: string,
  fieldWeight: number,
): number {
  const normalizedText = normalizeString(text);
  const normalizedTerm = normalizeString(searchTerm);

  if (normalizedText === normalizedTerm) return fieldWeight * 10;
  if (normalizedText.startsWith(normalizedTerm)) return fieldWeight * 5;
  if (normalizedText.includes(normalizedTerm)) return fieldWeight * 2;

  return 0;
}

/**
 * Search projects
 */
function searchProjects(
  projects: PortfolioProject[],
  searchTerm: string,
  filters?: SearchFilters,
): SearchResult[] {
  if (!searchTerm && !filters) return [];

  const results: SearchResult[] = [];

  for (const project of projects) {
    const matchedFields: string[] = [];
    let relevance = 0;

    if (searchTerm) {
      const titleRelevance = calculateRelevance(project.title, searchTerm, 10);
      const summaryRelevance = calculateRelevance(project.summary, searchTerm, 7);
      const descRelevance = calculateRelevance(project.description, searchTerm, 5);
      const techRelevance = project.techStack.some((tech) =>
        normalizeString(tech).includes(normalizeString(searchTerm)),
      )
        ? 8
        : 0;

      relevance = titleRelevance + summaryRelevance + descRelevance + techRelevance;

      if (titleRelevance > 0) matchedFields.push("title");
      if (summaryRelevance > 0) matchedFields.push("summary");
      if (descRelevance > 0) matchedFields.push("description");
      if (techRelevance > 0) matchedFields.push("techStack");
    }

    // Apply filters
    if (filters?.featured && !project.featured) continue;
    if (filters?.status && project.status !== filters.status) continue;
    if (filters?.skill && !project.techStack.includes(filters.skill)) continue;

    if (relevance > 0) {
      results.push({
        item: project,
        category: "projects",
        relevance,
        matchedFields,
      });
    }
  }

  return results;
}

/**
 * Search blog posts
 */
function searchBlogs(
  blogs: BlogPost[],
  searchTerm: string,
  filters?: SearchFilters,
): SearchResult[] {
  if (!searchTerm && !filters) return [];

  const results: SearchResult[] = [];

  for (const blog of blogs) {
    const matchedFields: string[] = [];
    let relevance = 0;

    if (searchTerm) {
      const titleRelevance = calculateRelevance(blog.title, searchTerm, 10);
      const excerptRelevance = calculateRelevance(blog.excerpt, searchTerm, 7);
      const tagRelevance = blog.tags.some((tag) =>
        normalizeString(tag).includes(normalizeString(searchTerm)),
      )
        ? 8
        : 0;

      relevance = titleRelevance + excerptRelevance + tagRelevance;

      if (titleRelevance > 0) matchedFields.push("title");
      if (excerptRelevance > 0) matchedFields.push("excerpt");
      if (tagRelevance > 0) matchedFields.push("tags");
    }

    // Only include published blogs
    if (!blog.published) continue;

    if (relevance > 0) {
      results.push({
        item: blog,
        category: "blogs",
        relevance,
        matchedFields,
      });
    }
  }

  return results;
}

/**
 * Search skills
 */
function searchSkills(
  skills: Skill[],
  searchTerm: string,
  filters?: SearchFilters,
): SearchResult[] {
  if (!searchTerm && !filters) return [];

  const results: SearchResult[] = [];

  for (const skill of skills) {
    const matchedFields: string[] = [];
    let relevance = 0;

    if (searchTerm) {
      const nameRelevance = calculateRelevance(skill.name, searchTerm, 10);
      const descRelevance = calculateRelevance(skill.description, searchTerm, 5);

      relevance = nameRelevance + descRelevance;

      if (nameRelevance > 0) matchedFields.push("name");
      if (descRelevance > 0) matchedFields.push("description");
    }

    // Apply category filter - note: filters.category is SearchCategory, skill.category is SkillCategory
    // So we don't filter skills by category here

    if (relevance > 0) {
      results.push({
        item: skill,
        category: "skills",
        relevance,
        matchedFields,
      });
    }
  }

  return results;
}

/**
 * Main search function across all content
 */
export function searchPortfolio(
  portfolioData: PortfolioData,
  searchTerm: string,
  filters?: SearchFilters,
): SearchResult[] {
  const results: SearchResult[] = [];

  const categoryFilter = filters?.category || "all";

  if (categoryFilter === "projects" || categoryFilter === "all") {
    results.push(...searchProjects(portfolioData.projects, searchTerm, filters));
  }

  if (categoryFilter === "blogs" || categoryFilter === "all") {
    results.push(...searchBlogs(portfolioData.blogs, searchTerm, filters));
  }

  if (categoryFilter === "skills" || categoryFilter === "all") {
    results.push(...searchSkills(portfolioData.skills, searchTerm, filters));
  }

  // Sort by relevance (highest first)
  return results.sort((a, b) => b.relevance - a.relevance);
}

/**
 * Get unique skill categories for filtering
 */
export function getAvailableSkillCategories(skills: Skill[]): string[] {
  const categories = new Set(skills.map((skill) => skill.category));
  return Array.from(categories).sort();
}

/**
 * Filter projects by multiple criteria
 */
export function filterProjects(
  projects: PortfolioProject[],
  criteria: {
    category?: string;
    featured?: boolean;
    status?: string;
    tech?: string;
    year?: number;
  },
): PortfolioProject[] {
  return projects.filter((project) => {
    if (criteria.category && project.category !== criteria.category) return false;
    if (criteria.featured !== undefined && project.featured !== criteria.featured)
      return false;
    if (criteria.status && project.status !== criteria.status) return false;
    if (criteria.tech && !project.techStack.includes(criteria.tech)) return false;
    if (criteria.year && project.startDate) {
      const year = parseInt(project.startDate.split("-")[0]);
      if (isNaN(year) || year !== criteria.year) return false;
    }
    return true;
  });
}

/**
 * Filter certifications by focus area
 */
export function filterCertifications(
  certifications: Certification[],
  focus?: string,
): Certification[] {
  if (!focus) return certifications;
  return certifications.filter(
    (cert) => cert.focus === focus || cert.focus.includes(focus),
  );
}

/**
 * Get available project categories
 */
export function getAvailableProjectCategories(projects: PortfolioProject[]): string[] {
  const categories = new Set(projects.map((project) => project.category));
  return Array.from(categories).sort();
}

/**
 * Get available tech stack from all projects
 */
export function getAvailableTechStack(projects: PortfolioProject[]): string[] {
  const techSet = new Set<string>();
  projects.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

/**
 * Get unique blog tags
 */
export function getBlogTags(blogs: BlogPost[]): string[] {
  const tags = new Set<string>();
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Filter blogs by tag
 */
export function filterBlogsByTag(blogs: BlogPost[], tag: string): BlogPost[] {
  return blogs.filter((blog) => blog.tags.includes(tag) && blog.published);
}
