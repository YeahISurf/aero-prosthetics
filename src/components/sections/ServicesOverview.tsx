import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ANIMATION_DELAYS } from '@/lib/utils';

// Define placeholder images for services - will be replaced with actual images later
const SERVICE_IMAGES = [
  '/placeholders/lower-limb-placeholder.svg',
  '/placeholders/upper-limb-placeholder.svg',
  '/placeholders/pediatric-placeholder.svg',
  '/placeholders/orthotics-placeholder.svg',
  '/placeholders/compression-placeholder.svg',
  '/placeholders/mastectomy-placeholder.svg',
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
              className="group bg-gradient-to-b from-white via-primary-50/15 to-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-lg relative border border-primary-50 animate-fadeIn flex flex-col"
              style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.ITEM_BASE, ANIMATION_DELAYS.STAGGER_XS)}s`, animationFillMode: 'both' }}
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-100/30 to-transparent z-0"></div>
              
              {/* Service Image - increased height from h-40 to h-56 */}
              <div className="w-full h-56 relative overflow-hidden">
                <Image 
                  src={SERVICE_IMAGES[index % SERVICE_IMAGES.length]}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 relative z-10 flex-grow flex flex-col">
                {/* Title with badge */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <span className="ml-2 px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full whitespace-nowrap">
                    {service.certification}
                  </span>
                </div>
                
                {/* Description and details */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <p className="text-gray-600 text-sm italic">{service.details}</p>
                </div>
                
                {/* Technology section only - Success Rate removed */}
                <div className="mt-auto">
                  <div className="flex items-center mb-4 bg-primary-50 rounded-lg px-3 py-2">
                    <div className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-primary-600 uppercase font-medium block">Technology</span>
                      <span className="text-sm font-medium text-primary-800">{service.technology}</span>
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
          <Link 
            href={`/${locale}/services`} 
            className="btn-primary bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-lg"
            aria-label="View All Services"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
