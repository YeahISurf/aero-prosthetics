'use client';

import dynamic from 'next/dynamic';

// Import Schema.org component with client-only rendering
const SchemaOrgScript = dynamic(() => import('./SchemaOrgScript'), { 
  ssr: false 
});

export default function ClientSchemaWrapper() {
  return <SchemaOrgScript />;
} 