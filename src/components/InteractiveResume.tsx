import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { Printer, Download, Mail, Github, Linkedin, Briefcase, GraduationCap, Code, Star } from 'lucide-react';
import { Education, Experience, Skill } from '../types';

interface InteractiveResumeProps {
  personalDetails: {
    name: string;
    title: string;
    bio: string;
    longBio: string;
    education: Education;
    socialLinks: {
      github: string;
      linkedin: string;
      email: string;
      location: string;
    };
  };
  experienceData: Experience[];
  skillsData: Skill[];
}

export const InteractiveResume: React.FC<InteractiveResumeProps> = ({ personalDetails, experienceData, skillsData }) => {
  const { theme, colors } = useTheme();
  const [filterType, setFilterType] = useState<string>('All');

  const filteredExperience = filterType === 'All'
    ? experienceData
    : experienceData.filter((e) => e.type === filterType);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMock = () => {
    // Generate a simple print fallback window or trigger direct print as standard PDF save action
    const confirmDownload = window.confirm(
      "To download this resume as a digital PDF:\n1. We will launch the document print view.\n2. Set your printer destination to 'Save as PDF'.\n\nProceed to print system?"
    );
    if (confirmDownload) {
      window.print();
    }
  };

  return (
    <div className="space-y-6" id="resume-panel">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border backdrop-blur-sm"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor
        }}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Internship', 'Leadership', 'Academic Project'].map((typeTab) => (
            <button
              key={typeTab}
              id={`resume-tab-${typeTab.toLowerCase().replace(' ', '-')}`}
              onClick={() => setFilterType(typeTab)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer`}
              style={{
                backgroundColor: filterType === typeTab 
                  ? colors.primary 
                  : (theme === 'aurora' ? 'rgba(8, 11, 20, 0.4)' : '#ffffff'),
                borderColor: colors.borderColor,
                color: filterType === typeTab ? '#ffffff' : colors.text
              }}
            >
              {typeTab === 'All' ? 'Complete Resume' : `${typeTab}s`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Print Trigger */}
          <button
            onClick={handlePrint}
            id="resume-btn-print"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border font-semibold cursor-pointer hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.6)' : '#ffffff',
              borderColor: colors.borderColor,
              color: colors.text
            }}
          >
            <Printer className="w-4 h-4" />
            <span>Print Resume</span>
          </button>

          {/* Download Mock PDF */}
          <button
            onClick={handleDownloadMock}
            id="resume-btn-download"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border font-semibold cursor-pointer hover:opacity-85 transition-opacity text-white"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.borderColor
            }}
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet View (Stripe/Apple Minimalist Quality) */}
      <div className="shadow-2xl rounded-2xl border p-6 md:p-10 space-y-8 backdrop-blur-md transition-all duration-300"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor
        }}
      >
        {/* Printable Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-dashed" style={{ borderColor: colors.borderColor }}>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: colors.text }}>
              {personalDetails.name}
            </h1>
            <p className="text-sm font-bold tracking-wide" style={{ color: colors.primary }}>
              {personalDetails.title}
            </p>
          </div>

          <div className="text-xs space-y-1 font-mono text-left md:text-right" style={{ color: colors.mutedText }}>
            <div className="flex items-center md:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{personalDetails.socialLinks.email}</span>
            </div>
            <div className="flex items-center md:justify-end gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>linkedin.com/in/manamoybanerjee</span>
            </div>
            <div className="flex items-center md:justify-end gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>github.com/manamoybanerjee</span>
            </div>
          </div>
        </div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Block: Experience & Timelines (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <Briefcase className="w-5 h-5 text-primary" style={{ color: colors.primary }} />
              <h2 className="text-lg font-bold tracking-tight">Professional Experience</h2>
            </div>

            <div className="space-y-6 relative border-l border-dashed pl-4 ml-2.5" style={{ borderColor: colors.borderColor }}>
              {filteredExperience.map((exp, index) => (
                <div key={index} className="space-y-2 relative group md:hover:scale-[1.005] transition-transform">
                  {/* Floating timeline dot */}
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 transition-all group-hover:scale-125"
                    style={{
                      backgroundColor: theme === 'aurora' ? '#080B14' : '#F8FAFC',
                      borderColor: colors.primary
                    }}
                  />

                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="font-bold text-base tracking-tight" style={{ color: colors.text }}>
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono font-medium opacity-80" style={{ color: colors.primary }}>
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-xs font-semibold" style={{ color: colors.mutedText }}>
                    <span>{exp.company}</span>
                    <span className="opacity-70 font-normal">{exp.location}</span>
                  </div>

                  {/* Role Achievements Bullet Points */}
                  <ul className="list-disc pl-4 text-xs space-y-1.5 leading-relaxed" style={{ color: colors.mutedText }}>
                    {exp.points.map((pt, pIndex) => (
                      <li key={pIndex} className="hover:text-slate-900 dark:hover:text-white transition-colors">{pt}</li>
                    ))}
                  </ul>

                  {/* Tech Pill List */}
                  {exp.techUsed && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {exp.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="text-xxs font-mono px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: theme === 'aurora' ? 'rgba(110, 86, 255, 0.08)' : 'rgba(255, 107, 53, 0.08)',
                            color: colors.primary
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Sidebar (Education, Skills, Tools) (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            {/* Education Box */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: colors.borderColor }}>
                <GraduationCap className="w-5 h-5" style={{ color: colors.secondary }} />
                <h2 className="text-base font-bold tracking-tight">Education</h2>
              </div>
              <div className="p-4 rounded-xl border backdrop-blur-sm space-y-2"
                style={{
                  backgroundColor: theme === 'aurora' ? 'rgba(8, 11, 20, 0.5)' : 'rgba(255,255,255,0.7)',
                  borderColor: colors.borderColor
                }}
              >
                <span className="text-xxs font-mono font-bold uppercase block tracking-wider" style={{ color: colors.secondary }}>
                  {personalDetails.education.duration}
                </span>
                <h4 className="font-bold text-sm tracking-tight leading-tight">{personalDetails.education.degree}</h4>
                <p className="text-xs" style={{ color: colors.mutedText }}>{personalDetails.education.institution}</p>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-xs font-mono font-bold" style={{ color: colors.accent }}>
                    CGPA: {personalDetails.education.cgpa}
                  </span>
                </div>
                <div className="text-[10px] space-y-1 pt-2 opacity-80 leading-relaxed border-t border-dashed"
                  style={{
                    borderColor: colors.borderColor,
                    color: colors.mutedText
                  }}
                >
                  <p>• Specialized in AI and analytics workflows.</p>
                  <p>• SRM Tech Merit badge recipient.</p>
                </div>
              </div>
            </div>

            {/* Top Expertise Skills Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: colors.borderColor }}>
                <Code className="w-5 h-5 animate-pulse" style={{ color: colors.accent }} />
                <h2 className="text-base font-bold tracking-tight">Key Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillsData.slice(0, 12).map((skillItem) => (
                  <div
                    key={skillItem.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border font-medium"
                    style={{
                      backgroundColor: theme === 'aurora' ? 'rgba(255, 255, 255, 0.02)' : '#ffffff',
                      borderColor: colors.borderColor
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <span className="text-xxs font-mono font-semibold" style={{ color: colors.text }}>{skillItem.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Role Target Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: colors.borderColor }}>
                <Star className="w-5 h-5" style={{ color: colors.highlight }} />
                <h2 className="text-base font-bold tracking-tight">Active Target Roles</h2>
              </div>
              <div className="space-y-1.5">
                {personalDetails.targetRoles.map((roleText) => (
                  <div
                    key={roleText}
                    className="text-xxs font-mono px-3 py-1.5 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'aurora' ? 'rgba(0, 229, 255, 0.04)' : 'rgba(108, 99, 255, 0.04)',
                      borderColor: colors.borderColor,
                      color: colors.primary
                    }}
                  >
                    {roleText}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
