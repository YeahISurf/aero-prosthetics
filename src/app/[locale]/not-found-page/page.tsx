import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NotFoundSimple from '../not-found-simple';

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'NotFound' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function NotFoundTestPage({ params }: Props) {
  try {
    // Get the locale from Promise
    const { locale } = await params;
    // Enable static rendering
    unstable_setRequestLocale(locale);
    
    // This page directly renders the simplified NotFound component
    return <NotFoundSimple />;
  } catch (error) {
    console.error('Error in NotFoundTestPage:', error);
    // Fallback static 404 page in case of errors
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Return to Homepage
        </a>
      </div>
    );
  }
} 