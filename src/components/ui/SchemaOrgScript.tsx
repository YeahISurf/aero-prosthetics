'use client';

import { useEffect, useState } from 'react';

export default function SchemaOrgScript() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Aero Prosthetics',
    description: 'Advanced prosthetic solutions with personalized care',
    url: 'https://aeroprosthetics.com',
    telephone: '+1-800-123-4567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Medical Plaza',
      addressLocality: 'Medical City',
      addressRegion: 'MC',
      postalCode: '12345',
      addressCountry: 'US'
    },
    sameAs: [
      'https://facebook.com/aeroprosthetics',
      'https://twitter.com/aeroprosthetics',
      'https://linkedin.com/company/aeroprosthetics'
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ]
  };
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
} 