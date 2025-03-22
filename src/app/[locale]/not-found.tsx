'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import ClientImage from '@/components/ui/ClientImage';
import { motion } from 'framer-motion';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const locale = useLocale();
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="relative h-48 w-48 mx-auto md:mx-0 md:flex-shrink-0">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {ClientImage && (
                <ClientImage 
                  src="/images/not-found.svg" 
                  alt="Page not found illustration"
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-lg"
                  fallbackStyles={{ width: '200px', height: '200px' }}
                />
              )}
            </motion.div>
          </div>
          
          <div className="text-left md:flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
              {t('heading')}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6 max-w-lg">
              {t('message')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${locale}`}
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg text-lg font-medium flex items-center justify-center gap-2 hover:translate-y-[-2px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                {t('homeButton')}
              </Link>
              
              <Link 
                href={`/${locale}/contact`}
                className="px-6 py-4 bg-white text-primary-600 border border-primary-200 rounded-lg hover:bg-gray-50 transition-all hover:border-primary-300 flex items-center justify-center gap-2 hover:translate-y-[-2px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {t('contactButton')}
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">{t('helpfulLinks')}:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link href={`/${locale}/products`} className="text-primary-500 hover:text-primary-700 transition-colors hover:underline flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('productsLink')}
                </Link>
                <Link href={`/${locale}/about`} className="text-primary-500 hover:text-primary-700 transition-colors hover:underline flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('aboutLink')}
                </Link>
                <Link href={`/${locale}/resources`} className="text-primary-500 hover:text-primary-700 transition-colors hover:underline flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('resourcesLink')}
                </Link>
                <Link href={`/${locale}/faq`} className="text-primary-500 hover:text-primary-700 transition-colors hover:underline flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('faqLink')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 