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
        className="rounded-3xl border p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-950 shadow-2xl" 
        style={{ borderColor: colors.borderColor }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        <div className="absolute bottom-0 left-20 w-44 h-44 rounded-full blur-[110px] bg-emerald-500/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
          <div className="space-y-5 flex-1 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase bg-emerald-500/5 border-emerald-500/20 text-emerald-400">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Fast-Track Recruiter Hub</span>
            </span>
            
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-none" style={{ color: colors.text }}>
              Why Hire <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Manamoy Banerjee?</span>
            </h2>
            
            <p className="text-xs sm:text-base text-slate-400 font-sans leading-relaxed">
              I align sports captaincy strategies (State-level coordination) with rigorous academic computer science. Specialized in custom convolutional deep learning pipelines and high-speed sql analysis, I construct elegant products that translate raw unstructured data into clean production tools.
            </p>

            {/* Availability Badge row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full border text-[9px] font-mono bg-slate-950 text-slate-300 border-slate-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-400" />
                <span>Chennai Area / Onsite / Remote</span>
              </span>
              <span className="px-3 py-1 rounded-full border text-[9px] font-mono bg-indigo-500/5 text-indigo-300 border-indigo-500/10 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-indigo-400" />
                <span>Immediate Engagement Opportunity</span>
              </span>
            </div>

            {/* Real-time Recruiter Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="text-[8px] font-mono uppercase text-slate-500 block">Typical Response</span>
                <span className="text-xxs font-bold text-emerald-400">&lt; 2 Hours</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="text-[8px] font-mono uppercase text-slate-500 block">General Status</span>
                <span className="text-xxs font-bold text-indigo-400">Open to Opportunities</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="text-[8px] font-mono uppercase text-slate-500 block">Resume Updated</span>
                <span className="text-xxs font-bold text-slate-300">Today</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="text-[8px] font-mono uppercase text-slate-500 block">Last Active Project</span>
                <span className="text-xxs font-bold text-purple-400">Shipped 2 days ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid Summarizers (3 indicators) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto shrink-0">
            {summaries.map((s, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 relative overflow-hidden group shadow-md"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.vibe}`} />
                <span className="text-xl sm:text-2xl font-black block text-indigo-400">{s.metric}</span>
                <span className="text-[10px] font-mono text-slate-100 font-bold block">{s.label}</span>
                <span className="text-[9px] text-slate-500 block">{s.info}</span>
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
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Candidate Verification Stamp</span>
            <div className="flex justify-between items-center mt-1">
              <h3 className="text-lg font-black text-slate-100" style={{ color: colors.text }}>Profile Quick Check</h3>
              <span className="text-[9px] font-mono bg-emerald-500/5 text-emerald-400 rounded px-2 py-0.5 border border-emerald-500/25">ACTIVE FOR RESUME</span>
            </div>
          </div>

          {/* Structured specs ledger */}
          <div className="space-y-4">
            
            {/* Interests Matrix */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-black block">Role Interests</span>
              <div className="space-y-2">
                {coreInterests.map((r, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{r.title}</span>
                      <span className="text-[9px] text-slate-500 leading-none block pt-0.5">{r.desc}</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic profile */}
            <div className="space-y-1.5 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-dashed border-slate-800 pb-1.5 mb-1.5">
                <span>EDUCATION ACCREDITATION</span>
                <span>SRM SPEC</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-mono">Institution:</span>
                <span className="text-slate-100 font-bold">SRM Institute</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-mono">Discipline:</span>
                <span className="text-slate-100 font-bold">B.Tech Computer Science</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-mono">GPA Score:</span>
                <span className="text-indigo-400 font-bold">8.20 / 10 CGPA</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-mono">Target Graduation:</span>
                <span className="text-slate-100">May 2025</span>
              </div>
            </div>

            {/* Instant direct trigger brief DL download */}
            <div className="pt-2">
              <button
                onClick={handleDownload}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-mono font-bold text-xs transition-all shadow cursor-pointer ${
                  downloadSuccess 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
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
              <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1.5 px-2">
                <span>FORMAT: ZIP VERIFIED brief</span>
                <span>SIZE: 1.25 MB</span>
              </div>
            </div>

          </div>
        </div>

        {/* Competency contribution matrices (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div 
            className="rounded-3xl border p-6 sm:p-8 space-y-6 relative overflow-hidden"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.cardBg 
            }}
          >
            <div className="border-b border-dashed pb-4" style={{ borderColor: colors.borderColor }}>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Executive Competence Matrix</span>
              <h3 className="text-xl sm:text-2xl font-black mt-1" style={{ color: colors.text }}>
                What I Can Contribute
              </h3>
            </div>

            {/* Grid of contribution items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contributions.map((c) => {
                const MIcon = c.icon;
                return (
                  <div key={c.id} className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className={`p-2 rounded-xl flex items-center justify-center border border-slate-800/80 ${c.color} shrink-0`}>
                          <MIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/25">
                          {c.badge}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-200 mt-1">{c.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block leading-none">{c.headline}</span>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-dashed border-slate-800 mt-3 text-[11px] text-slate-400">
                      <p className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        <span>{c.point_1}</span>
                      </p>
                      <p className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        <span>{c.point_2}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Secondary Project Highlights overview */}
            <div className="space-y-3 pt-3 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Featured Project Sprints
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectSnippets.map((p, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xxs">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-200">{p.title}</strong>
                      <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/5 px-1 rounded border border-emerald-500/20">{p.impact}</span>
                    </div>
                    <p className="text-slate-400 font-sans mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. RECRUITER SECRET WEAPON: THE ATS KEYWORD RELEVANCE MATCHER */}
      <div 
        className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-indigo-950/20 via-slate-950 to-slate-950 shadow-lg"
        style={{ borderColor: colors.borderColor }}
      >
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl bg-indigo-500/10 pointer-events-none" />
        
        <div className="max-w-3xl space-y-4">
          <div className="space-y-1">
            <span className="text-[8.5px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              ATS MATCH SIMULATION PORTAL
            </span>
            <h3 className="text-xl font-black text-slate-100" style={{ color: colors.text }}>
              Test ATS Alignment Instantly
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Have a specific stack or job role context? Paste keywords below (e.g., <code className="text-indigo-300 font-mono text-xxs">python, sql, machines, analysis, react</code>) to test compiler alignment factors in real-time.
            </p>
          </div>

          <form onSubmit={handleRunAtsCheck} className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              type="text"
              placeholder="Paste job description snippets or technology queries here..."
              value={atsKeyword}
              onChange={(e) => setAtsKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border text-xxs font-mono rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-900 border-slate-700 text-slate-100"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xxs font-mono font-bold transition-all shrink-0 cursor-pointer shadow flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
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
                className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row gap-5 items-stretch sm:items-center max-w-xl"
              >
                {/* Radial metric */}
                <div className="w-20 h-20 rounded-full border-4 border-indigo-500/30 flex items-center justify-center font-mono font-black text-lg text-indigo-400 shrink-0 bg-indigo-500/5 relative">
                  <div className="absolute inset-0.5 rounded-full border-2 border-indigo-400 p-1" />
                  <span>{atsScore}%</span>
                </div>

                <div className="space-y-1 text-xs">
                  <strong className="text-slate-100 font-black block">ATS Match Result Status: {atsScore > 80 ? 'EXCELLENT' : 'RELEVANT'}</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-0.5">
                    Matches discovered against Manamoy's core verified skills database index columns:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matchedKeywords.map((tech, i) => (
                      <span key={i} className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/25 text-emerald-400">
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
        className="rounded-3xl border p-8 sm:p-10 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-950 to-slate-950 shadow-2xl"
        style={{ borderColor: colors.borderColor }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[125px] bg-emerald-500/10 pointer-events-none -translate-y-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Conclude Engagement Search</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100" style={{ color: colors.text }}>
              Secure Manamoy Banerjee Today
            </h3>
            <p className="text-xs text-slate-400 max-w-xl font-sans leading-relaxed">
              Ready to setup a brief technical introduction or interview scheduling sprint? Click nodes below to retrieve verified certificates or launch instant messages.
            </p>
          </div>

          {/* CTA Link blocks */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            {/* Email */}
            <a
              href="mailto:manamoyraja@gmail.com?subject=Technical Interview Proposal - Manamoy Banerjee"
              className="flex items-center justify-between gap-4 p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-xl transition-all font-mono text-xxs block group"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="text-slate-300">manamoyraja@gmail.com</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/manamoy-banerjee-085732223/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-xl transition-all font-mono text-xxs block group"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="text-slate-300">manamoy-banerjee-085732223</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/manamoy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-xl transition-all font-mono text-xxs block group"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="text-slate-300">github.com/manamoy</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* HUD system stamps */}
        <div className="mt-8 border-t border-dashed border-slate-800/80 pt-4 flex justify-between items-center text-[8px] font-mono text-slate-500">
          <span>PORTFOLIO PLATFORM V2.4</span>
          <span>SYST_TOKEN: RECRUIT_LEDGER_AUTHENTICATED</span>
        </div>
      </div>

    </div>
  );
};
