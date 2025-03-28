import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/forms/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';
import Link from 'next/link';
import FaqAccordion from '@/components/sections/FaqAccordion';

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

  // Prepare FAQ items for the FaqAccordion component
  const faqItems = [1, 2, 3, 4].map((i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`)
  }));

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-20 md:py-28"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 z-0">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up [animation-delay:200ms]">
                {t('title')}
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in-up [animation-delay:400ms]">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:600ms]">
                <a 
                  href="#contact-form"
                  className="group inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-700"
                >
                  {t('cta.primary')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </a>
                <a 
                  href="#locations" 
                  className="group inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300 bg-blue-800/40 backdrop-blur-sm text-white border border-white/20 hover:bg-blue-800/60 hover:border-white/30 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-blue-700"
                >
                  {t('cta.secondary')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/30 to-transparent z-10"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <Image
                  src="/images/Resolute Advance of the Determined Spirit.jpeg"
                  alt={t('hero.image.alt')}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover relative z-0"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40 z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info Section */}
      <section id="contact-form" className="section bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('form.heading')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('form.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">{contactInfoT('title')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email</p>
                      <p className="text-base font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        <a href={`mailto:${contactInfoT('email')}`}>
                          {contactInfoT('email')}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                      <p className="text-base font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        <a href={`tel:${contactInfoT('phone')}`}>
                          {contactInfoT('phone')}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{contactInfoT('hours.title')}</p>
                      <p className="text-base text-gray-700">{contactInfoT('hours.weekdays')}</p>
                      <p className="text-base text-gray-700">{contactInfoT('hours.weekend')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">{insuranceT('title')}</h3>
                <p className="text-gray-700 mb-6">{insuranceT('description')}</p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-base font-medium text-gray-900 mb-3">{insuranceT('accepted')}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">Medicare</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">Medicaid</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">Blue Cross</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">Aetna</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">Cigna</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">UnitedHealth</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 italic">{insuranceT('more')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('faq.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('faq.subtitle')}</p>
          </div>

          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Map Section */}
      <section id="locations" className="section bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('locations.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('locations.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">Anaheim Hills Office</h3>
                <p className="text-gray-600 mt-1">Primary Location</p>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address</p>
                    <p className="text-base text-gray-700">5775 E Santa Ana Canyon Rd, Suite 100</p>
                    <p className="text-base text-gray-700">Anaheim Hills, CA 92807</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-base text-gray-700">(714) 555-1234</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">Victorville Office</h3>
                <p className="text-gray-600 mt-1">Satellite Location</p>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address</p>
                    <p className="text-base text-gray-700">12563 Hesperia Rd, Suite B</p>
                    <p className="text-base text-gray-700">Victorville, CA 92395</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-blue-50 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-base text-gray-700">(760) 555-5678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md h-[400px] flex items-center justify-center border border-gray-100 relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center px-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="text-xl font-medium text-gray-800 mb-2">Interactive Map Coming Soon</p>
              <p className="text-gray-600 max-w-md mx-auto">We're working on an interactive map to help you navigate to our locations more easily. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section aria-labelledby="cta-heading" className="mt-20 text-center">
        <h2 id="cta-heading" className="text-3xl font-bold text-gray-900 mb-4">{t('cta.title')}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('cta.description').replace("'", "&apos;")}
        </p>
        <Link href={`/${locale}/book-demo`} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition">
          {t('cta.button')}
        </Link>
      </section>
    </>
  );
}
