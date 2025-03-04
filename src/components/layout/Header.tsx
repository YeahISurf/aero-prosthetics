"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import Logo from '../ui/Logo';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (path: string) => {
    return pathname.startsWith(`/${path}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${locale}`} 
              className={`text-sm font-medium transition-colors ${
                pathname === `/${locale}` ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('home')}
            </Link>
            <Link 
              href={`/${locale}/about`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('about')}
            </Link>
            <Link 
              href={`/${locale}/services`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/services') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('services')}
            </Link>
            <Link 
              href={`/${locale}/team`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/team') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('team')}
            </Link>
            <Link 
              href={`/${locale}/locations`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/locations') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('locations')}
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('contact')}
            </Link>
            <Link 
              href={`/${locale}/resources`} 
              className={`text-sm font-medium transition-colors ${
                isActive('/resources') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('resources')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link href={`/${locale}/contact`} className="hidden md:inline-flex btn-primary">
              {useTranslations('cta')('requestInfo')}
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
