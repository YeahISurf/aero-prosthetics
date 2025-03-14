import { getBlogPosts } from '@/lib/blog/getPosts';

export async function GET() {
  const posts = await getBlogPosts();
  const baseUrl = 'https://aeroprosthetics.com';
  const locales = ['en', 'es'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${locales.map(locale => `
  <url>
    <loc>${baseUrl}/${locale}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    ${locales.map(altLocale => `
    <xhtml:link rel="alternate" hreflang="${altLocale === 'en' ? 'en-US' : 'es-ES'}" href="${baseUrl}/${altLocale}/blog" />
    `).join('')}
  </url>
  `).join('')}
  ${posts.flatMap(post => 
    locales.map(locale => `
    <url>
      <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.publishedDate).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
      ${locales.map(altLocale => `
      <xhtml:link rel="alternate" hreflang="${altLocale === 'en' ? 'en-US' : 'es-ES'}" href="${baseUrl}/${altLocale}/blog/${post.slug}" />
      `).join('')}
    </url>
    `)
  ).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
} 