import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { useLocale } from 'next-intl';
import ClientImage from '@/components/ui/ClientImage';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'NotFound' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function NotFound() {
  const t = useTranslations('NotFound');
  const locale = useLocale();
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
        <div className="relative h-40 w-40 mx-auto mb-6">
          <ClientImage 
            src="/images/not-found.svg" 
            alt="Page not found illustration"
            width={160}
            height={160}
            className="object-contain opacity-90"
            fallbackStyles={{ width: '160px', height: '160px' }}
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
          {t('heading')}
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
          {t('message')}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link 
            href={`/${locale}`}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg text-lg font-medium w-full md:w-auto flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {t('homeButton')}
          </Link>
          
          <Link 
            href={`/${locale}/contact`}
            className="px-6 py-3 bg-white text-primary-600 border border-primary-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('contactButton')}
          </Link>
        </div>
      </div>
    </div>
  );
} 