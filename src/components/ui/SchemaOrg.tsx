"use client";

import React from 'react';

interface SchemaOrgProps {
  type: 'AboutPage' | 'WebPage' | 'Organization' | 'Person' | string;
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
  organization,
}: {
  name: string;
  description: string;
  url: string;
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