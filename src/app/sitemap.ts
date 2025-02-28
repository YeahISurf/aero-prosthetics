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
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
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

  return entries;
}
