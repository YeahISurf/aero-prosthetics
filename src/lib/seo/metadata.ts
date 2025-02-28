import { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function constructMetadata({
  title,
  description,
  keywords,
  image,
  noIndex,
}: MetadataProps): Metadata {
  return {
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
      images: image ? [image] : ['/og-image.jpg'],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: 'https://aeroprosthetics.com',
      languages: {
        'en-US': 'https://aeroprosthetics.com/en',
        'es-ES': 'https://aeroprosthetics.com/es',
      },
    },
  };
}
