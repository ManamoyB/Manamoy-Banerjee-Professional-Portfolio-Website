import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Search, 
  Sparkles, 
  Calendar,
  Image as ImageIcon,
  Check,
  Video,
  Clock,
  ExternalLink
} from 'lucide-react';

interface GalleryPageProps {
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

interface GalleryItem {
  id: string;
  title: string;
  category: 'College Life' | 'Projects' | 'Events' | 'Sports' | 'Certificates' | 'Workstation Setup';
  date: string;
  description: string;
  details: string;
  likes: number;
  comments: { user: string; text: string; date: string }[];
  isLiked?: boolean;
  isBookmarked?: boolean;
  shares: number;
  aspectRatio: string; // Tailwind class for grid spans or height multipliers
  colorTheme: string;
  svgType: string;
}

interface VideoLog {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  playbackSvgType: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ colors, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'timeline'>('photos');

  // Interactive local states for Instagram-like actions
  const [items, setItems] = useState<GalleryItem[]>([
    {
      id: 'item-1',
      title: 'SRM Tech Labs Brainstorming',
      category: 'College Life',
      date: 'Aug 2023',
      description: 'Collaborating in deep computer science lab sessions on predictive vision neural weights.',
      details: 'This photo captures a whiteboard detailing weight optimization pipelines for agricultural diagnostic trials. Formulated inside SRM labs with fellow student engineers.',
      likes: 142,
      comments: [
        { user: 'Siddharth_P', text: 'That gradient descent graph on the far right is insane!', date: '6h ago' },
        { user: 'Dr_Anjali', text: 'Excellent progress on the light model parameter sets. Keep pushing!', 'date': '1d ago' }
      ],
      aspectRatio: 'h-80',
      colorTheme: 'from-[#0f172a] via-[#1e1b4b] to-[#110c22]',
      svgType: 'brainstorm'
    },
    {
      id: 'item-2',
      title: 'Automated Academic File Parser',
      category: 'Projects',
      date: 'Mar 2024',
      description: 'Wrote an asynchronous local parser saving 11+ hours of labor in departmental operations.',
      details: 'A visualization of the optimized database routine built using Node.js filesystem streams and dual JSON indexing. Reduced administrative compilation times from 12 hours to 8 flat minutes.',
      likes: 89,
      comments: [
        { user: 'Sam_Dev', text: 'Clean recursion pattern, Manamoy!', date: '3d ago' }
      ],
      aspectRatio: 'h-96',
      colorTheme: 'from-[#022c22] via-[#042f1a] to-[#021d12]',
      svgType: 'code-parser'
    },
    {
      id: 'item-3',
      title: 'State Championship Varsity Board',
      category: 'Sports',
      date: 'Nov 2020',
      description: 'Scribbled strategy playbooks used during Varsity high-school division championships.',
      details: 'A nostalgic chalkboard diagram mapping the pick-and-roll motion offense that secured a crucial Game 7 overtime victory for our state-level squad.',
      likes: 215,
      comments: [
        { user: 'Coach_K', text: 'Best defensive coordinate layout we ever implemented.', date: '1w ago' },
        { user: 'Rohan_G', text: 'Captain came through clutch on those final 3-pointers!', date: '1w ago' }
      ],
      aspectRatio: 'h-80',
      colorTheme: 'from-[#3c1503] via-[#1c0a01] to-[#0c0500]',
      svgType: 'basketball-board'
    },
    {
      id: 'item-4',
      title: 'SRM Inter-Departmental Hackathon',
      category: 'Events',
      date: 'Nov 2023',
      description: 'Award ceremony securing Rank 1 for crop pathology diagnostic neural model applications.',
      details: 'Presented a working offline neural classifier built with quantized coefficients, achieving high structural validation accuracy in hostile rural cell network zones.',
      likes: 167,
      comments: [
        { user: 'Prof_Rajesh', text: 'Proud representative of SRM Computer Science discipline!', date: '2d ago' }
      ],
      isLiked: true,
      aspectRatio: 'h-96',
      colorTheme: 'from-[#1e1b4b] via-[#311042] to-[#12031c]',
      svgType: 'hack-trophy'
    },
    {
      id: 'item-5',
      title: 'IBM & Google Cloud BigQuery Sync',
      category: 'Certificates',
      date: 'Nov 2024',
      description: 'Completing dual professional credentials targeting high-density warehousing vectors.',
      details: 'High-fidelity proof mapping our simulated BigQuery database cluster node metrics executed during IBM Advanced Data Analytics and Google Business Intelligence pipelines.',
      likes: 110,
      comments: [],
      aspectRatio: 'h-80',
      colorTheme: 'from-[#1e1b4b] via-[#0f172a] to-[#030712]',
      svgType: 'bigquery-nodes'
    },
    {
      id: 'item-6',
      title: 'Vim & JetBrains Dark Station Setup',
      category: 'Workstation Setup',
      date: 'May 2025',
      description: 'Configuring minimalist workstation splits and localized vector containers.',
      details: 'Manamoy\'s localized desktop configuration featuring clean border frames, system terminals running Dockerized LLM backends, and low luminosity color profiles for maximum optical safety.',
      likes: 198,
      comments: [
        { user: 'WebCraft', text: 'That dark background theme is absolute fire.', date: '12h ago' }
      ],
      aspectRatio: 'h-96',
      colorTheme: 'from-[#030712] via-[#020617] to-[#090514]',
      svgType: 'workstation'
    }
  ]);

