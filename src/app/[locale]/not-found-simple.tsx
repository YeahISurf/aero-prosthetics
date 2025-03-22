'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function NotFoundSimple() {
  const t = useTranslations('NotFound');
  const locale = useLocale();
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="relative h-48 w-48 mx-auto md:mx-0 md:flex-shrink-0">
            <Image 
              src="/images/not-found.svg" 
              alt="Page not found illustration"
              width={200}
              height={200}
              className="object-contain drop-shadow-lg"
            />
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
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg text-lg font-medium flex items-center justify-center gap-2"
              >
                {t('homeButton')}
              </Link>
              
              <Link 
                href={`/${locale}/contact`}
                className="px-6 py-4 bg-white text-primary-600 border border-primary-200 rounded-lg hover:bg-gray-50 transition-all hover:border-primary-300 flex items-center justify-center gap-2"
              >
                {t('contactButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 