import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import type {
  Achievement,
  BlogPost,
  Certification,
  Education,
  Experience,
  PortfolioData,
  PortfolioProject,
  PortfolioSettings,
  Skill,
  SkillCategory,
  TimelineItem,
} from "@/types";
import { siteConfig } from "@/config/site";

export const fallbackSettings: PortfolioSettings = {
  name: siteConfig.name,
  headline: siteConfig.role,
  bio: siteConfig.bio,
  email: siteConfig.email,
  location: siteConfig.location,
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  leetcode: siteConfig.leetcode,
  codeforces: siteConfig.codeforces,
  hackerrank: siteConfig.hackerrank,
  resumeUrl: siteConfig.resumeUrl,
  recruiterMessage: siteConfig.recruiterMessage,
};

export const fallbackProjects: PortfolioProject[] = [
  {
    slug: "disease-prediction-ml-system",
    title: "Disease Prediction ML System",
    summary:
      "A supervised machine learning system concept for predicting disease likelihood from structured symptoms and patient signals.",
    category: "Machine Learning",
    status: "Built",
    techStack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Data Cleaning"],
    achievements: [
      "Symptom-driven prediction workflow",
      "Model comparison and evaluation",
      "Readable interface for non-technical review",
    ],
    description:
      "This project frames healthcare prediction as an explainable decision-support workflow. The V1 concept focuses on clean data preparation, baseline model selection, and an interface that makes inputs and predicted classes easy to understand.",
    problem:
      "Healthcare datasets are often noisy and difficult to interpret. The goal was to make a student-friendly ML pipeline that demonstrates preprocessing, model training, and prediction in a clear flow.",
    outcome:
      "A polished academic ML showcase that communicates the full pipeline from raw symptoms to model output, with room for future explainability and dataset expansion.",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: true,
  },
  {
    slug: "deepfake-detection-system",
    title: "Deepfake Detection System",
    summary:
      "A computer vision project direction for identifying manipulated media using frame-level analysis and classification.",
    category: "AI / Computer Vision",
    status: "Built",
    techStack: ["Python", "OpenCV", "CNN", "TensorFlow", "Image Processing"],
    achievements: [
      "Frame extraction and preprocessing",
      "Binary media authenticity classification",
      "Security-aware AI product framing",
    ],
    description:
      "The deepfake detection project explores how AI can support media integrity. The architecture breaks media into analyzable frames, extracts visual signals, and routes them through a classification workflow.",
    problem:
      "Synthetic media can be difficult to detect manually. A technical proof of concept helps demonstrate how visual features and neural models can flag suspicious content.",
    outcome:
      "A strong AI portfolio project that shows awareness of model limitations, security context, and responsible use of detection systems.",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: true,
  },
  {
    slug: "dbms-academic-project",
    title: "DBMS Academic Project",
    summary:
      "A relational database project demonstrating schema design, normalized entities, SQL queries, and application-ready data modeling.",
    category: "Database Systems",
    status: "Academic",
    techStack: ["SQL", "PostgreSQL", "ER Modeling", "Normalization", "CRUD"],
    achievements: [
      "Entity relationship design",
      "Normalized table structure",
      "Query-first academic documentation",
    ],
    description:
      "This DBMS project focuses on relational fundamentals: translating domain requirements into entities, relationships, constraints, and useful queries.",
    problem:
      "Academic database projects can become table dumps. This version emphasizes modeling choices, integrity constraints, and the reasoning behind the schema.",
    outcome:
      "A recruiter-readable database foundation that demonstrates structured thinking and backend readiness.",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: false,
  },
  {
    slug: "chrome-productivity-extension",
    title: "Chrome Productivity Extension Concept",
    summary:
      "A browser extension concept for focus sessions, distraction blocking, task capture, and lightweight productivity analytics.",
    category: "Product Concept",
    status: "Concept",
    techStack: ["TypeScript", "Chrome APIs", "React", "Local Storage", "UX Design"],
    achievements: [
      "Focus-mode interaction design",
      "Task capture from browser context",
      "Privacy-friendly local-first storage",
    ],
    description:
      "The extension concept turns browser behavior into a lightweight productivity assistant. It prioritizes fast capture, low-friction focus mode, and local data ownership.",
    problem:
      "Productivity tools often require context switching. A browser-native assistant can reduce friction by meeting users where attention is already being spent.",
    outcome:
      "A practical product concept that shows frontend engineering, extension APIs, and user-centered product thinking.",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: false,
  },
  {
    slug: "smart-home-automation-concept",
    title: "Smart Home Automation Concept",
    summary:
      "An IoT product concept for monitoring and controlling home devices through a clean dashboard and automation rules.",
    category: "IoT / Automation",
    status: "Concept",
    techStack: ["IoT", "Node.js", "MQTT", "React", "Automation Rules"],
    achievements: [
      "Device state dashboard",
      "Automation rule modeling",
      "Human-friendly control surface",
    ],
    description:
      "The smart home concept explores how connected device data can be presented as a simple control system with automation rules, status visibility, and alert surfaces.",
    problem:
      "Smart device interfaces can feel fragmented. A unified dashboard gives users a single mental model for device state and automation.",
    outcome:
      "A clear systems-thinking project direction that combines product UX, backend events, and hardware-adjacent architecture.",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: false,
  },
];

