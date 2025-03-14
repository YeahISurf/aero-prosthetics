import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/ui/SchemaScript';
import { 
  generateLocalBusinessSchema, 
  victorvilleLocationData 
} from '@/lib/seo/schema';

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locations' });

  return constructMetadata({
    title: t('victorville.title'),
    description: t('victorville.description'),
    keywords: ['Victorville', 'prosthetics', 'orthotics', 'specialized care', 'High Desert', 'accessibility'],
  });
}

export default async function VictorvilleLocationPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'locations' });

  // Generate location schema
  const victorvilleSchema = generateLocalBusinessSchema(victorvilleLocationData);

  return (
    <>
      <SchemaScript schema={victorvilleSchema} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-teal-500 via-secondary-teal-400 to-secondary-teal-300 text-white overflow-hidden">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-teal-100 via-secondary-teal-200 to-secondary-teal-100"></div>
        
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
          className="absolute inset-0 bg-gradient-to-tr from-secondary-teal-600/30 via-primary-500/10 to-primary-500/20 mix-blend-overlay"
          aria-hidden="true"
        ></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-4">
              {t('victorville.title')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">{t('victorville.title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white">{t('victorville.description')}</p>
            <Link 
              href={`/${locale}/contact`} 
              className="btn bg-white text-secondary-teal-600 hover:bg-secondary-teal-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3"
            >
              {t('cta.schedule')}
            </Link>
          </div>
        </div>
      </section>

      {/* Location Details Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column - Image Gallery */}
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
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                    <Image
                      src="/images/locations/victorville-exterior.jpg"
                      alt={t('victorville.imageAlt.exterior')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                    <Image
                      src="/images/locations/victorville-interior-1.jpg"
                      alt={t('victorville.imageAlt.interior1')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
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
            
            {/* Right Column - Location Details */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-6">{t('victorville.title')}</h2>
                  
                  {/* Address Info */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-secondary-teal-100 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      {t('address')}
                    </h3>
                    <div className="pl-10">
                      <p className="text-lg mb-1">{t('victorville.address')}</p>
                      <p className="text-lg mb-6">{t('victorville.city')}</p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href="https://maps.google.com/?q=17189+Yuma+Street,+Victorville,+CA+92395" 
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
                        <Link 
                          href={`/${locale}/contact`}
                          className="btn-secondary inline-flex items-center"
                        >
                          {t('cta.appointment')}
                          <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-secondary-teal-100 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      {t('contact')}
                    </h3>
                    <div className="pl-10">
                      <p className="text-lg mb-1">
                        <a 
                          href={`tel:${t('victorville.phone')}`}
                          className="text-secondary-teal-600 hover:text-secondary-teal-700"
                        >
                          {t('victorville.phone')}
                        </a>
                      </p>
                      <p className="text-lg mb-6">
                        <a 
                          href="mailto:info@aeroprosthetics.com"
                          className="text-secondary-teal-600 hover:text-secondary-teal-700"
                        >
                          info@aeroprosthetics.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-secondary-teal-100 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      {t('hoursLabel')}
                    </h3>
                    <div className="pl-10">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Facility Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('facilities')}</h2>
            <p className="text-xl text-gray-700">{t('victorville.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-secondary-teal-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('victorville.facilities.accessible')}</h3>
              <p className="text-gray-600">Our facility is fully accessible for patients with mobility needs.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-secondary-teal-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('victorville.facilities.parking')}</h3>
              <p className="text-gray-600">Ample parking available for all patients.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-secondary-teal-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('victorville.facilities.modern')}</h3>
              <p className="text-gray-600">Modern equipment and facilities for optimal care.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-secondary-teal-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-secondary-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('victorville.facilities.wifi')}</h3>
              <p className="text-gray-600">Complimentary WiFi available throughout our facility.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Offered Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('services.title')}</h2>
            <p className="text-xl text-gray-700">Our Victorville location offers comprehensive prosthetic and orthotic services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
              <div className="relative h-48">
                <Image
                  src="/images/services/upper-limb-prosthetics.jpg"
                  alt="Upper Limb Prosthetics"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-bold text-white">{t('victorville.services.prosthetics')}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 flex-1">Advanced upper limb prosthetic solutions tailored to each patient's unique needs and lifestyle.</p>
                <Link
                  href={`/${locale}/services`}
                  className="text-secondary-teal-600 font-medium inline-flex items-center"
                >
                  {t('learnMore')}
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
              <div className="relative h-48">
                <Image
                  src="/images/services/orthotic-solutions.jpg"
                  alt="Orthotic Solutions"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-bold text-white">{t('victorville.services.orthotics')}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 flex-1">Comprehensive orthotic solutions for improved mobility, stability, and pain management.</p>
                <Link
                  href={`/${locale}/services`}
                  className="text-secondary-teal-600 font-medium inline-flex items-center"
                >
                  {t('learnMore')}
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Placeholder Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('map.title')}</h2>
            <p className="text-xl text-gray-700">{t('map.description')}</p>
          </div>
          
          <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="aspect-[16/9] w-full flex items-center justify-center p-8 text-center">
              <div>
                <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-xl text-gray-500 mb-4">{t('map.placeholder')}</p>
                <p className="text-gray-500 max-w-md mx-auto">Google Maps integration will be added here. Our location is at 17189 Yuma Street, Victorville, CA 92395.</p>
                <a 
                  href="https://maps.google.com/?q=17189+Yuma+Street,+Victorville,+CA+92395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-secondary-teal-500 text-white hover:bg-secondary-teal-600 mt-6 inline-flex items-center"
                >
                  {t('map.viewOnGoogle')}
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-teal-500 via-secondary-teal-400 to-secondary-teal-300 relative text-white">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
          ></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">{t('cta.description')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="btn bg-white text-secondary-teal-600 hover:bg-secondary-teal-50 border border-white/80 shadow-xl"
              >
                {t('cta.schedule')}
              </Link>
              <a
                href={`tel:${t('victorville.phone')}`}
                className="btn bg-secondary-teal-600 text-white hover:bg-secondary-teal-700 border border-secondary-teal-500/50 shadow-xl"
              >
                {t('cta.call')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}