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
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main Navigation"
          >
            <Link 
              href={`/${locale}`} 
              className={`text-sm font-medium transition-colors ${
                pathname === `/${locale}` ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={pathname === `/${locale}` ? 'page' : undefined}
            >
              {t('home')}
            </Link>
            <Link 
              href={`/${locale}/about`} 
              className={`text-sm font-medium transition-colors ${
                isActive('about') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('about') ? 'page' : undefined}
            >
              {t('about')}
            </Link>
            <Link 
              href={`/${locale}/services`} 
              className={`text-sm font-medium transition-colors ${
                isActive('services') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('services') ? 'page' : undefined}
            >
              {t('services')}
            </Link>
            <Link 
              href={`/${locale}/team`} 
              className={`text-sm font-medium transition-colors ${
                isActive('team') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('team') ? 'page' : undefined}
            >
              {t('team')}
            </Link>
            <Link 
              href={`/${locale}/locations`} 
              className={`text-sm font-medium transition-colors ${
                isActive('locations') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('locations') ? 'page' : undefined}
            >
              {t('locations')}
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className={`text-sm font-medium transition-colors ${
                isActive('contact') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('contact') ? 'page' : undefined}
            >
              {t('contact')}
            </Link>
            <Link 
              href={`/${locale}/resources`} 
              className={`text-sm font-medium transition-colors ${
                isActive('resources') ? 'text-primary-500 font-semibold' : 'text-gray-700 hover:text-primary-500'
              }`}
              aria-current={isActive('resources') ? 'page' : undefined}
            >
              {t('resources')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            
            <Link 
              href={`/${locale}/contact`} 
              className="hidden md:inline-flex btn-primary"
              aria-label={cta('requestInfo')}
            >
              {cta('requestInfo')}
            </Link>
            
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
