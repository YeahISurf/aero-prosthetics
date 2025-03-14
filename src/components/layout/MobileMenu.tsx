"use client";

import { useState, useEffect, useRef, forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { cn } from '@/lib/utils';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);
  
  // Only access these hooks after component is mounted
  const pathname = usePathname();
  const locale = useLocale();
  
  // Use safe translations
  let t;
  let cta;
  
  try {
    t = useTranslations('navigation');
  } catch (error) {
    // Fallback translations
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        home: 'Home',
        about: 'About Us',
        solutions: 'Solutions', 
        blog: 'Blog',
        training: 'Training',
        locations: 'Locations',
        contact: 'Contact'
      };
      return fallbacks[key] || key;
    };
  }
  
  try {
    cta = useTranslations('cta');
  } catch (error) {
    // Fallback translations
    cta = (key: string) => {
      const fallbacks: Record<string, string> = {
        book_demo: 'Book Demo'
      };
      return fallbacks[key] || key;
    };
  }

  // Handle mounting (client-side only)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle body scroll locking when menu is open
  useEffect(() => {
    if (!isMounted) return;
    
    const menuElement = menuRef.current;
    
    if (!menuElement) return;
    
    if (isOpen) {
      // Disable body scroll with options for iOS compatibility
      disableBodyScroll(menuElement, {
        reserveScrollBarGap: true,
        allowTouchMove: (el) => {
          // Allow scroll on the menu itself
          return menuElement.contains(el) || el === menuElement;
        },
      });
      
      // Move focus to the close button when menu opens
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
    } else {
      // Re-enable scrolling when menu closes
      enableBodyScroll(menuElement);
      
      // Return focus to trigger button when menu closes
      if (triggerButtonRef.current) {
        triggerButtonRef.current.focus();
      }
    }
    
    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      if (menuElement) {
        enableBodyScroll(menuElement);
      }
    };
  }, [isOpen, isMounted]);

  // Handle keyboard accessibility (trap focus within menu when open)
  useEffect(() => {
    if (!isMounted || !isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on ESC key
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      
      // Only handle tab key
      if (e.key !== 'Tab') return;
      
      // Handle focus trapping
      const menu = menuRef.current;
      if (!menu) return;
      
      // If shift+tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current?.focus();
      }
      
      // If tab on last element, move to first element
      if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMounted]);

  // Don't render anything during SSR to prevent hydration issues
  if (!isMounted) return null;

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BurgerButton
        ref={triggerButtonRef}
        isOpen={isOpen}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open main menu"}
        aria-controls="mobile-menu"
        className="text-gray-700 hover:text-primary-600"
      />

      {isMounted && createPortal(
        <div 
          className={`fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={!isOpen}
          onClick={() => setIsOpen(false)}
        >
          <div 
            ref={menuRef}
            className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal={isOpen}
            aria-label="Mobile navigation menu"
            aria-labelledby="mobile-menu-title"
            id="mobile-menu"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
                <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 mt-2">
                <ul className="space-y-1">
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname === `/${locale}` ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('home')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/about`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/about`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('about')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/solutions`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/solutions`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('solutions')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/blog`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/blog`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('blog')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/training`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/training`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('training')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/locations`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/locations`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('locations')}
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-100">
                    <Link
                      href={`/${locale}/contact`}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        pathname.startsWith(`/${locale}/contact`) ? 'text-primary-600 font-medium' : 'text-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('contact')}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              <div className="mt-auto pt-4 border-t border-gray-100">
                <Link
                  href={`/${locale}/book-demo`}
                  className="block w-full py-3 px-4 rounded-md text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {cta('book_demo')}
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Create a Burger Button component with ref forwarding
interface BurgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerButton = forwardRef<HTMLButtonElement, BurgerButtonProps>(
  ({ onClick, isOpen, className, ...props }, ref) => {
    const handleInteraction = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick();
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    };
    
    return (
      <button
        ref={ref}
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        className={cn("p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500", className)}
        {...props}
      >
        <div className="w-6 h-4 flex flex-col justify-between">
          <span 
            className={`block h-0.5 bg-current rounded-full transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span 
            className={`block h-0.5 bg-current rounded-full transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block h-0.5 bg-current rounded-full transition-transform duration-300 ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </div>
      </button>
    );
  }
);

BurgerButton.displayName = 'BurgerButton';
