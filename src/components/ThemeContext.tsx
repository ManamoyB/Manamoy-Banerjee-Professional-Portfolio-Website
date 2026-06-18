import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  colors: {
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    text: string;
    cardBg: string;
    borderColor: string;
    mutedText: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('manamoy-portfolio-theme');
    return (saved as ThemeType) || 'aurora';
  });

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'aurora' ? 'nova' : 'aurora'));
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('manamoy-portfolio-theme', theme);
    const root = document.documentElement;
    if (theme === 'aurora') {
      root.classList.remove('light');
      root.classList.add('dark');
      root.style.setProperty('--primary', '#6E56FF');
      root.style.setProperty('--secondary', '#00E5FF');
      root.style.setProperty('--accent', '#00FFA3');
      root.style.setProperty('--highlight', '#FFB800');
      root.style.setProperty('--background', '#080B14');
      root.style.setProperty('--text', '#F5F7FF');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.setProperty('--primary', '#FF6B35');
      root.style.setProperty('--secondary', '#6C63FF');
      root.style.setProperty('--accent', '#00B894');
      root.style.setProperty('--highlight', '#FDCB6E');
      root.style.setProperty('--background', '#F8FAFC');
      root.style.setProperty('--text', '#111827');
    }
  }, [theme]);

  // Direct color mapping for inline styling, canvas work or customized elements
  const colors = theme === 'aurora' 
    ? {
        bg: '#080B14',
        primary: '#6E56FF',
        secondary: '#00E5FF',
        accent: '#00FFA3',
        highlight: '#FFB800',
        text: '#F5F7FF',
        cardBg: 'rgba(15, 20, 35, 0.75)',
        borderColor: 'rgba(110, 86, 255, 0.25)',
        mutedText: '#94A3B8'
      }
    : {
        bg: '#F8FAFC',
        primary: '#FF6B35',
        secondary: '#6C63FF',
        accent: '#00B894',
        highlight: '#FDCB6E',
        text: '#111827',
        cardBg: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 107, 53, 0.15)',
        mutedText: '#64748B'
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, colors }}>
      <div 
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          transition: 'background-color 0.4s ease-in-out, color 0.4s ease-in-out',
          minHeight: '100vh'
        }}
        className={theme === 'aurora' ? 'dark-theme' : 'light-theme'}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
