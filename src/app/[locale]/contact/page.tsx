import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/forms/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['contact', 'prosthetics', 'orthotics', 'appointment', 'consultation'],
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'contact' });
  const contactInfoT = await getTranslations({ locale, namespace: 'contact.info' });
  const insuranceT = await getTranslations({ locale, namespace: 'contact.insurance' });

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
              <p className="text-xl text-gray-700 mb-8">{t('description')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact-form" className="btn-primary">
                  {t('cta.primary')}
                </a>
                <a href="#locations" className="btn-secondary">
                  {t('cta.secondary')}
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/Resolute Advance of the Determined Spirit.jpeg"
                  alt={t('hero.image.alt')}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Us Section */}
      <section className="section bg-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-xl text-gray-700 mb-8">We're here to answer your questions and provide personalized assistance</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary-50 hover:bg-primary-100 transition-colors p-6 rounded-xl shadow-sm">
                    <div className="mb-4 text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Send a Message</h3>
                    <p className="text-gray-700 mb-4">Complete our form to get in touch with our specialists</p>
                    <Link 
                      href="#contact-form" 
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Contact form
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                  
                  <div className="bg-primary-50 hover:bg-primary-100 transition-colors p-6 rounded-xl shadow-sm">
                    <div className="mb-4 text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Our Locations</h3>
                    <p className="text-gray-700 mb-4">Visit one of our clinics for in-person support</p>
                    <Link 
                      href="#locations" 
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View locations
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/images/Resolute Advance of the Determined Spirit.jpeg"
                  alt="Advanced prosthetic hand technology"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">Advanced prosthetic technology</h3>
                    <p className="text-white/90 text-sm">Enhancing lives through innovative solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section id="contact-form" className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('form.heading')}</h2>
            <p className="section-subtitle">{t('form.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">{contactInfoT('title')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-primary-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">Email</p>
                      <p className="text-base text-primary-600">{contactInfoT('email')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-primary-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">Phone</p>
                      <p className="text-base text-primary-600">{contactInfoT('phone')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-primary-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">{contactInfoT('hours.title')}</p>
                      <p className="text-base text-gray-700">{contactInfoT('hours.weekdays')}</p>
                      <p className="text-base text-gray-700">{contactInfoT('hours.weekend')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">{insuranceT('title')}</h3>
                <p className="text-gray-700 mb-6">{insuranceT('description')}</p>
                <p className="text-base font-medium text-gray-900 mb-3">{insuranceT('accepted')}</p>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Medicare</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Medicaid</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Blue Cross</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Aetna</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Cigna</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">UnitedHealth</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">{insuranceT('more')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(`faq.items.${i}.question`)}
                  </h3>
                  <p className="text-gray-700">
                    {t(`faq.items.${i}.answer`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="locations" className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('locations.title')}</h2>
            <p className="section-subtitle">{t('locations.subtitle')}</p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md h-[400px] flex items-center justify-center">
            <p className="text-gray-500 text-lg">Interactive map will be implemented here</p>
          </div>
        </div>
      </section>
    </>
  );
}
