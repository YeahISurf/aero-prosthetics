'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, createContext, useContext } from 'react';

// Context for tracking loading state globally
export const LoadingContext = createContext({
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading: (value: boolean): void => {},
  progress: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setProgress: (value: number): void => {}
});

// Hook to access loading state
export const useLoading = () => useContext(LoadingContext);

// Create a client-only wrapper component that handles SSR properly
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  return <>{children}</>;
};

// Dynamically import the Preloader with SSR disabled
const Preloader = dynamic(() => import('./Preloader'), { 
  ssr: false,
  loading: () => null
});

export default function ClientPreloader() {
  const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleLoad = () => {
      // Set progress to at least 50% when main content is hydrated
      setProgress((current) => Math.max(current, 50));
      
      // If the document is already complete, we can skip waiting for interactions
      if (document.readyState === 'complete') {
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
        return;
      }
      
      // Listen for first user interaction to hide loader if still showing
      const handleInteraction = () => {
        // Only close on interaction after certain time has passed
        if (Date.now() - startTime > 1000) {
          setLoading(false);
          cleanup();
        }
      };
      
      const cleanup = () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      };
      
      const startTime = Date.now();
      
      // After 7 seconds, force loader to close for fallback
      const fallbackTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setLoading(false), 300);
        cleanup();
      }, 7000);
      
      // Add interaction listeners (for fallback if load event doesn't fire)
      window.addEventListener('click', handleInteraction, { passive: true });
      window.addEventListener('keydown', handleInteraction, { passive: true });
      window.addEventListener('scroll', handleInteraction, { passive: true });
      window.addEventListener('touchstart', handleInteraction, { passive: true });
      
      return () => {
        clearTimeout(fallbackTimer);
        cleanup();
      };
    };
    
    // Use a small delay to avoid immediate execution during hydration
    const timer = setTimeout(handleLoad, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Use the client-only wrapper to ensure this only renders on the client side
  return (
    <ClientOnly>
      <LoadingContext.Provider value={{ isLoading, setLoading, progress, setProgress }}>
        <Preloader />
      </LoadingContext.Provider>
    </ClientOnly>
  );
}
