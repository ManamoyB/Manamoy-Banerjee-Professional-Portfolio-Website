import React, { useState, useEffect, useMemo } from 'react';
import { Certification } from '../types';
import { certificationsService } from '../services/certifications.service';
import { useTheme } from './ThemeContext';
import { 
  Search, 
  Award, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Calendar, 
  Grid, 
  GitCommit, 
  Tv, 
  Code, 
  Check, 
  Bookmark, 
  SlidersHorizontal,
  FolderDot
} from 'lucide-react';

export const DynamicCertifications: React.FC = () => {
  const { theme, colors } = useTheme();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'sheets' | 'fallback'>('fallback');
  const [errorMsg, setError] = useState<string | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const fetchCerts = async (forceRefresh = false) => {
    setLoading(true);
    if (forceRefresh) {
      localStorage.removeItem('portfolio_headless_cms_cache_Certifications');
    }
    try {
      const data = await certificationsService.getCertifications();
      setCerts(data);
      const hasSheetId = !!import.meta.env.VITE_GOOGLE_SHEET_ID;
      setSource(hasSheetId ? 'sheets' : 'fallback');
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to sync certifications database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // Filter Categories specified in prompt
  const categories = ['All', 'AI', 'Machine Learning', 'Data Analytics', 'Business Intelligence', 'Cloud', 'Programming'];
  
  // Featured Providers specified in prompt
  const featuredProviders = ['All', 'IBM', 'Google', 'Microsoft', 'Coursera'];

  // Process certs: search, filter, and sort chronologically for timeline
  const processedCerts = useMemo(() => {
    let list = [...certs];

    // 1. Search Query Filter (Matches title, skills, issuer)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.skills.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // 3. Provider/Issuer Filter
    if (selectedIssuer !== 'All') {
      list = list.filter((c) => {
        if (selectedIssuer === 'Coursera') {
          return c.issuer.toLowerCase().includes('coursera') || c.issuer.toLowerCase().includes('deeplearning');
        }
        return c.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
      });
    }

    // Default sorting: chronologically newest first
    list.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

    return list;
  }, [certs, searchQuery, selectedCategory, selectedIssuer]);

  // Compute unique counts for stats counters
  const stats = useMemo(() => {
    const total = certs.length;
    const highlightedCount = certs.filter(c => c.isHighlighted).length;
    const aiMlCount = certs.filter(c => c.category === 'AI' || c.category === 'Machine Learning').length;
    return { total, highlightedCount, aiMlCount };
  }, [certs]);

  // SVG Certificate Thumbnail Creator based on Issuer/Topic
  const renderThumbnail = (certObj: Certification) => {
    const isGoogle = certObj.issuer.toLowerCase().includes('google');
    const isIBM = certObj.issuer.toLowerCase().includes('ibm');
    const isMicrosoft = certObj.issuer.toLowerCase().includes('microsoft');
    
    let badgeBg = 'from-indigo-600 to-indigo-900';
    let brandLogo = '★';

    if (isGoogle) {
      badgeBg = 'from-blue-600 via-red-500 to-yellow-500';
      brandLogo = 'G';
    } else if (isIBM) {
      badgeBg = 'from-sky-700 via-blue-800 to-indigo-900';
      brandLogo = 'IBM';
    } else if (isMicrosoft) {
      badgeBg = 'from-teal-600 to-blue-700';
      brandLogo = '⊞';
    } else if (certObj.issuer.toLowerCase().includes('deeplearning')) {
      badgeBg = 'from-amber-600 to-amber-900';
      brandLogo = 'DL';
    }

    return (
      <div className={`w-full h-24 rounded-xl bg-gradient-to-tr ${badgeBg} relative overflow-hidden flex flex-col justify-between p-3 shrink-0 shadow-inner group-hover:scale-[1.02] transition-transform duration-300 border border-white/15`}>
        {/* Vector Background graphics */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
        <div className="absolute bottom-1 right-2 font-black text-white/5 text-4xl select-none leading-none">
          {brandLogo}
        </div>

        <div className="flex justify-between items-start">
          <Award className="w-5 h-5 text-white/90 drop-shadow" />
          <span className="text-[7.5px] font-mono tracking-widest text-white/80 bg-black/20 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
            VERIFIED
          </span>
        </div>

        <div className="z-10">
          <span className="text-[7px] font-mono tracking-widest text-white/70 block uppercase">
            {certObj.issuer.split(' ')[0]}
          </span>
          <span className="text-[9px] font-bold text-white line-clamp-1 mr-4 drop-shadow-sm font-sans mt-0.5">
            {certObj.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8" id="certifications-hub">
      
      {/* PROFESSIONAL CERTIFICATIONS HERO BANNER */}
      <div className="rounded-3xl border p-8 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-950 shadow-xl" style={{ borderColor: colors.borderColor }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none -translate-y-10" />
        
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Credentials Registry</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
              Professional Certifications
            </h2>
            <p className="text-xs sm:text-sm max-w-xl text-slate-400 font-sans leading-relaxed">
              Curated learning trajectories and specialized analytics credentials validating standard machine learning workflows and production-grade architectures.
            </p>
          </div>

          {/* Core HUD Certification Counter Panel */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shrink-0 font-mono text-center">
            <div className="px-2">
              <span className="text-[8px] opacity-40 uppercase block">Total Verified</span>
              <span className="text-2xl font-black text-indigo-400 block mt-1">{stats.total}</span>
              <span className="text-[7px] text-slate-500 block mt-0.5">Credentials</span>
            </div>
            <div className="border-l border-slate-800 px-4">
              <span className="text-[8px] opacity-40 uppercase block">Core Highlights</span>
              <span className="text-2xl font-black text-amber-400 block mt-1">{stats.highlightedCount}</span>
              <span className="text-[7px] text-slate-500 block mt-0.5">IBM & Google</span>
            </div>
            <div className="border-l border-slate-800 px-2">
              <span className="text-[8px] opacity-40 uppercase block">AI & ML Stacks</span>
              <span className="text-2xl font-black text-emerald-400 block mt-1">{stats.aiMlCount}</span>
              <span className="text-[7px] text-slate-500 block mt-0.5">Specializations</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & TOOLBAR */}
      <div className="space-y-4">
        
        {/* Categories filters & view toggles */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4" style={{ borderColor: colors.borderColor }}>
          
          {/* Main prompt-specified filter categories */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full border text-xxs font-mono font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isSelected ? colors.primary : colors.borderColor,
                    color: isSelected ? '#ffffff' : colors.text
                  }}
                >
                  {cat === 'All' ? 'All Credentials' : cat}
                </button>
              );
            })}
          </div>

          {/* Toggle layout view mode (Grid vs Timeline) */}
          <div className="flex items-center gap-1.5 shrink-0 bg-slate-900 border border-slate-800 p-1.5 rounded-full font-mono">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                viewMode === 'grid' ? 'bg-indigo-500 text-white shadow-sm' : 'opacity-50 hover:opacity-100 text-slate-300'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                viewMode === 'timeline' ? 'bg-indigo-500 text-white shadow-sm' : 'opacity-50 hover:opacity-100 text-slate-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </button>
          </div>

        </div>

        {/* Searching input & Quick Filter Providers */}
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl border bg-slate-900/50" style={{ borderColor: colors.borderColor }}>
          
          {/* Quick filter featured provider badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xxs font-mono font-bold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-indigo-400" />
              Quick Issuer:
            </span>
            {featuredProviders.map((provider) => {
              const isSelected = selectedIssuer === provider;
              return (
                <button
                  key={provider}
                  onClick={() => setSelectedIssuer(provider)}
                  className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-200 border-slate-200 text-slate-900' 
                      : 'bg-transparent text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
                  style={{ borderColor: isSelected ? '#ffffff' : colors.borderColor }}
                >
                  {provider === 'All' ? 'All Providers' : provider}
                </button>
              );
            })}
          </div>

          {/* Real-time search query box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search specific title, subject, or credential fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border text-xxs font-mono rounded-full focus:outline-none focus:border-indigo-500 bg-slate-950 border-slate-800 text-slate-200"
              style={{ borderColor: colors.borderColor }}
            />
          </div>

          <button
            onClick={() => fetchCerts(true)}
            title="Force refresh index databases"
            className="p-2 border rounded-full text-indigo-400 border-indigo-500/10 hover:bg-slate-900 transition-colors self-end md:self-center cursor-pointer cursor-pointers"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

        </div>

      </div>

      {/* RENDER VIEW STATE CORNER */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-64 rounded-3xl border animate-pulse p-6 space-y-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
              <div className="h-24 rounded-2xl bg-gray-400/10" />
              <div className="h-4 w-3/4 rounded bg-gray-400/10" />
              <div className="h-3 w-1/2 rounded bg-gray-400/5" />
            </div>
          ))}
        </div>
      ) : processedCerts.length === 0 ? (
        <div className="text-center py-24 border border-dashed rounded-3xl" style={{ borderColor: colors.borderColor }}>
          <FolderDot className="w-12 h-12 text-slate-600 mx-auto opacity-50 mb-4 animate-bounce" />
          <h4 className="text-lg font-bold text-slate-300">Empty credentials map</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try resetting your search query or quick filters to find your certificates.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedIssuer('All');
            }}
            className="mt-4 px-4 py-2 text-xxs font-mono font-bold bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all cursor-pointer"
          >
            Clear Active Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* 1. GRID LAYOUT BLOCK */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {processedCerts.map((cert, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                cert.isHighlighted 
                  ? 'border-indigo-500/40 shadow-xl shadow-indigo-500/5 bg-gradient-to-b from-slate-900/60 to-slate-950/20' 
                  : ''
              }`}
              style={{
                backgroundColor: colors.cardBg,
                borderColor: cert.isHighlighted ? undefined : colors.borderColor
              }}
            >
              {/* Highlight ribbon indicator */}
              {cert.isHighlighted && (
                <div className="absolute top-0 right-0 py-1 px-3 text-[8px] font-mono font-extrabold uppercase rounded-bl-xl tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 select-none shadow z-10 flex items-center gap-1">
                  <Bookmark className="w-2.5 h-2.5 fill-slate-950" />
                  <span>Highlight Certificate</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Dynamically created thumbnails */}
                {renderThumbnail(cert)}

                {/* Issuer & Date info row */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-indigo-400">
                      {cert.category || 'Professional'}
                    </span>
                    <span className="opacity-60 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 opacity-70" />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-rose-50 font-sans tracking-tight leading-snug line-clamp-2" style={{ color: colors.text }}>
                    {cert.title}
                  </h3>
                </div>

                {/* Skills learned section */}
                {cert.skills && (
                  <div className="border-t border-dashed pt-3" style={{ borderColor: colors.borderColor }}>
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                      Skills Validated
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
                      {cert.skills}
                    </p>
                  </div>
                )}
              </div>

              {/* Action verification details link */}
              <div className="pt-4 mt-auto">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xxs font-mono font-bold rounded-lg border text-slate-300 hover:text-white hover:bg-slate-950 transition-all shadow-inner cursor-pointer"
                  style={{ borderColor: colors.borderColor }}
                >
                  <span>Verify Credentials</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

            </div>
          ))}
        </div>
      ) : (
        
        /* 2. CHRONOLOGICAL TIMELINE VIEW BLOCK */
        <div className="relative animate-fade-in max-w-2xl mx-auto pl-6 sm:pl-8 space-y-8 py-4">
          
          {/* Stem tracer line */}
          <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/20 to-transparent pointer-events-none" />

          {processedCerts.map((cert, idx) => (
            <div
              key={idx}
              className="relative group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
            >
              {/* Chronological map hub node bullet */}
              <div className={`absolute -left-[23.5px] sm:-left-[31.5px] w-4 h-4 rounded-full border-2 bg-slate-950 z-10 flex items-center justify-center transition-all group-hover:scale-125 ${
                cert.isHighlighted ? 'border-amber-400 w-5 h-5 -left-[25.5px] sm:-left-[33.5px]' : 'border-indigo-500'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${cert.isHighlighted ? 'bg-amber-400 animate-ping' : 'bg-indigo-500'}`} />
              </div>

              {/* Timestamp label column */}
              <div className="hidden xs:block w-24 shrink-0 pt-1.5 text-right font-mono text-xs text-slate-400 font-bold leading-none pr-2">
                {cert.issueDate}
              </div>

              {/* Timeline Card content */}
              <div 
                className={`flex-1 rounded-2xl border p-4 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all duration-300 ${
                  cert.isHighlighted 
                    ? 'border-indigo-500/40 bg-indigo-500/5 shadow-lg shadow-indigo-500/5' 
                    : 'bg-slate-900/40 hover:border-slate-700'
                }`}
                style={{ 
                  borderColor: cert.isHighlighted ? undefined : colors.borderColor,
                  backgroundColor: cert.isHighlighted ? undefined : colors.cardBg
                }}
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-[8px] font-mono font-bold text-indigo-400 uppercase">
                      {cert.category}
                    </span>
                    <span className="xs:hidden text-[8px] font-mono text-slate-500">{cert.issueDate}</span>
                    {cert.isHighlighted && (
                      <span className="text-[7px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow-sm leading-none">
                        Core Highlight
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-rose-50 font-sans tracking-tight leading-snug" style={{ color: colors.text }}>
                    {cert.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-0.5 gap-x-3 text-[10px] text-slate-500">
                    <span className="font-bold text-slate-400">{cert.issuer}</span>
                    <span className="opacity-45">•</span>
                    <span className="line-clamp-1 italic text-slate-400">Skills: {cert.skills}</span>
                  </div>
                </div>

                {/* Verify click out buttons */}
                <div className="shrink-0 flex items-center justify-end">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 px-3.5 py-2 text-xxs font-mono font-bold rounded-lg border text-slate-300 bg-slate-950 border-slate-800 hover:text-white transition-all shadow-sm cursor-pointer hover:bg-slate-900"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* External dynamic notice error boundary logging */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl text-xs bg-rose-500/5 border border-rose-500/20 text-rose-400 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block uppercase tracking-wide text-[9px] font-mono">Headless CMS API notice</span>
            <p className="opacity-80">
              Synchronisation error: "{errorMsg}". Displaying authenticated fallback credentials catalog instead.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