export const fallbackCertifications: Certification[] = [
  {
    title: "Machine Learning Foundations",
    issuer: "Professional Learning Track",
    skills: ["Supervised Learning", "Evaluation", "Applied ML"],
    focus: "Supervised learning, evaluation, and applied ML workflows",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Project-Based Certification",
    skills: ["React", "APIs", "Databases", "Deployment"],
    focus: "React, APIs, database fundamentals, and deployment readiness",
  },
  {
    title: "Data Science with Python",
    issuer: "Analytics Learning Program",
    skills: ["Pandas", "Visualization", "Statistics"],
    focus: "Pandas, visualization, statistics, and data storytelling",
  },
  {
    title: "Cloud and DevOps Basics",
    issuer: "Self-Paced Engineering Track",
    skills: ["Git", "CI/CD", "Environment Variables"],
    focus: "Git, deployment, environment variables, and CI/CD fundamentals",
  },
];

export const fallbackAchievements: Achievement[] = [
  {
    title: "Portfolio Platform",
    description:
      "Built a structured AI/full-stack portfolio platform with scalable routing and SEO.",
  },
  {
    title: "Applied Project Concepts",
    description:
      "Developed multiple applied project concepts across ML, DBMS, browser productivity, and IoT automation.",
  },
  {
    title: "Academic Standing",
    description:
      "Maintained strong academic standing in BTech CSE at SRM University with CGPA 8.04.",
    organization: "SRM University",
  },
  {
    title: "Professional Narrative",
    description:
      "Created a professional narrative around AI engineering, data science, and full-stack development.",
  },
];

