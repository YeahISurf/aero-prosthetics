import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { ANIMATION_DELAYS } from '@/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return constructMetadata({
    title: t('mission.title'),
    description: t('mission.description'),
    keywords: ['about', 'mission', 'values', 'team', 'prosthetics', 'orthotics'],
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'about' });
  const values = t.raw('values.items') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* Enhanced Mission Section with gradient and background patterns */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Modern dual-tone gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-3 animate-fadeIn">
              Our Purpose
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-white animate-slideInUp">{t('mission.title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white mb-8 animate-fadeIn">{t('mission.description')}</p>
          </div>
        </div>
        
        {/* Enhanced subtle gradient transition to next section - positioned lower */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      </section>

      {/* Values Section - Enhanced with card design */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title animate-fadeIn">{t('values.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary-600">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced with card design */}
      <section className="section relative bg-gray-50 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="section-title animate-fadeIn">{t('team.title')}</h2>
          <p className="section-subtitle animate-fadeIn">{t('team.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Robert Chen</h3>
                <p className="text-primary-600 mb-4">Chief Prosthetist</p>
                <p className="text-gray-700 mb-4">
                  With over 15 years of experience, Dr. Chen specializes in advanced lower limb prosthetics and leads our clinical team with compassion and innovation.
                </p>
                <Link 
                  href={`/${locale}/team/robert-chen`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Maria Rodriguez</h3>
                <p className="text-primary-600 mb-4">Lead Orthotist</p>
                <p className="text-gray-700 mb-4">
                  Dr. Rodriguez specializes in pediatric orthotics and has pioneered several innovative treatment approaches that have improved outcomes for hundreds of young patients.
                </p>
                <Link 
                  href={`/${locale}/team/maria-rodriguez`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">James Wilson</h3>
                <p className="text-primary-600 mb-4">Clinical Director</p>
                <p className="text-gray-700 mb-4">
                  James oversees our clinical operations and ensures every patient receives personalized, comprehensive care tailored to their unique mobility goals and lifestyle needs.
                </p>
                <Link 
                  href={`/${locale}/team/james-wilson`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
          </div>
          
          <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
            <Link href={`/${locale}/team`} className="btn-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
              {t('team.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* History Section - Enhanced with better layout and visuals */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
                Our Journey
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('history.title')}</h2>
              <p className="text-lg text-gray-700 mb-6">{t('history.description')}</p>
              <p className="text-lg text-gray-700">
                Founded in 2010 by Dr. Robert Chen and Dr. Maria Rodriguez, Aero Prosthetics has grown from a small clinic to a leading provider of prosthetic and orthotic solutions across the region. Our commitment to innovation, personalized care, and patient education has established us as a trusted partner in the healthcare community, with a reputation for excellence and life-changing outcomes.
              </p>
            </div>
            <div className="relative animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_SM}s`, animationFillMode: 'both' }}>
              <div className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="aspect-[4/3] relative bg-gray-200">
                  {/* Placeholder for company history image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Company History Image
                  </div>
                  
                  {/* Premium corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Trust badge */}
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary-100/30 hidden md:block animate-scaleIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_XS}s`, animationFillMode: 'both' }}>
                <p className="text-primary-700 font-semibold text-xs mb-2">
                  Serving patients since 2010
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5L14.3 9.5L19.5 10.2L15.8 14L16.9 19.4L12 16.9L7.1 19.4L8.2 14L4.5 10.2L9.7 9.5L12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Awards & Recognition Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title animate-fadeIn">Awards & Recognition</h2>
          <p className="section-subtitle animate-fadeIn">Our commitment to excellence has been recognized by industry leaders and healthcare organizations.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {/* Award 1 */}
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M12 7V13M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Healthcare Innovation Award</h3>
              <p className="text-gray-700 text-sm">2023</p>
            </div>
            
            {/* Award 2 */}
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5L14.3 9.5L19.5 10.2L15.8 14L16.9 19.4L12 16.9L7.1 19.4L8.2 14L4.5 10.2L9.7 9.5L12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Patient Care Excellence</h3>
              <p className="text-gray-700 text-sm">2022</p>
            </div>
            
            {/* Award 3 */}
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Research Recognition</h3>
              <p className="text-gray-700 text-sm">2021</p>
            </div>
            
            {/* Award 4 */}
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
              <p className="text-gray-700 text-sm">2020</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-500 text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fadeIn">Ready to Take the Next Step?</h2>
            <p className="text-xl text-white/90 mb-8 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              Contact us today to schedule a consultation with our expert team and discover how we can help improve your mobility and quality of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
              <Link 
                href={`/${locale}/contact`}
                className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105"
              >
                Schedule a Consultation
              </Link>
              <Link 
                href={`/${locale}/locations`}
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100"
              >
                Find a Location
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
