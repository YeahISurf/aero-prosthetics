"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle keyboard accessibility
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-primary-500 rounded-md py-1 px-2 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Language selection"
      >
        <Globe size={18} />
        <span>{locale === 'en' ? 'English' : 'Español'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                locale === 'en' ? 'bg-gray-100 text-primary-500 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
              role="menuitem"
              tabIndex={0}
            >
              <span className="mr-2 inline-block w-5 h-5 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                🇺🇸
              </span>
              English
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                locale === 'es' ? 'bg-gray-100 text-primary-500 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
              role="menuitem"
              tabIndex={0}
            >
              <span className="mr-2 inline-block w-5 h-5 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                🇪🇸
              </span>
              Español
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
