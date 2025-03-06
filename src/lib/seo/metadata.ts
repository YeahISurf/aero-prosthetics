import { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  path?: string; // Add path parameter for canonical URL
};

export function constructMetadata({
  title,
  description,
  keywords,
  image,
  noIndex,
  path = '', // Default to empty string (root path)
}: MetadataProps): Metadata {
  return {
    metadataBase: new URL('https://aeroprosthetics.com'),
    title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
    description:
      description ||
      'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
    keywords: keywords?.join(', '),
    openGraph: {
      title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
      description:
        description ||
        'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
      images: image ? [{ url: image }] : [{ url: '/og-image.jpg' }],
      type: 'website',
      siteName: 'Aero Prosthetics',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
      description:
        description ||
        'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
      images: image ? [{ url: image }] : [{ url: '/og-image.jpg' }],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: `https://aeroprosthetics.com${path}`,
      languages: {
        'en-US': `https://aeroprosthetics.com/en${path}`,
        'es-ES': `https://aeroprosthetics.com/es${path}`,
      },
    },
  };
}
