import { getRequestConfig } from 'next-intl/server';
 
// Updated to use the new requestLocale approach recommended for Next.js 15
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is already a Promise, so we just need to await it, not call it
  const locale = await requestLocale;
  
  // Load the requested locale messages
  const messages = (await import(`../../../locales/${locale}.json`)).default;
  
  // If the locale is not the default (en), also load the default locale messages as fallback
  let fallbackMessages: Record<string, any> = {};
  if (locale !== 'en') {
    // We're loading the fallback messages for explicit fallbacks
    fallbackMessages = (await import(`../../../locales/en.json`)).default;
  }
  
  return {
    locale,
    messages,
    // Add onError handler to fallback to English for missing translations
    onError: (error) => {
      if (error.code === 'MISSING_MESSAGE') {
        console.warn(`Missing translation for key: ${error.message} in locale: ${locale}`);
        // Try to find the key in fallback messages if it contains a message that might be a dot-notation path
        const errorMessage = error.message || '';
        const match = errorMessage.match(/`([^`]+)`/);
        if (match && match[1]) {
          try {
            const keyPath = match[1];
            const parts = keyPath.split('.');
            let fallback: any = fallbackMessages;
            for (const part of parts) {
              fallback = fallback?.[part];
              if (fallback === undefined) break;
            }
            
            if (typeof fallback === 'string') {
              return fallback;
            }
          } catch (e) {
            // If fallback resolution fails, return empty string
          }
        }
        return ''; // Return empty string for missing translations
      }
      throw error;
    },
    // Set fallback locale to English
    fallbacks: locale !== 'en' ? {
      '*': 'en' // For all namespaces, fall back to English
    } : undefined
  };
});
