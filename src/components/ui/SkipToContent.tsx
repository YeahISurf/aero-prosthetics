"use client";

import { useEffect, useState } from 'react';

export default function SkipToContent() {
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
}
