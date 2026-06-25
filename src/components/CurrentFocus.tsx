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
      {/* Decorative dynamic ambient glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20"
        style={{ 
          background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)` 
        }}
      />
      
      {/* Handcrafted dynamic theme-matching status tape */}
      <div 
        className="absolute -top-1 left-12 w-24 h-4 border-x rotate-2 z-20 backdrop-blur-xs flex items-center justify-center animate-pulse"
        style={{ 
          backgroundColor: `${colors.primary}15`, 
          borderLeftColor: `${colors.primary}40`,
          borderRightColor: `${colors.primary}40`
        }}
      >
        <span className="text-[7px] font-mono font-black uppercase tracking-widest" style={{ color: colors.primary }}>
          LIVE_FOCUS
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center border"
            style={{ 
              backgroundColor: `${colors.primary}15`, 
              borderColor: `${colors.borderColor}` 
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold block" style={{ color: colors.primary }}>
              Current Engagement
            </span>
            <h3 className="text-sm font-black tracking-tight" style={{ color: colors.text }}>What I'm Focused On Right Now</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Learning Column */}
          <div 
            className="p-4 rounded-2xl border space-y-2 transition-all duration-300 shadow-xs"
            style={{ 
              backgroundColor: colors.cardBg, 
              borderColor: colors.borderColor 
            }}
          >
            <div className="flex items-center gap-1.5" style={{ color: colors.primary }}>
              <Cpu className="w-4 h-4 text-orange-600 dark:text-indigo-400" />
              <span className="text-[11px] font-mono font-black uppercase tracking-wider">Learning</span>
            </div>
            <p className="text-sm font-extrabold tracking-tight" style={{ color: colors.text }}>
              Agentic AI Frameworks
            </p>
            <p className="text-xs leading-relaxed font-normal" style={{ color: colors.mutedText }}>
              Exploring multi-agent orchestration via AutoGen and custom LangGraph loops. Deep-diving into prompt alignments.
            </p>
          </div>

          {/* Building Column */}
          <div 
            className="p-4 rounded-2xl border space-y-2 transition-all duration-300 shadow-xs"
            style={{ 
              backgroundColor: colors.cardBg, 
              borderColor: colors.borderColor 
            }}
          >
            <div className="flex items-center gap-1.5" style={{ color: colors.secondary }}>
              <Layers className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span className="text-[11px] font-mono font-black uppercase tracking-wider">Building</span>
            </div>
            <p className="text-sm font-extrabold tracking-tight" style={{ color: colors.text }}>
              Personal Intelligence Platform
            </p>
            <p className="text-xs leading-relaxed font-normal" style={{ color: colors.mutedText }}>
              A local, offline RAG system leveraging quantized local models to synthesize clinical studies on biological pathologic markers.
            </p>
          </div>

          {/* Reading Column */}
          <div 
            className="p-4 rounded-2xl border space-y-2 transition-all duration-300 shadow-xs"
            style={{ 
              backgroundColor: colors.cardBg, 
              borderColor: colors.borderColor 
            }}
          >
            <div className="flex items-center gap-1.5" style={{ color: colors.accent || colors.primary }}>
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-pink-400" />
              <span className="text-[11px] font-mono font-black uppercase tracking-wider">Reading</span>
            </div>
            <p className="text-sm font-extrabold tracking-tight" style={{ color: colors.text }}>
              Designing Data-Intensive Apps
            </p>
            <p className="text-xs leading-relaxed font-normal" style={{ color: colors.mutedText }}>
              Studying consensus routing algorithms, write-ahead logging (WAL) internals, and partitioned transactional boundaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

