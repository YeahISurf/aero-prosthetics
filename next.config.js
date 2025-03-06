/* eslint-disable */
// Next.js config files use CommonJS, not ESM
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // For Contentful images
        pathname: "**",
      },
    ],
  },
  // SWC minify is enabled by default in Next.js 15.2
  // Add compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize bundle size
  experimental: {
    // Use optimized caching for improved build performance
    optimizeCss: true,
    // Optimize Next.js bundle size
    optimizePackageImports: ['next-intl'],
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
      };
    }
    
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
