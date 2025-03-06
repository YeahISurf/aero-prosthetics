'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Only light theme is now available
type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Always use light theme
  const [theme] = useState<Theme>('light');

  // Initialize theme on mount only (client-side)
  useEffect(() => {
    // Remove dark mode class if present
    document.documentElement.classList.remove('dark');
    
    // Set light mode in localStorage
    localStorage.setItem('theme', 'light');
  }, []);

  const value = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 