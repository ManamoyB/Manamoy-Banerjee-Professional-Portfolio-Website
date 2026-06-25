import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Percent, 
  Calendar, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Github, 
  Terminal, 
  Cpu, 
  BarChart, 
  Code, 
  Award, 
  Star, 
  Sparkles, 
  Zap, 
  ClipboardCheck, 
  PhoneCall, 
  FileCheck2,
  BookmarkPlus,
  Send,
  Sliders
} from 'lucide-react';

interface RecruiterPageProps {
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

export const RecruiterPage: React.FC<RecruiterPageProps> = ({ colors, theme }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [atsKeyword, setAtsKeyword] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<'email' | 'brief' | null>(null);

  // ATS Predefined Keywords to score
  const skillsRepository = [
    'python', 'sql', 'machine learning', 'data analysis', 'react', 'typescript', 
    'bigquery', 'tableau', 'pathology', 'algorithms', 'javascript', 'git', 'cnn'
  ];

  // Recruiter Pitch Highlights
  const summaries = [
    {
      metric: '8.20 / 10',
      label: 'Accredited CSE CGPA',
      info: 'SRM Institute of Science & Tech',
      vibe: 'from-blue-500 to-indigo-500'
    },
    {
      metric: 'Top 5%',
      label: 'Kaggle Global Competency',
      info: 'High-dimensional boosting trees',
      vibe: 'from-emerald-500 to-teal-500'
    },
    {
      metric: 'Immediate',
      label: 'Availability Window',
      info: 'Internships / FTE Opportunities',
      vibe: 'from-purple-500 to-pink-500'
    }
  ];

  const coreInterests = [
    { title: 'Data Analyst', status: 'Active Focus', desc: 'BigQuery queries, high-density data visualization, regression analytics pipelines.' },
    { title: 'ML Engineer', status: 'Active Focus', desc: 'Custom CNN networks, model optimization, agricultural diagnosis pathology datasets.' },
    { title: 'Software Engineer', status: 'Active Focus', desc: 'Reliable backend routes, modular frontend styling, performant state architectures.' }
  ];

  const contributions = [
    {
      id: 'solving',
      title: 'Problem Solving Focus',
      icon: Terminal,
      headline: 'Algorithmic Structures & Complexities',
      point_1: 'Mastered 300+ SDE interview challenges in Java and C++.',
      point_2: 'Strong focus on memory layout management and dynamic tree traversals.',
      badge: 'Analytical',
      color: 'text-rose-400 bg-rose-500/5'
    },
    {
      id: 'analysis',
      title: 'Data Analysis Mastery',
      icon: BarChart,
      headline: 'BigQuery Warehouses & Tableau HUDs',
      point_1: 'Completed Google Business Intelligence professional certification.',
      point_2: 'Optimizes slow relational SQL joins reducing query latency values.',
      badge: 'SQL & Stats',
      color: 'text-cyan-400 bg-cyan-500/5'
    },
    {
      id: 'ml',
      title: 'Machine Learning Pipelines',
      icon: Cpu,
      headline: 'CNN Classification & Parameter Reduction',
      point_1: 'Won Rank 1 at SRM inter-departmental AI Hackathon on pathology models.',
      point_2: 'Expertise in optimizing weights reducing parameter size constraints.',
      badge: 'AI & Vision',
      color: 'text-purple-400 bg-purple-500/5'
    },
    {
      id: 'dev',
      title: 'Software Development',
      icon: Code,
      headline: 'Responsive Frontends & Modular Routes',
      point_1: 'Constructed custom microservices with Express and Vite configurations.',
      point_2: 'Builds beautiful CSS-styled UI nodes without unneeded library bloat.',
      badge: 'Full Stack',
      color: 'text-emerald-400 bg-emerald-500/5'
    }
  ];

  const projectSnippets = [
    {
      title: 'Agricultural Diagnostic Classifier',
      impact: 'Won SRM Hackathon Rank 1',
      desc: 'An offline-capable CNN web model diagnostically checking crop leaf disease states.'
    },
    {
      title: 'Asynchronous File Parser',
      impact: 'Reduced ops from 12 hours to 8 mins',
      desc: 'Node.js file reader streams that parsed relational indices in seconds.'
    }
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Simulate File Download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      candidate: "Manamoy Banerjee",
      role: "AI Engineer / Data Analyst / ML Engineer",
      email: "manamoyraja@gmail.com",
      status: "Verified Recruiter Download Package"
    }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Manamoy_Banerjee_Portfolio_Brief.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  const handleCopy = (type: 'email' | 'brief') => {
    const textToCopy = type === 'email' ? 'manamoyraja@gmail.com' : 'https://manamoybanerjee.com/recruiter-brief';
    navigator.clipboard.writeText(textToCopy);
    setCopiedLink(type);
    setTimeout(() => {
      setCopiedLink(null);
    }, 2000);
  };

  const handleRunAtsCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!atsKeyword.trim()) return;

