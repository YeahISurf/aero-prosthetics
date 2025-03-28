"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { generateStableId } from '@/lib/useStableId';

// Create a stable, deterministic ID that will be the same on client and server
// Use the pathname as a consistent input to generate a stable ID
const MOBILE_NAV_ID = 'mobile-nav';

interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen }) => {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <span 
        className={cn(
          "block h-[3px] w-full bg-current rounded-full transition-transform duration-300",
          isOpen ? "rotate-45 translate-y-[9px]" : ""
        )}
      />
      <span 
        className={cn(
          "block h-[3px] w-full bg-current rounded-full transition-opacity duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span 
        className={cn(
          "block h-[3px] w-full bg-current rounded-full transition-transform duration-300",
          isOpen ? "-rotate-45 -translate-y-[9px]" : ""
        )}
      />
    </div>
  );
};

export default function MobileNavigation() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  
  // Call hooks unconditionally
  const locale = useLocale();
  const pathname = usePathname();
  
  // Call hooks unconditionally
  const nav = useTranslations('navigation');
  
  // Mount effect to ensure client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate a stable ID based on the component name and the current path
  const stableId = generateStableId(`${MOBILE_NAV_ID}-${pathname}`, MOBILE_NAV_ID);

  // Close menu on navigation
  useEffect(() => {
    if (!mounted) return;
    setOpen(false);
  }, [pathname, mounted]);

  // Handle any clicks outside the sheet content to close the menu
  useEffect(() => {
    if (!mounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        sheetContentRef.current &&
        !sheetContentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, mounted]);

  // Don't render during SSR to prevent hydration mismatches
  if (!mounted) return null;

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}/${path}`);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} id={stableId}>
      <SheetTrigger asChild>
        <button 
          className="p-2 md:hidden flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <HamburgerIcon isOpen={open} />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="pt-12 md:w-[300px] w-[80vw] z-50 bg-white text-gray-900 shadow-xl" 
        ref={sheetContentRef}
        style={{
          backgroundColor: "white",
          color: "#1a202c"
        }}
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        
        <div className="flex flex-col space-y-4 mt-4">
          <Link
            href={`/${locale}/`}
            className={`text-lg font-medium py-2 ${pathname === `/${locale}` ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={pathname === `/${locale}` ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('home')}
          </Link>
          
          <Link
            href={`/${locale}/about`}
            className={`text-lg font-medium py-2 ${isActive('about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('about') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('about')}
          </Link>
          
          <Link
            href={`/${locale}/solutions`}
            className={`text-lg font-medium py-2 ${isActive('solutions') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('solutions') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('solutions')}
          </Link>
          
          <Link
            href={`/${locale}/training`}
            className={`text-lg font-medium py-2 ${isActive('training') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('training') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('training')}
          </Link>
          
          <Link
            href={`/${locale}/locations`}
            className={`text-lg font-medium py-2 ${isActive('locations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('locations') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('locations')}
          </Link>
          
          <Link
            href={`/${locale}/blog`}
            className={`text-lg font-medium py-2 ${isActive('blog') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('blog') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('blog')}
          </Link>
          
          <Link
            href={`/${locale}/contact`}
            className={`text-lg font-medium py-2 ${isActive('contact') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors duration-200`}
            aria-current={isActive('contact') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {nav('contact')}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
} 