import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Trophy, 
  Code, 
  Terminal, 
  Cpu, 
  BarChart, 
  Award, 
  Target, 
  Globe, 
  ChevronRight, 
  MessageSquare, 
  Info,
  Calendar,
  Sparkles,
  Zap,
  ArrowUpRight,
  Bookmark
} from 'lucide-react';

interface JourneyPageProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    mutedText: string;
    borderColor: string;
    cardBg: string;
    accent?: string;
  };
  theme: string;
}

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  icon: React.ComponentType<any>;
  description: string;
  achievements: string[];
  photoCaption: string;
  photoType: 'school' | 'basketball' | 'coding' | 'project' | 'ai' | 'research' | 'cert' | 'placement' | 'future';
  vibeColor: string;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ colors, theme }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>('school');
  const [flippedPhoto, setFlippedPhoto] = useState<string | null>(null);

  // Dynamic system milestones
  const milestones: Milestone[] = [
    {
      id: 'school',
      title: 'School Education',
      subtitle: 'Higher Secondary & Scientific Focus',
      period: '2019 — 2021',
      icon: GraduationCap,
      description: 'Acquired core competencies in advanced Mathematics, Physics, and Chemistry. Developed rigorous analytical reasoning and quantitative foundational logic that paved the entry into engineering.',
      achievements: [
        'Finished in top percentiles of national core science examinations.',
        'Actively organized math-olympiad problem groups.',
        'Cultivated early programming interests using automated Excel spreadsheets.'
      ],
      photoCaption: 'Classroom whiteboard charting early physics vectors, circa 2020.',
      photoType: 'school',
      vibeColor: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'basketball',
      title: 'Basketball Achievements',
      subtitle: 'State Level Varsity Athletics',
      period: '2018 — 2021',
      icon: Trophy,
      description: 'Pivotal chapter focusing on high-stress leadership, communication frequency, and rigorous athletic conditioning. Commanded the varsity squad through local and regional state championships.',
      achievements: [
        'Selected for State Level High School Basketball Tournaments.',
        'Appointed Varsity Team Captain for high-stakes regional qualifiers.',
        'Won 3x consecutive Inter-District Varsity Championships.'
      ],
      photoCaption: 'A high-contrast chalkboard diagram of the motion-offense play, Game 7.',
      photoType: 'basketball',
      vibeColor: 'from-orange-500 to-red-500'
    },
    {
      id: 'programming',
      title: 'Started Programming',
      subtitle: 'Unlocking Python Command Lines',
      period: '2020',
      icon: Terminal,
      description: 'Discovered the sheer creative freedom of translating abstract logical thoughts into functioning execution. Experimented with scripting automated scraping utilities and core automation macros.',
      achievements: [
        'Wrote first fully functional local CLI budget helper.',
        'Mastered foundational recursive math functions and algorithms.',
        'Fascinated by high-speed execution matrices.'
      ],
      photoCaption: 'Retro CRT monitor terminal blinking with the first compiled scripts.',
      photoType: 'coding',
      vibeColor: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'first-project',
      title: 'First Software Project',
      subtitle: 'Automated Score & Profile Registry',
      period: '2021',
      icon: Code,
      description: 'Structured a database-backed desktop portal using Java and MySQL. This served as the initial prototype solving manual information tracking bottlenecks for local school teams.',
      achievements: [
        'Eliminated manual spreadsheet paper slips with 100% relational integrity.',
        'Designed early graphical menus utilizing custom Java swing panels.',
        'Maintained structured normalization formats reducing query lag.'
      ],
      photoCaption: 'Early relational diagram scribbled in a laboratory notebook.',
      photoType: 'project',
      vibeColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'first-ai',
      title: 'First AI & Machine Learning Venture',
      subtitle: 'Parametric Tumor & Classification Clust',
      period: '2022',
      icon: Cpu,
      description: 'Ventured into structural statistical networks. Built rudimentary classification classifiers, studying the linear mathematical limits of gradient descent optimizations and gradient backpropagations.',
      achievements: [
        'Implemented raw numerical arrays mapping weight multipliers from scratch.',
        'Constructed custom Iris validation grids mapping confidence vectors.',
        'De-mystified statistical hyperparameters such as alpha weights and learning decay.'
      ],
      photoCaption: 'Visual neural mesh showing backpropagation math weights.',
      photoType: 'ai',
      vibeColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'research',
      title: 'SRM Research Projects',
      subtitle: 'Computer Vision in Agricultural Pathology',
      period: '2023 — 2024',
      icon: Globe,
      description: 'Collaborated with academic professors at SRM Institute to engineer predictive deep learning networks targeting diagnostic classification of crop disease patterns in offline nodes.',
      achievements: [
        'Achieved Rank 1 in the SRM inter-departmental AI Hackathon.',
        'Reduced Convolutional classifier parameter counts using light weights.',
        'Analyzed agricultural pathology images inside challenging terrain layers.'
      ],
      photoCaption: 'Microscopic scan segment analyzed by SRM Computer Vision model.',
      photoType: 'research',
      vibeColor: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'certifications',
      title: 'Professional Certifications',
      subtitle: 'IBM & Google Learning trajectories',
      period: '2024 — 2025',
      icon: Award,
      description: 'Established rigorous industrial validations. Completed the dual Google Business Intelligence and IBM Advanced Data Analytics pipelines, specializing in BigQuery SQL and continuous predictive regressions.',
      achievements: [
        'Gained competencies in BigQuery SQL and high-density Tableau dashboards.',
        'Obtained professional badge for IBM RAG & Agentic AI workflows.',
        'Structured predictive analytics engines resolving database bottlenecks.'
      ],
      photoCaption: 'Vector visualization of the dual BigQuery database cluster node mapping.',
      photoType: 'cert',
      vibeColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'placement',
      title: 'Placement Preparation',
      subtitle: 'Mastering SDE Sprints & Algorithms',
      period: '2024 — 2025',
      icon: Zap,
      description: 'Practiced hundreds of structured algorithms in Java and C++. Strengthened understanding of memory management, optimal time-complexities, and large-scale systemic software designs.',
      achievements: [
        'Completed comprehensive deep-dives into heap trees and dynamic graphs.',
        'Solved hundreds of algorithmic challenges across SDE registries.',
        'Refined resume structures to satisfy rigorous industrial standards.'
      ],
      photoCaption: 'Flowchart tracking recursive sorting trees and pointer assignments.',
      photoType: 'placement',
      vibeColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 'goals',
      title: 'Future Career Goals',
      subtitle: 'Expanding Agentic & Local Intelligence',
      period: '2025+',
      icon: Target,
      description: 'Aimed to author modular open-source repositories and construct secure, local-first intelligence clusters. Pioneering predictive integrations that merge deep statistics with Apple-grade UX layouts.',
      achievements: [
        'Designing zero-dependency local vector indexes with high storage retention.',
        'Expanding personal systems to handle multi-agent decision chains.',
        'Promoting transparent, accessible software across technical communities.'
      ],
      photoCaption: 'Concept layout of Manamoy\'s next-gen autonomous LLM agent workflow.',
      photoType: 'future',
      vibeColor: 'from-teal-500 to-emerald-500'
    }
  ];

  // Render simulated high-fidelity photo SVGs to satisfy "include photos and achievements"
  const renderSimulatedPhoto = (type: string) => {
    switch(type) {
      case 'school':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#02040a' : '#f1f5f9'} />
            <g opacity={theme === 'aurora' ? "0.15" : "0.4"} stroke={theme === 'aurora' ? "#4f46e5" : "#cbd5e1"} strokeWidth="1">
              <path d="M0,50 h400 M0,100 h400 M0,150 h400 M0,200 h400 M0,250 h400" />
              <path d="M50,0 v300 M100,0 v300 M150,0 v300 M200,0 v300 M250,0 v300 M300,0 v300 M350,0 v300" />
            </g>
            <circle cx="200" cy="150" r="80" fill="none" stroke={theme === 'aurora' ? "#4f46e5" : "#3b82f6"} strokeWidth="1.5" strokeDasharray="4,4" />
            <circle cx="200" cy="150" r="40" fill="none" stroke={theme === 'aurora' ? "#818cf8" : "#2563eb"} strokeWidth="2" />
            {/* Textbook formulas */}
            <text x="180" y="155" fill={theme === 'aurora' ? "#818cf8" : "#1e3a8a"} fontSize="12" fontFamily="monospace" fontWeight="bold">∫ f(x)dx</text>
            <text x="50" y="70" fill={theme === 'aurora' ? "#4f46e5" : "#2563eb"} fontSize="10" fontFamily="monospace" fontWeight="bold">E = mc²</text>
            <text x="280" y="240" fill={theme === 'aurora' ? "#4f46e5" : "#2563eb"} fontSize="10" fontFamily="monospace" fontWeight="bold">F = ma</text>
            {/* Whiteboard grid drawing */}
            <path d="M 120 150 L 200 110 L 280 150" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="120" cy="150" r="4" fill="#10b981" />
            <circle cx="200" cy="110" r="4" fill="#10b981" />
            <circle cx="280" cy="150" r="4" fill="#10b981" />
            <text x="190" y="100" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">Max Vector</text>
          </svg>
        );
      case 'basketball':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#0a0502' : '#fff7ed'} />
            <path d="M -50 150 Q 100 20 200 150 T 450 150" fill="none" stroke="#ff6b35" strokeWidth="2" strokeOpacity={theme === 'aurora' ? "0.4" : "0.2"} />
            <path d="M -50 150 Q 100 280 200 150 T 450 150" fill="none" stroke="#ff6b35" strokeWidth="2" strokeOpacity={theme === 'aurora' ? "0.4" : "0.2"} />
            {/* Court layout markings */}
            <rect x="50" y="50" width="300" height="200" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity={theme === 'aurora' ? "0.3" : "0.4"} />
            <circle cx="200" cy="150" r="50" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity={theme === 'aurora' ? "0.3" : "0.4"} />
            <path d="M 50 150 A 50 50 0 0 0 150 150" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity={theme === 'aurora' ? "0.3" : "0.4"} />
            <path d="M 350 150 A 50 50 0 0 0 250 150" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity={theme === 'aurora' ? "0.3" : "0.4"} />
            {/* Schematic plays */}
            <circle cx="140" cy="110" r="6" fill="none" stroke="#ea580c" strokeWidth="2" />
            <text x="137" y="114" fill="#ea580c" fontSize="10" fontFamily="sans-serif" fontWeight="bold">X</text>
            <circle cx="180" cy="170" r="6" fill="none" stroke="#ea580c" strokeWidth="2" />
            <text x="177" y="174" fill="#ea580c" fontSize="10" fontFamily="sans-serif" fontWeight="bold">X</text>
            <circle cx="260" cy="130" r="6" fill="none" stroke="#16a34a" strokeWidth="2" />
            <text x="257" y="134" fill="#16a34a" fontSize="10" fontFamily="sans-serif" fontWeight="bold">O</text>
            {/* Passing vector dashed line */}
            <path d="M 146 114 Q 200 110 254 126" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5" />
            <polygon points="255,127 247,122 250,131" fill="#2563eb" />
          </svg>
        );
      case 'coding':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#020804' : '#f0fdf4'} />
            <g opacity={theme === 'aurora' ? "0.3" : "0.8"} stroke="#22c55e" strokeWidth="0.5" fontFamily="monospace" fontSize="8" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>
              <text x="20" y="30" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`>>> import sys`}</text>
              <text x="20" y="45" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`>>> def compute_growth(x):`}</text>
              <text x="40" y="60" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`return (x * 12.8) / 0.15`}</text>
              <text x="20" y="75" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`>>> print(compute_growth(100))`}</text>
              <text x="20" y="90" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`8533.333333333333`}</text>
              <text x="20" y="120" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`SYS_INIT_SEQUENCE // COMPLETE`}</text>
              <text x="20" y="135" fill={theme === 'aurora' ? "#10b981" : "#15803d"}>{`IP_ADD 127.0.0.1 // DEV_STAGE`}</text>
            </g>
            {/* Visual retro monitor shape */}
            <rect x="100" y="160" width="200" height="100" rx="10" fill="none" stroke="#22c55e" strokeWidth="2" />
            <rect x="105" y="165" width="190" height="90" rx="5" fill="#15803d" fillOpacity="0.2" />
            <path d="M 200 260 L 200 280 M 150 280 L 250 280" stroke="#22c55e" strokeWidth="2" />
            <text x="140" y="210" fill={theme === 'aurora' ? "#22c55e" : "#166534"} fontSize="14" fontFamily="monospace" fontWeight="bold" className="animate-pulse">HELLO WORLD</text>
          </svg>
        );
      case 'project':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#020617' : '#f0f9ff'} />
            {/* DB schemas */}
            <rect x="50" y="50" width="100" height="85" rx="6" fill={theme === 'aurora' ? "#0f172a" : "#ffffff"} stroke="#3b82f6" strokeWidth="1.5" />
            <text x="58" y="65" fill="#2563eb" fontSize="10" fontFamily="monospace" fontWeight="extrabold">TBL_PLAYERS</text>
            <path d="M 50 72 L 150 72" stroke="#3b82f6" strokeWidth="1" />
            <text x="58" y="85" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">PK | player_id [INT]</text>
            <text x="58" y="100" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">   | name [VARCHAR]</text>
            <text x="58" y="115" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">   | jersey_no [INT]</text>

            <rect x="250" y="160" width="100" height="85" rx="6" fill={theme === 'aurora' ? "#0f172a" : "#ffffff"} stroke="#10b981" strokeWidth="1.5" />
            <text x="258" y="175" fill="#059669" fontSize="10" fontFamily="monospace" fontWeight="extrabold">TBL_STATS</text>
            <path d="M 250 182 L 350 182" stroke="#10b981" strokeWidth="1" />
            <text x="258" y="195" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">PK | stat_id [INT]</text>
            <text x="258" y="210" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">FK | player_id [INT]</text>
            <text x="258" y="225" fill={theme === 'aurora' ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">   | points [INT]</text>

            {/* Relationship line */}
            <path d="M 150 92 L 200 92 L 200 202 L 250 202" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="150" cy="92" r="3" fill="#d97706" />
            <circle cx="250" cy="202" r="3" fill="#d97706" />
            <text x="175" y="145" fill="#d97706" fontSize="8" fontFamily="monospace" fontWeight="bold">1 : N</text>
          </svg>
        );
      case 'ai':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#07020d' : '#fdf2f8'} />
            {/* Multi-layered neural nodes visual */}
            <g stroke="#db2777" strokeWidth="0.5" strokeOpacity={theme === 'aurora' ? "0.4" : "0.7"}>
              {/* Layer 1 Nodes */}
              <line x1="100" y1="80" x2="200" y2="80" />
              <line x1="100" y1="80" x2="200" y2="150" />
              <line x1="100" y1="80" x2="200" y2="220" />
              <line x1="100" y1="150" x2="200" y2="80" />
              <line x1="100" y1="150" x2="200" y2="150" />
              <line x1="100" y1="150" x2="200" y2="220" />
              <line x1="100" y1="220" x2="200" y2="80" />
              <line x1="100" y1="220" x2="200" y2="150" />
              <line x1="100" y1="220" x2="200" y2="220" />
              
              {/* Layer 2 Nodes */}
              <line x1="200" y1="80" x2="300" y2="115" />
              <line x1="200" y1="80" x2="300" y2="185" />
              <line x1="200" y1="150" x2="300" y2="115" />
              <line x1="200" y1="150" x2="300" y2="185" />
              <line x1="200" y1="220" x2="300" y2="115" />
              <line x1="200" y1="220" x2="300" y2="185" />
            </g>
            {/* Draw overlay nodes */}
            <circle cx="100" cy="80" r="8" fill="#db2777" />
            <circle cx="100" cy="150" r="8" fill="#db2777" />
            <circle cx="100" cy="220" r="8" fill="#db2777" />
            
            <circle cx="200" cy="80" r="8" fill="#9333ea" />
            <circle cx="200" cy="150" r="8" fill="#9333ea" />
            <circle cx="200" cy="220" r="8" fill="#9333ea" />
            
            <circle cx="300" cy="115" r="8" fill="#e11d48" />
            <circle cx="300" cy="185" r="8" fill="#e11d48" />
            
            <text x="80" y="270" fill="#db2777" fontSize="10" fontFamily="monospace" fontWeight="bold">INPUT_DIM: [3]</text>
            <text x="250" y="270" fill="#9333ea" fontSize="10" fontFamily="monospace" fontWeight="bold">LOSS: 0.012</text>
          </svg>
        );
      case 'research':
        return (
          <div className={`w-full h-full flex items-center justify-center overflow-hidden ${theme === 'aurora' ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <img 
              src="/src/assets/images/journey_milestone_1781818898998.jpg" 
              alt="SRM presentation milestone" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'cert':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#0e0a02' : '#fffbeb'} />
            <g opacity={theme === 'aurora' ? "0.15" : "0.5"} stroke="#d97706" strokeWidth="1">
              <polygon points="200,50 350,150 200,250 50,150" fill="none" />
            </g>
            {/* Center concentric target matrix */}
            <circle cx="200" cy="150" r="60" fill="none" stroke="#d97706" strokeWidth="2" />
            <circle cx="200" cy="150" r="40" fill="none" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="20" fill="none" stroke="#ea580c" strokeWidth="1" />
            {/* Concentric node connectors */}
            <g stroke="#d97706" strokeWidth="1.5">
              <line x1="200" y1="90" x2="200" y2="70" />
              <line x1="200" y1="210" x2="200" y2="230" />
              <line x1="260" y1="150" x2="280" y2="150" />
              <line x1="140" y1="150" x2="120" y2="150" />
            </g>
            <circle cx="200" cy="70" r="5" fill="#ea580c" />
            <circle cx="200" cy="230" r="5" fill="#ea580c" />
            <circle cx="280" cy="150" r="5" fill="#4f46e5" />
            <circle cx="120" cy="150" r="5" fill="#4f46e5" />
            
            <text x="145" y="275" fill="#d97706" fontSize="12" fontFamily="sans-serif" fontWeight="black">COGNIZANT PIPELINE</text>
          </svg>
        );
      case 'placement':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#0c0307' : '#fff1f2'} />
            {/* Binary Search Tree visual */}
            <g stroke="#db2777" strokeWidth="2">
              <line x1="200" y1="50" x2="120" y2="110" />
              <line x1="200" y1="50" x2="280" y2="110" />
              <line x1="120" y1="110" x2="70" y2="180" />
              <line x1="120" y1="110" x2="170" y2="180" />
              <line x1="280" y1="110" x2="230" y2="180" />
              <line x1="280" y1="110" x2="330" y2="180" />
            </g>
            {/* Node markers */}
            <circle cx="200" cy="50" r="14" fill={theme === 'aurora' ? "#1e1b4b" : "#ffffff"} stroke="#db2777" strokeWidth="2" />
            <text x="194" y="54" fill="#db2777" fontSize="10" fontFamily="monospace" fontWeight="bold">99</text>

            <circle cx="120" cy="110" r="14" fill={theme === 'aurora' ? "#1e1b4b" : "#ffffff"} stroke="#db2777" strokeWidth="2" />
            <text x="114" y="114" fill="#db2777" fontSize="10" fontFamily="monospace" fontWeight="bold">24</text>

            <circle cx="280" cy="110" r="14" fill={theme === 'aurora' ? "#1e1b4b" : "#ffffff"} stroke="#db2777" strokeWidth="2" />
            <text x="274" y="114" fill="#db2777" fontSize="10" fontFamily="monospace" fontWeight="bold">150</text>

            <circle cx="70" cy="180" r="12" fill={theme === 'aurora' ? "#020617" : "#ffffff"} stroke="#2563eb" strokeWidth="1.5" />
            <text x="66" y="184" fill="#2563eb" fontSize="8" fontFamily="monospace" fontWeight="bold">11</text>

            <circle cx="170" cy="180" r="12" fill={theme === 'aurora' ? "#020617" : "#ffffff"} stroke="#2563eb" strokeWidth="1.5" />
            <text x="166" y="184" fill="#2563eb" fontSize="8" fontFamily="monospace" fontWeight="bold">35</text>

            <circle cx="230" cy="180" r="12" fill={theme === 'aurora' ? "#020617" : "#ffffff"} stroke="#2563eb" strokeWidth="1.5" />
            <text x="225" y="184" fill="#2563eb" fontSize="8" fontFamily="monospace" fontWeight="bold">110</text>

            <circle cx="330" cy="180" r="12" fill={theme === 'aurora' ? "#020617" : "#ffffff"} stroke="#2563eb" strokeWidth="1.5" />
            <text x="325" y="184" fill="#2563eb" fontSize="8" fontFamily="monospace" fontWeight="bold">400</text>

            <text x="40" y="260" fill="#db2777" fontSize="10" fontFamily="monospace" fontWeight="bold">TIME_COMPLEXITY: O(log N)</text>
            <text x="240" y="260" fill="#2563eb" fontSize="10" fontFamily="monospace" fontWeight="bold">SDE_PREP_STATUS: SPRINT_9</text>
          </svg>
        );
      default:
        // Future representation
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill={theme === 'aurora' ? '#020d08' : '#f0fdf4'} />
            <g opacity={theme === 'aurora' ? "0.1" : "0.3"} stroke="#10b981" strokeWidth="0.5">
              <line x1="0" y1="0" x2="400" y2="300" />
              <line x1="400" y1="0" x2="0" y2="300" />
            </g>
            {/* Decentralized modular layout flow block */}
            <rect x="50" y="90" width="80" height="60" rx="8" fill={theme === 'aurora' ? "#064e3b" : "#d1fae5"} fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
            <text x="58" y="115" fill={theme === 'aurora' ? "#10b981" : "#047857"} fontSize="9" fontFamily="monospace" fontWeight="black">USER_INTENT</text>
            <text x="58" y="130" fill={theme === 'aurora' ? "#6ee7b7" : "#065f46"} fontSize="7" fontFamily="monospace">Parsing vector</text>
            
            <rect x="270" y="90" width="80" height="60" rx="8" fill={theme === 'aurora' ? "#1e1b4b" : "#e0e7ff"} fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
            <text x="278" y="115" fill={theme === 'aurora' ? "#818cf8" : "#4338ca"} fontSize="9" fontFamily="monospace" fontWeight="black">REASON_GEN</text>
            <text x="278" y="130" fill={theme === 'aurora' ? "#a5b4fc" : "#312e81"} fontSize="7" fontFamily="monospace">Fitted logic</text>
            
            {/* Core orchestrator block */}
            <circle cx="200" cy="180" r="30" fill={theme === 'aurora' ? "#030712" : "#fffbeb"} stroke="#f59e0b" strokeWidth="2" />
            <text x="180" y="184" fill="#ea580c" fontSize="10" fontFamily="monospace" fontWeight="black">EXEC_API</text>

            <path d="M 130 120 Q 200 90 270 120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            <path d="M 270 140 L 225 165" stroke="#10b981" strokeWidth="1.5" />
            <path d="M 175 165 L 130 140" stroke="#6366f1" strokeWidth="1.5" />
            
            <text x="140" y="270" fill={theme === 'aurora' ? "#10b981" : "#047857"} fontSize="10" fontFamily="monospace" fontWeight="bold">AUTONOMOUS MULTI-AGENT</text>
          </svg>
        );
    }
  };

  const activeMilestone = milestones.find(m => m.id === selectedMilestone) || milestones[0];
  const IconComponent = activeMilestone.icon;

  return (
    <div className="space-y-12 py-4 animate-fade-in" id="career-journey">
      
      {/* 1. HERO HEADER AREA with deep tech styling */}
      <div 
        className="rounded-3xl border p-8 sm:p-10 relative overflow-hidden shadow-xl transition-all duration-300" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor 
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        <div className="relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/25 text-indigo-600 dark:text-indigo-400">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-extrabold text-[10px]">Curated Development Narrative</span>
          </span>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight" style={{ color: colors.text }}>
            My Journey
          </h2>
          <p className="text-sm max-w-2xl font-semibold leading-relaxed" style={{ color: colors.mutedText }}>
            A chronological retrospective charting my engineering evolution — from competitive basketball court strategies, through foundational computer science and diagnostic computer vision, leading into full-scale artificial intelligence models.
          </p>
        </div>
      </div>

      {/* 2. CORE INTERACTIVE CONTAINER - GRID OF PERSPECTIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar: Animated Node timeline switcher (5 Columns) */}
        <div 
          className="lg:col-span-5 space-y-4 p-4 sm:p-6 rounded-3xl border relative overflow-hidden transition-colors" 
          style={{ 
            backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.4)' : 'rgba(15, 23, 42, 0.02)',
            borderColor: colors.borderColor 
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2.5xl bg-indigo-500/5 pointer-events-none" />
          <div className="pb-3 border-b border-dashed flex justify-between items-center" style={{ borderColor: colors.borderColor }}>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold block">
              Chronological milestones
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/20">
              Interactive Index
            </span>
          </div>

          <div className="relative pl-6 space-y-3 pt-2">
            {/* Timeline graphical wire track */}
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-300 dark:bg-slate-800 pointer-events-none" />

            {milestones.map((m) => {
              const MIcon = m.icon;
              const isSelected = selectedMilestone === m.id;
              
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMilestone(m.id);
                    setFlippedPhoto(null); // Reset flipped photo card on milestone change
                  }}
                  className="w-full text-left relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group cursor-pointer border"
                  style={{
                    backgroundColor: isSelected 
                      ? (theme === 'aurora' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)')
                      : 'transparent',
                    borderColor: isSelected ? colors.primary : 'transparent'
                  }}
                >
                  {/* Timeline point node */}
                  <div 
                    className={`absolute -left-[20px] w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center transition-all ${
                      isSelected ? 'border-indigo-600 dark:border-indigo-500 scale-110' : 'border-slate-300 dark:border-slate-800'
                    }`}
                    style={{ backgroundColor: theme === 'aurora' ? '#080B14' : '#ffffff' }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-transparent'}`} />
                  </div>

                  <div 
                    className="p-2.5 rounded-xl border flex items-center justify-center shrink-0 transition-transform"
                    style={{
                      backgroundColor: isSelected 
                        ? 'rgba(99, 102, 241, 0.1)' 
                        : (theme === 'aurora' ? '#0f172a' : '#f1f5f9'),
                      borderColor: isSelected 
                        ? 'rgba(99, 102, 241, 0.3)' 
                        : colors.borderColor
                    }}
                  >
                    <MIcon className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <span className="text-[10px] font-mono font-bold block" style={{ color: colors.mutedText }}>{m.period}</span>
                    <h4 className="text-sm font-black leading-tight truncate mt-0.5" style={{ color: colors.text }}>
                      {m.title}
                    </h4>
                    <span className="text-[11px] font-bold truncate block mt-0.5" style={{ color: colors.mutedText }}>{m.subtitle}</span>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform text-slate-500 shrink-0 ${isSelected ? 'translate-x-0.5 text-indigo-600 dark:text-indigo-400 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Details Stage Visualizer (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Showcase Panel */}
          <div 
            className="rounded-3xl border p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all duration-300"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.cardBg 
            }}
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-dashed" style={{ borderColor: colors.borderColor }}>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400">
                  <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>{activeMilestone.period} // STAGE_NODE</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1" style={{ color: colors.text }}>
                  {activeMilestone.title}
                </h3>
                <span className="text-xs font-bold block" style={{ color: colors.mutedText }}>{activeMilestone.subtitle}</span>
              </div>

              {/* Graphical milestone index marker */}
              <div 
                className="p-3 rounded-2xl border flex items-center justify-center font-mono text-xs shrink-0 transition-colors" 
                style={{ 
                  backgroundColor: theme === 'aurora' ? '#0f172a' : '#f8fafc',
                  borderColor: colors.borderColor 
                }}
              >
                <span style={{ color: colors.mutedText }}>INDEX.ID // </span>
                <span className="font-black text-indigo-600 dark:text-indigo-400 ml-1">.{activeMilestone.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm font-semibold leading-relaxed font-sans max-w-full" style={{ color: colors.text }}>
              {activeMilestone.description}
            </p>

            {/* Key Accomplishments Bullet Blocks */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Key Achievements & Experiences
              </span>
              <div className="space-y-2">
                {activeMilestone.achievements.map((ach, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3 border rounded-xl hover:scale-101 transition-all"
                    style={{ 
                      backgroundColor: theme === 'aurora' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.02)',
                      borderColor: colors.borderColor 
                    }}
                  >
                    <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                      0{idx + 1}
                    </span>
                    <p className="text-sm font-semibold pt-0.5 leading-relaxed" style={{ color: colors.text }}>{ach}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Polaroid Photos, Achievements & Memories segment (Flipper Card) */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-extrabold block">
                  Media & Memory Notebook
                </span>
                <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                  <Info className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  Click memory to reveal details
                </span>
              </div>

              {/* The Flipart memory board */}
              <div 
                onClick={() => setFlippedPhoto(flippedPhoto === activeMilestone.id ? null : activeMilestone.id)}
                className="w-full h-72 rounded-2xl border relative cursor-pointer overflow-hidden group select-none shadow-md transition-shadow hover:shadow-indigo-500/5"
                style={{ borderColor: colors.borderColor }}
              >
                {flippedPhoto !== activeMilestone.id ? (
                  /* Front side: The Polaroid simulated vector image */
                  <div className="absolute inset-0 flex flex-col h-full bg-white p-3 sm:p-4 text-slate-800 transition-all duration-300 transform group-hover:scale-[0.99] hover:bg-slate-50">
                    <div className={`flex-1 rounded-lg overflow-hidden border border-slate-200 shadow-inner relative ${theme === 'aurora' ? 'bg-slate-950' : 'bg-slate-50'}`}>
                      {renderSimulatedPhoto(activeMilestone.photoType)}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 right-2 text-[8px] font-mono text-white bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded leading-none border border-white/5">
                        CAP_VAL
                      </span>
                    </div>
                    {/* The polaroid physical scribble bottom spacing */}
                    <div className="pt-3 pb-1 text-center font-mono font-bold text-xxs tracking-tight text-slate-500 line-clamp-1 italic px-2">
                      ✍️ "{activeMilestone.photoCaption}"
                    </div>
                  </div>
                ) : (
                  /* Back Side: The backstory memory notes */
                  <div 
                    className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300"
                    style={{ 
                      backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                      borderColor: colors.borderColor 
                    }}
                  >
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                        <MessageSquare className="w-3 h-3 block" />
                        Aesthetic Backstory context
                      </span>
                      <h4 className="text-sm font-black" style={{ color: colors.text }}>The Reflection behind "{activeMilestone.title}"</h4>
                      <p className="text-xs leading-relaxed font-semibold font-sans" style={{ color: colors.mutedText }}>
                        This specific milestone represents a crucial pivot point. In physical basketball arenas, I learned the importance of immediate, authoritative feedback loops, coordination under heavy score deficits, and standard performance metrics. Translating that identical conditioning into algorithmic complexities, compiling codes, and neural matrixes allows me to construct more resilient predictive layers.
                      </p>
                    </div>

                    <div className="border-t border-dashed pt-4 flex justify-between items-center text-[10px] font-mono font-bold" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
                      <span>RECORD_STAMP: VERIFIED</span>
                      <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        Return to Image
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Quick Nav Footer of Timeline */}
          <div className="flex justify-between items-center text-xs font-mono" style={{ color: colors.mutedText }}>
            <span>Milestone {milestones.findIndex(m => m.id === selectedMilestone) + 1} of {milestones.length}</span>
            <span>Created with high fidelity SVG vector simulation panels</span>
          </div>

        </div>

      </div>

    </div>
  );
};
