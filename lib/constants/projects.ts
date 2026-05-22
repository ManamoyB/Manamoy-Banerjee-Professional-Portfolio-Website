export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: "Built" | "Concept" | "Academic";
  techStack: string[];
  highlights: string[];
  description: string;
  problem: string;
  outcome: string;
  githubUrl: string;
  demoUrl: string;
};

export const projects: Project[] = [
  {
    slug: "disease-prediction-ml-system",
    title: "Disease Prediction ML System",
    summary:
      "A supervised machine learning system concept for predicting disease likelihood from structured symptoms and patient signals.",
    category: "Machine Learning",
    status: "Built",
    techStack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Data Cleaning"],
    highlights: [
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
    demoUrl: "#",
  },
  {
    slug: "deepfake-detection-system",
    title: "Deepfake Detection System",
    summary:
      "A computer vision project direction for identifying manipulated media using frame-level analysis and classification.",
    category: "AI / Computer Vision",
    status: "Built",
    techStack: ["Python", "OpenCV", "CNN", "TensorFlow", "Image Processing"],
    highlights: [
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
    demoUrl: "#",
  },
  {
    slug: "dbms-academic-project",
    title: "DBMS Academic Project",
    summary:
      "A relational database project demonstrating schema design, normalized entities, SQL queries, and application-ready data modeling.",
    category: "Database Systems",
    status: "Academic",
    techStack: ["SQL", "PostgreSQL", "ER Modeling", "Normalization", "CRUD"],
    highlights: [
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
    demoUrl: "#",
  },
  {
    slug: "chrome-productivity-extension",
    title: "Chrome Productivity Extension Concept",
    summary:
      "A browser extension concept for focus sessions, distraction blocking, task capture, and lightweight productivity analytics.",
    category: "Product Concept",
    status: "Concept",
    techStack: ["TypeScript", "Chrome APIs", "React", "Local Storage", "UX Design"],
    highlights: [
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
    demoUrl: "#",
  },
  {
    slug: "smart-home-automation-concept",
    title: "Smart Home Automation Concept",
    summary:
      "An IoT product concept for monitoring and controlling home devices through a clean dashboard and automation rules.",
    category: "IoT / Automation",
    status: "Concept",
    techStack: ["IoT", "Node.js", "MQTT", "React", "Automation Rules"],
    highlights: [
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
    demoUrl: "#",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
