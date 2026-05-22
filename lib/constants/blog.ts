export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-projects-that-recruiters-understand",
    title: "Building AI Projects Recruiters Can Actually Understand",
    excerpt:
      "How to present AI/ML work with product context, model clarity, and measurable outcomes instead of vague buzzwords.",
    date: "2026-05-01",
    readingTime: "4 min read",
    tags: ["AI", "Portfolio", "Career"],
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
    body: [
      "Academic projects often contain useful engineering effort, but the presentation is usually too thin. A project becomes proof of work when it explains decisions, constraints, and what changed from idea to implementation.",
      "The fastest improvement is structure: summary, tech stack, problem, implementation notes, screenshots, and next steps. This helps a reviewer understand both the code and the thinking behind it.",
      "Manamoy's project pages use that structure so early projects can still communicate maturity and direction.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
