import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { ParticleBackground } from './components/ParticleBackground';
import { DynamicCertifications } from './components/DynamicCertifications';
import { InteractiveResume } from './components/InteractiveResume';
import { InteractiveContact } from './components/InteractiveContact';
import { PredictiveInferenceSandbox } from './components/PredictiveInferenceSandbox';
import { motion } from 'motion/react';

// Import services and fallback data
import { 
  personalDetails as originalPersonalDetails, 
  skillsData as originalSkillsData, 
  projectsData as originalProjectsData, 
  experienceData as originalExperienceData, 
  achievementsData as originalAchievementsData 
} from './data/portfolioData';

import { profileService } from './services/profile.service';
import { skillsService } from './services/skills.service';
import { projectsService } from './services/projects.service';
import { experienceService } from './services/experience.service';
import { achievementsService } from './services/achievements.service';
import { educationService } from './services/education.service';
import { socialLinksService } from './services/socialLinks.service';
import { settingsService, SiteSettings, defaultSettings } from './services/settings.service';

import {
  Sparkles,
  User,
  Activity,
  Code,
  Award,
  Briefcase,
  FileText,
  Mail,
  Moon,
  Sun,
  Github,
  Linkedin,
  MapPin,
  ChevronRight,
  ExternalLink,
  Target,
  GraduationCap,
  Percent,
  Atom,
  Terminal,
  Cpu,
  BarChart3,
  Quote,
  Star,
  BookOpen,
  Database,
  ArrowRight,
  Milestone,
  Trophy,
  Image
} from 'lucide-react';

import { BlogPage } from './components/BlogPage';
import { SkillsRadarChart } from './components/SkillsRadarChart';
import { ProjectsPage } from './components/ProjectsPage';
import { JourneyPage } from './components/JourneyPage';
import { AchievementsPage } from './components/AchievementsPage';
import { GalleryPage } from './components/GalleryPage';
import { RecruiterPage } from './components/RecruiterPage';
import { CurrentFocus } from './components/CurrentFocus';
import { AdminPage } from './components/AdminPage';

