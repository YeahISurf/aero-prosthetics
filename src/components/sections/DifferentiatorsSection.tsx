import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

// Define SVG icons for each differentiator (maps to the items in translation file)
const ICONS = [
  // Innovation icon
  <svg key="innovation" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  // Personalization icon
  <svg key="personalization" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Quality icon
  <svg key="quality" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Support icon
  <svg key="support" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
];

// Define background gradients for each card - all primary variants
const CARD_GRADIENTS = [
  'from-primary-50 via-primary-100/20 to-white', 
  'from-primary-50/80 via-primary-100/30 to-white', 
  'from-primary-50/90 via-primary-100/25 to-white', 
  'from-primary-50/70 via-primary-100/15 to-white', 
];

// Define icon container background colors - all primary variants
const ICON_BACKGROUNDS = [
  'from-primary-100 to-primary-200/70',
  'from-primary-100/90 to-primary-200/60', 
  'from-primary-100/80 to-primary-200/50', 
  'from-primary-100/70 to-primary-200/40', 
];

// Define icon colors - all primary variants
const ICON_COLORS = [
  'text-primary-600',
  'text-primary-500',
  'text-primary-600',
  'text-primary-500',
];

export default function DifferentiatorsSection() {
  const t = useTranslations('home.differentiators');
  const locale = useLocale();
  const items = t.raw('items') as Array<{ title: string; description: string; link?: string }>;
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  // Ensure we have valid arrays to prevent rendering errors
  const safeItems = items || [];
  const safeStats = stats || [];
  
  return (
    <section className="section relative overflow-hidden">
      {/* Enhanced gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-primary-50/40 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute -left-20 top-40 w-64 h-64 rounded-full bg-primary-100/30 blur-3xl z-0 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -right-20 bottom-40 w-80 h-80 rounded-full bg-primary-100/20 blur-3xl z-0 animate-float" style={{ animationDelay: '0s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <span className="inline-block px-4 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full mb-4 animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Why Choose Aero Prosthetics
          </span>
          <h2 className="section-title text-gray-900 mb-4 relative block animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {t('title')}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-scaleIn" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}></span>
          </h2>
          <p className="text-lg text-gray-700 mt-6 animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safeItems.map((item, index) => {
            // Default link to services page with section anchor
            const targetLink = item.link || `/${locale}/services#${item.title.toLowerCase().replace(/\s+/g, '-')}`;
            
            return (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} rounded-xl shadow-lg p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group animate-fadeIn`}
                style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                {/* Enhanced corner accent with gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-200/20 to-transparent"></div>
                
                {/* Card pattern overlay */}
                <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5"></div>
                
                {/* Enhanced icon container with gradient and animated hover effect */}
                <div className={`w-16 h-16 bg-gradient-to-br ${ICON_BACKGROUNDS[index % ICON_BACKGROUNDS.length]} ${ICON_COLORS[index % ICON_COLORS.length]} rounded-xl flex items-center justify-center mb-6 shadow-md border border-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <div className="transform transition-transform duration-500 group-hover:scale-110">
                    {ICONS[index % ICONS.length]}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-700 mb-6 group-hover:text-gray-600 transition-colors duration-300">{item.description}</p>
                
                {/* Enhanced statistics with gradient accent */}
                {safeStats.length > 0 && (
                  <div className="flex items-center">
                    <span className={`text-xl font-bold ${ICON_COLORS[index % ICON_COLORS.length]} group-hover:scale-110 transition-transform duration-300`}>
                      {safeStats[Math.min(index, safeStats.length - 1)].value}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {safeStats[Math.min(index, safeStats.length - 1)].label}
                    </span>
                  </div>
                )}
                  
                {/* Fixed interactive element: functional "Learn more" link */}
                <div className="mt-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Link 
                    href={targetLink}
                    className="text-sm font-medium text-primary-600 flex items-center"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    {`${t('learnMoreText') || 'Learn more'} about ${item.title}`}
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Blue to white gradient transition at the bottom - consistent with HeroSection */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent lg:hidden"></div>
    </section>
  );
}
