import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Enhanced data for services with improved details
const services = [
  {
    id: 'lower-limb-prosthetics',
    title: 'Lower Limb Prosthetics',
    description: 'Custom-designed prosthetic solutions for below-knee, above-knee, and partial foot amputations.',
    details: 'Featuring microprocessor knees, energy-storing feet, and waterproof options.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    certification: 'ABC Certified',
    technology: 'Microprocessor Technology',
    successRate: '97%'
  },
  {
    id: 'upper-limb-prosthetics',
    title: 'Upper Limb Prosthetics',
    description: 'Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations.',
    details: 'Including myoelectric hands, activity-specific terminal devices, and passive cosmetic options.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    certification: 'FDA Approved',
    technology: 'Myoelectric Control',
    successRate: '94%'
  },
  {
    id: 'pediatric-prosthetics',
    title: 'Pediatric Prosthetics',
    description: 'Specialized prosthetic solutions designed for children\'s unique needs and growth.',
    details: 'Adjustable components to accommodate growth, lightweight materials, and vibrant customization options.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    certification: 'Pediatric Specialty',
    technology: 'Growth Adaptable',
    successRate: '98%'
  },
  {
    id: 'orthotics',
    title: 'Orthotics',
    description: 'Custom bracing solutions for spine, lower limb, and upper limb conditions.',
    details: 'Carbon fiber components, 3D-printed custom braces, and sport-specific orthoses.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    certification: 'BOC Certified',
    technology: '3D-Printed Custom',
    successRate: '96%'
  },
  {
    id: 'compression-garments',
    title: 'Compression Garments',
    description: 'Medical-grade compression solutions for various conditions.',
    details: 'Custom-fitted garments with antimicrobial properties and moisture-wicking technology.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    certification: 'Medical Grade',
    technology: 'Moisture-Wicking',
    successRate: '98%'
  },
  {
    id: 'mastectomy-products',
    title: 'Mastectomy Products',
    description: 'Specialized breast forms and post-mastectomy products.',
    details: 'Silicone forms with temperature equalization, custom nipple prostheses, and post-surgical garments.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    certification: 'FDA Approved',
    technology: 'Temperature Equalizing',
    successRate: '99%'
  },
];

export default function ServicesOverview() {
  const t = useTranslations('home.services');
  const ctaT = useTranslations('cta');
  const learnMoreText = ctaT('learnMore');

  return (
    <section className="section relative py-24">
      {/* Light clean background with subtle accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/25 to-white z-0"></div>
      <div className="absolute left-0 top-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
      <div className="absolute right-0 bottom-1/4 w-1/3 h-px bg-gradient-to-l from-transparent via-blue-200 to-transparent"></div>
      
      {/* Refined subtle accents */}
      <div className="absolute right-8 top-20 w-16 h-16 rounded-full bg-blue-100/20 z-0"></div>
      <div className="absolute left-16 bottom-40 w-24 h-24 rounded-full bg-blue-100/15 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full mb-4">Premium Solutions</span>
          <h2 className="section-title text-gray-900">{t('title')}</h2>
          <p className="section-subtitle text-gray-700">{t('description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.slice(0, 6).map((service) => (
            <div 
              key={service.id} 
              className="group bg-gradient-to-b from-white via-blue-50/15 to-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl relative border border-blue-50"
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/30 to-transparent z-0"></div>
              
              <div className="p-8 relative z-10">
                {/* Icon with premium styling */}
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100/70 text-primary-600 rounded-xl mb-6 shadow-sm border border-primary-100/50 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                
                {/* Title with badge */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">
                    {service.certification}
                  </span>
                </div>
                
                {/* Description and details */}
                <p className="text-gray-700 mb-4">{service.description}</p>
                <p className="text-gray-600 text-sm mb-6 italic">{service.details}</p>
                
                {/* Key technology and success rate */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 uppercase font-medium">Technology</p>
                    <p className="text-sm font-medium text-blue-800">{service.technology}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 uppercase font-medium">Success Rate</p>
                    <p className="text-sm font-medium text-green-700">{service.successRate}</p>
                  </div>
                </div>
                
                {/* Learn more link */}
                <Link 
                  href={`/en/services/${service.id}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group-hover:underline"
                >
                  {learnMoreText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
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
        
        {/* Technology showcase - clean, light premium style */}
        <div className="mt-24 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cutting-Edge Technology</h3>
              <p className="text-gray-700 mb-4">
                Our premium prosthetic solutions incorporate the latest advancements in materials science,
                 3D printing, and microprocessor technology to deliver unparalleled comfort and performance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Carbon fiber and titanium alloy components
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced microprocessor knee and ankle systems
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom 3D-printed socket interfaces
                </li>
              </ul>
            </div>
            <div className="lg:w-2/5 relative">
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden relative">
                {/* This would be replaced with an actual technology showcase image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Technology Showcase Image
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
            <Link href="/en/services" className="btn-primary bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-lg">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
