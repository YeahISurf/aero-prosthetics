import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ANIMATION_DELAYS } from '@/lib/utils';

// SVG icons for each service
const serviceIcons = [
  // Lower Limb Prosthetics
  <svg key="lower-limb" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>,
  // Upper Limb Prosthetics
  <svg key="upper-limb" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
  </svg>,
  // Pediatric Prosthetics
  <svg key="pediatric" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Orthotics
  <svg key="orthotics" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>,
  // Compression Garments
  <svg key="compression" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Mastectomy Products
  <svg key="mastectomy" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
];

export default function ServicesOverview() {
  const t = useTranslations('home.services');
  const ctaT = useTranslations('cta');
  const locale = useLocale();
  const learnMoreText = ctaT('learnMore');
  const serviceItems = t.raw('serviceItems') as Array<{
    id: string;
    title: string;
    description: string;
    details: string;
    certification: string;
    technology: string;
    successRate: string;
  }>;
  const techShowcase = t.raw('technologyShowcase') as {
    title: string;
    description: string;
    features: string[];
  };

  return (
    <section className="section relative py-24">
      {/* Light clean background with subtle accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/25 to-white z-0"></div>
      <div className="absolute left-0 top-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
      <div className="absolute right-0 bottom-1/4 w-1/3 h-px bg-gradient-to-l from-transparent via-primary-200 to-transparent"></div>
      
      {/* Refined subtle accents */}
      <div className="absolute right-8 top-20 w-16 h-16 rounded-full bg-primary-100/20 z-0"></div>
      <div className="absolute left-16 bottom-40 w-24 h-24 rounded-full bg-primary-100/15 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_XS}s`, animationFillMode: 'both' }}>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full mb-4 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_TITLE}s`, animationFillMode: 'both' }}>{t('sectionBadge')}</span>
          <h2 className="section-title text-gray-900 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_SUBTITLE}s`, animationFillMode: 'both' }}>{t('title')}</h2>
          <p className="section-subtitle text-gray-700 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>{t('description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {(serviceItems || []).slice(0, Math.min(serviceItems?.length || 0, 6)).map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-gradient-to-b from-white via-primary-50/15 to-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-lg relative border border-primary-50 animate-fadeIn"
              style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.ITEM_BASE, ANIMATION_DELAYS.STAGGER_XS)}s`, animationFillMode: 'both' }}
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-100/30 to-transparent z-0"></div>
              
              <div className="p-6 relative z-10">
                {/* Icon with premium styling */}
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100/70 text-primary-600 rounded-xl mb-6 shadow-sm border border-primary-100/50 group-hover:bg-primary-300 group-hover:text-primary-700 transition-colors duration-300">
                  {service.id && serviceIcons.length > index ? serviceIcons[index] : serviceIcons[0]}
                </div>
                
                {/* Title with badge */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <span className="ml-2 px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full whitespace-nowrap">
                    {service.certification}
                  </span>
                </div>
                
                {/* Description and details */}
                <p className="text-gray-700 mb-4">{service.description}</p>
                <p className="text-gray-600 text-sm mb-6 italic">{service.details}</p>
                
                {/* Key technology and success rate */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <p className="text-xs text-primary-600 uppercase font-medium">Technology</p>
                    <p className="text-sm font-medium text-primary-800">{service.technology}</p>
                  </div>
                  <div className="bg-secondary-green-500/10 rounded-lg p-3">
                    <p className="text-xs text-secondary-green-500 uppercase font-medium">Success Rate</p>
                    <p className="text-sm font-medium text-secondary-green-500">{service.successRate}</p>
                  </div>
                </div>
                
                {/* Learn more link with descriptive text */}
                <Link
                  href={`/${locale}/services/${service.id}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group-hover:underline"
                  aria-label={`Learn more about ${service.title}`}
                >
                  {`${learnMoreText} about ${service.title}`}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
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
        
        {/* Technology showcase - clean, light premium style */}
        <div className="mt-24 bg-primary-50/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-100/50 shadow-lg animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{techShowcase.title}</h3>
              <p className="text-gray-700 mb-4">
                {techShowcase.description}
              </p>
              <ul className="space-y-2">
                {techShowcase.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/5 relative">
              <div className="aspect-video w-full rounded-lg overflow-hidden relative shadow-xl border border-primary-100">
                <Image
                  src="/uploads/services/technology-showcase.jpg"
                  alt={techShowcase.title || "Technology Showcase"}
                  width={500}
                  height={280}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_XL}s`, animationFillMode: 'both' }}>
          <Link href={`/${locale}/services`} className="btn-primary bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-lg">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
