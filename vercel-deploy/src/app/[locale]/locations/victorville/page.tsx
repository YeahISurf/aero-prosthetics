import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/ui/SchemaScript';
import { 
  generateLocalBusinessSchema, 
  victorvilleLocationData 
} from '@/lib/seo/schema';
import ClientMapsWrapper from '@/components/maps/ClientMapsWrapper';

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locations' });

  return constructMetadata({
    title: `${t('victorville.title')} - ${t('title')}`,
    description: t('victorville.description'),
    keywords: ['Victorville', 'prosthetics', 'orthotics', 'clinic', 'Southern California', 'accessibility'],
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

  // Location data for maps
  const locationData = {
    name: t('victorville.title'),
    position: { lat: victorvilleLocationData.geo.latitude, lng: victorvilleLocationData.geo.longitude },
    address: victorvilleLocationData.address.streetAddress,
    city: `${victorvilleLocationData.address.addressLocality}, ${victorvilleLocationData.address.addressRegion} ${victorvilleLocationData.address.postalCode}`,
    phone: victorvilleLocationData.telephone,
    phoneFormatted: t('victorville.phone'),
    badge: 'Regional Center'
  };

  return (
    <>
      <SchemaScript schema={victorvilleSchema} />
      
      {/* Hero Section - Premium Style */}
      <section className="relative bg-gradient-to-br from-secondary-teal-600 via-secondary-teal-500 to-secondary-teal-400 text-white overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-tr from-secondary-teal-700/30 via-primary-500/10 to-primary-500/20 mix-blend-overlay"
          aria-hidden="true"
        ></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-4">
                Regional Center
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('victorville.title')}</h1>
              <p className="text-xl leading-relaxed mb-8 text-white/90">{t('victorville.overview')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/${locale}/contact`} 
                  className="btn bg-white text-secondary-teal-600 hover:bg-secondary-teal-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3"
                >
                  {t('cta.schedule')}
                </Link>
                <a 
                  href={`https://maps.google.com/?q=${victorvilleLocationData.address.streetAddress}, ${victorvilleLocationData.address.addressLocality}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-secondary-teal-200 hover:text-secondary-teal-100 px-6 py-3"
                >
                  Get Directions
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
              <ClientMapsWrapper 
                locations={[locationData]}
                zoom={15}
                height="100%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 relative overflow-hidden bg-gray-50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 z-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">About Our Victorville Location</h2>
                <div className="h-1 w-20 bg-secondary-teal-500 mb-8"></div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t('victorville.description')}</p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-teal-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Convenient Location</h3>
                    <p className="text-gray-600">
                      Centrally located to serve patients throughout the High Desert region.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-teal-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dedicated Staff</h3>
                    <p className="text-gray-600">
                      Experienced specialists committed to providing personalized care and support.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-teal-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Insurance Options</h3>
                    <p className="text-gray-600">
                      We work with most major insurance providers and offer flexible payment options.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-teal-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Complete Services</h3>
                    <p className="text-gray-600">
                      Full range of prosthetic and orthotic services for patients of all ages.
                    </p>
                  </div>
                </div>
                
                {/* Facility images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/images/locations/victorville-exterior.jpg"
                      alt={t('victorville.exterior')}
                      width={600}
                      height={400}
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/images/locations/victorville-interior.jpg"
                      alt={t('victorville.interior1')}
                      width={600}
                      height={400}
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                </div>
                
                {/* Rest of the content about this location */}
                {/* ... existing location-specific content ... */}
              </div>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-24">
                {/* Location Map - Larger and more detailed */}
                <div className="bg-gradient-to-br from-teal-50 to-white p-1 rounded-xl shadow-lg mb-8">
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <ClientMapsWrapper 
                      locations={[locationData]}
                      zoom={15}
                      height="400px"
                    />
                  </div>
                </div>
                
                {/* Detailed contact information */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8">
                  <div className="bg-teal-50 p-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-teal-700">Contact Information</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-teal-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mr-4 mt-1">
                          <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                          <address className="not-italic font-medium">
                            {victorvilleLocationData.address.streetAddress}<br />
                            {victorvilleLocationData.address.addressLocality}, {victorvilleLocationData.address.addressRegion} {victorvilleLocationData.address.postalCode}
                          </address>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-teal-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mr-4 mt-1">
                          <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                          <a href={`tel:${victorvilleLocationData.telephone}`} className="font-medium hover:text-teal-600">
                            {t('victorville.phone')}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-teal-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mr-4 mt-1">
                          <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Hours</h4>
                          <ul className="space-y-1">
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-600">Monday - Thursday</span>
                              <span className="font-medium">9:00 AM - 5:00 PM</span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-600">Friday</span>
                              <span className="font-medium">9:00 AM - 5:00 PM</span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-600">Saturday - Sunday</span>
                              <span className="font-medium">Closed</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a 
                        href={`https://maps.google.com/?q=${victorvilleLocationData.address.streetAddress}, ${victorvilleLocationData.address.addressLocality}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-secondary-teal-500 text-white hover:bg-secondary-teal-600 text-center"
                      >
                        Get Directions
                      </a>
                      <Link 
                        href={`/${locale}/contact`}
                        className="btn border border-secondary-teal-500 text-secondary-teal-600 hover:bg-teal-50 text-center"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* CTA Card */}
                <div className="p-6 bg-secondary-teal-600 text-white rounded-xl shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Ready to Schedule?</h3>
                  <p className="text-teal-100 mb-6">
                    Schedule your appointment today and take the first step towards improved mobility and comfort.
                  </p>
                  <Link 
                    href={`/${locale}/contact`} 
                    className="btn bg-white text-secondary-teal-600 hover:bg-teal-50 w-full justify-center"
                  >
                    {t('cta.schedule')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}