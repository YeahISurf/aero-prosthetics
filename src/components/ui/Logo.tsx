'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

interface LogoProps {
  height?: number;
}

export default function Logo({ height }: LogoProps = {}) {
  const [mounted, setMounted] = useState(false);
  
  // Move hooks outside of conditionals to the top
  const locale = useLocale();
  let t;
  try {
    t = useTranslations('footer.company');
  } catch (error) {
    // Fallback if translations fail
    t = (key: string) => key === 'title' ? 'Aero Prosthetics' : 'Advanced Prosthetic Solutions';
  }
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything during SSR to prevent hydration issues
  if (!mounted) {
    // Return a placeholder with similar dimensions to prevent layout shift
    return (
      <div className="flex items-center space-x-2" aria-hidden="true">
        <div className="md:w-10 md:h-10 w-8 h-8 bg-gray-200 rounded-md" />
        <div className="h-12 w-32 bg-gray-100 rounded" />
      </div>
    );
  }

  // Scale based on provided height or use default responsive sizing
  const logoSize = height ? { height: `${height}px` } : {};
  const iconSize = height ? { width: `${height * 0.8}px`, height: `${height * 0.8}px` } : {};
  
  return (
    <div className="flex items-center space-x-2" style={logoSize}>
      {/* Placeholder logo - replace with actual logo later */}
      <div 
        className="bg-primary-500 rounded-md flex items-center justify-center flex-shrink-0"
        style={iconSize || { width: 'auto', height: 'auto' }}
      >
        <span className="text-white font-bold md:text-xl text-lg">AP</span>
      </div>
      <div>
        <h1 className="md:text-xl text-lg font-bold text-primary-600 leading-none">{t('title')}</h1>
        <p className="md:text-xs text-[10px] text-gray-500 md:block leading-tight mt-0.5">{t('description')}</p>
      </div>
    </div>
  );
}
