"use client";

import React from 'react';

interface SchemaOrgProps {
  type: 'AboutPage' | 'WebPage' | 'Organization' | 'Person' | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export function AboutPageSchema({ 
  name,
  description,
  url,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organization,
}: {
  name: string;
  description: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organization?: Record<string, any>;
}) {
  const aboutData = {
    name,
    description,
    url,
    ...(organization ? { 
      about: {
        '@type': 'Organization',
        ...organization
      }
    } : {})
  };
  
  return <SchemaOrg type="AboutPage" data={aboutData} />;
} 