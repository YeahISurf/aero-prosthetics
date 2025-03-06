"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation');
  const ctaT = useTranslations('cta');
  const requestInfoText = ctaT('requestInfo');
  const pathname = usePathname();
  const locale = useLocale();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Handle keyboard accessibility
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-gray-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-md transition-colors"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed top-[70px] left-0 right-0 bottom-0 bg-white shadow-md z-50 overflow-auto"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container-custom py-6 flex flex-col space-y-5" aria-label="Mobile Navigation">
              <Link
                href={`/${locale}`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  pathname === `/${locale}` ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={pathname === `/${locale}` ? 'page' : undefined}
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}/about`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('about') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('about') ? 'page' : undefined}
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}/services`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('services') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('services') ? 'page' : undefined}
              >
                {t('services')}
              </Link>
              <Link
                href={`/${locale}/team`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('team') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('team') ? 'page' : undefined}
              >
                {t('team')}
              </Link>
              <Link
                href={`/${locale}/locations`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('locations') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('locations') ? 'page' : undefined}
              >
                {t('locations')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('contact') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('contact') ? 'page' : undefined}
              >
                {t('contact')}
              </Link>
              <Link
                href={`/${locale}/resources`}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors p-2 rounded-md ${
                  isActive('resources') ? 'text-primary-500 bg-primary-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isActive('resources') ? 'page' : undefined}
              >
                {t('resources')}
              </Link>
              <hr className="border-gray-200 my-2" />
              
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center justify-center bg-gray-100 rounded-md p-3">
                  <span className="text-sm text-gray-700 mr-3">Toggle Theme</span>
                  <ThemeToggle />
                </div>
              </div>
              
              <Link 
                href={`/${locale}/contact`} 
                onClick={closeMenu} 
                className="btn-primary w-full text-center py-3"
                aria-label={requestInfoText}
              >
                {requestInfoText}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
