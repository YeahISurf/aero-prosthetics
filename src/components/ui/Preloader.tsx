'use client';

import { useEffect, useState } from 'react';
import { useLoading } from './ClientPreloader';

export default function Preloader() {
  const { isLoading, setLoading, progress, setProgress } = useLoading();
  const [animationState, setAnimationState] = useState<'initial' | 'loading' | 'complete'>('initial');
  
  useEffect(() => {
    // Set initial animation state
    setAnimationState('loading');
    
    let progressInterval: NodeJS.Timeout;
    
    // Track document load state
    const handleLoad = () => {
      // Clear any interval when fully loaded
      clearInterval(progressInterval);
      setProgress(100);
      setAnimationState('complete');
      
      // Use a small delay to ensure smooth transition
      setTimeout(() => setLoading(false), 800);
    };

    // Basic progress simulation
    const simulateProgress = () => {
      // Start from current progress
      let currentProgress = progress;
      
      // Non-linear progress simulation
      progressInterval = setInterval(() => {
        // Calculate remaining progress and step size
        const remainingProgress = 96 - currentProgress;
        const step = Math.max(0.5, remainingProgress * 0.15);
        currentProgress = Math.min(96, currentProgress + step);
        setProgress(currentProgress);
        
        // If document is already loaded but progress simulation is still running
        if (document.readyState === 'complete' && currentProgress >= 96) {
          handleLoad();
        }
      }, 160);
    };

    // Start simulating progress
    simulateProgress();

    // If document already loaded, hide preloader
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for document to fully load
      window.addEventListener('load', handleLoad);
      
      // Fallback timer for safety
      const fallbackTimer = setTimeout(() => {
        setAnimationState('complete');
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      }, 6000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
        clearInterval(progressInterval);
      };
    }
  }, [setLoading, setProgress, progress]);

  // Don't render anything if we're not loading
  if (!isLoading) return null;
  
  // Brand text animation based on progress
  const brandText = "AERO";
  const brandTextClass = progress > 20 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
      role="status"
      aria-label="Loading content"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={-1}
    >
      <div className="relative flex flex-col items-center">
        {/* Brand text with enhanced animation */}
        <div 
          className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-teal-500 mb-5 transition-all duration-1000 ease-out ${brandTextClass}`}
          aria-hidden="true"
        >
          {brandText}
        </div>
        
        <span className="sr-only">Loading {Math.round(progress)}% complete</span>
      
        {/* Enhanced circular spinner */}
        <div 
          className={`relative w-20 h-20 transition-transform duration-500 ${
            animationState === 'complete' ? 'scale-110' : animationState === 'initial' ? 'scale-95' : 'scale-100'
          }`}
        >
          {/* Outer ring with pulse effect */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-30"></div>
          
          {/* Animated progress circle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="289.027"
              strokeDashoffset={289.027 * (1 - progress / 100)}
              className="text-primary-500 transition-all duration-300 ease-out"
              style={{ 
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
              }}
            />
          </svg>
          
          {/* Inner glow effect */}
          <div className="absolute inset-3 rounded-full bg-white shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]"></div>
          
          {/* Animated center dot */}
          <div 
            className={`absolute inset-[35%] rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg transition-all duration-300 ${
              animationState === 'complete' ? 'inset-[30%] scale-110 opacity-100' : 'opacity-90'
            }`}
          >
            {/* Reflection/shine effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-[1px]" 
                 style={{ 
                   clipPath: 'polygon(0 0, 100% 0, 60% 60%, 0% 100%)' 
                 }}></div>
          </div>
        </div>
        
        {/* Enhanced loading bar with animated gradient */}
        <div className="mt-7 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-teal-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
            
            {/* Shine effect overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{ 
                animation: 'pulse-wide 2.5s ease-in-out infinite',
                clipPath: 'polygon(0 0, 30% 0, 45% 100%, 0 100%)'
              }}
            ></div>
          </div>
        </div>
        
        {/* Enhanced percentage indicator */}
        <div className="mt-3 text-sm font-medium text-primary-500 tracking-wider transition-all duration-300">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
