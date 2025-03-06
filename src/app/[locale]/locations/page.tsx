import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/ui/SchemaScript';
import { 
  generateLocalBusinessSchema, 
  anaheimLocationData, 
  victorvilleLocationData 
} from '@/lib/seo/schema';

// Cache-busting update: This file was modified on March 6, 2025
// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locations' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['locations', 'clinics', 'Anaheim Hills', 'Victorville', 'prosthetics', 'orthotics', 'specialized care', 'accessibility'],
  });
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'locations' });

  // Generate location schemas
  const anaheimSchema = generateLocalBusinessSchema(anaheimLocationData);
  const victorvilleSchema = generateLocalBusinessSchema(victorvilleLocationData);

  return (
    <>
      <SchemaScript schema={anaheimSchema} />
      <SchemaScript schema={victorvilleSchema} />
      
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">{t('description')}</p>
            <Link 
              href={`/${locale}/contact`} 
              className="btn-primary text-lg px-8 py-3"
            >
              {t('cta.schedule')}
            </Link>
          </div>
        </div>
      </section>

      {/* Location Overview Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('overview.title')}</h2>
          <p className="section-subtitle">{t('overview.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* Location Cards */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-64 relative">
                <Image
                  src="/images/locations/anaheim-location.jpg"
                  alt={t('anaheim.title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t('anaheim.title')}</h3>
                <p className="text-gray-700 mb-6">{t('anaheim.overview')}</p>
                <Link 
                  href="#anaheim" 
                  className="btn-primary"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-64 relative">
                <Image
                  src="/images/locations/victorville-location.jpg"
                  alt={t('victorville.title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t('victorville.title')}</h3>
                <p className="text-gray-700 mb-6">{t('victorville.overview')}</p>
                <Link 
                  href="#victorville" 
                  className="btn-primary"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anaheim Location */}
      <section id="anaheim" className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6">{t('anaheim.title')}</h2>
                <p className="text-lg text-gray-700 mb-6">{t('anaheim.description')}</p>
              </div>
              
              <address className="not-italic mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-gray-800 mb-1">{t('anaheim.address')}</p>
                <p className="text-lg text-gray-700 mb-1">{t('anaheim.city')}</p>
                <p className="text-lg text-gray-700 mb-4">{t('anaheim.phone')}</p>
                <a 
                  href="https://maps.google.com/?q=1001+N+Weir+Canyon+Road,+Anaheim+Hills,+CA+92807" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  {t('directions')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
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
              </address>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-semibold mb-4">{t('anaheim.hours.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday:</span>
                    <span>{t('anaheim.hours.monday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday:</span>
                    <span>{t('anaheim.hours.tuesday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday:</span>
                    <span>{t('anaheim.hours.wednesday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Thursday:</span>
                    <span>{t('anaheim.hours.thursday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday:</span>
                    <span>{t('anaheim.hours.friday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>{t('anaheim.hours.saturday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>{t('anaheim.hours.sunday')}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('facilities')}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.facilities.accessible')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.facilities.parking')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.facilities.modern')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.facilities.wifi')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.facilities.childFriendly')}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="rounded-lg overflow-hidden shadow-lg h-80 relative">
                <Image 
                  src="/images/locations/anaheim-exterior.jpg" 
                  alt={t('anaheim.imageAlt.exterior')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md h-48 relative">
                  <Image 
                    src="/images/locations/anaheim-interior-1.jpg" 
                    alt={t('anaheim.imageAlt.interior1')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-48 relative">
                  <Image 
                    src="/images/locations/anaheim-interior-2.jpg" 
                    alt={t('anaheim.imageAlt.interior2')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('services.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.services.prosthetics')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.services.orthotics')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.services.fittings')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('anaheim.services.pediatric')}</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href={`/${locale}/contact?location=anaheim`}
                className="btn-primary w-full justify-center py-3 text-lg"
              >
                {t('cta.appointment')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Victorville Location */}
      <section id="victorville" className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="rounded-lg overflow-hidden shadow-lg h-80 relative">
                <Image 
                  src="/images/locations/victorville-exterior.jpg" 
                  alt={t('victorville.imageAlt.exterior')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md h-48 relative">
                  <Image 
                    src="/images/locations/victorville-interior-1.jpg" 
                    alt={t('victorville.imageAlt.interior1')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-48 relative">
                  <Image 
                    src="/images/locations/victorville-interior-2.jpg" 
                    alt={t('victorville.imageAlt.interior2')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('services.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.services.prosthetics')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.services.orthotics')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.services.fittings')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.services.evaluation')}</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href={`/${locale}/contact?location=victorville`}
                className="btn-primary w-full justify-center py-3 text-lg"
              >
                {t('cta.appointment')}
              </Link>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6">{t('victorville.title')}</h2>
                <p className="text-lg text-gray-700 mb-6">{t('victorville.description')}</p>
              </div>
              
              <address className="not-italic mb-8 bg-white p-6 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-gray-800 mb-1">{t('victorville.address')}</p>
                <p className="text-lg text-gray-700 mb-1">{t('victorville.city')}</p>
                <p className="text-lg text-gray-700 mb-4">{t('victorville.phone')}</p>
                <a 
                  href="https://maps.google.com/?q=15095+Amargosa+Road+Suite+105,+Victorville,+CA+92394" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  {t('directions')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
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
              </address>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-semibold mb-4">{t('victorville.hours.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday:</span>
                    <span>{t('victorville.hours.monday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday:</span>
                    <span>{t('victorville.hours.tuesday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday:</span>
                    <span>{t('victorville.hours.wednesday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Thursday:</span>
                    <span>{t('victorville.hours.thursday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday:</span>
                    <span>{t('victorville.hours.friday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>{t('victorville.hours.saturday')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>{t('victorville.hours.sunday')}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('facilities')}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.facilities.accessible')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.facilities.parking')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.facilities.modern')}</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('victorville.facilities.wifi')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('map.title')}</h2>
          <p className="section-subtitle">{t('map.description')}</p>
          
          <div className="rounded-lg overflow-hidden shadow-lg mt-12 h-96 relative">
            {/* Replace with actual map component or iframe */}
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500 text-center p-4">
                {t('map.placeholder')}
                <br />
                <a 
                  href="https://maps.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline mt-2 inline-block"
                >
                  {t('map.viewOnGoogle')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl leading-relaxed mb-10">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href={`/${locale}/contact`} 
                className="btn-accent text-lg px-8 py-3"
              >
                {t('cta.schedule')}
              </Link>
              <Link 
                href={`/${locale}/services`} 
                className="btn-secondary text-lg px-8 py-3 bg-white"
              >
                {t('cta.services')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
