'use client';

import { useId, useMemo } from 'react';

/**
 * A hook that generates a stable ID that can be used in server components
 * to prevent hydration mismatches with Radix UI and other libraries that
 * generate random IDs during rendering.
 * 
 * @param prefix - Optional prefix for the ID
 * @param staticId - Optional static ID to use instead of generating one
 * @returns A stable ID string
 */
export function useStableId(prefix?: string, staticId?: string): string {
  // Use the provided static ID if available (best for SSR cases)
  // Otherwise, generate a deterministic ID using React's useId
  const reactId = useId();
  
  return useMemo(() => {
    if (staticId) {
      return prefix ? `${prefix}-${staticId}` : staticId;
    }
    
    // Remove the ":" characters from React's useId as they can cause issues
    const cleanId = reactId.replace(/:/g, '');
    return prefix ? `${prefix}-${cleanId}` : cleanId;
  }, [prefix, staticId, reactId]);
}

/**
 * A utility to generate a stable, deterministic ID based on a string input.
 * This can be used on both server and client without causing hydration mismatches.
 * 
 * @param input - The string to hash into an ID
 * @param prefix - Optional prefix for the ID
 * @returns A stable ID string
 */
export function generateStableId(input: string, prefix?: string): string {
  // Simple string hash function that's deterministic
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to a positive hex string
  const hashStr = Math.abs(hash).toString(16);
  
  return prefix ? `${prefix}-${hashStr}` : hashStr;
} 