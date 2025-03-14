import { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  path?: string; // Add path parameter for canonical URL
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  locale?: string;
};

export function constructMetadata({
  title,
  description,
  keywords,
  image,
  noIndex,
  path = '', // Default to empty string (root path)
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  locale = 'en',
}: MetadataProps): Metadata {
  // Base URL with trailing slash handling
  const baseUrl = 'https://aeroprosthetics.com';
  const canonical = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  
  // Default image with absolute URL
  const defaultImage = `${baseUrl}/og-image.jpg`;
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;
  
  return {
    metadataBase: new URL(baseUrl),
    title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
    description:
      description ||
      'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
    keywords: keywords?.join(', '),
    
    // Enhanced OpenGraph metadata
    openGraph: {
      title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
      description:
        description ||
        'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Aero Prosthetics',
          type: image?.includes('.png') ? 'image/png' : 'image/jpeg',
        }
      ],
      type,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      siteName: 'Aero Prosthetics',
      url: canonical,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: authors?.map(author => `${baseUrl}/team/${author}`) || [`${baseUrl}/team`],
        tags,
      }),
    },
    
    // Enhanced Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Aero Prosthetics` : 'Aero Prosthetics - Advanced Prosthetic Solutions',
      description:
        description ||
        'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
      images: [imageUrl],
      creator: '@AeroProsthetics',
      site: '@AeroProsthetics',
    },
    
    // SEO robots configuration
    robots: {
      index: !noIndex,
      follow: !noIndex,
      'max-snippet': 250,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    
    // Canonical and language alternates
    alternates: {
      canonical,
      languages: {
        'en-US': `${baseUrl}/en${path}`,
        'es-ES': `${baseUrl}/es${path}`,
      },
    },
  };
}
