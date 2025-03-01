import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/ui/SchemaScript';
import { 
  generateLocalBusinessSchema, 
  anaheimLocationData, 
  victorvilleLocationData 
} from '@/lib/seo/schema';

// Updated Props type to be compatible with Next.js 15
type Params = { locale: string };

type Props = {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'locations' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['locations', 'clinics', 'Anaheim Hills', 'Victorville', 'prosthetics', 'orthotics'],
  });
}

export default function LocationsPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const t = useTranslations('locations');

  // Generate location schemas
  const anaheimSchema = generateLocalBusinessSchema(anaheimLocationData);
  const victorvilleSchema = generateLocalBusinessSchema(victorvilleLocationData);

  return (
    <>
      <SchemaScript schema={anaheimSchema} />
      <SchemaScript schema={victorvilleSchema} />
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Anaheim Location */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('anaheim.title')}</h2>
              <address className="not-italic mb-6">
                <p className="text-lg text-gray-700">{t('anaheim.address')}</p>
                <p className="text-lg text-gray-700">{t('anaheim.city')}</p>
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
              </address>
              
              <h3 className="text-xl font-semibold mb-4">{t('anaheim.hours.title')}</h3>
              <ul className="space-y-2 text-gray-700 mb-8">
                <li>{t('anaheim.hours.monday')}</li>
                <li>{t('anaheim.hours.tuesday')}</li>
                <li>{t('anaheim.hours.wednesday')}</li>
                <li>{t('anaheim.hours.thursday')}</li>
                <li>{t('anaheim.hours.friday')}</li>
                <li>{t('anaheim.hours.saturday')}</li>
                <li>{t('anaheim.hours.sunday')}</li>
              </ul>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Facilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">State-of-the-art prosthetic fitting lab</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">3D scanning and printing capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Comfortable patient consultation rooms</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Accessible entrance and facilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Ample parking</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-6">
                {/* Placeholder for Google Map */}
                <div className="text-gray-500">Google Map for Anaheim Hills Location</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-gray-500">Clinic Photo 1</div>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-gray-500">Clinic Photo 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Victorville Location */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-6">
                {/* Placeholder for Google Map */}
                <div className="text-gray-500">Google Map for Victorville Location</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-gray-500">Clinic Photo 1</div>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-gray-500">Clinic Photo 2</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">{t('victorville.title')}</h2>
              <address className="not-italic mb-6">
                <p className="text-lg text-gray-700">{t('victorville.address')}</p>
                <p className="text-lg text-gray-700">{t('victorville.city')}</p>
                <p className="text-lg text-gray-700 mb-4">{t('victorville.phone')}</p>
                <a 
                  href="https://maps.google.com/?q=17189+Yuma+Street,+Victorville,+CA+92395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
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
              </address>
              
              <h3 className="text-xl font-semibold mb-4">{t('victorville.hours.title')}</h3>
              <ul className="space-y-2 text-gray-700 mb-8">
                <li>{t('victorville.hours.monday')}</li>
                <li>{t('victorville.hours.tuesday')}</li>
                <li>{t('victorville.hours.wednesday')}</li>
                <li>{t('victorville.hours.thursday')}</li>
                <li>{t('victorville.hours.friday')}</li>
                <li>{t('victorville.hours.saturday')}</li>
                <li>{t('victorville.hours.sunday')}</li>
              </ul>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Facilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Modern prosthetic and orthotic lab</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Digital measurement and fitting technology</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Private consultation rooms</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Wheelchair accessible facilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">Convenient parking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Schedule a Visit?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to schedule a consultation at either of our convenient locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {useTranslations('cta')('contactUs')}
              </Link>
              <Link href="/services" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                {useTranslations('cta')('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
