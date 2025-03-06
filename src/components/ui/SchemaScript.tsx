"use client";

import React from 'react';

interface SchemaScriptProps {
  schema: string;
}

export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
      suppressHydrationWarning={true}
      data-testid="schema-script"
    />
  );
}
