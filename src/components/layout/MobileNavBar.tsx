"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Home, Info, Stethoscope, MapPin, Phone } from 'lucide-react';
import { Icon } from '../ui/Icon';

export default function MobileNavBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show navbar after scrolling down 100px
      const scrollThreshold = 100;
      
      // Check if user has scrolled past threshold but not at bottom
      const isScrolledDown = scrollY > scrollThreshold;
      
      // Check if user is at or near the bottom of the page (within 50px)
      const isAtBottom = scrollY + viewportHeight >= documentHeight - 50;
      
      // Show the navbar only when scrolled down AND not at the bottom
      const shouldBeVisible = isScrolledDown && !isAtBottom;
      
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // Check position on resize as well (in case document height changes)
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  // Don't show on desktop and only show on mobile when scrolled down but not at bottom
  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg pb-safe transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <nav className="flex justify-around items-center h-16" aria-label="Mobile navigation">
        <Link
          href={`/${locale}`}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-600'
          }`}
          aria-current={pathname === `/${locale}` ? 'page' : undefined}
        >
          <Icon 
            icon={Home} 
            size="md" 
            className={pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-600'}
          />
          <span className="text-xs mt-1">{t('home')}</span>
        </Link>

        <Link
          href={`/${locale}/services`}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            isActive('services') ? 'text-primary-600' : 'text-gray-600'
          }`}
          aria-current={isActive('services') ? 'page' : undefined}
        >
          <Icon 
            icon={Stethoscope} 
            size="md" 
            className={isActive('services') ? 'text-primary-600' : 'text-gray-600'}
          />
          <span className="text-xs mt-1">{t('services')}</span>
        </Link>

        <Link
          href={`/${locale}/about`}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            isActive('about') ? 'text-primary-600' : 'text-gray-600'
          }`}
          aria-current={isActive('about') ? 'page' : undefined}
        >
          <Icon 
            icon={Info} 
            size="md" 
            className={isActive('about') ? 'text-primary-600' : 'text-gray-600'}
          />
          <span className="text-xs mt-1">{t('about')}</span>
        </Link>

        <Link
          href={`/${locale}/locations`}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            isActive('locations') ? 'text-primary-600' : 'text-gray-600'
          }`}
          aria-current={isActive('locations') ? 'page' : undefined}
        >
          <Icon 
            icon={MapPin} 
            size="md" 
            className={isActive('locations') ? 'text-primary-600' : 'text-gray-600'}
          />
          <span className="text-xs mt-1">{t('locations')}</span>
        </Link>

        <Link
          href={`/${locale}/contact`}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            isActive('contact') ? 'text-primary-600' : 'text-gray-600'
          }`}
          aria-current={isActive('contact') ? 'page' : undefined}
        >
          <Icon 
            icon={Phone} 
            size="md" 
            className={isActive('contact') ? 'text-primary-600' : 'text-gray-600'}
          />
          <span className="text-xs mt-1">{t('contact')}</span>
        </Link>
      </nav>
    </div>
  );
} 