import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';

// Updated Props type to be compatible with Next.js 15
type Params = { locale: string };

type Props = {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['prosthetics', 'orthotics', 'services', 'limb prosthetics', 'bracing solutions'],
  });
}

// Mock data for services - in a real implementation, this would come from the CMS
const services = [
  {
    id: 'lower-limb-prosthetics',
    title: 'Lower Limb Prosthetics',
    description: 'Custom-designed prosthetic solutions for below-knee, above-knee, and partial foot amputations',
    icon: '🦿',
    longDescription: 'Our lower limb prosthetic solutions are custom-designed to meet the unique needs of each patient. We offer a range of options for below-knee, above-knee, and partial foot amputations, utilizing the latest technology and materials to ensure optimal fit, function, and comfort.',
  },
  {
    id: 'upper-limb-prosthetics',
    title: 'Upper Limb Prosthetics',
    description: 'Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations',
    icon: '💪',
    longDescription: 'We provide advanced upper limb prosthetic solutions for hand, wrist, elbow, and shoulder amputations. Our team works closely with each patient to determine the most appropriate prosthetic option based on their specific needs, lifestyle, and goals.',
  },
  {
    id: 'pediatric-prosthetics',
    title: 'Pediatric Prosthetics',
    description: 'Specialized prosthetic solutions designed for children\'s unique needs and growth',
    icon: '👶',
    longDescription: 'Our pediatric prosthetic solutions are specifically designed to address the unique needs of children, taking into account their growth and development. We work closely with pediatric patients and their families to create prosthetic devices that support their active lifestyles and developmental milestones.',
  },
  {
    id: 'orthotics',
    title: 'Orthotics',
    description: 'Custom bracing solutions for spine, lower limb, and upper limb conditions',
    icon: '🦵',
    longDescription: 'We offer custom orthotic solutions for a wide range of conditions affecting the spine, lower limbs, and upper limbs. Our orthotic devices are designed to provide support, improve function, and alleviate pain, helping patients achieve greater mobility and independence.',
  },
  {
    id: 'compression-garments',
    title: 'Compression Garments',
    description: 'Medical-grade compression solutions for various conditions',
    icon: '🧦',
    longDescription: 'Our medical-grade compression garments are designed to address a variety of conditions, including lymphedema, venous insufficiency, and post-surgical recovery. We offer custom-fitted garments that provide the appropriate level of compression for each patient\'s specific needs.',
  },
  {
    id: 'mastectomy-products',
    title: 'Mastectomy Products',
    description: 'Specialized breast forms and post-mastectomy products',
    icon: '👚',
    longDescription: 'We provide a range of specialized breast forms and post-mastectomy products designed to help patients feel comfortable and confident after breast surgery. Our team offers compassionate, personalized fittings and guidance to help patients select the most appropriate products for their needs.',
  },
  {
    id: 'cranial-helmets',
    title: 'Cranial Helmets',
    description: 'Custom-designed helmets for treating plagiocephaly in infants',
    icon: '👶',
    longDescription: 'Our custom-designed cranial helmets are used to treat plagiocephaly (flat head syndrome) in infants. These helmets are precisely fitted to guide the natural growth of the baby\'s skull, helping to correct the shape over time.',
  },
  {
    id: 'custom-bracing',
    title: 'Custom Bracing',
    description: 'Personalized bracing solutions for scoliosis, cervical conditions, and knee injuries',
    icon: '🦴',
    longDescription: 'We offer personalized bracing solutions for a variety of conditions, including scoliosis, cervical conditions, and knee injuries. Our custom braces are designed to provide optimal support and function, helping patients manage their conditions and improve their quality of life.',
  },
];

export default function ServicesPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const t = useTranslations('services');
  const ctaT = useTranslations('cta');
  const learnMoreText = ctaT('learnMore');
  const contactUsText = ctaT('contactUs');

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <Link 
                    href={`/services/${service.id}`}
                    className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                  >
                    {learnMoreText}
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
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('process.title')}</h2>
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative">
              {/* Process Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.0.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.0.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.1.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.1.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.2.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.2.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      4
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.3.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.3.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      5
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.4.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.4.description')}</p>
                    </div>
                  </div>
                </div>
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
              Ready to Experience the Aero Prosthetics Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to schedule a consultation and learn how our personalized prosthetic solutions can enhance your mobility and quality of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {contactUsText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
