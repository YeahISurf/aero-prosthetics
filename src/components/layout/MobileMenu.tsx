"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('navigation');
  const cta = useTranslations('cta');
  const pathname = usePathname();
  const locale = useLocale();

  // Handle mounting (client-side only)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle body scroll locking when menu is open
  useEffect(() => {
    const menuElement = menuRef.current;
    
    if (isOpen) {
      // Small delay to ensure the menu is rendered before locking
      setTimeout(() => {
        if (menuElement) {
          disableBodyScroll(menuElement);
        }
      }, 100);
    } else {
      if (menuElement) {
        enableBodyScroll(menuElement);
      }
    }

    // Cleanup
    return () => {
      if (menuElement) {
        enableBodyScroll(menuElement);
      }
    };
  }, [isOpen]);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key press to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-label="Open main menu"
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        >
          <div 
            ref={menuRef}
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-menu"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link 
                  href={`/${locale}`}
                  className="text-xl font-bold text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  Aero Prosthetics
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="p-4" aria-label="Mobile navigation">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === `/${locale}` ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={pathname === `/${locale}` ? 'page' : undefined}
                  >
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/about`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('about') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={isActive('about') ? 'page' : undefined}
                  >
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/services`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('services') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={isActive('services') ? 'page' : undefined}
                  >
                    {t('services')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/locations`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('locations') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={isActive('locations') ? 'page' : undefined}
                  >
                    {t('locations')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/resources`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('resources') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={isActive('resources') ? 'page' : undefined}
                  >
                    {t('resources')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/contact`} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
                    aria-current={isActive('contact') ? 'page' : undefined}
                  >
                    {t('contact')}
                  </Link>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link 
                  href={`/${locale}/contact`}
                  className="w-full btn btn-primary justify-center"
                >
                  {cta('contactUs')}
                </Link>
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
