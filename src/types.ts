export interface Education {
  degree: string;
  institution: string;
  duration: string;
  cgpa: string;
  details: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  type: 'Internship' | 'Leadership' | 'Academic Project' | 'Achievement';
  points: string[];
  techUsed?: string[];
}

export interface Skill {
  name: string;
  category: 'Programming' | 'Domains' | 'Frameworks' | 'Databases' | 'Tools';
  proficiency: number; // 0 to 100
  iconType: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
  architecture?: string[];
  screenshots?: string[];
  results?: string;
  challenges?: string;
  futureImprovements?: string[];
  stars?: number;
  forks?: number;
  openIssues?: number;
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  skills: string;
  credentialUrl: string;
  category?: string;
  isHighlighted?: boolean;
}

export type ThemeType = 'aurora' | 'nova'; // aurora (dark futuristic), nova (light product builder)
