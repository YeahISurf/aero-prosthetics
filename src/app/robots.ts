import { MetadataRoute } from 'next';

// Dynamic base URL detection
function getBaseUrl() {
  // In production, use the hardcoded URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://aeroprosthetics.com';
  }

  // For development, use localhost default
  return 'http://localhost:3000';
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/.git/',
          '/private/',
          '/tmp/',
          '/draft/',
          '/*/draft/',
          '/*/preview/',
          '/*?preview=*',
          '/error',
          '/404',
          '/500',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/about',
          '/solutions',
          '/contact',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/legal/',
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/blog-sitemap.xml`,
    ],
    host: baseUrl,
  };
}
