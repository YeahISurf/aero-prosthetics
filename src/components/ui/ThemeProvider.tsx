'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: ReactNode;
}

// Create a client-only wrapper component
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <>{children}</>; // Still render children but without theme functionality
  return <>{children}</>;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ClientOnly>
      <NextThemesProvider 
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme="light"
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ClientOnly>
  );
} 