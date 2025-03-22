"use client";

import { ReactNode, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

// Patch for common translation errors - expanded with more common keys
const commonTranslations: Record<string, Record<string, string>> = {
  en: {
    'navigation.locations': 'Locations',
    'navigation.home': 'Home',
    'navigation.about': 'About Us',
    'navigation.solutions': 'Solutions',
    'navigation.training': 'Training',
    'navigation.contact': 'Contact',
    'navigation.blog': 'Blog',
    'cta.book_demo': 'Book Demo',
    'home.hero.title': 'Advanced Prosthetic Solutions',
    'home.hero.subtitle': 'Improving mobility and quality of life with personalized care',
    'home.hero.badge': 'Trusted Provider',
    'home.hero.cta': 'Explore Solutions',
    'home.hero.imageAlt': 'Advanced carbon fiber prosthetic',
    'footer.copyright': '© All rights reserved',
    'error.generic': 'Something went wrong',
    'meta.title': 'Aero Prosthetics',
    'meta.description': 'Advanced prosthetic solutions with personalized care'
  },
  es: {
    'navigation.locations': 'Ubicaciones',
    'navigation.home': 'Inicio',
    'navigation.about': 'Sobre Nosotros',
    'navigation.solutions': 'Soluciones',
    'navigation.training': 'Entrenamiento',
    'navigation.contact': 'Contacto',
    'navigation.blog': 'Blog',
    'cta.book_demo': 'Reservar Demo',
    'home.hero.title': 'Soluciones Protésicas Avanzadas',
    'home.hero.subtitle': 'Mejorando la movilidad y calidad de vida con atención personalizada',
    'home.hero.badge': 'Proveedor de Confianza',
    'home.hero.cta': 'Explorar Soluciones',
    'home.hero.imageAlt': 'Prótesis avanzada de fibra de carbono',
    'footer.copyright': '© Todos los derechos reservados',
    'error.generic': 'Algo salió mal',
    'meta.title': 'Aero Prótesis',
    'meta.description': 'Soluciones protésicas avanzadas con atención personalizada'
  }
};

// Tracking missing translations for logging
let missingTranslations: Set<string> = new Set();

interface TranslationErrorHandlerProps {
  children: ReactNode;
}

export default function TranslationErrorHandler({ children }: TranslationErrorHandlerProps) {
  const locale = useLocale();
  
  const translations = useMemo(() => {
    return commonTranslations[locale as keyof typeof commonTranslations] || commonTranslations.en;
  }, [locale]);
  
  useEffect(() => {
    // Patch the console.error to intercept translation errors
    const originalConsoleError = console.error;
    
    console.error = function(message, ...args) {
      // Check if this is a missing translation error
      if (typeof message === 'string' && message.includes('MISSING_MESSAGE')) {
        const missingKeyMatch = message.match(/`([^`]+)`/);
        if (missingKeyMatch && missingKeyMatch[1]) {
          const key = missingKeyMatch[1];
          
          // If we have a patch for this translation, don't log the error
          if (translations[key]) {
            // Skip logging this error
            return;
          }
          
          // Track missing translations for debugging without spamming console
          if (!missingTranslations.has(key)) {
            missingTranslations.add(key);
            // Log once with a cleaner message
            originalConsoleError.apply(console, [`[Translation Missing] Key: "${key}" for locale: "${locale}"`]);
          }
          return;
        }
      }
      
      // Otherwise, pass through to the original console.error
      originalConsoleError.apply(console, [message, ...args]);
    };
    
    // Restore original on unmount
    return () => {
      console.error = originalConsoleError;
    };
  }, [translations, locale]);
  
  // Add a global function to handle missing translations
  useEffect(() => {
    // Add type declaration to extend Window interface
    interface ExtendedWindow extends Window {
      __translationPatches?: Record<string, string>;
      __getTranslation?: (key: string) => string;
    }
    
    // Use the extended window type
    const extendedWindow = window as ExtendedWindow;
    
    // Add the translations to window for client-side patching
    extendedWindow.__translationPatches = translations;
    
    // Add a helper function to get patched translations
    extendedWindow.__getTranslation = function(key: string) {
      return extendedWindow.__translationPatches?.[key] || key.split('.').pop() || key;
    };
    
    // Patch the global error handler for React rendering errors
    const originalErrorHandler = window.onerror;
    
    window.onerror = function(message, source, lineno, colno, error) {
      // Check if this is a missing translation error
      if (typeof message === 'string' && message.includes('MISSING_MESSAGE')) {
        // Suppress the error
        return true;
      }
      
      // Pass through to the original handler
      if (originalErrorHandler) {
        return originalErrorHandler.apply(window, [message, source, lineno, colno, error]);
      }
      
      return false;
    };
    
    return () => {
      window.onerror = originalErrorHandler;
      delete extendedWindow.__translationPatches;
      delete extendedWindow.__getTranslation;
    };
  }, [translations]);
  
  return <>{children}</>;
} 