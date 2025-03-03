import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  return {
    locale, // Explicitly return the locale
    messages: (await import(`../../../locales/${locale}.json`)).default
  };
});