    const query = atsKeyword.toLowerCase();
    const hits = skillsRepository.filter(tech => query.includes(tech) || tech.includes(query));
    
    // Calculate a simulated match percentage based on hit count
    const basePercent = hits.length > 0 ? 70 + (hits.length * 10) : 45;
    const finalPercent = Math.min(basePercent, 99);

    setMatchedKeywords(hits.length > 0 ? hits : ['General Application Pattern']);
    setAtsScore(finalPercent);
  };

  return (
    <div className="space-y-12 py-4 animate-fade-in" id="recruiter-landing">
      
      {/* 1. HERO HEADER: "Why Hire Manamoy Banerjee?" */}
      <div 
        className="rounded-3xl border p-8 sm:p-12 relative overflow-hidden shadow-2xl transition-all" 
        style={{ 
          borderColor: colors.borderColor,
          background: theme === 'aurora' 
            ? 'linear-gradient(to right, #0a0e1a, #03050c)' 
            : 'linear-gradient(to right, #f1f5f9, #f8fafc)'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        <div className="absolute bottom-0 left-20 w-44 h-44 rounded-full blur-[110px] bg-emerald-500/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
          <div className="space-y-5 flex-1 max-w-3xl">
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase font-extrabold"
              style={{
                backgroundColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(4, 120, 87, 0.08)',
                borderColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(4, 120, 87, 0.25)',
                color: theme === 'aurora' ? '#34d399' : '#047857'
              }}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Fast-Track Recruiter Hub</span>
            </span>
            
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-none" style={{ color: colors.text }}>
              Why Hire <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">Manamoy Banerjee?</span>
            </h2>
            
            <p 
              className="text-sm sm:text-[17px] font-bold leading-relaxed"
              style={{ color: colors.mutedText }}
            >
              I align sports captaincy strategies (State-level coordination) with rigorous academic computer science. Specialized in custom convolutional deep learning pipelines and high-speed sql analysis, I construct elegant products that translate raw unstructured data into clean production tools.
            </p>

            {/* Availability Badge row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span 
                className="px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-bold flex items-center gap-1 transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                  borderColor: colors.borderColor,
                  color: colors.text
                }}
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Chennai Area / Onsite / Remote</span>
              </span>
              <span 
                className="px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-bold flex items-center gap-1 transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.08)',
                  borderColor: colors.borderColor,
                  color: theme === 'aurora' ? '#cbd5e1' : '#4f46e5'
                }}
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Immediate Engagement Opportunity</span>
              </span>
            </div>

            {/* Real-time Recruiter Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div 
                className="p-3.5 rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.6)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block pb-1">Typical Response</span>
                <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">&lt; 2 Hours</span>
              </div>
              <div 
                className="p-3.5 rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.6)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block pb-1">General Status</span>
                <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400">Open to Opportunities</span>
              </div>
              <div 
                className="p-3.5 rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.6)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block pb-1">Resume Updated</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-300">Today</span>
              </div>
              <div 
                className="p-3.5 rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.6)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block pb-1">Last Active Project</span>
                <span className="text-xs sm:text-sm font-black text-purple-600 dark:text-purple-400 font-bold">Shipped 2 days ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid Summarizers (3 indicators) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto shrink-0 animate-fade-in">
            {summaries.map((s, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border text-center space-y-1 relative overflow-hidden group shadow-md transition-all hover:shadow-lg"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.8)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${s.vibe}`} />
                <span className="text-2xl sm:text-3xl font-black block text-indigo-600 dark:text-indigo-400">{s.metric}</span>
                <span className="text-xs font-black block" style={{ color: colors.text }}>{s.label}</span>
                <span className="text-[10px] font-bold block" style={{ color: colors.mutedText }}>{s.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE SECRET WEAPON: MAIN HR PROFILE HUD CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Profile Card & Key Details (5 Columns) */}
        <div 
          className="lg:col-span-5 rounded-3xl border p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] bg-indigo-500/10 pointer-events-none" />
          <div className="border-b border-dashed pb-4" style={{ borderColor: colors.borderColor }}>
            <span className="text-[10px] font-mono uppercase tracking-widest block font-bold" style={{ color: colors.mutedText }}>Candidate Verification Stamp</span>
            <div className="flex justify-between items-center mt-1">
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>Profile Quick Check</h3>
              <span 
                className="text-[10px] font-mono rounded px-2.5 py-1 border font-bold"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(4, 120, 87, 0.08)',
                  borderColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(4, 120, 87, 0.25)',
                  color: theme === 'aurora' ? '#34d399' : '#047857'
                }}
              >
                ACTIVE FOR RESUME
              </span>
            </div>
          </div>

          {/* Structured specs ledger */}
          <div className="space-y-5">
            
            {/* Role Interests Matrix */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider font-extrabold block" style={{ color: colors.text }}>Role Interests</span>
              <div className="space-y-3">
                {coreInterests.map((r, i) => (
                  <div 
                    key={i} 
                    className="p-3.5 rounded-xl border flex justify-between items-center transition-all hover:shadow-sm"
                    style={{
                      backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                      borderColor: colors.borderColor
                    }}
                  >
                    <div>
                      <span className="text-sm font-black block" style={{ color: colors.text }}>{r.title}</span>
                      <span className="text-[11px] font-bold leading-normal block pt-0.5" style={{ color: colors.mutedText }}>{r.desc}</span>
                    </div>
                    <span 
                      className="text-[9px] font-mono font-extrabold border px-2 py-0.5 rounded uppercase shrink-0"
                      style={{
                        backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.08)',
                        borderColor: colors.borderColor,
                        color: colors.primary
                      }}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic profile */}
            <div 
              className="space-y-2 p-5 rounded-2xl border text-xs shadow-sm transition-colors"
              style={{
                backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                borderColor: colors.borderColor
              }}
            >
              <div className="flex justify-between items-center text-[10px] font-mono border-b border-dashed pb-2 mb-2 font-bold" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
                <span>EDUCATION ACCREDITATION</span>
                <span>SRM SPEC</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed" style={{ borderColor: colors.borderColor }}>
                <span className="font-mono font-bold" style={{ color: colors.mutedText }}>Institution:</span>
                <span className="font-black text-sm" style={{ color: colors.text }}>SRM Institute</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed" style={{ borderColor: colors.borderColor }}>
                <span className="font-mono font-bold" style={{ color: colors.mutedText }}>Discipline:</span>
                <span className="font-black text-xs" style={{ color: colors.text }}>B.Tech Computer Science</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed" style={{ borderColor: colors.borderColor }}>
                <span className="font-mono font-bold" style={{ color: colors.mutedText }}>GPA Score:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm">8.20 / 10 CGPA</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-mono font-bold" style={{ color: colors.mutedText }}>Target Graduation:</span>
                <span className="font-black" style={{ color: colors.text }}>May 2025</span>
              </div>
            </div>

            {/* Instant direct trigger brief DL download */}
            <div className="pt-2">
              <button
                onClick={handleDownload}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-mono font-extrabold text-xs transition-all shadow-md cursor-pointer hover:shadow-lg ${
                  downloadSuccess 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>DOWNLOADED VERIFIED BRIEF!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 animate-bounce" />
                    <span>DOWNLOAD COMPLETE RESUME PACKAGE</span>
                  </>
                )}
              </button>
              <div className="flex justify-between text-[9px] font-mono mt-2 px-2 font-bold" style={{ color: colors.mutedText }}>
                <span>FORMAT: ZIP VERIFIED brief</span>
                <span>SIZE: 1.25 MB</span>
              </div>
            </div>

          </div>
        </div>

        {/* Competency contribution matrices (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 animate-fade-in">
          
          <div 
            className="rounded-3xl border p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.cardBg 
            }}
          >
            <div className="border-b border-dashed pb-4" style={{ borderColor: colors.borderColor }}>
              <span className="text-[10px] font-mono uppercase tracking-widest block font-bold" style={{ color: colors.mutedText }}>Executive Competence Matrix</span>
              <h3 className="text-xl sm:text-2xl font-black mt-1" style={{ color: colors.text }}>
                What I Can Contribute
              </h3>
            </div>

            {/* Grid of contribution items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contributions.map((c) => {
                const MIcon = c.icon;
                return (
                  <div 
                    key={c.id} 
                    className="p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between"
                    style={{
                      backgroundColor: theme === 'aurora' ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                      borderColor: colors.borderColor
                    }}
                  >
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center">
                        <div 
                          className={`p-2 rounded-xl flex items-center justify-center border shrink-0`}
                          style={{
                            backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.08)',
                            borderColor: colors.borderColor
                          }}
                        >
                          <MIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span 
                          className="text-[9px] font-mono font-extrabold px-2.5 py-1 rounded border shadow-sm"
                          style={{
                            backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(7, 80, 220, 0.05)',
                            borderColor: colors.borderColor,
                            color: colors.primary
                          }}
                        >
                          {c.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-black mt-1" style={{ color: colors.text }}>{c.title}</h4>
                        <span className="text-[10px] uppercase font-mono block leading-none font-bold" style={{ color: colors.mutedText }}>{c.headline}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3.5 border-t border-dashed mt-4 text-xs font-bold" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
                      <p className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-600 dark:text-indigo-400 font-extrabold mt-0.5">•</span>
                        <span>{c.point_1}</span>
                      </p>
                      <p className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-600 dark:text-indigo-400 font-extrabold mt-0.5">•</span>
                        <span>{c.point_2}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Secondary Project Highlights overview */}
            <div className="space-y-3 pt-3 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
              <span className="text-[11px] font-mono uppercase tracking-wider font-extrabold flex items-center gap-1.5" style={{ color: colors.text }}>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Featured Project Sprints
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {projectSnippets.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl border text-xs shadow-sm transition-colors"
                    style={{
                      backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                      borderColor: colors.borderColor
                    }}
                  >
                    <div className="flex justify-between items-center pb-1">
                      <strong className="font-extrabold" style={{ color: colors.text }}>{p.title}</strong>
                      <span 
                        className="text-[9px] font-mono px-2 py-0.5 rounded border font-bold shrink-0"
                        style={{
                          backgroundColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(4, 120, 87, 0.08)',
                          borderColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(4, 120, 87, 0.25)',
                          color: theme === 'aurora' ? '#cbd5e1' : '#047857'
                        }}
                      >
                        {p.impact}
                      </span>
                    </div>
                    <p className="font-bold text-xs leading-normal mt-1" style={{ color: colors.mutedText }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. RECRUITER SECRET WEAPON: THE ATS KEYWORD RELEVANCE MATCHER */}
      <div 
        className="rounded-3xl border p-6 sm:p-10 relative overflow-hidden shadow-lg transition-all"
        style={{ 
          borderColor: colors.borderColor,
          background: theme === 'aurora' 
            ? 'linear-gradient(to right, rgba(99, 102, 241, 0.1), #080b14)' 
            : 'linear-gradient(to right, rgba(223, 77, 26, 0.04), #ffffff)'
        }}
      >
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl bg-indigo-500/10 pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest font-black block" style={{ color: theme === 'aurora' ? '#cbd5e1' : colors.primary }}>
              ATS MATCH SIMULATION PORTAL
            </span>
            <h3 className="text-2xl font-black mt-1" style={{ color: colors.text }}>
              Test ATS Alignment Instantly
            </h3>
            <p className="text-sm font-semibold leading-relaxed mt-2" style={{ color: colors.mutedText }}>
              Have a specific stack or job role context? Paste keywords below (e.g., <code className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">python, sql, machines, analysis, react</code>) to test compiler alignment factors in real-time.
            </p>
          </div>

          <form onSubmit={handleRunAtsCheck} className="flex flex-col sm:flex-row gap-3 max-w-xl pt-2">
            <input
              type="text"
              placeholder="Paste job description snippets or technology queries here..."
              value={atsKeyword}
              onChange={(e) => setAtsKeyword(e.target.value)}
              className="flex-1 px-4 py-3 border text-xs font-mono rounded-xl focus:outline-none focus:border-indigo-500 outline-none transition-all shadow-inner"
              style={{
                backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                borderColor: colors.borderColor,
                color: colors.text
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-black transition-all shrink-0 cursor-pointer shadow flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Verify Score Relevance</span>
            </button>
          </form>

          {/* Render Active Match Outcome */}
          <AnimatePresence mode="wait">
            {atsScore !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 border rounded-2xl flex flex-col sm:flex-row gap-5 items-stretch sm:items-center max-w-xl shadow-md transition-colors"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.8)' : '#ffffff',
                  borderColor: colors.borderColor
                }}
              >
                {/* Radial metric */}
                <div 
                  className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-mono font-black text-xl shrink-0 relative transition-colors"
                  style={{
                    backgroundColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(79, 70, 229, 0.05)',
                    borderColor: theme === 'aurora' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.3)',
                    color: colors.primary
                  }}
                >
                  <div className="absolute inset-0.5 rounded-full border-2 border-indigo-500/40 p-1" />
                  <span>{atsScore}%</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <strong className="font-extrabold text-sm block" style={{ color: colors.text }}>
                    ATS Match Result Status: {atsScore > 80 ? 'EXCELLENT' : 'RELEVANT'}
                  </strong>
                  <p className="font-bold text-xs leading-relaxed" style={{ color: colors.mutedText }}>
                    Matches discovered against Manamoy's core verified skills database index columns:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matchedKeywords.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] font-mono px-2 py-0.5 rounded border font-semibold"
                        style={{
                          backgroundColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(4, 120, 87, 0.08)',
                          borderColor: theme === 'aurora' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(4, 120, 87, 0.25)',
                          color: theme === 'aurora' ? '#34d399' : '#047857'
                        }}
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. HIGH CONVERSION CONTACT CTA BOX */}
      <div 
        className="rounded-3xl border p-8 sm:p-12 relative overflow-hidden shadow-2xl transition-all"
        style={{ 
          borderColor: colors.borderColor,
          background: theme === 'aurora' 
            ? 'linear-gradient(to right, #0a0e1a, #03050c)' 
            : 'linear-gradient(to right, #f1f5f9, #f8fafc)'
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[125px] bg-emerald-500/10 pointer-events-none -translate-y-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="space-y-4">
            <span 
              className="inline-flex items-center gap-1.5 font-mono font-black uppercase tracking-widest"
              style={{ color: theme === 'aurora' ? '#34d399' : '#047857' }}
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Conclude Engagement Search</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-none" style={{ color: colors.text }}>
              Secure Manamoy Banerjee Today
            </h3>
            <p className="text-sm sm:text-base font-bold leading-relaxed max-w-xl" style={{ color: colors.mutedText }}>
              Ready to setup a brief technical introduction or interview scheduling sprint? Click nodes below to retrieve verified certificates or launch instant messages.
            </p>
          </div>

          {/* CTA Link blocks */}
          <div className="flex flex-col gap-3 shrink-0 min-w-[280px]">
            {/* Email */}
            <a
              href="mailto:manamoyraja@gmail.com?subject=Technical Interview Proposal - Manamoy Banerjee"
              className="flex items-center justify-between gap-4 p-4 border hover:border-indigo-500/50 hover:shadow-md rounded-xl transition-all font-mono text-xs block group"
              style={{
                backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                borderColor: colors.borderColor
              }}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="font-bold" style={{ color: colors.text }}>manamoyraja@gmail.com</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/manamoy-banerjee-085732223/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-4 border hover:border-indigo-500/50 hover:shadow-md rounded-xl transition-all font-mono text-xs block group"
              style={{
                backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                borderColor: colors.borderColor
              }}
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="font-bold" style={{ color: colors.text }}>manamoy-banerjee-085732223</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/manamoy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-4 border hover:border-indigo-500/50 hover:shadow-md rounded-xl transition-all font-mono text-xs block group"
              style={{
                backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                borderColor: colors.borderColor
              }}
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="font-bold" style={{ color: colors.text }}>github.com/manamoy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </div>

        {/* HUD system stamps */}
        <div className="mt-8 border-t border-dashed pt-4 flex justify-between items-center text-[10px] font-mono font-bold" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
          <span>PORTFOLIO PLATFORM V2.4</span>
          <span>SYST_TOKEN: RECRUIT_LEDGER_AUTHENTICATED</span>
        </div>
      </div>

    </div>
  );
};
