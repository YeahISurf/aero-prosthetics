import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/lib/seo/metadata';
import { ANIMATION_DELAYS } from '@/lib/utils';

// Define interface for process steps
interface ProcessStep {
  title: string;
  description: string;
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['prosthetics', 'orthotics', 'solutions', 'limb prosthetics', 'bracing solutions'],
  });
}

// Service icons mapping
const getServiceIcon = (iconType: string) => {
  switch (iconType) {
    case 'lower-limb':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'upper-limb':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
    case 'pediatric':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'orthotics':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      );
    case 'compression':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'mastectomy':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'cranial':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'bracing':
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return (
        <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

// Service placeholder images mapping
const SERVICE_IMAGES = [
  '/placeholders/lower-limb-placeholder.svg',
  '/placeholders/upper-limb-placeholder.svg',
  '/placeholders/pediatric-placeholder.svg',
  '/placeholders/orthotics-placeholder.svg',
  '/placeholders/compression-placeholder.svg',
  '/placeholders/mastectomy-placeholder.svg',
  '/placeholders/lower-limb-placeholder.svg', // Reusing image for cranial helmets
  '/placeholders/upper-limb-placeholder.svg'  // Reusing image for custom bracing
];

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'services' });
  const c = await getTranslations({ locale, namespace: 'cta' });
  
  // Get all service categories from translations
  const serviceCategories = t.raw('categories') as Array<{
    title: string;
    description: string;
  }>;
  
  // Create service objects with appropriate ids and icon types
  const solutions = serviceCategories.map((category, index) => {
    // Generate id from title
    const id = category.title.toLowerCase().replace(/\s+/g, '-');
    
    // Determine icon type based on category title
    let iconType = '';
    if (category.title.includes('Lower')) iconType = 'lower-limb';
    else if (category.title.includes('Upper')) iconType = 'upper-limb';
    else if (category.title.includes('Pediatric')) iconType = 'pediatric';
    else if (category.title.includes('Orthotics')) iconType = 'orthotics';
    else if (category.title.includes('Compression')) iconType = 'compression';
    else if (category.title.includes('Mastectomy')) iconType = 'mastectomy';
    else if (category.title.includes('Cranial')) iconType = 'cranial';
    else if (category.title.includes('Bracing')) iconType = 'bracing';
    else iconType = 'default';
    
    return {
      id,
      title: category.title,
      description: category.description,
      iconType,
      longDescription: category.description,
      image: SERVICE_IMAGES[index % SERVICE_IMAGES.length]
    };
  });
  
  // Process steps from translations
  const processSteps = t.raw('process.steps') as ProcessStep[];
  
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
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_XS}s`, animationFillMode: 'both' }}>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full mb-4 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_TITLE}s`, animationFillMode: 'both' }}>{t('badge')}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_SUBTITLE}s`, animationFillMode: 'both' }}>{t('title')}</h1>
          <p className="text-lg text-gray-700 mb-8 animate-slideInUp" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>{t('description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div 
              key={solution.id} 
              className="group bg-gradient-to-b from-white via-primary-50/15 to-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-lg relative border border-primary-50 animate-fadeIn flex flex-col"
              style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.ITEM_BASE, ANIMATION_DELAYS.STAGGER_XS)}s`, animationFillMode: 'both' }}
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-100/30 to-transparent z-0"></div>
              
              {/* Service Image */}
              <div className="w-full h-56 relative overflow-hidden">
                <Image 
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 relative z-10 flex-grow flex flex-col">
                <div className="flex justify-center mb-4">
                  {getServiceIcon(solution.iconType)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{solution.title}</h3>
                <p className="text-gray-700 mb-6 text-center">{solution.description}</p>
                <div className="mt-auto text-center">
                  <Link 
                    href={`/${locale}/services/${solution.id}`} 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:underline"
                    aria-label={`Learn more about ${solution.title}`}
                  >
                    {`${c('learnMore')} about ${solution.title}`}
                    <svg 
                      className="ml-1 w-5 h-5 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Technology showcase section */}
        <div className="mt-24 bg-primary-50/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-100/50 shadow-lg animate-fadeIn mb-16" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('technologyTitle')}</h3>
              <p className="text-gray-700 mb-4">
                {t('technologyDescription')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('techPoint1')}
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('techPoint2')}
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('techPoint3')}
                </li>
              </ul>
            </div>
            <div className="lg:w-2/5 relative">
              <div className="aspect-video w-full rounded-lg overflow-hidden relative shadow-xl border border-primary-100">
                <Image
                  src="/uploads/services/technology-showcase.jpg"
                  alt={t('technologyTitle')}
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
        
        {/* Our Process section */}
        <div className="max-w-5xl mx-auto mb-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              {t('process.title')}
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t('processSubtitle')}</p>
          </div>
          
          <div className="relative">
            {/* Vertical connecting line - visible on both mobile and desktop */}
            <div className="absolute top-8 bottom-8 left-[20px] md:left-[90px] lg:left-[116px] w-0.5 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100 z-0 hidden md:block"></div>
            
            {/* Mobile vertical line */}
            <div className="absolute top-8 bottom-8 left-1/2 w-0.5 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100 z-0 md:hidden"></div>
            
            {/* Decorative elements */}
            <div className="hidden md:block absolute -top-10 left-0 w-24 h-24 rounded-full bg-primary-50/30 -z-10"></div>
            <div className="hidden md:block absolute bottom-12 right-12 w-16 h-16 rounded-full bg-primary-50/30 -z-10"></div>
            
            <div className="space-y-16 relative z-10">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row animate-fadeIn items-start" 
                  style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.ITEM_BASE, ANIMATION_DELAYS.STAGGER_XS)}s`, animationFillMode: 'both' }}
                >
                  {/* Number circle - centered on mobile with connector to vertical line, left-aligned on desktop */}
                  <div className="flex justify-center md:justify-start md:w-[80px] lg:w-[100px] md:flex-shrink-0 md:mr-8 lg:mr-12 relative z-10">
                    <div className="relative mb-6 md:mb-0">
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-50/60 -z-10"></div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold shadow-md border border-primary-100/30 relative z-10">
                        {index + 1}
                      </div>
                      {/* Connector dot to the line - desktop */}
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[-22px] w-3 h-3 rounded-full bg-primary-200 border border-white"></div>
                      
                      {/* Connector dot to the line - mobile */}
                      <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-3 h-3 rounded-full bg-primary-200 border border-white"></div>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-primary-50 transform transition-all duration-300 hover:shadow-xl md:hover:-translate-y-1 flex flex-col md:flex-row w-full md:flex-1 relative">
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white via-primary-50/10 to-white opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">{step.title}</h3>
                    </div>
                    <div className="md:w-2/3 md:border-l md:border-primary-100/30 md:pl-6">
                      <p className="text-gray-700 text-base leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Subtle dots decoration */}
            <div className="absolute top-1/4 right-6 w-2 h-2 rounded-full bg-primary-200/50"></div>
            <div className="absolute top-1/2 right-12 w-3 h-3 rounded-full bg-primary-200/40"></div>
            <div className="absolute bottom-1/4 right-24 w-2 h-2 rounded-full bg-primary-200/30"></div>
          </div>
          
          <div className="text-center mt-20">
            <Link 
              href={`/${locale}/contact`} 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              {c('startJourney') || 'Begin Your Journey'}
              <svg 
                className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 