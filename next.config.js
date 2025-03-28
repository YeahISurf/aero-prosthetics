/* eslint-disable */
// Next.js config files use CommonJS, not ESM
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build - we'll handle linting separately
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript type checking during build
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
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
  },
  // SWC minify is enabled by default in Next.js 15.2
  // Add compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable styled-components
    styledComponents: true,
  },
  // External packages that should be handled by the server
  serverExternalPackages: [],
  // Optimize bundle size
  experimental: {
    // Use turbo for faster builds (implicit in Next.js 15+)
    // Optimize Next.js bundle size
    optimizePackageImports: ['next-intl', 'react-icons', 'lucide-react'],
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

      // Improve caching with deterministic ids
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }
    
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
