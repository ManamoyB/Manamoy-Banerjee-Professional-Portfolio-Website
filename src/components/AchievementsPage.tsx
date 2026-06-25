import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  Code, 
  Zap, 
  Users, 
  Calendar, 
  ExternalLink, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Share2,
  CheckCircle,
  FileCheck2,
  Tv,
  Milestone
} from 'lucide-react';

interface AchievementsPageProps {
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

interface Achievement {
  id: string;
  title: string;
  category: 'Academic' | 'Certification' | 'Technical' | 'Hackathon' | 'Sports' | 'Leadership';
  description: string;
  date: string;
  proofType: 'certificate' | 'gpa' | 'code' | 'hack_trophy' | 'sports_medal' | 'leadership_chart';
  verificationLink?: string;
  featured?: boolean;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ colors, theme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Expanded high fidelity structured achievements list satisfying user goals
  const achievementsList: Achievement[] = [
    {
      id: 'state-basketball',
      title: 'State Level Basketball Championship Representative',
      category: 'Sports',
      description: 'Handpicked to lead the district varsity basketball roster in high-stakes State Level Division Qualifiers. Directed play-calls, coached point guard dynamics, and led scoring metrics during crucial final quarters.',
      date: '2020-11',
      proofType: 'sports_medal',
      featured: true,
      verificationLink: 'https://manamoybanerjee.com/sports-verify'
    },
    {
      id: 'cgpa-excellence',
      title: 'Academic Achievement: Top Tier CGPA',
      category: 'Academic',
      description: 'Earning a cumulative GPA of 8.20/10 in Computer Science and Engineering at SRM Institute. Gained distinct qualifications in advanced Neural Structures, Machine Learning systems, and Algorithms.',
      date: '2021 — 2025',
      proofType: 'gpa',
      featured: false,
      verificationLink: '#'
    },
    {
      id: 'hackathon-winner',
      title: 'Rank 1: SRM Inter-Departmental AI Hackathon',
      category: 'Hackathon',
      description: 'Constructed an offline agricultural pathology diagnostic model utilizing mobile-optimized convolutional neural networks. Bested several competing teams by mapping rapid predictive inference in real-time.',
      date: '2023-11',
      proofType: 'hack_trophy',
      featured: true,
      verificationLink: '#'
    },
    {
      id: 'dual-certification',
      title: 'Google & IBM Professional Analytics Credentials',
      category: 'Certification',
      description: 'Completed comprehensive credentials crossing both BigQuery data warehouse architectures (Google Business Intelligence) and Python statistical regression modules (IBM Advanced Data Analytics).',
      date: '2024-11',
      proofType: 'certificate',
      featured: false,
      verificationLink: 'https://www.credly.com/org/ibm'
    },
    {
      id: 'automation-reduction',
      title: 'Automated Academic File Parsing Workflows',
      category: 'Technical',
      description: 'Custom engineered an asynchronous file parser for departmental record registries. Successfully compressed structural operations time-vectors from 12 overall labor hours down to 8 digital minutes flat.',
      date: '2024-03',
      proofType: 'code',
      featured: false,
      verificationLink: 'https://github.com/manamoybanerjee/automation'
    },
    {
      id: 'srm-tech-excellence',
      title: 'Recipient: SRM Technical Excellence Badge',
      category: 'Academic',
      description: 'Decorated with the official SRM Special Badge in recognition of outstanding individual contributions to academic machine learning research and student coding labs.',
      date: '2024-08',
      proofType: 'certificate',
      featured: false,
      verificationLink: '#'
    },
    {
      id: 'kaggle-rankings',
      title: 'Ranked in Top 5% of Global Kaggle Competitors',
      category: 'Technical',
      description: 'Built and submitted hybrid boosting and gradient ensemble pipelines for several high-dimensional global regression and classification trials, maintaining top tiered status listings.',
      date: '2024-05',
      proofType: 'code',
      featured: false,
      verificationLink: 'https://kaggle.com'
    },
    {
      id: 'peer-leadership',
      title: 'Technical Director & Hackathon Team Captain',
      category: 'Leadership',
      description: 'Supervised algorithmic task sprints and repository deployment timelines for cross-disciplinary engineering teams, coordinating tasks across major university hackathons.',
      date: '2023-09',
      proofType: 'leadership_chart',
      featured: false,
      verificationLink: '#'
    },
    {
      id: 'basketball-captaincy',
      title: 'Varsity Team Captain: 3x Consecutive Titles',
      category: 'Sports',
      description: 'Appointed captain of high-school varsity basketball roster. Mentored bench divisions and coordinated high-intensity playbooks, securing three back-to-back city championship cups.',
      date: '2019-12',
      proofType: 'sports_medal',
      featured: false,
      verificationLink: '#'
    }
  ];

