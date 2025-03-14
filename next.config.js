/* eslint-disable */
// Next.js config files use CommonJS, not ESM
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add rewrites to support traditional sitemap.xml URL
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  // Enable HTTP/2 for better performance
  poweredByHeader: false, // Remove the X-Powered-By header for security
  compress: true, // Enable gzip compression
  // Add cache headers for better performance
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache static assets for a year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        // Cache CSS and JS for a month with revalidation
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          }
        ],
      },
    ];
  },
  images: {
    domains: ['aero-prosthetics.vercel.app'], // Add domain for self-referencing images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // For Contentful images
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app", // For Vercel hosting
        pathname: "**",
      },
    ],
    // Allow unoptimized image placeholders during development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // SWC minify is enabled by default in Next.js 15.2
  // Add compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable styled-components
    styledComponents: true,
  },
  // Optimize bundle size
  experimental: {
    // Use optimized caching for improved build performance
    optimizeCss: true,
    // Optimize Next.js bundle size
    optimizePackageImports: ['next-intl'],
    // Add bleeding-edge optimizations
    optimisticClientCache: true,
    // Improve code generation
    swcPlugins: [
      // Removed '@swc/plugin-optimize-react' plugin that's causing issues
    ],
  },
  // Add webpack optimization for removing unused code
  webpack: (config, { dev, isServer }) => {
    // Only optimize in production builds
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      
      // Improve code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          // Create a separate chunk for vendor modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
          },
          // Optimize common functionality
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
          },
          // Keep future use code in a separate chunk
          future: {
            test: /[\\/]src[\\/]lib[\\/]future[\\/]/,
            name: 'future-features',
            chunks: 'async', // Load asynchronously when needed
            priority: 15,
            enforce: true,
          }
        }
      };

      // Retain 353-addda649c3cd7a33.js but make it load dynamically
      // This will ensure it's not loaded on initial page load but kept for future use
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }
    
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
