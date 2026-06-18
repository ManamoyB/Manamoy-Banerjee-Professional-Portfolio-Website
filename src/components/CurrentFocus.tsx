import React from 'react';
import { Sparkles, BookOpen, Cpu, Layers } from 'lucide-react';

interface CurrentFocusProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    mutedText: string;
    borderColor: string;
    cardBg: string;
    accent?: string;
  };
}

export const CurrentFocus: React.FC<CurrentFocusProps> = ({ colors }) => {
  return (
    <div 
      className="p-6 rounded-3xl border relative overflow-hidden shadow-2xl transition-all duration-300 group hover:shadow-indigo-500/5 hover:-translate-y-0.5"
      style={{ 
        backgroundColor: colors.cardBg, 
        borderColor: colors.borderColor 
      }}
    >
      {/* Decorative high-contrast badge */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Handcrafted handwritten-style tape top header */}
      <div className="absolute -top-1 left-12 w-24 h-4 bg-orange-500/15 border-x border-orange-500/30 rotate-2 z-20 backdrop-blur-xs flex items-center justify-center">
        <span className="text-[7px] font-mono text-orange-400 font-bold uppercase tracking-widest">LIVE_STATUS_TAPE</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Current Engagement</span>
            <h3 className="text-sm font-black tracking-tight" style={{ color: colors.text }}>What I'm Focused On Right Now</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Learning Column */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span className="text-xxs font-mono font-bold uppercase tracking-wider">Learning</span>
            </div>
            <p className="text-xs font-semibold" style={{ color: colors.text }}>
              Agentic AI Frameworks
            </p>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Exploring multi-agent orchestration via AutoGen and custom LangGraph loops. Deep-diving into prompt alignments.
            </p>
          </div>

          {/* Building Column */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Layers className="w-4 h-4" />
              <span className="text-xxs font-mono font-bold uppercase tracking-wider">Building</span>
            </div>
            <p className="text-xs font-semibold" style={{ color: colors.text }}>
              Personal Intelligence Platform
            </p>
            <p className="text-[10px] leading-relaxed text-slate-400">
              A local, offline RAG system leveraging quantized local models to synthesize clinical studies on biological pathologic markers.
            </p>
          </div>

          {/* Reading Column */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-500">
              <BookOpen className="w-4 h-4" />
              <span className="text-xxs font-mono font-bold uppercase tracking-wider">Reading</span>
            </div>
            <p className="text-xs font-semibold" style={{ color: colors.text }}>
              Designing Data-Intensive Apps
            </p>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Studying consensus routing algorithms, write-ahead logging (WAL) internals, and partitioned transactional boundaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