  // Search, filter, and sort chronologically (most recent first)
  const processedAchievements = useMemo(() => {
    let list = [...achievementsList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    if (selectedFilterCategory !== 'All') {
      list = list.filter((a) => a.category === selectedFilterCategory);
    }

    // Sort chronologically (most recent first)
    list.sort((a, b) => b.date.localeCompare(a.date));

    return list;
  }, [searchQuery, selectedFilterCategory]);

  // Compute stats counters for Achievement Counter
  const stats = useMemo(() => {
    const list = achievementsList;
    return {
      total: list.length,
      academic: list.filter(a => a.category === 'Academic').length,
      technical: list.filter(a => a.category === 'Technical' || a.category === 'Hackathon').length,
      sports: list.filter(a => a.category === 'Sports').length,
      leadership: list.filter(a => a.category === 'Leadership').length
    };
  }, []);

  const getCategoryColor = (cat: string) => {
    const isDark = theme === 'aurora';
    switch (cat) {
      case 'Academic': return isDark ? 'text-blue-400 bg-blue-500/5 border-blue-500/25' : 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Technical': return isDark ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/25' : 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Hackathon': return isDark ? 'text-purple-400 bg-purple-500/5 border-purple-500/25' : 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Sports': return isDark ? 'text-orange-400 bg-orange-500/5 border-orange-500/25' : 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Certification': return isDark ? 'text-amber-400 bg-amber-500/5 border-amber-500/25' : 'text-amber-700 bg-amber-50 border-amber-200';
      default: return isDark ? 'text-cyan-400 bg-cyan-500/5 border-cyan-500/25' : 'text-cyan-700 bg-cyan-50 border-cyan-200';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Academic': return BookOpen;
      case 'Technical': return Code;
      case 'Hackathon': return Zap;
      case 'Sports': return Trophy;
      case 'Certification': return Award;
      default: return Users;
    }
  };

  // Render high fidelity vector "Proof SVG Mockups" to satisfying "Cards contain: Proof Image"
  const renderProofImage = (type: string) => {
    const isDark = theme === 'aurora';
    const bgStyle = {
      backgroundColor: isDark ? '#020617' : '#ffffff',
      borderColor: colors.borderColor
    };

    switch(type) {
      case 'sports_medal':
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            {/* Ambient vector lights */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-amber-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-amber-400 overflow-visible drop-shadow-md">
              {/* Stand podium mockup */}
              <rect x="50" y="90" width="60" height="15" rx="2" fill={isDark ? "#1e293b" : "#e2e8f0"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1" />
              <text x="76" y="101" fill={isDark ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">IST</text>
              
              {/* Medal Shape */}
              <circle cx="80" cy="50" r="22" fill="#ea580c" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="80" cy="50" r="16" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
              <text x="76" y="55" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">★</text>
              
              {/* Medal Ribbon */}
              <polygon points="65,15 80,32 95,15 88,-5 72,-5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
              <line x1="80" y1="-5" x2="80" y2="32" stroke="#facc15" strokeWidth="2" />
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(234, 88, 12, 0.08)' : 'rgba(234, 88, 12, 0.05)',
                borderColor: isDark ? 'rgba(234, 88, 12, 0.25)' : 'rgba(234, 88, 12, 0.2)',
                color: isDark ? '#f97316' : '#ea580c'
              }}
            >
              STATE QUAL LEVEL
            </span>
          </div>
        );
      case 'gpa':
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-blue-400 overflow-visible drop-shadow">
              {/* Academic Cap Outline */}
              <polygon points="80,25 130,45 80,65 30,45" fill={isDark ? "#1e1b4b" : "#dbeafe"} stroke="#3b82f6" strokeWidth="2" />
              <polygon points="50,53 50,75 80,85 110,75 110,53" fill="none" stroke="#3b82f6" strokeWidth="2" />
              {/* Diploma Scroll */}
              <rect x="60" y="80" width="40" height="10" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5" />
              <rect x="75" y="80" width="10" height="10" fill="#ef4444" />
              {/* CGPA display text */}
              <text x="56" y="110" fill={isDark ? "#60a5fa" : "#1e4ed8"} fontSize="11" fontFamily="monospace" fontWeight="black">CGPA 8.20/10</text>
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(37, 99, 235, 0.05)',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.2)',
                color: isDark ? '#60a5fa' : '#2563eb'
              }}
            >
              SRM CSE SPEC
            </span>
          </div>
        );
      case 'hack_trophy':
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-pink-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-purple-400 overflow-visible drop-shadow">
              {/* Trophy Shape */}
              <path d="M50,25 h60 v30 c0,15 -10,25 -30,25 s-30,-10 -30,-25 Z" fill={isDark ? "#1e1b4b" : "#f3e8ff"} stroke="#a855f7" strokeWidth="2.5" />
              <rect x="73" y="80" width="14" height="20" fill={isDark ? "#0f172a" : "#faf5ff"} stroke="#a855f7" strokeWidth="1.5" />
              <rect x="60" y="100" width="40" height="10" rx="2" fill={isDark ? "#581c87" : "#e9d5ff"} stroke="#d946ef" strokeWidth="2" />
              {/* Glowing star */}
              <text x="73" y="52" fill="#d946ef" fontSize="16" fontWeight="bold">★</text>
              {/* Handles */}
              <path d="M50,35 h-10 v15 c0,5 5,10 10,10" fill="none" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M110,35 h10 v15 c0,5 -5,10 -10,10" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(147, 51, 234, 0.05)',
                borderColor: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(147, 51, 234, 0.2)',
                color: isDark ? '#c084fc' : '#7e22ce'
              }}
            >
              RANK 1 AI HACK
            </span>
          </div>
        );
      case 'code':
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 via-teal-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-emerald-400 overflow-visible drop-shadow">
              {/* Grid representation */}
              <g opacity="0.3" stroke="#10b981" strokeWidth="0.5">
                <line x1="10" y1="20" x2="150" y2="20" />
                <line x1="10" y1="40" x2="150" y2="40" />
                <line x1="10" y1="60" x2="150" y2="60" />
                <line x1="10" y1="80" x2="150" y2="80" />
              </g>
              {/* Terminal code snippet brackets */}
              <text x="45" y="55" fill={isDark ? "#10b981" : "#059669"} fontSize="14" fontFamily="monospace" fontWeight="bold">&lt; / &gt;</text>
              <text x="35" y="75" fill={isDark ? "#6ee7b7" : "#047857"} fontSize="8" fontFamily="monospace">EXEC_TIME: -98.8%</text>
              <rect x="25" y="90" width="110" height="15" rx="3" fill={isDark ? "#042f1a" : "#ecfdf5"} fillOpacity={isDark ? "0.4" : "0.9"} stroke="#10b981" strokeWidth="1" />
              <circle cx="35" cy="97" r="2.5" fill="#ef4444" />
              <circle cx="43" cy="97" r="2.5" fill="#fbbf24" />
              <circle cx="51" cy="97" r="2.5" fill="#22c55e" />
              <text x="62" y="100" fill={isDark ? "#10b981" : "#047857"} fontSize="6.5" fontFamily="monospace">REDUCED: 12h-&gt;8m</text>
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(5, 150, 105, 0.05)',
                borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(5, 150, 105, 0.2)',
                color: isDark ? '#34d399' : '#059669'
              }}
            >
              OPTIM PARSE ENGINE
            </span>
          </div>
        );
      case 'leadership_chart':
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 via-light-blue-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-cyan-400 overflow-visible drop-shadow">
              {/* Agile burndown style metric vector */}
              <polyline points="20,100 50,70 80,85 110,40 140,25" fill="none" stroke={isDark ? "#22d3ee" : "#0891b2"} strokeWidth="2.5" />
              {/* Scatter nodes */}
              <circle cx="20" cy="100" r="4" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "#22d3ee" : "#0891b2"} strokeWidth="1.5" />
              <circle cx="50" cy="70" r="4" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "#22d3ee" : "#0891b2"} strokeWidth="1.5" />
              <circle cx="80" cy="85" r="4" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "#22d3ee" : "#0891b2"} strokeWidth="1.5" />
              <circle cx="110" cy="40" r="4" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "#22d3ee" : "#0891b2"} strokeWidth="1.5" />
              <circle cx="140" cy="25" r="4" fill={isDark ? "#22d3ee" : "#0891b2"} />
              <text x="110" y="20" fill={isDark ? "#22d3ee" : "#0891b2"} fontSize="7.5" fontFamily="monospace">DELIVERY STATUS</text>
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.05)',
                borderColor: isDark ? 'rgba(6, 182, 212, 0.25)' : 'rgba(8, 145, 178, 0.2)',
                color: isDark ? '#22d3ee' : '#0891b2'
              }}
            >
              SPRINT CAPTAIN
            </span>
          </div>
        );
      default:
        // certificate
        return (
          <div 
            className="w-full h-32 border rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors"
            style={bgStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 via-orange-500/5 to-transparent pointer-events-none" />
            <svg viewBox="0 0 160 120" className="w-24 h-24 text-amber-500 overflow-visible drop-shadow">
              {/* Certificate Border decoration frame */}
              <rect x="25" y="20" width="112" height="80" fill={isDark ? "#1e1b4b" : "#fffbeb"} fillOpacity={isDark ? "0.3" : "0.9"} stroke="#d97706" strokeWidth="1.5" />
              <rect x="30" y="25" width="102" height="70" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3,3" />
              {/* Certificate content outline */}
              <line x1="45" y1="40" x2="115" y2="40" stroke="#f59e0b" strokeWidth="2" />
              <line x1="50" y1="50" x2="110" y2="50" stroke={isDark ? "#94a3b8" : "#4b5563"} strokeWidth="1.5" />
              <line x1="40" y1="62" x2="120" y2="62" stroke={isDark ? "#94a3b8" : "#4b5563"} strokeWidth="1" />
              <line x1="55" y1="72" x2="105" y2="72" stroke={isDark ? "#94a3b8" : "#4b5563"} strokeWidth="1" />
              {/* Seal Stamp */}
              <circle cx="105" cy="80" r="9" fill="#ea580c" stroke="#f59e0b" strokeWidth="1" />
              <polygon points="105,80 102,94 108,94" fill="#ea580c" />
            </svg>
            <span 
              className="absolute bottom-1.5 left-2.5 text-[8px] font-mono tracking-widest border px-1.5 py-0.5 rounded font-black shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(217, 119, 6, 0.05)',
                borderColor: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.2)',
                color: isDark ? '#f59e0b' : '#d97706'
              }}
            >
              VERIFIED SEAL
            </span>
          </div>
        );
    }
  };

  const categories = ['All', 'Academic', 'Certification', 'Technical', 'Hackathon', 'Sports', 'Leadership'];

  // Identify state-level highlight for separate Featured Highlight Banner
  const stateBasketballHighlight = achievementsList.find(a => a.id === 'state-basketball') || achievementsList[0];

  return (
    <div className="space-y-12 py-4 animate-fade-in" id="achievements-section">
      
      {/* 1. HERO AREA with goals of "Show Proof" */}
      <div 
        className="rounded-3xl border p-8 relative overflow-hidden shadow-xl transition-all" 
        style={{ 
          borderColor: colors.borderColor,
          background: theme === 'aurora' 
            ? 'linear-gradient(to right, #0a0e1a, #03050c)' 
            : 'linear-gradient(to right, #f1f5f9, #f8fafc)'
        }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[110px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div className="space-y-3">
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase font-extrabold"
              style={{
                backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.08)',
                borderColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.25)',
                color: theme === 'aurora' ? '#818cf8' : '#4f46e5'
              }}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Academic & Extra-Curricular Honors</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
              Achievements & Recognition
            </h2>
            <p className="text-sm sm:text-base font-bold leading-relaxed max-w-xl" style={{ color: colors.mutedText }}>
              Consolidated certifications, technical contest triumphs, leadership matrices, and verified athletic championships validating real-world team coordination and problem mastery.
            </p>
          </div>

          {/* 2. HUD ACHIEVEMENT COUNTER HUD PANEL */}
          <div 
            className="flex flex-wrap gap-3 p-4 rounded-2xl border shrink-0 font-mono text-center shadow-sm"
            style={{ 
              backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.7)' : '#ffffff',
              borderColor: colors.borderColor
            }}
          >
            <div className="px-3">
              <span className="text-[10px] font-bold opacity-60 uppercase block" style={{ color: colors.text }}>Total Proofs</span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block mt-1">{stats.total}</span>
              <span className="text-[9px] font-bold block mt-0.5" style={{ color: colors.mutedText }}>Submissions</span>
            </div>
            <div className="border-l px-3" style={{ borderColor: colors.borderColor }}>
              <span className="text-[10px] font-bold opacity-60 uppercase block" style={{ color: colors.text }}>Academic</span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block mt-1">{stats.academic}</span>
              <span className="text-[9px] font-bold block mt-0.5" style={{ color: colors.mutedText }}>Accredited</span>
            </div>
            <div className="border-l px-3" style={{ borderColor: colors.borderColor }}>
              <span className="text-[10px] font-bold opacity-60 uppercase block" style={{ color: colors.text }}>Tech & Hacking</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block mt-1">{stats.technical}</span>
              <span className="text-[9px] font-bold block mt-0.5" style={{ color: colors.mutedText }}>Prototypes</span>
            </div>
            <div className="border-l px-3" style={{ borderColor: colors.borderColor }}>
              <span className="text-[10px] font-bold opacity-60 uppercase block" style={{ color: colors.text }}>Sports Level</span>
              <span className="text-2xl font-black text-orange-600 dark:text-orange-400 block mt-1">{stats.sports}</span>
              <span className="text-[9px] font-bold block mt-0.5" style={{ color: colors.mutedText }}>Cups Won</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED HIGHLIGHT BANNER: State Level Basketball & Hackathon Honors */}
      <div 
        className="rounded-3xl border relative overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center justify-between shadow-lg transition-all"
        style={{ 
          borderColor: colors.borderColor,
          background: theme === 'aurora' 
            ? 'linear-gradient(to right, rgba(234, 88, 12, 0.15), #020617)' 
            : 'linear-gradient(to right, rgba(249, 115, 22, 0.05), #ffffff)'
        }}
      >
        <div className="absolute top-0 left-0 w-44 h-44 rounded-full blur-[90px] bg-orange-500/10 pointer-events-none" />
        <div 
          className="flex items-center gap-4 shrink-0 border p-4 rounded-2xl shadow-sm"
          style={{
            backgroundColor: theme === 'aurora' ? 'rgba(234, 88, 12, 0.08)' : 'rgba(234, 88, 12, 0.06)',
            borderColor: colors.borderColor
          }}
        >
          <Trophy className="w-10 h-10 text-orange-600 dark:text-orange-400 drop-shadow" />
        </div>

        <div className="space-y-2 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span 
              className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm"
              style={{
                backgroundColor: theme === 'aurora' ? '#f97316' : '#ea580c',
                color: theme === 'aurora' ? '#020617' : '#ffffff'
              }}
            >
              Core Athletic Highlight
            </span>
            <span className="text-[10px] font-mono font-black uppercase text-orange-600 dark:text-orange-400">STATE RECON // 2020</span>
          </div>
          <h3 
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme === 'aurora' ? '#ffedd5' : '#ea580c' }}
          >
            {stateBasketballHighlight.title}
          </h3>
          <p className="text-sm font-bold leading-relaxed max-w-2xl" style={{ color: colors.mutedText }}>
            {stateBasketballHighlight.description}
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-col items-stretch md:items-end gap-2 text-right">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest hidden md:block" style={{ color: colors.mutedText }}>VERIFIED SPORT ROSTERAPPROVED</span>
          <a
            href={stateBasketballHighlight.verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-mono font-black uppercase shadow-md hover:shadow-lg bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all cursor-pointer"
          >
            <span>Execute Verification</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 4. SEARCHING & CATEGORY TIMELINE FILTERS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
        
        {/* Category timeline selector */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedFilterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilterCategory(cat)}
                className={`px-3.5 py-2.5 rounded-full border text-xs font-mono font-black transition-all cursor-pointer shadow-sm ${
                  isSelected 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  borderColor: isSelected ? colors.primary : colors.borderColor,
                  color: isSelected ? '#ffffff' : colors.text,
                  backgroundColor: !isSelected ? (theme === 'aurora' ? '#020617' : '#ffffff') : undefined
                }}
              >
                {cat === 'All' ? 'All Proofs' : cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Search box */}
        <div className="relative w-full md:w-72 leading-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search honors, titles description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border text-xs font-mono rounded-full focus:outline-none focus:border-indigo-500 outline-none shadow-inner"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
              color: colors.text
            }}
          />
        </div>
      </div>

      {/* 5. INTERACTIVE TIMELINE / GRID OF CARDS (Grid elements containing Proof Images) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedAchievements.map((item) => {
          const Icon = getCategoryIcon(item.category);
          return (
            <div
              key={item.id}
              className="rounded-2xl border backdrop-blur-md flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 transform hover:-translate-y-1"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor
              }}
            >
              {/* Featured Ribbon */}
              {item.featured && (
                <span className="absolute top-3 right-3 text-[9px] font-mono font-black uppercase tracking-widest bg-indigo-600 text-white px-2.5 py-1 rounded-full select-none shadow z-10">
                  Featured Honor
                </span>
              )}

              {/* Card Header Proof Image content */}
              <div 
                className="p-4 border-b relative transition-colors" 
                style={{ 
                  borderColor: colors.borderColor, 
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.4)' : '#f8fafc'
                }}
              >
                {renderProofImage(item.proofType)}
              </div>

              {/* Card central body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className={`inline-flex items-center gap-1 font-black uppercase tracking-wider ${getCategoryColor(item.category)} border rounded px-1.5 py-0.5 shadow-sm`}>
                      <Icon className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 font-bold" style={{ color: colors.mutedText }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-black transition-colors duration-200 line-clamp-2" style={{ color: colors.text }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold leading-normal pt-1.5" style={{ color: colors.mutedText }}>
                    {item.description}
                  </p>
                </div>

                {/* Card Action footer validation click */}
                <div className="pt-3.5 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
                  {item.verificationLink && item.verificationLink !== '#' ? (
                    <a
                      href={item.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono font-black rounded-lg border transition-all cursor-pointer hover:shadow-xs"
                      style={{
                        backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                        borderColor: colors.borderColor,
                        color: colors.text
                      }}
                    >
                      <span>Retrieve Verification</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono font-bold border border-transparent pb-1" style={{ color: colors.mutedText }}>
                      <FileCheck2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      <span>Verified Academic Ledger</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Fallback empty results state */}
      {processedAchievements.length === 0 && (
        <div className="text-center py-20 border border-dashed rounded-3xl" style={{ borderColor: colors.borderColor }}>
          <Zap className="w-12 h-12 text-slate-600 mx-auto opacity-50 mb-3 animate-bounce" />
          <h4 className="text-lg font-black text-slate-400">No achievements map matched</h4>
          <p className="text-xs font-bold mt-1 max-w-sm mx-auto" style={{ color: colors.mutedText }}>
            Try adjusting your search query, or clear filters to track verification matrices.
          </p>
        </div>
      )}

      {/* 6. ADVANCED INTERACTIVE TIMELINE LIST OF GENERAL HONORS */}
      <div className="p-6 sm:p-8 rounded-3xl border shadow-xl" style={{ borderColor: colors.borderColor, backgroundColor: colors.cardBg }}>
        <div className="border-b pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2" style={{ borderColor: colors.borderColor }}>
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-widest font-black block" style={{ color: colors.primary }}>
              Accredited Proof Log
            </span>
            <h3 className="text-lg font-black" style={{ color: colors.text }}>Chronological Ledger of Honors</h3>
          </div>
          <div className="text-[10px] font-mono font-bold border border-dashed p-1.5 px-2.5 rounded" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
            SYS.STATUS // PERSISTENT
          </div>
        </div>

        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/20 to-transparent pointer-events-none" />

          {achievementsList.map((item, idx) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div key={item.id} className="relative group flex flex-col sm:flex-row sm:items-center gap-3 transition-transform duration-200 hover:translate-x-1">
                {/* Node marker bullet */}
                <div 
                  className="absolute -left-[20px] w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center border-indigo-500 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                </div>

                <div className="w-24 shrink-0 font-mono text-xs font-black" style={{ color: colors.primary }}>
                  {item.date}
                </div>

                <div 
                  className="flex-1 border p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm" 
                  style={{ 
                    borderColor: colors.borderColor,
                    backgroundColor: theme === 'aurora' ? 'rgba(15, 23, 42, 0.4)' : '#ffffff'
                  }}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest select-none" style={{ color: colors.mutedText }}>
                      {item.category}
                    </span>
                    <h4 className="text-xs font-extrabold leading-normal block" style={{ color: colors.text }}>
                      {item.title}
                    </h4>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
