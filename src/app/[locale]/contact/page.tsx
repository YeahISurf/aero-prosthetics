import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/forms/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['contact', 'prosthetics', 'orthotics', 'appointment', 'consultation'],
  });
}

export default function ContactPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <div className="bg-gray-50">
      <div className="container-custom py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{useTranslations('contact')('title')}</h1>
          <p className="text-xl text-gray-700">{useTranslations('contact')('description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">{useTranslations('contact.info')('title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-500"
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
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-700">{useTranslations('contact.info')('email')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-500"
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
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-700">{useTranslations('contact.info')('phone')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">{useTranslations('contact.insurance')('title')}</h3>
              <p className="text-gray-700 mb-4">{useTranslations('contact.insurance')('description')}</p>
              <p className="text-sm font-medium text-gray-900">{useTranslations('contact.insurance')('accepted')}</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Medicare</li>
                <li>Medicaid</li>
                <li>Blue Cross Blue Shield</li>
                <li>Aetna</li>
                <li>Cigna</li>
                <li>UnitedHealthcare</li>
                <li>And many more...</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