  // Video Section: Custom Interactive SVG Player
  const videos: VideoLog[] = [
    {
      id: 'vid-1',
      title: 'Basketball Highlight Reel: Inter-District Finals',
      category: 'Sports',
      duration: '02:45',
      description: 'Coordinated point-guard fast break sequences, tactical ball screens, and transition playbacks.',
      playbackSvgType: 'basketball-play'
    },
    {
      id: 'vid-2',
      title: 'SDE Recursive Sorting Visualizer live-demo',
      category: 'Projects',
      duration: '01:50',
      description: 'Asynchronous heap-tree and pointer allocations rendering tree-traversals live on local terminals.',
      playbackSvgType: 'sde-binary'
    },
    {
      id: 'vid-3',
      title: 'Agricultural OCR Neural Inference walkthrough',
      category: 'Events',
      duration: '04:12',
      description: 'Step-by-step presentation of neural diagnostic pathing running with low latency on local web sockets.',
      playbackSvgType: 'plant-infer'
    }
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(35); // Simulated slider position %
  const [videoVolume, setVideoVolume] = useState<number>(80);
  const [isVolMuted, setIsVolMuted] = useState<boolean>(false);

  // Lightbox Modal States
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [showShareTooltip, setShowShareTooltip] = useState<string | null>(null);

  // Image Categories list
  const categories = ['All', 'College Life', 'Projects', 'Events', 'Sports', 'Certificates', 'Workstation Setup'];

  // Timelined Memories Log representing chronological growth
  const memoriesTimeline = [
    {
      year: '2019',
      title: 'Academic Focus & Sports Mandates',
      subtitle: 'Higher Secondary School',
      desc: 'Mastered mathematical theory vector calculus and led varsity teams to city-wide basketball championships, building physical habits of resilience and accountability.'
    },
    {
      year: '2021',
      title: 'The Coding Spark',
      subtitle: 'Enrolling in SRM CSE Discipline',
      desc: 'Discovered the sheer creative power of python scripting. Coded first local scrapers and relational player registration panels.'
    },
    {
      year: '2023',
      title: 'AI Intersections & Academic Writing',
      subtitle: 'Pathology Diagnostics Research',
      desc: 'Collaborated on agricultural deep learning nodes. Won SRM departmental hackathon with offline model inference weights.'
    },
    {
      year: '2024',
      title: 'Industrial Dual Validations',
      subtitle: 'IBM & Google Professional Specializations',
      desc: 'Strengthened professional workflows with IBM advanced analytics regressions and Google Cloud BigQuery structures, establishing structural metric proof charts.'
    },
    {
      year: '2025+',
      title: 'Pioneering Local Intelligence Systems',
      subtitle: 'Next-Gen SDE & Agentic Portals',
      desc: 'Building modern offline-first vector indexing and full-stack React projects utilizing beautiful typography and seamless visual animations.'
    }
  ];

  // Logic: Filter and Search photos
  const filteredPhotos = useMemo(() => {
    let list = [...items];
    if (selectedCategory !== 'All') {
      list = list.filter(item => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, selectedCategory, searchQuery]);

  // Handle double click or single tap "Like" action
  const handleLikeItem = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const liked = !item.isLiked;
        return {
          ...item,
          isLiked: liked,
          likes: liked ? item.likes + 1 : item.likes - 1
        };
      }
      return item;
    }));
  };

  const handleBookmarkItem = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isBookmarked: !item.isBookmarked };
      }
      return item;
    }));
  };

  const handleShareItem = (id: string) => {
    setShowShareTooltip(id);
    navigator.clipboard.writeText(`https://manamoybanerjee.com/gallery/${id}`);
    setTimeout(() => {
      setShowShareTooltip(null);
    }, 2000);
  };

  const handleAddComment = (id: string) => {
    if (!newCommentText.trim()) return;
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          comments: [
            ...item.comments,
            { user: 'You_Recruiter', text: newCommentText, date: 'Just now' }
          ]
        };
      }
      return item;
    }));
    setNewCommentText('');
  };

  // Find active lightbox gallery item
  const activeLightboxItem = items.find(item => item.id === lightboxId);

  // Navigate lightbox items
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxId) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxId);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= filteredPhotos.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredPhotos.length - 1;
    setLightboxId(filteredPhotos[nextIndex].id);
  };

  // Draw simulated vectors/diagrams in gallery based on type
  const renderItemVector = (type: string, title: string) => {
    const isLight = theme !== 'aurora';
    switch (type) {
      case 'brainstorm':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" id={`svg-brainstorm-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect width="400" height="300" fill={isLight ? '#f8fafc' : '#01030d'} />
            <g opacity={isLight ? '0.35' : '0.15'} stroke={isLight ? '#cbd5e1' : '#6366f1'} strokeWidth="1">
              <path d="M0,40 h400 M0,80 h400 M0,120 h400 M0,160 h400 M0,200 h400 M0,240 h400" />
              <path d="M40,0 v300 M80,0 v300 M120,0 v300 M160,0 v300 M200,0 v300 M240,0 v300 M280,0 v300 M320,0 v300" />
            </g>
            <circle cx="200" cy="150" r="70" fill="none" stroke={isLight ? '#4f46e5' : '#4f46e5'} strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 130 150 Q 200 100 270 150 T 410 150" fill="none" stroke={isLight ? '#4f46e5' : '#818cf8'} strokeWidth="1.5" />
            <text x="50" y="50" fill={isLight ? '#4f46e5' : '#6366f1'} fontSize="10" fontFamily="monospace" fontWeight="bold">GRAD_DESCENT_STEP(W)</text>
            <text x="260" y="250" fill={isLight ? '#64748b' : '#312e81'} fontSize="9" fontFamily="monospace" fontWeight="bold">alpha = 0.0125</text>
            {/* Draw mathematical neural structures */}
            <circle cx="160" cy="140" r="10" fill="#4f46e5" />
            <circle cx="240" cy="140" r="10" fill="#4f46e5" />
            <circle cx="200" cy="190" r="10" fill={isLight ? '#6366f1' : '#818cf8'} />
            <line x1="160" y1="140" x2="200" y2="190" stroke={isLight ? '#4f46e5' : '#818cf8'} strokeWidth="1.5" />
            <line x1="240" y1="140" x2="200" y2="190" stroke={isLight ? '#4f46e5' : '#818cf8'} strokeWidth="1.5" />
          </svg>
        );
      case 'code-parser':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" id={`svg-codeparser-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect width="400" height="300" fill={isLight ? '#f0fdf4' : '#010d06'} />
            <g opacity={isLight ? '0.85' : '0.2'} fill={isLight ? '#166534' : '#10b981' } fontFamily="monospace" fontSize="8">
              <text x="20" y="40">{`const fs = require('fs');`}</text>
              <text x="20" y="55">{`const stream = fs.createReadStream('./dataset.csv');`}</text>
              <text x="20" y="70">{`stream.on('data', (chunk) => {`}</text>
              <text x="40" y="85">{`parseChunkAsync(chunk);`}</text>
              <text x="20" y="100">{`});`}</text>
              <text x="20" y="125">{`// OPERATION SPEED-UP SUMMARY`}</text>
              <text x="20" y="140">{`// TIMER_BEFORE: 12.00 HOURS`}</text>
              <text x="20" y="155" fill={isLight ? '#15803d' : '#34d399'} fontWeight="bold">{`// TIMER_AFTER : 8.12 MINUTES`}</text>
            </g>
            <rect x="220" y="60" width="140" height="150" rx="6" fill={isLight ? '#ffffff' : '#022c22'} stroke={isLight ? '#16a34a' : '#10b981'} strokeWidth="1" />
            <circle cx="245" cy="85" r="5" fill={isLight ? '#16a34a' : '#34d399'} />
            <circle cx="270" cy="85" r="5" fill={isLight ? '#15803d' : '#059669'} />
            <path d="M 230 110 h 120" stroke={isLight ? '#bbf7d0' : '#047857'} strokeWidth="1" />
            <polyline points="240,150 270,120 300,160 330,130" fill="none" stroke={isLight ? '#15803d' : '#34d399'} strokeWidth="1.5" />
          </svg>
        );
      case 'basketball-board':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" id={`svg-basketball-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect width="400" height="300" fill={isLight ? '#fffaf8' : '#0b0502'} />
            {/* Court boundary */}
            <rect x="30" y="30" width="340" height="240" fill="none" stroke={isLight ? '#ea580c' : '#ff6b35'} strokeWidth="2" opacity={isLight ? '0.4' : '0.3'} />
            {/* Play coordinates */}
            <circle cx="200" cy="150" r="40" fill="none" stroke={isLight ? '#ea580c' : '#ff6b35'} strokeWidth="1" opacity={isLight ? '0.5' : '0.4'} />
            <path d="M 30 150 A 40 40 0 0 0 110 150" fill="none" stroke={isLight ? '#ea580c' : '#ff6b35'} strokeWidth="1" opacity={isLight ? '0.5' : '0.4'} />
            <path d="M 370 150 A 40 40 0 0 0 290 150" fill="none" stroke={isLight ? '#ea580c' : '#ff6b35'} strokeWidth="1" opacity={isLight ? '0.5' : '0.4'} />
            {/* Custom Playbook Strategy Vectors */}
            <text x="50" y="60" fill={isLight ? '#c2410c' : '#ff6b35'} fontSize="12" fontFamily="sans-serif" fontWeight="black">GAME 7 DEFENSE</text>
            <circle cx="120" cy="100" r="8" fill="none" stroke={isLight ? '#c2410c' : '#ff6b35'} strokeWidth="2" />
            <text x="116" y="104" fill={isLight ? '#c2410c' : '#ff6b35'} fontSize="10" fontWeight="bold">X</text>
            <circle cx="160" cy="140" r="8" fill="none" stroke={isLight ? '#c2410c' : '#ff6b35'} strokeWidth="2" />
            <text x="156" y="144" fill={isLight ? '#c2410c' : '#ff6b35'} fontSize="10" fontWeight="bold">X</text>
            <circle cx="270" cy="130" r="8" fill="none" stroke={isLight ? '#15803d' : '#059669'} strokeWidth="2" />
            <text x="266" y="134" fill={isLight ? '#15803d' : '#34d399'} fontSize="10" fontWeight="bold">O</text>
            {/* Screen arrow */}
            <path d="M 124 104 Q 200 95 262 126" fill="none" stroke={isLight ? '#2563eb' : '#60a5fa'} strokeWidth="1.5" strokeDasharray="3,3" />
            <polygon points="262,126 254,122 257,130" fill={isLight ? '#2563eb' : '#60a5fa'} />
          </svg>
        );
      case 'hack-trophy':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-85" id={`svg-hackathon-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect width="400" height="300" fill={isLight ? '#faf5ff' : '#0a0212'} />
            <g stroke={isLight ? '#7e22ce' : '#a855f7'} strokeWidth="0.5" opacity={isLight ? '0.4' : '0.2'}>
              <polygon points="200,10 370,150 200,290 30,150" fill="none" />
              <line x1="200" y1="0" x2="200" y2="300" />
              <line x1="0" y1="150" x2="400" y2="150" />
            </g>
            {/* Trophy Illustration */}
            <path d="M150,70 h100 v60 c0,25 -20,45 -50,45 s-50,-20 -50,-45 Z" fill={isLight ? '#f3e8ff' : '#1e1b4b'} stroke={isLight ? '#7e22ce' : '#a855f7'} strokeWidth="2" />
            <rect x="188" y="175" width="24" height="40" fill={isLight ? '#faf5ff' : '#090514'} stroke={isLight ? '#7e22ce' : '#a855f7'} strokeWidth="1.5" />
            <rect x="140" y="215" width="120" height="15" rx="3" fill={isLight ? '#e9d5ff' : '#311042'} stroke={isLight ? '#a855f7' : '#d946ef'} strokeWidth="2" />
            {/* Large golden star */}
            <circle cx="200" cy="120" r="24" fill={isLight ? '#ea580c' : '#ea580c'} />
            <text x="193" y="127" fill={isLight ? '#fef08a' : '#fef08a'} fontSize="20" fontWeight="bold">★</text>
            <text x="147" y="260" fill={isLight ? '#7e22ce' : '#d946ef'} fontSize="12" fontFamily="monospace" fontWeight="black">RANK 1 OUTCOME</text>
          </svg>
        );
      case 'bigquery-nodes':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" id={`svg-bigquery-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <rect width="400" height="300" fill={isLight ? '#f0f9ff' : '#050811'} />
            <g opacity={isLight ? '0.3' : '0.1'} stroke={isLight ? '#0284c7' : '#3b82f6'} strokeWidth="1">
              <circle cx="200" cy="150" r="110" fill="none" />
              <circle cx="200" cy="150" r="70" fill="none" />
            </g>
            {/* Warehouse cluster nodes */}
            <circle cx="200" cy="60" r="14" fill={isLight ? '#ffffff' : '#1e1b4b'} stroke="#3b82f6" strokeWidth="1.5" />
            <text x="181" y="100" fill={isLight ? '#0284c7' : '#60a5fa'} fontSize="8" fontFamily="monospace" fontWeight="bold">GCP BigQuery</text>
            
            <circle cx="290" cy="190" r="14" fill={isLight ? '#ffffff' : '#1e1b4b'} stroke="#3b82f6" strokeWidth="1.5" />
            <text x="270" y="225" fill={isLight ? '#0284c7' : '#60a5fa'} fontSize="8" fontFamily="monospace" fontWeight="bold">IBM RAG Mod</text>
            
            <circle cx="110" cy="190" r="14" fill={isLight ? '#ffffff' : '#1e1b4b'} stroke="#3b82f6" strokeWidth="1.5" />
            <text x="96" y="225" fill={isLight ? '#0284c7' : '#60a5fa'} fontSize="8" fontFamily="monospace" fontWeight="bold">Regression</text>
            
            {/* Draw connectors */}
            <line x1="200" y1="74" x2="290" y2="176" stroke={isLight ? '#ea580c' : '#f59e0b'} strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="200" y1="74" x2="110" y2="176" stroke={isLight ? '#ea580c' : '#f59e0b'} strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="110" y1="190" x2="276" y2="190" stroke={isLight ? '#16a34a' : '#10b981'} strokeWidth="1" />
            <text x="175" y="180" fill={isLight ? '#16a34a' : '#10b981'} fontSize="9" fontFamily="monospace" fontWeight="bold">SYNCED</text>
          </svg>
        );
      default:
        // workstation
        return (
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: colors.bg }}
          >
            <img 
              src="/src/assets/images/gallery_highlight_1781818914621.jpg" 
              alt="Vim & JetBrains Dark Station Setup" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        );
    }
  };

  // Video playback SVG drawings
  const renderPlaybackSvg = (type: string) => {
    const isLight = theme !== 'aurora';
    switch (type) {
      case 'basketball-play':
        return (
          <svg viewBox="0 0 600 350" className="w-full h-full">
            <rect width="600" height="350" fill={isLight ? '#fffaf8' : '#0c0502'} />
            {/* Interactive play court vectors in motion */}
            <g opacity={isVideoPlaying ? (isLight ? "0.8" : "0.6") : (isLight ? "0.5" : "0.3")} stroke={isLight ? '#ea580c' : '#ff6b35'} strokeWidth="1.5">
              <rect x="50" y="30" width="500" height="290" fill="none" />
              <circle cx="300" cy="175" r="60" fill="none" />
              <path d="M 50 175 A 60 60 0 0 0 170 175" fill="none" />
              <path d="M 550 175 A 60 60 0 0 0 430 175" fill="none" />
            </g>
            {/* Active player movement path */}
            {isVideoPlaying ? (
              <g>
                <motion.circle 
                  cx="120" 
                  cy="175" 
                  r="12" 
                  fill="#ff6b35" 
                  stroke="#fff" 
                  strokeWidth="2"
                  animate={{ cx: [120, 220, 380, 500, 120] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Ball */}
                <motion.circle 
                  cx="135" 
                  cy="165" 
                  r="6" 
                  fill="#ea580c" 
                  animate={{ cx: [135, 230, 395, 490, 135], cy: [165, 140, 185, 170, 165] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <text x="360" y="60" fill={isLight ? '#16a34a' : '#34d399'} fontSize="14" fontFamily="monospace" className="animate-pulse" fontWeight="bold">PLAYING: HIGHLIGHTS REEL</text>
              </g>
            ) : (
              <g>
                <circle cx="120" cy="175" r="12" fill="#ff6b35" opacity="0.5" />
                <circle cx="135" cy="165" r="6" fill="#ea580c" opacity="0.5" />
                <text x="210" y="190" fill={isLight ? '#0f172a' : '#fff'} fontSize="18" fontFamily="sans-serif" fontWeight="bold">Video Paused // Click Play</text>
              </g>
            )}
          </svg>
        );
      case 'sde-binary':
        return (
          <svg viewBox="0 0 600 350" className="w-full h-full">
            <rect width="600" height="350" fill={isLight ? '#f0fdf4' : '#010d06'} />
            <g stroke={isLight ? '#16a34a' : '#10b981'} strokeWidth="2" opacity={isVideoPlaying ? "0.8" : "0.4"}>
              <line x1="300" y1="50" x2="200" y2="120" />
              <line x1="300" y1="50" x2="400" y2="120" />
              <line x1="200" y1="120" x2="130" y2="200" />
              <line x1="200" y1="120" x2="270" y2="200" />
            </g>
            {isVideoPlaying ? (
              <g>
                {/* Highlight active search sweeps */}
                <motion.circle 
                  cx="300" cy="50" r="16" fill={isLight ? '#ffffff' : '#022c22'} stroke={isLight ? '#16a34a' : '#34d399'} strokeWidth="2"
                  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                />
                <text x="292" y="55" fill={isLight ? '#15803d' : '#34d399'} fontSize="12" fontFamily="monospace" fontWeight="bold">99</text>
                <motion.circle 
                  cx="200" cy="120" r="16" fill={isLight ? '#ffffff' : '#022c22'} stroke={isLight ? '#16a34a' : '#34d399'} strokeWidth="2"
                  animate={{ scale: [1, 1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <text x="192" y="125" fill={isLight ? '#15803d' : '#34d399'} fontSize="12" fontFamily="monospace" fontWeight="bold">24</text>
                <text x="380" y="280" fill={isLight ? '#15803d' : '#34d399'} fontSize="11" fontFamily="monospace" fontWeight="bold">TIME_ELAPSED: 0.12ms</text>
                <text x="380" y="300" fill={isLight ? '#16a34a' : '#10b981'} fontSize="11" fontFamily="monospace" fontWeight="bold">COMPILATION: SUCCESSFUL</text>
              </g>
            ) : (
              <g>
                <circle cx="300" cy="50" r="16" fill={isLight ? '#ffffff' : '#022c22'} stroke={isLight ? '#16a34a' : '#10b981'} opacity="0.4" />
                <text x="210" y="250" fill={isLight ? '#0f172a' : '#fff'} fontSize="18" fontFamily="sans-serif" fontWeight="bold">SDE Presentation Paused</text>
              </g>
            )}
          </svg>
        );
      default:
        // plant-infer
        return (
          <svg viewBox="0 0 600 350" className="w-full h-full">
            <rect width="600" height="350" fill={isLight ? '#f5f3ff' : '#02020f'} />
            <g opacity={isVideoPlaying ? "1" : "0.5"}>
              {/* Plant Diagnostic frame */}
              <rect x="180" y="50" width="240" height="180" fill="none" stroke={isLight ? '#7c3aed' : '#6366f1'} strokeWidth="2" strokeDasharray="3,3" />
              <path d="M 300 210 Q 250 140 300 70 Q 350 140 300 210 Z" fill={isLight ? '#8b5cf6' : '#10b981'} fillOpacity="0.15" stroke={isLight ? '#7c3aed' : '#10b981'} strokeWidth="2" />
              {isVideoPlaying ? (
                <g>
                  {/* Rotating neural diagnostic scan bars */}
                  <motion.line 
                    x1="180" x2="420" y1="50" y2="50" stroke="#f43f5e" strokeWidth="2"
                    animate={{ y1: [50, 230, 50], y2: [50, 230, 50] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="200" y="80" fill="#f43f5e" fontSize="12" fontFamily="monospace" fontWeight="bold">SCANNING PATHOLOGY...</text>
                  <text x="200" y="210" fill={isLight ? '#7c3aed' : '#10b981'} fontSize="12" fontFamily="monospace" fontWeight="bold">CONFIDENCE: 98.42%</text>
                </g>
              ) : (
                <text x="240" y="280" fill={isLight ? '#0f172a' : '#fff'} fontSize="18" fontFamily="sans-serif" fontWeight="bold">Click Play walkthrough</text>
              )}
            </g>
          </svg>
        );
    }
  };

  const activeVideo = videos[activeVideoIndex];

  return (
    <div className="space-y-12 py-4 animate-fade-in" id="humanized-gallery">
      
      {/* 1. HERO HEADER AREA - INTENT DESCRIPTION */}
      <div 
        className="rounded-3xl border p-8 sm:p-10 relative overflow-hidden shadow-2xl transition-all duration-300" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor 
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] bg-indigo-500/10 pointer-events-none -translate-y-12" />
        <div className="absolute bottom-0 left-10 w-44 h-44 rounded-full blur-[90px] bg-emerald-500/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/25 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-extrabold text-[10px]">Behind The Code Frame</span>
            </span>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight" style={{ color: colors.text }}>
              Gallery & Moments
            </h2>
            <p className="text-sm max-w-2xl font-semibold leading-relaxed" style={{ color: colors.mutedText }}>
              Humanizing the technical ledger. Explore visual reflections of state basketball championships, hackathon presentations, local workstations, and personal timeline achievements through interactive elements.
            </p>
          </div>

          <div 
            className="flex gap-1 p-1.5 rounded-full border shrink-0 font-mono text-xxs transition-colors"
            style={{ 
              backgroundColor: theme === 'aurora' ? '#020617' : '#f1f5f9',
              borderColor: colors.borderColor 
            }}
          >
            <button 
              onClick={() => setActiveTab('photos')}
              className="px-4 py-2 rounded-full cursor-pointer font-bold transition-all text-xxs"
              style={{
                backgroundColor: activeTab === 'photos' ? colors.primary : 'transparent',
                color: activeTab === 'photos' ? '#ffffff' : colors.mutedText
              }}
            >
              Moments Masonry
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className="px-4 py-2 rounded-full cursor-pointer font-bold transition-all text-xxs"
              style={{
                backgroundColor: activeTab === 'videos' ? colors.primary : 'transparent',
                color: activeTab === 'videos' ? '#ffffff' : colors.mutedText
              }}
            >
              Simulated Logs
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className="px-4 py-2 rounded-full cursor-pointer font-bold transition-all text-xxs"
              style={{
                backgroundColor: activeTab === 'timeline' ? colors.primary : 'transparent',
                color: activeTab === 'timeline' ? '#ffffff' : colors.mutedText
              }}
            >
              Refinement Timeline
            </button>
          </div>
        </div>
      </div>

      {/* RENDER TAB: PHOTOS MASONRY */}
      {activeTab === 'photos' && (
        <div className="space-y-8">
          
          {/* SEARCHING & INTERACTIVE CATEGORIES */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
            {/* Category selection */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3 py-1.5 rounded-full border text-xxs font-mono font-bold transition-all cursor-pointer"
                    style={{
                      borderColor: isSelected ? colors.primary : colors.borderColor,
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                      color: isSelected ? '#ffffff' : colors.text
                    }}
                  >
                    {cat === 'All' ? 'All Snapshots' : cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-72 leading-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search moments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border text-xxs font-mono rounded-full focus:outline-none focus:border-indigo-500 transition-colors"
                style={{ 
                  borderColor: colors.borderColor,
                  backgroundColor: theme === 'aurora' ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
                  color: colors.text
                }}
              />
            </div>
          </div>

          {/* MASONRY PICTURES GRID */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid rounded-2xl border backdrop-blur-md overflow-hidden relative group/card flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 mb-6"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.borderColor
                  }}
                  id={`gallery-item-${item.id}`}
                >
                  
                  {/* Photo area with Custom SVG representation */}
                  <div 
                    onClick={() => setLightboxId(item.id)}
                    className="relative overflow-hidden cursor-zoom-in border-b flex items-center justify-center transition-colors"
                    style={{ 
                      backgroundColor: theme === 'aurora' ? '#080B14' : '#f8fafc',
                      borderColor: colors.borderColor 
                    }}
                  >
                    <div className="w-full h-56 flex items-center justify-center">
                      {renderItemVector(item.svgType, item.title)}
                    </div>
                    {/* Hover Overlay Zoom */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 flex items-center justify-center transition-all duration-300">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 select-none text-white scale-75 group-hover/card:scale-100 transition-transform">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Category tag */}
                    <span className="absolute bottom-3 left-3 text-[8px] font-mono font-bold bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-indigo-300 select-none">
                      {item.category}
                    </span>
                  </div>

                  {/* Body & Instagram level Actions */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{item.date} // SNAPSHOT</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xxs">.{item.id.toUpperCase()}</span>
                    </div>

                    <h3 
                      onClick={() => setLightboxId(item.id)}
                      className="text-sm font-black hover:text-indigo-500 transition-colors cursor-zoom-in"
                      style={{ color: colors.text }}
                    >
                      {item.title}
                    </h3>
                    
                    <p className="text-xs font-semibold leading-relaxed" style={{ color: colors.mutedText }}>
                      {item.description}
                    </p>

                    {/* Instagram Interactions Bar */}
                    <div className="pt-3 border-t border-dashed flex justify-between items-center text-slate-300" style={{ borderColor: colors.borderColor }}>
                      <div className="flex items-center gap-3">
                        {/* Hearts like toggles */}
                        <button 
                          onClick={() => handleLikeItem(item.id)}
                          className={`flex items-center gap-1 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 ${item.isLiked ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-indigo-500 dark:hover:text-white'}`}
                        >
                          <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-rose-500' : ''}`} />
                          <span className="text-[10px] font-mono">{item.likes}</span>
                        </button>

                        {/* Comments count */}
                        <button 
                          onClick={() => setLightboxId(item.id)}
                          className="flex items-center gap-1 cursor-zoom-in text-slate-400 hover:text-indigo-500 dark:hover:text-white"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-[10px] font-mono">{item.comments.length}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 relative">
                        {/* Bookmark */}
                        <button 
                          onClick={() => handleBookmarkItem(item.id)}
                          className={`p-1 cursor-pointer hover:scale-110 active:scale-95 ${item.isBookmarked ? 'text-amber-400' : 'text-slate-400 hover:text-indigo-500 dark:hover:text-white'}`}
                        >
                          <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-amber-400' : ''}`} />
                        </button>

                        {/* Share link and trigger copied tooltip */}
                        <button 
                          onClick={() => handleShareItem(item.id)}
                          className="p-1 cursor-pointer hover:scale-110 text-slate-400 hover:text-indigo-500 dark:hover:text-white"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* Link share copy modal overlay */}
                        {showShareTooltip === item.id && (
                          <div className="absolute right-0 bottom-7 bg-indigo-600 text-white font-mono text-[8px] px-2 py-1 rounded shadow-lg z-20 whitespace-nowrap animate-fade-in border border-indigo-400">
                            LINK COPIED!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Show preview comment list */}
                    {item.comments.length > 0 && (
                      <div 
                        className="mt-2.5 p-2.5 rounded-xl border space-y-1.5 transition-colors" 
                        style={{ 
                          backgroundColor: theme === 'aurora' ? 'rgba(2, 6, 23, 0.4)' : 'rgba(15, 23, 42, 0.04)',
                          borderColor: colors.borderColor 
                        }}
                      >
                        {item.comments.slice(0, 1).map((c, i) => (
                          <div key={i} className="text-[10px] leading-relaxed">
                            <span className={`font-mono font-black mr-1.5 ${theme === 'aurora' ? 'text-indigo-400' : 'text-indigo-600'}`}>@{c.user}</span>
                            <span className="font-semibold" style={{ color: colors.text }}>{c.text}</span>
                          </div>
                        ))}
                        {item.comments.length > 1 && (
                          <button 
                            onClick={() => setLightboxId(item.id)}
                            className="text-[9px] font-mono font-bold block pt-1 hover:text-indigo-500"
                            style={{ color: colors.mutedText }}
                          >
                            View all {item.comments.length} comments...
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* RENDER TAB: SIMULATED VIDEOS STAGE */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Simulated Video screen (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              className="rounded-3xl border overflow-hidden relative shadow-2xl bg-black"
              style={{ borderColor: colors.borderColor }}
            >
              {/* Playback SVG Stage container */}
              <div className="relative aspect-video w-full flex items-center justify-center">
                {renderPlaybackSvg(activeVideo.playbackSvgType)}
                
                {/* Big play button absolute overlay */}
                {!isVideoPlaying && (
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute p-5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-xl transition-all scale-100 hover:scale-105"
                  >
                    <Play className="w-8 h-8 fill-white ml-0.5" />
                  </button>
                )}
              </div>

              {/* Video control bottom bar HUD */}
              <div 
                className="p-4 border-t flex flex-col gap-3 relative transition-colors" 
                style={{ 
                  backgroundColor: theme === 'aurora' ? '#090d16' : '#ffffff',
                  borderColor: colors.borderColor 
                }}
              >
                {/* Scrubber timeline tracking progress */}
                <div 
                  className="w-full h-1 rounded-full overflow-hidden cursor-pointer relative"
                  style={{ backgroundColor: theme === 'aurora' ? '#1e293b' : '#cbd5e1' }}
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-indigo-500" 
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Left/Right actions volume controllers */}
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-500 hover:bg-slate-500/10 cursor-pointer"
                      style={{ color: colors.text }}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <div className="flex items-center gap-1.5 text-xxs block">
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">00:{Math.floor(videoProgress * 0.05)}</span>
                      <span style={{ color: colors.mutedText }}>/</span>
                      <span style={{ color: colors.mutedText }} className="font-extrabold">{activeVideo.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Volume Mute */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsVolMuted(!isVolMuted)}
                        className="p-1 rounded hover:bg-slate-500/10"
                        style={{ color: colors.mutedText }}
                      >
                        {isVolMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={isVolMuted ? 0 : videoVolume} 
                        onChange={(e) => {
                          setVideoVolume(Number(e.target.value));
                          setIsVolMuted(false);
                        }}
                        className="w-16 h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-500 rounded-lg appearance-none cursor-pointer" 
                      />
                    </div>

                    <span 
                      className="text-[10px] px-1.5 py-0.5 border rounded uppercase font-bold text-xxs"
                      style={{ 
                        borderColor: colors.borderColor,
                        backgroundColor: theme === 'aurora' ? '#020617' : '#f1f5f9',
                        color: colors.text 
                      }}
                    >
                      1080p LOG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Video description details */}
            <div 
              className="p-6 rounded-2xl border space-y-2 transition-colors" 
              style={{ 
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor 
              }}
            >
              <span className="text-[9px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/20 font-bold uppercase">
                ACTIVE VIBRANCY SOURCE // {activeVideo.category}
              </span>
              <h3 className="text-lg font-black" style={{ color: colors.text }}>
                {activeVideo.title}
              </h3>
              <p className="text-xs leading-relaxed font-semibold mt-1" style={{ color: colors.mutedText }}>
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* Videos Playlists switcher sidebar (4 columns) */}
          <div 
            className="lg:col-span-4 p-6 rounded-3xl border space-y-4 transition-colors" 
            style={{ 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderColor 
            }}
          >
            <span 
              className="text-[10px] font-mono uppercase tracking-widest font-bold block border-b border-dashed pb-2"
              style={{ 
                borderColor: colors.borderColor,
                color: colors.text 
              }}
            >
              Memory Reels Checklist
            </span>
            <div className="space-y-3">
              {videos.map((vid, index) => {
                const isActive = activeVideoIndex === index;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideoIndex(index);
                      setIsVideoPlaying(false);
                      setVideoProgress(index === 0 ? 35 : index === 1 ? 75 : 15);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      isActive 
                        ? 'border-indigo-500/30' 
                        : 'hover:border-indigo-500/20'
                    }`}
                    style={{
                      backgroundColor: isActive 
                        ? 'rgba(99, 102, 241, 0.08)' 
                        : (theme === 'aurora' ? 'rgba(15, 23, 42, 0.4)' : '#ffffff'),
                      borderColor: isActive ? colors.primary : colors.borderColor
                    }}
                  >
                    <div 
                      className="p-3 rounded-xl flex items-center justify-center border shrink-0 text-indigo-600 dark:text-indigo-400"
                      style={{ 
                        backgroundColor: theme === 'aurora' ? '#020617' : '#f8fafc',
                        borderColor: colors.borderColor 
                      }}
                    >
                      <Video className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-slate-500 block font-bold">{vid.duration} mins // {vid.category}</span>
                      <h4 className="text-xs font-bold truncate transition-colors" style={{ color: isActive ? '#4f46e5' : colors.text }}>
                        {vid.title}
                      </h4>
                      <p className="text-[10px] font-semibold truncate block mt-0.5" style={{ color: colors.mutedText }}>{vid.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}      {/* RENDER TAB: CHRONOLOGICAL REFINEMENT TIMELINE */}
      {activeTab === 'timeline' && (
        <div 
          className="p-6 sm:p-10 rounded-3xl border max-w-4xl mx-auto transition-colors shadow-xl" 
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <div className="border-b pb-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2" style={{ borderColor: colors.borderColor }}>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-extrabold block">
                Humanized Narrative Path
              </span>
              <h3 className="text-xl font-black" style={{ color: colors.text }}>Persistent Chronicles</h3>
            </div>
            <span 
              className="text-[9px] font-mono border px-2 py-0.5 rounded uppercase font-bold"
              style={{
                backgroundColor: theme === 'aurora' ? '#090d16' : '#f1f5f9',
                borderColor: colors.borderColor,
                color: colors.text
              }}
            >
              2019 — 2025 ACTIVE PERIOD
            </span>
          </div>

          <div className="relative pl-8 space-y-10">
            {/* High visual vertical timeline line */}
            <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/30 to-indigo-500/10 pointer-events-none" />

            {memoriesTimeline.map((item, idx) => (
              <div key={idx} className="relative group flex flex-col md:flex-row gap-4 items-start transition-transform duration-200 hover:-translate-y-0.5">
                {/* Node indicator */}
                <div 
                  className="absolute -left-[25px] w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center border-indigo-500 group-hover:scale-110 transition-transform shadow-lg"
                  style={{ backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff' }}
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>

                {/* Left side year tag */}
                <div className="w-24 shrink-0 font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">
                  {item.year}
                </div>

                {/* Right side narrative card */}
                <div 
                  className="flex-1 p-5 rounded-2xl border transition-all hover:shadow-md" 
                  style={{ 
                    backgroundColor: theme === 'aurora' ? '#0f172a/20' : '#f8fafc',
                    borderColor: colors.borderColor 
                  }}
                >
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">{item.subtitle}</span>
                  <h4 className="text-sm font-black mt-0.5 leading-tight" style={{ color: colors.text }}>{item.title}</h4>
                  <p className="text-xs font-semibold leading-relaxed mt-2.5" style={{ color: colors.mutedText }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX / DETAILS MODAL VIEWER */}
      {lightboxId && activeLightboxItem && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6"
          id="gallery-lightbox"
        >
          {/* Close back */}
          <button 
            onClick={() => setLightboxId(null)}
            className="absolute top-4 right-4 p-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 text-slate-200 cursor-pointer z-50 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <div 
            className="relative w-full max-w-5xl rounded-3xl border overflow-hidden grid grid-cols-1 md:grid-cols-12 md:h-[600px] shadow-2xl animate-fade-in"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.cardBg
            }}
          >
            {/* Left side: Visual representation (7 columns) */}
            <div 
              className="md:col-span-7 flex flex-col justify-between relative min-h-[300px] md:h-full border-b md:border-b-0 md:border-r" 
              style={{ 
                backgroundColor: theme === 'aurora' ? '#080B14' : '#f8fafc',
                borderColor: colors.borderColor 
              }}
            >
              <div className="flex-1 w-full flex items-center justify-center p-4">
                {renderItemVector(activeLightboxItem.svgType, activeLightboxItem.title)}
              </div>

              {/* Lightbox nav arrows overlay */}
              <button 
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/80 rounded-full text-white cursor-pointer scale-90 md:scale-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/80 rounded-full text-white cursor-pointer scale-90 md:scale-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div 
                className="p-4 border-t border-dashed flex justify-between items-center text-slate-400 text-xxs block" 
                style={{ borderColor: colors.borderColor }}
              >
                <span className="font-semibold" style={{ color: colors.mutedText }}>Simulated Vector Proof // High Fidelity SVG</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">ID: #{activeLightboxItem.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Right side: Detailed Instagram profile context commenting (5 columns) */}
            <div 
              className="md:col-span-5 flex flex-col h-full divide-y divide-dashed transition-colors" 
              style={{ 
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor 
              }}
            >
              
              {/* Creator Header */}
              <div 
                className="p-5 flex justify-between items-center transition-colors"
                style={{ backgroundColor: theme === 'aurora' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-xxs border border-indigo-500/30">
                    MB
                  </div>
                  <div>
                    <span className="text-xs font-black block" style={{ color: colors.text }}>@Manamoy_Banerjee</span>
                    <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 leading-none block font-bold">AI Engineer • CSE Student</span>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-slate-500 font-bold">2019 — 2025 STAGE</span>
              </div>

              {/* Details & Backstory explanation */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
                <div className="space-y-1">
                  <h3 className="text-sm font-black leading-tight" style={{ color: colors.text }}>
                    {activeLightboxItem.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold" style={{ color: colors.mutedText }}>{activeLightboxItem.date} // Category: {activeLightboxItem.category}</span>
                </div>

                <p className="text-xs leading-relaxed font-semibold" style={{ color: colors.mutedText }}>
                  {activeLightboxItem.details}
                </p>

                {/* Interactive Comment Registry */}
                <div className="space-y-3 pt-3 border-t border-dashed" style={{ borderColor: colors.borderColor }}>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold block" style={{ color: colors.text }}>
                    Comment Log Panel ({activeLightboxItem.comments.length})
                  </span>
                  
                  {activeLightboxItem.comments.length === 0 ? (
                    <span className="text-[10px] font-mono text-slate-500 italic block py-3 font-semibold">No posts yet. Place a professional query comment below!</span>
                  ) : (
                    <div className="space-y-2.5">
                      {activeLightboxItem.comments.map((c, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-[10px] leading-relaxed">
                          <span className={`w-5 h-5 rounded-full bg-slate-500/10 flex items-center justify-center font-mono text-[8px] shrink-0 font-bold ${c.user === 'You_Recruiter' ? 'text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 bg-emerald-500/5' : ''}`} style={{ color: colors.mutedText }}>
                            {c.user.slice(0, 2).toUpperCase()}
                          </span>
                          <div 
                            className="flex-1 p-2 rounded-xl border transition-colors"
                            style={{ 
                              backgroundColor: theme === 'aurora' ? '#0f172a/30' : '#f8fafc',
                              borderColor: colors.borderColor 
                            }}
                          >
                            <span className={`font-mono font-semibold mr-1 ${theme === 'aurora' ? 'text-indigo-400' : 'text-indigo-600'}`}>@{c.user}</span>
                            <p className="font-semibold text-xs mt-0.5" style={{ color: colors.text }}>{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Likes & Input comments */}
              <div 
                className="p-5 space-y-3 shrink-0"
                style={{ backgroundColor: theme === 'aurora' ? '#080d16' : '#ffffff' }}
              >
                <div className="flex justify-between items-center text-slate-300">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleLikeItem(activeLightboxItem.id)}
                      className={`flex items-center gap-1 cursor-pointer transition-colors ${activeLightboxItem.isLiked ? 'text-rose-500' : 'text-slate-400'}`}
                    >
                      <Heart className={`w-4 h-4 ${activeLightboxItem.isLiked ? 'fill-rose-500' : ''}`} />
                      <span className="text-[10px] font-mono font-bold" style={{ color: colors.text }}>{activeLightboxItem.likes}</span>
                    </button>
                    <span className="text-[10px] font-mono flex items-center gap-1 py-1 font-bold" style={{ color: colors.mutedText }}>
                      <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                      {activeLightboxItem.comments.length} Comments
                    </span>
                  </div>

                  <span className="text-[8px] font-mono flex items-center gap-1 font-bold" style={{ color: colors.mutedText }}>
                    <Clock className="w-3 h-3 text-slate-500" />
                    PERSISTENT_LEDGER
                  </span>
                </div>

                {/* Comment typing form */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type comments under professional ledger..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleAddComment(activeLightboxItem.id); }}
                    className="flex-1 border focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xxs font-mono outline-none transition-colors"
                    style={{ 
                      backgroundColor: theme === 'aurora' ? '#020617' : '#ffffff',
                      borderColor: colors.borderColor,
                      color: colors.text
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(activeLightboxItem.id)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