export const fallbackSkillCategories: SkillCategory[] = [
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

export const fallbackSkills: Skill[] = [
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

export const fallbackEducation: Education[] = [
  {
    institution: "SRM University",
    degree: "BTech CSE",
    cgpa: "8.04",
    description:
      "Building depth in computer science fundamentals, programming, data systems, and applied engineering practice.",
  },
];

export const fallbackExperience: Experience[] = [
  {
    company: "Independent Portfolio Projects",
    role: "AI-minded Full-Stack Developer",
    duration: "Current focus",
    description:
      "Combining frontend craft, backend thinking, and AI concepts into recruiter-ready product demos.",
    skills: ["Next.js", "TypeScript", "Python", "Machine Learning", "Supabase"],
  },
];

export const fallbackBlogs: BlogPost[] = [
  {
    slug: "building-ai-projects-that-recruiters-understand",
    title: "Building AI Projects Recruiters Can Actually Understand",
    excerpt:
      "How to present AI/ML work with product context, model clarity, and measurable outcomes instead of vague buzzwords.",
    date: "2026-05-01",
    readingTime: "4 min read",
    tags: ["AI", "Portfolio", "Career"],
    published: true,
    content:
      "Strong AI projects need more than a model name.\n\nRecruiters and engineering teams want to understand the problem, the data, the constraints, and the outcome.\n\nA good portfolio write-up should explain what the system takes in, what it produces, how success is measured, and what tradeoffs were made.",
    body: [
      "Strong AI projects need more than a model name. Recruiters and engineering teams want to understand the problem, the data, the constraints, and the outcome.",
      "A good portfolio write-up should explain what the system takes in, what it produces, how success is measured, and what tradeoffs were made. That framing makes even academic projects feel production-aware.",
      "For Manamoy's platform, each project is structured around problem, implementation, and outcome so the signal is clear before someone opens the repository.",
    ],
  },
  {
    slug: "why-full-stack-foundations-matter-for-ai-engineers",
    title: "Why Full-Stack Foundations Matter for AI Engineers",
    excerpt:
      "AI features become useful when they are wrapped in reliable interfaces, clean data flows, and deployable product systems.",
    date: "2026-04-18",
    readingTime: "5 min read",
    tags: ["Full Stack", "AI Engineering", "Product"],
    published: true,
    content:
      "AI engineering is not only about training models.\n\nIn real products, the model is one part of a larger system that includes input design, validation, storage, orchestration, and feedback loops.",
    body: [
      "AI engineering is not only about training models. In real products, the model is one part of a larger system that includes input design, validation, storage, orchestration, and feedback loops.",
      "Full-stack foundations help an AI engineer turn prototypes into experiences. They also improve communication with product teams because the work is easier to demo and evaluate.",
      "This is why the V1 platform emphasizes both AI/ML projects and web product craft. The combination tells a stronger story than either side alone.",
    ],
  },
  {
    slug: "turning-academic-projects-into-proof-of-work",
    title: "Turning Academic Projects into Proof of Work",
    excerpt:
      "A practical framework for making coursework, DBMS projects, and ML assignments portfolio-ready.",
    date: "2026-03-29",
    readingTime: "3 min read",
    tags: ["Projects", "Students", "Documentation"],
    published: true,
    content:
      "Academic projects often contain useful engineering effort, but the presentation is usually too thin.\n\nA project becomes proof of work when it explains decisions, constraints, and what changed from idea to implementation.",
    body: [
      "Academic projects often contain useful engineering effort, but the presentation is usually too thin. A project becomes proof of work when it explains decisions, constraints, and what changed from idea to implementation.",
      "The fastest improvement is structure: summary, tech stack, problem, implementation notes, screenshots, and next steps. This helps a reviewer understand both the code and the thinking behind it.",
      "Manamoy's project pages use that structure so early projects can still communicate maturity and direction.",
    ],
  },
];

export const fallbackJourney: TimelineItem[] = [
  {
    title: "BTech CSE at SRM University",
    period: "Academic foundation",
    eyebrow: "Academic foundation",
    description:
      "Built core computer science foundations while maintaining a CGPA of 8.04.",
  },
  {
    title: "Data and ML Exploration",
    period: "AI direction",
    eyebrow: "AI direction",
    description:
      "Created ML-focused projects around disease prediction, deepfake detection, and data workflows.",
  },
  {
    title: "Full-Stack Product Building",
    period: "Current focus",
    eyebrow: "Current focus",
    description:
      "Combining frontend craft, backend thinking, and AI concepts into recruiter-ready product demos.",
  },
  {
    title: "Production Portfolio Platform",
    period: "V1 shipped",
    eyebrow: "V1 shipped",
    description:
      "Consolidated projects, writing, achievements, resume, and recruiter context into a single web platform.",
  },
];

export const fallbackData: PortfolioData = {
  settings: fallbackSettings,
  projects: fallbackProjects,
  certifications: fallbackCertifications,
  achievements: fallbackAchievements,
  skills: fallbackSkills,
  skillCategories: fallbackSkillCategories,
  education: fallbackEducation,
  experience: fallbackExperience,
  socialLinks: [
    { label: "GitHub", href: fallbackSettings.github ?? "", icon: Github },
    { label: "LinkedIn", href: fallbackSettings.linkedin ?? "", icon: Linkedin },
    { label: "Email", href: `mailto:${fallbackSettings.email}`, icon: Mail },
    { label: "India", href: "/contact", icon: MapPin },
  ],
  blogs: fallbackBlogs,
  resumeFiles: [
    {
      title: "Manamoy Resume",
      version: "web-request",
      isActive: true,
    },
  ],
  journey: fallbackJourney,
  galleryItems: [
    "ML model workflow",
    "Deepfake frame analysis",
    "Database schema map",
    "Extension dashboard concept",
    "Smart home control panel",
    "Recruiter profile snapshot",
  ],
  values: [
    "Build systems that are useful before they are flashy.",
    "Make technical work legible to business, product, and recruiting audiences.",
    "Treat learning as a shipping habit, not a separate season.",
    "Prefer clarity, iteration, and measurable outcomes over noise.",
  ],
  currentlyLearning: [
    "Production LLM application patterns",
    "Data pipelines for decision support",
    "System design for AI-enabled products",
    "Accessibility and motion design for premium interfaces",
  ],
  funFacts: [
    "Enjoys connecting product strategy with implementation details.",
    "Likes clean dashboards, sharp typography, and well-named abstractions.",
    "Believes the best engineer profiles show judgment, not just tool lists.",
  ],
};
