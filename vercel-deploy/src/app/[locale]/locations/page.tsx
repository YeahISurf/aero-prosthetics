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

// Cache-busting update: This file was modified with sync test on March 6, 2023
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
      
      {/* Hero Section - Updated to match homepage style */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        <div className="absolute inset-0 z-0 opacity-15">
          {/* Enhanced background pattern */}
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
            role="presentation"
          ></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"
          aria-hidden="true"
        ></div>
        
        {/* Modern dual-tone gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"
          aria-hidden="true"
        ></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-4">
              {t('sectionBadge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">{t('title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white">{t('subtitle')}</p>
            <Link 
              href={`/${locale}/contact`} 
              className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3"
            >
              {t('cta.schedule')}
            </Link>
          </div>
        </div>
      </section>

      {/* Location Overview Section - Enhanced with modern card design */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('overview.title')}</h2>
            <p className="text-xl text-gray-700">{t('overview.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Enhanced Location Cards */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div className="h-72 relative">
                <Image
                  src="/images/locations/anaheim-location.jpg"
                  alt={t('anaheim.title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <span className="inline-block bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                    Flagship Location
                  </span>
                  <h3 className="text-2xl font-bold text-white">{t('anaheim.title')}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6">{t('anaheim.overview')}</p>
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{t('anaheim.address')}, {t('anaheim.city')}</p>
                  </div>
                </div>
                <Link 
                  href="#anaheim" 
                  className="btn-primary w-full justify-center"
                  aria-label={`Learn more about ${t('anaheim.title')} location`}
                >
                  {`${t('learnMore')} about ${t('anaheim.title')}`}
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div className="h-72 relative">
                <Image
                  src="/images/locations/victorville-location.jpg"
                  alt={t('victorville.title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <span className="inline-block bg-secondary-teal-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                    Regional Center
                  </span>
                  <h3 className="text-2xl font-bold text-white">{t('victorville.title')}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6">{t('victorville.overview')}</p>
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{t('victorville.address')}, {t('victorville.city')}</p>
                  </div>
                </div>
                <Link 
                  href="#victorville" 
                  className="btn-primary w-full justify-center"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anaheim Location - Enhanced with modern section design */}
      <section id="anaheim" className="py-20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 z-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-primary-50 to-white p-1 rounded-xl shadow-lg mb-8">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src="/images/locations/anaheim-location.jpg"
                      alt={t('anaheim.title')}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-primary-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Insurance</h4>
                    <p className="text-gray-600 text-sm">
                      Major insurance plans accepted
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-primary-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Phone</h4>
                    <p className="text-gray-600 text-sm">
                      {t('anaheim.phone')}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 bg-primary-600 text-white rounded-xl shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Ready to Visit?</h3>
                  <p className="text-primary-100 mb-6">
                    Schedule your appointment today and take the first step towards improved mobility and comfort.
                  </p>
                  <Link 
                    href={`/${locale}/contact`} 
                    className="btn bg-white text-primary-600 hover:bg-primary-50 w-full justify-center"
                  >
                    {t('cta.schedule')}
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('anaheim.title')}</h2>
                <div className="h-1 w-20 bg-primary-500 mb-8"></div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t('anaheim.description')}</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="bg-primary-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('anaheim.services.prosthetics')}</p>
                  </div>
                  <div>
                    <div className="bg-primary-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('anaheim.services.orthotics')}</p>
                  </div>
                  <div>
                    <div className="bg-primary-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('anaheim.services.fittings')}</p>
                  </div>
                  <div>
                    <div className="bg-primary-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('anaheim.services.pediatric')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/anaheim-exterior.jpg" 
                        alt={t('anaheim.imageAlt.exterior')}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/anaheim-interior-1.jpg" 
                        alt={t('anaheim.imageAlt.interior1')}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/anaheim-interior-2.jpg" 
                        alt={t('anaheim.imageAlt.interior2')}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-4 mt-1">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Location & Contact</h3>
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
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-primary-100 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {t('hoursLabel')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Monday:</span>
                      <span>{t('anaheim.hours.0.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Tuesday:</span>
                      <span>{t('anaheim.hours.1.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Wednesday:</span>
                      <span>{t('anaheim.hours.2.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Thursday:</span>
                      <span>{t('anaheim.hours.3.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Friday:</span>
                      <span>{t('anaheim.hours.4.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Saturday:</span>
                      <span>{t('anaheim.hours.5.hours')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>{t('anaheim.hours.6.hours')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-primary-100 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    {t('facilities')}
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
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
                  </ul>
                </div>
              </div>
              
              <div className="bg-primary-50 p-8 rounded-xl shadow-md border border-primary-100 mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Insurance Information</h3>
                </div>
                <p className="text-gray-700 mb-4">We work with a variety of insurance providers to ensure you receive the coverage you need.</p>
                <p className="text-gray-700">Contact our office for specific information about your insurance plan and coverage options.</p>
              </div>
              
              <div className="flex justify-center">
                <Link 
                  href={`/${locale}/contact?location=anaheim`}
                  className="btn-primary px-8 py-3 text-lg"
                >
                  {t('cta.appointment')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Victorville Location - Enhanced with modern section design */}
      <section id="victorville" className="py-20 relative overflow-hidden bg-gray-50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 z-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('victorville.title')}</h2>
                <div className="h-1 w-20 bg-secondary-teal-500 mb-8"></div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t('victorville.description')}</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
                <div className="flex items-start">
                  <div className="bg-secondary-teal-100 rounded-full p-2 mr-4 mt-1">
                    <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Location & Contact</h3>
                    <p className="text-lg font-medium text-gray-800 mb-1">{t('victorville.address')}</p>
                    <p className="text-lg text-gray-700 mb-1">{t('victorville.city')}</p>
                    <p className="text-lg text-gray-700 mb-4">{t('victorville.phone')}</p>
                    <a 
                      href="https://maps.google.com/?q=15095+Amargosa+Road,+Victorville,+CA+92394" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn bg-secondary-teal-500 text-white hover:bg-secondary-teal-600 inline-flex items-center"
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
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-secondary-teal-100 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {t('hoursLabel')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Monday:</span>
                      <span>{t('victorville.hours.0.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Tuesday:</span>
                      <span>{t('victorville.hours.1.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Wednesday:</span>
                      <span>{t('victorville.hours.2.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Thursday:</span>
                      <span>{t('victorville.hours.3.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Friday:</span>
                      <span>{t('victorville.hours.4.hours')}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Saturday:</span>
                      <span>{t('victorville.hours.5.hours')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>{t('victorville.hours.6.hours')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-secondary-teal-100 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    {t('facilities')}
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
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
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="bg-secondary-teal-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('victorville.services.prosthetics')}</p>
                  </div>
                  <div>
                    <div className="bg-secondary-teal-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('victorville.services.orthotics')}</p>
                  </div>
                  <div>
                    <div className="bg-secondary-teal-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('victorville.services.fittings')}</p>
                  </div>
                  <div>
                    <div className="bg-secondary-teal-50 h-24 rounded-lg flex items-center justify-center mb-3">
                      <svg className="h-10 w-10 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{t('victorville.services.evaluation')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/victorville-exterior.jpg" 
                        alt={t('victorville.imageAlt.exterior')}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/victorville-interior-1.jpg" 
                        alt={t('victorville.imageAlt.interior1')}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/locations/victorville-interior-2.jpg" 
                        alt={t('victorville.imageAlt.interior2')}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary-teal-50 p-8 rounded-xl shadow-md border border-secondary-teal-100 mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary-teal-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Insurance Information</h3>
                </div>
                <p className="text-gray-700 mb-4">We work with a variety of insurance providers to ensure you receive the coverage you need.</p>
                <p className="text-gray-700">Contact our office for specific information about your insurance plan and coverage options.</p>
              </div>
              
              <div className="flex justify-center">
                <Link 
                  href={`/${locale}/contact?location=victorville`}
                  className="btn bg-secondary-teal-500 text-white hover:bg-secondary-teal-600 px-8 py-3 text-lg"
                >
                  {t('cta.appointment')}
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-secondary-teal-50 to-white p-1 rounded-xl shadow-lg mb-8">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src="/images/locations/victorville-location.jpg"
                      alt={t('victorville.title')}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-secondary-teal-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Insurance</h4>
                    <p className="text-gray-600 text-sm">
                      Major insurance plans accepted
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-secondary-teal-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Phone</h4>
                    <p className="text-gray-600 text-sm">
                      {t('victorville.phone')}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 bg-secondary-teal-500 text-white rounded-xl shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Ready to Visit?</h3>
                  <p className="text-secondary-teal-100 mb-6">
                    Schedule your appointment today and take the first step towards improved mobility and comfort.
                  </p>
                  <Link 
                    href={`/${locale}/contact`} 
                    className="btn bg-white text-secondary-teal-600 hover:bg-secondary-teal-50 w-full justify-center"
                  >
                    {t('cta.schedule')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section - Enhanced with modern design */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('map.title') || 'Find Us'}</h2>
            <p className="text-xl text-gray-700">{t('map.description') || 'Find our locations conveniently situated to serve patients throughout Orange County and the High Desert regions.'}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="aspect-[16/9] w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13233.380646840284!2d-117.7887105!3d33.8578871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4b8c427b9ae94ce7!2sAERO%20Prosthetics%20%26%20Orthotics!5e0!3m2!1sen!2sus!4v1647288822430!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                title={t('map.title') || 'Location Map'}
                aria-label="Map showing our locations in Anaheim Hills and Victorville"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced with modern gradient design */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-teal-500 text-white py-16 md:py-20">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/pattern.svg')] bg-repeat" aria-hidden="true"></div>
        
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]" aria-hidden="true"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('cta.title') || 'Ready to Take the Next Step?'}</h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white">{t('cta.description') || 'Schedule a consultation today and discover how our expert team can help you achieve improved mobility and confidence.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${locale}/contact`}
                className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3"
              >
                {t('cta.schedule')}
              </Link>
              <Link 
                href={`tel:${t('primaryPhone')}`}
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100 px-8 py-3"
              >
                {t('cta.call')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
