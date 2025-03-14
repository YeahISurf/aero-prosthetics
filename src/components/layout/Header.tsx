"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import LanguageToggle from './LanguageToggle';
import Logo from '../ui/Logo';
import MobileNavigation from './MobileNavigation';

// Fallback translations
const fallbackTranslations = {
  navigation: {
    home: 'Home',
    about: 'About Us',
    solutions: 'Solutions',
    blog: 'Blog',
    training: 'Training',
    locations: 'Locations',
    contact: 'Contact'
  },
  cta: {
    book_demo: 'Book Demo'
  }
};

// Skeleton component for SSR
function HeaderSkeleton() {
  return (
    <header 
      className="sticky top-0 z-40 w-full bg-white shadow-sm"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="h-10 w-40 bg-gray-100 animate-pulse"></div>
          <div className="hidden md:flex space-x-4">
            <div className="h-4 w-16 bg-gray-100 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-100 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-100 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-100 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  // Client-side rendering control
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Mark component as mounted on client-side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // If not mounted yet, return skeleton loader
  if (!mounted) {
    return <HeaderSkeleton />;
  }
  
  // Only access these hooks after component is mounted
  const locale = useLocale();
  const pathname = usePathname();
  
  // Get translations with fallback
  let t;
  try {
    t = useTranslations('navigation');
  } catch (error) {
    // If translation function fails, use a wrapper that returns fallbacks
    t = (key: string) => {
      return fallbackTranslations.navigation[key as keyof typeof fallbackTranslations.navigation] || key;
    };
  }
  
  // Get CTA translations with fallback
  let ctaT;
  try {
    ctaT = useTranslations('cta');
  } catch (error) {
    // If translation function fails, use a wrapper that returns fallbacks
    ctaT = (key: string) => {
      return fallbackTranslations.cta[key as keyof typeof fallbackTranslations.cta] || key;
    };
  }

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check scroll position on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };
  
  // Safely get translation with fallback
  const getT = (key: string) => {
    try {
      return t(key);
    } catch (error) {
      return fallbackTranslations.navigation[key as keyof typeof fallbackTranslations.navigation] || key;
    }
  };
  
  // Safely get CTA translation with fallback
  const getCta = (key: string) => {
    try {
      return ctaT(key);
    } catch (error) {
      return fallbackTranslations.cta[key as keyof typeof fallbackTranslations.cta] || key;
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={`/${locale}`} aria-label="Home" className="block">
              <Logo height={40} />
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <LanguageToggle />
            <MobileNavigation />
          </div>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <nav className="flex space-x-8">
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className={`text-sm font-medium ${pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={pathname === `/${locale}` ? 'page' : undefined}
                  >
                    {getT('home')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/about`} 
                    className={`text-sm font-medium ${isActive('about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('about') ? 'page' : undefined}
                  >
                    {getT('about')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/solutions`} 
                    className={`text-sm font-medium ${isActive('solutions') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('solutions') ? 'page' : undefined}
                  >
                    {getT('solutions')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/blog`} 
                    className={`text-sm font-medium ${isActive('blog') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('blog') ? 'page' : undefined}
                  >
                    {getT('blog')}
                  </Link>
                </li>
                
                <li>
                  <Link
                    href={`/${locale}/training`} 
                    className={`text-sm font-medium ${isActive('training') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('training') ? 'page' : undefined}
                  >
                    {getT('training')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/locations`} 
                    className={`text-sm font-medium ${isActive('locations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('locations') ? 'page' : undefined}
                  >
                    {getT('locations')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/contact`} 
                    className={`text-sm font-medium ${isActive('contact') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('contact') ? 'page' : undefined}
                  >
                    {getT('contact')}
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="ml-8 flex items-center">
              <LanguageToggle />
              
              <Link
                href={`/${locale}/book-demo`}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 hover:scale-105 transition-all duration-200"
              >
                {getCta('book_demo')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

