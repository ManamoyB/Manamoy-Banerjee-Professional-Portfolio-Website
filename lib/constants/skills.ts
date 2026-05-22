import type { Skill, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Python",
  "C++",
  "AI/ML",
  "Data Science",
  "Databases",
  "Tools",
  "Cloud Basics",
];

export const skills: Skill[] = [
  {
    name: "React",
    category: "Frontend",
    proficiency: 88,
    signal: "Core",
    description:
      "Component architecture, hooks, state patterns, and polished interfaces.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    proficiency: 86,
    signal: "Core",
    description:
      "App Router, metadata, server components, and deployment-ready web apps.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    proficiency: 84,
    signal: "Core",
    description: "Strict typing, reusable interfaces, and safer application contracts.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: 82,
    signal: "Strong",
    description:
      "Responsive design systems, tokens, motion-friendly layouts, and UI polish.",
  },
  {
    name: "Node.js",
    category: "Backend",
    proficiency: 80,
    signal: "Strong",
    description: "API design, service orchestration, server-side rendering, and tooling.",
  },
  {
    name: "API Design",
    category: "Backend",
    proficiency: 74,
    signal: "Strong",
    description: "Backend contracts, route handlers, validation, and service boundaries.",
  },
  {
    name: "REST APIs",
    category: "Backend",
    proficiency: 82,
    signal: "Core",
    description:
      "Clean endpoints, validation boundaries, pagination, and integration design.",
  },
  {
    name: "Python",
    category: "Python",
    proficiency: 86,
    signal: "Core",
    description:
      "AI prototyping, automation, data processing, and model experimentation.",
  },
  {
    name: "Pandas",
    category: "Python",
    proficiency: 80,
    signal: "Strong",
    description: "Exploration, cleaning, transformation, and insight generation.",
  },
  {
    name: "C++",
    category: "C++",
    proficiency: 72,
    signal: "Strong",
    description: "Programming fundamentals, memory awareness, and problem solving.",
  },
  {
    name: "Data Structures",
    category: "C++",
    proficiency: 70,
    signal: "Growing",
    description: "Arrays, trees, graphs, algorithms, and interview-ready fundamentals.",
  },
  {
    name: "Machine Learning",
    category: "AI/ML",
    proficiency: 78,
    signal: "Strong",
    description:
      "Model workflows, feature thinking, evaluation, and practical ML systems.",
  },
  {
    name: "LLM Apps",
    category: "AI/ML",
    proficiency: 76,
    signal: "Growing",
    description: "Prompt systems, retrieval patterns, structured output, and AI UX.",
  },
  {
    name: "Visualization",
    category: "Data Science",
    proficiency: 72,
    signal: "Strong",
    description: "Readable charts, dashboards, and narrative data communication.",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    proficiency: 78,
    signal: "Strong",
    description: "Relational modeling, query fundamentals, and production data patterns.",
  },
  {
    name: "Supabase",
    category: "Databases",
    proficiency: 74,
    signal: "Growing",
    description:
      "Managed Postgres, auth-adjacent services, storage, and deployment workflows.",
  },
  {
    name: "Vercel",
    category: "Cloud Basics",
    proficiency: 78,
    signal: "Strong",
    description: "Preview deployments, environment management, and Next.js hosting.",
  },
  {
    name: "Docker",
    category: "Cloud Basics",
    proficiency: 66,
    signal: "Growing",
    description: "Portable development environments and production packaging basics.",
  },
  {
    name: "GitHub",
    category: "Tools",
    proficiency: 82,
    signal: "Core",
    description: "Branching, collaboration, issue tracking, and review-ready workflows.",
  },
  {
    name: "Figma",
    category: "Tools",
    proficiency: 68,
    signal: "Growing",
    description:
      "Design translation, layout inspection, and product presentation polish.",
  },
];

export const skillHeatmap = skillCategories.map((category) => ({
  category,
  skills: skills.filter((skill) => skill.category === category),
}));
