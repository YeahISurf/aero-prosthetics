"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { defaultImageLoader, shouldLazyLoad, generateSrcSet } from '@/lib/performance/imageLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  importance?: 'high' | 'medium' | 'low';
  quality?: number;
  sizes?: string;
}

/**
 * OptimizedImage component that implements performance best practices
 * - Uses Next.js Image component for automatic optimization
 * - Implements lazy loading based on image importance
 * - Supports responsive images with srcSet
 * - Implements blur-up loading effect
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  importance = 'medium',
  quality = 75,
  sizes = '100vw',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const lazy = shouldLazyLoad(importance);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is 200px from viewport
    );

    const currentElement = document.querySelector(`[data-image-id="${src}"]`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, lazy, isIntersecting]);

  // Generate responsive widths based on image size
  const responsiveWidths = [
    Math.round(width * 0.25),
    Math.round(width * 0.5),
    Math.round(width * 0.75),
    width,
    Math.round(width * 1.5),
    Math.round(width * 2),
  ].filter((w) => w > 0 && w <= 1920); // Cap at 1920px

  // Only render the image if it's high priority or has intersected the viewport
  const shouldRender = !lazy || isIntersecting;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      data-image-id={src}
    >
      {shouldRender && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loader={defaultImageLoader}
          sizes={sizes}
          priority={importance === 'high'}
          loading={importance === 'high' ? 'eager' : 'lazy'}
        />
      )}

      {/* Placeholder/blur-up effect */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      )}
    </div>
  );
}
