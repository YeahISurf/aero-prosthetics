'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height, className }: LogoProps = {}) {
  const [mounted, setMounted] = useState(false);
  
  // Initialize translation with null and set it safely
  let companyTranslations = null;
  try {
    companyTranslations = useTranslations('footer.company');
  } catch (e) {
    // Fallback happens below
  }
  
  // Create a safe version of the translation function
  const t = companyTranslations || 
    ((key: string) => key === 'title' ? 'Aero Prosthetics' : 'Advanced Prosthetic Solutions');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything during SSR to prevent hydration issues
  if (!mounted) {
    // Return a placeholder with similar dimensions to prevent layout shift
    return (
      <div className={cn("flex items-center space-x-2", className)} aria-hidden="true">
        <div className="md:w-10 md:h-10 w-8 h-8 bg-gray-200 rounded-md" />
        <div className="h-12 w-32 bg-gray-100 rounded" />
      </div>
    );
  }

  // When height is provided, use it; otherwise use a reasonable default
  const logoHeight = height || 150;
  
  // For display inside the header, we want to ensure the icon is prominent
  // Calculate width based on the height to maintain proper aspect ratio
  const logoWidth = Math.round(logoHeight * 1.5);
  
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="flex-shrink-0 pr-4">
        <Image 
          src="/images/logo.svg"
          alt="Aero Prosthetics Logo"
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
          priority={true}
          style={{ maxHeight: `${logoHeight}px` }}
        />
      </div>
      <div>
        <h1 className="md:text-xl text-lg font-bold text-primary-600 leading-none">{t('title')}</h1>
        <p className="md:text-xs text-[10px] text-gray-500 md:block leading-tight mt-0.5">{t('description')}</p>
      </div>
    </div>
  );
}
