import { NextResponse } from 'next/server';
import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

// Dynamic base URL detection
function getBaseUrl() {
  // In production, use the hardcoded URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://aeroprosthetics.com';
  }

  // For development, use localhost default
  return 'http://localhost:3000';
}

// Reuse the same sitemap generation logic
function generateSitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales = ['en', 'es'];
  const routes = [
    '',
    '/about',
    '/services',
    '/team',
    '/locations',
    '/contact',
    '/resources',
    '/solutions',
    '/training',
    '/book-demo',
    '/legal/privacy',
    '/legal/terms',
    '/legal/accessibility',
    '/legal/disclaimer',
  ];

  // Generate sitemap entries for all routes and locales
  const entries: MetadataRoute.Sitemap = [];

  // Add entries for each route and locale
  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      
      // Set priority based on page importance
      let priority = 0.8;
      if (route === '') {
        priority = 1.0; // Homepage gets highest priority
      } else if (route === '/about' || route === '/services' || route === '/solutions') {
        priority = 0.9; // Main sections get high priority
      } else if (route === '/book-demo') {
        priority = 0.9; // Conversion page gets high priority
      }
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority,
        // Add hreflang alternates for each locale
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en${route}`,
            'es-ES': `${baseUrl}/es${route}`,
          },
        },
      });
    }
  }

  // Add service detail pages
  const services = [
    'lower-limb-prosthetics',
    'upper-limb-prosthetics',
    'pediatric-prosthetics',
    'orthotics',
    'compression-garments',
    'mastectomy-products',
    'cranial-helmets',
    'custom-bracing',
  ];

  for (const locale of locales) {
    for (const service of services) {
      const url = `${baseUrl}/${locale}/services/${service}`;
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en/services/${service}`,
            'es-ES': `${baseUrl}/es/services/${service}`,
          },
        },
      });
    }
  }

  // Add team member detail pages
  const teamMembers = [
    'john-smith',
    'jane-doe',
    'robert-johnson',
    'maria-garcia',
  ];

  for (const locale of locales) {
    for (const member of teamMembers) {
      const url = `${baseUrl}/${locale}/team/${member}`;
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en/team/${member}`,
            'es-ES': `${baseUrl}/es/team/${member}`,
          },
        },
      });
    }
  }

  // Add resource content pages (if they exist)
  const resources = [
    'blog',
    'guides',
    'faq',
    'videos',
  ];

  for (const locale of locales) {
    for (const resource of resources) {
      const url = `${baseUrl}/${locale}/resources/${resource}`;
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en/resources/${resource}`,
            'es-ES': `${baseUrl}/es/resources/${resource}`,
          },
        },
      });
    }
  }

  return entries;
}

// Convert sitemap object to XML string with XSL stylesheet reference
function generateSitemapXml(): string {
  const entries = generateSitemap();
  
  // XML declaration and stylesheet reference
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  // Add each URL entry
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    
    if (entry.lastModified) {
      const lastmod = entry.lastModified instanceof Date 
        ? entry.lastModified.toISOString() 
        : entry.lastModified;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    
    // Add hreflang alternates if available
    if (entry.alternates?.languages) {
      const languages = entry.alternates.languages;
      Object.entries(languages).forEach(([lang, href]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />\n`;
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

export async function GET() {
  // Generate the sitemap XML with XSL reference
  const xml = generateSitemapXml();
  
  // Return the XML with proper content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
} 