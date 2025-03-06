/**
 * Custom image loader for optimizing image loading performance
 * This can be used with Next.js Image component to implement custom loading strategies
 */

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Default image loader that applies quality optimization
 * @param {ImageLoaderProps} params - Image loader parameters
 * @returns {string} - Optimized image URL
 */
export function defaultImageLoader({ src, width, quality = 75 }: ImageLoaderProps): string {
  // If the image is already from an image optimization service or CDN, return as is
  if (src.startsWith('https://images.ctfassets.net') || src.startsWith('https://cdn.')) {
    return src;
  }

  // For local images, we can add width and quality parameters
  // This assumes you're using a service that supports these parameters
  // In production, you might use a CDN or image optimization service
  if (src.startsWith('/')) {
    return `${src}?w=${width}&q=${quality}`;
  }

  // For other external images, add width parameter to comply with Next.js requirements
  const url = new URL(src, 'https://example.com');
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', quality.toString());
  
  // Return only the pathname and search parts if it was a relative URL
  if (!src.startsWith('http')) {
    return `${url.pathname}${url.search}`;
  }
  
  return url.toString();
}

/**
 * Determines if an image should be lazy loaded based on its importance
 * @param {string} importance - Image importance ('high', 'medium', 'low')
 * @returns {boolean} - Whether the image should be lazy loaded
 */
export function shouldLazyLoad(importance: 'high' | 'medium' | 'low'): boolean {
  switch (importance) {
    case 'high':
      // High importance images (e.g., hero images, above the fold content)
      return false;
    case 'medium':
      // Medium importance images (e.g., product images that might be visible on load)
      return true;
    case 'low':
      // Low importance images (e.g., below the fold content)
      return true;
    default:
      return true;
  }
}

/**
 * Generates srcSet for responsive images
 * @param {string} src - Base image source
 * @param {number[]} widths - Array of widths to generate srcSet for
 * @param {number} quality - Image quality
 * @returns {string} - srcSet string
 */
export function generateSrcSet(src: string, widths: number[], quality = 75): string {
  return widths
    .map((width) => {
      const url = defaultImageLoader({ src, width, quality });
      return `${url} ${width}w`;
    })
    .join(', ');
}
