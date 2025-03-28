"use client";

import React from 'react';

interface SchemaScriptProps {
  schema: string;
}

export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      // key={scriptKey} // Removed key prop as scriptKey is undefined
      // suppressHydrationWarning={true} // Temporarily removed for debugging
    />
  );
}
