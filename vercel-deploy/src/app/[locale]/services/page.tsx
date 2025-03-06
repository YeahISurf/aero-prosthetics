import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
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
    iconType: 'lower',
    longDescription: 'Our lower limb prosthetic solutions are custom-designed to meet the unique needs of each patient. We offer a range of options for below-knee, above-knee, and partial foot amputations, utilizing the latest technology and materials to ensure optimal fit, function, and comfort.',
  },
  {
    id: 'upper-limb-prosthetics',
    title: 'Upper Limb Prosthetics',
    description: 'Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations',
    iconType: 'upper',
    longDescription: 'We provide advanced upper limb prosthetic solutions for hand, wrist, elbow, and shoulder amputations. Our team works closely with each patient to determine the most appropriate prosthetic option based on their specific needs, lifestyle, and goals.',
  },
  {
    id: 'pediatric-prosthetics',
    title: 'Pediatric Prosthetics',
    description: 'Specialized prosthetic solutions designed for children\'s unique needs and growth',
    iconType: 'pediatric',
    longDescription: 'Our pediatric prosthetic solutions are specifically designed to address the unique needs of children, taking into account their growth and development. We work closely with pediatric patients and their families to create prosthetic devices that support their active lifestyles and developmental milestones.',
  },
  {
    id: 'orthotics',
    title: 'Orthotics',
    description: 'Custom bracing solutions for spine, lower limb, and upper limb conditions',
    iconType: 'orthotics',
    longDescription: 'We offer custom orthotic solutions for a wide range of conditions affecting the spine, lower limbs, and upper limbs. Our orthotic devices are designed to provide support, improve function, and alleviate pain, helping patients achieve greater mobility and independence.',
  },
  {
    id: 'compression-garments',
    title: 'Compression Garments',
    description: 'Medical-grade compression solutions for various conditions',
    iconType: 'compression',
    longDescription: 'Our medical-grade compression garments are designed to address a variety of conditions, including lymphedema, venous insufficiency, and post-surgical recovery. We offer custom-fitted garments that provide the appropriate level of compression for each patient\'s specific needs.',
  },
  {
    id: 'mastectomy-products',
    title: 'Mastectomy Products',
    description: 'Specialized breast forms and post-mastectomy products',
    iconType: 'mastectomy',
    longDescription: 'We provide a range of specialized breast forms and post-mastectomy products designed to help patients feel comfortable and confident after breast surgery. Our team offers compassionate, personalized fittings and guidance to help patients select the most appropriate products for their needs.',
  },
  {
    id: 'cranial-helmets',
    title: 'Cranial Helmets',
    description: 'Custom-designed helmets for treating plagiocephaly in infants',
    iconType: 'cranial',
    longDescription: 'Our custom-designed cranial helmets are used to treat plagiocephaly (flat head syndrome) in infants. These helmets are precisely fitted to guide the natural growth of the baby\'s skull, helping to correct the shape over time.',
  },
  {
    id: 'custom-bracing',
    title: 'Custom Bracing',
    description: 'Personalized bracing solutions for scoliosis, cervical conditions, and knee injuries',
    iconType: 'bracing',
    longDescription: 'We offer personalized bracing solutions for a variety of conditions, including scoliosis, cervical conditions, and knee injuries. Our custom braces are designed to provide optimal support and function, helping patients manage their conditions and improve their quality of life.',
  },
];

// Map to render the appropriate icon based on service type
const getServiceIcon = (iconType: string) => {
  switch (iconType) {
    case 'lower':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'upper':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
    case 'pediatric':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'orthotics':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      );
    case 'compression':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'mastectomy':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'cranial':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'bracing':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      );
  }
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'services' });
  const ctaT = await getTranslations({ locale, namespace: 'cta' });
  const learnMoreText = ctaT('learnMore');
  const contactUsText = ctaT('contactUs');

  return (
    <>
      {/* Hero Section with premium styling matching homepage */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden py-16 md:py-24 lg:py-28">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-15">
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
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-4 animate-slideInRight">
              {t('badge') || 'Expert Prosthetic & Orthotic Solutions'}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-slideInUp text-white">{t('title')}</h1>
            <p className="text-xl leading-relaxed text-white/90 animate-slideInUp">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Services Grid with improved styling */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 id="services-title" className="section-title text-primary-600">{t('servicesTitle') || 'Our Comprehensive Services'}</h2>
          <p className="section-subtitle mb-12">{t('servicesSubtitle') || 'Discover our full range of prosthetic and orthotic solutions designed to improve mobility, comfort, and quality of life.'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {services.map((service) => (
              <Link 
                key={service.id}
                href={`/${locale}/services/${service.id}`}
                className="group flex flex-col h-full bg-white hover:bg-gray-50 rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    {getServiceIcon(service.iconType)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                </div>
                <div className="px-6 pb-6 mt-auto">
                  <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors">
                    {learnMoreText}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with improved styling */}
      <section className="section bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
            role="presentation"
          ></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="section-title text-primary-600">{t('process.title')}</h2>
          <p className="section-subtitle mb-12">{t('processSubtitle') || 'Our comprehensive approach ensures you receive personalized care at every step of your journey.'}</p>
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative">
              {/* Process Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      1
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full transform transition-all hover:shadow-lg hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.0.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.0.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      2
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full transform transition-all hover:shadow-lg hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.1.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.1.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      3
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full transform transition-all hover:shadow-lg hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.2.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.2.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      4
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full transform transition-all hover:shadow-lg hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('process.steps.3.title')}</h3>
                      <p className="text-gray-700">{t('process.steps.3.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      5
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-md p-6 w-full transform transition-all hover:shadow-lg hover:-translate-y-1">
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

      {/* Enhanced Technology Section - New Addition */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src="/uploads/hero/why-carbon-fiber-is-the-preferred-material-for-prosthetic-devices-large.jpg"
                    alt="Advanced prosthetic technology"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{t('technologyTitle') || 'Cutting-Edge Technology'}</h2>
              <p className="text-lg text-gray-700">{t('technologyDescription') || 'At Aero Prosthetics, we leverage the latest technological advancements to provide superior prosthetic and orthotic solutions. Our commitment to innovation means our patients benefit from devices that are more comfortable, functional, and aesthetically pleasing.'}</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">{t('techPoint1') || 'Computer-aided design and manufacturing for precision fit'}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">{t('techPoint2') || 'Advanced materials that are lightweight and durable'}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">{t('techPoint3') || 'Microprocessor-controlled components for responsive movement'}</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href={`/${locale}/about`} className="btn btn-primary bg-primary-500 hover:bg-primary-600 text-white">
                  {t('learnMoreAboutTech') || 'Learn About Our Technology'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with premium styling */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white overflow-hidden py-16 md:py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
            role="presentation"
          ></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"
          aria-hidden="true"
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn text-white">
              {ctaT('section.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 animate-fadeIn">
              {ctaT('section.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link 
                href={`/${locale}/contact`} 
                className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105"
              >
                {contactUsText}
              </Link>
              <Link 
                href={`/${locale}/locations`} 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100"
              >
                {t('findLocation') || 'Find a Location'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
