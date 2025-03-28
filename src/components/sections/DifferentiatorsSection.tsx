import React from 'react';
import { useTranslations } from 'next-intl';

// Define SVG icons for each differentiator (maps to the items in translation file)
const ICONS = [
  // Innovation/Technology icon - enhanced with more detail
  <svg key="innovation" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  // Personalization icon
  <svg key="personalization" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Support icon with enhanced detail
  <svg key="support" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Team icon
  <svg key="team" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
];

// Define icon container background colors with enhanced gradients
const ICON_BACKGROUNDS = [
  'from-primary-100 to-primary-200',
  'from-primary-100 to-primary-300/80', 
  'from-primary-100 to-primary-200/90', 
  'from-primary-100 to-primary-300/70', 
];

// Define icon colors - all primary variants with enhanced contrast
const ICON_COLORS = [
  'text-primary-700',
  'text-primary-600',
  'text-primary-700',
  'text-primary-600',
];

export default function DifferentiatorsSection() {
  const t = useTranslations('home.differentiators');

  const items = t.raw('items') as Array<{ title: string; description: string; link?: string }>;

  // Ensure we have valid arrays to prevent rendering errors
  const safeItems = items || [];
  
  return (
    <section className="section relative overflow-hidden py-24 bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Enhanced gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Enhanced decorative elements with better positioning */}
      <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl z-0 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -right-20 bottom-40 w-96 h-96 rounded-full bg-primary-100/20 blur-3xl z-0 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute left-1/4 bottom-20 w-64 h-64 rounded-full bg-primary-100/10 blur-2xl z-0 animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary-100 text-primary-700 rounded-full mb-5 shadow-sm animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Premium Prosthetic Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 relative animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 mt-8 leading-relaxed animate-fadeIn max-w-2xl mx-auto" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-screen-xl mx-auto">
          {safeItems.map((item, index) => {
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group animate-fadeIn`}
                style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                {/* Enhanced corner accent with gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-200/30 to-transparent rounded-bl-[100px]"></div>
                
                {/* Card pattern overlay with improved subtle texture */}
                <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Enhanced icon container with gradient and improved animated hover effect */}
                <div className={`w-16 h-16 bg-gradient-to-br ${ICON_BACKGROUNDS[index % ICON_BACKGROUNDS.length]} ${ICON_COLORS[index % ICON_COLORS.length]} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 border border-white/80`}>
                  <div className="transform transition-transform duration-500 group-hover:scale-110">
                    {ICONS[index % ICONS.length]}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-700 group-hover:text-gray-600 transition-colors duration-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Trust indicators section */}
        <div className="mt-16 pt-8 border-t border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">FDA Registered</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Industry Certified</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
