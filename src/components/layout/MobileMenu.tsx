"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation');
  const ctaT = useTranslations('cta');
  const requestInfoText = ctaT('requestInfo');
  const pathname = usePathname();
  const locale = useLocale();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return pathname.startsWith(`/${path}`);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-700 hover:text-primary-500 focus:outline-none"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link
              href={`/${locale}`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                pathname === `/${locale}` ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/about`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/services`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/services') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('services')}
            </Link>
            <Link
              href={`/${locale}/team`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/team') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('team')}
            </Link>
            <Link
              href={`/${locale}/locations`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/locations') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('locations')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('contact')}
            </Link>
            <Link
              href={`/${locale}/resources`}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                isActive('/resources') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              {t('resources')}
            </Link>
            <Link href={`/${locale}/contact`} onClick={closeMenu} className="btn-primary w-full text-center">
              {requestInfoText}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
