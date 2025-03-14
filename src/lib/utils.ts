import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Animation delay constants for staggered animations
 */
export const ANIMATION_DELAYS = {
  INSTANT: 0,
  QUICK: 0.1,
  FAST: 0.2,
  MEDIUM: 0.3,
  SLOW: 0.5,
  
  // Section-specific delays
  SECTION_TITLE: 0.2,
  SECTION_SUBTITLE: 0.3,
  SECTION_CONTENT: 0.4,
  
  // Staggered delays
  STAGGER_XS: 0.5,
  STAGGER_SM: 0.6,
  STAGGER_MD: 0.7,
  STAGGER_LG: 0.8,
  STAGGER_XL: 0.9,
  
  // Base delay for item animations
  ITEM_BASE: 0.4,
  
  // Helper function to calculate staggered delays
  getStaggeredDelay: (index: number, base: number, increment: number): number => {
    return base + (index * increment);
  }
};

/**
 * Throttle function to limit how often a function can be called
 * @param fn Function to throttle
 * @param delay Minimum time between function calls in ms
 * @returns Throttled function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Validates an email address
 * @param email Email to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts an image URL to use WebP format if possible
 */
export function getWebPImageUrl(url: string): string {
  // If it's an external image like a placeholder, don't modify
  if (url.startsWith('https://placehold.co')) return url;
  
  // For images stored on our domain or CDN
  if (url.includes('?')) {
    // If the URL already has query parameters
    return url.includes('format=webp') ? url : `${url}&format=webp`;
  } else {
    // No existing query parameters
    return `${url}?format=webp`;
  }
}

/**
 * Generates proper image dimensions based on aspect ratio
 */
export function getImageDimensions(width: number, height?: number, aspectRatio = 16/9) {
  if (height) return { width, height };
  return { width, height: Math.round(width / aspectRatio) };
}

// Add other utility functions as needed
