import React, { useState } from 'react';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { 
  Search, 
  Github, 
  ExternalLink, 
  X, 
  Star, 
  GitFork, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Layout, 
  TrendingUp, 
  Activity,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectsPageProps {
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

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ colors, theme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter labels mapping
  const filterCategories = [
    { id: 'All', label: 'All Projects' },
    { id: 'AI', label: 'AI' },
    { id: 'ML', label: 'Machine Learning' },
    { id: 'Data Analytics', label: 'Data Analytics' },
    { id: 'Web Development', label: 'Web Dev' },
    { id: 'Research', label: 'Research' },
    { id: 'Automation', label: 'Automation' }
  ];

  // Search & filter pipeline
  const filteredProjects = projectsData.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Unique Cover Gradient generator based on Project ID to avoid asset broken links
  const getCoverGradient = (id: string) => {
    switch(id) {
      case 'sentiment-stock-forecast':
        return 'from-emerald-500/20 via-teal-500/15 to-slate-950';
      case 'deepfake-detection':
        return 'from-purple-500/20 via-pink-500/15 to-slate-950';
      case 'medicine-recommendation':
        return 'from-blue-500/20 via-indigo-500/15 to-slate-950';
      case 'personal-intel-system':
        return 'from-violet-500/20 via-fuchsia-500/15 to-slate-950';
      case 'professional-portfolio':
        return 'from-cyan-500/20 via-blue-500/15 to-slate-950';
      case 'heart-disease-prediction':
        return 'from-rose-500/20 via-orange-500/15 to-slate-950';
      default:
        return 'from-indigo-500/20 via-purple-500/15 to-slate-950';
    }
  };

  const getAccentColor = (id: string) => {
    switch(id) {
      case 'sentiment-stock-forecast': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'deepfake-detection': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      case 'medicine-recommendation': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'personal-intel-system': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'professional-portfolio': return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
      case 'heart-disease-prediction': return 'text-rose-400 border-rose-500/20 bg-rose-500/15';
      default: return 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5';
    }
  };

  // Render responsive customized SVG mockups representing screenshots
  const renderScreenshotMockup = (projectId: string) => {
    switch (projectId) {
      case 'sentiment-stock-forecast':
        return (
          <div className="w-full h-44 rounded-xl bg-slate-950 border border-emerald-500/25 p-3 flex flex-col justify-between relative overflow-hidden font-mono">
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-1.5 text-[9px] text-emerald-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>INDEX_MODEL // FIN_STREAM</span>
              </span>
              <span className="text-emerald-500/60 animate-pulse">● LIVE</span>
            </div>
            
            {/* SVG line representing stock chart forecast */}
            <svg viewBox="0 0 300 80" className="w-full h-24 overflow-visible my-1">
              <defs>
                <linearGradient id="glow-chart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              {/* historical values path */}
              <path d="M 0 50 Q 30 40 60 60 T 120 30 T 180 55 T 240 20 L 300 45" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* forecasting sentiment integration */}
              <path d="M 120 30 T 180 25 T 240 10 L 300 5 L 300 80 L 120 80 Z" fill="url(#glow-chart)" />
              <path d="M 120 30 T 180 25 T 240 10 L 300 5" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="120" cy="30" r="3" fill="#10b981" />
              <text x="125" y="27" className="text-[7px] fill-emerald-400 font-bold">FinBERT Pivot Point</text>
            </svg>

            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <span>VOLATILITY MATRIX CORR: 0.892</span>
              <span className="text-emerald-400">MAE INDEXED -18.4%</span>
            </div>
          </div>
        );
      case 'deepfake-detection':
        return (
          <div className="w-full h-44 rounded-xl bg-slate-950 border border-purple-500/25 p-3 flex flex-col justify-between relative overflow-hidden font-mono">
            <div className="flex justify-between items-center border-b border-purple-500/10 pb-1.5 text-[9px] text-purple-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span>SCANNER_FRAME // GRAD_CAM</span>
              </span>
              <span className="text-purple-500/60 animate-pulse">VAL_94.2%</span>
            </div>

            {/* Neural scan face mockup */}
            <div className="flex-1 flex items-center justify-center relative my-1">
              <div className="w-20 h-20 rounded-full border border-dashed border-purple-500/40 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-pink-500/30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-500/20 rounded-full animate-ping" />
                </div>
                {/* Visualizing heat hotspots */}
                <span className="absolute top-2 left-2 text-[6px] text-pink-400 border border-pink-500/30 px-1 bg-pink-500/10 rounded">BIOMETRIC_GAP</span>
                <span className="absolute bottom-2 right-1 text-[6px] text-purple-300 border border-purple-500/30 px-1 bg-purple-500/10 rounded">EYE_BLINK_LAG</span>
                
                {/* Focus box overlay */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-400" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-400" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <span>FPS: 45 // MODEL: EFFICIENTNET-B4</span>
              <span className="text-purple-400">CELEB-DF APPROVED</span>
            </div>
          </div>
        );
      case 'medicine-recommendation':
        return (
          <div className="w-full h-44 rounded-xl bg-slate-950 border border-blue-500/25 p-3 flex flex-col justify-between relative overflow-hidden font-mono">
            <div className="flex justify-between items-center border-b border-blue-500/10 pb-1.5 text-[9px] text-blue-400">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-blue-400" />
                <span>NEO4J_PATH_VERIFIER</span>
              </span>
              <span className="text-emerald-400 font-bold">99.1% SAFE</span>
            </div>

            {/* Simulated relationship node cluster */}
            <div className="flex-1 flex items-center justify-center relative my-1 gap-1">
              <div className="flex flex-col items-center gap-1 scale-90">
                <div className="px-1.5 py-0.5 rounded border border-blue-500/50 bg-blue-500/10 text-[7px] text-white">Symptom Input</div>
                <div className="h-4 w-px bg-dashed bg-slate-700" />
                <div className="px-1.5 py-0.5 rounded border border-indigo-500/50 bg-indigo-500/20 text-[7px] text-indigo-300">BioBERT Entity</div>
                <div className="h-4 w-px bg-slate-700" />
                <div className="flex items-center gap-2">
                  <span className="px-1 py-0.5 rounded border border-emerald-500 bg-emerald-500/10 text-[6px] text-emerald-400">Match Drug A</span>
                  <span className="px-1 py-0.5 rounded border border-rose-500 bg-rose-500/10 text-[6px] text-rose-400">Conflict Drug B</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <span>BioBERT ENTITIES EXTR: 88.9%</span>
              <span className="text-blue-400">INTERACTION CHECKED</span>
            </div>
          </div>
        );
      case 'personal-intel-system':
        return (
          <div className="w-full h-44 rounded-xl bg-slate-950 border border-amber-500/25 p-3 flex flex-col justify-between relative overflow-hidden font-mono">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-1.5 text-[9px] text-amber-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>OLLAMA // SECURE_INDEX</span>
              </span>
              <span className="text-amber-500/60 font-mono">LOCAL_SYNC</span>
            </div>

            {/* Folder indexing representation */}
            <div className="flex-1 flex flex-col justify-center text-left space-y-1.5 px-2 my-1">
              <div className="text-[8px] text-slate-300 flex items-center justify-between">
                <span>📂 Research_Papers/</span>
                <span className="text-emerald-400 font-bold">Indexed</span>
              </div>
              <div className="text-[8px] text-slate-300 flex items-center justify-between">
                <span>📂 Developer_Notes/</span>
                <span className="text-emerald-400 font-bold">Indexed</span>
              </div>
              <div className="text-[8px] text-slate-500 pl-3">
                <span>↳ chroma_vect_dense.db (Vector DB)</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <span>RAM USAGE: 1.8GB // OLLAMA LOADED</span>
              <span className="text-amber-400">FILES INDEXED: 10k+</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 rounded-xl bg-slate-950 border border-indigo-500/25 p-3 flex flex-col justify-between relative overflow-hidden font-mono">
            <div className="flex justify-between items-center border-b border-indigo-500/10 pb-1.5 text-[9px] text-indigo-400">
              <span className="flex items-center gap-1">
                <Layout className="w-3 h-3 text-indigo-400" />
                <span>VIEWPORT // DYNAMIC_REACTIVE</span>
              </span>
              <span className="text-indigo-400">OK</span>
            </div>

            {/* Modular web layout mockup representation */}
            <div className="flex-1 flex flex-col justify-center text-left py-2 space-y-1 my-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="h-2 rounded bg-slate-800 w-3/4" />
              <div className="h-6 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center px-1.5">
                <div className="h-1 bg-indigo-400 rounded w-1/2" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <span>VITE REBUILD: 0.12s</span>
              <span className="text-indigo-400">LIGHTHOUSE 100/100</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 py-4 animate-fade-in" id="projects-showcase">
      
      {/* Advanced Hero Header */}
      <div className="rounded-3xl border p-8 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-950 shadow-xl" style={{ borderColor: colors.borderColor }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
            <Layout className="w-3.5 h-3.5" />
            <span>Interactive Repository Showcase</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
            Advanced Systems Lab
          </h2>
          <p className="text-xs sm:text-sm max-w-xl text-slate-400 font-sans leading-relaxed">
            Exploratory project models bridging deep numerical predictive research, diagnostic medical NLP systems, deepfake vector defenses, and highly performant full-stack solutions.
          </p>
        </div>
      </div>

      {/* Searching and Categorized Filtration Systems */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
        
        {/* Horizontal Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {filterCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full border text-xxs font-mono font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-indigo-500 border-indigo-500 text-white' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  borderColor: isSelected ? colors.primary : colors.borderColor,
                  color: isSelected ? '#ffffff' : colors.text
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Search queries */}
        <div className="relative w-full md:w-72 leading-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search stack, title, descriptors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border text-xxs font-mono rounded-full focus:outline-none focus:border-indigo-500 bg-slate-900 border-slate-700 text-slate-100"
            style={{ borderColor: colors.borderColor }}
          />
        </div>

      </div>

      {/* Grid Layout of Advanced Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border backdrop-blur-md flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 transform hover:-translate-y-1 "
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.borderColor
            }}
          >
            {/* Visual Cover Header */}
            <div className={`h-28 bg-gradient-to-b ${getCoverGradient(proj.id)} p-5 relative overflow-hidden border-b flex flex-col justify-end`} style={{ borderColor: colors.borderColor }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-lg flex items-center justify-center text-xl bg-slate-900 border border-white/5 shadow-md">
                {proj.image}
              </div>
              {proj.featured && (
                <span className="absolute top-4 right-4 text-[8px] font-mono font-bold uppercase tracking-wider bg-indigo-500 text-white px-2 py-0.5 rounded-full select-none shadow">
                  Featured Target
                </span>
              )}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  {proj.category} MODULE
                </span>
                <h3 className="text-sm font-bold text-slate-100 truncate mt-0.5" style={{ color: colors.text }}>
                  {proj.title}
                </h3>
              </div>
            </div>

            {/* Card Body content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed max-w-full font-sans">
                {proj.description}
              </p>

              {/* Advanced metrics segment */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] px-2 py-0.5 rounded font-mono font-bold bg-slate-950 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Simulated Real-Time GitHub Stats Bar */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                    <Star className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
                    <span>{proj.stars || 120}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-blue-400" />
                    <span>{proj.forks || 35}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>{proj.openIssues || 2}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-mono font-black transition-all hover:bg-slate-900 cursor-pointer text-slate-300"
                  style={{ borderColor: colors.borderColor }}
                >
                  <span>Lab Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-1">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-2 py-1.5 rounded-lg border text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-all focus:outline-none"
                    style={{ borderColor: colors.borderColor }}
                    title="View Source on GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  {proj.demoUrl && proj.demoUrl !== '#' && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-2 py-1.5 rounded-lg border text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-all focus:outline-none"
                      style={{ borderColor: colors.borderColor }}
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Empty Fallback Search */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 border border-dashed rounded-3xl" style={{ borderColor: colors.borderColor }}>
          <Layout className="w-12 h-12 text-slate-600 mx-auto opacity-50 mb-4 animate-bounce" />
          <h4 className="text-lg font-bold text-slate-300">No project clusters found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or clear inputs to find repository dimensions.
          </p>
        </div>
      )}

      {/* PROJECT DETAILS DETAILS MODAL FOR DEEP ANALYSIS */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          
          <div 
            className="w-full max-w-3xl rounded-3xl border shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[90vh]"
            style={{ 
              backgroundColor: colors.cardBg, 
              borderColor: colors.borderColor 
            }}
          >
            {/* Modal header visual cover */}
            <div className={`h-36 bg-gradient-to-b ${getCoverGradient(selectedProject.id)} p-6 sm:p-8 relative overflow-hidden border-b shrink-0 flex flex-col justify-end`} style={{ borderColor: colors.borderColor }}>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 border border-white/10 hover:bg-slate-950 text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className={`inline-block text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getAccentColor(selectedProject.id)}`}>
                  {selectedProject.category} SPECIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1" style={{ color: colors.text }}>
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-sans">
              
              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Target Problem Statement
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-rose-950/10 border border-rose-500/10 rounded-2xl p-4">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Resolution Logic
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-emerald-950/10 border border-emerald-500/10 rounded-2xl p-4">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Dynamic SVGs Screenshot Mockup & Quantitative Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                <div className="md:col-span-7 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                    Interactive Interface Screenshot
                  </span>
                  {renderScreenshotMockup(selectedProject.id)}
                </div>

                <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-xl border relative overflow-hidden min-h-[176px]" style={{ borderColor: colors.borderColor, backgroundColor: colors.cardBg }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2.5xl bg-indigo-500/5 pointer-events-none" />
                  <div className="space-y-3.5 z-10">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500 block">
                      QUANTIFIED IMPACT METRIC
                    </span>
                    <div className="space-y-1">
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight" style={{ color: colors.primary }}>
                        {selectedProject.impact.split(' ')[0]}
                      </span>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans">
                        {selectedProject.impact.substring(selectedProject.impact.indexOf(' ') + 1)}
                      </p>
                    </div>
                  </div>

                  {/* GitHub interactive details */}
                  <div className="flex items-center gap-4 text-[10px] font-mono border-t border-dashed pt-4" style={{ borderColor: colors.borderColor }}>
                    <div className="text-center">
                      <span className="opacity-40 block text-[8px]">REPOS_STARS</span>
                      <span className="font-bold text-slate-200 block mt-0.5">{selectedProject.stars || 120} ★</span>
                    </div>
                    <div className="text-center border-l pl-4" style={{ borderColor: colors.borderColor }}>
                      <span className="opacity-40 block text-[8px]">FORK_DIM</span>
                      <span className="font-bold text-slate-200 block mt-0.5">{selectedProject.forks || 35} forks</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Architecture Steps */}
              {selectedProject.architecture && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                    Computational Architecture Flow
                  </span>
                  
                  <div className="space-y-2">
                    {selectedProject.architecture.map((step, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3 text-xs bg-slate-900 border rounded-xl hover:border-slate-700 transition-colors"
                        style={{ borderColor: colors.borderColor }}
                      >
                        <span className="font-mono font-bold text-indigo-400 bg-indigo-500/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                          0{idx + 1}
                        </span>
                        <p className="text-slate-300 pt-0.5 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results & Key Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Validation Results
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pl-2">
                    {selectedProject.results}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Core Engineering Challenges
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pl-2 font-medium">
                    {selectedProject.challenges}
                  </p>
                </div>
              </div>

              {/* Future Improvements */}
              {selectedProject.futureImprovements && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 font-bold block">
                    Roadmap & Future Modifications
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.futureImprovements.map((imp, idx) => (
                      <li 
                        key={idx} 
                        className="text-xs text-slate-400 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-900"
                      >
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal footer anchor trigger links */}
            <div className="p-6 border-t border-dashed bg-slate-950/40 shrink-0 flex items-center gap-3" style={{ borderColor: colors.borderColor }}>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-mono font-bold bg-slate-900 border-slate-800 text-white transition-all hover:bg-slate-950 focus:outline-none"
              >
                <Github className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>

              {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold bg-indigo-500 text-white transition-all hover:bg-indigo-600 focus:outline-none"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Execute Live Demo</span>
                </a>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
