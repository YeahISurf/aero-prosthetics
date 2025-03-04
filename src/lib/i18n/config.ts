import { getRequestConfig } from 'next-intl/server';
 
// Updated to use the new requestLocale approach recommended for Next.js 15
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is already a Promise, so we just need to await it, not call it
  const locale = await requestLocale;
  return {
    locale,
    messages: (await import(`../../../locales/${locale}.json`)).default
  };
});
