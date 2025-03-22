'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

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
  const initialized = useRef(false);
  
  useEffect(() => {
    // Prevent double initialization due to React StrictMode or other causes
    if (initialized.current) return;
    initialized.current = true;
    
    // Initial progress increment
    setProgress(10);
    
    // Use requestAnimationFrame for smoother progress updates
    const incrementProgress = () => {
      setProgress((current) => {
        // Slowly increment up to 90% before complete
        if (current < 90) {
          return Math.min(90, current + (90 - current) / 10);
        }
        return current;
      });
      
      if (progress < 90 && isLoading) {
        requestAnimationFrame(incrementProgress);
      }
    };
    
    requestAnimationFrame(incrementProgress);
    
    const handleLoad = () => {
      // Set progress to 100% when document is complete
      const completeLoad = () => {
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      };
      
      // If the document is already complete, finish loading
      if (document.readyState === 'complete') {
        completeLoad();
        return;
      }
      
      // Listen for load event
      window.addEventListener('load', completeLoad, { once: true });
      
      // Listen for first user interaction as a fallback
      const handleInteraction = () => {
        // Only close on interaction after certain time has passed
        if (Date.now() - startTime > 1000) {
          setProgress((current) => Math.max(current, 95));
          setTimeout(() => setLoading(false), 300);
          cleanup();
        }
      };
      
      const cleanup = () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('load', completeLoad);
      };
      
      const startTime = Date.now();
      
      // After 5 seconds, force loader to close for fallback (reduced from 7 seconds)
      const fallbackTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setLoading(false), 300);
        cleanup();
      }, 5000);
      
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
    const timer = setTimeout(() => {
      setProgress(30); // Jump to 30% after initial delay
      handleLoad();
    }, 50); // Reduced delay for faster response
    
    return () => clearTimeout(timer);
  }, [isLoading, progress]);
  
  // Use the client-only wrapper to ensure this only renders on the client side
  return (
    <ClientOnly>
      <LoadingContext.Provider value={{ isLoading, setLoading, progress, setProgress }}>
        <Preloader />
      </LoadingContext.Provider>
    </ClientOnly>
  );
}
