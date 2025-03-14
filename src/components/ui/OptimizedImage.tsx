"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { defaultImageLoader, shouldLazyLoad } from '@/lib/performance/imageLoader';
import { cva, type VariantProps } from 'class-variance-authority';

// Full variants definition with all options for future use
const imageVariants = cva("", {
  variants: {
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    hover: {
      none: "",
      grow: "transition-transform duration-300 hover:scale-105",
      lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      brighten: "transition-all duration-300 hover:brightness-110",
      zoom: "overflow-hidden [&>img]:transition-transform [&>img]:duration-500 [&>img]:hover:scale-110",
    },
    aspect: {
      auto: "aspect-auto",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      wide: "aspect-[16/9]",
      ultrawide: "aspect-[21/9]",
    },
    objectFit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      scaleDown: "object-scale-down",
    },
  },
  defaultVariants: {
    rounded: "md",
    shadow: "none",
    hover: "none",
    aspect: "auto",
    objectFit: "cover",
  },
});

interface OptimizedImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  importance?: 'high' | 'medium' | 'low';
  quality?: number;
  sizes?: string;
  blurDataURL?: string;
  progressiveLoading?: boolean;
}

/**
 * OptimizedImage component that implements performance best practices
 * - Uses Next.js Image component for automatic optimization
 * - Implements lazy loading based on image importance
 * - Supports responsive images with srcSet
 * - Implements blur-up loading effect
 * - Supports progressive loading with shimmer effect
 * - Configurable rounded corners, shadows, and hover effects
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  importance = 'medium',
  quality = 75,
  sizes = '100vw',
  rounded,
  shadow,
  hover,
  aspect,
  objectFit,
  blurDataURL,
  progressiveLoading = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const lazy = shouldLazyLoad(importance);
  
  // Generate a more sophisticated blur data URL if none provided
  const defaultBlurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YzZjRmNiIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4=";
  
  // Combine all variant props
  const imageClasses = imageVariants({ 
    rounded, 
    shadow, 
    hover, 
    objectFit,
    className: className 
  });

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || isIntersecting || typeof window === 'undefined') return;

    // Create a stable reference to the element
    const elementRef = containerRef.current;
    
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is 200px from viewport
    );

    // Observe the container element directly instead of using querySelector
    observer.observe(elementRef);

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
      observer.disconnect();
    };
  }, [src, lazy, isIntersecting]);

  // Create a ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render the image if it's high priority or has intersected the viewport
  const shouldRender = !lazy || isIntersecting;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName} ${aspect ? imageVariants({ aspect }) : ''}`}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      {shouldRender && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          className={`${imageClasses} transition-all duration-700 ${
            isLoaded ? 'scale-100 blur-0 grayscale-0' : 'scale-110 blur-2xl grayscale'
          }`}
          onLoad={() => setIsLoaded(true)}
          loader={defaultImageLoader}
          sizes={sizes}
          priority={importance === 'high'}
          loading={importance === 'high' ? 'eager' : 'lazy'}
          placeholder={progressiveLoading ? 'blur' : undefined}
          blurDataURL={blurDataURL || defaultBlurDataURL}
        />
      )}

      {/* Placeholder/blur-up effect with shimmer */}
      {!isLoaded && progressiveLoading && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </div>
  );
}
