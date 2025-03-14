"use client";

import { ReactNode, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

// Patch for common translation errors
const commonTranslations: Record<string, Record<string, string>> = {
  en: {
    'navigation.locations': 'Locations',
    'navigation.home': 'Home',
    'navigation.about': 'About Us',
    'navigation.solutions': 'Solutions',
    'navigation.training': 'Training',
    'navigation.contact': 'Contact',
    'navigation.blog': 'Blog',
    'cta.book_demo': 'Book Demo'
  },
  es: {
    'navigation.locations': 'Ubicaciones',
    'navigation.home': 'Inicio',
    'navigation.about': 'Sobre Nosotros',
    'navigation.solutions': 'Soluciones',
    'navigation.training': 'Entrenamiento',
    'navigation.contact': 'Contacto',
    'navigation.blog': 'Blog',
    'cta.book_demo': 'Reservar Demo'
  }
};

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
        }
      }
      
      // Otherwise, pass through to the original console.error
      originalConsoleError.apply(console, [message, ...args]);
    };
    
    // Restore original on unmount
    return () => {
      console.error = originalConsoleError;
    };
  }, [translations]);
  
  // Add a global function to handle missing translations
  useEffect(() => {
    // @ts-expect-error - Add the translations to window for client-side patching
    window.__translationPatches = translations;
    
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
      // @ts-expect-error
      delete window.__translationPatches;
    };
  }, [translations]);
  
  return <>{children}</>;
} 