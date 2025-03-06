import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/forms/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['contact', 'prosthetics', 'orthotics', 'appointment', 'consultation'],
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = params;
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
                  src="/prosthetic-hand.jpg"
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

      {/* Contact Form and Info Section */}
      <section id="contact-form" className="section bg-white">
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
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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
      <section id="locations" className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('locations.title')}</h2>
            <p className="section-subtitle">{t('locations.subtitle')}</p>
          </div>

          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md h-[400px] flex items-center justify-center">
            <p className="text-gray-500 text-lg">Interactive map will be implemented here</p>
          </div>
        </div>
      </section>
    </>
  );
}
