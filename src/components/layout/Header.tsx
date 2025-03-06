"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import LanguageToggle from './LanguageToggle';
import Logo from '../ui/Logo';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const t = useTranslations('navigation');
  const cta = useTranslations('cta');
  const pathname = usePathname();
  const locale = useLocale();
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  return (
    <header 
      className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex ml-10 space-x-8" aria-label="Main Menu">
              <Link 
                href={`/${locale}/`} 
                className={`text-sm font-medium ${pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                aria-current={pathname === `/${locale}` ? 'page' : undefined}
              >
                {t('home')}
              </Link>
              
              <Link 
                href={`/${locale}/about`} 
                className={`text-sm font-medium ${isActive('about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                aria-current={isActive('about') ? 'page' : undefined}
              >
                {t('about')}
              </Link>
              
              <Link 
                href={`/${locale}/services`} 
                className={`text-sm font-medium ${isActive('services') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                aria-current={isActive('services') ? 'page' : undefined}
              >
                {t('services')}
              </Link>
              
              <Link 
                href={`/${locale}/locations`} 
                className={`text-sm font-medium ${isActive('locations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                aria-current={isActive('locations') ? 'page' : undefined}
              >
                {t('locations')}
              </Link>
              
              <Link 
                href={`/${locale}/resources`} 
                className={`text-sm font-medium ${isActive('resources') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
                aria-current={isActive('resources') ? 'page' : undefined}
              >
                {t('resources')}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            <div className="hidden md:block">
              <Link 
                href={`/${locale}/contact`} 
                className="btn btn-primary"
                aria-label={cta('contactUs')}
              >
                {cta('contactUs')}
              </Link>
            </div>
            
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
