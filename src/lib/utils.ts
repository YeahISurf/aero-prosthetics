/**
 * Utility functions for the application
 */

/**
 * Throttle function to limit the rate at which a function can fire
 * @param fn The function to throttle
 * @param wait The time to wait between function calls (ms)
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let time = Date.now();
  
  return function(...args: Parameters<T>): void {
    if ((time + wait - Date.now()) < 0) {
      fn(...args);
      time = Date.now();
    }
  };
}

/**
 * Debounce function to delay function execution until after a period of inactivity
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Animation delay constants for consistent timing across components
 */
export const ANIMATION_DELAYS = {
  // Standard staggered entrance delays
  STAGGER_XXS: 0.1,  // 100ms
  STAGGER_XS: 0.2,   // 200ms
  STAGGER_SM: 0.3,   // 300ms
  STAGGER_MD: 0.5,   // 500ms
  STAGGER_LG: 0.8,   // 800ms
  STAGGER_XL: 1.2,   // 1200ms
  
  // Section timing
  SECTION_TITLE: 0.2,
  SECTION_SUBTITLE: 0.4,
  SECTION_CONTENT: 0.6,
  SECTION_CTA: 0.8,
  
  // Sequential item timings (base values, add index * STAGGER_XX for items)
  ITEM_BASE: 0.5,
  
  // Calculate staggered delay for arrays of items
  getStaggeredDelay: (index: number, baseDelay = 0.5, staggerAmount = 0.1): number => {
    return baseDelay + (index * staggerAmount);
  }
}; 