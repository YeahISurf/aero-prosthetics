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
};

module.exports = withNextIntl(nextConfig);
