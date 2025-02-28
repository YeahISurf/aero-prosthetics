import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LocationsSection() {
  const t = useTranslations('home.locations');

  return (
    <section className="section">
      <div className="container-custom">
        <h2 className="section-title">{t('title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Anaheim Location */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 relative">
              {/* This would be replaced with an actual Google Map */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Google Map for Anaheim Hills Location
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('anaheim.title')}</h3>
              <address className="not-italic mb-4">
                <p className="text-gray-700">{t('anaheim.address')}</p>
                <p className="text-gray-700">{t('anaheim.city')}</p>
                <p className="text-gray-700">{t('anaheim.phone')}</p>
              </address>
              <a 
                href="https://maps.google.com/?q=1001+N+Weir+Canyon+Road,+Anaheim+Hills,+CA+92807" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
              >
                {t('directions')}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Victorville Location */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 relative">
              {/* This would be replaced with an actual Google Map */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Google Map for Victorville Location
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('victorville.title')}</h3>
              <address className="not-italic mb-4">
                <p className="text-gray-700">{t('victorville.address')}</p>
                <p className="text-gray-700">{t('victorville.city')}</p>
                <p className="text-gray-700">{t('victorville.phone')}</p>
              </address>
              <a 
                href="https://maps.google.com/?q=17189+Yuma+Street,+Victorville,+CA+92395" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
              >
                {t('directions')}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/locations" className="btn-primary">
            {useTranslations('navigation')('locations')}
          </Link>
        </div>
      </div>
    </section>
  );
}
