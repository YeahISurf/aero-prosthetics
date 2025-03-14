"use client";

import React, { useEffect, useState } from 'react';

// Utility for handling reduced motion preference
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Animation utility component that respects motion preferences
interface MotionSafeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const MotionSafe: React.FC<MotionSafeProps> = ({ 
  children, 
  className, 
  style, 
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Strip out animation classes and styles if reduced motion is preferred
  const safeClassName = prefersReducedMotion 
    ? (className || '').replace(/animate-[a-zA-Z-]+|transition-[a-zA-Z-]+/g, '')
    : className;
    
  const safeStyle = prefersReducedMotion
    ? { ...style, animationDelay: undefined, animationFillMode: undefined }
    : style;
    
  return (
    <div className={safeClassName} style={safeStyle} {...props}>
      {children}
    </div>
  );
};

// Export both utilities as default
const MotionUtils = {
  useReducedMotion,
  MotionSafe
};

export default MotionUtils; 