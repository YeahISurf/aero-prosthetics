'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time and then hide the preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
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
          <div className="absolute inset-0 rounded-full border-4 border-gray-100 dark:border-gray-700 opacity-30"></div>
          
          {/* Animated gradient spinner */}
          <div className="absolute inset-0 rounded-full border-t-4 border-primary-500 animate-spin"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 shadow-inner"></div>
          
          {/* Center dot */}
          <div className="absolute inset-[30%] rounded-full bg-primary-500 shadow-lg"></div>
        </div>
        
        {/* Animated loading bar */}
        <div className="mt-8 w-32 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-300 via-primary-500 to-secondary-teal-500 animate-pulse-wide rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
