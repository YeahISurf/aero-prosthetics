import Script from 'next/script';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherLogo: string;
  categories?: string[];
  tags?: string[];
  wordCount?: number;
}

export function BlogPostSchema({
  title,
  description,
  datePublished,
  dateModified,
  image,
  url,
  authorName,
  authorUrl,
  publisherName,
  publisherLogo,
  categories = [],
  tags = [],
  wordCount,
}: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    url: url,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: categories.join(', '),
    keywords: tags.join(', '),
    ...(wordCount && { wordCount }),
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogListingSchemaProps {
  title: string;
  description: string;
  url: string;
  items: Array<{
    title: string;
    url: string;
    datePublished: string;
    image: string;
  }>;
}

export function BlogListingSchema({
  title,
  description,
  url,
  items,
}: BlogListingSchemaProps) {
  const itemListElements = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: item.url,
    name: item.title,
    image: item.image,
    datePublished: item.datePublished,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description,
    url: url,
    itemListElement: itemListElements,
  };

  return (
    <Script
      id="blog-listing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbListSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const itemListElements = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElements,
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 