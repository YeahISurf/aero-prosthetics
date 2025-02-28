"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-sm text-gray-700 hover:text-primary-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
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
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => changeLanguage('en')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                locale === 'en' ? 'bg-gray-100 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
              }`}
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                locale === 'es' ? 'bg-gray-100 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
              }`}
              role="menuitem"
            >
              Español
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
