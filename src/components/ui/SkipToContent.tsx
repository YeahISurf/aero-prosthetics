"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SkipToContent() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:outline-none focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
