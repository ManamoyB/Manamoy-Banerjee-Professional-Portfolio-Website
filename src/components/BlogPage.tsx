import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Search, 
  Tag, 
  ChevronRight, 
  Mail, 
  Check, 
  ArrowLeft, 
  Share2, 
  TrendingUp, 
  List, 
  Menu, 
  X,
  Play
} from 'lucide-react';
import { blogPosts, BlogPost, popularPosts, recentPosts, allTags } from '../data/blogData';

interface BlogPageProps {
  colors: {
    text: string;
    mutedText: string;
    cardBg: string;
    borderColor: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  theme: 'aurora' | 'nova';
}

// Custom Markdown-to-React Block Renderer for type-safety and TOC support
interface ContentBlock {
  id: string;
  type: 'h1' | 'h2' | 'h3' | 'code' | 'p' | 'li';
  text: string;
  lang?: string;
}

function parseMarkdown(md: string): ContentBlock[] {
  const lines = md.split('\n');
  const blocks: ContentBlock[] = [];
  let inCode = false;
  let codeSnippet = '';
  let codeLang = '';
  let idCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block detection
    if (line.startsWith('```')) {
      if (inCode) {
        blocks.push({
          id: `block-code-${idCounter++}`,
          type: 'code',
          text: codeSnippet.trim(),
          lang: codeLang
        });
        inCode = false;
        codeSnippet = '';
        codeLang = '';
      } else {
        inCode = true;
        codeLang = line.replace('```', '').trim() || 'javascript';
      }
      continue;
    }

    if (inCode) {
      codeSnippet += line + '\n';
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Headers
    if (trimmed.startsWith('# ')) {
      blocks.push({
        id: `block-h1-${idCounter++}`,
        type: 'h1',
        text: trimmed.replace('# ', '').trim()
      });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({
        id: `block-h2-${idCounter++}`,
        type: 'h2',
        text: trimmed.replace('## ', '').trim()
      });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({
        id: `block-h3-${idCounter++}`,
        type: 'h3',
        text: trimmed.replace('### ', '').trim()
      });
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      blocks.push({
        id: `block-li-${idCounter++}`,
        type: 'li',
        text: trimmed.substring(2).trim()
      });
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push({
        id: `block-li-${idCounter++}`,
        type: 'li',
        text: trimmed.replace(/^\d+\.\s/, '').trim()
      });
    } else {
      blocks.push({
        id: `block-p-${idCounter++}`,
        type: 'p',
        text: trimmed
      });
    }
  }

  return blocks;
}

export const BlogPage: React.FC<BlogPageProps> = ({ colors, theme }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Newsletter variables
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Article Reader progress and scrolling
  const [scrollPercent, setScrollPercent] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);

  // Categories list
  const categories = ['All', 'AI', 'Machine Learning', 'Data Analytics', 'Career', 'Programming'];

