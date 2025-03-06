"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  threshold?: number; // Pull distance required to trigger refresh
  maxPullDistance?: number; // Maximum allowed pull distance
  disabled?: boolean;
  pullText?: string;
  releaseText?: string;
  refreshingText?: string;
}

export default function PullToRefresh({
  children,
  threshold = 100,
  maxPullDistance = 150,
  disabled = false,
  pullText = "Pull to refresh",
  releaseText = "Release to refresh",
  refreshingText = "Refreshing...",
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const pulling = useRef(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on touch devices
    if (disabled || typeof window === 'undefined' || !('ontouchstart' in window)) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Only activate if we're at the top of the page
      if (window.scrollY > 5) return;
      
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling.current) return;
      
      currentY.current = e.touches[0].clientY;
      const delta = Math.max(0, currentY.current - startY.current);
      
      // Apply resistance factor - gets harder to pull the further down you go
      const resistance = 0.5;
      const newPullDistance = Math.min(maxPullDistance, delta * resistance);
      
      if (newPullDistance > 0) {
        e.preventDefault();
        setPullDistance(newPullDistance);
      }
    };

    const handleTouchEnd = () => {
      if (!pulling.current) return;
      
      pulling.current = false;
      
      if (pullDistance >= threshold) {
        // Trigger refresh
        refresh();
      } else {
        // Reset without refresh
        setPullDistance(0);
      }
    };
    
    const handleTouchCancel = () => {
      pulling.current = false;
      setPullDistance(0);
    };
    
    // Utility function to refresh the page
    const refresh = () => {
      setRefreshing(true);
      setPullDistance(threshold);
      
      // Simulate network delay, then refresh
      setTimeout(() => {
        router.refresh();
        
        // Reset after refresh
        setTimeout(() => {
          setRefreshing(false);
          setPullDistance(0);
        }, 500);
      }, 1000);
    };
    
    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    
    // Cleanup
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [disabled, maxPullDistance, pullDistance, threshold, router]);
  
  // Calculate indicator position and label text
  const indicatorHeight = 60;
  const indicatorTop = Math.min(pullDistance - indicatorHeight, 0);
  const progress = Math.min(pullDistance / threshold, 1);
  
  const indicatorText = refreshing 
    ? refreshingText 
    : progress >= 1 
      ? releaseText 
      : pullText;
  
  return (
    <div ref={containerRef} className="relative pull-to-refresh min-h-screen">
      {/* Pull indicator */}
      {!disabled && (pullDistance > 0 || refreshing) && (
        <div 
          className="absolute left-0 right-0 flex flex-col items-center justify-center overflow-hidden z-10 bg-gray-100 transition-transform duration-300 ease-out"
          style={{ 
            height: `${indicatorHeight}px`, 
            top: `${indicatorTop}px`,
            transform: `translateY(${pullDistance}px)`,
            opacity: Math.min(1, progress * 1.4),
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowDown 
              className={`h-5 w-5 transition-transform duration-200 ${progress >= 1 ? 'rotate-180' : ''} ${refreshing ? 'animate-spin' : ''}`} 
            />
            <span className="text-sm font-medium">{indicatorText}</span>
          </div>
        </div>
      )}
      
      {/* Content container */}
      <div
        style={{ 
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none',
          transition: pulling.current ? 'none' : 'transform 300ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
} 