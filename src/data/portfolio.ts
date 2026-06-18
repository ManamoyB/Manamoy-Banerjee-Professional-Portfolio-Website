import type {
  Achievement,
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  SiteConfig,
  Skill,
  SkillCategory,
  Socials,
  TimelineItem,
} from "@/types";

export const profile: Profile = {
  name: "Manamoy",
  displayName: "Manamoy Banerjee",
  headline: "AI Engineer | Full Stack Developer | Data Science Enthusiast",
  role: "AI Engineer, Data Analyst, Software Developer",
  bio: "AI-minded full-stack developer building practical software, ML systems, and polished product experiences.",
  email: "hello@manamoy.dev",
  location: "India",
  resumeUrl: "",
  recruiterMessage:
    "Open to thoughtful engineering opportunities, AI product work, and product-minded collaborations.",
};

export const socials: Socials = {
  github: "https://github.com/ManamoyB",
  linkedin: "https://www.linkedin.com/in/manamoyb/",
  email: `mailto:${profile.email}`,
  leetcode: "",
  codeforces: "",
  hackerrank: "",
};

export const siteConfig: SiteConfig = {
  name: "Manamoy Banerjee",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "A clean professional portfolio for Manamoy Banerjee, an AI engineer, data analyst, and software developer focused on useful intelligent systems.",
  keywords: [
    "Manamoy Banerjee",
    "AI Engineer",
    "Data Analyst",
    "Software Developer",
    "Full Stack Developer",
    "Machine Learning",
    "Next.js",
    "Portfolio",
  ],
  navigation: [
    {
      title: "Home",
      href: "/",
      description: "Overview, featured work, and recruiter snapshot.",
    },
    {
      title: "About",
      href: "/about",
      description: "Background, values, education, and current focus.",
    },
    {
      title: "Projects",
      href: "/projects",
      description: "Applied AI, data, web, and automation projects.",
    },
    {
      title: "Resume",
      href: "/resume",
      description: "Skills, education, and selected experience.",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Hiring, collaboration, and recruiter conversations.",
    },
  ],
};

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

export const projects: Project[] = [
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

export const certifications: Certification[] = [
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

export const achievements: Achievement[] = [
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

export const education: Education[] = [
  {
    institution: "SRM University",
    degree: "BTech CSE",
    cgpa: "8.04",
    description:
      "Building depth in computer science fundamentals, programming, data systems, and applied engineering practice.",
  },
];

export const experience: Experience[] = [
  {
    company: "Independent Portfolio Projects",
    role: "AI-minded Full-Stack Developer",
    duration: "Current focus",
    description:
      "Combining frontend craft, backend thinking, and AI concepts into recruiter-ready product demos.",
    skills: ["Next.js", "TypeScript", "Python", "Machine Learning", "Supabase"],
  },
];

export const journey: TimelineItem[] = [
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

export const values = [
  "Build systems that are useful before they are flashy.",
  "Make technical work legible to business, product, and recruiting audiences.",
  "Treat learning as a shipping habit, not a separate season.",
  "Prefer clarity, iteration, and measurable outcomes over noise.",
];

export const currentlyLearning = [
  "Production LLM application patterns",
  "Data pipelines for decision support",
  "System design for AI-enabled products",
  "Accessibility and motion design for premium interfaces",
];

export const funFacts = [
  "Enjoys connecting product strategy with implementation details.",
  "Likes clean dashboards, sharp typography, and well-named abstractions.",
  "Believes the best engineer profiles show judgment, not just tool lists.",
];