  // Handle article scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPost || !readerRef.current) return;
      const element = readerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight <= 0) {
        setScrollPercent(0);
        return;
      }
      const scrolled = (element.scrollTop / totalHeight) * 100;
      setScrollPercent(scrolled);
    };

    const container = readerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedPost]);

  // Handle Newsletter Submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }, 1200);
  };

  // Filter Posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesCategory && matchesSearch && matchesTag;
  });

  // Featured Post is the first element
  const featuredPost = blogPosts[0];

  // Helper to jump to a DOM section in reader
  const scrollToHeading = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render full description with simple bold/math styling replacement
  const formatText = (text: string) => {
    // Basic text formatting for bold (**text**) and math formulae ($math$)
    let result = text;
    // Replace **
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace inline code `code`
    result = result.replace(/`(.*?)`/g, '<code class="bg-indigo-500/10 text-indigo-400 px-1 py-0.5 rounded font-mono text-xs">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="space-y-16 py-4 animate-fade-in relative z-20">
      
      {/* Article Reader Overlay or Inline Render */}
      {selectedPost ? (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Progress bar */}
          <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-800/40">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-75"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>

          {/* Reader Headers */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
            <button 
              onClick={() => {
                setSelectedPost(null);
                setScrollPercent(0);
              }}
              className="flex items-center gap-2 text-xs font-bold font-mono text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            
            <div className="flex items-center gap-2 text-xxs font-mono opacity-60">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedPost.readTime}</span>
              <span className="opacity-40">•</span>
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedPost.publishDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Table of Contents sidebar (Left) */}
            <div className="lg:col-span-3 space-y-6 hidden lg:block sticky top-24">
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                <div className="flex items-center gap-2 border-b pb-3 mb-3" style={{ borderColor: colors.borderColor }}>
                  <List className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">Table of Contents</span>
                </div>
                <nav className="space-y-2.5">
                  {parseMarkdown(selectedPost.content)
                    .filter(b => b.type === 'h1' || b.type === 'h2')
                    .map((block) => (
                      <button
                        key={block.id}
                        onClick={() => scrollToHeading(block.id)}
                        className={`text-left text-xxs block font-medium hover:text-indigo-400 transition-colors cursor-pointer ${
                          block.type === 'h1' ? 'pl-0 font-bold text-slate-300' : 'pl-3 text-slate-400'
                        }`}
                      >
                        {block.text}
                      </button>
                    ))}
                </nav>
              </div>

              {/* Share Stats */}
              <div className="p-5 rounded-2xl border text-center space-y-3" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                <span className="text-xxs font-mono opacity-50 block uppercase">Estimated Article Attention</span>
                <span className="text-2xl font-black text-rose-400 font-mono block">{(selectedPost.views * 1.34).toFixed(0)}</span>
                <p className="text-[10px] leading-relaxed text-slate-400">Total reader integrations documented through physical dev portal telemetry.</p>
              </div>
            </div>

            {/* Active Article Markdown Body (Center) */}
            <div 
              ref={readerRef}
              className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar" 
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              {/* Category flag */}
              <span className="text-xxs font-mono font-bold uppercase tracking-widest text-indigo-400 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit block">
                {selectedPost.category}
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: colors.text }}>
                {selectedPost.title}
              </h1>

              {/* Cover Gradient bar */}
              <div className="h-2 rounded-full" style={{ background: selectedPost.coverImage }} />

              {/* Parsing blocks dynamically */}
              <div className="space-y-5 text-sm leading-relaxed text-slate-300">
                {parseMarkdown(selectedPost.content).map((block) => {
                  switch (block.type) {
                    case 'h1':
                      return (
                        <h2 
                          id={block.id} 
                          key={block.id} 
                          className="text-lg sm:text-2xl font-bold pr-2 border-b pb-2 pt-4 border-dashed"
                          style={{ color: colors.text, borderColor: colors.borderColor }}
                        >
                          {block.text}
                        </h2>
                      );
                    case 'h2':
                      return (
                        <h3 
                          id={block.id} 
                          key={block.id} 
                          className="text-base sm:text-xl font-bold pt-3" 
                          style={{ color: colors.text }}
                        >
                          {block.text}
                        </h3>
                      );
                    case 'h3':
                      return (
                        <h4 
                          id={block.id} 
                          key={block.id} 
                          className="text-sm sm:text-lg font-bold pt-2 text-indigo-300"
                        >
                          {block.text}
                        </h4>
                      );
                    case 'code':
                      return (
                        <div key={block.id} className="relative rounded-xl border overflow-hidden" style={{ borderColor: colors.borderColor }}>
                          <div className="bg-slate-900 border-b px-4 py-1.5 flex justify-between items-center text-xxs font-mono text-slate-400" style={{ borderColor: colors.borderColor }}>
                            <span>{block.lang || 'python'}</span>
                            <span className="text-success uppercase text-[9px] font-bold">Copy Ready</span>
                          </div>
                          <pre className="bg-slate-950 p-4 overflow-x-auto text-xxs sm:text-xs font-mono text-cyan-400/90 leading-normal select-text">
                            <code>{block.text}</code>
                          </pre>
                        </div>
                      );
                    case 'li':
                      return (
                        <div key={block.id} className="flex gap-2 items-start pl-2 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                          <p className="text-slate-300 w-full">{formatText(block.text)}</p>
                        </div>
                      );
                    case 'p':
                    default:
                      return (
                        <p key={block.id} className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
                          {formatText(block.text)}
                        </p>
                      );
                  }
                })}
              </div>

              {/* Tags block in footer */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
                {selectedPost.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border opacity-80" style={{ borderColor: colors.borderColor }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles (Right Sidebar) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                <span className="text-xs font-bold font-mono block uppercase tracking-wider text-slate-200 mb-4 border-b pb-2" style={{ borderColor: colors.borderColor }}>
                  Related Articles
                </span>
                
                <div className="space-y-4">
                  {blogPosts
                    .filter(post => post.id !== selectedPost.id && (post.category === selectedPost.category || post.tags.some(t => selectedPost.tags.includes(t))))
                    .slice(0, 2)
                    .map((post) => (
                      <button
                        key={post.id}
                        onClick={() => {
                          setSelectedPost(post);
                          setScrollPercent(0);
                        }}
                        className="text-left w-full block group space-y-2 p-2 rounded-xl hover:bg-slate-800/10 transition-colors"
                      >
                        <div className="h-1.5 rounded" style={{ background: post.coverImage }} />
                        <h4 className="text-xs font-bold leading-snug group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-[9px] font-mono opacity-50 block">{post.readTime}</span>
                      </button>
                    ))}
                  
                  {blogPosts.filter(post => post.id !== selectedPost.id).length === 0 && (
                    <span className="text-xxs opacity-50 font-mono block">No immediate related modules available.</span>
                  )}
                </div>
              </div>

              {/* Quick newsletter inline box */}
              <div className="p-6 rounded-3xl border bg-gradient-to-b from-indigo-505/10 to-indigo-950/20 text-center space-y-3" style={{ borderColor: colors.borderColor }}>
                <Mail className="w-6 h-6 text-indigo-400 mx-auto" />
                <h4 className="text-xs font-black uppercase tracking-wider">Stay Tuned</h4>
                <p className="text-xxs text-slate-400">Receive incremental deep neural guides into your portal monthly.</p>
                
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xxs font-mono p-2 border rounded-lg bg-slate-900 border-indigo-500/20 focus:outline-none focus:border-indigo-500 text-center"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full font-bold uppercase text-[9px] font-mono py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg cursor-pointer"
                  >
                    {submitting ? 'Registering...' : 'Register'}
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Main Blogs List with Advanced Filters (Left side, 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* INLINE HERO BANNER */}
            <div className="rounded-3xl border p-8 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-950 to-slate-950 shadow-xl" style={{ borderColor: colors.borderColor }}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] bg-indigo-500/10 pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Technical Documentation Journal</span>
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
                  Insights & Learnings
                </h2>
                <p className="text-xs sm:text-sm font-sans max-w-xl text-slate-400">
                  Detailed documentation of machine learning operations, parameter optimization pipelines, vector searches, and undergraduate computer science survival coordinates.
                </p>
              </div>
            </div>

            {/* CATEGORY SELECTOR + SEARCH CONTROLS */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
              
              {/* Category switches */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedTag(null);
                    }}
                    className={`px-3 py-1.5 rounded-full border text-xxs font-mono font-bold transition-all cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-indigo-500 border-indigo-500 text-white' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ 
                      borderColor: activeCategory === cat ? colors.primary : colors.borderColor,
                      color: activeCategory === cat ? '#ffffff' : colors.text
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic search bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-indigo-400" />
                <input 
                  type="text" 
                  placeholder="Query syntax, codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border text-xxs font-mono rounded-full focus:outline-none focus:border-indigo-500 bg-slate-900"
                  style={{ borderColor: colors.borderColor, color: colors.text }}
                />
              </div>

            </div>

            {/* TAG CLEAR ACCENT */}
            {selectedTag && (
              <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-1.5 w-fit">
                <span className="text-xxs font-mono text-indigo-400 font-bold">Filtered tagged: #{selectedTag}</span>
                <button onClick={() => setSelectedTag(null)} className="text-xxs opacity-60 hover:opacity-100 text-rose-400 font-bold cursor-pointer">
                  [Clear]
                </button>
              </div>
            )}

            {/* FEATURED ARTICLE HERO PREVIEW (Only shown when active category is All and no search/tag exists) */}
            {activeCategory === 'All' && !searchQuery && !selectedTag && featuredPost && (
              <div 
                style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                className="rounded-3xl border p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl group hover:border-indigo-500/30 transition-all relative overflow-hidden"
              >
                {/* Visual Cover bar indicator */}
                <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: featuredPost.coverImage }} />
                
                <div className="md:col-span-4 space-y-4">
                  <div className="w-full aspect-[4/3] rounded-2xl relative overflow-hidden shrink-0 flex items-center justify-center text-3xl font-bold font-mono text-white" 
                    style={{ background: featuredPost.coverImage }}
                  >
                    <BookOpen className="w-12 h-12 opacity-80" />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xxs font-mono opacity-80">
                    <span className="font-bold text-indigo-400 uppercase tracking-widest">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.publishDate}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug group-hover:text-indigo-400 transition-all">
                    {featuredPost.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {featuredPost.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <button 
                      onClick={() => setSelectedPost(featuredPost)}
                      className="inline-flex items-center gap-2 text-xs font-bold font-mono text-indigo-400 group-hover:text-indigo-300 cursor-pointer"
                    >
                      <span>Read Featured Module</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-[10px] font-mono opacity-50">{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* GRID OF INLINE ARTICLES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts
                .filter(post => {
                  // Skip featured post from double display on full page when active category is 'All'
                  const isFilteredOrSearch = activeCategory !== 'All' || searchQuery !== '' || selectedTag !== null;
                  if (post.id === featuredPost.id && !isFilteredOrSearch) return false;
                  return true;
                })
                .map((post) => (
                  <div 
                    key={post.id}
                    className="p-5 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="space-y-3">
                      {/* Abstract header cover */}
                      <div className="h-24 rounded-xl flex items-center justify-center font-bold text-white relative overflow-hidden" style={{ background: post.coverImage }}>
                        <BookOpen className="w-6 h-6 opacity-80" />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
                        <span className="font-bold text-indigo-400 text-[9px] tracking-wider uppercase">{post.category}</span>
                        <span>{post.publishDate}</span>
                      </div>

                      <h4 className="text-sm font-black line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors" style={{ color: colors.text }}>
                        {post.title}
                      </h4>

                      <p className="text-xxs text-slate-400 leading-relaxed font-sans line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono text-indigo-400 group-hover:text-indigo-300 cursor-pointer"
                      >
                        <span>Integrate block</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <span className="text-[9px] font-mono opacity-50">{post.readTime}</span>
                    </div>
                  </div>
                ))}
              
              {filteredPosts.length === 0 && (
                <div className="col-span-2 text-center py-12 p-6 rounded-2xl border border-dashed" style={{ borderColor: colors.borderColor }}>
                  <Search className="w-10 h-10 mx-auto text-rose-400 opacity-60 mb-2 animate-bounce" />
                  <h4 className="text-sm font-bold opacity-80">Compilation Error: No Matching Posts</h4>
                  <p className="text-xxs text-slate-400 mt-1">Refine your query filters to reset local repositories.</p>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Area (Right side, 4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* POPULAR POSTS INDEX */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
              <div className="flex items-center gap-2 border-b pb-3 mb-4" style={{ borderColor: colors.borderColor }}>
                <TrendingUp className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">Metrics: Popular Posts</span>
              </div>
              
              <div className="space-y-4">
                {popularPosts.map((pop, idx) => {
                  const matchPost = blogPosts.find(p => p.id === pop.id);
                  return (
                    <button
                      key={pop.id}
                      onClick={() => matchPost && setSelectedPost(matchPost)}
                      className="text-left w-full block group space-y-1 cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-black opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        <div>
                          <h4 className="text-xs font-bold leading-normal text-slate-200 group-hover:text-indigo-400 transition-colors">
                            {pop.title}
                          </h4>
                          <span className="text-[9px] font-mono opacity-50 block">{pop.views} units integrated</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RECENT POSTS LIST */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
              <span className="text-xs font-bold font-mono block uppercase tracking-wider text-slate-200 mb-4 border-b pb-2" style={{ borderColor: colors.borderColor }}>
                Recent Chronicle Nodes
              </span>
              
              <div className="space-y-4">
                {recentPosts.map((rec) => {
                  const matchPost = blogPosts.find(p => p.id === rec.id);
                  return (
                    <button
                      key={rec.id}
                      onClick={() => matchPost && setSelectedPost(matchPost)}
                      className="text-left w-full block group space-y-1 cursor-pointer"
                    >
                      <h4 className="text-xs font-bold leading-normal text-slate-300 group-hover:text-indigo-400 transition-colors">
                        {rec.title}
                      </h4>
                      <span className="text-[9px] font-mono opacity-40 block">{rec.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAG CLOUD */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
              <span className="text-xs font-bold font-mono block text-slate-200 uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: colors.borderColor }}>
                Metadata Labels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag);
                      setActiveCategory('All');
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-400 font-bold'
                        : 'opacity-60 hover:opacity-100 bg-slate-900'
                    }`}
                    style={{ borderColor: colors.borderColor }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* MODERN NEWSLETTER SUBSCRIPTION COMPONENT */}
            <div className="p-6 rounded-3xl border relative overflow-hidden bg-gradient-to-b from-indigo-950/20 via-slate-950 to-slate-950 shadow-xl" style={{ borderColor: colors.borderColor }}>
              {/* background flow */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-[40px] bg-indigo-500/10 pointer-events-none" />
              
              <div className="space-y-4 relative z-10 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto sm:mx-0">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Undergraduate newsletter</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Get regular computer science notebooks, mathematical derivation breakdowns, and SDE placement coordinates directly.
                  </p>
                </div>

                {subscribed ? (
                  <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center gap-2.5 animate-fade-in text-xxs font-semibold">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Connection successful! Welcome to the loop.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <input 
                      type="email" 
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xxs font-mono p-2.5 border rounded-lg bg-slate-900 border-indigo-500/20 focus:outline-none focus:border-indigo-400"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full font-bold uppercase text-[9px] font-mono py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                    >
                      <span>{submitting ? 'Connecting Node...' : 'Connect Node'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