const MainAppContent: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  
  // Local shadowed CMS states loaded dynamically from Google Sheets
  const [personalDetails, setPersonalDetails] = useState(originalPersonalDetails);
  const [skillsData, setSkillsData] = useState(originalSkillsData);
  const [projectsData, setProjectsData] = useState(originalProjectsData);
  const [experienceData, setExperienceData] = useState(originalExperienceData);
  const [achievementsData, setAchievementsData] = useState(originalAchievementsData);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [loadingCms, setLoadingCms] = useState(true);

  const [activeSection, setActiveSection] = useState<string>('home');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [aboutEduTab, setAboutEduTab] = useState<'btech' | 'higher' | 'school'>('btech');
  
  // Custom skills filter states
  const [activeSkillCategory, setActiveSkillCategory] = useState<'All' | 'Programming' | 'Domains' | 'Frameworks' | 'Databases' | 'Tools'>('All');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');

  // Async load on mount
  useEffect(() => {
    let isMounted = true;
    
    async function loadCmsData() {
      try {
        setLoadingCms(true);
        const [profile, skills, projects, experience, achievements, education, socialLinks, currentSettings] = await Promise.all([
          profileService.getProfile(),
          skillsService.getSkills(),
          projectsService.getProjects(),
          experienceService.getExperience(),
          achievementsService.getAchievements(),
          educationService.getEducation(),
          socialLinksService.getSocialLinks(),
          settingsService.getSettings()
        ]);
        
        if (isMounted) {
          setPersonalDetails({
            ...profile,
            education,
            socialLinks
          });
          setSkillsData(skills);
          setProjectsData(projects);
          setExperienceData(experience);
          setAchievementsData(achievements);
          setSiteSettings(currentSettings);
        }
      } catch (err) {
        console.error('[CMS ERROR] Synchronizing files failed, using local fallback repositories...', err);
      } finally {
        if (isMounted) {
          setLoadingCms(false);
        }
      }
    }
    
    loadCmsData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyRepo = (repoUrl: string, id: string) => {
    navigator.clipboard.writeText(repoUrl);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Nav menus
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Activity },
    { id: 'journey', label: 'Journey', icon: Milestone },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'recruiter', label: 'For Recruiters', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'certs', label: 'Certifications', icon: Award },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const headerNavItems = navItems.filter((item) => 
    ['home', 'about', 'skills', 'projects', 'certs'].includes(item.id)
  );

  if (loadingCms) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center font-mono selection:bg-indigo-500 selection:text-white relative"
        style={{
          backgroundColor: theme === 'aurora' ? '#04060c' : '#f8fafc',
          color: theme === 'aurora' ? '#f8fafc' : '#0f172a'
        }}
      >
        <ParticleBackground />
        <div className="text-center space-y-6 max-w-sm px-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl border-2 mx-auto animate-pulse"
            style={{
              backgroundColor: theme === 'aurora' ? 'rgba(110, 86, 255, 0.12)' : 'rgba(255, 107, 53, 0.12)',
              borderColor: theme === 'aurora' ? '#6e56ff' : '#ff6b35',
              color: theme === 'aurora' ? '#6e56ff' : '#ff6b35',
              boxShadow: theme === 'aurora' ? '0 0 24px rgba(110, 86, 255, 0.3)' : 'none'
            }}
          >
            <span>MB</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-xs font-bold tracking-widest uppercase">Initializing Portfolio State</h1>
            <p className="text-[10px] opacity-65 leading-normal">Synchronizing secure database blocks with Google Sheets Headless CMS...</p>
          </div>
          <div className="w-48 h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 mx-auto">
            <motion.div 
              className="h-full rounded-full" 
              style={{ backgroundColor: colors.primary }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-12">
      {/* 1. Low Overhead Canvas Particles */}
      <ParticleBackground />

      {/* 2. Top Portal Header Bar (Apple and Stripe quality gloss) */}
      <header 
        className="sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300"
        style={{
          backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.75)' : 'rgba(248, 250, 252, 0.8)',
          borderColor: colors.borderColor
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Adapted Active Branding logo */}
          <div 
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm border-2 transition-all group-hover:scale-105 duration-300 shadow-sm"
              style={{
                backgroundColor: theme === 'aurora' ? 'rgba(110, 86, 255, 0.12)' : 'rgba(255, 107, 53, 0.12)',
                borderColor: colors.primary,
                color: colors.primary,
                boxShadow: theme === 'aurora' ? '0 0 16px rgba(110, 86, 255, 0.25)' : 'none'
              }}
            >
              <span>MB</span>
            </div>
            
            <div className="hidden xs:block leading-none">
              <span className="text-xs font-bold block" style={{ color: colors.text }}>{personalDetails.name}</span>
              <span className="text-[10px] font-mono tracking-tighter opacity-70 block" style={{ color: colors.primary }}>AI & Data Engineer</span>
            </div>
          </div>

          {/* Nav Links for mid-and-up sizes */}
          <nav className="hidden md:flex items-center gap-1">
            {headerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer`}
                  style={{
                    backgroundColor: isActive 
                      ? (theme === 'aurora' ? 'rgba(110, 86, 255, 0.15)' : 'rgba(255, 107, 53, 0.15)') 
                      : 'transparent',
                    color: isActive ? colors.primary : colors.text
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Print and Contact Fast Sync Actions */}
            <button
              onClick={toggleTheme}
              id="theme-toggler"
              title="Toggle theme experience"
              className="p-2 rounded-lg border hover:opacity-85 transition-opacity cursor-pointer"
              style={{
                backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.8)' : '#ffffff',
                borderColor: colors.borderColor,
                color: colors.text
              }}
            >
              {theme === 'aurora' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Quick Contact CTA, replacing View Resume */}
            <button
              onClick={() => {
                setActiveSection('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="header-contact-cta"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg font-bold border transition-opacity hover:opacity-95 cursor-pointer text-white shadow-md"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              }}
            >
              <span>Contact</span>
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Small Mobile Bottom Nav Rail */}
      <div 
        className="md:hidden fixed bottom-4 left-4 right-4 z-50 p-2 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center justify-around"
        style={{
          backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: colors.borderColor
        }}
      >
        {[...headerNavItems, { id: 'contact', label: 'Contact', icon: Mail }].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`mob-nav-item-${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className="flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all cursor-pointer"
              style={{
                color: isActive ? colors.primary : colors.text
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium scale-90">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Main Section Stage container with smooth reveal animations */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 w-full z-10">
        <div className="transition-all duration-300">
          
          {/* SECTION: HOME (Hero, particle indicators, targeted badges) */}
          {activeSection === 'home' && (
            <div className="space-y-24 py-4 md:py-8 animate-fade-in relative z-20" id="home-stage">
              {/* SaaS Ambient Aurora Glow backgrounds */}
              <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] bg-indigo-500/10 pointer-events-none -translate-x-1/2 z-0" />
              <div className="absolute top-[800px] right-10 w-[400px] h-[400px] rounded-full blur-[140px] bg-purple-500/10 pointer-events-none z-0" />
              <div className="absolute bottom-[400px] left-10 w-[450px] h-[450px] rounded-full blur-[150px] bg-cyan-500/10 pointer-events-none z-0" />

              {/* ================= SECTION 1: HERO ================= */}
              <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-10">
                {/* Left pitch controls */}
                <div className="lg:col-span-7 text-left space-y-6 relative z-10">
                  {/* Apple-grade dynamic badging */}
                  <div 
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md"
                    style={{
                      backgroundColor: theme === 'aurora' ? 'rgba(110, 86, 255, 0.08)' : 'rgba(255, 107, 53, 0.08)',
                      borderColor: colors.borderColor,
                      color: colors.primary
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Ready for AI Engineering & Software Internship Roles</span>
                  </div>

                  {/* High impact display headings */}
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none" style={{ color: colors.text }}>
                      Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">{personalDetails.name}</span>
                    </h1>
                    <p 
                      className="text-lg sm:text-2xl font-bold tracking-tight font-mono" 
                      style={{ color: colors.primary }}
                    >
                      AI Engineer | Data Analyst | Software Developer
                    </p>
                  </div>

                  {/* Explanatory subtitle */}
                  <p 
                    className="text-sm sm:text-base leading-relaxed max-w-xl font-sans"
                    style={{ color: colors.mutedText }}
                  >
                    Building intelligent systems, transforming data into decisions, and developing scalable software solutions. Speared with B.Tech Computer Science Foundations.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveSection('projects')}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold shadow-lg transition-transform hover:scale-[1.02] cursor-pointer text-white"
                      style={{ 
                        backgroundColor: colors.primary,
                        boxShadow: theme === 'aurora' ? '0 8px 24px rgba(110, 86, 255, 0.25)' : '0 8px 20px rgba(255, 107, 53, 0.15)'
                      }}
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </button>

                    <button
                      onClick={() => setActiveSection('resume')}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl border text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        borderColor: colors.borderColor,
                        color: colors.text
                      }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download Resume</span>
                    </button>

                    <button
                      onClick={() => setActiveSection('contact')}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl border text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        borderColor: colors.borderColor,
                        color: colors.text
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact Me</span>
                    </button>
                  </div>

                  {/* Modern Glassy Skills Badge Row - Added in a cool manner below Explore Projects sections */}
                  <div className="pt-8 space-y-3" id="home-core-technologies">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Key Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {/* AI Engine */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 dark:bg-slate-950/45 text-white text-[11px] font-semibold font-mono rounded-xl border border-indigo-500/20 shadow-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 group hover:-translate-y-0.5">
                        <Atom className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-180 transition-transform duration-1000" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">AI Engine</span>
                      </div>
                      
                      {/* Python */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 dark:bg-slate-950/45 text-white text-[11px] font-semibold font-mono rounded-xl border border-yellow-500/20 shadow-sm hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 group hover:-translate-y-0.5">
                        <Terminal className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Python</span>
                      </div>

                      {/* Machine Learning */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 dark:bg-slate-950/45 text-white text-[11px] font-semibold font-mono rounded-xl border border-purple-500/20 shadow-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group hover:-translate-y-0.5">
                        <Cpu className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Machine Learning</span>
                      </div>

                      {/* Data Analytics */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 dark:bg-slate-950/45 text-white text-[11px] font-semibold font-mono rounded-xl border border-emerald-500/20 shadow-sm hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 group hover:-translate-y-0.5">
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-x-110 transition-transform" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Data Analytics</span>
                      </div>

                      {/* Deep Learning */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 dark:bg-slate-950/45 text-white text-[11px] font-semibold font-mono rounded-xl border border-pink-500/20 shadow-sm hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300 group hover:-translate-y-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Deep Learning</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive/Professional Visual with floating cards */}
                <div className="lg:col-span-5 relative w-full h-fit flex items-center justify-center pt-8 lg:pt-0">
                  {/* Styled Mesh/Abstract Illustration Canvas Wrapper */}
                  <div className="relative w-full aspect-square max-w-[420px] rounded-3xl border border-indigo-500/20 shadow-2xl p-6 overflow-hidden flex flex-col justify-between"
                    style={{
                      backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.45)' : 'rgba(255, 255, 255, 0.7)',
                      borderColor: colors.borderColor,
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    {/* Concentric rotating circles illustration */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-25">
                      <div className="absolute w-72 h-72 rounded-full border border-dashed border-indigo-500 animate-[spin_40s_linear_infinite]" />
                      <div className="absolute w-56 h-56 rounded-full border border-dashed border-purple-500 animate-[spin_20s_linear2_infinite] reverse" />
                      <div className="absolute w-40 h-40 rounded-full border border-dashed border-cyan-400 animate-[spin_10s_linear_infinite]" />
                    </div>

                    {/* Central Professional Photo Core Frame with modern crop mask */}
                    <div className="relative z-10 m-auto w-52 h-52 rounded-full border-4 border-indigo-500/40 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden group">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                        <img 
                          src="/src/assets/images/profile_headshot_1781818866146.jpg" 
                          alt="Manamoy Banerjee Profile" 
                          className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.12] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Active predictive system / portrait identifier badge */}
                    <div className="relative z-15 text-center -mt-2 bg-slate-950/90 backdrop-blur-md px-4 py-1 border border-indigo-500/30 w-fit mx-auto rounded-full shadow-lg">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Developer Active Session</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 2: QUICK STATISTICS ================= */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Metrics Grid</span>
                  <h2 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Performance & Contribution Metrics</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Projects Completed */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-xl hover:scale-[1.01] transition-all group relative overflow-hidden"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 shrink-0 group-hover:scale-175 transition-transform">
                      <Code className="w-16 h-16 text-indigo-400" />
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: colors.borderColor, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
                      <Code className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black block mt-2" style={{ color: colors.text }}>12+ Units</span>
                      <span className="text-xxs font-mono uppercase tracking-wider block opacity-60" style={{ color: colors.mutedText }}>Projects Completed</span>
                    </div>
                  </div>

                  {/* Card 2: Certifications */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-xl hover:scale-[1.01] transition-all group relative overflow-hidden"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 shrink-0 group-hover:scale-175 transition-transform">
                      <Award className="w-16 h-16 text-cyan-400" />
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: colors.borderColor, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}>
                      <Award className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black block mt-2" style={{ color: colors.text }}>24+ Verified</span>
                      <span className="text-xxs font-mono uppercase tracking-wider block opacity-60" style={{ color: colors.mutedText }}>Certifications Earned</span>
                    </div>
                  </div>

                  {/* Card 3: Technologies */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-xl hover:scale-[1.01] transition-all group relative overflow-hidden"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 shrink-0 group-hover:scale-175 transition-transform">
                      <Terminal className="w-16 h-16 text-amber-400" />
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: colors.borderColor, backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
                      <Terminal className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black block mt-2" style={{ color: colors.text }}>15+ Stacks</span>
                      <span className="text-xxs font-mono uppercase tracking-wider block opacity-60" style={{ color: colors.mutedText }}>Core Technologies</span>
                    </div>
                  </div>

                  {/* Card 4: GitHub Contributions */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-xl hover:scale-[1.01] transition-all group relative overflow-hidden"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 shrink-0 group-hover:scale-175 transition-transform">
                      <Github className="w-16 h-16 text-emerald-400" />
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: colors.borderColor, backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                      <Github className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black block mt-2" style={{ color: colors.text }}>800+ Commits</span>
                      <span className="text-xxs font-mono uppercase tracking-wider block opacity-60" style={{ color: colors.mutedText }}>GitHub Contributions</span>
                    </div>
                  </div>
                </div>
                
                {/* Live Personal Focus Dashboard block */}
                <CurrentFocus colors={colors} />
              </section>

              {/* ================= SECTION 3: FEATURED EXPERTISE ================= */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Scope of Mastery</span>
                  <h2 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Technical Fields of Expertise</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: AI & Machine Learning */}
                  <div className="p-6 rounded-2xl border space-y-4 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border text-indigo-400 bg-indigo-400/5 group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-extrabold" style={{ color: colors.text }}>AI & Machine Learning</h3>
                    <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.mutedText }}>
                      Formulating statistical neural network systems. Specialising in forecasting architectures, NLP sequence validation layers, and deep convolutional networks using PyTorch and TensorFlow.
                    </p>
                    <div className="pt-2 font-mono text-[10px] text-indigo-400 font-semibold group-hover:underline flex items-center gap-1.5">
                      <span>Explore AI Stack</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card 2: Data Analytics */}
                  <div className="p-6 rounded-2xl border space-y-4 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border text-cyan-400 bg-cyan-400/5 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-extrabold" style={{ color: colors.text }}>Data Analytics</h3>
                    <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.mutedText }}>
                      Creating automated parsing workflows, and calculating predictive risk matrices. Building data-to-decision dashboard components with optimized statistical backbones.
                    </p>
                    <div className="pt-2 font-mono text-[10px] text-cyan-400 font-semibold group-hover:underline flex items-center gap-1.5">
                      <span>Explore Analytics Stack</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card 3: Software Development */}
                  <div className="p-6 rounded-2xl border space-y-4 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border text-emerald-400 bg-emerald-400/5 group-hover:scale-110 transition-transform">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-extrabold" style={{ color: colors.text }}>Software Development</h3>
                    <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.mutedText }}>
                      Compiling clean, robust type-safe packages. Leveraging state managers, lazy API routes, and optimized client bundles. Rigorously testing logic for low footprint.
                    </p>
                    <div className="pt-2 font-mono text-[10px] text-emerald-400 font-semibold group-hover:underline flex items-center gap-1.5">
                      <span>Explore Developer Stack</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 4: FEATURED PROJECTS ================= */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Showcase Modules</span>
                  <h2 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Featured Portfolios & Repositories</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Project 1: Stock Forecast */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                    onClick={() => setActiveSection('projects')}
                  >
                    <div className="absolute top-0 right-0 py-1 px-3 bg-indigo-500 font-mono text-[8px] uppercase tracking-wider text-white rounded-bl-xl font-bold">
                      FINANCIAL FORECAST
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl select-none">
                        📈
                      </div>
                      <h3 className="text-base font-extrabold leading-snug group-hover:text-indigo-400 transition-colors" style={{ color: colors.text }}>
                        Sentiment-Aware Stock Volatility Forecasting
                      </h3>
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {['PyTorch', 'FinBERT', 'Statsmodels', 'LSTM'].map((t) => (
                          <span key={t} className="text-[9px] font-mono border px-2 py-0.5 rounded-full" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed opacity-85" style={{ color: colors.mutedText }}>
                        A joint prediction pipeline parsing market tweets and news to compute volatility indices mapped pre-event hours.
                      </p>
                      {/* Key Achievement */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-xxs font-semibold">
                        <span className="text-emerald-400 block uppercase font-mono tracking-wider text-[8px]">QUANTIFIED IMPACT:</span>
                        <span style={{ color: colors.text }}>18.4% reduction in Mean Absolute Error (MAE) benchmarks.</span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-xxs font-bold border mt-2" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                      <span>Explore Technical Architecture</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Project 2: Deepfake Detection */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                    onClick={() => setActiveSection('projects')}
                  >
                    <div className="absolute top-0 right-0 py-1 px-3 bg-purple-500 font-mono text-[8px] uppercase tracking-wider text-white rounded-bl-xl font-bold">
                      COMPUTER VISION
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl select-none">
                        🎭
                      </div>
                      <h3 className="text-base font-extrabold leading-snug group-hover:text-indigo-400 transition-colors" style={{ color: colors.text }}>
                        Dual-Stream Deepfake Detection System
                      </h3>
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {['TensorFlow', 'EfficientNet', 'ConvLSTM', 'OpenCV'].map((t) => (
                          <span key={t} className="text-[9px] font-mono border px-2 py-0.5 rounded-full" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed opacity-85" style={{ color: colors.mutedText }}>
                        A sequential classification neural grid tracking subtle face margin blends and temporal jitter metrics.
                      </p>
                      {/* Key Achievement */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-xxs font-semibold">
                        <span className="text-emerald-400 block uppercase font-mono tracking-wider text-[8px]">QUANTIFIED IMPACT:</span>
                        <span style={{ color: colors.text }}>94.2% Area Under Curve (AUC) achieved on test Celeb-DF suites.</span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-xxs font-bold border mt-2" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                      <span>Explore Technical Architecture</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Project 3: Medicine Recommendation */}
                  <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                    onClick={() => setActiveSection('projects')}
                  >
                    <div className="absolute top-0 right-0 py-1 px-3 bg-pink-500 font-mono text-[8px] uppercase tracking-wider text-white rounded-bl-xl font-bold">
                      CLINICAL NLP
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl select-none">
                        💊
                      </div>
                      <h3 className="text-base font-extrabold leading-snug group-hover:text-indigo-400 transition-colors" style={{ color: colors.text }}>
                        Symptom-to-Compound Medical Recommendation Engine
                      </h3>
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {['BioBERT', 'Neo4j', 'FastAPI', 'React'].map((t) => (
                          <span key={t} className="text-[9px] font-mono border px-2 py-0.5 rounded-full" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed opacity-85" style={{ color: colors.mutedText }}>
                        A semantic graphing structure filtering patient descriptions against pharmaceutical drug databases.
                      </p>
                      {/* Key Achievement */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-xxs font-semibold">
                        <span className="text-emerald-400 block uppercase font-mono tracking-wider text-[8px]">QUANTIFIED IMPACT:</span>
                        <span style={{ color: colors.text }}>Accelerated preliminary query checks by 35% with zero conflict rates.</span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-xxs font-bold border mt-2" style={{ borderColor: colors.borderColor, color: colors.primary }}>
                      <span>Explore Technical Architecture</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 5: EXPERIENCE TIMELINE PREVIEW ================= */}
              <section className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Milestones Timeline</span>
                  <h2 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Academic & Professional Journey</h2>
                </div>

                {/* Horizontal Chronology Roadmap */}
                <div className="relative pt-6 pb-2" id="journey-roadmap">
                  {/* Background Connector Bar Line */}
                  <div className="absolute top-[32px] left-8 right-8 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-500 rounded-full opacity-30 pointer-events-none" />

                  <div className="grid grid-cols-5 gap-2 relative z-10 text-center">
                    {/* Node 1: School */}
                    <div className="space-y-4 group">
                      <div className="w-8 h-8 rounded-full border bg-slate-900 border-indigo-500 flex items-center justify-center text-xs font-black mx-auto shadow-lg group-hover:scale-125 transition-transform text-indigo-400 cursor-help" title="Matriculation">
                        1
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold" style={{ color: colors.text }}>Schooling</h4>
                        <span className="text-[9px] font-mono opacity-60 block">CBSE Curriculum</span>
                        <p className="text-[10px] opacity-75 mt-1 hidden sm:block max-w-[130px] mx-auto text-slate-400" lg:block="true">Foundations in math, physics, programming.</p>
                      </div>
                    </div>

                    {/* Node 2: College */}
                    <div className="space-y-4 group">
                      <div className="w-8 h-8 rounded-full border bg-slate-900 border-indigo-400 flex items-center justify-center text-xs font-black mx-auto shadow-lg group-hover:scale-125 transition-transform text-indigo-300 cursor-help" title="B.Tech Computer Science">
                        2
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold" style={{ color: colors.text }}>College</h4>
                        <span className="text-[9px] font-mono opacity-60 block">SRM University</span>
                        <p className="text-[10px] opacity-75 mt-1 hidden sm:block max-w-[130px] mx-auto text-slate-400" lg:block="true">B.Tech Computer Science Engineering specialization.</p>
                      </div>
                    </div>

                    {/* Node 3: Projects */}
                    <div className="space-y-4 group">
                      <div className="w-8 h-8 rounded-full border bg-slate-900 border-cyan-400 flex items-center justify-center text-xs font-black mx-auto shadow-lg group-hover:scale-125 transition-transform text-cyan-400 cursor-help" title="Systems Portfolio">
                        3
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold" style={{ color: colors.text }}>Projects</h4>
                        <span className="text-[9px] font-mono opacity-60 block">AI & Clinical Engines</span>
                        <p className="text-[10px] opacity-75 mt-1 hidden sm:block max-w-[130px] mx-auto text-slate-400" lg:block="true">Deploying deep forecasting and NLP frameworks.</p>
                      </div>
                    </div>

                    {/* Node 4: Research */}
                    <div className="space-y-4 group">
                      <div className="w-8 h-8 rounded-full border bg-slate-900 border-purple-400 flex items-center justify-center text-xs font-black mx-auto shadow-lg group-hover:scale-125 transition-transform text-purple-400 cursor-help" title="Model Optimizations">
                        4
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold" style={{ color: colors.text }}>Research</h4>
                        <span className="text-[9px] font-mono opacity-60 block">Biomedical NLP</span>
                        <p className="text-[10px] opacity-75 mt-1 hidden sm:block max-w-[130px] mx-auto text-slate-400" lg:block="true">Analyzing BioBERT semantics & entity grids.</p>
                      </div>
                    </div>

                    {/* Node 5: Career */}
                    <div className="space-y-4 group">
                      <div className="w-8 h-8 rounded-full border bg-slate-900 border-emerald-400 flex items-center justify-center text-xs font-black mx-auto shadow-lg group-hover:scale-125 transition-transform text-emerald-400 cursor-help" title="Internship & Industry Work">
                        5
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold" style={{ color: colors.text }}>Career</h4>
                        <span className="text-[9px] font-mono opacity-60 block">AI Intern Work</span>
                        <p className="text-[10px] opacity-75 mt-1 hidden sm:block max-w-[130px] mx-auto text-slate-400" lg:block="true">Optimizing GPU processes & API integrations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 6: TESTIMONIALS PLACEHOLDER ================= */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Recommendations & Endorsements</span>
                  <h2 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Hiring Team & Research Feedback</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quote 1 */}
                  <div className="p-6 rounded-2xl border backdrop-blur-sm space-y-4 flex flex-col justify-between"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="flex gap-1 text-yellow-500">
                      {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-xs italic leading-relaxed opacity-95 text-slate-300">
                      "Manamoy demonstrated excellent technical capabilities during development. His attention to detail in neural model parameters and the accuracy of the dual-stream biometrics validation represents professional competency."
                    </p>
                    <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: colors.borderColor }}>
                      <div>
                        <h4 className="text-xs font-bold" style={{ color: colors.text }}>Lead Research Principal</h4>
                        <span className="text-[9px] font-mono opacity-50 block">AI Labs Org</span>
                      </div>
                      <span className="text-[8px] font-mono text-emerald-400 px-2 py-0.5 border border-emerald-500/20 bg-emerald-500/5 rounded">VERIFIED INTERNAL</span>
                    </div>
                  </div>

                  {/* Quote 2 */}
                  <div className="p-6 rounded-2xl border backdrop-blur-sm space-y-4 flex flex-col justify-between"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="flex gap-1 text-yellow-500">
                      {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-xs italic leading-relaxed opacity-95 text-slate-300">
                      "His optimization on text tokenizer speeds reduced our database queries bottleneck significantly. Very analytical mind with a great grip on predictive data and React dashboards."
                    </p>
                    <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: colors.borderColor }}>
                      <div>
                        <h4 className="text-xs font-bold" style={{ color: colors.text }}>Senior Software Architect</h4>
                        <span className="text-[9px] font-mono opacity-50 block">Quant Tech Partners</span>
                      </div>
                      <span className="text-[8px] font-mono text-emerald-400 px-2 py-0.5 border border-emerald-500/20 bg-emerald-500/5 rounded">VERIFIED INTERNAL</span>
                    </div>
                  </div>
                </div>

                {/* Callout Link to recommendations import */}
                <div className="text-center pt-2">
                  <a href="#contact" onClick={() => setActiveSection('contact')} className="text-xxs font-mono text-indigo-400 cursor-pointer hover:underline text-center">
                    📢 Recruiters: Submit a performance review or endorsement via the contact form
                  </a>
                </div>
              </section>

              {/* ================= SECTION 7: CTA ================= */}
              <section className="p-8 md:p-12 rounded-3xl border text-center space-y-6 relative overflow-hidden shadow-2xl"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.borderColor,
                  boxShadow: theme === 'aurora' ? '0 12px 32px rgba(110,86,255,0.1)' : '0 12px 24px rgba(0,0,0,0.03)'
                }}
              >
                <div className="absolute top-0 left-0 w-44 h-44 rounded-full blur-[80px] bg-indigo-500/10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full blur-[80px] bg-cyan-400/10 pointer-events-none" />

                <div className="max-w-xl mx-auto space-y-4 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: colors.text }}>
                    Let's Build Something Meaningful
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-75" style={{ color: colors.mutedText }}>
                    Active and scouting for internship placements, AI project opportunities, and engineering collaborations. Connect instantly.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-3 pt-2 relative z-10">
                  <button
                    onClick={() => setActiveSection('contact')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold cursor-pointer hover:opacity-90 transition-all text-white shadow-md"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Get In Touch</span>
                  </button>

                  {personalDetails.socialLinks?.linkedin && (
                    <a
                      href={personalDetails.socialLinks.linkedin}
                      target="_blank"
                      rel="referrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-900 shrink-0"
                      style={{ borderColor: colors.borderColor }}
                    >
                      <Linkedin className="w-4 h-4" style={{ color: colors.secondary }} />
                      <span>LinkedIn Connect</span>
                    </a>
                  )}

                  {personalDetails.socialLinks?.github && (
                    <a
                      href={personalDetails.socialLinks.github}
                      target="_blank"
                      rel="referrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-900 shrink-0"
                      style={{ borderColor: colors.borderColor }}
                    >
                      <Github className="w-4 h-4" style={{ color: colors.text }} />
                      <span>GitHub Repositories</span>
                    </a>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* SECTION: ABOUT (Personal story, academic timelines, achievements list) */}
          {activeSection === 'about' && (
            <div className="space-y-20 py-4 animate-fade-in relative z-20" id="about-stage">
              {/* SaaS Background Accents */}
              <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-[140px] bg-purple-500/5 pointer-events-none z-0" />
              <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full blur-[150px] bg-indigo-500/5 pointer-events-none z-0" />

              {/* ================= HERO BANNER ================= */}
              <section className="relative overflow-hidden rounded-3xl border p-8 md:p-12 shadow-xl"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor
                }}
              >
                {/* Hero Glow Backdrop */}
                <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  {/* Portrait photo frame */}
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-indigo-500/30 p-1 bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl overflow-hidden shrink-0">
                    <img 
                      src="/src/assets/images/profile_headshot_1781818866146.jpg" 
                      alt="Manamoy Banerjee"
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
                      <User className="w-3 h-3" />
                      <span>About the Creator</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
                      {personalDetails.name}
                    </h2>
                    <p className="text-xs md:text-sm font-semibold tracking-wide font-mono opacity-90" style={{ color: colors.primary }}>
                      Computer Science Engineering Student • Specialize in AI & ML
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 1: WHO AM I ================= */}
              <section className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-extrabold block">Section 01 / Biography</span>
                <h3 className="text-2xl font-black tracking-tight" style={{ color: colors.text }}>Who Am I</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-6 md:p-8 rounded-2xl border backdrop-blur-sm space-y-6"
                      style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                    >
                      <p className="text-sm font-semibold leading-relaxed" style={{ color: colors.text }}>
                        My technical odyssey began not with mere code, but with a wonder about how digital architectures transform chaotic datasets into streamlined, intelligent actions. As a Computer Science undergraduate with a core focus on Artificial Intelligence and Machine Learning, I realized early that true computer science craft comes from deep fundamentals rather than utilizing black-box wrappers.
                      </p>
                      <p className="text-sm font-semibold leading-relaxed" style={{ color: colors.text }}>
                        At SRM Institute of Science and Technology, I have structured my academic and voluntary efforts to master PyTorch, deep machine learning pipeline mechanics, semantic data analytics, and high-performance system engineering. Whether designing Dual-Stream CNN models to intercept deepfakes or engineering BioBERT-powered semantic search graphs for clinical recommendations, I strive to bridge the gap between abstract academic research and scalable, consumer-grade software systems.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center py-4 lg:py-0">
                    <div 
                      className="border p-4 rounded-3xl shadow-2xl relative group rotate-[-2deg] hover:rotate-[0deg] transition-all duration-300 w-full max-w-sm"
                      style={{ 
                        backgroundColor: colors.cardBg, 
                        borderColor: colors.borderColor 
                      }}
                    >
                      {/* Paper tape element top center */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-500/10 border border-dashed border-slate-500/30 backdrop-blur-xs z-10" />
                      
                      <div className="w-full h-80 rounded-2xl overflow-hidden mb-3.5 relative" style={{ backgroundColor: theme === 'aurora' ? '#020617' : '#f8fafc' }}>
                        <img 
                          src="/src/assets/images/casual_about_1781818883335.jpg" 
                          alt="Manamoy Banerjee - Casual Bio Pic"
                          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center font-mono italic text-[11px] font-bold flex items-center justify-center gap-1.5 pt-1" style={{ color: colors.mutedText }}>
                        <span>📸 Out in nature, brainstorming system ideas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 2: EDUCATION & CGPA ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 02 / Academic Journey</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Interactive Education Timeline</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Interactive Tab selection */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex gap-2 border-b" style={{ borderColor: colors.borderColor }}>
                      <button
                        onClick={() => setAboutEduTab('btech')}
                        className={`pb-3 text-xs font-bold transition-all px-4 cursor-pointer relative ${aboutEduTab === 'btech' ? 'text-indigo-400 opacity-100 border-b-2 border-indigo-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: aboutEduTab === 'btech' ? colors.primary : colors.text }}
                      >
                        B.Tech CSE (AIML)
                      </button>
                      <button
                        onClick={() => setAboutEduTab('higher')}
                        className={`pb-3 text-xs font-bold transition-all px-4 cursor-pointer relative ${aboutEduTab === 'higher' ? 'text-indigo-400 opacity-100 border-b-2 border-indigo-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: aboutEduTab === 'higher' ? colors.primary : colors.text }}
                      >
                        Higher Secondary
                      </button>
                      <button
                        onClick={() => setAboutEduTab('school')}
                        className={`pb-3 text-xs font-bold transition-all px-4 cursor-pointer relative ${aboutEduTab === 'school' ? 'text-indigo-400 opacity-100 border-b-2 border-indigo-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: aboutEduTab === 'school' ? colors.primary : colors.text }}
                      >
                        Primary High Schooling
                      </button>
                    </div>

                    {/* Timeline Content rendering */}
                    <div className="p-6 rounded-2xl border min-h-[220px] flex flex-col justify-between"
                      style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                    >
                      {aboutEduTab === 'btech' && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="text-xxs font-mono text-indigo-400 font-bold uppercase tracking-wider block">SRM Institute of Science and Technology</span>
                              <h4 className="text-base font-extrabold" style={{ color: colors.text }}>Bachelor of Technology — CSE (Specialization in AI & ML)</h4>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border text-xxs font-mono rounded-lg">2021 — 2025</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: colors.mutedText }}>
                            Rigorous university foundations emphasizing database design (DBMS), computational mathematics, optimization theories, data structures, and statistical deep neural models. Collaborated in practical labs compiling neural models on high-density medical diagnostics.
                          </p>
                          <div className="pt-3 border-t border-dashed space-y-1.5" style={{ borderColor: colors.borderColor }}>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block font-bold">Key Coursework Modules:</span>
                            <div className="flex flex-wrap gap-2">
                              {['Neural Networks', 'Advanced Deep Learning', 'Object-Oriented Design', 'DBMS', 'Analysis of Algorithms', 'Probability & Statistics'].map((subject) => (
                                <span key={subject} className="px-2 py-0.5 border text-xxs font-mono rounded" style={{ borderColor: colors.borderColor }}>
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {aboutEduTab === 'higher' && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="text-xxs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Central Board of Secondary Education (CBSE)</span>
                              <h4 className="text-base font-extrabold" style={{ color: colors.text }}>Higher Secondary Certificate (PCM Division)</h4>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border text-xxs font-mono rounded-lg">2019 — 2021</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: colors.mutedText }}>
                            Concentrated coursework on Mathematics, Newtonian Physics, and Chemistry. Developed initial object-oriented scripts in C++ and compiled initial web layouts using JavaScript, cultivating mathematical engineering methodologies.
                          </p>
                          <div className="pt-3 border-t border-dashed space-y-1.5" style={{ borderColor: colors.borderColor }}>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block font-bold">Highlighted Accents:</span>
                            <ul className="text-xxs space-y-1 list-disc list-inside text-slate-400">
                              <li>Outstanding quantitative evaluation in Statistics & Trigonometric Calculus.</li>
                              <li>Participated in regional programming and electronics layout fairs.</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {aboutEduTab === 'school' && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="text-xxs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Senior High School Curriculum</span>
                              <h4 className="text-base font-extrabold" style={{ color: colors.text }}>High School Matriculation</h4>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border text-xxs font-mono rounded-lg">Graduated 2019</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: colors.mutedText }}>
                            Initial entry into tech and algorithmic reasoning. Completed foundations in computer organization, basic algebra, and local computing initiatives.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: B.Tech CGPA glowing card */}
                  <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl border text-center relative overflow-hidden group hover:shadow-2xl transition-all"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] bg-emerald-500/10 pointer-events-none" />
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                        <GraduationCap className="w-6 h-6 animate-bounce" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mt-3">B.Tech Cumulative Grade</span>
                      <h4 className="text-5xl font-black tracking-tight text-white mt-1">8.20</h4>
                      <span className="text-xxs font-mono text-slate-400 block mt-1">Scale of Out Of 10.00</span>
                    </div>

                    <div className="pt-4 border-t border-dashed mt-4 space-y-2 text-left" style={{ borderColor: colors.borderColor }}>
                      <div className="flex justify-between text-xxs">
                        <span className="opacity-60">Status:</span>
                        <span className="text-emerald-400 font-bold">First Class Distinction</span>
                      </div>
                      <div className="flex justify-between text-xxs">
                        <span className="opacity-60">Elective Modules:</span>
                        <span className="font-semibold text-slate-300">AIML Concentration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 3: MY PHILOSOPHY ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 03 / Core Directives</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Code & Engineering Philosophy</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Philosophy 1: Learn */}
                  <div className="p-6 rounded-2xl border space-y-3 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-125 group-hover:scale-150 transition-transform">
                      <BookOpen className="w-12 h-12 text-indigo-400" />
                    </div>
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">01 / LEARN</span>
                    <h4 className="text-sm font-extrabold" style={{ color: colors.text }}>Deep Dive Research</h4>
                    <p className="text-xxs leading-relaxed" style={{ color: colors.mutedText }}>
                      Analyzing research publications, mathematical backbones of neural models, and exploring optimization formulas. Continuous study fuels engineering expertise.
                    </p>
                  </div>

                  {/* Philosophy 2: Build */}
                  <div className="p-6 rounded-2xl border space-y-3 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-125 group-hover:scale-150 transition-transform">
                      <Code className="w-12 h-12 text-cyan-400" />
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">02 / BUILD</span>
                    <h4 className="text-sm font-extrabold" style={{ color: colors.text }}>Durable Application</h4>
                    <p className="text-xxs leading-relaxed" style={{ color: colors.mutedText }}>
                      Applying mathematical theory to practice. Compiling tangible forecasting modules, clinical search networks, and type-safe frontends.
                    </p>
                  </div>

                  {/* Philosophy 3: Share */}
                  <div className="p-6 rounded-2xl border space-y-3 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-125 group-hover:scale-150 transition-transform">
                      <Sparkles className="w-12 h-12 text-pink-400" />
                    </div>
                    <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider block">03 / SHARE</span>
                    <h4 className="text-sm font-extrabold" style={{ color: colors.text }}>Open Contributions</h4>
                    <p className="text-xxs leading-relaxed" style={{ color: colors.mutedText }}>
                      Packaging files, open sourcing frameworks on GitHub, and writing explanatory logs for developers. Contributing to collaborative growth.
                    </p>
                  </div>

                  {/* Philosophy 4: Improve */}
                  <div className="p-6 rounded-2xl border space-y-3 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-125 group-hover:scale-150 transition-transform">
                      <Cpu className="w-12 h-12 text-emerald-400" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">04 / IMPROVE</span>
                    <h4 className="text-sm font-extrabold" style={{ color: colors.text }}>Rigorous Optimization</h4>
                    <p className="text-xxs leading-relaxed" style={{ color: colors.mutedText }}>
                      Testing, compiling benchmarks, analyzing query footprints, and pruning neural node curves to achieve streamlined operations.
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 4: CORE VALUES ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 04 / Internal Pillars</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Core Professional Values</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Flag 1: Problem Solving */}
                  <div className="p-6 rounded-2xl border text-center space-y-3 hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border mx-auto" style={{ borderColor: 'rgba(99, 102, 241, 0.15)', backgroundColor: 'rgba(99, 102, 241, 0.03)' }}>
                      <Target className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: colors.text }}>Problem Solving</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 font-medium">Analyzing multidimensional constraints and scaling logic efficiently.</p>
                  </div>

                  {/* Flag 2: Continuous Learning */}
                  <div className="p-6 rounded-2xl border text-center space-y-3 hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border mx-auto" style={{ borderColor: 'rgba(34, 211, 238, 0.15)', backgroundColor: 'rgba(34, 211, 238, 0.03)' }}>
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: colors.text }}>Continuous Learning</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 font-medium">Swiftly conforming to newly published transformer models and SDK layers.</p>
                  </div>

                  {/* Flag 3: Innovation */}
                  <div className="p-6 rounded-2xl border text-center space-y-3 hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border mx-auto" style={{ borderColor: 'rgba(236, 72, 153, 0.15)', backgroundColor: 'rgba(236, 72, 153, 0.03)' }}>
                      <Sparkles className="w-5 h-5 text-pink-400" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: colors.text }}>Innovation</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 font-medium">Spearheading unique diagnostic methodologies and optimized neural solutions.</p>
                  </div>

                  {/* Flag 4: Leadership */}
                  <div className="p-6 rounded-2xl border text-center space-y-3 hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border mx-auto" style={{ borderColor: 'rgba(16, 185, 129, 0.15)', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
                      <User className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: colors.text }}>Product Leadership</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 font-medium">Coordinating project scopes and demonstrating predictive outcomes precisely.</p>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 5: CURRENT FOCUS ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 05 / Active Research</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Current Technological Focus</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { title: 'AI Agents', desc: 'Agentic loops, function calling schemas, structured JSON output states.', icon: Cpu, col: 'rgba(99, 102, 241, 0.4)' },
                    { title: 'RAG Systems', desc: 'Vector search embeddings, context window chunking, graph neural grids.', icon: Database, col: 'rgba(34, 211, 238, 0.4)' },
                    { title: 'Machine Learning', desc: 'LSTM neural architectures, FinBERT sentiment weights, PyTorch models.', icon: Atom, col: 'rgba(245, 158, 11, 0.4)' },
                    { title: 'Data Analytics', desc: 'Automated ingestion pipelines, quantitative error tracking matrices.', icon: BarChart3, col: 'rgba(16, 185, 129, 0.4)' },
                    { title: 'Software Engineering', desc: 'Clean, type-safe structures, scalable Express middleware, packaged apps.', icon: Terminal, col: 'rgba(236, 72, 153, 0.4)' }
                  ].map((fItem, idx) => {
                    const FIcon = fItem.icon;
                    return (
                      <div key={idx} className="p-5 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                      >
                        <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center border font-semibold" style={{ borderColor: colors.borderColor }}>
                          <FIcon className="w-4 h-4 text-indigo-400" style={{ color: fItem.col.replace(', 0.4)', ')') }} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black block" style={{ color: colors.text }}>{fItem.title}</h4>
                          <p className="text-[10px] text-slate-400 block mt-1 leading-normal">{fItem.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ================= SECTION 6: BEYOND TECHNOLOGY ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 06 / Leadership & Balance</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Beyond Technology</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Case 1: Varsity Captaincy */}
                  <div className="p-6 rounded-2xl border relative overflow-hidden group hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute -top-6 -right-6 text-5xl opacity-10 select-none group-hover:scale-125 transition-transform">🏀</div>
                    <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">Varsity Captaincy</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 mt-2 font-medium">
                      Commanding varsity basketball teams built my framework for high-stress communication, instantaneous tactical adjustments, and leading projects under scoreboard pressure.
                    </p>
                  </div>

                  {/* Case 2: Sportsmanship & Sync */}
                  <div className="p-6 rounded-2xl border relative overflow-hidden group hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute -top-6 -right-6 text-5xl opacity-10 select-none group-hover:scale-125 transition-transform">🤝</div>
                    <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">Teamwork & Sync</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 mt-2 font-medium">
                      Athletic competition taught me that brilliant individual code is like single-player scoring—it means nothing without defensive rotation, team sync, and mutual project support.
                    </p>
                  </div>

                  {/* Case 3: Physical Conditioning */}
                  <div className="p-6 rounded-2xl border relative overflow-hidden group hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute -top-6 -right-6 text-5xl opacity-10 select-none group-hover:scale-125 transition-transform">🏃‍♂️</div>
                    <h4 className="text-xs font-bold font-mono text-pink-400 uppercase tracking-widest">Fitness & Focus</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 mt-2 font-medium">
                      Rigorous daily conditioning and strength training offsets the mental fatigue of compiling code, keeping concentration sharp and focus resilient during long-session engineering.
                    </p>
                  </div>

                  {/* Case 4: Reading & Flow */}
                  <div className="p-6 rounded-2xl border relative overflow-hidden group hover:scale-[1.01] transition-transform"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                  >
                    <div className="absolute -top-6 -right-6 text-5xl opacity-10 select-none group-hover:scale-125 transition-transform">📚</div>
                    <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">Deep Reading</h4>
                    <p className="text-xxs leading-relaxed text-slate-400 mt-2 font-medium">
                      Consuming non-fiction, biography, and history books shapes a calmer philosophy on problem-solving, letting complex technological setbacks settle into streamlined structures.
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= SECTION 7: FUTURE VISION ================= */}
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">Section 07 / Evolution Map</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: colors.text }}>Future Vision & Career Roadmap</h3>
                </div>

                {/* Futurist Roadmap component */}
                <div className="p-8 rounded-3xl border relative overflow-hidden"
                  style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] bg-indigo-500/10 pointer-events-none" />
                  
                  {/* Vertical Chrono Roadmap layout */}
                  <div className="space-y-8 relative z-10">
                    <div className="border-l-2 pl-6 ml-3 space-y-8 border-dashed" style={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                      
                      {/* Node 1: Specialised Internship Placement */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-[7px]" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-indigo-400 font-extrabold uppercase bg-indigo-500/10 px-2 py-0.5 rounded">Q3 2026 — internship placement</span>
                          <h4 className="text-xs font-bold" style={{ color: colors.text }}>Specialised Enterprise AI Internship</h4>
                          <p className="text-xxs max-w-xl text-slate-400 leading-normal">
                            Partnering with a major analytics lab or high-growth SaaS startup. Integrating local agentic LLM routing engines and streamlining training checkpoints.
                          </p>
                        </div>
                      </div>

                      {/* Node 2: Software Development Engineer (SDE) */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-[7px]" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-cyan-400 font-extrabold uppercase bg-cyan-400/10 px-2 py-0.5 rounded">Q1 2027 — professional deployment</span>
                          <h4 className="text-xs font-bold" style={{ color: colors.text }}>Full-Scale SDE / Machine Learning Associate</h4>
                          <p className="text-xxs max-w-xl text-slate-400 leading-normal">
                            Deploying robust web frameworks paired with optimized data caching models. Championing low-footprint type safety and statistical integrity.
                          </p>
                        </div>
                      </div>

                      {/* Node 3: AI Solutions Lead */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center text-[7px]" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded">2028 & Beyond — leadership horizon</span>
                          <h4 className="text-xs font-bold" style={{ color: colors.text }}>Solutions Architect / Principal AI Engineer</h4>
                          <p className="text-xxs max-w-xl text-slate-400 leading-normal">
                            Formulating high-impact systems, leading cross-functional developer sprints, and translating mathematical advances into commercial enterprise successes.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* ================= FOOTER REDUNDANT WRAPPER ================= */}
              <footer className="border-t pt-8 mt-12 text-center text-xxs font-mono space-y-2 opacity-60" style={{ borderColor: colors.borderColor }}>
                <p>© {new Date().getFullYear()} Manamoy Banerjee. All Technical Rights Reserved.</p>
                <p>Engineered with Type Safety & Premium Apple-grade Graphics.</p>
              </footer>
            </div>
          )}

          {/* SECTION: SKILLS (Premium custom radar catalog, animated progress cards) */}
          {activeSection === 'skills' && (
            <section className="space-y-8 py-4 animate-fade-in" id="skills-section">
              
              {/* Premium Skills Hero Banner */}
              <div 
                className="rounded-3xl border p-8 relative overflow-hidden shadow-xl transition-colors duration-300" 
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor 
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] bg-indigo-500/10 pointer-events-none -translate-y-5" />
                <div className="relative z-10 space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider uppercase bg-indigo-500/5 border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                    <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-extrabold text-[10px]">Vectorized Proficiencies</span>
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: colors.text }}>
                    Skills & Technologies
                  </h2>
                  <p className="text-sm max-w-xl font-semibold leading-relaxed" style={{ color: colors.mutedText }}>
                    An interactive, real-time map of computational capabilities, programming stacks, database designs, and machine learning infrastructure metrics.
                  </p>
                </div>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: colors.borderColor }}>
                
                {/* Categorized filter tabs with specific label mappings */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'All', label: 'All Stacks' },
                    { id: 'Programming', label: 'Programming Languages' },
                    { id: 'Domains', label: 'Technical Domains' },
                    { id: 'Frameworks', label: 'Frameworks' },
                    { id: 'Databases', label: 'Databases' },
                    { id: 'Tools', label: 'Developer Tools' }
                  ].map((tab) => {
                    const isSelected = activeSkillCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSkillCategory(tab.id as any)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-indigo-500 border-indigo-500 text-white' 
                            : 'opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                        style={{ 
                          borderColor: isSelected ? colors.primary : colors.borderColor,
                          color: isSelected ? '#ffffff' : colors.text
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Local search bar */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase font-black tracking-wider">
                    SYS.grep
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search technologies..."
                    value={skillSearchQuery}
                    onChange={(e) => setSkillSearchQuery(e.target.value)}
                    className="w-full pl-22 pr-4 py-2.5 border text-xs sm:text-sm font-mono rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/25 shadow-xs"
                    style={{ 
                      backgroundColor: colors.cardBg, 
                      borderColor: colors.borderColor, 
                      color: colors.text 
                    }}
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* GRID OF ANIMATED SKILL CARDS (8 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Category grids */}
                  {[
                    { id: 'Programming', label: 'Programming Languages' },
                    { id: 'Domains', label: 'Technical Domains' },
                    { id: 'Frameworks', label: 'Frameworks' },
                    { id: 'Databases', label: 'Databases' },
                    { id: 'Tools', label: 'Developer Tools' }
                  ]
                    .filter(sec => activeSkillCategory === 'All' || activeSkillCategory === sec.id)
                    .map(sec => {
                      const filteredInSec = skillsData.filter(s => {
                        const belongs = s.category === sec.id;
                        const matchesSearch = s.name.toLowerCase().includes(skillSearchQuery.toLowerCase());
                        return belongs && matchesSearch;
                      });

                      if (filteredInSec.length === 0) return null;

                      return (
                        <div key={sec.id} className="space-y-4 animate-fade-in">
                          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block font-mono">
                            {sec.label} Matrix
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredInSec.map(sk => (
                              <div
                                key={sk.name}
                                className="p-4 rounded-xl border flex flex-col justify-between space-y-3.5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                style={{
                                  backgroundColor: colors.cardBg,
                                  borderColor: colors.borderColor
                                }}
                              >
                                {/* Left color pulse indicator */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-indigo-600 transition-transform scale-y-0 group-hover:scale-y-100 duration-300 origin-top" />
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xxs font-black bg-indigo-500/5 px-2.5 py-0.5 rounded border border-indigo-500/15">
                                      {sk.iconType}
                                    </span>
                                    <h4 className="text-sm font-black tracking-tight leading-none" style={{ color: colors.text }}>
                                      {sk.name}
                                    </h4>
                                  </div>
                                  <span className="text-xs font-mono font-black" style={{ color: colors.primary }}>
                                    {sk.proficiency}%
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  {/* Custom progress level row */}
                                  <div className="w-full h-2 rounded-full overflow-hidden bg-slate-300/40 dark:bg-slate-800 border border-black/5 dark:border-white/5">
                                    <div
                                      className="h-full rounded-full transition-all duration-1000 ease-out origin-left scale-x-0 group-hover:scale-x-100"
                                      style={{
                                        width: `${sk.proficiency}%`,
                                        backgroundColor: colors.primary,
                                        transform: 'scaleX(1)' // Ensure fallback starts anim
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Metric details label */}
                                  <div className="flex justify-between items-center text-[10px] font-mono font-bold" style={{ color: colors.mutedText }}>
                                    <span>PROFICIENCY INDEX</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 uppercase font-black">
                                      {sk.proficiency >= 90 ? 'Expert' : sk.proficiency >= 85 ? 'Highly Advanced' : 'Competent'}
                                    </span>
                                  </div>
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                  {/* Empty fallback search block */}
                  {skillsData.filter(s => {
                    const matchesCategory = activeSkillCategory === 'All' || s.category === activeSkillCategory;
                    const matchesSearch = s.name.toLowerCase().includes(skillSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  }).length === 0 && (
                    <div className="text-center py-12 border border-dashed rounded-3xl" style={{ borderColor: colors.borderColor }}>
                      <Code className="w-8 h-8 text-rose-400 mx-auto opacity-70 animate-bounce mb-3" />
                      <h4 className="text-sm font-bold opacity-80">Null Search Result</h4>
                      <p className="text-xxs text-slate-400 mt-1">Refine your SYS.grep inputs to find technology items.</p>
                    </div>
                  )}

                </div>

                {/* RADAR CHART PANEL (4 Columns) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                  
                  {/* Interactive Radar Visualizer */}
                  <SkillsRadarChart 
                    colors={{
                      primary: colors.primary,
                      text: colors.text,
                      mutedText: colors.mutedText,
                      borderColor: colors.borderColor,
                      cardBg: colors.cardBg
                    }}
                    skills={
                      skillsData
                        .filter(s => {
                          const matchesCategory = activeSkillCategory === 'All' || s.category === activeSkillCategory;
                          const matchesSearch = s.name.toLowerCase().includes(skillSearchQuery.toLowerCase());
                          return matchesCategory && matchesSearch;
                        })
                        .slice(0, 7) // Keep radar map highly readable with max 7 nodes
                    }
                  />

                  {/* Secondary analytics details */}
                  <div className="p-5 rounded-2xl border text-xxs font-mono space-y-2 leading-relaxed" style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                    <span className="text-[10px] font-bold text-slate-200 block border-b pb-1 mb-2 uppercase" style={{ borderColor: colors.borderColor }}>
                      Radar calibration details
                    </span>
                    <p className="opacity-70">
                      The radar polygons are mapped by normalizing proficiency vectors inside the active workspace.
                    </p>
                    <p className="opacity-70">
                      Vectors automatically update when filtering via categories or searching specific keywords.
                    </p>
                  </div>

                </div>

              </div>
            </section>
          )}

          {/* SECTION: PROJECTS (Advanced cards highlighting layout context) */}
          {activeSection === 'projects' && (
            <ProjectsPage colors={colors} theme={theme} />
          )}

          {/* SECTION: JOURNEY (Interactive timeline showing visual career progression) */}
          {activeSection === 'journey' && (
            <JourneyPage colors={colors} theme={theme} />
          )}

          {/* SECTION: ACHIEVEMENTS (Proof matrices, counters, highlighted banner) */}
          {activeSection === 'achievements' && (
            <AchievementsPage colors={colors} theme={theme} />
          )}

          {/* SECTION: GALLERY (Humanized visual layout masonry, video walkthroughs) */}
          {activeSection === 'gallery' && (
            <GalleryPage colors={colors} theme={theme} />
          )}

          {/* SECTION: RECRUITER (Dedicated recruiter quick-check portfolio pitch deck) */}
          {activeSection === 'recruiter' && (
            <RecruiterPage colors={colors} theme={theme} />
          )}

          {/* SECTION: CERTIFICATIONS (Dynamic loading, list searches, filtrations) */}
          {activeSection === 'certs' && (
            <DynamicCertifications />
          )}

          {/* SECTION: BLOG (Full modern technical blog page) */}
          {activeSection === 'blog' && (
            <BlogPage colors={colors} theme={theme} />
          )}

          {/* SECTION: RESUME (Interactive timelines, downloads) */}
          {activeSection === 'resume' && (
            <section className="space-y-8 py-4 animate-fade-in" id="resume-section">
              <div className="border-b pb-4" style={{ borderColor: colors.borderColor }}>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Interactive Curriculum Vitae</h2>
                <p className="text-xs" style={{ color: colors.mutedText }}>Formulated with clean vertical layouts to satisfy applicant tracking systems (ATS).</p>
              </div>

              {/* Interactive CV viewer */}
              <InteractiveResume personalDetails={personalDetails} experienceData={experienceData} skillsData={skillsData} />
            </section>
          )}

          {/* SECTION: CONTACT (Validation forms, locations, receipts) */}
          {activeSection === 'contact' && (
            <section className="space-y-8 py-4 animate-fade-in" id="contact-section">
              <div className="border-b pb-4" style={{ borderColor: colors.borderColor }}>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Get In Touch</h2>
                <p className="text-xs" style={{ color: colors.mutedText }}>Transmit secure message blocks directly to mine-box envelopes.</p>
              </div>

              {/* Contact interaction form */}
              <InteractiveContact personalDetails={personalDetails} />
            </section>
          )}

          {/* SECTION: ADMIN CONSOLE (Protected with Admin credentials panel) */}
          {activeSection === 'admin' && (
            <AdminPage 
              colors={colors} 
              theme={theme} 
              onNavigateHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          )}

        </div>
      </main>

      {/* Modern Responsive Sitemap & Roadmap Footer */}
      <footer className="w-full mt-16 border-t backdrop-blur-md" style={{ borderColor: colors.borderColor, backgroundColor: theme === 'aurora' ? 'rgba(4, 6, 12, 0.4)' : 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            {/* Column 1: Core Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm border shadow-xs"
                  style={{
                    backgroundColor: theme === 'aurora' ? 'rgba(110, 86, 255, 0.1)' : 'rgba(223, 77, 26, 0.1)',
                    borderColor: colors.primary,
                    color: colors.primary
                  }}
                >
                  MB
                </div>
                <h3 className="text-base font-black tracking-tight" style={{ color: colors.text }}>
                  {personalDetails.name}
                </h3>
              </div>
              <p className="text-xs font-semibold leading-relaxed" style={{ color: colors.mutedText }}>
                {personalDetails.title}
              </p>
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold" style={{ color: colors.mutedText }}>
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" style={{ color: colors.accent }} />
                <span>{personalDetails.socialLinks?.location || 'Global • Remote'}</span>
              </div>
              {/* Dynamic Social Links inside the footer */}
              <div className="flex items-center gap-3 pt-1">
                {personalDetails.socialLinks?.github && (
                  <a 
                    href={personalDetails.socialLinks.github} 
                    target="_blank" 
                    rel="referrer" 
                    className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-850 hover:scale-105 transition-all border shrink-0"
                    style={{ borderColor: colors.borderColor }}
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" style={{ color: colors.text }} />
                  </a>
                )}
                {personalDetails.socialLinks?.linkedin && (
                  <a 
                    href={personalDetails.socialLinks.linkedin} 
                    target="_blank" 
                    rel="referrer" 
                    className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-850 hover:scale-105 transition-all border shrink-0"
                    style={{ borderColor: colors.borderColor }}
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" style={{ color: colors.text }} />
                  </a>
                )}
                {personalDetails.socialLinks?.email && (
                  <a 
                    href={`mailto:${personalDetails.socialLinks.email}`} 
                    className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-850 hover:scale-105 transition-all border shrink-0"
                    style={{ borderColor: colors.borderColor }}
                    title="Direct Email"
                  >
                    <Mail className="w-4 h-4" style={{ color: colors.text }} />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: 2-Column arranged links */}
            <div className="space-y-4 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: colors.primary }}>Pages Navigation</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:underline transition-all font-mono font-bold hover:text-indigo-600 dark:hover:text-cyan-400 text-left cursor-pointer flex items-center gap-1.5"
                      style={{ color: colors.text }}
                    >
                      <span style={{ color: colors.primary }}>■</span> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Simple Admin Entry */}
            <div className="space-y-4">
              <h4 id="admin-header-title" className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: colors.accent }}>Admin Gateway</h4>
              <button
                id="admin-footer-btn"
                onClick={() => {
                  setActiveSection('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 hover:scale-103 font-mono font-bold text-xs text-white rounded-xl shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                🔐 Admin
              </button>
            </div>
          </div>

          {/* Bottom Row Credits */}
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono font-bold" style={{ borderColor: colors.borderColor, color: colors.mutedText }}>
            <p className="opacity-80">© {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</p>
            <p className="opacity-65 text-center sm:text-right">{siteSettings.footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
