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
  const locale = useLocale();
  const pathname = usePathname();

  // Use useMemo to memoize the translation functions
  const nav = useTranslations('navigation');
  const cta = useTranslations('cta');

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // If not mounted yet, return skeleton loader
  if (!mounted) {
    return <HeaderSkeleton />;
  }
  
  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };
  
  // Safely get translation with fallback
  const getT = (key: string) => {
    if (nav) {
      return nav(key);
    }
    return fallbackTranslations.navigation[key as keyof typeof fallbackTranslations.navigation] || key;
  };
  
  // Safely get CTA translation with fallback
  const getCta = (key: string) => {
    if (cta) {
      return cta(key);
    }
    return fallbackTranslations.cta[key as keyof typeof fallbackTranslations.cta] || key;
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
        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="flex-shrink-0">
            <Link 
              href={`/${locale}`} 
              aria-label="Aero Prosthetics - Home"
              className="block"
            >
              <Logo 
                height={50} 
                className="sm:h-[55px] md:h-[60px] lg:h-[65px] xl:h-[70px]" 
                companyName={nav('companyName')}
                tagline={nav('tagline')}
              />
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <LanguageToggle />
            <MobileNavigation />
          </div>
          
          <div className="hidden md:flex items-center justify-end space-x-2 md:flex-1">
            <nav className="flex">
              <ul className="flex md:space-x-6 lg:space-x-8 xl:space-x-12">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={pathname === `/${locale}` ? 'page' : undefined}
                  >
                    {getT('home')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/about`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('about') ? 'page' : undefined}
                  >
                    {getT('about')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/solutions`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('solutions') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('solutions') ? 'page' : undefined}
                  >
                    {getT('solutions')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/training`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('training') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('training') ? 'page' : undefined}
                  >
                    {getT('training')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/locations`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('locations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('locations') ? 'page' : undefined}
                  >
                    {getT('locations')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/blog`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('blog') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('blog') ? 'page' : undefined}
                  >
                    {getT('blog')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href={`/${locale}/contact`} 
                    className={`text-xs md:text-sm whitespace-nowrap font-medium px-2 ${isActive('contact') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                    aria-current={isActive('contact') ? 'page' : undefined}
                  >
                    {getT('contact')}
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="ml-3 md:ml-4 lg:ml-6 xl:ml-8 flex items-center">
              <LanguageToggle />
              
              <Link
                href={`/${locale}/book-demo`}
                className="ml-2 md:ml-3 lg:ml-4 xl:ml-6 whitespace-nowrap inline-flex items-center justify-center px-2 md:px-3 lg:px-4 py-1.5 md:py-2 border border-transparent rounded-md shadow-sm text-xs md:text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 hover:scale-105 transition-all duration-200"
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

