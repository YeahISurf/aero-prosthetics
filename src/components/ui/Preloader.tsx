'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Track document load state
    const handleLoad = () => {
      // Use a small delay to ensure smooth transition
      setTimeout(() => setLoading(false), 500);
    };

    // If document already loaded, hide preloader
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for document to fully load
      window.addEventListener('load', handleLoad);
      
      // Fallback timer for safety (5 seconds max)
      const fallbackTimer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!loading) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Premium circular spinner */}
        <div className="relative w-16 h-16">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-30"></div>
          
          {/* Animated gradient spinner */}
          <div className="absolute inset-0 rounded-full border-t-4 border-primary-500 animate-spin"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
          
          {/* Center dot */}
          <div className="absolute inset-[30%] rounded-full bg-primary-500 shadow-lg"></div>
        </div>
        
        {/* Animated loading bar */}
        <div className="mt-8 w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-300 via-primary-500 to-secondary-teal-500 animate-pulse-wide rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
