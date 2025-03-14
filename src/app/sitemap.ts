import { MetadataRoute } from 'next';

const baseUrl = 'https://aeroprosthetics.com';

export default function sitemap(): MetadataRoute.Sitemap {
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
