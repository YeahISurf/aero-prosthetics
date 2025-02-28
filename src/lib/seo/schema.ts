type LocalBusinessProps = {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  image?: string;
};

type MedicalOrganizationProps = {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  medicalSpecialty: string[];
  image?: string;
};

type MedicalSpecialtyProps = {
  name: string;
  description: string;
  url: string;
  medicalSpecialty: string;
  image?: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

type BreadcrumbItemProps = {
  name: string;
  item: string;
};

/**
 * Generates LocalBusiness schema for a location
 */
export function generateLocalBusinessSchema(props: LocalBusinessProps): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${props.url}#localbusiness`,
    name: props.name,
    description: props.description,
    url: props.url,
    telephone: props.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: props.geo.latitude,
      longitude: props.geo.longitude,
    },
    openingHoursSpecification: props.openingHours.map((hours) => {
      const [dayOfWeek, time] = hours.split(' ');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek,
        opens: time.split('-')[0].trim(),
        closes: time.split('-')[1].trim(),
      };
    }),
    image: props.image || 'https://aeroprosthetics.com/logo.png',
  };

  return JSON.stringify(schema);
}

/**
 * Generates MedicalOrganization schema
 */
export function generateMedicalOrganizationSchema(props: MedicalOrganizationProps): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${props.url}#organization`,
    name: props.name,
    description: props.description,
    url: props.url,
    telephone: props.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    medicalSpecialty: props.medicalSpecialty,
    image: props.image || 'https://aeroprosthetics.com/logo.png',
  };

  return JSON.stringify(schema);
}

/**
 * Generates MedicalSpecialty schema for a service
 */
export function generateMedicalSpecialtySchema(props: MedicalSpecialtyProps): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalSpecialty',
    '@id': `${props.url}#medicalspecialty`,
    name: props.name,
    description: props.description,
    url: props.url,
    medicalSpecialty: props.medicalSpecialty,
    image: props.image || 'https://aeroprosthetics.com/logo.png',
  };

  return JSON.stringify(schema);
}

/**
 * Generates FAQPage schema
 */
export function generateFAQPageSchema(items: FAQItemProps[], url: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faqpage`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Generates BreadcrumbList schema
 */
export function generateBreadcrumbListSchema(items: BreadcrumbItemProps[], url: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumblist`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Prepares schema data for insertion into a page
 * This returns an array of schema strings that can be used in a component
 */
export function prepareSchemas(schemas: string[]): string[] {
  return schemas;
}

/**
 * Anaheim Hills location data
 */
export const anaheimLocationData: LocalBusinessProps = {
  name: 'Aero Prosthetics - Anaheim Hills',
  description: 'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
  url: 'https://aeroprosthetics.com/locations/anaheim',
  telephone: '+17143851000',
  address: {
    streetAddress: '1001 N Weir Canyon Road',
    addressLocality: 'Anaheim Hills',
    addressRegion: 'CA',
    postalCode: '92807',
    addressCountry: 'US',
  },
  geo: {
    latitude: 33.8704,
    longitude: -117.7517,
  },
  openingHours: [
    'Monday 8:00-17:00',
    'Tuesday 8:00-17:00',
    'Wednesday 8:00-17:00',
    'Thursday 8:00-17:00',
    'Friday 8:00-16:00',
  ],
};

/**
 * Victorville location data
 */
export const victorvilleLocationData: LocalBusinessProps = {
  name: 'Aero Prosthetics - Victorville',
  description: 'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
  url: 'https://aeroprosthetics.com/locations/victorville',
  telephone: '+17602451000',
  address: {
    streetAddress: '17189 Yuma Street',
    addressLocality: 'Victorville',
    addressRegion: 'CA',
    postalCode: '92395',
    addressCountry: 'US',
  },
  geo: {
    latitude: 34.5362,
    longitude: -117.2928,
  },
  openingHours: [
    'Monday 8:00-17:00',
    'Tuesday 8:00-17:00',
    'Wednesday 8:00-17:00',
    'Thursday 8:00-17:00',
    'Friday 8:00-16:00',
  ],
};

/**
 * Organization data
 */
export const organizationData: MedicalOrganizationProps = {
  name: 'Aero Prosthetics',
  description: 'Aero Prosthetics provides cutting-edge prosthetic and orthotic solutions with personalized care and comprehensive support.',
  url: 'https://aeroprosthetics.com',
  telephone: '+17143851000',
  address: {
    streetAddress: '1001 N Weir Canyon Road',
    addressLocality: 'Anaheim Hills',
    addressRegion: 'CA',
    postalCode: '92807',
    addressCountry: 'US',
  },
  medicalSpecialty: [
    'Prosthetics',
    'Orthotics',
    'Pediatric Prosthetics',
    'Spinal Orthotics',
    'Compression Garments',
    'Mastectomy Products',
    'Cranial Helmets',
    'Custom Bracing',
  ],
};
